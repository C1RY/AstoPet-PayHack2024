import React from "react";
import Lottie from "lottie-react";
import heroAnimation from "../assets/HERO1.json";

const Hero = () => (
  <Lottie animationData={heroAnimation} style={{ height: "200px" }} />
);

export default Hero;
