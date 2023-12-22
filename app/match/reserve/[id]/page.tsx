"use client";
import { Container, Button, TextField } from "@mui/material";
import MatchSection from "@/components/MatchSection";
import SportsIcon from "@mui/icons-material/Sports";
import ChairIcon from "@mui/icons-material/Chair";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import IPin from "@/modules/IPin";
import { pinSchema } from "@/schemas/pin";
import { useFormik } from "formik";

export default function ReserveMatch({ params }: { params: { id: string } }) {
  const match = {
    _id: "1",
    homeTeam: "Team 1",
    awayTeam: "Team 2",
    venue: "Venue",
    dateAndTime: new Date(),
    mainReferee: "Eslam",
    linesman1: "Linesman 1",
    linesman2: "Linesman 2",
  };
  const initialBoard = [
    ["R", "F", "F", "F", "F"],
    ["R", "R", "R", "F", "F"],
    ["R", "F", "R", "F", "F"],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; col: number }[]
  >([]);

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
  console.log(params.id);
  let pin: IPin = {
    creditCardNumber: null,
    pin: null,
  };
  const formik = useFormik({
    initialValues: pin,
    validationSchema: pinSchema,
    async onSubmit(values) {
      console.log(values);
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
        <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-5">
          Match Details
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
          <div className="book-ticket mt-5">
            <Button
              type="submit"
              className="flex items-center gap-2 bg-[var(--main-color)] hover:bg-[#32d360] text-white m-auto"
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
