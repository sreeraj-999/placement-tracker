import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import BusinessIcon from "@mui/icons-material/Business";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Sidebar() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    window.location.href = "/login";
  };

  const menuItems = [
    {
  text: "Student Profile",
  icon: <AccountCircleIcon />,
  path: "/profile",
},

    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Coding Progress",
      icon: <CodeIcon />,
      path: "/coding",
    },
    {
      text: "Aptitude",
      icon: <SchoolIcon />,
      path: "/aptitude",
    },
    {
      text: "AI Resume Analyzer",
      icon: <SmartToyIcon />,
      path: "/resume-ai",
    },
    {
      text: "Resume Score",
      icon: <DescriptionIcon />,
      path: "/resume",
    },
    {
      text: "Company Tracker",
      icon: <BusinessIcon />,
      path: "/company",
    },
    {
      text: "Analytics",
      icon: <AnalyticsIcon />,
      path: "/analytics",
    },
    
  ];

  return (
    <Box
      sx={{
        width: 270,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        bgcolor: "#0f172a",
        color: "#fff",
        p: 3,
        boxShadow: 4,
        zIndex: 1000,
      }}
>
<Box
  sx={{
    textAlign: "center",
    mb: 3,
  }}
>
  <Typography
    sx={{
      fontSize: "30px",
      fontWeight: "800",
      letterSpacing: "1px",
      background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      lineHeight: 1.2,
    }}
  >
    TalentVerse
  </Typography>

  <Typography
    sx={{
      fontSize: "11px",
      letterSpacing: "2px",
      color: "#94a3b8",
      textTransform: "uppercase",
      mt: 0.8,
      fontWeight: "600",
    }}
  >
    Placement Preparation Hub
  </Typography>
</Box>

      <Divider sx={{ bgcolor: "#334155", mb: 3 }} />

      <Typography
        sx={{
          color: "#cbd5e1",
          mb: 3,
          textAlign: "center",
        }}
      >
        Welcome
        <br />
        <strong>{localStorage.getItem("name")}</strong>
      </Typography>

      {menuItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          startIcon={item.icon}
          fullWidth
          sx={{
            justifyContent: "flex-start",
            mb: 1.5,
            py: 1.2,
            color:
              location.pathname === item.path
                ? "#fff"
                : "#cbd5e1",
            bgcolor:
              location.pathname === item.path
                ? "#2563eb"
                : "transparent",

            "&:hover": {
              bgcolor: "#1d4ed8",
              color: "#fff",
            },
          }}
        >
          {item.text}
        </Button>
      ))}

      <Divider sx={{ bgcolor: "#334155", my: 3 }} />

      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
}

export default Sidebar;