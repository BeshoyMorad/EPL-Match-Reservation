"use client";

import { Box, Container, TextField, Button } from "@mui/material";
import { stadiumSchema } from "@/schemas/Stadium";
import { useFormik } from "formik";
import { userRequest } from "@/services/instance";
import { useRouter } from "next/navigation";
import {useState} from "react"
import Stadium from "@/modules/IStaduim";


export default function CreateStadium() {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  let stadium: Stadium = {
    stadiumName: "",
    numberOfRows: undefined,
    seatsPerRow: undefined,
  };
  const formik = useFormik({
    initialValues: stadium,
    validationSchema: stadiumSchema,
    async onSubmit(values) {
      console.log(values);
      userRequest
        .post("/stadium", values)
        .then((response) => {
          console.log("Success:", response);
          router.push("/match/create");
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response.status === 401) {
            router.push("/signin");
          }
          else {
            setError(true);
            setErrorMessage(error.response.data.error);
          }
        });
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
          margin: "-450px auto  0px",
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
              label="Stadium Name"
              id="stadiumName"
              name="stadiumName"
              value={formik.values.stadiumName}
              onChange={formik.handleChange}
              error={
                formik.touched.stadiumName && Boolean(formik.errors.stadiumName)
              }
              helperText={
                formik.touched.stadiumName && formik.errors.stadiumName
              }
            />
          </div>
          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              type="number"
              fullWidth
              label="Number Of Rows"
              id="numberOfRows"
              name="numberOfRows"
              value={formik.values.numberOfRows}
              onChange={formik.handleChange}
              error={
                formik.touched.numberOfRows &&
                Boolean(formik.errors.numberOfRows)
              }
              helperText={
                formik.touched.numberOfRows && formik.errors.numberOfRows
              }
            />
          </div>
          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              type="number"
              fullWidth
              label="Seats Per Row"
              id="seatsPerRow"
              name="seatsPerRow"
              value={formik.values.seatsPerRow}
              onChange={formik.handleChange}
              error={
                formik.touched.seatsPerRow && Boolean(formik.errors.seatsPerRow)
              }
              helperText={
                formik.touched.seatsPerRow && formik.errors.seatsPerRow
              }
            />
          </div>
          {error && (
            <div
              className="flex justify-center items-start gap-5 mt-3"
              style={{ color: "red" }}
            >
              {errorMessage}
            </div>
          )}
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
