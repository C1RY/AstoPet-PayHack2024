import React from 'react';
import Lottie from 'lottie-react';

/**
 * AttackAnimation component renders the attack animation
 * based on the provided animation data.
 * 
 * Props:
 * - animationData: The JSON animation data to display.
 */
const AttackAnimation = ({ animationData }) => {
  if (!animationData) return null; // If no animation data, return nothing

  return (
    <div style={{ textAlign: 'center' }}>
      <Lottie animationData={animationData} style={{ height: '150px', width: '150px' }} />
    </div>
  );
};

export default AttackAnimation;
