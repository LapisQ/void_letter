import { motion } from "framer-motion";

interface EnvelopeCardProps {
  title: string;
  to: string;
  from: string;
  preview: string;
  mood: string;
  onClick?: () => void;
}

function EnvelopeCard({
  title,
  to,
  from,
  preview,
  mood,
  onClick,
}: EnvelopeCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      className="
        cursor-pointer
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-8
        backdrop-blur-xl
        transition-all
      "
    >
      <span
        className="
          rounded-full
          bg-[var(--accent)]/10
          px-3
          py-1
          text-sm
          text-[var(--accent)]
        "
      >
        {mood}
      </span>

      <h2 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">
        {title}
      </h2>

      <p className="mt-6 text-lg text-[var(--text-secondary)]">
        <strong>To:</strong> {to}
      </p>

      <p className="mt-2 text-[var(--text-secondary)]">
        {preview}
      </p>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)]">
          Written by {from}
        </span>

        <span className="text-[var(--accent)]">
          Open →
        </span>
      </div>
    </motion.div>
  );
}

export default EnvelopeCard;