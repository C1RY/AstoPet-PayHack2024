// Calculate damage based on whether the answer was correct and the hero's level
export const calculateDamage = (isCorrect, attackType, heroLevel) => {
    const baseDamage = 10;
    let typeMultiplier = 1;
    
    switch (attackType) {
      case "Fire":
        typeMultiplier = 1.5;
        break;
      case "Water":
        typeMultiplier = 1.2;
        break;
      case "Earth":
        typeMultiplier = 1.3;
        break;
      case "Wind":
        typeMultiplier = 1.1;
        break;
      default:
        break;
    }
  
    // Hero level modifies the damage
    const levelModifier = heroLevel * 0.1;
    const finalDamage = isCorrect ? (baseDamage + levelModifier) * typeMultiplier : baseDamage;
  
    return finalDamage;
  };
  
  // Get next question
  export const getNextQuestion = (currentIndex, questions) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      return questions[nextIndex];
    } else {
      return null; // No more questions
    }
  };
  
  // Get stats for the boss fight (level 10+ or special boss enemy)
  export const getBossStats = () => {
    // Define boss stats such as damage, health, etc.
    return {
      health: 200, // Boss health
      damage: 30, // Boss damage per attack
      attackType: "Fire", // Boss elemental attack type
    };
  };
  