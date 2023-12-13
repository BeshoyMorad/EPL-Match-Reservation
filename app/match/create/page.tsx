import MatchForm from "@/components/MatchForm";
import { Container } from "@mui/material";

export default function CreateMatch() {
  return (
    <Container maxWidth="sm">
      <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-5">
        Create New Match
      </h1>

      <MatchForm id={null} />
    </Container>
  );
}
