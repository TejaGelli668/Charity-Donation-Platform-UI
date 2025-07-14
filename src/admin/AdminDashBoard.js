import React from "react";
import styled from "styled-components";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)`
  padding: 32px;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const AdminDashBoard = () => {
  const navigate = useNavigate();
  return (
    <StyledBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StyledCard onClick={() => navigate("/admin/users-list")}>
            <StyledCardContent>
              <StyledTypography gutterBottom variant="h5" component="h2">
                Users
              </StyledTypography>
              <StyledTypography variant="body2" component="p">
                Manage users and their profiles
              </StyledTypography>
            </StyledCardContent>
            <StyledButton size="small" color="primary">
              View Users
            </StyledButton>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StyledCard onClick={() => navigate("/admin/campaigns")}>
            <StyledCardContent>
              <StyledTypography gutterBottom variant="h5" component="h2">
                Campaigns
              </StyledTypography>
              <StyledTypography variant="body2" component="p">
                Manage Campaigns
              </StyledTypography>
            </StyledCardContent>
            <StyledButton size="small" color="primary">
              View Campaigns
            </StyledButton>
          </StyledCard>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default AdminDashBoard;
