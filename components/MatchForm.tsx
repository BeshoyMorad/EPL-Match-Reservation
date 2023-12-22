"use client";

import { matchSchema } from "@/schemas/match";
import { Button, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { userRequest } from "@/services/instance";
import { useRouter } from "next/navigation";

interface IintialState {
  homeTeam: string;
  awayTeam: string;
  stadium: String | null;
  date: Date | Dayjs | null;
  mainReferee: String | null;
  linesman1: String | null;
  linesman2: String | null;
}

const getMatchById = async (id: string) => {
  const response = await userRequest.get(`/match/${id}`);

  return response.data;
};

export default function MatchForm({ id }: { id: string | null }) {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [stadiums, setStadiums] = useState<IStadium[]>([]);
  const [waiting, setWaiting] = useState(false);
  const [intialState, setIntialState] = useState<IintialState>({
    homeTeam: "",
    awayTeam: "",
    stadium: "",
    date: null,
    mainReferee: "",
    linesman1: "",
    linesman2: "",
  });
  const navigate = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await userRequest.get("/teams");

      setTeams(response.data);
    };

    const fetchStadiums = async () => {
      const response = await userRequest.get("/stadium");

      setStadiums(response.data.stadiums);
    };

    fetchTeams();
    fetchStadiums();

    if (id) {
      const getMatch = async (id: string) => {
        const state = await getMatchById(id);
        setIntialState({
          homeTeam: state.homeTeamId._id,
          awayTeam: state.awayTeamId._id,
          stadium: state.venueId._id,
          date: dayjs(state.dateAndTime),
          mainReferee: state.mainReferee,
          linesman1: state.firstLinesman,
          linesman2: state.secondLinesman,
        });
      };

      getMatch(id);
    }
  }, []);

  useEffect(() => {
    formik.setValues(intialState);
  }, [intialState]);

  const formik = useFormik({
    initialValues: intialState,
    validationSchema: matchSchema,
    async onSubmit(values) {
      setWaiting(true);

      if (id) {
        // Update
        await userRequest.put(`/match/${id}`, {
          homeTeamId: values.homeTeam,
          awayTeamId: values.awayTeam,
          venueId: values.stadium,
          dateAndTime: values.date,
          mainReferee: values.mainReferee,
          firstLinesman: values.linesman1,
          secondLinesman: values.linesman2,
        });
        navigate.push("/");
      } else {
        // Create
        await userRequest.post("/match", {
          homeTeamId: values.homeTeam,
          awayTeamId: values.awayTeam,
          venueId: values.stadium,
          dateAndTime: values.date,
          mainReferee: values.mainReferee,
          firstLinesman: values.linesman1,
          secondLinesman: values.linesman2,
        });
        navigate.push("/");
      }

      setWaiting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <TextField
        select
        fullWidth
        sx={{ mt: 3 }}
        label="Home Team"
        id="homeTeam"
        name="homeTeam"
        value={formik.values.homeTeam}
        onChange={formik.handleChange}
        error={formik.touched.homeTeam && Boolean(formik.errors.homeTeam)}
        helperText={formik.touched.homeTeam && formik.errors.homeTeam}
      >
        {teams.map((team) => (
          <MenuItem key={team._id} value={team._id}>
            {team.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        sx={{ mt: 3 }}
        label="Away Team"
        id="awayTeam"
        name="awayTeam"
        value={formik.values.awayTeam}
        onChange={formik.handleChange}
        error={formik.touched.awayTeam && Boolean(formik.errors.awayTeam)}
        helperText={formik.touched.awayTeam && formik.errors.awayTeam}
      >
        {teams.map((team) => (
          <MenuItem key={team._id} value={team._id}>
            {team.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        sx={{ mt: 3 }}
        label="Stadium"
        id="stadium"
        name="stadium"
        value={formik.values.stadium}
        onChange={formik.handleChange}
        error={formik.touched.stadium && Boolean(formik.errors.stadium)}
        helperText={formik.touched.stadium && formik.errors.stadium}
      >
        {stadiums.map((stadium) => (
          <MenuItem key={stadium._id} value={stadium._id}>
            {stadium.name}
          </MenuItem>
        ))}
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer sx={{ mt: 2 }} components={["DateTimePicker"]}>
          <DateTimePicker
            label="Date"
            value={formik.values.date}
            onChange={(newValue) => {
              formik.setFieldValue("date", new Date((newValue as any).$d));
            }}
          />
        </DemoContainer>
        {formik.touched.date && Boolean(formik.errors.date) && (
          <div className="text-[#d32f2f] text-xs ml-3">
            {formik.touched.date && formik.errors.date}
          </div>
        )}
      </LocalizationProvider>

      <TextField
        fullWidth
        sx={{ mt: 3 }}
        label="Main Referee"
        id="mainReferee"
        name="mainReferee"
        value={formik.values.mainReferee}
        onChange={formik.handleChange}
        error={formik.touched.mainReferee && Boolean(formik.errors.mainReferee)}
        helperText={formik.touched.mainReferee && formik.errors.mainReferee}
      />

      <TextField
        fullWidth
        sx={{ mt: 3 }}
        label="Linesman 1"
        id="linesman1"
        name="linesman1"
        value={formik.values.linesman1}
        onChange={formik.handleChange}
        error={formik.touched.linesman1 && Boolean(formik.errors.linesman1)}
        helperText={formik.touched.linesman1 && formik.errors.linesman1}
      />

      <TextField
        fullWidth
        sx={{ mt: 3 }}
        label="Linesman 2"
        id="linesman2"
        name="linesman2"
        value={formik.values.linesman2}
        onChange={formik.handleChange}
        error={formik.touched.linesman2 && Boolean(formik.errors.linesman2)}
        helperText={formik.touched.linesman2 && formik.errors.linesman2}
      />

      <Button
        fullWidth
        type="submit"
        disabled={waiting}
        sx={{
          mt: 3,
          border: "2px solid var(--main-color)",
          color: "var(--main-color)",
        }}
      >
        {!waiting
          ? id
            ? "Update"
            : "Create"
          : id
          ? "Updating..."
          : "Creating..."}
      </Button>
    </form>
  );
}
