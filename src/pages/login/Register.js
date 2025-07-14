import {
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createData } from "../../api/api";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledContainer = styled(Container)`
  height: 100vh;
`;

const RegistrationForm = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background-color: #f3f3f3;
  border-radius: 8px;
  max-width: 400px;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showValidations, setShowValidations] = useState(false);

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleRegister = async () => {
    setShowValidations(true);
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);
    try {
      // Handle registration logic here
      const res = await createData("/user/register", {
        name,
        email,
        password,
        phone,
      });

      handleSnackbar("Registration successful. Please log in.");
      navigate("/user/login");
    } catch (error) {
      handleSnackbar("Registration failed.");
      console.log(error);
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <RegistrationForm>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
            />
            <Typography variant="h5" component="h1" gutterBottom>
              User Registration
            </Typography>
            <StyledTextField
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <StyledTextField
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <StyledTextField
              label="Phone Number"
              variant="outlined"
              size="small"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <StyledTextField
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <StyledTextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!passwordsMatch}
              helperText={!passwordsMatch ? "Passwords do not match" : ""}
            />
            <br />
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleRegister}
              fullWidth
            >
              Register
            </StyledButton>
            <br />
            <Typography variant="body1" gutterBottom>
              Already have an account? <a href="/user/login">Login here</a>
            </Typography>
          </RegistrationForm>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Register;
