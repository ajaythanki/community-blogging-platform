import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useSignupMutation,
  useVerifyUserMutation,
} from "../redux/features/auth/hooks/useAuth";

export default function SignUpPage() {
  const navigate = useNavigate();

  const {
    mutateAsync: verifyMutation,
    isSuccess: isVerifySuccess,
    // data: signUpData,
  } = useVerifyUserMutation();
  if (isVerifySuccess) {
    navigate("/");
  }
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    mutateAsync: signupMutation,
    isSuccess: isSignupSuccess,
    isPending: isSignupPending,
  } = useSignupMutation();

  const signUpFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here

      const { email, password, firstName, lastName } = values;

      signupMutation({
        username: firstName + " " + lastName,
        email: email,
        password: password,
      });
      
      console.log("Form submitted:", email, password, firstName, lastName);
      signUpFormik.resetForm();
    },
  });

  const handleTogglePasswordVisibility = () => {
    signUpFormik.setFieldValue(
      "showPassword",
      !signUpFormik.values.showPassword,
    );
  };

  const otpFormik = useFormik({
    initialValues: { otp: "" },
    validationSchema: yup.object().shape({
      otp: yup
        .string()
        .matches(/^[0-9]+$/, "Please enter valid OTP")
        .required("Required"),
    }),
    onSubmit: async (val) => {
      verifyMutation({ verificationCode: val.otp });
      // navigate("/login");
    },
  });

  return (
    <Container maxWidth={"sm"}>
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
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={signUpFormik.handleSubmit}
        display={isSignupSuccess ? "none" : "block"}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              disabled={isSignupPending}
              onChange={signUpFormik.handleChange}
              error={
                signUpFormik.touched.firstName &&
                Boolean(signUpFormik.errors.firstName)
              }
              value={signUpFormik.values.firstName}
              helperText={
                signUpFormik.touched.firstName && signUpFormik.errors.firstName
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              disabled={isSignupPending}
              onChange={signUpFormik.handleChange}
              error={
                signUpFormik.touched.lastName &&
                Boolean(signUpFormik.errors.lastName)
              }
              value={signUpFormik.values.lastName}
              helperText={
                signUpFormik.touched.lastName && signUpFormik.errors.lastName
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              disabled={isSignupPending}
              onChange={signUpFormik.handleChange}
              error={
                signUpFormik.touched.email && Boolean(signUpFormik.errors.email)
              }
              value={signUpFormik.values.email}
              helperText={
                signUpFormik.touched.email && signUpFormik.errors.email
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={signUpFormik.values.showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              disabled={isSignupPending}
              onChange={signUpFormik.handleChange}
              error={
                signUpFormik.touched.password &&
                Boolean(signUpFormik.errors.password)
              }
              value={signUpFormik.values.password}
              helperText={
                signUpFormik.touched.password && signUpFormik.errors.password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      onClick={handleTogglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {signUpFormik.values.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                      <IconButton edge="end" />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={signUpFormik.values.showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="confirm-password"
              disabled={isSignupPending}
              onChange={signUpFormik.handleChange}
              error={
                signUpFormik.touched.confirmPassword &&
                Boolean(signUpFormik.errors.confirmPassword)
              }
              value={signUpFormik.values.confirmPassword}
              helperText={
                signUpFormik.touched.confirmPassword && signUpFormik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      onClick={handleTogglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {signUpFormik.values.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                      <IconButton edge="end" />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          onClick={()=>signUpFormik.submitForm()}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <RouterLink to="/login">
              Already have an account? Sign in
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {isSignupSuccess && (
          <Box
            component="form"
            noValidate
            onSubmit={otpFormik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="otp"
                  label="OTP"
                  type="password"
                  id="otp"
                  autoComplete="new-otp"
                  disabled={!isSignupSuccess}
                  onChange={otpFormik.handleChange}
                  error={otpFormik.touched.otp && Boolean(otpFormik.errors.otp)}
                  value={otpFormik.values.otp}
                  helperText={otpFormik.touched.otp && otpFormik.errors.otp}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
    </Container>
  );
}
