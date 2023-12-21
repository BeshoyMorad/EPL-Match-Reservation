"use client";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import React, { useState } from "react";
import { signInSchema } from "@/schemas/signIn";
import { useFormik } from "formik";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

interface UserLogin {
  userName: string;
  password: string;
}
export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  let userLogin: UserLogin = {
    userName: "",
    password: "",
  };

  const [waiting, setWaiting] = useState(false);

  const formik = useFormik({
    initialValues: userLogin,
    validationSchema: signInSchema,
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
        style={{ boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)" }}
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center text-3xl text-[var(--main-color)] font-bold mt-5">
          Sign In
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
        <div className="flex gap-2  items-center justify-center py-3">
          <label>Do not have an account?</label>
          <Button
            sx={{
              color: "var(--main-color)",
              "&:hover": { bgcolor: "transparent" },
            }}
            href="./signup"
          >
            <PersonAddAlt1Icon className="mr-1"></PersonAddAlt1Icon> Register
            Now!
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
            Sign In
          </Button>
        </div>
      </form>
    </Container>
  );
}
