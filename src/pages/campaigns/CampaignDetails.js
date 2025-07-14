import {
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import CharityImage from "../../images/CharityImage";
import PaymentForm from "./PaymentForm";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [donationAmount, setDonationAmount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    message: "",
    alertType: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { user, isUser } = useAuth();

  const handleSnackbar = (message, alertType) => {
    setSnackbar({
      message: message,
      alertType: alertType,
    });
    setOpenSnackbar(true);
  };

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const campaignRes = await api.get(`/campaigns/${id}`);
        setCampaign(campaignRes.data);
        const donationsRes = await api.get(`/campaigns/${id}/donations`);
        setDonations(donationsRes.data);
      } catch (error) {
        console.error("Failed to fetch campaign details:", error);
      }
    };
    fetchCampaignDetails();
  }, [id]);

  console.log(campaign);

  if (!campaign) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  const handleDonateClick = async ({
    cardNumber,
    cardName,
    expiryMonth,
    expiryYear,
    cvv,
    paymentType,
  }) => {
    if (donationAmount <= 0) {
      handleSnackbar("Donation amount must be greater than 0", "error");
      return;
    }
    const payload = {
      amount: parseInt(donationAmount),
      campaign_id: id,
      user_id: user?.user_id,
      user_name: user?.name,
      card_number: cardNumber,
      card_name: cardName,
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
      cvv: cvv,
      payment_type: paymentType,
      donation_status: "Success",
      refund_amount: 0,
      refund_status: "Not Requested",
    };
    try {
      await api.post(`/campaigns/${id}/donation`, payload);
      handleSnackbar("Successfully donated", "success");
      setShowPayment(false);
      setDonationAmount(0);
      const campaignRes = await api.get(`/campaigns/${id}`);
      setCampaign(campaignRes.data);
      const donationsRes = await api.get(`/campaigns/${id}/donations`);
      setDonations(donationsRes.data);
    } catch (error) {
      handleSnackbar("Failed while saving the donation", "error");
      console.error("Failed while saving the donation:", error);
    }
  };

  const handleDonationAmountChange = (e) => {
    setDonationAmount(e.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {campaign.title}
      </Typography>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbar.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        severity={snackbar.alertType === "success" ? "success" : "error"}
      />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* Left Column - Campaign Details */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ maxWidth: 600, marginBottom: 2 }}>
              <CharityImage
                category={campaign.category_id?.category}
                alt={campaign.title}
                style={{ height: 300, width: 600 }}
              />
            </Box>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              Cause:
            </Typography>
            <Typography>{campaign.cause}</Typography>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              Description:
            </Typography>
            <Typography>{campaign.description}</Typography>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              Category:
            </Typography>
            <Typography>{campaign.category_id?.category}</Typography>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              Start Date:
            </Typography>
            <Typography>
              {moment(campaign.start_date).format("MM-DD-YYYY, hh:mm A")}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              End Date:
            </Typography>
            <Typography>
              {moment(campaign.end_date).format("MM-DD-YYYY, hh:mm A")}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              Goal (in USD):
            </Typography>
            <Typography>${campaign.goal}</Typography>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              Status:
            </Typography>
            <Typography>
              {!moment(campaign.end_date).isAfter()
                ? "Completed"
                : campaign.status_id?.status}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              Amount Raised (in USD):
            </Typography>
            <Typography>${campaign.amount_raised}</Typography>
          </Box>
          {isUser() && campaign.user_id === user?.user_id && (
            <Box sx={{ marginBottom: 2 }}>
              <Button
                variant="contained"
                component={Link}
                to={`/user/campaigns/${id}/update-campaign`}
              >
                Update Campaign
              </Button>
            </Box>
          )}
        </Box>
        {/* Right Column - Payment Form and Amount Donated */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Donate Amount (in USD)
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {campaign.status_id?.status === "Approved" &&
            moment().isSameOrAfter(campaign.start_date) &&
            moment().isBefore(campaign.end_date) ? (
              <>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={handleDonationAmountChange}
                  style={{
                    padding: "8px",
                    fontSize: "16px",
                    marginRight: "8px",
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (donationAmount <= 0) {
                      handleSnackbar(
                        "Donation amount must be greater than 0",
                        "error"
                      );
                      return;
                    }
                    setShowPayment(true);
                  }}
                >
                  Donate
                </Button>
              </>
            ) : (
              <Typography>
                {moment().isBefore(campaign.start_date)
                  ? "Donation will be available after the start date"
                  : !moment(campaign.end_date).isAfter() ||
                    campaign.status_id?.status === "Completed"
                  ? "Donation is no longer available"
                  : "Campaign has not been approved yet"}
              </Typography>
            )}
          </Box>
          {donationAmount > 0 && showPayment && (
            <PaymentForm
              totalAmount={donationAmount}
              handlePayment={handleDonateClick}
            />
          )}
        </Box>
      </Box>

      {/* Donations Table */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 4 }}>
        Donations
      </Typography>
      {donations.length === 0 ? (
        <Typography>No donations found for this campaign.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Donor Name</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Amount (USD)</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Donation Status</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Donation Date</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation._id}>
                  <TableCell>
                    {donation.user_name.charAt(0).toUpperCase() +
                      donation.user_name.slice(1)}
                  </TableCell>

                  <TableCell align="right">${donation.amount}</TableCell>
                  <TableCell align="right">
                    {donation.donation_status}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(donation.created_on).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CampaignDetails;
