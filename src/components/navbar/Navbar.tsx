import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-[0.35em] text-[var(--text-primary)]"
        >
          VOID LETTERS
        </NavLink>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {[
            ["Make Post", "/make-post"],
            ["Read Posts", "/read-post"],
            ["Write Q", "/write-question"],
            ["Read World", "/read-world"],
            ["Treasure", "/treasure"],
            ["Untold", "/untold"],
          ].map(([title, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `
                relative
                text-sm
                uppercase
                tracking-[0.2em]
                transition-colors
                duration-300
                ${
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }
              `
              }
            >
              {title}
            </NavLink>
          ))}
        </nav>

        {/* Theme */}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Navbar;