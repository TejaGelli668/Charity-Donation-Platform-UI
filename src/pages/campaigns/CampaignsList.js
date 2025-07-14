import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import api from "../../api/api";
import CampaignCard from "./CampaignCard";
import moment from "moment";

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filterType, setFilterType] = useState("active"); // Default to "Active"

  useEffect(() => {
    // Fetch the list of campaigns from the API
    const fetchCampaigns = async () => {
      try {
        const res = await api.get("/campaigns");
        setCampaigns(res.data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter(
    ({ status_id }) =>
      status_id &&
      (status_id.status === "Approved" || status_id.status === "Completed")
  );

  const activeCampaigns = filteredCampaigns.filter(
    ({ end_date, status_id }) =>
      moment(end_date).isAfter() && status_id.status === "Approved"
  );
  const completedCampaigns = filteredCampaigns.filter(
    ({ end_date, status_id }) =>
      !moment(end_date).isAfter() || status_id.status === "Completed"
  );

  const displayedCampaigns =
    filterType === "active" ? activeCampaigns : completedCampaigns;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Campaigns List
      </Typography>
      <FormControl variant="outlined" style={{ marginBottom: "16px" }}>
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          id="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          label="Filter"
          style={{ width: 160 }}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {displayedCampaigns.map((campaign) => (
          <Grid key={campaign._id} item xs={12} sm={6} md={4} lg={3}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CampaignsList;
