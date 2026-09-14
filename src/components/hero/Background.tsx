import { motion } from "framer-motion";

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

function Background() {
  const particles = Array.from({ length: 90 }, (_, index) => ({
    top: seededRandom(index * 2 + 1) * 100,
    left: seededRandom(index * 2 + 2) * 100,
    size: index % 7 === 0 ? 3 : 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Main Glow */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px]
        -translate-x-1/2 -translate-y-1/2 rounded-full
        bg-yellow-500/20 blur-[180px]"
      />

      {/* Left Glow */}

      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="absolute left-0 top-0 h-[500px] w-[500px]
        rounded-full bg-purple-700/20 blur-[150px]"
      />

      {/* Right Glow */}

      <motion.div
        animate={{
          x: [50, -50, 50],
          y: [30, -30, 30],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-0 h-[500px] w-[500px]
        rounded-full bg-blue-700/20 blur-[150px]"
      />

      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.5,
            backgroundColor: "var(--particle-color)",
            boxShadow: "0 0 8px var(--particle-glow)",
          }}
        />
      ))}

    </div>

    
  );



}

export default Background;