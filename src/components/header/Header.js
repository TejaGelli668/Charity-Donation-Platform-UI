import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 20px;
`;

const StyledButton = styled(Button)`
  margin-left: auto;
  margin-right: 20px;
`;

const Header = () => {
  const { isAdmin, isAuthenticated, isUser } = useAuth();
  const isLoggedIn = isAuthenticated();

  return (
    <AppBar position="sticky" style={{ top: 0 }}>
      <Toolbar>
        <StyledLink to="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Charity Donations
          </Typography>
        </StyledLink>

        <div style={{ marginLeft: "auto" }}>
          {isAdmin() && isLoggedIn && (
            <>
              <StyledLink to="/admin/dashboard">
                <Button color="inherit">Dashboard</Button>
              </StyledLink>
            </>
          )}
          {isUser() && isLoggedIn && (
            <>
              <StyledLink to="/campaigns">
                <Button color="inherit">Campaigns</Button>
              </StyledLink>
              <StyledLink to="/user/dashboard">
                <Button color="inherit">Dashboard</Button>
              </StyledLink>
            </>
          )}
          {!isLoggedIn && (
            <>
              <StyledLink to="/campaigns">
                <Button color="inherit">Campaigns</Button>
              </StyledLink>
              <StyledLink to="/user/login">
                <Button color="inherit">Login</Button>
              </StyledLink>
              <StyledLink to="/user/register">
                <Button color="inherit">Register</Button>
              </StyledLink>
            </>
          )}
          {isLoggedIn && (
            <StyledLink to="/logout">
              <Button color="inherit">Logout</Button>
            </StyledLink>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
