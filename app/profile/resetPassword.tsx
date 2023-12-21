import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  styled,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/schemas/ResetPassword";

interface ResetPasswordInterface {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
export interface ResetPasswordProps {
  open: boolean;
  onClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ResetPassword(props: ResetPasswordProps) {
  const { onClose, open } = props;
  let resetPassword: ResetPasswordInterface = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const clearFormik = () => {
    formik.values.confirmPassword = "";
    formik.values.password = "";
    formik.values.oldPassword = "";
  };
  const formik = useFormik({
    initialValues: resetPassword,
    validationSchema: resetPasswordSchema,
    async onSubmit(values) {
      console.log(values);
      clearFormik();
      onClose();
      // Add your asynchronous logic here (e.g., API calls, etc.)
    },
  });
  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      onClose={() => {
        clearFormik();
        onClose();
      }}
      open={open}
      onClick={() => {}}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Reset Password
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          clearFormik();
          onClose();
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className="mt-2"
            fullWidth
            id="outlined-adornment-old-password"
            type="password"
            label="Old Password"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
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
          <div className="flex gap-2  items-center justify-end py-3">
            <Button
              className="mt-2"
              type="submit"
              sx={{
                backgroundColor: "var(--secondary-color) !important",
                fontWeight: "bold",
                fontSize: "14px",
                marginRight: "24px",
              }}
              variant="contained"
              color="success"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </BootstrapDialog>
  );
}
