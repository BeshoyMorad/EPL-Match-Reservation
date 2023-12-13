import { Button, Grid, Paper } from "@mui/material";
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
    <Paper elevation={3} className="p-4">
      <Link href={`/match/${match.id}`}>
        <div className="flex flex-col gap-4">
          <Grid container gap={2} justifyContent={"space-between"}>
            <Grid item xs={9} md={4} className="m-auto">
              <div className="teams flex gap-2 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-xl font-semibold">{match.homeTeam}</div>
                  <Image
                    src="/images/Al Ittihad Alexandria Club.png"
                    width={38}
                    height={38}
                    alt="team"
                  />
                </div>

                <span className="font-medium">VS</span>

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
            </Grid>

            <Grid item xs={9} md={6} className="m-auto">
              <div className="flex gap-3 justify-between">
                <div className="stadium flex items-center gap-2">
                  <StadiumOutlinedIcon sx={{ fontSize: "3rem" }} />

                  <h4 className="text-lg">{match.venue}</h4>
                </div>
                <div className="date flex items-center">
                  <CalendarMonthOutlinedIcon sx={{ fontSize: "3rem" }} />
                  <div className="flex flex-col">
                    <span>
                      {moment(match.dateAndTime).format("ddd DD MMM YYYY")}
                    </span>
                    <span>
                      Time: {moment(match.dateAndTime).format("h:mm A")}
                    </span>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>

          <div className="book-ticket">
            <Button className="flex items-center gap-2 bg-[var(--main-color)] hover:bg-[#32d360] text-white m-auto w-60">
              <ConfirmationNumberOutlinedIcon />
              Book ticket
            </Button>
          </div>
        </div>
      </Link>
    </Paper>
  );
}
