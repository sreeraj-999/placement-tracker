import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";

function StudentProfile() {
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    leetcode: "",
    portfolio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data) {
        setProfile({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          linkedin: res.data.linkedin || "",
          github: res.data.github || "",
          leetcode: res.data.leetcode || "",
          portfolio: res.data.portfolio || "",
        });

        if (res.data.profilePhoto) {
          setPhoto(
            `http://localhost:5000/uploads/profile/${res.data.profilePhoto}`
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", profile.fullName);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("linkedin", profile.linkedin);
      formData.append("github", profile.github);
      formData.append("leetcode", profile.leetcode);
      formData.append("portfolio", profile.portfolio);

      if (photoFile) {
        formData.append("profilePhoto", photoFile);
      }

      const token = localStorage.getItem("token");

      try {
        await axios.post(
          "http://localhost:5000/api/profile/create",
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Profile Created Successfully");

      } catch (error) {

        if (
          error.response &&
          error.response.data.message === "Profile already exists"
        ) {
          await axios.put(
            "http://localhost:5000/api/profile/update",
            formData,
            {
              headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          alert("Profile Updated Successfully");

        } else {
          throw error;
        }
      }

      fetchProfile();

    } catch (err) {

      console.log(err);
      alert("Unable to Save Profile");

    }
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f4f7fb",
          p: { xs: 2, md: 4 },
        }}
      >

        {/* Page Title */}

        <Box mb={4}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#1e293b"
          >
            Student Profile
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              mt: 1,
            }}
          >
            Manage your personal information and professional profiles
          </Typography>
        </Box>


        {/* Profile Header */}

        <Card
          sx={{
            borderRadius: 4,
            mb: 4,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <Box
            sx={{
              height: 130,
              background:
                "linear-gradient(135deg, #2563eb, #2563eb)",
            }}
          />

          <CardContent
            sx={{
              mt: -10,
              textAlign: "center",
            }}
          >

            <Avatar
              src={photo}
              sx={{
                width: 150,
                height: 150,
                margin: "auto",
                border: "6px solid white",
                boxShadow: 4,
                bgcolor: "#2563eb",
                fontSize: 50,
              }}
            >
              {profile.fullName
                ? profile.fullName.charAt(0).toUpperCase()
                : <PersonIcon sx={{ fontSize: 60 }} />
              }
            </Avatar>

            <Button
              component="label"
              startIcon={<PhotoCameraIcon />}
              sx={{
                mt: 2,
                color: "#0077b5",
                fontWeight: "bold",
              }}
            >
              Change Profile Photo

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handlePhoto}
              />
            </Button>

            <Typography
              variant="h5"
              fontWeight="bold"
              mt={1}
            >
              {profile.fullName || "Your Name"}
            </Typography>

            <Typography
              color="text.secondary"
              mb={2}
            >
              {profile.email || "Add your email address"}
            </Typography>


          </CardContent>

        </Card>


        {/* Main Profile Sections */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 4,
          }}
        >

          {/* Personal Information */}

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
            }}
          >

            <CardContent sx={{ p: 4 }}>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={3}
              >
                <PersonIcon color="primary" />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Personal Information
                </Typography>

              </Stack>

              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: "#64748b" }} />,
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                value={profile.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: "#64748b" }} />,
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ mr: 1, color: "#64748b" }} />,
                }}
              />

            </CardContent>

          </Card>


          {/* Professional Links */}

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
            }}
          >

            <CardContent sx={{ p: 4 }}>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={3}
              >
                <CodeIcon color="primary" />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Professional Profiles
                </Typography>

              </Stack>

              <TextField
                fullWidth
                margin="normal"
                label="LinkedIn URL"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <LinkedInIcon sx={{ mr: 1, color: "#0077b5" }} />,
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="GitHub URL"
                name="github"
                value={profile.github}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <GitHubIcon sx={{ mr: 1, color: "#333" }} />,
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="LeetCode Username"
                name="leetcode"
                value={profile.leetcode}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <CodeIcon sx={{ mr: 1, color: "#f59e0b" }} />,
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Portfolio Website"
                name="portfolio"
                value={profile.portfolio}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <LanguageIcon sx={{ mr: 1, color: "#ed3a3a" }} />,
                }}
              />

            </CardContent>

          </Card>

        </Box>


        {/* Save Button */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
          }}
        >

          <Button
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, #ed3a3a, #e54646)",
              fontWeight: "bold",

              "&:hover": {
                background:
                  "linear-gradient(135deg, #d92828, #ca3838)",
              },
            }}
          >
            Save Profile
          </Button>

        </Box>

      </Box>
    </Layout>
  );
}

export default StudentProfile;