import { ArrowUp, CakeSlice, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)] px-6 py-12 text-[var(--text-primary)] sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <CakeSlice size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]">A birthday made of memories</span>
            </div>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
              Some days deserve to be remembered beautifully.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--text-secondary)]">
              Made with care, a little imagination, and many reasons to celebrate you. May the next chapter be gentle, bright, and entirely yours.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
            <p className="flex items-center gap-2 text-[var(--accent)]">
              <Sparkles size={15} />
              21 SEP 20XX
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link className="transition hover:text-[var(--accent)]" to="/">Home</Link>
              <Link className="transition hover:text-[var(--accent)]" to="/treasure">Treasure</Link>
              <Link className="transition hover:text-[var(--accent)]" to="/read-world">Read World</Link>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex h-11 w-11 items-center justify-center self-start rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] lg:self-end"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-5 text-xs text-[var(--text-secondary)]">
          <span>VOID LETTERS</span>
          <span className="inline-flex items-center gap-1.5">
            Written with <Heart size={13} className="text-[var(--accent)]" fill="currentColor" /> and good wishes.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
