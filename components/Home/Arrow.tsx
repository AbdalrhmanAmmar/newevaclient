"use client"

import { ArrowDown } from 'lucide-react';

// In your component where you want to use the animated ArrowDown
const AnimatedArrowDown = () => {
  return (
    <ArrowDown 
      className="w-5 h-5 mr-2 transition-transform duration-2000 ease-in-out animate-bounce group-hover:animate-none group-hover:translate-y-1" 
    />
  );
};
export default AnimatedArrowDown
