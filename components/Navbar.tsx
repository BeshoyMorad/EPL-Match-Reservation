"use client";

import { Box, Button, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import { useCookies } from "react-cookie";

const pages = [
  { name: "Matches", link: "/", icon: <SportsSoccerIcon /> },
  { name: "Profile", link: "/profile", icon: <PersonIcon /> },
  { name: "Register", link: "/signup", icon: <PersonAddIcon /> },
  { name: "Sign in", link: "/signin", icon: <LockIcon /> },
  { name: "Sign out", link: "/signout", icon: <ExitToAppIcon /> },
];

const adminPages = [
  { name: "Home", link: "/admin", icon: <HomeIcon /> },
  { name: "Manage All Users", link: "/admin/users", icon: <GroupIcon /> },
  { name: "Sign out", link: "/signout", icon: <ExitToAppIcon /> },
];

function NavbarItem({
  page,
}: {
  page: { name: string; link: string; icon: any };
}) {
  return (
    <Button
      key={page.name}
      sx={{ my: 1, color: "white", display: "block" }}
      href={page.link}
    >
      <Box display={{ xs: "none", sm: "block" }}>
        <div className="flex items-center gap-1">
          <span>{page.icon}</span>
          <span>{page.name}</span>
        </div>
      </Box>
      <Box display={{ sm: "none" }}>
        <span>{page.icon}</span>
      </Box>
    </Button>
  );
}

export default function Navbar() {
  const [cookies] = useCookies(["isAdmin", "token"]);
  const isAdmin = cookies.isAdmin;
  const isLoggedIn = cookies.token;

  return (
    <nav className="flex items-center px-3 bg-[var(--main-color)] mt-3 rounded-xl w-[98%] m-auto">
      <Typography
        // variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: "flex",
          fontWeight: 700,
          color: "white",
          textDecoration: "none",
          flexGrow: 1,
        }}
      >
        شجع وادلع
      </Typography>

      <Box sx={{ display: "flex" }}>
        {isAdmin
          ? adminPages.map((page) => <NavbarItem key={page.name} page={page} />)
          : pages.map((page) => {
              if (
                isLoggedIn &&
                (page.name === "Sign in" || page.name === "Register")
              ) {
                return null;
              } else if (
                !isLoggedIn &&
                (page.name === "Sign out" || page.name === "Profile")
              ) {
                return null;
              } else {
                return <NavbarItem key={page.name} page={page} />;
              }
            })}
      </Box>
    </nav>
  );
}
