import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  link: string;
}

function ActionCard({
  title,
  subtitle,
  icon: Icon,
  link,
}: Props) {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
        group
        h-64
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        backdrop-blur-xl
        p-8
        cursor-pointer
        overflow-hidden
        relative
        "
      >
        <div
          className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
          bg-gradient-to-br
          from-[var(--accent)]/15
          to-pink-400/10
          "
        />

        <Icon
          size={48}
          className="mb-6 text-[var(--accent)]"
        />

        <h2 className="text-3xl font-bold text-[var(--text-primary)]">
          {title}
        </h2>

        <p className="mt-3 text-[var(--text-secondary)]">
          {subtitle}
        </p>
      </motion.div>
    </Link>
  );
}

export default ActionCard;