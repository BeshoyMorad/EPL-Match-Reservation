import React from "react";
import Image from "next/image";
import moment from "moment";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import IMatch from "@/modules/IMatch";

const MatchSection = ({ match }: { match: IMatch }) => {
  console.log(match);

  return (
    <>
      <div className="teams flex gap-5 items-center justify-center py-3">
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold">{match.homeTeam}</div>
          <Image
            src={match.homeTeamId?.imagePath}
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
            src={match.awayTeamId?.imagePath}
            width={38}
            height={38}
            alt="team"
          />
          <div className="text-xl font-semibold">{match.awayTeam}</div>
        </div>
      </div>

      <div className="flex gap-5 justify-center items-center  border-t-2 border-t-slate-200 py-3">
        <div className="stadium flex items-center gap-2">
          <StadiumOutlinedIcon sx={{ fontSize: "3rem" }} />

          <h4 className="text-lg">{match.venueId?.name}</h4>
        </div>

        <div className="date flex items-center">
          <CalendarMonthOutlinedIcon sx={{ fontSize: "3rem" }} />
          {moment(match.dateAndTime).format("ddd DD MMM YYYY")}
        </div>
      </div>
    </>
  );
};

export default MatchSection;
