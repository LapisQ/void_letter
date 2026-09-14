import { motion } from "framer-motion";

function Background() {
  const particles = Array.from({ length: 90 }, (_, index) => ({
    top: (index * 47) % 100,
    left: (index * 71) % 100,
    driftX: ((index * 13) % 36) - 18,
    driftY: ((index * 19) % 30) - 15,
    duration: 12 + (index % 8) * 2,
    delay: (index % 9) * 0.7,
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
        <motion.div
          key={index}
          initial={{ opacity: 0.15, scale: 0.7 }}
          animate={{
            x: [0, particle.driftX, particle.driftX * -0.7, 0],
            y: [0, particle.driftY, particle.driftY * -0.6, 0],
            opacity: [0.15, 0.85, 0.35, 0.15],
            scale: [0.7, 1.2, 0.85, 0.7],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

    </div>

    
  );



}

export default Background;