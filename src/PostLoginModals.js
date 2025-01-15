import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const AddExceptionModal = ({ open, onClose, onAddException }) => {
  const [additionalEmail, setAdditionalEmail] = useState("");

  const handleAddEmail = () => {
    if (additionalEmail.trim() !== "") {
      onAddException(additionalEmail);
      setAdditionalEmail(""); // Clear the input field
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-exception-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          bgcolor: "#1e1e1e",
          color: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          id="add-exception-modal"
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#00d9ff",
            marginBottom: "20px",
          }}
        >
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter additional email address"
          value={additionalEmail}
          onChange={(e) => setAdditionalEmail(e.target.value)}
          sx={{
            marginBottom: "20px",
            input: {
              color: "#ffffff",
              background: "rgba(46, 46, 46, 0.8)",
              borderRadius: "8px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444444",
              },
              "&:hover fieldset": {
                borderColor: "#00d9ff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00d9ff",
              },
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button
            variant="contained"
            onClick={handleAddEmail}
            sx={{
              background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
              color: "#ffffff",
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              "&:hover": {
                background: "linear-gradient(90deg, #00d9ff, #3f51b5)",
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease-in-out",
            }}
          >
            Add Email
          </Button>

          <Button
            variant="outlined"
            onClick={handleSkip}
            sx={{
              color: "#00d9ff",
              borderColor: "#00d9ff",
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              "&:hover": {
                background: "rgba(0, 217, 255, 0.1)",
                borderColor: "#00d9ff",
              },
              transition: "transform 0.3s ease-in-out",
            }}
          >
            Skip
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddExceptionModal;
