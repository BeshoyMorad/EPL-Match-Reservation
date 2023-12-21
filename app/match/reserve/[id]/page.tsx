"use client";
import { Container } from "@mui/material";
import MatchSection from "@/components/MatchSection";
import SportsIcon from "@mui/icons-material/Sports";
import ChairIcon from "@mui/icons-material/Chair";
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
  const board = [
    ["R", "F", "F", "F", "F"],
    ["R", "R", "R", "F", "F"],
    ["R", "F", "R", "F", "F"],
  ];
  console.log(params.id);
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
