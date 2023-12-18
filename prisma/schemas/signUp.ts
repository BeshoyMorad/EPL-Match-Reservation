import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  userName: yup.string().required("UserName is required"),
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  role: yup.string().required("Role is required"),
});
