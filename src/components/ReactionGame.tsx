import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";

interface ReactionGameProps {
  onScore: (points: number, x: number, y: number) => void;
}

const ReactionGame = ({ onScore }: ReactionGameProps) => {
  const [gameState, setGameState] = useState<"waiting" | "ready" | "playing" | "result">("waiting");
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [hits, setHits] = useState(0);

  const spawnTarget = useCallback(() => {
    setTargetPosition({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    });
  }, []);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setHits(0);
    setTimeLeft(10);
    spawnTarget();
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const points = 100;
    setScore((prev) => prev + points);
    setHits((prev) => prev + 1);
    onScore(points, e.clientX, e.clientY);
    spawnTarget();
  };

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "playing" && timeLeft === 0) {
      setGameState("result");
    }
  }, [gameState, timeLeft]);

  return (
    <div className="relative w-full max-w-md aspect-square bg-card/50 rounded-2xl border-2 border-primary neon-box-cyan overflow-hidden">
      {/* Game title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h3 className="font-bangers text-2xl text-primary neon-text-cyan">
          CATCH THE BLOB!
        </h3>
      </div>

      {gameState === "waiting" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <p className="text-foreground text-center px-8">
            Click the bouncing blobs as fast as you can!
          </p>
          <Button variant="arcade" size="xl" onClick={startGame}>
            PLAY NOW!
          </Button>
        </div>
      )}

      {gameState === "playing" && (
        <>
          {/* HUD */}
          <div className="absolute top-14 left-4 right-4 flex justify-between text-lg font-bold">
            <span className="text-accent neon-text-lime">Score: {score}</span>
            <span className="text-warning neon-text-yellow">Time: {timeLeft}s</span>
          </div>

          {/* Target */}
          <button
            onClick={handleTargetClick}
            className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-accent animate-bounce cursor-pointer hover:scale-125 transition-transform neon-box-magenta"
            style={{
              left: `${targetPosition.x}%`,
              top: `${targetPosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </>
      )}

      {gameState === "result" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-pop-in">
          <h4 className="font-bangers text-4xl text-warning neon-text-yellow">
            GAME OVER!
          </h4>
          <p className="text-2xl text-foreground">
            You caught <span className="text-accent font-bold">{hits}</span> blobs!
          </p>
          <p className="text-3xl font-bold text-primary neon-text-cyan">
            Score: {score}
          </p>
          <Button variant="arcade" size="lg" onClick={startGame}>
            PLAY AGAIN!
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReactionGame;
