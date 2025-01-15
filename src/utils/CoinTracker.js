import React, { useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Grid } from "@mui/material";
import { useTheme } from "../context/ThemeContext"; // Import the custom hook
import "../styles/coinTracker.css"; // Assuming this contains advanced custom CSS

const CoinTracker = () => {
  const { darkTheme } = useTheme(); // Use the custom hook to get the theme value

  // Example token data
  const [tokens, setTokens] = useState(2500); // Replace with actual logic to fetch user tokens

  // Redeemable items
  const redeemOptions = [
    { id: 1, name: "Gift Card", image: "/assets/gift-card.jpg", cost: 500 },
    { id: 2, name: "Pet Treats", image: "/assets/pet-treats.jpg", cost: 300 },
    { id: 3, name: "Discount Coupon", image: "/assets/discount-coupon.jpg", cost: 100 },
    { id: 4, name: "Exclusive Skin", image: "/assets/exclusive-skin.jpg", cost: 1200 },
  ];

  // Redeem function
  const handleRedeem = (cost) => {
    if (tokens >= cost) {
      setTokens(tokens - cost);
      alert("Redeemed successfully!");
    } else {
      alert("Not enough tokens!");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        background: darkTheme ? "#121212" : "#f4f4f4", // Change background color based on the theme
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: darkTheme ? "0px 0px 15px rgba(0, 217, 255, 0.6)" : "none", // Neon glow for dark theme
        }}
      >
        Coin Tracker
      </Typography>

      {/* Token Display */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: darkTheme
            ? "linear-gradient(135deg, #00d9ff, #3f51b5)"
            : "linear-gradient(135deg, #00d9ff, #3f51b5)", // Keep gradient but adjust for dark theme if needed
          color: darkTheme ? "#fff" : "#333", // Adjust text color based on theme
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "30px",
          boxShadow: darkTheme ? "0 4px 15px rgba(0, 0, 0, 0.5)" : "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total Tokens: {tokens}
        </Typography>
      </Box>

      {/* Redeem Section */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: "15px",
          textAlign: "center",
          color: darkTheme ? "#fff" : "#333", // Adjust heading color based on theme
          textShadow: darkTheme ? "0px 0px 5px rgba(0, 217, 255, 0.6)" : "none", // Add text shadow in dark mode
        }}
      >
        Redeem Your Rewards
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {redeemOptions.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              sx={{
                boxShadow: darkTheme
                  ? "0 6px 12px rgba(0, 0, 0, 0.5)"
                  : "0 6px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: darkTheme ? "#1e1e1e" : "#fff", // Adjust card background color based on theme
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)", // Scale card on hover
                  boxShadow: darkTheme
                    ? "0 6px 15px rgba(0, 217, 255, 0.4)"
                    : "0 6px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt={item.name}
                sx={{
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: darkTheme ? "#fff" : "#333",
                    textShadow: darkTheme ? "0px 0px 5px rgba(0, 217, 255, 0.6)" : "none", // Add glow effect in dark mode
                  }}
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: darkTheme ? "#ccc" : "#666" }}>
                  Cost: {item.cost} tokens
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "linear-gradient(90deg, #00d9ff, #3f51b5)", // Invert gradient on hover
                      boxShadow: "0 0 15px rgba(0, 217, 255, 0.5)", // Add glowing effect
                    },
                  }}
                  onClick={() => handleRedeem(item.cost)}
                >
                  Redeem
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoinTracker;
