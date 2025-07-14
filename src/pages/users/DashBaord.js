import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
        }}
      >
        <Typography variant="h5" gutterBottom>
          My Campaigns
        </Typography>
        {/* Add your user-specific campaigns content here */}
        <Typography variant="body1" gutterBottom>
          View and manage the campaigns you have created.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/user/campaigns"
          sx={{ mt: 3, mb: 1 }}
        >
          My Campaigns
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/user/campaigns/create-campaign"
          sx={{ mt: 3, mb: 1 }}
          style={{ marginLeft: 12 }}
        >
          Create Campaign
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
        }}
      >
        <Typography variant="h5" gutterBottom>
          My Donations
        </Typography>
        {/* Add your list of user's donations here */}
        <Typography variant="body1" gutterBottom>
          View the list of campaigns you have donated to.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/user/donations"
          sx={{ mt: 3, mb: 1 }}
        >
          View My Donations
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "2rem",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
        {/* Add your user profile information here */}
        <Typography variant="body1" gutterBottom>
          View and edit your user profile details like name, email, etc.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/user/profile"
          sx={{ mt: 3, mb: 1 }}
        >
          Edit Profile
        </Button>
      </Box>
    </Container>
  );
};

export default UserDashboard;
