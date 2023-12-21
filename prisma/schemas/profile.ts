import * as yup from "yup";

export const profileSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  userName: yup.string().required("UserName is required"),
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  role: yup.string().required("Role is required"),
  gender: yup.string().required("Gender is required"),
  city: yup.string().required("City is required"),
  birthDate: yup.date().required("Date is required"),
  address: yup.string(),
});
