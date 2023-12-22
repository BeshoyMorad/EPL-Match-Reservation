"use client";

import Match from "@/components/Match";
import { Button, Container } from "@mui/material";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import { useEffect, useState } from "react";
import IMatch from "@/modules/IMatch";
import { userRequest } from "@/services/instance";
import { useCookies } from "react-cookie";

export default function Home() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [cookies] = useCookies(["role"]);
  const role = cookies.role;

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await userRequest.get("/matches");
      setMatches(response.data);
    };

    fetchMatches();
  }, []);

  return (
    <Container className="mt-5">
      {role === "manager" && (
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
      )}

      {matches.length === 0 && (
        <h1 className="text-center text-3xl font-bold mt-5">No Matches Yet</h1>
      )}
      {matches.map((match) => (
        <Match key={match._id} match={match} />
      ))}
    </Container>
  );
}
