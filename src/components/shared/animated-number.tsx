
'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

const AnimatedNumber = ({ value, duration = 1000, className }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize displayValue with the initial target value without animation
    // This handles the very first render or cases where value changes before component mounts fully.
    // Only set if it's the initial setup or if the value prop is different from current displayValue's source (prevValueRef)
    // to avoid interrupting ongoing animation with initial flicker.
    if (startTimeRef.current === null) { // A way to check if it's the first run or value changed
        setDisplayValue(value);
        prevValueRef.current = value;
    }
  }, []);


  useEffect(() => {
    // Capture current display value as starting point for animation if it's not the initial value
    // This ensures smooth transition if `value` prop changes while an animation is running or has just completed.
    // However, for the very first animation from 0, prevValueRef should be 0 or initial displayValue.
    // The initial useEffect sets prevValueRef.current = value, so this should generally be fine.
    // If value prop changes, we want to animate from current displayValue to new `value`.
    
    // To ensure animation starts from the current displayed number when `value` prop changes:
    const animationStartValue = displayValue;
    startTimeRef.current = null; // Reset start time for new animation to `value`

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsedTime = timestamp - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const startVal = animationStartValue; // Animate from current display
      const endVal = value; // Animate to new target value
      
      const currentAnimatedValue = startVal + (endVal - startVal) * progress;
      setDisplayValue(Math.floor(currentAnimatedValue));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure final value is exact
      }
    };

    // Only start a new animation if the target value is different from the current display value
    if (displayValue !== value) {
        frameRef.current = requestAnimationFrame(animate);
    } else {
        // If displayValue is already the target value, ensure prevValueRef is updated for next potential change
        prevValueRef.current = value;
    }


    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]); // Rerun effect if target value or duration changes

  return <span className={className}>{displayValue.toLocaleString()}</span>;
};

export default AnimatedNumber;
