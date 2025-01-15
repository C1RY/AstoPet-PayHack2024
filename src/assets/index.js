import { Hero } from "./hero.js";
import { Enemy } from "./enemy.js";
import { Combat } from "./combat.js";
import { updateHealthBar, showBattleLog } from "./ui.js";

// Setup hero and enemies
const hero = new Hero("Astro", 100, [
    { name: "Fireball", power: 20, manaCost: 10 },
    { name: "Water Splash", power: 15, manaCost: 8 }
]);

const enemies = [
    new Enemy("Phishing Wisp", 50, [
        { threshold: 30, healthBoost: 10 },
        { threshold: 10, healthBoost: 5 }
    ]),
    new Enemy("Malware Slime", 70, [])
];

// Start combat
const combat = new Combat(hero, enemies);

document.getElementById("attack-button").addEventListener("click", () => {
    const skill = hero.skills[0]; // Example: Use the first skill
    combat.heroTurn(skill, combat.enemies[0]);
    if (!combat.checkWin()) combat.enemyTurn();
    if (!combat.checkWin()) updateHealthBar(hero, "hero-health");
});
