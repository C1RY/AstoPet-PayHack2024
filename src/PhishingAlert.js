// PhishingAlert.js
import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const PhishingAlert = ({ alert }) => {
  // Destructure to ensure we're accessing the correct properties
  const { subject, sender, body, confidence } = alert;

  // Check if alert data is valid
  if (!subject || !sender || !body) {
    return <Typography variant="body2" color="error">Invalid phishing alert data</Typography>;
  }

  return (
    <Card sx={{ padding: 2, background: '#1e1e1e', marginBottom: 2 }}>
      <Typography variant="h6" sx={{ color: '#80c6ff', marginBottom: 1 }}>
        Subject: {subject}
      </Typography>
      <Typography variant="body1" sx={{ color: '#ffffff' }}>
        Sender: {sender}
      </Typography>
      <Typography variant="body2" sx={{ color: '#ffffff' }}>
        Confidence: {confidence}
      </Typography>
      <Typography variant="body2" sx={{ color: '#ffffff', marginTop: 1 }}>
        Body: {body}
      </Typography>
    </Card>
  );
};

export default PhishingAlert;
