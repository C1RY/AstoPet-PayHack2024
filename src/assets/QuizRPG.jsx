import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { LinearProgress } from "@mui/material";

// Corrected import paths (relative to the current file, assuming QuizRPG.jsx is in src/assets)
import { securityQuestions } from "../utils/securityQuestions";  // Adjusted to relative path
import { calculateAttackDamage } from "../utils/gameLogic";       // Adjusted to relative path
import HeroStats from "../components/HeroStats";  // Adjusted to relative path
import EnemyStats from "../components/EnemyStats";  // Adjusted to relative path
import AttackAnimation from "../components/AttackAnimation";  // Adjusted to relative path
import GameOverDialog from "../components/GameOverDialog";  // Adjusted to relative path
import enemyAnimation from "../assets/ENEMY1.json";
import heroAnimation from "../assets/HERO1.json";
import { usePet } from "../PetContext"; // Import PetContext for synchronization
import { enemies } from "../config/enemies";
import { stages } from "../config/stages";

// Animation imports (relative paths)
import fireAnimation from "../assets/FIRE1.json";  // Corrected path to JSON animation files
import waterAnimation from "../assets/WATER1.json";  // Corrected path to JSON animation files
import earthAnimation from "../assets/EARTH1.json";  // Corrected path to JSON animation files
import windAnimation from "../assets/WIND1.json";  // Corrected path to JSON animation files
import healthPotionAnimation from "../assets/HP1.json";  // Corrected path to JSON animation files

import backgroundImage from "../assets/ASTOPETCOMBATFIELD.jpg";  // Background image import

  // Fetch a random question
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * securityQuestions.length);
    return securityQuestions[randomIndex];
  };

  // Function to get a random enemy
  const getRandomEnemy = () => {
    const randomIndex = Math.floor(Math.random() * enemies.length);
    return { ...enemies[randomIndex], health: enemies[randomIndex].maxHealth }; // Add current health dynamically
  };
  
  // Inside the component, modify the state initialization

// Main Game Component
const QuizRPG = () => {
  const { currentStage } = usePet(); // Access the current stage of the pet
  const [heroStats, setHeroStats] = useState({
    health: 100,
    maxHealth: 100, // Hero's maximum health
    attack: 15,
    defense: 10,
    magic: 10,
    level: 1,
    xp: 0,
  });

  const [currentStageIndex, setCurrentStageIndex] = useState(0); // Start with the first stage
  const [enemy, setEnemy] = useState(stages[currentStageIndex].enemy); // Enemy for the current stage
  const [currentQuestion, setCurrentQuestion] = useState(
    stages[currentStageIndex].questions[0]
  );
  const [remainingQuestions, setRemainingQuestions] = useState([
    ...stages[currentStageIndex].questions,
  ]);

  const [enemyHealth, setEnemyHealth] = useState(100);
  const [turn, setTurn] = useState("hero");
  const [gameOver, setGameOver] = useState(false);
  const [inventory, setInventory] = useState({ healthPotion: 3 });
  const [attackAnimation, setAttackAnimation] = useState(null);
  const [isHpPotionAnimating, setIsHpPotionAnimating] = useState(false); // Add this line

  const [attackTarget, setAttackTarget] = useState(null); // 'enemy' or 'hero'


  const handleAnswer = (answer) => {
    if (turn !== "hero" || gameOver) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const damage = calculateAttackDamage(isCorrect, currentQuestion.type, heroStats.attack);

    if (isCorrect) {
      setAttackAnimation(fireAnimation); // Play attack animation
      setAttackTarget("enemy");
      setEnemy((prev) => ({
        ...prev,
        health: Math.max(prev.health - damage, 0),
      }));
    } else {
      setAttackAnimation(waterAnimation); // Play damage animation for wrong answer
      setAttackTarget("hero");
      setHeroStats((prev) => ({
        ...prev,
        health: Math.max(prev.health - damage / 2, 0),
      }));
    }

    const updatedQuestions = remainingQuestions.filter((q) => q !== currentQuestion);
    setRemainingQuestions(updatedQuestions);

    if (updatedQuestions.length > 0) {
      setCurrentQuestion(updatedQuestions[Math.floor(Math.random() * updatedQuestions.length)]);
    } else if (enemy.health <= 0) {
      handleStageCompletion();
    } else {
      setTurn("enemy");
      setTimeout(handleEnemyTurn, 2000);
    }
  };
  

  const handleEnemyTurn = () => {
    if (gameOver) return;

    const enemyDamage = enemy.attack + Math.floor(Math.random() * 5);
    if (Math.random() > 0.5) {
      const healAmount = Math.floor(Math.random() * 15);
      setEnemy((prev) => ({
        ...prev,
        health: Math.min(prev.health + healAmount, prev.maxHealth),
      }));
      setAttackAnimation(healthPotionAnimation);
      setAttackTarget("enemy");
    } else {
      setAttackAnimation(waterAnimation);
      setAttackTarget("hero");
      setHeroStats((prevStats) => ({
        ...prevStats,
        health: Math.max(prevStats.health - enemyDamage, 0),
      }));
    }

    setTimeout(() => {
      setAttackAnimation(null);
      setAttackTarget(null);
      setTurn("hero");
    }, 2000);
  };

  const handleStageCompletion = () => {
    if (currentStageIndex + 1 < stages.length) {
      // Progress to the next stage
      const nextStageIndex = currentStageIndex + 1;
      setCurrentStageIndex(nextStageIndex);
      setEnemy(stages[nextStageIndex].enemy);
      setRemainingQuestions([...stages[nextStageIndex].questions]);
      setCurrentQuestion(stages[nextStageIndex].questions[0]);
      setHeroStats((prev) => ({
        ...prev,
        xp: prev.xp + 50,
        level: prev.level + 1,
      }));
    } else {
      setGameOver(true); // Game Over if all stages are complete
    }
  };

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => alert("Congratulations! You completed the game."), 2000);
    }
  }, [gameOver]);

  // Handle victory conditions
const handleVictory = () => {
  const newXP = heroStats.xp + 50;
  const nextLevelXP = 100 * heroStats.level;
  const newLevel = newXP >= nextLevelXP ? heroStats.level + 1 : heroStats.level;

  setHeroStats((prevStats) => ({
    ...prevStats,
    level: newLevel,
    xp: newXP,
    health: 100 + 10 * newLevel,
    attack: 15 + 5 * newLevel,
  }));

  // Load a new random enemy
  const nextEnemy = getRandomEnemy();
  setEnemy(nextEnemy);
  setEnemyHealth(nextEnemy.maxHealth); // Reset health for the new enemy

  setCurrentQuestion(getRandomQuestion());
};
  

  // Heal the hero with a potion
  const healHero = () => {
    if (inventory.healthPotion > 0 && !gameOver) {
      setIsHpPotionAnimating(true); // Trigger the potion animation
  
      // Reduce health potion count
      setInventory((prev) => ({ ...prev, healthPotion: prev.healthPotion - 1 }));
  
      // Heal the hero, but not exceeding max health
      setHeroStats((prev) => ({
        ...prev,
        health: Math.min(prev.health + 50, prev.maxHealth),
      }));
  
      // Stop animation after a short delay
      setTimeout(() => {
        setIsHpPotionAnimating(false);
        setTurn("enemy"); // Switch to enemy's turn
        handleEnemyTurn(); // Trigger enemy turn
      }, 2000);
    }
  };
  

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => alert("Game Over! Restarting..."), 2000);
    }
  }, [gameOver]);

  return (
    <Box sx={{ padding: "20px", color: "#ffffff", textAlign: "center", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "15px", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ color: "#00d9ff", padding: "20px 0", fontWeight: "bold" }}>{stages[currentStageIndex].name} - Level {heroStats.level}</Typography>

      {/* Game Layout */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Position hero on the right and enemy on the left
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        {/* Enemy Section (Left Side) */}
        <Box sx={{ textAlign: "center", flex: "1" }}>
          <Lottie animationData={enemy.animation} style={{ height: "200px" }} /> {/* Dynamically render the animation based on the selected enemy */}
          <Typography variant="h6" sx={{ color: "#FF4500" }}>
            {enemy.name} {/* Display the dynamically selected enemy's name */}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              {enemy.health}/{enemy.maxHealth} {/* Display dynamic current/max health */}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(enemy.health / enemy.maxHealth) * 100} // Adjust progress percentage dynamically
              sx={{
                width: "150px",
                background: "#333",
                "& .MuiLinearProgress-bar": { background: "#FF0000" },
              }}
            />
          </Box>
        </Box>
        {/* Hero Section (Right Side) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Align hero and potion to the right
            flex: "1",
            paddingRight: "220px", // Adjust padding to balance placement
          }}
        >
          {/* Hero Animation and Details */}
          <Box sx={{ textAlign: "center", marginRight: "20px" }}> {/* Spacing between hero and potion */}
            <Lottie animationData={currentStage.animation} style={{ height: "200px" }} />
            <Typography variant="h6" sx={{ color: "#00FF00" }}>Hero</Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                {heroStats.health}/{heroStats.maxHealth}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(heroStats.health / heroStats.maxHealth) * 100}
                sx={{
                  width: "150px",
                  background: "#333",
                  "& .MuiLinearProgress-bar": { background: "#00FF00" },
                }}
              />
            </Box>
          </Box>

          {/* HP Potion */}
          <Box
            sx={{
              position: "absolute",
              top: "35%", // Adjust to align near the hero
              right: "8%", // Position it relative to the hero's section
              transform: "translateY(-50%)", // Center vertically
              cursor: "pointer", // Clickable
              zIndex: 2, // Ensure it stays above other elements
            }}
            onClick={healHero} // Heal the hero when clicked
          >
            <Lottie
              animationData={healthPotionAnimation}
              style={{
                width: "50px",
                height: "50px",
                opacity: inventory.healthPotion > 0 ? 1 : 0.5, // Dim if no potions left
              }}
              loop // Loop the animation for visual effect
            />
            {/* Display the number of potions left */}
            <Typography
              sx={{
                color: "#FFF",
                textAlign: "center",
                marginTop: "-10px",
                fontWeight: "bold",
              }}
            >
              x{inventory.healthPotion}
            </Typography>
          </Box>


          {/* Hero Damage Animation */}
          {/* Attack or Healing Animation */}
          {attackAnimation && attackTarget && (
            <Box
              sx={{
                position: "absolute",
                top: attackTarget === "enemy" ? "26%" : "34%", // Adjust top for Enemy or Hero
                left: attackTarget === "enemy" ? "22.5%" : "80%", // Adjust left for Enemy or Hero
                transform: "translate(-50%, -50%)", // Center the animation
              }}
            >
              <Lottie
                animationData={attackAnimation} // Play the appropriate animation
                style={{
                  width: "150px", // Adjust size
                  height: "150px",
                }}
                onComplete={() => {
                  setAttackAnimation(null); // Reset the animation
                  setAttackTarget(null); // Clear the target
                }}
                loop={false} // Ensure the animation doesn't loop
              />
            </Box>
          )}

          {/* HP Potion Animation */}
          {isHpPotionAnimating && (
            <Box
              sx={{
                position: "absolute", // Position near the hero
                top: "34%", // Adjust to align near the hero
                left: "80%", // Position it relative to the hero
              }}
            >
              <Lottie
                animationData={healthPotionAnimation}
                style={{
                  width: "50px",
                  height: "50px",
                }}
                loop={false} // Ensure animation doesn't loop
                onComplete={() => setIsHpPotionAnimating(false)} // Reset after animation completes
              />
            </Box>
          )}
        </Box>
      </Box>



      {/* Quiz Question */}
      {turn === "hero" && !gameOver && (
        <Box sx={{ margin: "20px 0", textAlign: "center" }}>
          {/* Question */}
          <Typography variant="h6" sx={{ color: "#FFDD00", marginBottom: "20px", fontWeight: "bold" }}>
            {currentQuestion.question}
          </Typography>

          {/* Render answers vertically */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px", // Space between rows
            }}
          >
            {currentQuestion.answers.map((answer, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "80%", // Adjust for responsiveness
                  maxWidth: "600px", // Limit maximum width
                  background: "linear-gradient(90deg, #282C34, #3A3F47)", // Dark gradient for answer box
                  borderRadius: "10px", // Rounded edges
                  padding: "10px 20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)", // Subtle shadow
                  border: "1px solid #3F51B5", // Subtle border for consistency
                  cursor: "pointer", // Change cursor to pointer
                  transition: "transform 0.2s, box-shadow 0.2s", // Smooth animation for hover
                  "&:hover": {
                    transform: "scale(1.05)", // Slightly enlarge the box on hover
                    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.5)", // Enhanced shadow on hover
                    border: "1px solid #FFD700", // Highlight border on hover
                  },
                }}
                onClick={() => handleAnswer(answer)} // Answer click handler
              >
                {/* Label (A, B, C, D) */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px", // Fixed width for the label
                    height: "50px", // Fixed height for the label
                    background: index === 0 ? "#FF4500" // Red-Orange for A
                              : index === 1 ? "#3CB371" // Green for B
                              : index === 2 ? "#1E90FF" // Blue for C
                              : "#FFD700", // Gold for D
                    color: "#FFFFFF", // White text for labels
                    fontWeight: "bold",
                    fontSize: "18px", // Label font size
                    borderRadius: "50%", // Circular shape
                    marginRight: "15px", // Space between label and answer text
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Slight shadow for label
                    transition: "transform 0.2s", // Smooth animation for hover
                    "&:hover": {
                      transform: "scale(1.3)", // Slightly enlarge the label on hover
                    },
                  }}
                >
                  {String.fromCharCode(97 + index).toUpperCase()} {/* Render as A, B, C, D */}
                </Box>

                {/* Answer Text */}
                <Typography
                  sx={{
                    flex: 1, // Fill remaining space
                    textAlign: "left",
                    color: "#FFFFFF", // White text for better readability
                    fontSize: "16px", // Answer font size
                    "&:hover": {
                      color: "#FFD700", // Highlight answer text on hover
                    },
                  }}
                >
                  {answer}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Game Over Dialog */}
      {gameOver && (
        <GameOverDialog
          open={gameOver}
          gameResult={heroStats.health > 0 ? "won" : "lost"}
          onRestart={() => window.location.reload()}
        />
      )}
    </Box>
  );
};

export default QuizRPG;
