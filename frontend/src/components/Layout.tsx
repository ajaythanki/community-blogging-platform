import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <Toaster position="top-center" />
      <Container
        component="main"
        style={{ paddingTop: "2rem", minHeight: "80vh" }}
      >
        <CssBaseline />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
