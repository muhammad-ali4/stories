import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSwitchMode = () => setIsSignup((isSignup) => !isSignup);

  const handleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    const { name, picture, sub } = decoded;
    const user = {
      _id: sub,
      name: name,
      picture: picture,
    };

    localStorage.setItem("profile", JSON.stringify({ ...user }));

    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teller = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    if (!isSignup) {
      axios
        .post("http://localhost:5000/teller/login", teller)
        .then(function (response) {
          const { result } = response.data;
          localStorage.setItem("profile", JSON.stringify({ ...result }));
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:5000/teller/signup", teller)
        .then(function (response) {
          const { result } = response.data;
          localStorage.setItem("profile", JSON.stringify({ ...result }));
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

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
                  value={firstName}
                  handleChange={handleFirstNameChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  value={lastName}
                  handleChange={handleLastNameChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              value={email}
              handleChange={handleEmailChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              handleChange={handlePasswordChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                handleChange={handleConfirmPasswordChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <GoogleLogin
            className={styles.googleButton}
            onSuccess={handleGoogleSuccess}
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
