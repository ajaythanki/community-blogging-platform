import { Box, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <Toaster position="top-center" />
      <Box
        component="main"
        style={{ padding: "2rem", minHeight: "80vh" }}
      >
        <CssBaseline />
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
