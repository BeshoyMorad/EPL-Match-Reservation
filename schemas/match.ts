import * as yup from "yup";

export const matchSchema = yup.object().shape({
  homeTeam: yup.string().required("Home team is required"),
  awayTeam: yup
    .string()
    .required("Away team is required")
    .notOneOf(
      [yup.ref("homeTeam")],
      "Away team cannot be the same as Home team"
    ),
  stadium: yup
    .string()
    .required("Stadium is required")
    .min(5, "Stadium name is too short"),
  date: yup
    .date()
    .required("Date is required")
    .min(new Date(), "Date must be equal to or after today"),
  mainReferee: yup
    .string()
    .required("Main referee is required")
    .min(5, "Main referee name is too short"),
  linesman1: yup
    .string()
    .required("Linesman 1 is required")
    .min(5, "Linesman 1 name is too short"),
  linesman2: yup
    .string()
    .required("Linesman 2 is required")
    .min(5, "Linesman 2 name is too short"),
});
