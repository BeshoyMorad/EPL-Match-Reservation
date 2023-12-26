"use client";

import { Button, Paper, IconButton } from "@mui/material";
import Link from "next/link";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EditIcon from "@mui/icons-material/Edit";
import IMatch from "@/modules/IMatch";
import MatchSection from "./MatchSection";
import { useCookies } from "react-cookie";

export default function Match({ match }: { match: IMatch }) {
  const [cookies] = useCookies(["role", "token"]);
  const role = cookies.role;

  return (
    <Paper elevation={3} className="p-4 max-w-3xl m-auto rounded-xl relative">
      {role === "manager" && (
        <IconButton
          sx={{
            position: "absolute",
            right: "1rem",
            top: 0,
            color: "var(--main-color)",
          }}
        >
          <Link href={`/match/edit/${match._id}`}>
            <EditIcon />
          </Link>
        </IconButton>
      )}

      <Link href={`/match/${match._id}`}>
        <MatchSection match={match}></MatchSection>
      </Link>

      {cookies.token && (
        <div className="book-ticket mt-5">
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "var(--main-color)",
              m: "auto",
              color: "white",
              "&:hover": {
                backgroundColor: "#32d360",
              },
            }}
            href={`/match/reserve/${match._id}`}
          >
            <ConfirmationNumberOutlinedIcon />
            Book ticket
          </Button>
        </div>
      )}
    </Paper>
  );
}
