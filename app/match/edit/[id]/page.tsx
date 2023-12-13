import MatchForm from "@/components/MatchForm";
import { Container } from "@mui/material";

export default function EditMatch({ params }: { params: { id: string } }) {
  return (
    <Container maxWidth="sm">
      <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-5">
        Edit Match
      </h1>

      <MatchForm id={parseInt(params.id)} />
    </Container>
  );
}
