
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";

function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/admin/dashboard", {
          headers: {
            Authorization: token,
          },
        });

        setTotalStudents(response.data.totalStudents ?? 0);
      } catch (error) {
        console.error("Admin dashboard error:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <Box
      sx={{
        height: "calc(100vh - 82px)",
        minHeight: 0,
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        px: 2,
        py: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* TALENTVERSE HEADER */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 3, md: 4 },
          width: "100%",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            fontSize: {
              xs: "2.5rem",
              sm: "4rem",
              md: "5.5rem",
            },
            fontWeight: 900,
            letterSpacing: {
              xs: "-2px",
              md: "-4px",
            },
            lineHeight: 1.05,
            color: "#111111",
          }}
        >
          TALENT
          <Box
            component="span"
            sx={{
              color: "#e50914",
            }}
          >
            VERSE
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#333333",
            fontSize: { xs: "0.75rem", md: "1rem" },
            fontWeight: 700,
            letterSpacing: { xs: "3px", md: "5px" },
          }}
        >
          ADMIN DASHBOARD
        </Typography>
      </Box>

      {/* STUDENT COUNT CARD */}
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 450,
          minHeight: 260,
          borderRadius: 4,
          border: "1px solid #fecaca",
          borderLeft: "6px solid #e50914",
          background:
            "linear-gradient(135deg, #fffafa 0%, #ffffff 100%)",
          boxShadow: "0 8px 25px rgba(229, 9, 20, 0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            width: "100%",
            textAlign: "center",
            py: 3,
            px: 3,
            "&:last-child": {
              pb: 3,
            },
          }}
        >
          {/* ICON */}
          <Box
            sx={{
              width: 60,
              height: 60,
              mx: "auto",
              mb: 1.5,
              borderRadius: 3,
              backgroundColor: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e50914",
            }}
          >
            <PeopleIcon sx={{ fontSize: 34 }} />
          </Box>

          {/* LABEL */}
          <Typography
            sx={{
              color: "#222222",
              fontSize: "1.1rem",
              fontWeight: 700,
            }}
          >
            Total Students
          </Typography>

          {/* COUNT */}
          <Typography
            sx={{
              mt: 0.5,
              color: "#e50914",
              fontSize: "3.5rem",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            {totalStudents}
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            sx={{
              mt: 0.5,
              color: "#555555",
              fontSize: "0.9rem",
            }}
          >
      
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminDashboard;