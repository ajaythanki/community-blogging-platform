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
          <Button LinkComponent={Link} href="/">
            <Typography sx={{ textTransform: "capitalize", color:"white" }} variant="h4">
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
                <Tab label="Blogs" LinkComponent={Link} href="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} href="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  href="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!user && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  href="/signup"
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
