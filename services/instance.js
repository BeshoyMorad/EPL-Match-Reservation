import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;