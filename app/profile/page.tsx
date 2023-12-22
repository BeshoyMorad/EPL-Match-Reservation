"use client";

import {
  Box,
  Container,
  TextField,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { profileSchema } from "@/schemas/profile";
import { useFormik } from "formik";
import cities from "@/Database/City";
import { optionsGender, optionsRole } from "@/Database/profile";
import ResetPassword from "./resetPassword";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "@/services/instance";
import Profile from "@/modules/IProfile";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["isAdmin"]);
  const [profile, setProfile] = useState({
    username: "",
    firstName: "",
    lastName: "",
    address: "",
    birthDate: new Date("2001-09-19"),
    gender: "",
    city: "",
    email: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!cookies.isAdmin) {
      userRequest
        .get("/user")
        .then((response) => {
          const serverProfile = response.data;
          serverProfile.birthDate = new Date(response.data.birthDate);
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...serverProfile,
            address: response.data.address,
            username: response.data.username,
            birthDate: response.data.birthDate,
            gender: response.data.gender,
            city: response.data.city,
            lastName: response.data.lastName,
            firstName: response.data.firstName,
            email: response.data.email,
          }));
        })
        .catch(() => {
          router.push("/signin");
        });
    } else {
      router.push("/admin");
    }
  }, [cookies.isAdmin, router]);
  useEffect(() => {
    formik.setValues(profile); // Update Formik values when profile changes
  }, [profile]);
  // console.log(profile);
  const formik = useFormik({
    initialValues: profile,
    validationSchema: profileSchema,
    async onSubmit(values) {
      const data = values;
      userRequest
        .put("/user", data)
        .then((response) => {
          console.log(response);
          setError(false);
          setErrorMessage("Successfully Updated");
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.error[0]);
        });
    },
  });
  let formattedBirthDate = "";
  if (formik.values.birthDate instanceof Date) {
    formattedBirthDate = formik.values.birthDate.toISOString().split("T")[0];
  }
  return (
    <Container
      className="flex justify-center items-center flex-col "
      sx={{
        margin: "20px auto",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      maxWidth="lg"
    >
      <Box
        sx={{
          background:
            "linear-gradient(195deg, rgba(73, 163, 241, 0.6), rgba(26, 115, 232, 0.6)) 50% center / cover, url(/images/staduim.jpg) transparent",
          borderRadius: "9px",
          height: " 600px",
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
          maxWidth: "1000px",
          background: "white",
          marginTop: "-550px",
          position: "relative",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "25px",
          padding: "6px 18px",
          mx: "auto",
        }}
      >
        <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-2 ">
          Profile
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              disabled
              fullWidth
              label="User Name"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              disabled
              fullWidth
              label="Email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>

          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              fullWidth
              label="First Name"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              label="Last Name"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <div className="flex justify-center items-start gap-5 mt-3">
            <div className="w-full">
              <InputLabel htmlFor="date">Date</InputLabel>
              <TextField
                fullWidth
                id="date"
                name="birthDate"
                type="date"
                value={formik.values.birthDate ? formattedBirthDate : ""}
                onChange={(event) => {
                  const selectedDate = event.target.value;
                  formik.setFieldValue(
                    "birthDate",
                    selectedDate ? new Date(selectedDate) : null
                  );
                }}
                error={
                  formik.touched.birthDate && Boolean(formik.errors.birthDate)
                }
                // helperText={formik.touched.birthDate && formik.errors.birthDate}
              />
            </div>
            <TextField
              select
              fullWidth
              sx={{ mt: 3 }}
              label="Gender"
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              {optionsGender.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="flex justify-center items-start gap-5 mt-3">
            <TextField
              select
              fullWidth
              sx={{ mt: 3 }}
              label="city"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            >
              {cities.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3 }}
              label="Address"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
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
          {!error && (
            <div
              className="flex justify-center items-start gap-5 mt-3"
              style={{ color: "green" }}
            >
              {errorMessage}
            </div>
          )}
          <div className="flex gap-2  items-center justify-end py-3">
            <Button
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                textTransform: "capitalize",
              }}
              variant="outlined"
              onClick={handleClickOpen}
            >
              Reset Password
            </Button>
            <ResetPassword open={open} onClose={handleClose} />
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
              Save
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
