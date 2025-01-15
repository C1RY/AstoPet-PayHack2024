import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import loginAnimation from "./login-animation.json";
import TermsModal from "./TermsModal";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentModal, setCurrentModal] = useState(null); // State to track modals
  const [additionalEmail, setAdditionalEmail] = useState(""); // For Add Exception
  const [termsOpen, setTermsOpen] = useState(false); // Terms modal state
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "astoadmin" && password === "astoadmin") {
      // Start modal sequence
      setCurrentModal("emailException");
    } else {
      alert("Invalid credentials! Please enter the correct username and password.");
    }
  };

  const handleModalAction = (action) => {
    if (currentModal === "emailException") {
      if (action === "yes") {
        setCurrentModal("addMoreExceptions");
      } else {
        setCurrentModal("enableAnalysis");
      }
    } else if (currentModal === "addMoreExceptions") {
      if (action === "add") {
        console.log("Additional Email Added:", additionalEmail);
      }
      setCurrentModal("enableAnalysis");
    } else if (currentModal === "enableAnalysis") {
      if (action === "yes") {
        console.log("Email Analysis Enabled!");
      }
      // Navigate to Dashboard after final modal
      localStorage.setItem("isAuthenticated", "true");
      onLoginSuccess();
      navigate("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e1e1e, #121212)",
        color: "#ffffff",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "800px",
          background: "#1e1e1e",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Animation Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            width: "300px",
            height: "300px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie animationData={loginAnimation} style={{ width: "100%" }} />
        </motion.div>

        {/* Welcome Message */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#00d9ff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          Welcome to AstoPet
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: "30px",
            color: "#cccccc",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          Sign in to continue your fraud detection journey and track your pet's evolution.
        </Typography>

        {/* Login Form */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon sx={{ color: "#00d9ff" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: "transparent",
              input: {
                color: "#ffffff",
                background: "rgba(46, 46, 46, 0.8)",
                borderRadius: "10px",
                padding: "10px",
              },
              label: {
                color: "#cccccc",
                fontWeight: "bold",
                letterSpacing: "0.5px",
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

          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#00d9ff" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#00d9ff" }} />
                    ) : (
                      <Visibility sx={{ color: "#00d9ff" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              background: "transparent",
              input: {
                color: "#ffffff",
                background: "rgba(46, 46, 46, 0.8)",
                borderRadius: "10px",
                padding: "10px",
              },
              label: {
                color: "#cccccc",
                fontWeight: "bold",
                letterSpacing: "0.5px",
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

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
              color: "#ffffff",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #00d9ff, #3f51b5)",
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease-in-out",
            }}
          >
            Login
          </Button>

          {/* Terms and Conditions Link */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              marginTop: "10px",
              color: "#cccccc",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline", color: "#00d9ff" },
            }}
            onClick={() => setTermsOpen(true)}
          >
            Terms and Conditions
          </Typography>
        </motion.div>
      </motion.div>

      {/* Modals */}
      {currentModal === "emailException" && (
        <ModalContent
          title="Email Exception"
          description="Would you like to make user@example.com an exception for fraud analysis?"
          onYes={() => handleModalAction("yes")}
          onNo={() => handleModalAction("no")}
        />
      )}

      {currentModal === "addMoreExceptions" && (
        <ModalContent
          title="Add More Email Exceptions"
          description={
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter additional email address"
              value={additionalEmail}
              onChange={(e) => setAdditionalEmail(e.target.value)}
              sx={{ input: { color: "#ffffff" } }}
            />
          }
          onYes={() => handleModalAction("add")}
          onNo={() => handleModalAction("skip")}
        />
      )}

      {currentModal === "enableAnalysis" && (
        <ModalContent
          title="Enable Email Analysis"
          description="Do you want to enable email analysis for your account?"
          onYes={() => handleModalAction("yes")}
          onNo={() => handleModalAction("no")}
        />
      )}

      {/* Terms Modal */}
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </Box>
  );
};

const ModalContent = ({ title, description, onYes, onNo }) => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      bgcolor: "#1e1e1e",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
    }}
  >
    <Typography variant="h6" sx={{ color: "#00d9ff", marginBottom: "10px" }}>
      {title}
    </Typography>
    <Typography sx={{ color: "#ffffff", marginBottom: "20px" }}>{description}</Typography>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        sx={{
          backgroundColor: "#00d9ff",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#3f51b5" },
        }}
        onClick={onYes}
      >
        Yes
      </Button>
      <Button
        sx={{
          backgroundColor: "#444",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#666" },
        }}
        onClick={onNo}
      >
        No
      </Button>
    </Box>
  </Box>
);

export default Login;
