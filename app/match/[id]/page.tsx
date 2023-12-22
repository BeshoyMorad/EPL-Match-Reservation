"use client";
import { Container } from "@mui/material";
import MatchSection from "@/components/MatchSection";
import SportsIcon from "@mui/icons-material/Sports";
import ChairIcon from "@mui/icons-material/Chair";
import { useEffect, useState } from "react";
import { userRequest } from "@/services/instance";
import IMatch from "@/modules/IMatch";

export default function MatchDetails({ params }: { params: { id: string } }) {
  const [match, setMatch] = useState<IMatch>({
    _id: "1",
    homeTeam: "Team 1",
    awayTeam: "Team 2",
    venue: "Venue",
    dateAndTime: new Date(),
    mainReferee: "Eslam",
    linesman1: "Linesman 1",
    linesman2: "Linesman 2",
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

  useEffect(() => {
    userRequest
      .get(`/match/${params.id}`)
      .then((response) => {
        console.log(response);
        setMatch((prevProfile) => ({
          ...prevProfile,
          _id: response.data._id,
          homeTeam: response.data.homeTeam,
          awayTeam: response.data.awayTeam,
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
            {initialBoard.map((row, i) => (
              <div key={i}>
                {row.map((cell, j) => (
                  <span key={j} className="m-1">
                    <ChairIcon
                      style={{ color: cell === "R" ? "red" : "black" }}
                    ></ChairIcon>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
