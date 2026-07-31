import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

function ScrollIndicator() {
  return (
    <motion.div
      animate={{
        y: [0, 12, 0],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
      }}
      className="
        absolute
        bottom-10
        left-1/2
        -translate-x-1/2
        flex
        flex-col
        items-center
        text-[var(--text-secondary)]
      "
    >
      <span className="mb-2 text-xs uppercase tracking-[0.3em]">
        Discover Stories
      </span>

      <ChevronDown size={26} />
    </motion.div>
  );
}

export default ScrollIndicator;