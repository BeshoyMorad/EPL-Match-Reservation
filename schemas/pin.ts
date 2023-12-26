import * as yup from "yup";

export const pinSchema = yup.object().shape({
  creditCardNumber: yup
    .number()
    .typeError("Number of rows must be a valid number")
    .positive("Number of rows must be a positive number")
    .integer("Number of rows must be an integer")
    .required("Number of rows is required").
    test("is-sixteen-digits", "Credit card number must be 16 digits", (value) => String(value).length === 16),
  pin: yup
    .number()
    .typeError("Number of columns must be a valid number")
    .positive("Number of columns must be a positive number")
    .integer("Number of columns must be an integer")
    .required("Number of columns is required")
    .test("is-three-digits", "Credit card number must be 3 digits", (value) => String(value).length === 3),
});
