import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import api from "../api/api";
import moment from "moment";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 24px;
`;

const AdminCampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch campaigns data from your API here
    const fetchCampaigns = async () => {
      try {
        const res = await api.get("/campaigns-by-users");
        setCampaigns(res.data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>ID</strong>
            </TableCell>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Amount Raised</strong>
            </TableCell>
            <TableCell>
              <strong>Goal</strong>
            </TableCell>
            <TableCell>
              <strong>Start Date</strong>
            </TableCell>
            <TableCell>
              <strong>End Date</strong>
            </TableCell>
            <TableCell>
              <strong>Created by</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Status</strong>
            </TableCell>
            <TableCell>
              <strong>Action</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign._id}>
              <TableCell>{campaign._id}</TableCell>
              <TableCell>{campaign.title}</TableCell>
              <TableCell>${campaign.amount_raised}</TableCell>
              <TableCell>${campaign.goal}</TableCell>
              <TableCell>
                {moment(campaign.start_date).format("MM-DD-YYYY, hh:mm A")}
              </TableCell>
              <TableCell>
                {moment(campaign.end_date).format("MM-DD-YYYY, hh:mm A")}
              </TableCell>
              <TableCell>{campaign.user_details?.name}</TableCell>
              <TableCell>{campaign.user_details?.email}</TableCell>
              <TableCell>{campaign.status_id?.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/admin/campaigns/${campaign._id}/update-campaign`}
                >
                  EDIT
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default AdminCampaignsList;
