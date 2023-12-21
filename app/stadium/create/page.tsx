"use client";

import {
  Box,
  Container,
  TextField,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { stadiumSchema } from "@/schemas/Stadium";
import { useFormik } from "formik";
import { useState } from "react";

interface Stadium {
  name: string;
  rows: number | null;
  cols: number | null;
}
export default function CreateStadium() {
  let stadium: Stadium = {
    name: "",
    rows: null,
    cols: null,
  };
  const formik = useFormik({
    initialValues: stadium,
    validationSchema: stadiumSchema,
    async onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <Container
      className="flex justify-center items-center flex-col "
      sx={{
        margin: "20px auto",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      maxWidth="md"
    >
      <Box
        sx={{
          background:
            "linear-gradient(195deg, rgba(73, 163, 241, 0.6), rgba(26, 115, 232, 0.6)) 50% center / cover, url(/images/staduim.jpg) transparent",
          borderRadius: "9px",
          height: " 500px",
          width: " 100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      ></Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          marginTop: "-450px",
          position: "relative",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "25px",
          padding: "6px 18px",
        }}
      >
        <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-2 ">
          Create Stadium
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              fullWidth
              label="Name Stadium"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              type="number"
              fullWidth
              label="Rows"
              id="rows"
              name="rows"
              value={formik.values.rows}
              onChange={formik.handleChange}
              error={formik.touched.rows && Boolean(formik.errors.rows)}
              helperText={formik.touched.rows && formik.errors.rows}
            />
          </div>
          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              type="number"
              fullWidth
              label="Columns"
              id="cols"
              name="cols"
              value={formik.values.cols}
              onChange={formik.handleChange}
              error={formik.touched.cols && Boolean(formik.errors.cols)}
              helperText={formik.touched.cols && formik.errors.cols}
            />
          </div>
          <div className="flex gap-2  items-center justify-end py-3">
            <Button
              type="submit"
              sx={{
                backgroundColor: "var(--secondary-color) !important",
                fontWeight: "bold",
                fontSize: "14px",
                marginRight: "24px",
                textTransform: "capitalize",
              }}
              variant="contained"
              color="success"
            >
              Create
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
