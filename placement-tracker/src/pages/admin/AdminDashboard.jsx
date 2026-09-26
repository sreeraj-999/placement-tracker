import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalQuestions: 0,
    totalTestAttempts: 0,
    totalAdmins: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "/api/admin/dashboard",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.log(
        "Admin dashboard error:",
        error
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >

      {/* HEADER */}

      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#1e293b",
            mb: 1,
          }}
        >
          Admin Dashboard
        </Typography>

        <Typography
          sx={{
            fontSize: "17px",
            color: "#64748b",
          }}
        >
          Manage students, aptitude questions and
          company preparation resources.
        </Typography>
      </Box>


      {/* STATISTICS */}

      <Grid
        container
        spacing={3}
      >

        {/* STUDENTS */}

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              height: "150px",
            }}
          >
            <CardContent
              sx={{
                p: 3,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >

                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundColor: "#dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon
                    sx={{
                      color: "#2563eb",
                      fontSize: 30,
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: "15px",
                    }}
                  >
                    Total Students
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#2563eb",
                    }}
                  >
                    {stats.totalStudents}
                  </Typography>
                </Box>

              </Box>

            </CardContent>
          </Card>
        </Grid>


        {/* APTITUDE QUESTIONS */}

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              height: "150px",
            }}
          >
            <CardContent
              sx={{
                p: 3,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >

                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundColor: "#dcfce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SchoolIcon
                    sx={{
                      color: "#16a34a",
                      fontSize: 30,
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: "15px",
                    }}
                  >
                    Aptitude Questions
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#16a34a",
                    }}
                  >
                    {stats.totalQuestions}
                  </Typography>
                </Box>

              </Box>

            </CardContent>
          </Card>
        </Grid>


        {/* ADMINISTRATORS */}

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              height: "150px",
            }}
          >
            <CardContent
              sx={{
                p: 3,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >

                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundColor: "#fef3c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BusinessIcon
                    sx={{
                      color: "#d97706",
                      fontSize: 30,
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: "15px",
                    }}
                  >
                    Administrators
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#d97706",
                    }}
                  >
                    {stats.totalAdmins}
                  </Typography>
                </Box>

              </Box>

            </CardContent>
          </Card>
        </Grid>

      </Grid>


      {/* ADMIN RESPONSIBILITIES */}

      <Card
        sx={{
          mt: 4,
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >

          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#1e293b",
              mb: 3,
            }}
          >
            Admin Responsibilities
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >

            <Typography
              sx={{
                color: "#475569",
                fontSize: "16px",
              }}
            >
              • Manage registered students
            </Typography>

            <Typography
              sx={{
                color: "#475569",
                fontSize: "16px",
              }}
            >
              • Manage aptitude question bank
            </Typography>

            <Typography
              sx={{
                color: "#475569",
                fontSize: "16px",
              }}
            >
              • Manage company information
            </Typography>

            <Typography
              sx={{
                color: "#475569",
                fontSize: "16px",
              }}
            >
              • Manage previous-year company question papers
            </Typography>

          </Box>

        </CardContent>
      </Card>

    </Box>
  );
}

export default AdminDashboard;