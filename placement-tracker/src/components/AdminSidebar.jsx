import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessIcon from "@mui/icons-material/Business";

function AdminSidebar() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  const menuItems = [
    {
      text: "DASHBOARD",
      icon: <DashboardIcon />,
      path: "/admin",
    },
    {
      text: "STUDENTS",
      icon: <PeopleIcon />,
      path: "/admin/students",
    },
    {
      text: "APTITUDE",
      icon: <SchoolIcon />,
      path: "/admin/aptitude",
    },
    {
  text: "COMPANIES",
  icon: <BusinessIcon />,
  path: "/admin/companies",
},

  ];

  return (
    <Box
      sx={{
        width: "270px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        bgcolor: "#0f172a",
        color: "#fff",
        p: 3,
        boxSizing: "border-box",
        boxShadow: 4,
        zIndex: 1000,
      }}
    >

      {/* TALENTVERSE */}

      <Box
        sx={{
          textAlign: "center",
          mb: 3,
        }}
      >
<Typography
  component="h2"
  sx={{
    fontFamily: "'Arial Black', Impact, sans-serif",
    fontSize: "30px",
    fontWeight: 900,
    letterSpacing: "-1.5px",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  }}
>
  TALENT
  <Box component="span" sx={{ color: "#e50914" }}>
    VERSE
  </Box>
</Typography>

        <Typography
          sx={{
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#94a3b8",
            textTransform: "uppercase",
            mt: 1,
            fontWeight: 400,
          }}
        >
          Placement Preparation Hub
        </Typography>
      </Box>

      <Divider
        sx={{
          bgcolor: "#334155",
          mb: 3,
        }}
      />

      {/* MENU */}

      {menuItems.map((item) => {

        const isActive =
          item.path === "/admin"
            ? location.pathname === "/admin"
            : location.pathname.startsWith(item.path);

        return (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            startIcon={item.icon}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: 1.5,
              py: 1.3,
              px: 2,

              color: isActive
                ? "#ffffff"
                : "#cbd5e1",

              bgcolor: isActive
                ? "#e20505"
                : "transparent",

              borderRadius: "6px",

              fontSize: "15px",
              fontWeight: 400,
              letterSpacing: "0.5px",
              textTransform: "uppercase",

              "& .MuiButton-startIcon": {
                marginRight: "12px",
              },

              "&:hover": {
                bgcolor: "#ff3333",
                color: "#ffffff",
              },
            }}
          >
            {item.text}
          </Button>
        );
      })}

      {/* DIVIDER */}

      <Divider
        sx={{
          bgcolor: "#334155",
          my: 3,
        }}
      />

      {/* LOGOUT */}

      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={logout}
        sx={{
          py: 1.2,
          fontSize: "15px",
          fontWeight: 400,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          borderRadius: "6px",
        }}
      >
        LOGOUT
      </Button>

    </Box>
  );
}

export default AdminSidebar;