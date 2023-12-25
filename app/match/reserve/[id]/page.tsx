"use client";
import { Container, Button, TextField } from "@mui/material";
import MatchSection from "@/components/MatchSection";
import SportsIcon from "@mui/icons-material/Sports";
import ChairIcon from "@mui/icons-material/Chair";
import { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import IPin from "@/modules/IPin";
import { pinSchema } from "@/schemas/pin";
import { useFormik } from "formik";
import { userRequest } from "@/services/instance";
import IMatch from "@/modules/IMatch";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function ReserveMatch({ params }: { params: { id: string; }; }) {
  const [cookies] = useCookies(["token","isAdmin"]);
  const isLoggedIn = cookies.token;
  const router = useRouter();
  const [match, setMatch] = useState<IMatch>({
    _id: "1",
    homeTeam: "",
    awayTeam: "",
    venue: "",
    dateAndTime: new Date(),
    mainReferee: "",
    linesman1: "",
    linesman2: "",
    homeTeamId: {
      imagePath: "",
    },
    awayTeamId: {
      imagePath: "",
    },
    venueId: {
      name: "",
      numberOfRows: 0,
      seatsPerRow: 0,
      _id: "0",
    },
  });
  const [initialBoard, setInitialBoard] = useState<string[][]>([]);
  const [board, setBoard] = useState(initialBoard);
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; col: number }[]
  >([]);
  const [yourSeats, setYourSeats] = useState<{ row: number; col: number }[]>(
    []
  );
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (!isLoggedIn || cookies.isAdmin) {
      router.push("/");
    }
    userRequest
      .get(`/match/${params.id}`)
      .then((response) => {
        // console.log(response);
        setMatch((prevProfile) => ({
          ...prevProfile,
          _id: response.data._id,
          homeTeam: response.data.homeTeamId?.name,
          awayTeam: response.data.awayTeamId?.name,
          homeTeamId: {
            ...prevProfile.homeTeamId,
            imagePath: response.data.homeTeamId.imagePath,
          },
          awayTeamId: {
            ...prevProfile.awayTeamId,
            imagePath: response.data.awayTeamId.imagePath,
          },
          venueId: {
            ...prevProfile.venueId,
            name: response.data.venueId.name,
            numberOfRows: response.data.venueId.numberOfRows,
            seatsPerRow: response.data.venueId.seatsPerRow,
            _id: response.data.venueId._id,
          },
          venue: response.data.venueId.name,
          dateAndTime: response.data.dateAndTime,
          mainReferee: response.data.mainReferee,
          linesman1: response.data.firstLinesman,
          linesman2: response.data.secondLinesman,
        }));
        const newInitialBoard = Array.from(
          { length: response.data.venueId.numberOfRows },
          () => Array(response.data.venueId.seatsPerRow).fill("F")
        );

        setInitialBoard(newInitialBoard);
        setBoard(newInitialBoard);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (match._id != "1") {
      userRequest.get(`/reserved-seats/${match._id}`).then((response) => {
        // console.log(response);
        const reservedSeatIndices = response.data;
        const seatsPerRow = match.venueId.seatsPerRow;
        const updatedBoard = initialBoard.map((row, i) =>
          row.map((cell, j) => {
            const seatIndex = i * seatsPerRow + j;
            return reservedSeatIndices.includes(seatIndex) ? "R" : cell;
          })
        );
        setInitialBoard(updatedBoard);
        setBoard(updatedBoard);
      });
    }
    //** get seats of user */
  }, [match]);

  const handleSeatClick = (rowIndex: number, colIndex: number) => {
    const updatedBoard = [...board];
    const seatValue = updatedBoard[rowIndex][colIndex];

    if (seatValue === "F") {
      // If the seat is available, mark it as selected
      updatedBoard[rowIndex][colIndex] = "R";
      setSelectedSeats([
        ...selectedSeats,
        { row: rowIndex + 1, col: colIndex + 1 },
      ]);
    }

    setBoard(updatedBoard);
  };
  const clearSeats = (rowIndex: number, colIndex: number) => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex - 1][colIndex - 1] = "F";
    const updatedSelectedSeats = selectedSeats.filter(
      (seat) => !(seat.row === rowIndex && seat.col === colIndex)
    );
    setSelectedSeats(updatedSelectedSeats);
    setBoard(updatedBoard);
  };
  const cancelSeats = (rowIndex: number, colIndex: number) => {
    /** cancel socket */
  };
  // console.log(params.id);
  let pin: IPin = {
    creditCardNumber: null,
    pin: null,
  };
  /* submit to reserve seat */
  const formik = useFormik({
    initialValues: pin,
    validationSchema: pinSchema,
    async onSubmit(values) {
      const seats: number[] = [];
      selectedSeats.map((seat) => {
        seats.push((seat.row - 1) * match.venueId.seatsPerRow + seat.col - 1);
      });
      console.log(seats);
      const reservation = {
        matchId: match._id,
        seats,
        date: new Date(),
      };
      console.log(reservation);
      userRequest
        .post("/reservation", reservation)
        .then(() => {
          setError(false);
          setErrorMessage("Successfully Reserve seat");
          setYourSeats((prevSeats) => [...prevSeats, ...selectedSeats]);
          setSelectedSeats([]);
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.response.data.error);
        });
    },
  });
  return (
    <Container
      sx={{
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="md"
    >
      <div
        className="bg-white rounded-3xl p-8"
        style={{
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
      >
        <h1 className=" text-3xl text-[var(--main-color)] font-bold mt-5">
          Match Reservation
        </h1>
        <MatchSection match={match}></MatchSection>
        <div className="flex gap-5 justify-center items-center  border-t-2 border-t-slate-200 py-3">
          <div className="flex gap-2">
            <label className="block text-sm font-bold text-gray-700">
              <SportsIcon></SportsIcon> Main Referee:
            </label>
            {match.mainReferee}
          </div>
        </div>

        <div className="flex gap-3 justify-center items-center ">
          <div className="flex gap-2">
            <label className="block text-sm font-bold text-gray-700">
              <SportsIcon></SportsIcon> lines man 1:
            </label>
            {match.linesman1}
          </div>
          <div className="flex gap-2">
            <label className="block text-sm font-bold text-gray-700">
              <SportsIcon></SportsIcon> lines man 2:
            </label>
            {match.linesman2}
          </div>
        </div>
        <div className="flex gap-3 justify-center items-center mt-3">
          <div>
            {board.map((row, i) => (
              <div key={i}>
                {row.map((cell, j) => (
                  <span
                    key={j}
                    className="m-1 cursor-pointer"
                    onClick={() => handleSeatClick(i, j)}
                  >
                    <ChairIcon
                      style={{ color: cell === "R" ? "red" : "black" }}
                    ></ChairIcon>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <h2 className="font-bold">Your Reservation, </h2>
          <span style={{ fontSize: "14px" }}>
            Note: you can cancel it if reserved ticket only 3 days before the start of
            the event.
          </span>
          <ul>
            {yourSeats.map((seat, index) => (
              <li key={index}>
                Row: {seat.row}, Col: {seat.col}{" "}
                <button onClick={() => clearSeats(seat.row, seat.col)}>
                  <HighlightOffIcon style={{ color: "red" }}></HighlightOffIcon>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3">
          <h2 className="font-bold">Selected Seats:</h2>
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>
                Row: {seat.row}, Col: {seat.col}{" "}
                <button onClick={() => clearSeats(seat.row, seat.col)}>
                  <HighlightOffIcon style={{ color: "red" }}></HighlightOffIcon>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={formik.handleSubmit} className="max-w-400">
          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              type="number"
              fullWidth
              label="Credit Card Number"
              id="creditCardNumber"
              name="creditCardNumber"
              value={formik.values.creditCardNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.creditCardNumber &&
                Boolean(formik.errors.creditCardNumber)
              }
              helperText={
                formik.touched.creditCardNumber &&
                formik.errors.creditCardNumber
              }
            />
          </div>
          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              type="number"
              fullWidth
              label="Pin"
              id="pin"
              name="pin"
              value={formik.values.pin}
              onChange={formik.handleChange}
              error={formik.touched.pin && Boolean(formik.errors.pin)}
              helperText={formik.touched.pin && formik.errors.pin}
            />
          </div>
          {error && (
            <div
              className="flex justify-center items-start gap-5 mt-3"
              style={{ color: "red" }}
            >
              {errorMessage}
            </div>
          )}
          {!error && (
            <div
              className="flex justify-center items-start gap-5 mt-3"
              style={{ color: "green" }}
            >
              {errorMessage}
            </div>
          )}
          <div className="book-ticket mt-5">
            <Button
              type="submit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "var(--main-color)",
                "&:hover": {
                  backgroundColor: "#32d360",
                },
                color: "white",
                margin: "auto",
              }}
            >
              <ConfirmationNumberOutlinedIcon />
              Book ticket
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
