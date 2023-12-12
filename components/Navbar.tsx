"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const pages = [
  { name: "Matches", icon: <SportsSoccerIcon /> },
  { name: "Profile", icon: <PersonIcon /> },
  // { name: "Register", icon: <PersonAddIcon /> },
  // { name: "Sign in", icon: <LockIcon /> },
  { name: "Sign out", icon: <ExitToAppIcon /> },
];

export default function Navbar() {
  return (
    <AppBar
      position="static"
      className="bg-[var(--main-color)] mt-3 rounded-xl w-[98%] m-auto"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ display: "flex" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 1, color: "white", display: "block" }}
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
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
