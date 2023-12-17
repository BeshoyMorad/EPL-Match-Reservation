"use client";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import React from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
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
      <div
        className="bg-white rounded-3xl p-8"
        style={{ boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)" }}
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
        />
        <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                ></IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
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
            sx={{ backgroundColor: "var(--main-color) !important" }}
            variant="contained"
            color="success"
          >
            Sign In
          </Button>
        </div>
      </div>
    </Container>
  );
}
