import { useEffect, useState } from "react";

interface ScorePopupProps {
  score: number;
  x: number;
  y: number;
  id: string;
  onComplete: (id: string) => void;
}

const ScorePopup = ({ score, x, y, id, onComplete }: ScorePopupProps) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete(id);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  if (!visible) return null;

  const colors = [
    "text-primary neon-text-cyan",
    "text-secondary neon-text-magenta", 
    "text-accent neon-text-lime",
    "text-warning neon-text-yellow",
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`fixed pointer-events-none font-bangers text-3xl animate-score-pop z-50 ${randomColor}`}
      style={{ left: x, top: y }}
    >
      +{score}
    </div>
  );
};

export default ScorePopup;
