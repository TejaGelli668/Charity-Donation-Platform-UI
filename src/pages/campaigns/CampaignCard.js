import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CharityImage from "../../images/CharityImage";
import moment from "moment";

const CampaignCard = ({
  campaign: { title, description, _id, category_id, start_date, end_date },
}) => {
  const navigate = useNavigate();
  const formattedStartDate = moment(start_date).format("MM-DD-YYYY, hh:mm A");
  const formattedEndDate = moment(end_date).format("MM-DD-YYYY, hh:mm A");

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/campaigns/${_id}`);
      }}
    >
      <CharityImage category={category_id?.category} alt={title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          Start Date: {formattedStartDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          End Date: {formattedEndDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary">View details</Button>
      </CardActions>
    </Card>
  );
};

export default CampaignCard;
