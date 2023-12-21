import { AppBar, Box, Button, Toolbar, Container } from "@mui/material";
import Link from "next/link";

const navItems = [
  {
    title: "Home",
    link: "admin",
  },
  {
    title: "Manage All Users",
    link: "admin/users",
  },
];

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg" className="mt-5">
      {children}
    </Container>
  );
}
