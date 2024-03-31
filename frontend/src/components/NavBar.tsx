import { AppBar, Box, Button,  Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import { TUser } from "../types";

export default function NavBar() {

  
  const {isAuthenticated}:TUser = useSelector((state: any) => state.user);


  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Button component={Link} to="/">
            <Typography
              sx={{ textTransform: "capitalize", color: "white" }}
              variant="h4"
            >
              BlogApp
            </Typography>
          </Button>
          <Box display={"flex"} marginLeft="auto" alignItems={"center"}>
            <Button component={Link} to="/" sx={{ margin: 1, color: "white" }}>
              Home
            </Button>
            {!isAuthenticated && (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ margin: 1, color: "white" }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{ margin: 1, color: "white" }}
                >
                  Signup
                </Button>
              </>
            )}
            {isAuthenticated && <UserDropdown />}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
