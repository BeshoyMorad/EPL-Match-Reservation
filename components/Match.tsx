import { Button, Paper, IconButton, Icon } from "@mui/material";
import Link from "next/link";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EditIcon from "@mui/icons-material/Edit";
import IMatch from "@/modules/IMatch";
import MatchSection from "./MatchSection";


export default function Match({ match }: { match: IMatch }) {
  return (
    <Paper elevation={3} className="p-4 max-w-3xl m-auto rounded-xl relative">
      <IconButton className="text-[var(--main-color)] absolute right-3 top-1">
        <Link href={`/match/edit/${match.id}`}>
          <EditIcon />
        </Link>
      </IconButton>

      <Link href={`/match/${match.id}`}>
        <MatchSection match={match}></MatchSection>
      </Link>

      <div className="book-ticket mt-5">
        <Button className="flex items-center gap-2 bg-[var(--main-color)] hover:bg-[#32d360] text-white m-auto">
          <ConfirmationNumberOutlinedIcon />
          Book ticket
        </Button>
      </div>
    </Paper>
  );
}
