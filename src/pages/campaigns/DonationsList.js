import React, { useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import { Container, Snackbar, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/api";

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const { user } = useAuth();
  const [snackbar, setSnackbar] = useState({
    message: "",
    alertType: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbar = (message, alertType) => {
    setSnackbar({
      message: message,
      alertType: alertType,
    });
    setOpenSnackbar(true);
  };

  const handleCancelDonation = async (donationId) => {
    try {
      await api.put(`/user/donations/${donationId}/cancel`);
      const res = await api.get(`/user/donations/${user?.user_id}`);
      setDonations(res.data);
      handleSnackbar("Donation cancelled successfully!", "success");
    } catch (error) {
      handleSnackbar("Failed to cancel donation", "error");
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await api.get(`/user/donations/${user?.user_id}`);
        setDonations(response.data);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbar.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        severity={snackbar.alertType === "success" ? "success" : "error"}
      />
      <Typography variant="h4" gutterBottom>
        My Donations
      </Typography>
      {donations.map((donation) => (
        <DonationCard
          key={donation?._id}
          donation={donation || {}}
          handleCancelDonation={handleCancelDonation}
        />
      ))}
    </Container>
  );
};

export default DonationsList;
