import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TermsModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="terms-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxWidth: "800px",
          bgcolor: "#1e1e1e",
          color: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
          overflow: "hidden",
          padding: "20px",
          maxHeight: "80vh",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#ffffff",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="terms-modal-title"
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#00d9ff",
            marginBottom: "20px",
          }}
        >
          Terms and Conditions
        </Typography>

        {/* Terms Content */}
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "60vh",
            paddingRight: "10px",
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>1. Privacy and Confidentiality Commitment</b><br />
            AI Pet prioritizes the privacy and confidentiality of all user data, including email content. No email data will be stored, shared, or used beyond the purposes explicitly agreed upon by the user. Email analysis is designed to respect user preferences and institutional privacy policies.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>2. Consent for Email Analysis</b><br />
            Email analysis is an opt-in feature and requires explicit user consent before any data is processed. Users can enable or disable the analysis feature at any time through their account settings. The system will notify users of any changes to email analysis settings and require reconfirmation for re-enablement.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>3. Exceptions for Fraud Analysis</b><br />
            Users may mark specific email addresses as exceptions to exclude them from analysis during the setup or re-enablement process. Exceptions can be modified or updated at any time in the account settings. A notification will confirm when exceptions are applied to ensure transparency.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>4. Temporary Nature of Email Analysis</b><br />
            For every enabled session, email analysis will automatically disable after completion to ensure privacy and prevent continuous monitoring. Users will be prompted to re-enable the feature if needed.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>5. Re-Enabling Email Analysis</b><br />
            Upon re-enablement, the system will: Prompt the user to confirm whether exceptions should remain unchanged or be updated. Display a list of unscanned emails from the last disabled date to the current date, allowing users to decide if these emails should be analyzed. Users retain full control over the scope of email analysis during re-enablement.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>6. Secure Data Handling</b><br />
            AI Pet processes email data securely in a sandboxed environment, ensuring no unauthorized access or exposure. Analysis results are temporary and not stored or accessible beyond the session.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>7. Compliance with Organizational Policies</b><br />
            Users employed by organizations with specific disclosure or email monitoring policies must comply with their employer's regulations. AI Pet provides features to exclude emails or email addresses from analysis to adhere to these rules.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>8. User Responsibility</b><br />
            It is the user's responsibility to correctly configure email exceptions and comply with applicable privacy laws and organizational policies. AI Pet provides tools and notifications to assist users but cannot be held liable for misconfigured settings.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>9. Transparency and Updates</b><br />
            AI Pet will notify users of any updates to these terms or changes to the email analysis feature. Users will have the opportunity to review and agree to updated terms before continuing to use the feature.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "15px", color: "#cccccc" }}>
            <b>10. Contact for Privacy Concerns</b><br />
            Users with concerns about data privacy or confidentiality can contact our support team for clarification or assistance.
          </Typography>
        </Box>

        {/* Close Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 3,
            background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
            color: "#ffffff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { background: "linear-gradient(90deg, #00d9ff, #3f51b5)" },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default TermsModal;
