import { motion } from "framer-motion";

function Background() {
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

      {[...Array(120)].map((_, index) => (
  <motion.div
    key={index}
    initial={{
      opacity: Math.random(),
    }}
    animate={{
      opacity: [0.2, 1, 0.2],
    }}
    transition={{
      duration: Math.random() * 5 + 2,
      repeat: Infinity,
    }}
    className="absolute h-[2px] w-[2px] rounded-full bg-white"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
  />
))}

    </div>

    
  );



}

export default Background;