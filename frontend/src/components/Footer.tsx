import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = (props: any) => {
  return (
    <Box component={"div"} sx={{ position: "sticky", bottom: 0 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link
          color="inherit"
          to="https://github.com/ajaythanki/"
          target="_blank"
        >
          Ajay Thanki
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
