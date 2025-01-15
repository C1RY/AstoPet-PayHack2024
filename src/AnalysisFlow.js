import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const emailExceptions = ["maybank.com", "hsbc.com", "cimb.com", "tnb.com", "uob.com"];

const AnalysisFlow = () => {
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [showExceptionsDialog, setShowExceptionsDialog] = useState(false);
  const [enabledAnalysis, setEnabledAnalysis] = useState(false);
  const [emailList] = useState([
    "user@example.com",
    "transaction@hsbc.com",
    "alert@maybank.com",
    "welcome@randomsite.com",
  ]);

  const handleEnableAnalysis = () => {
    setShowExceptionsDialog(true);
  };

  const handleConsent = () => {
    setIsConsentGiven(true);
    setShowExceptionsDialog(false);
    setEnabledAnalysis(true);
  };

  const handleCancel = () => {
    setShowExceptionsDialog(false);
  };

  return (
    <Box
      sx={{
        padding: "40px",
        minHeight: "calc(100vh - 64px)",
        background: "#121212",
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#00d9ff", marginBottom: "20px" }}
      >
        Email Analysis Flow
      </Typography>

      {enabledAnalysis ? (
        <Typography sx={{ color: "#f50057", fontWeight: "bold", marginBottom: "20px" }}>
          Email analysis is enabled. Your pet will grow as the system processes your emails.
        </Typography>
      ) : (
        <Button
          variant="contained"
          onClick={handleEnableAnalysis}
          sx={{
            background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
            color: "#ffffff",
            "&:hover": { background: "linear-gradient(90deg, #00d9ff, #3f51b5)" },
          }}
        >
          Enable Email Analysis
        </Button>
      )}

      <Dialog open={showExceptionsDialog} onClose={handleCancel}>
        <DialogTitle>Email Exceptions</DialogTitle>
        <DialogContent>
          <Typography>Do you want to add the following email domains to exceptions?</Typography>
          <ul>
            {emailExceptions.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConsent}>Yes</Button>
          <Button onClick={handleCancel}>No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnalysisFlow;
