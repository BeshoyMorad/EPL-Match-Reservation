import Match from "@/components/Match";
import { Button, Container } from "@mui/material";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";

export default function Home() {
  const match = {
    _id: "1",
    homeTeam: "Team 1",
    awayTeam: "Team 2",
    venue: "Venue",
    dateAndTime: new Date(),
    mainReferee: "Main Referee",
    linesman1: "Linesman 1",
    linesman2: "Linesman 2",
  };

  return (
    // Fetch all matches with date >= today and use SHOW_MATCHES

    <Container className="mt-5">
      <Button
        sx={{
          border: "2px solid var(--main-color)",
          color: "var(--main-color)",
          display: "block",
          width: "fit-content",
          ml: "auto",
          mb: "1rem",
        }}
        href="/match/create"
      >
        <QueueOutlinedIcon />
        <span className="ml-2">Add New Match</span>
      </Button>

      {/* SHOW_MATCHES */}
      <Match match={match} />
    </Container>
  );
}
