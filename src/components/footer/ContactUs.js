import React from "react";
import styled from "styled-components";
import { Typography, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

const StyledContact = styled.section`
  background-color: #f2f2f2;
  padding: 80px 0;
`;

const StyledContainer = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledForm = styled(Box)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledTitle = styled(Typography)`
  && {
    color: #333;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #ff8c00;
    color: #fff;
    &:hover {
      background-color: #ffa500;
    }
  }
`;

const ContactUs = () => {
  return (
    <StyledContact>
      <StyledContainer>
        <StyledTitle variant="h4">Contact Us</StyledTitle>
        <StyledForm>
          <StyledTextField id="name" label="Name" variant="outlined" required />
          <StyledTextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            required
          />
          <StyledTextField
            id="message"
            label="Message"
            variant="outlined"
            required
            multiline
            rows={4}
          />
          <StyledButton variant="contained">Submit</StyledButton>
        </StyledForm>
      </StyledContainer>
    </StyledContact>
  );
};

export default ContactUs;
