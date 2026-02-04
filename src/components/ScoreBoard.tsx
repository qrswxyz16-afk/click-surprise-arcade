interface ScoreBoardProps {
  score: number;
  clicks: number;
}

const ScoreBoard = ({ score, clicks }: ScoreBoardProps) => {
  return (
    <div className="fixed top-4 right-4 z-40 flex gap-4">
      {/* Total Score */}
      <div className="bg-card/80 backdrop-blur-sm rounded-xl px-6 py-3 border-2 border-primary neon-box-cyan">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          Score
        </div>
        <div className="font-bangers text-3xl text-primary neon-text-cyan">
          {score.toLocaleString()}
        </div>
      </div>

      {/* Click Counter */}
      <div className="bg-card/80 backdrop-blur-sm rounded-xl px-6 py-3 border-2 border-secondary neon-box-magenta">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          Clicks
        </div>
        <div className="font-bangers text-3xl text-secondary neon-text-magenta">
          {clicks}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
