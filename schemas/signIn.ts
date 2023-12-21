import * as yup from "yup";

export const signInSchema = yup.object().shape({
  username: yup.string().required("userName is required"),
  password: yup.string().required("password is required"),
});
