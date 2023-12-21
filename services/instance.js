import axios from "axios";

const BASE_URL = "http://localhost:5000";

let TOKEN = "";
const cookie = document.cookie;
if (cookie) {
  TOKEN = cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    .split("=")[1];
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
