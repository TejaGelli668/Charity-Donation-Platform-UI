import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

const DonationCard = ({ donation, handleCancelDonation }) => {
  const formatDate = (date) => moment(date).format("MM-DD-YYYY");

  const isWithin24Hours = moment()
    .add(24, "hours")
    .isSameOrAfter(moment(donation.campaign?.end_date));

  return (
    <Card sx={{ marginBottom: 5 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Left Column - Donation Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Donation Details
            </Typography>
            <Typography gutterBottom>
              <strong>Donation ID:</strong> {donation._id}
            </Typography>
            <Typography gutterBottom>
              <strong>Donated Amount:</strong> ${donation.donated_amount}
            </Typography>
            <Typography gutterBottom>
              <strong>Donation Status:</strong> {donation.donation_status}
            </Typography>
            <Typography gutterBottom>
              <strong>Refund Amount:</strong> ${donation.refund_amount}
            </Typography>
            <Typography gutterBottom>
              <strong>Refund Status:</strong> {donation.refund_status}
            </Typography>
            <Typography gutterBottom>
              <strong>Donated On:</strong> {formatDate(donation.created_on)}
            </Typography>
          </Grid>
          {/* Right Column - Campaign Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Campaign Details
            </Typography>
            <Typography gutterBottom>
              <strong>Campaign ID:</strong> {donation.campaign?._id}
            </Typography>
            <Typography gutterBottom>
              <strong>Campaign Title:</strong> {donation.campaign?.title}
            </Typography>
            <Typography gutterBottom>
              <strong>Campaign Start Date:</strong>{" "}
              {moment(donation.campaign?.start_date).format(
                "MM-DD-YYYY, hh:mm A"
              )}
            </Typography>
            <Typography gutterBottom>
              <strong>Campaign End Date:</strong>{" "}
              {moment(donation.campaign?.end_date).format(
                "MM-DD-YYYY, hh:mm A"
              )}
            </Typography>
            <Typography gutterBottom>
              <strong>Amount Raised:</strong> $
              {donation.campaign?.amount_raised}
            </Typography>
            <Typography gutterBottom>
              <strong>Goal:</strong> ${donation.campaign?.goal}
            </Typography>
            <br />
            {donation.donation_status !== "Cancelled" && isWithin24Hours && (
              <Typography variant="body2" color="error">
                You can no longer cancel this donation.
              </Typography>
            )}
            {donation.donation_status !== "Cancelled" && !isWithin24Hours && (
              <Button
                variant="contained"
                onClick={() => handleCancelDonation(donation._id)}
              >
                Cancel Donation
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DonationCard;
