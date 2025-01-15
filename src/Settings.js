import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from "./context/ThemeContext"; // Import the custom hook for theme context

const Settings = () => {
  const { darkTheme } = useTheme(); // Use the custom hook to get the theme value
  const [isEmailAnalysisEnabled, setIsEmailAnalysisEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isHoneypotEnabled, setIsHoneypotEnabled] = useState(true);
  const [emailExceptions, setEmailExceptions] = useState([
    "user1@example.com",
    "user2@example.com",
  ]);
  const [newException, setNewException] = useState("");

  const toggleEmailAnalysis = () =>
    setIsEmailAnalysisEnabled(!isEmailAnalysisEnabled);
  const toggleNotifications = () =>
    setIsNotificationsEnabled(!isNotificationsEnabled);
  const toggleHoneypot = () => setIsHoneypotEnabled(!isHoneypotEnabled);

  const handleAddException = () => {
    if (newException.trim() !== "") {
      setEmailExceptions([...emailExceptions, newException.trim()]);
      setNewException("");
    }
  };

  const handleRemoveException = (index) => {
    const updatedExceptions = [...emailExceptions];
    updatedExceptions.splice(index, 1);
    setEmailExceptions(updatedExceptions);
  };

  return (
    <Box
      sx={{
        padding: "40px",
        minHeight: "100vh",
        background: darkTheme ? "#121212" : "#f4f4f4", // Update background color based on theme
        color: darkTheme ? "#e0e0e0" : "#333", // Adjust text color based on theme
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "40px",
          color: darkTheme ? "#80c6ff" : "#3f51b5", // Adjust title color based on theme
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontSize: "3rem",
          textShadow: darkTheme ? "0px 0px 10px #4e8db7" : "0px 0px 10px #a2c8ff", // Add text shadow for dark theme
        }}
      >
        Settings
      </Typography>

      <Grid container spacing={4}>
        {/* Section Cards */}
        {[
          {
            title: "Email Analysis",
            enabled: isEmailAnalysisEnabled,
            toggle: toggleEmailAnalysis,
          },
          {
            title: "Notifications",
            enabled: isNotificationsEnabled,
            toggle: toggleNotifications,
          },
          {
            title: "Honeypot Traps",
            enabled: isHoneypotEnabled,
            toggle: toggleHoneypot,
          },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                padding: "20px",
                borderRadius: "12px",
                background: darkTheme ? "#1e1e1e" : "#fff", // Adjust card background based on theme
                boxShadow: darkTheme
                  ? "0px 0px 10px rgba(0, 124, 183, 0.6)"
                  : "0px 0px 10px rgba(0, 0, 0, 0.2)",
                border: darkTheme ? "1px solid #4e8db7" : "1px solid #ccc", // Adjust card border color based on theme
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: darkTheme
                    ? "0px 0px 15px rgba(0, 124, 183, 0.8)"
                    : "0px 0px 15px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: darkTheme ? "#e0e0e0" : "#333", // Adjust text color
                  textShadow: darkTheme ? "0px 0px 5px #4e8db7" : "none",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginBottom: "20px",
                  fontWeight: "300",
                  color: darkTheme ? "#b0b0b0" : "#666", // Adjust text color for body
                }}
              >
                {item.enabled ? "Enabled" : "Disabled"}
              </Typography>
              <Button
                onClick={item.toggle}
                sx={{
                  background: darkTheme ? "#4e8db7" : "#3f51b5", // Button color
                  color: "#ffffff",
                  "&:hover": {
                    background: darkTheme ? "#366a92" : "#2c387e",
                  },
                  textTransform: "uppercase",
                  fontWeight: "600",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                Toggle
              </Button>
            </Card>
          </Grid>
        ))}

        {/* Email Exceptions */}
        <Grid item xs={12}>
          <Card
            sx={{
              padding: "20px",
              borderRadius: "12px",
              background: darkTheme ? "#1e1e1e" : "#fff", // Adjust background color
              boxShadow: darkTheme
                ? "0px 0px 10px rgba(0, 124, 183, 0.6)"
                : "0px 0px 10px rgba(0, 0, 0, 0.2)",
              border: darkTheme ? "1px solid #4e8db7" : "1px solid #ccc",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkTheme
                  ? "0px 0px 15px rgba(0, 124, 183, 0.8)"
                  : "0px 0px 15px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "20px",
                fontWeight: "600",
                color: darkTheme ? "#e0e0e0" : "#333",
                textShadow: darkTheme ? "0px 0px 5px #4e8db7" : "none",
              }}
            >
              Email Exceptions
            </Typography>
            <List>
              {emailExceptions.map((email, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <Button
                        onClick={() => handleRemoveException(index)}
                        sx={{
                          color: "#ff6f61",
                          textTransform: "uppercase",
                          fontWeight: "600",
                          "&:hover": { color: "#ff3d3d" },
                        }}
                      >
                        Remove
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={email}
                      sx={{
                        fontWeight: "500",
                        color: darkTheme ? "#e0e0e0" : "#333",
                        textShadow: darkTheme ? "0px 0px 2px #4e8db7" : "none",
                      }}
                    />
                  </ListItem>
                  <Divider sx={{ background: darkTheme ? "#333" : "#ccc" }} />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
              <TextField
                variant="outlined"
                placeholder="Add new exception"
                value={newException}
                onChange={(e) => setNewException(e.target.value)}
                sx={{
                  flex: 1,
                  marginRight: "10px",
                  input: { color: darkTheme ? "#e0e0e0" : "#333" },
                  background: darkTheme ? "#1a1a1a" : "#fff",
                  border: `1px solid ${darkTheme ? "#4e8db7" : "#ccc"}`,
                }}
              />
              <Button
                onClick={handleAddException}
                sx={{
                  background: "#4e8db7",
                  color: "#fff",
                  "&:hover": { background: "#366a92" },
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Add
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
