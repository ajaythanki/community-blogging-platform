import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserDropdown from "./UserDropdown";
import { TUser } from "../types";

export default function NavBar() {

  const [activeLink, setActiveLink] = useState();

  
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
          {isAuthenticated && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={activeLink}
                onChange={(_, val) => setActiveLink(val)}
              >
                <Tab label="Blogs" component={Link} defaultChecked={true} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}
            {!isAuthenticated && (
          <Box display={"flex"} marginLeft="auto">
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
                  Register
                </Button>
              </>
          </Box>
            )}
            {isAuthenticated && (
               <UserDropdown/>
            )}
        </Toolbar>
      </AppBar>
    </>
  );
}
