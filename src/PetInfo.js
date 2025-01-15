import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, Grid } from "@mui/material";
import Lottie from "lottie-react";
import { usePet } from "./PetContext"; // Import PetContext
import { useTheme } from "./context/ThemeContext"; // Import useTheme from ThemeContext
import stagesByPet from "./petStages"; // Dynamic stages for each pet

const foods = [
  { name: "Apple", happinessBoost: 10, energyBoost: 15, healthBoost: 5, cost: 5 },
  { name: "Milk", happinessBoost: 20, energyBoost: 10, healthBoost: 10, cost: 10 },
  { name: "Treat", happinessBoost: 30, energyBoost: 20, healthBoost: 15, cost: 15 },
  { name: "Fish", happinessBoost: 40, energyBoost: 30, healthBoost: 20, cost: 20 },
  { name: "Cake", happinessBoost: 50, energyBoost: 35, healthBoost: 25, cost: 25 },
];

const dailyMissions = [
  { id: 1, description: "Analyze 5000 Data Points", progress: 0, goal: 5000, reward: 20 },
  { id: 2, description: "Feed Your Pet 3 Times", progress: 0, goal: 3, reward: 10 },
  { id: 3, description: "Reach 100 Happiness", progress: 0, goal: 100, reward: 15 },
];

const PetInfo = () => {
  const { selectedPet, level, experience, currentStage, addExperience, updatePetStage } = usePet();
  const { darkTheme, toggleTheme } = useTheme(); // Get theme state and toggle function

  const [totalDataAnalyzed, setTotalDataAnalyzed] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(500);
  const [health, setHealth] = useState(100);
  const [inventory, setInventory] = useState({ Apple: 20, Milk: 20, Treat: 10, Fish: 10, Cake: 20 });
  const [coins, setCoins] = useState(50); // Currency for buying items
  const [missions, setMissions] = useState([...dailyMissions]);
  const [exceptions, setExceptions] = useState(["Maybank", "HSBC", "CIMB", "TNB", "UOB"]); // Default exceptions

  useEffect(() => {
    // Update pet stage when component mounts or when level changes
    console.log(`Pet: ${selectedPet}, Level: ${level}`);
    updatePetStage(level, selectedPet); // Ensure pet stage is updated when level or pet changes
  }, [selectedPet, level, updatePetStage]);

  // Decrease happiness and energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness((prev) => Math.max(prev - 5, 0));
      setEnergy((prev) => Math.max(prev - 2, 0));
    }, 60000); // Runs every 1 minute
    return () => clearInterval(interval);
  }, []);

  // Analyze data and gain experience (consumes energy)
  const analyzeData = () => {
    if (energy < 10) {
      alert("Not enough energy to analyze data!");
      return;
    }
    const expGain = 1700; // Fixed EXP gained per button press
    setTotalDataAnalyzed((prev) => prev + expGain); // Track data analyzed
    setEnergy((prev) => Math.max(prev - 10, 0)); // Reduce energy
    addExperience(expGain); // Add EXP to the pet's progress
  };

  // Update mission progress
  const updateMissionProgress = (missionId, increment) => {
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === missionId
          ? { ...mission, progress: Math.min(mission.progress + increment, mission.goal) }
          : mission
      )
    );
  };

  // Feed the pet with selected food
  const feedPet = (foodName) => {
    if (inventory[foodName] > 0) {
      const food = foods.find((f) => f.name === foodName);
      setHappiness((prev) => Math.min(prev + food.happinessBoost, 100));
      setEnergy((prev) => Math.min(prev + food.energyBoost, 100));
      setHealth((prev) => Math.min(prev + food.healthBoost, 100));
      setInventory({ ...inventory, [foodName]: inventory[foodName] - 1 });

      // Update missions
      updateMissionProgress(2, 1);
    } else {
      alert(`You don't have any ${foodName} left!`);
    }
  };

  // Buy food from the pet shop
  const buyFood = (foodName) => {
    const food = foods.find((f) => f.name === foodName);
    if (coins >= food.cost) {
      setCoins((prev) => prev - food.cost);
      setInventory({ ...inventory, [foodName]: (inventory[foodName] || 0) + 1 });
    } else {
      alert("Not enough coins to buy this item!");
    }
  };

  // Claim mission rewards
  const claimMissionReward = (missionId) => {
    const mission = missions.find((m) => m.id === missionId);
    if (mission && mission.progress >= mission.goal) {
      setCoins((prev) => prev + mission.reward);
      alert(`🎉 Mission Complete! You earned ${mission.reward} coins.`);
      setMissions((prevMissions) => prevMissions.filter((m) => m.id !== missionId)); // Remove completed mission
    }
  };

  return (
    <Box
      sx={{
        padding: "40px",
        minHeight: "100vh",
        background: darkTheme ? "linear-gradient(135deg, #1e1e1e, #121212)" : "linear-gradient(135deg, #f5f5f5, #e0e0e0)", // Conditional background
        color: darkTheme ? "#ffffff" : "#000000", // Conditional text color
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#00d9ff",
          marginBottom: "20px",
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        AstoPet's Evolution Tracker
      </Typography>

      {/* Pet Animation */}
      <Box sx={{ marginBottom: "30px" }}>
        <Lottie
          animationData={currentStage.animation} // Ensure this is correct
          style={{
            height: "300px",
            margin: "0 auto",
            cursor: "pointer",
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#00d9ff" }}>
          Level {level}: {currentStage.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#cccccc" }}>
          EXP to Next Level: {experience} / 1000
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(experience / 1000) * 100}
          sx={{
            marginTop: "10px",
            background: "#333",
            "& .MuiLinearProgress-bar": { background: "#00d9ff" },
          }}
        />
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ marginBottom: "30px" }}>
        <Grid item xs={4}>
          <Typography variant="h6">Happiness</Typography>
          <LinearProgress
            variant="determinate"
            value={happiness}
            sx={{
              background: "#333",
              "& .MuiLinearProgress-bar": { background: "#ffcc00" },
            }}
          />
        </Grid>
        <Grid item xs={4}>
        <Typography variant="h6">Energy</Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min(Math.max(energy, 0), 100)} // Ensure energy value is within 0 and 100
          sx={{
            background: "#333", // Dark background
            "& .MuiLinearProgress-bar": {
              background: "#00ff00", // Green bar for energy
            },
          }}
        />
      </Grid>

        <Grid item xs={4}>
          <Typography variant="h6">Health</Typography>
          <LinearProgress
            variant="determinate"
            value={health}
            sx={{
              background: "#333",
              "& .MuiLinearProgress-bar": { background: "#ff0000" },
            }}
          />
        </Grid>
      </Grid>

      {/* Analyze Data Button */}
      <Button
        variant="contained"
        onClick={analyzeData}
        sx={{
          background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
          color: "#ffffff",
          marginBottom: "20px",
          "&:hover": { background: "linear-gradient(90deg, #00d9ff, #3f51b5)" },
        }}
      >
        Analyze More Data
      </Button>

      {/* Food Inventory */}
      <Typography variant="h5" sx={{ marginBottom: "20px", color: "#00d9ff" }}>
        Feed Your Pet
      </Typography>
      <Grid container spacing={2}>
        {foods.map((food) => (
          <Grid item xs={4} key={food.name}>
            <Button
              variant="outlined"
              onClick={() => feedPet(food.name)}
              sx={{
                color: "#00d9ff",
                borderColor: "#00d9ff",
                "&:hover": { background: "rgba(0, 217, 255, 0.1)" },
              }}
            >
              {food.name} ({inventory[food.name]} left)
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Pet Shop */}
      <Typography variant="h5" sx={{ marginTop: "40px", marginBottom: "20px", color: "#00d9ff" }}>
        Pet Shop
      </Typography>
      <Grid container spacing={2}>
        {foods.map((food) => (
          <Grid item xs={4} key={food.name}>
            <Button
              variant="outlined"
              onClick={() => buyFood(food.name)}
              sx={{
                color: "#00d9ff",
                borderColor: "#00d9ff",
                "&:hover": { background: "rgba(0, 217, 255, 0.1)" },
              }}
            >
              Buy {food.name} ({food.cost} Coins)
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ marginTop: "20px", color: "#cccccc" }}>
        Coins: {coins}
      </Typography>

      {/* Daily Missions */}
      <Typography variant="h5" sx={{ marginTop: "40px", marginBottom: "20px", color: "#00d9ff" }}>
        Daily Missions
      </Typography>
      <Grid container spacing={2}>
        {missions.map((mission) => (
          <Grid item xs={12} key={mission.id}>
            <Box
              sx={{
                background: "#1e1e1e",
                padding: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" sx={{ color: "#ffffff" }}>
                {mission.description} ({mission.progress}/{mission.goal})
              </Typography>
              {mission.progress >= mission.goal ? (
                <Button
                  variant="contained"
                  onClick={() => claimMissionReward(mission.id)}
                  sx={{
                    background: "linear-gradient(90deg, #ff8800, #ffcc00)",
                    color: "#ffffff",
                    "&:hover": { background: "linear-gradient(90deg, #ffcc00, #ff8800)" },
                  }}
                >
                  Claim Reward
                </Button>
              ) : (
                <Typography variant="body2" sx={{ color: "#cccccc" }}>
                  In Progress
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Data Analysis Trends */}
      <Box
        sx={{
          marginTop: "50px",
          padding: "20px",
          background: "#1e1e1e",
          borderRadius: "12px",
          color: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#00d9ff",
            marginBottom: "20px",
          }}
        >
          Data Analysis Trends
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px", color: "#cccccc" }}>
          Total Data Analyzed: {totalDataAnalyzed} points
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px", color: "#cccccc" }}>
          Exceptions: {exceptions.join(", ")}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            const newException = prompt("Enter an email domain to exclude:");
            if (newException) setExceptions([...exceptions, newException]);
          }}
          sx={{
            color: "#00d9ff",
            borderColor: "#00d9ff",
          }}
        >
          Add Exception
        </Button>
      </Box>
    </Box>
  );
};

export default PetInfo;
