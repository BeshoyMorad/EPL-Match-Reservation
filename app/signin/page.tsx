"use client";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import React, { useState } from "react";
import { signInSchema } from "@/schemas/signIn";
import { useFormik } from "formik";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import instance from "@/services/instance";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

interface UserLogin {
  username: string;
  password: string;
}
export default function SignIn() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();
  const [cookies, setCookies] = useCookies(["token", "username", "isAdmin"]);

  let userLogin: UserLogin = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: userLogin,
    validationSchema: signInSchema,
    async onSubmit(values) {
      const data = values;
      await instance
        .post("/login", data)
        .then((response) => {
          const time = new Date();
          time.setDate(time.getDate() + 90);
          setCookies("token", response.data.token, {
            path: "/",
            expires: time,
          });
          setCookies("username", response.data.username, {
            path: "/",
            expires: time,
          });
          setCookies("isAdmin", response.data.isAdmin, {
            path: "/",
            expires: time,
          });
          if (response.data.isAdmin) {
            router.push("/admin");
          } else {
            router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.errors[0]);
        });
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
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
        {error && (
          <div
            className="flex justify-center items-start gap-5 mt-3"
            style={{ color: "red" }}
          >
            {errorMessage}
          </div>
        )}
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
