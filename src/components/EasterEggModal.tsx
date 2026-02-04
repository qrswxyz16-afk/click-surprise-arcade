import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EasterEggModal = ({ isOpen, onClose }: EasterEggModalProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative z-10 max-w-md w-full mx-4 p-8
          bg-card rounded-3xl border-4 border-warning
          neon-box-cyan
          ${showContent ? "animate-pop-in" : "opacity-0 scale-0"}
        `}
      >
        {/* Stars decoration */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce">
          🏆
        </div>

        <div className="text-center pt-6">
          <h2 className="font-bangers text-4xl text-warning neon-text-yellow mb-4">
            SECRET UNLOCKED!
          </h2>

          <div className="text-6xl mb-4 animate-spin-slow">
            🎮
          </div>

          <p className="text-foreground text-lg mb-2">
            You found the hidden Easter egg!
          </p>
          
          <p className="text-muted-foreground mb-6">
            You're a true explorer! Keep clicking around - who knows what else you might find?
          </p>

          <div className="flex justify-center gap-3">
            <Button variant="arcade" onClick={onClose}>
              AWESOME!
            </Button>
          </div>
        </div>

        {/* Floating decorations */}
        <div className="absolute -left-4 top-1/4 text-2xl animate-float">✨</div>
        <div className="absolute -right-4 top-1/3 text-2xl animate-float" style={{ animationDelay: "0.5s" }}>⭐</div>
        <div className="absolute -left-2 bottom-1/4 text-xl animate-float" style={{ animationDelay: "1s" }}>💫</div>
        <div className="absolute -right-2 bottom-1/3 text-xl animate-float" style={{ animationDelay: "1.5s" }}>🌟</div>
      </div>
    </div>
  );
};

export default EasterEggModal;
