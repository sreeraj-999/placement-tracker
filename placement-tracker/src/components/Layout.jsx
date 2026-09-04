import { Box } from "@mui/material";
import Sidebar from "./Sidebar";


function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
    <Sidebar />

    <Box
        sx={{
            marginLeft: "270px",
            width: "calc(100% - 270px)",
            minHeight: "100vh",
            p: 3,
        }}
    >
        {children}
    </Box>
</Box>
  );
}

export default Layout;