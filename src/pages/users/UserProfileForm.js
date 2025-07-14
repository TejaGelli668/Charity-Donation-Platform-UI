import React from "react";
import { TextField, Button } from "@mui/material";

const UserProfileForm = ({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  handleSave,
  handleCancel,
}) => {
  return (
    <>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginTop: "10px", width: "100%" }}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginTop: "10px", width: "100%" }}
      />
      <TextField
        label="Phone"
        variant="outlined"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{ marginTop: "10px", width: "100%" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ marginTop: "10px", marginRight: "10px" }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCancel}
        sx={{ marginTop: "10px" }}
      >
        Cancel
      </Button>
    </>
  );
};

export default UserProfileForm;
