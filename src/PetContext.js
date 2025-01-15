import React, { createContext, useContext, useState, useEffect } from "react";
import stagesByPet from "./petStages";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  // Define experience needed for the next level (you can change this if needed)
  const expToNextLevel = 1000;

  // Get pet data from localStorage or set defaults
  const storedPet = localStorage.getItem("selectedPet");
  const storedLevel = localStorage.getItem("petLevel");
  const storedExperience = parseInt(localStorage.getItem("petExperience"), 10) || 0; // Default experience 0

  // Initialize state variables with localStorage values or defaults
  const [selectedPet, setSelectedPet] = useState(storedPet || "Cat"); // Default to "Cat"
  const [level, setLevel] = useState(parseInt(storedLevel) || 1); // Default to level 1 if no level is stored
  const [experience, setExperience] = useState(storedExperience);
  const [currentStage, setCurrentStage] = useState({
    name: "Egg",
    animation: stagesByPet[selectedPet]?.[0]?.animation,
  });

  // Update localStorage when selectedPet, level, or experience change
  useEffect(() => {
    localStorage.setItem("selectedPet", selectedPet);
    localStorage.setItem("petLevel", level);  // Make sure this key matches the one you're using elsewhere
    localStorage.setItem("petExperience", experience);  // Make sure this key matches as well
  }, [selectedPet, level, experience]);

  // Function to change pet and reset to level 1 and experience 0
  const changePet = (petName) => {
    setSelectedPet(petName);
    setLevel(1); // Reset to level 1 for new pet
    setExperience(0); // Reset experience for new pet
    updatePetStage(1, petName); // Ensure stage is updated for new pet
  };

  // Function to update pet stage based on current level
  const updatePetStage = (level, pet = selectedPet) => {
    const petStages = stagesByPet[pet] || [];
    const stage = petStages.find((s) => level >= s.minLevel && level <= s.maxLevel) || petStages[0];
    setCurrentStage(stage); // Update the current stage based on the pet's level
  };

  // Add experience and handle leveling up, with level capped at 100
  const addExperience = (gainedExp) => {
    let newExperience = experience + gainedExp;
    let newLevel = level;

    // Cap the level at 100
    while (newExperience >= expToNextLevel && newLevel < 100) {
      newExperience -= expToNextLevel;
      newLevel += 1;
    }

    // Ensure level doesn't exceed 100
    if (newLevel >= 100) {
      newLevel = 100;
      newExperience = expToNextLevel - 1; // Cap the experience to prevent overflow past level 100
    }

    // Update experience and level in context
    setExperience(newExperience);
    setLevel(newLevel);

    // Save experience and level to localStorage
    localStorage.setItem('petExperience', newExperience);
    localStorage.setItem('petLevel', newLevel);

    // Optionally, update the pet stage based on the new level
    updatePetStage(newLevel, selectedPet);
  };

  return (
    <PetContext.Provider
      value={{
        selectedPet,
        level,
        experience,
        currentStage,
        changePet,
        updatePetStage,
        addExperience, // Make sure this function is available to components
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

// Hook to use the PetContext
export const usePet = () => useContext(PetContext);
