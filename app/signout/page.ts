"use client";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function SignOut() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "isAdmin",
    "token",
    "username",
    "role",
  ]);
  const navigate = useRouter();

  removeCookie("isAdmin", { path: "/" });
  removeCookie("token", { path: "/" });
  removeCookie("username", { path: "/" });
  removeCookie("role", { path: "/" });

  navigate.push("/signin");
  navigate.refresh();

  return null;
}
