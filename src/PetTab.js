import React from "react";
import { Box, Typography, Card, Button, Grid } from "@mui/material";
import { useTheme } from "./context/ThemeContext"; // Import the custom hook for theme context
import Lottie from "lottie-react";
import { usePet } from "./PetContext";

import catAnimation from "./pet-animation.json";
import dogAnimation from "./DOG.json";
import pigeonAnimation from "./PIGEON.json";
import bearAnimation from "./BEAR.json";
import squirtleAnimation from "./SQUIRTLE.json";
import koalaAnimation from "./KOALA.json";

// Array of pets with their names and animations
const pets = [
  { name: "Cat", animation: catAnimation },
  { name: "Dog", animation: dogAnimation },
  { name: "Pigeon", animation: pigeonAnimation },
  { name: "Bear", animation: bearAnimation },
  { name: "Squirtle", animation: squirtleAnimation },
  { name: "Koala", animation: koalaAnimation },
];

const PetTab = () => {
  const { selectedPet, changePet } = usePet(); // From PetContext
  const { darkTheme } = useTheme(); // Use the custom hook to get the theme value

  return (
    <Box
      sx={{
        padding: "40px",
        minHeight: "100vh",
        background: darkTheme ? "#121212" : "#f4f4f4", // Change background based on theme
        color: darkTheme ? "#ffffff" : "#000000",
        textAlign: "center",
      }}
    >
      {/* Title Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "30px",
          background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        Adopt Your Favorite Pet
      </Typography>

      {/* Currently Adopted Pet */}
      <Typography
        variant="h5"
        sx={{
          marginTop: "40px",
          color: "#f50057",
          fontWeight: "bold",
          textShadow: "0px 0px 10px rgba(245, 0, 87, 0.8)",
        }}
      >
        Currently Adopted Pet: {selectedPet}
      </Typography>

      {/* Pet Cards Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: "30px" }}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pet.name}>
            <Card
              sx={{
                padding: "20px",
                backgroundColor: darkTheme ? "#1e1e1e" : "#ffffff",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: darkTheme
                  ? "0px 0px 15px rgba(0, 217, 255, 0.2)"
                  : "0px 0px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: darkTheme
                    ? "0px 0px 25px rgba(0, 217, 255, 0.4)"
                    : "0px 0px 25px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              {/* Pet Animation */}
              <Lottie animationData={pet.animation} style={{ height: "150px" }} />
              <Typography
                variant="h6"
                sx={{
                  color: "#00d9ff",
                  fontWeight: "bold",
                  marginTop: "10px",
                  textShadow: darkTheme ? "0px 0px 5px rgba(0, 217, 255, 0.8)" : "none",
                }}
              >
                {pet.name}
              </Typography>
              <Button
                variant="contained"
                onClick={() => changePet(pet.name)}
                sx={{
                  marginTop: "10px",
                  background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "linear-gradient(90deg, #00d9ff, #3f51b5)",
                    boxShadow: "0px 0px 15px rgba(63, 81, 181, 0.8)",
                  },
                }}
              >
                Adopt
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetTab;
