import React, { useState } from "react";
import {
  Button,
  Container,
  Snackbar,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const res = await api.put(`/users/${user?.user_id}`, {
        name,
        email,
        phone,
      });
      const data = res.data;
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      updateUser({
        ...user,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      setSnackbarMessage("Update successful.");
      setSnackbarOpen(true);
      setIsEditing(false);
    } catch (error) {
      setSnackbarMessage("Update failed.");
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setIsEditing(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4">User Profile</Typography>
        {isEditing ? (
          <>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ my: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ my: 2 }}
            />
            <TextField
              label="Phone"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ my: 2 }}>
              Name: {user.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ my: 2 }}>
              Email: {user.email}
            </Typography>
            <Typography variant="subtitle1" sx={{ my: 2 }}>
              Phone: {user.phone}
            </Typography>
            <Button variant="contained" onClick={handleEdit} sx={{ my: 2 }}>
              Edit
            </Button>
          </>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default UserProfile;
