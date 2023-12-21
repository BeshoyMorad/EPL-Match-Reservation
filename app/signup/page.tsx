"use client";
import Button from "@mui/material/Button";
import { InputLabel, MenuItem, TextField } from "@mui/material";
import { Container } from "@mui/material";
import React, { useState } from "react";
import { signUpSchema } from "@/schemas/signUp";
import {  useFormik } from "formik";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import cities from "@/Database/City";
import { publicRequest } from "@/services/instance";
import {optionsRole,optionsGender} from "@/Database/profile";
import { useRouter } from "next/navigation";
import UserSignUp from '@/modules/ISignUp'

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const  [errorMessage, setErrorMessage] = useState("");
  let userSignUp: UserSignUp = {
    username: "",
    password: "",
    role: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    birthDate: null,
    gender: "",
    city: "",
    email: "",
  };


  const formik = useFormik({
    initialValues: userSignUp,
    validationSchema: signUpSchema,
    async onSubmit(values) {
      const data = values;
      data.gender = data.gender.toLowerCase();
      data.role = data.role.toLowerCase();
      await publicRequest
        .post("/signup", data)
        .then((response) => {
          console.log(response);
          router.push("/signin");
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
      sx={{
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="md"
    >
      <form
        className="bg-white rounded-3xl p-8"
        style={{
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-2 ">
          Sign Up
        </h1>
        <div className="flex justify-center items-start gap-5 mt-3">
          <TextField
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
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
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
          <TextField
            className="mt-2"
            fullWidth
            id="outlined-adornment-password"
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            className="mt-2"
            fullWidth
            id="outlined-adornment-confirm-password"
            type="password"
            label="confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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
        {error
          &&
          <div
            className="flex justify-center items-start gap-5 mt-3"
            style={{ color: "red"}}
          >
            {errorMessage}
          </div>
        }
        <div className="flex gap-2  items-center justify-center py-3">
          <label>Do you have an account?</label>
          <Button
            sx={{
              color: "var(--main-color)",
              "&:hover": { bgcolor: "transparent" },
            }}
            href="./signin"
          >
            <PersonAddAlt1Icon className="mr-1"></PersonAddAlt1Icon> Login
          </Button>
        </div>
        <div className="flex gap-2  items-center justify-center py-3">
          <Button
            type="submit"
            sx={{
              backgroundColor: "var(--main-color) !important",
              fontWeight: "bold",
              fontSize: "12pxs",
            }}
            variant="contained"
            color="success"
          >
            Sign UP
          </Button>
        </div>
      </form>
    </Container>
  );
}
