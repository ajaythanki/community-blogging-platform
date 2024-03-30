import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearUser, setUser } from "../redux/features/auth/userSlice";

export default function NavBar() {

  const [activeLink, setActiveLink] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state:any) => state?.user?.userData?.email);

  useEffect(() => {
    if (!user) {
      const userData = JSON.parse(window.localStorage.getItem("authUser") as string);
      if (userData?.email) {
        dispatch(setUser(userData));
        navigate("/");
      }
    }
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

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
          {user && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={activeLink}
                onChange={(_, val) => setActiveLink(val)}
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!user && (
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
            )}
            {user && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
