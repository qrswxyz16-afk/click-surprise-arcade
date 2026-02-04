import { useState } from "react";

interface QuirkyMascotProps {
  onSecretUnlock: () => void;
}

const QuirkyMascot = ({ onSecretUnlock }: QuirkyMascotProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [expression, setExpression] = useState<"happy" | "excited" | "surprised">("happy");

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    setIsWiggling(true);
    
    // Change expression based on clicks
    if (clickCount >= 8) {
      setExpression("excited");
    } else if (clickCount >= 4) {
      setExpression("surprised");
    }

    // Easter egg at 10 clicks
    if (clickCount === 9) {
      onSecretUnlock();
    }

    setTimeout(() => setIsWiggling(false), 300);
  };

  const getEyes = () => {
    switch (expression) {
      case "excited":
        return "★ ★";
      case "surprised":
        return "◉ ◉";
      default:
        return "◕ ◕";
    }
  };

  const getMouth = () => {
    switch (expression) {
      case "excited":
        return "◡◡◡";
      case "surprised":
        return "○";
      default:
        return "◡";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        cursor-pointer select-none
        relative w-40 h-40 
        ${isWiggling ? "animate-wiggle" : "animate-float"}
        transition-transform duration-200
        hover:scale-110
      `}
    >
      {/* Body */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-secondary rounded-full neon-box-cyan" />
      
      {/* Face container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Eyes */}
        <div className="text-2xl font-bold text-primary-foreground tracking-widest mb-1">
          {getEyes()}
        </div>
        
        {/* Mouth */}
        <div className="text-xl text-primary-foreground">
          {getMouth()}
        </div>
      </div>

      {/* Antenna */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-6 bg-accent" />
        <div className="w-4 h-4 bg-accent rounded-full -ml-1.5 animate-pulse neon-box-lime" />
      </div>

      {/* Hint text */}
      {clickCount > 0 && clickCount < 10 && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-muted-foreground">
          {10 - clickCount} more clicks...
        </div>
      )}
    </div>
  );
};

export default QuirkyMascot;
