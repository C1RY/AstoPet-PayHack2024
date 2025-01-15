import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import Lottie from "lottie-react";
import enemyAnimation from "../assets/ENEMY1.json";

const EnemyStats = ({ enemyHealth }) => {
  return (
    <Box sx={{ margin: "20px 0" }}>
      <Lottie animationData={enemyAnimation} style={{ height: "250px" }} />
      <Typography variant="h6">Enemy Health</Typography>
      <LinearProgress
        variant="determinate"
        value={enemyHealth}
        sx={{
          marginTop: "10px",
          background: "#333",
          "& .MuiLinearProgress-bar": { background: "#ff0000" }
        }}
      />
    </Box>
  );
};

export default EnemyStats;
