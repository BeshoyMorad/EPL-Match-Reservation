"use client";
import MatchForm from "@/components/MatchForm";
import { Container, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function EditMatch({ params }: { params: { id: string } }) {
  const navigate = useRouter();
  const [cookies] = useCookies(["role"]);
  const isManager = cookies.role === "manager";

  if (!isManager) {
    navigate.push("/");
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: "2rem",
          borderRadius: "1rem",
          my: "2rem",
        }}
      >
        <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-5">
          Edit Match
        </h1>

        <MatchForm id={params.id} />
      </Paper>
    </Container>
  );
}
