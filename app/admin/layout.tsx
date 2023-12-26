"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookies] = useCookies(["isAdmin"]);
  const navigate = useRouter();

  console.log(cookies);
  
  if (!cookies || !cookies.isAdmin) {
    navigate.push("/signin");
    navigate.refresh();
    return null;
  }
  
  return (
    <Container maxWidth="lg" className="mt-5">
      {children}
    </Container>
  );
}
