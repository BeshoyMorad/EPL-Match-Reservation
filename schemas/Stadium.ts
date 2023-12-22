import * as yup from "yup";

export const stadiumSchema = yup.object().shape({
  stadiumName: yup
    .string()
    .required("Name is required")
    .min(5, "Stadium name is too short"),
  numberOfRows: yup
    .number()
    .typeError("Number of rows must be a valid number")
    .positive("Number of rows must be a positive number")
    .integer("Number of rows must be an integer")
    .required("Number of rows is required"),
  seatsPerRow: yup
    .number()
    .typeError("Number of columns must be a valid number")
    .positive("Number of columns must be a positive number")
    .integer("Number of columns must be an integer")
    .required("Number of columns is required"),
});
