import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f5f7fa, #ffffff)",
      }}
    >
      {/* Moving Background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%"],
        }}
        transition={{ repeat: Infinity, duration: 10 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background:
            "linear-gradient(45deg, #3f51b5, #5c6bc0, #f50057, #00acc1)",
          backgroundSize: "400%",
        }}
      />

      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to AstoPet1
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#666",
            margin: "20px 0",
            fontSize: "1.2rem",
            lineHeight: 1.6,
          }}
        >
          Your trusted AI for fraud detection and prevention. Stay secure
          effortlessly!
        </Typography>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          Learn More
        </Button>
      </motion.div>
    </Box>
  );
};

export default HeroSection;
