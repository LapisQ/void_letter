import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../themes/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={theme === "void" ? "Switch to Blossom Theme" : "Switch to Void Theme"}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--text-primary)]
        transition-all
        duration-300
        hover:scale-110
        hover:border-[var(--accent)]
        hover:text-[var(--accent)]
      "
    >
      {theme === "void" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}

export default ThemeToggle;