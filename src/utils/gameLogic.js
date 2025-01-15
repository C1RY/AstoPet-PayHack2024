export const calculateAttackDamage = (isCorrect, attackType, attackPower) => {
    let baseDamage = isCorrect ? attackPower : attackPower / 2;
  
    if (attackType === "Fire") baseDamage += 10;
    if (attackType === "Water") baseDamage += 5;
    if (attackType === "Earth") baseDamage += 7;
    if (attackType === "Wind") baseDamage += 6;
  
    console.log("Calculated Damage:", baseDamage); // Log damage
    return Math.max(baseDamage, 0); // Ensure non-negative damage
  };
  
  
  
  export const getRandomQuestion = (questions) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };
  
  export const handleVictory = (heroStats, setHeroStats, enemy, setEnemy, setEnemyHealth) => {
    const newXP = heroStats.xp + 50;
    const nextLevelXP = 100 * heroStats.level;
    const newLevel = newXP >= nextLevelXP ? heroStats.level + 1 : heroStats.level;
  
    setHeroStats((prevStats) => ({
      ...prevStats,
      level: newLevel,
      xp: newXP,
      health: 100 + 10 * newLevel, // Increase max health per level
      attack: 15 + 5 * newLevel,   // Increase attack per level
    }));
  
    // Add new enemy for next round
    setEnemy({
      ...enemy,
      level: newLevel + 1,
      health: 100 + 20 * (newLevel + 1),
      attack: 15 + 5 * (newLevel + 1),
    });
  
    setEnemyHealth(100 + 20 * (newLevel + 1)); // Reset enemy health for next round
  };
