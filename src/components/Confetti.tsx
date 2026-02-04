import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  size: number;
}

interface ConfettiProps {
  trigger: boolean;
  originX: number;
  originY: number;
}

const Confetti = ({ trigger, originX, originY }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = [
        "hsl(180, 100%, 50%)", // cyan
        "hsl(300, 100%, 50%)", // magenta
        "hsl(120, 100%, 60%)", // lime
        "hsl(60, 100%, 50%)",  // yellow
      ];

      const newPieces: ConfettiPiece[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: originX + (Math.random() - 0.5) * 100,
        y: originY,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: 8 + Math.random() * 8,
      }));

      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [trigger, originX, originY]);

  return (
    <>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="fixed pointer-events-none animate-confetti z-50"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </>
  );
};

export default Confetti;
