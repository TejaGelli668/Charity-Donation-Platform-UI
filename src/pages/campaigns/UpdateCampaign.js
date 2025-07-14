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
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const UpdateCampaign = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { id: campaignId } = useParams();
  const [campaign, setCampaign] = useState({});
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
    // Fetch campaign data based on the campaignId
    const fetchCampaign = async () => {
      try {
        const res = await api.get(`/campaigns/${campaignId}`);

        const campaignData = res.data;
        campaignData.start_date = moment(res.data.start_date).format(
          "YYYY-MM-DD"
        );
        campaignData.end_date = moment(res.data.end_date).format("YYYY-MM-DD");
        setCampaign({ ...campaignData });
      } catch (error) {
        console.error("Failed to fetch campaign:", error);
      }
    };

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

    fetchCampaign();
    fetchCategories();
    fetchStatuses();
  }, [campaignId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endDateAdjusted = moment(campaign.end_date).set({
      hour: 23,
      minute: 59,
    });
    const payload = isAdmin()
      ? {
          status_id: campaign.status_id,
        }
      : {
          user_id: user.user_id,
          title: campaign.title,
          cause: campaign.cause,
          description: campaign.description,
          category_id: campaign.category_id,
          goal: campaign.goal,
          start_date: campaign.start_date,
          end_date: endDateAdjusted,
          status_id: statuses.find((obj) => obj.status === "Pending")._id,
        };
    try {
      // Call the API to Update the campaign
      await api.put(`/campaigns/${campaignId}`, payload);
      handleSnackbar("Campaign updated successfully!", "success");
      if (isAdmin()) {
        navigate("/admin/campaigns");
      } else navigate("/user/campaigns");
    } catch (error) {
      handleSnackbar("Failed to update campaign", "error");
      console.error("Failed to update campaign:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbar.message}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          severity={snackbar.alertType === "success" ? "success" : "error"}
        />
        <Typography variant="h4">Update Campaign</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            value={campaign.title || ""}
            onChange={(e) =>
              setCampaign({ ...campaign, title: e.target.value })
            }
            sx={{ my: 2 }}
            required
            disabled={isAdmin()}
          />
          <TextField
            label="Cause"
            fullWidth
            value={campaign.cause || ""}
            onChange={(e) =>
              setCampaign({ ...campaign, cause: e.target.value })
            }
            sx={{ my: 2 }}
            required
            disabled={isAdmin()}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={campaign.description || ""}
            onChange={(e) =>
              setCampaign({ ...campaign, description: e.target.value })
            }
            sx={{ my: 2 }}
            required
            disabled={isAdmin()}
          />
          <Select
            label="Category"
            fullWidth
            value={campaign.category_id?._id || ""}
            onChange={(e) =>
              setCampaign({ ...campaign, category_id: e.target.value })
            }
            sx={{ my: 2 }}
            required
            disabled={isAdmin()}
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
            value={campaign.goal || ""}
            onChange={(e) => setCampaign({ ...campaign, goal: e.target.value })}
            sx={{ my: 2 }}
            required
            disabled={isAdmin()}
          />
          <TextField
            label="Start Date"
            fullWidth
            type="date"
            value={campaign.start_date || ""}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: moment().format("YYYY-MM-DD") }}
            onChange={(e) =>
              setCampaign({ ...campaign, start_date: e.target.value })
            }
            sx={{ my: 2 }}
            required
            disabled={isAdmin()}
          />
          <TextField
            label="End Date"
            fullWidth
            type="date"
            value={campaign.end_date || ""}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: moment().format("YYYY-MM-DD") }}
            onChange={(e) =>
              setCampaign({ ...campaign, end_date: e.target.value })
            }
            sx={{ my: 2 }}
            required
            disabled={isAdmin()}
          />
          {isAdmin() && (
            <Select
              label="Status"
              fullWidth
              value={campaign.status_id?._id || ""}
              onChange={(e) =>
                setCampaign({ ...campaign, status_id: { _id: e.target.value } })
              }
              sx={{ my: 2 }}
              required
            >
              {statuses
                .filter(
                  (status) =>
                    status.status === "Approved" || status.status === "Rejected"
                )
                .map((status) => (
                  <MenuItem key={status._id} value={status._id}>
                    {status.status}
                  </MenuItem>
                ))}
            </Select>
          )}
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{ mr: 2 }}
          >
            Update Campaign
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/user/campaigns")}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateCampaign;
