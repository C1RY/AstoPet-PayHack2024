import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { motion } from "framer-motion";

const OnboardingModal = ({ email, onClose }) => {
  const [exceptions, setExceptions] = useState([email]); // Start with user's email
  const [newException, setNewException] = useState("");

  const addException = () => {
    if (newException.trim()) {
      setExceptions([...exceptions, newException.trim()]);
      setNewException("");
    }
  };

  const handleConfirm = () => {
    alert("Exceptions added. Email analysis consent given.");
    onClose(); // Close the modal
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#1e1e1e",
        color: "#ffffff",
        padding: "30px",
        borderRadius: "15px",
        width: "400px",
        boxShadow: "0px 4px 15px rgba(0, 217, 255, 0.5)",
        zIndex: 1000,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "20px", color: "#00d9ff" }}>
        Email Analysis Consent
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px", color: "#cccccc" }}>
        Do you want to make the following email addresses exceptions?
      </Typography>
      <Box sx={{ marginBottom: "10px" }}>
        {exceptions.map((ex, index) => (
          <Typography key={index} variant="body2" sx={{ color: "#cccccc" }}>
            • {ex}
          </Typography>
        ))}
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Add more exceptions..."
        value={newException}
        onChange={(e) => setNewException(e.target.value)}
        sx={{
          marginBottom: "20px",
          input: { color: "#ffffff" },
          "& .MuiOutlinedInput-root": {
            background: "#222",
          },
        }}
      />
      <Button
        onClick={addException}
        variant="outlined"
        sx={{
          color: "#00d9ff",
          borderColor: "#00d9ff",
          marginBottom: "20px",
          textTransform: "none",
          "&:hover": {
            background: "rgba(0, 217, 255, 0.1)",
          },
        }}
      >
        Add Exception
      </Button>
      <Button
        onClick={handleConfirm}
        variant="contained"
        fullWidth
        sx={{
          background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
          color: "#ffffff",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            background: "linear-gradient(90deg, #00d9ff, #3f51b5)",
          },
        }}
      >
        Confirm
      </Button>
    </motion.div>
  );
};

export default OnboardingModal;
