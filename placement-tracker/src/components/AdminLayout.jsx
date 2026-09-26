import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* PAGE CONTENT */}
      <Box
        sx={{
          marginLeft: "270px",
          minHeight: "100vh",
          width: "calc(100% - 270px)",
          boxSizing: "border-box",
          padding: "30px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;