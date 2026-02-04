import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import QuirkyMascot from "@/components/QuirkyMascot";
import ReactionGame from "@/components/ReactionGame";
import ClickSurprise from "@/components/ClickSurprise";
import ScorePopup from "@/components/ScorePopup";
import Confetti from "@/components/Confetti";
import EasterEggModal from "@/components/EasterEggModal";
import ScoreBoard from "@/components/ScoreBoard";
import FloatingElements from "@/components/FloatingElements";

interface PopupData {
  id: string;
  score: number;
  x: number;
  y: number;
}

const Index = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 });
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleScore = useCallback((points: number, x: number, y: number) => {
    setTotalScore((prev) => prev + points);
    const popup: PopupData = {
      id: `${Date.now()}-${Math.random()}`,
      score: points,
      x,
      y,
    };
    setPopups((prev) => [...prev, popup]);
  }, []);

  const handleSurpriseClick = useCallback((x: number, y: number) => {
    setTotalClicks((prev) => prev + 1);
    handleScore(10, x, y);
    
    // Random confetti burst
    if (Math.random() > 0.7) {
      setConfettiOrigin({ x, y });
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 100);
    }
  }, [handleScore]);

  const handlePopupComplete = useCallback((id: string) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleSecretUnlock = useCallback(() => {
    setShowEasterEgg(true);
    setTotalScore((prev) => prev + 1000);
    // Trigger confetti at center
    setConfettiOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 100);
  }, []);

  return (
    <ClickSurprise onSurprise={handleSurpriseClick}>
      <div className="min-h-screen gradient-arcade relative overflow-hidden">
        <FloatingElements />
        
        {/* Score popups */}
        {popups.map((popup) => (
          <ScorePopup
            key={popup.id}
            id={popup.id}
            score={popup.score}
            x={popup.x}
            y={popup.y}
            onComplete={handlePopupComplete}
          />
        ))}

        {/* Confetti */}
        <Confetti
          trigger={confettiTrigger}
          originX={confettiOrigin.x}
          originY={confettiOrigin.y}
        />

        {/* Score board */}
        <ScoreBoard score={totalScore} clicks={totalClicks} />

        {/* Main content */}
        <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center gap-12">
          {/* Hero section */}
          <header className="text-center animate-slide-up">
            <h1 className="font-bangers text-6xl md:text-8xl text-primary neon-text-cyan mb-4 tracking-wider">
              PIXEL PARTY
            </h1>
            <p className="text-xl md:text-2xl text-foreground max-w-xl mx-auto font-nunito">
              Click anywhere for surprises! 🎉
            </p>
            <p className="text-muted-foreground mt-2">
              Every click is an adventure...
            </p>
          </header>

          {/* Mascot */}
          <div className="animate-pop-in" style={{ animationDelay: "0.2s" }}>
            <QuirkyMascot onSecretUnlock={handleSecretUnlock} />
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button
              variant="neon"
              size="xl"
              onClick={(e) => {
                handleScore(50, e.clientX, e.clientY);
                setConfettiOrigin({ x: e.clientX, y: e.clientY });
                setConfettiTrigger(true);
                setTimeout(() => setConfettiTrigger(false), 100);
              }}
            >
              🎁 Surprise Me!
            </Button>
            <Button
              variant="magenta"
              size="xl"
              onClick={(e) => handleScore(25, e.clientX, e.clientY)}
            >
              ⚡ Power Up!
            </Button>
            <Button
              variant="lime"
              size="xl"
              onClick={(e) => handleScore(25, e.clientX, e.clientY)}
            >
              🚀 Boost!
            </Button>
          </div>

          {/* Mini game section */}
          <section className="w-full max-w-lg animate-pop-in" style={{ animationDelay: "0.6s" }}>
            <ReactionGame onScore={handleScore} />
          </section>

          {/* Hint */}
          <footer className="text-center text-muted-foreground text-sm animate-pulse">
            <p>💡 Tip: Click the mascot 10 times for a secret!</p>
          </footer>
        </main>

        {/* Easter egg modal */}
        <EasterEggModal
          isOpen={showEasterEgg}
          onClose={() => setShowEasterEgg(false)}
        />

        {/* Scanlines overlay */}
        <div className="fixed inset-0 scanlines pointer-events-none z-50" />
      </div>
    </ClickSurprise>
  );
};

export default Index;
