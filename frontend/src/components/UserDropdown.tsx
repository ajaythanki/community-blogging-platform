import { useState, SyntheticEvent, Fragment } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TUser } from "../types";
import { clearUser } from "../redux/features/auth/userSlice";
import { useLogoutMutation } from "../redux/features/auth/hooks/useAuth";

const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync } = useLogoutMutation();
  
  // const user = useSelector((state:any) => state?.user?.userData?.email);

  const {userData}:TUser = useSelector((state: any) => state.user);

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      navigate(url);
    }
    setAnchorEl(null);
  };

  const handleLogout = () => {
    mutateAsync();
    dispatch(clearUser());
    navigate("/login");
    handleDropdownClose();
  };
  
  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar
          alt={userData.username}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            to={"/profile"}
          >
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar
                alt={userData?.username}
                // src={
                //   authData?.userData?.profileImage
                //     ? `${UrlHelper.imagUrlPath}${authData?.userData?.profileImage}`
                //     : "/images/avatars/1.png"
                // }
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>
            <Box
              sx={{
                display: "flex",
                ml: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                {userData?.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {userData?.email}
              </Typography>
            </Box>
          </Link>
        </Box>
        <Divider sx={{ mt: "0 !important" }} />
        <MenuItem
          onClick={() => console.log("Profile")}
          sx={{
            py: 2,
            "& svg": {
              mr: 2,
              fontSize: "1.375rem",
            },
          }}
        >
          
          Profile
        </MenuItem>
        <MenuItem
          onClick={() =>
            console.log("Change Password")
            // dispatch(
            //   handleOpenAuthModel({ open: true, type: "CHANGEPASSWORD" })
            // )
          }
          sx={{
            py: 2,
            "& svg": {
              mr: 2,
              fontSize: "1.375rem",
            },
          }}
        >
          Password
        </MenuItem>
        
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            "& svg": {
              mr: 2,
              fontSize: "1.375rem",
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
