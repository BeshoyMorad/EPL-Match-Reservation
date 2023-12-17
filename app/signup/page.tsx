"use client";
import Button from "@mui/material/Button";
import { MenuItem, TextField } from "@mui/material";
import { Container } from "@mui/material";
import React, { useState } from "react";
import { signUpSchema } from "@/prisma/schemas/signUp";
import { useFormik } from "formik";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

interface UserSignUp {
  userName: string;
  password: string;
  confirmPassword: string;
  role: string;
  firstName: string;
  lastName: string;
}
export default function SignUp() {
  const optionsRole = [
    {
      id: 1,
      name: "Manager",
    },
    {
      id: 2,
      name: "Fan",
    },
  ];
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  let userSignUp: UserSignUp = {
    userName: "",
    password: "",
    role: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  const [waiting, setWaiting] = useState(false);

  const formik = useFormik({
    initialValues: userSignUp,
    validationSchema: signUpSchema,
    async onSubmit(values) {
      setWaiting(true);
      console.log(values);
      setWaiting(false);
    },
  });

  return (
    <Container
      sx={{
        height: "calc(100vh - 100px )",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="sm"
    >
      <form
        className="bg-white rounded-3xl p-8"
        style={{
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          maxHeight: "600px",
        }}
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-5 ">
          Sign Up
        </h1>
        <TextField
          fullWidth
          sx={{ mt: 3 }}
          label="User Name"
          id="userName"
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <div className="flex justify-center items-center gap-5 mt-3">
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
        <TextField
          className="mt-2"
          fullWidth
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
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
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
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
        <TextField
          select
          fullWidth
          sx={{ mt: 3 }}
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
            sx={{ backgroundColor: "var(--main-color) !important" }}
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
