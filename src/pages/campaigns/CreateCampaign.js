import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from "@mui/material";
import moment from "moment";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [cause, setCause] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [startDate, setStartDate] = useState(""); // Add state for start date
  const [endDate, setEndDate] = useState(""); // Add state for end date
  const [snackbar, setSnackbar] = useState({
    message: "",
    alertType: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const handleSnackbar = (message, alertType) => {
    setSnackbar({
      message: message,
      alertType: alertType,
    });
    setOpenSnackbar(true);
  };

  useEffect(() => {
    // Fetch campaign categories from the API
    const fetchCategories = async () => {
      try {
        const res = await api.get("/campaign-categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch campaign categories:", error);
      }
    };

    // Fetch campaign statuses from the API
    const fetchStatuses = async () => {
      try {
        const res = await api.get("/campaign-statuses");
        setStatuses(res.data);
      } catch (error) {
        console.error("Failed to fetch campaign statuses:", error);
      }
    };

    fetchCategories();
    fetchStatuses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endDateAdjusted = moment(endDate).set({ hour: 23, minute: 59 });

    // Validate that start date comes before end date
    if (moment(startDate).isAfter(endDateAdjusted)) {
      handleSnackbar("Start date must come before end date", "error");
      return;
    }

    try {
      // Call the API to create the campaign
      const res = await api.post("/campaigns", {
        user_id: user.user_id,
        title,
        cause,
        description,
        category_id: category,
        goal,
        start_date: startDate,
        end_date: endDateAdjusted.toISOString(),
        status_id: statuses.find((obj) => obj.status === "Pending")._id,
        amount_raised: 0, // Initialize the amount raised to zero
      });
      handleSnackbar("Campaign created successfully!", "success");
      navigate("/user/campaigns");
    } catch (error) {
      handleSnackbar("Failed to create campaign", "error");
      console.error("Failed to create campaign:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: "20px" }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbar.message}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          severity={snackbar.alertType === "success" ? "success" : "error"}
        />
        <Typography variant="h4">Create New Campaign</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ my: 2 }}
            required
          />
          <TextField
            label="Cause"
            fullWidth
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            sx={{ my: 2 }}
            required
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ my: 2 }}
            required
          />
          <Select
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ my: 2 }}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Goal (in USD)"
            fullWidth
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            sx={{ my: 2 }}
            required
          />
          <TextField
            label="Start Date"
            fullWidth
            type="date"
            value={startDate}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: moment().format("YYYY-MM-DD") }}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ my: 2 }}
            required
          />
          <TextField
            label="End Date"
            fullWidth
            type="date"
            value={endDate}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: moment().format("YYYY-MM-DD") }}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ my: 2 }}
            required
          />
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            Create Campaign
          </Button>
          <Button variant="outlined">Cancel</Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateCampaign;
