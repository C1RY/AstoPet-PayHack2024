import catAnimation from "./pet-animation.json";
import catHatchlingAnimation from "./HATCHLING.json";
import cat1Animation from "./CAT1.json";
import cat2Animation from "./CAT2.json";
import cat3Animation from "./CAT3.json";

import dogAnimation from "./DOG.json";
import dogHatchlingAnimation from "./HATCHLING1.json";
import dog1Animation from "./DOG1.json";
import dog2Animation from "./DOG2.json";
import dog3Animation from "./DOG3.json";

import bearAnimation from "./BEAR.json";
import bearHatchlingAnimation from "./HATCHLING2.json";
import bear1Animation from "./BEAR1.json";
import bear2Animation from "./BEAR2.json";
import bear3Animation from "./BEAR3.json";

import squirtleAnimation from "./SQUIRTLE.json";
import squirtleHatchlingAnimation from "./HATCHLING3.json";
import squirtle1Animation from "./SQUIRTLE1.json";
import squirtle2Animation from "./SQUIRTLE2.json";
import squirtle3Animation from "./SQUIRTLE3.json";

import koalaAnimation from "./KOALA.json";
import koalaHatchlingAnimation from "./HATCHLING4.json";
import koala1Animation from "./KOALA1.json";
import koala2Animation from "./KOALA2.json";
import koala3Animation from "./KOALA3.json";

import pigeonAnimation from "./PIGEON.json";
import pigeonHatchlingAnimation from "./HATCHLING5.json";
import pigeon1Animation from "./PIGEON1.json";
import pigeon2Animation from "./PIGEON2.json";
import pigeon3Animation from "./PIGEON3.json";

const stagesByPet = {
  Cat: [
    { name: "Egg", minLevel: 1, maxLevel: 19, animation: catAnimation },
    { name: "Hatchling", minLevel: 20, maxLevel: 49, animation: catHatchlingAnimation },
    { name: "Young", minLevel: 50, maxLevel: 79, animation: cat1Animation },
    { name: "Adult", minLevel: 80, maxLevel: 99, animation: cat2Animation },
    { name: "Legendary", minLevel: 100, maxLevel: 100, animation: cat3Animation },
  ],
  Dog: [
    { name: "Egg", minLevel: 1, maxLevel: 19, animation: dogAnimation },
    { name: "Hatchling", minLevel: 20, maxLevel: 49, animation: dogHatchlingAnimation },
    { name: "Young", minLevel: 50, maxLevel: 79, animation: dog1Animation },
    { name: "Adult", minLevel: 80, maxLevel: 99, animation: dog2Animation },
    { name: "Legendary", minLevel: 100, maxLevel: 100, animation: dog3Animation },
  ],
  Bear: [
    { name: "Egg", minLevel: 1, maxLevel: 19, animation: bearAnimation },
    { name: "Hatchling", minLevel: 20, maxLevel: 49, animation: bearHatchlingAnimation },
    { name: "Young", minLevel: 50, maxLevel: 79, animation: bear1Animation },
    { name: "Adult", minLevel: 80, maxLevel: 99, animation: bear2Animation },
    { name: "Legendary", minLevel: 100, maxLevel: 100, animation: bear3Animation },
  ],
  Squirtle: [
    { name: "Egg", minLevel: 1, maxLevel: 19, animation: squirtleAnimation },
    { name: "Hatchling", minLevel: 20, maxLevel: 49, animation: squirtleHatchlingAnimation },
    { name: "Young", minLevel: 50, maxLevel: 79, animation: squirtle1Animation },
    { name: "Adult", minLevel: 80, maxLevel: 99, animation: squirtle2Animation },
    { name: "Legendary", minLevel: 100, maxLevel: 100, animation: squirtle3Animation },
  ],
  Koala: [
    { name: "Egg", minLevel: 1, maxLevel: 19, animation: koalaAnimation },
    { name: "Hatchling", minLevel: 20, maxLevel: 49, animation: koalaHatchlingAnimation },
    { name: "Young", minLevel: 50, maxLevel: 79, animation: koala1Animation },
    { name: "Adult", minLevel: 80, maxLevel: 99, animation: koala2Animation },
    { name: "Legendary", minLevel: 100, maxLevel: 100, animation: koala3Animation },
  ],
  Pigeon: [
    { name: "Egg", minLevel: 1, maxLevel: 19, animation: pigeonAnimation },
    { name: "Hatchling", minLevel: 20, maxLevel: 49, animation: pigeonHatchlingAnimation },
    { name: "Young", minLevel: 50, maxLevel: 79, animation: pigeon1Animation },
    { name: "Adult", minLevel: 80, maxLevel: 99, animation: pigeon2Animation },
    { name: "Legendary", minLevel: 100, maxLevel: 100, animation: pigeon3Animation },
  ],
};

export default stagesByPet;
