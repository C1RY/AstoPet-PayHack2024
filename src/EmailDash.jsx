import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import PhishingAlert from "./PhishingAlert"; // Import phishing alerts component
import axios from "axios";

const EmailDash = () => {
  const [alerts, setAlerts] = useState([]); // Phishing details
  const [loading, setLoading] = useState(true); // Loading state
  const [scanning, setScanning] = useState(false); // Scanning state
  const [scannedEmails, setScannedEmails] = useState(0); // Total emails scanned
  const [safeEmails, setSafeEmails] = useState(0); // Legitimate emails count
  const [spamEmails, setSpamEmails] = useState(0); // Spam emails count
  const [phishingEmailsCount, setPhishingEmailsCount] = useState(0); // Phishing emails count
  const [progress, setProgress] = useState(0); // Scanning progress

  // Fetch email statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:9000";
        const response = await axios.get(`${apiUrl}/email-stats`);
        const data = response.data;

        // Calculate counts
        const legitimateCount = data.Legitimate.length || 0;
        const spamCount = data.Spam.length || 0;
        const phishingDetails = data.Phishing || [];
        const phishingCount = phishingDetails.length;

        // Update state
        setScannedEmails(legitimateCount + spamCount + phishingCount);
        setSafeEmails(legitimateCount);
        setSpamEmails(spamCount);
        setAlerts(phishingDetails); // Store phishing details
        setPhishingEmailsCount(phishingCount);
      } catch (error) {
        console.error("Error fetching email stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Trigger email scanning
  const triggerEmailScan = async () => {
    setScanning(true);
    setProgress(0);

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:9000";
      const response = await axios.get(`${apiUrl}/email-stats`);
      if (response.data) {
        // Process results (same logic as above)
        const data = response.data;
        const legitimateCount = data.Legitimate.length || 0;
        const spamCount = data.Spam.length || 0;
        const phishingDetails = data.Phishing || [];
        const phishingCount = phishingDetails.length;

        setScannedEmails(legitimateCount + spamCount + phishingCount);
        setSafeEmails(legitimateCount);
        setSpamEmails(spamCount);
        setAlerts(phishingDetails);
        setPhishingEmailsCount(phishingCount);

        // Simulate scanning progress
        for (let i = 0; i <= 100; i++) {
          setTimeout(() => setProgress(i), i * 30);
        }
      }
    } catch (error) {
      console.error("Error during email scan:", error);
    } finally {
      setScanning(false);
    }
  };

  return (
    <Box sx={{ padding: 4, background: "#121212", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ color: "#80c6ff", textAlign: "center", marginBottom: 4 }}>
        Email Dashboard
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 3 }}>
              <Typography variant="h6">Total Emails Scanned</Typography>
              <Typography variant="h4">{scannedEmails}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 3 }}>
              <Typography variant="h6">Legitimate Emails</Typography>
              <Typography variant="h4">{safeEmails}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 3 }}>
              <Typography variant="h6">Spam Emails</Typography>
              <Typography variant="h4">{spamEmails}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 3 }}>
              <Typography variant="h6">Phishing Emails</Typography>
              <Typography variant="h4">{phishingEmailsCount}</Typography>
            </Card>
          </Grid>

          {/* Scan Progress */}
          {scanning && (
            <Box sx={{ width: "100%", marginTop: 4 }}>
              <LinearProgress variant="determinate" value={progress} />
              <Typography sx={{ marginTop: 2 }}>{progress}%</Typography>
            </Box>
          )}

          {/* Scan Button */}
          <Grid item xs={12}>
            <Button onClick={triggerEmailScan} disabled={scanning}>
              {scanning ? "Scanning..." : "Start Email Scan"}
            </Button>
          </Grid>

          {/* Phishing Details */}
          {alerts.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h5">Phishing Details</Typography>
              {alerts.map((alert, index) => (
                <PhishingAlert key={index} alert={alert} />
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default EmailDash;
