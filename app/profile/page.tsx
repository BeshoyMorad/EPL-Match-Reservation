"use client";

import {
  Box,
  Container,
  TextField,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { profileSchema } from "@/prisma/schemas/profile";
import { useFormik } from "formik";
import cities from "@/Database/City";
import { optionsGender, optionsRole } from "@/Database/profile";
import ResetPassword from "./resetPassword";
import { useState } from "react";

interface Profile {
  email: string;
  userName: string;
  role: string;
  firstName: string;
  lastName: string;
  address: string | null;
  birthDate: Date | null;
  gender: string;
  city: string;
}
export default function Profile() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let profile: Profile = {
    userName: "Eslammm",
    role: "Manager",
    firstName: "Eslam",
    lastName: "Ashraf",
    address: "5 Cairo",
    birthDate: new Date("2001-09-19"),
    gender: "Male",
    city: "Giza",
    email: "eslam@koko.com",
  };
  const formik = useFormik({
    initialValues: profile,
    validationSchema: profileSchema,
    async onSubmit(values) {
      console.log(values);
      // Add your asynchronous logic here (e.g., API calls, etc.)
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
              id="userName"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
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
                helperText={formik.touched.birthDate && formik.errors.birthDate}
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
          <TextField
            select
            fullWidth
            sx={{ mt: 3, width: "49%" }}
            label="Role"
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            {optionsRole.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
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
