import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "grid",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        <Box>
          <Typography variant="h2" gutterBottom>
            Welcome to our Charity Donation Platform
          </Typography>
          <Typography variant="body1" gutterBottom>
            Empower positive change with your donations. Browse and contribute
            to various charitable campaigns on our platform.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "2rem",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Make a Difference with Every Donation
        </Typography>
        <Typography variant="body1" gutterBottom>
          At our Charity Donation Platform, you can discover and support a wide
          range of charitable campaigns. From education and healthcare to
          environmental conservation and more, our platform connects you to
          organizations working towards meaningful social impact.
        </Typography>
        <Typography variant="body1" gutterBottom>
          With a user-friendly interface and transparent processes, you can
          easily create and manage fundraising campaigns for your chosen causes.
          Join our community of changemakers and be a part of driving positive
          change in the nonprofit sector.
        </Typography>
        <br />
        <Button variant="contained" component={Link} to="/campaigns">
          View Campaigns
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
