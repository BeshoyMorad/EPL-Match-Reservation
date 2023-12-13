import Match from "@/components/Match";
import { Container } from "@mui/material";

export default function Home() {
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

  return (
    <Container className="mt-5">
      <Match match={match} />
    </Container>
  );
}
