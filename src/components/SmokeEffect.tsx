export default function SmokeEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-radial from-gray-600/20 to-transparent blur-3xl animate-smoke"
          style={{
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 300 + 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 15}s`,
          }}
        />
      ))}

      {[...Array(30)].map((_, i) => (
        <div
          key={`spark-${i}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-spark"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            boxShadow: '0 0 10px rgba(250, 204, 21, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
