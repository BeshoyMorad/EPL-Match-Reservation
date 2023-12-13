"use client";

import { matchSchema } from "@/prisma/schemas/match";
import { Button, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

interface IintialState {
  homeTeam: Number | string;
  awayTeam: Number | string;
  stadium: String | null;
  date: Date | Dayjs | null;
  mainReferee: String | null;
  linesman1: String | null;
  linesman2: String | null;
}

export default function MatchForm({ id }: { id: Number | null }) {
  // Fetch teams from the backend
  const teams = [
    {
      id: 1,
      name: "Ahly",
    },
    {
      id: 2,
      name: "Zamalek",
    },
    {
      id: 3,
      name: "Pyramids",
    },
  ];
  const [waiting, setWaiting] = useState(false);

  let intialState: IintialState = {
    homeTeam: "",
    awayTeam: "",
    stadium: "",
    date: null,
    mainReferee: "",
    linesman1: "",
    linesman2: "",
  };

  if (id) {
    // Update => fetch the match and update intialState
    intialState = {
      homeTeam: 1,
      awayTeam: 2,
      stadium: "Venue",
      date: dayjs(new Date()),
      mainReferee: "Main Referee",
      linesman1: "Linesman 1",
      linesman2: "Linesman 2",
    };
  }

  const formik = useFormik({
    initialValues: intialState,
    validationSchema: matchSchema,
    async onSubmit(values) {
      setWaiting(true);

      if (id) {
        // Update
        console.log(values);
      } else {
        // Create
        console.log(values);
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
          <MenuItem key={team.id} value={team.id}>
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
          <MenuItem key={team.id} value={team.id}>
            {team.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        sx={{ mt: 3 }}
        label="Stadium"
        id="stadium"
        name="stadium"
        value={formik.values.stadium}
        onChange={formik.handleChange}
        error={formik.touched.stadium && Boolean(formik.errors.stadium)}
        helperText={formik.touched.stadium && formik.errors.stadium}
      />

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
