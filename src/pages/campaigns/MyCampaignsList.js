import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import api from "../../api/api";
import CampaignCard from "./CampaignCard";
import { useAuth } from "../../contexts/AuthContext";

const MyCampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await api.get(`/user/${user?.user_id}/campaigns`);
        setCampaigns(res.data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        My Campaigns List
      </Typography>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid key={campaign._id} item xs={12} sm={6} md={4} lg={3}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyCampaignsList;
