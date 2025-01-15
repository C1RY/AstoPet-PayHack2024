import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import Lottie from "lottie-react";
import heroAnimation from "../assets/HERO1.json";

const HeroStats = ({ heroStats }) => {
  return (
    <Box sx={{ margin: "20px 0" }}>
      <Lottie animationData={heroAnimation} style={{ height: "250px" }} />
      <Typography variant="h6">Hero Health</Typography>
      <LinearProgress
        variant="determinate"
        value={heroStats.health}
        sx={{
          marginTop: "10px",
          background: "#333",
          "& .MuiLinearProgress-bar": { background: "#00ff00" }
        }}
      />
      <Typography variant="h6">
        Attack: {heroStats.attack} | Defense: {heroStats.defense} | Magic: {heroStats.magic} | Level: {heroStats.level}
      </Typography>
    </Box>
  );
};

export default HeroStats;
