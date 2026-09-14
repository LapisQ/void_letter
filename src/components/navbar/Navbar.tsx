import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    ["Make Post", "/make-post"],
    ["Read Posts", "/read-post"],
    ["Write Q", "/write-question"],
    ["Read World", "/read-world"],
    ["Treasure", "/treasure"],
    ["Untold", "/untold"],
  ];

  return (
    <header
      className="
        fixed
        top-0
        left-0
        z-50
        w-full
        border-b
        border-[var(--border)]
        bg-[color:var(--surface)]
        backdrop-blur-xl
      "
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:min-h-20 lg:px-10 lg:py-0">

        {/* Logo */}
        <NavLink
          to="/"
          className="shrink-0 text-lg font-bold tracking-[0.24em] text-[var(--text-primary)] sm:text-xl lg:text-2xl lg:tracking-[0.35em]"
        >
          VOID LETTERS
        </NavLink>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          {links.map(([title, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `
                relative
                rounded-full
                px-3
                py-2
                text-xs
                uppercase
                tracking-[0.14em]
                transition-colors
                duration-300
                ${
                  isActive
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                }
              `
              }
            >
              {title}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)] transition hover:border-[var(--accent)] hover:bg-[var(--accent)]/20 lg:hidden"
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
            <span>{isMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-[var(--border)] bg-[var(--bg-primary)]/95 px-4 py-5 shadow-xl shadow-[var(--accent)]/10 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3">
            {links.map(([title, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-center text-xs uppercase tracking-[0.12em] transition ${
                    isActive
                      ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;