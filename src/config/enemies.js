import phishingDuckAnimation from "../assets/ENEMY1.json";
import malwareAnimation from "../assets/ENEMY2.json";

export const enemies = [
  {
    name: "Phishing Duck",
    maxHealth: 100,
    attack: 10,
    defense: 5,
    magic: 5,
    animation: phishingDuckAnimation,
  },
  {
    name: "Malware",
    maxHealth: 150,
    attack: 20,
    defense: 8,
    magic: 10,
    animation: malwareAnimation,
  },
];
