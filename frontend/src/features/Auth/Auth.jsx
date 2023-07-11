import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Input from "./Input";
import styles from "./Auth.module.css";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSwitchMode = () => setIsSignup((isSignup) => !isSignup);

  const handleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={styles.paper} elevation={3}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Login"}</Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <GoogleLogin
            className={styles.googleButton}
            onSuccess={(credentialResponse) => {
              const user = jwt_decode(credentialResponse);
              console.log(user);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <Button
            className={styles.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="error"
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>
        <Button onClick={handleSwitchMode}>
          {isSignup
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </Button>
      </Paper>
    </Container>
  );
}

export default Auth;
