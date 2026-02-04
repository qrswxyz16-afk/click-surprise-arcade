const FloatingElements = () => {
  const elements = [
    { emoji: "🎮", top: "10%", left: "5%", delay: "0s", size: "text-4xl" },
    { emoji: "⭐", top: "20%", right: "10%", delay: "0.5s", size: "text-3xl" },
    { emoji: "🕹️", bottom: "30%", left: "8%", delay: "1s", size: "text-5xl" },
    { emoji: "💎", top: "60%", right: "5%", delay: "1.5s", size: "text-4xl" },
    { emoji: "🚀", bottom: "15%", right: "15%", delay: "2s", size: "text-3xl" },
    { emoji: "🔥", top: "40%", left: "3%", delay: "2.5s", size: "text-3xl" },
    { emoji: "⚡", bottom: "40%", right: "3%", delay: "0.8s", size: "text-4xl" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <div
          key={i}
          className={`absolute ${el.size} animate-float opacity-30`}
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            animationDelay: el.delay,
          }}
        >
          {el.emoji}
        </div>
      ))}

      {/* Grid lines for arcade feel */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
};

export default FloatingElements;
