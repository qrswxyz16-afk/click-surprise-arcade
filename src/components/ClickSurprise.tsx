import { useState, useCallback } from "react";

interface Surprise {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
}

interface ClickSurpriseProps {
  children: React.ReactNode;
  onSurprise: (x: number, y: number) => void;
}

const emojis = ["⭐", "🎮", "🕹️", "🎯", "🚀", "💎", "🔥", "⚡", "🌟", "🎪", "🎨", "🎭"];

const ClickSurprise = ({ children, onSurprise }: ClickSurpriseProps) => {
  const [surprises, setSurprises] = useState<Surprise[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Only trigger if clicking on the background, not other interactive elements
    if ((e.target as HTMLElement).closest("button, a, [role='button']")) {
      return;
    }

    const newSurprise: Surprise = {
      id: Date.now(),
      x,
      y,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 360,
    };

    setSurprises((prev) => [...prev, newSurprise]);
    onSurprise(x, y);

    // Remove surprise after animation
    setTimeout(() => {
      setSurprises((prev) => prev.filter((s) => s.id !== newSurprise.id));
    }, 800);
  }, [onSurprise]);

  return (
    <div onClick={handleClick} className="relative">
      {children}
      {surprises.map((surprise) => (
        <div
          key={surprise.id}
          className="fixed pointer-events-none text-4xl animate-score-pop z-50"
          style={{
            left: surprise.x,
            top: surprise.y,
            transform: `translate(-50%, -50%) rotate(${surprise.rotation}deg)`,
          }}
        >
          {surprise.emoji}
        </div>
      ))}
    </div>
  );
};

export default ClickSurprise;
