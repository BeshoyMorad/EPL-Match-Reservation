"use client";
import { Container } from "@mui/material";
import MatchSection from "@/components/MatchSection";

export default function MatchDetails({ params }: { params: { id: string } }) {
const match = {
  id: 1,
  homeTeam: "Team 1",
  awayTeam: "Team 2",
  venue: "Venue",
  dateAndTime: new Date(),
  mainReferee: "Main Referee",
  linesman1: "Linesman 1",
  linesman2: "Linesman 2",
};
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
      </div>
    </Container>
  );
}
