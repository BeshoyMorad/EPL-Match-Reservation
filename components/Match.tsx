import { Button, Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

interface IMatch {
  id: Number;
  homeTeam: String;
  awayTeam: String;
  venue: String;
  dateAndTime: Date;
  mainReferee: String;
  linesman1: String;
  linesman2: String;
}

export default function Match({ match }: { match: IMatch }) {
  return (
    <Paper elevation={3} className="p-4 max-w-3xl m-auto rounded-xl">
      <Link href={`/match/${match.id}`}>
        <div className="teams flex gap-5 items-center justify-center py-3">
          <div className="flex items-center gap-2">
            <div className="text-xl font-semibold">{match.homeTeam}</div>
            <Image
              src="/images/Al Ittihad Alexandria Club.png"
              width={38}
              height={38}
              alt="team"
            />
          </div>

          <span className="font-medium">
            {moment(match.dateAndTime).format("h:mm A")}
          </span>

          <div className="flex items-center gap-2">
            <Image
              src="/images/Al Ahly SC.png"
              width={38}
              height={38}
              alt="team"
            />
            <div className="text-xl font-semibold">{match.awayTeam}</div>
          </div>
        </div>

        <div className="flex gap-5 justify-center border-t-2 border-t-slate-200 py-3">
          <div className="stadium flex items-center gap-2">
            <StadiumOutlinedIcon sx={{ fontSize: "3rem" }} />

            <h4 className="text-lg">{match.venue}</h4>
          </div>

          <div className="date flex items-center">
            <CalendarMonthOutlinedIcon sx={{ fontSize: "3rem" }} />
            {moment(match.dateAndTime).format("ddd DD MMM YYYY")}
          </div>
        </div>
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
