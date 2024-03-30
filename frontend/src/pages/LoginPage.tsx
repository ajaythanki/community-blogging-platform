import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useLoginMutation } from "../redux/features/auth/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../redux/features/auth/userSlice";
import * as yup from "yup";
import { useFormik } from "formik";
import { Checkbox, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, mutateAsync, data } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (val) => {
      const { email, password, rememberMe } = val;
      console.log("values", val);
      console.log("Remember me:", rememberMe);
      mutateAsync({
        email: email.trim(),
        password: password.trim(),
      });
      rememberMe === true
        ? window.localStorage.setItem(
            "rmU",
            JSON.stringify({ email, password }),
          )
        : window.localStorage.removeItem("rmU");

      formik.resetForm();
    },
  });

  if (isAuthenticated) {
    navigate("/");
  }
  useEffect(() => {
    if (isSuccess) {
      navigate("/blogs");
      dispatch(setUser({userData:data?.user,isAuthenticated:true}));
      window.localStorage.setItem("authUser", JSON.stringify(data?.user));
    }
  }, [isSuccess, data]);


  useEffect(() => {
    const rmbMeData = localStorage.getItem("rmU");
    if (rmbMeData && rmbMeData !== undefined && rmbMeData !== null) {
      const uData = JSON.parse(rmbMeData);
      if (Object.keys(uData).length > 0) {
        formik.setFieldValue("rememberMe", true);
        formik.setFieldValue("email", uData.email);
        formik.setFieldValue("password", uData.password);
      }
    }
  }, []);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          variant="outlined"
          name="email"
          autoComplete="email"
          type="email"
          autoFocus
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          variant="outlined"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                  <IconButton edge="end" />
                </div>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="#">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
