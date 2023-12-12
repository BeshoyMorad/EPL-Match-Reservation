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
    <>
      <AppBar
        component="nav"
        position="static"
        sx={{
          bgcolor: "var(--main-color)",
          borderRadius: "1rem",
          width: "97%",
          margin: "3px auto",
        }}
      >
        <Toolbar>
          <h5 className="flex-1">Admin panel</h5>

          {navItems.map((item) => (
            <Button key={item.title} sx={{ color: "#fff" }}>
              <Link href={`/${item.link}`}>{item.title}</Link>
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="mt-5">
        {children}
      </Container>
    </>
  );
}
