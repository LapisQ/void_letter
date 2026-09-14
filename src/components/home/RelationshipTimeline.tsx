import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Heart, LockKeyhole, X } from "lucide-react";
import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { verifyPrivatePassword } from "../../services/privateAccess";

interface TimelineEvent {
  number: string;
  title: string;
  date: string;
  detail: string;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    number: "01",
    title: "First contact",
    date: "Jan 27, 2025",
    detail: "The beginning was simple: a first hello, a first little opening, and the start of a story that neither of us knew would become so meaningful.",
    color: "#d4af37",
  },
  {
    number: "02",
    title: "Got recognized",
    date: "Dec 18, 2025",
    detail: "Somewhere between familiar faces and familiar conversations, we stopped being strangers in each other's world.",
    color: "#e8c66a",
  },
  {
    number: "03",
    title: "Initiate",
    date: "Dec 27, 2025",
    detail: "A little courage changed the rhythm. The distance became smaller, the conversations became easier, and something new began to take shape.",
    color: "#f3a6c8",
  },
  {
    number: "04",
    title: "Deep talk",
    date: "Dec 28, 2025",
    detail: "One honest conversation can make the world feel quieter. This was the day we shared more than words and found a deeper kind of comfort.",
    color: "#ed83b4",
  },
  {
    number: "05",
    title: "Asked out",
    date: "Jan 1, 2026",
    detail: "A new year, a brave question, and a yes that made the first day of 2026 feel like a beginning worth remembering.",
    color: "#d4af37",
  },
  {
    number: "06",
    title: "First date",
    date: "Jan 3, 2026",
    detail: "The first time the story stepped out of messages and into the real world. A day made of nervous smiles, shared time, and a memory to keep.",
    color: "#e8c66a",
  },
  {
    number: "07",
    title: "Healthy relation",
    date: "Till Jul 12, 2026",
    detail: "A season of choosing patience, honesty, laughter, and care. The good parts were real, and they deserve to be remembered gently.",
    color: "#f3a6c8",
  },
  {
    number: "08",
    title: "Breaking up",
    date: "Sep 1, 2026",
    detail: "Not every beautiful chapter stays open forever. This ending is part of the story too, held with respect for everything that came before it.",
    color: "#ed83b4",
  },
];

function RelationshipTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const activeEvent = selectedEvent === null ? null : timelineEvents[selectedEvent];

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedEvent(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function openEvent(index: number, event: MouseEvent<HTMLButtonElement>) {
    const checkpoint = event.currentTarget.getBoundingClientRect();
    const popupWidth = Math.min(360, window.innerWidth - 24);
    const left = Math.min(
      Math.max(12, checkpoint.left + checkpoint.width / 2 - popupWidth / 2),
      window.innerWidth - popupWidth - 12
    );
    const popupHeight = 300;
    const top = checkpoint.bottom + 16 + popupHeight > window.innerHeight
      ? Math.max(12, checkpoint.top - popupHeight - 16)
      : checkpoint.bottom + 16;

    setPopupPosition({ top, left });
    setSelectedEvent(index);
  }

  async function unlockTimeline(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (await verifyPrivatePassword(password)) {
      setIsUnlocked(true);
      setPasswordError(false);
      return;
    }

    setPasswordError(true);
  }

  return (
    <section className="overflow-hidden bg-[var(--bg-primary)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[var(--accent)]">A story in chapters</p>
          <h2 className="text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">The timeline of us</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Eight moments that changed the shape of the story. Choose a checkpoint to open it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.18, duration: 0.7 }}
          className="relative mt-16"
        >
          <div
            aria-hidden={!isUnlocked}
            className={`overflow-x-auto pb-5 [scrollbar-color:var(--accent)_transparent] transition duration-700 ${isUnlocked ? "" : "pointer-events-none select-none blur-md"}`}
          >
            <div className="relative flex min-w-[920px] justify-between gap-4 px-5 pt-2">
              <div className="absolute left-8 right-8 top-[2.1rem] h-px bg-[var(--border)]" />
              <motion.div
                className="absolute left-8 top-[2.1rem] h-px bg-[var(--accent)]"
                animate={{ width: isUnlocked ? "calc(100% - 4rem)" : "0%" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              {isUnlocked && (
                <motion.div
                  aria-hidden="true"
                  className="absolute left-8 top-[calc(2.1rem-3px)] h-1 w-16 rounded-full bg-[var(--accent)] blur-[1px] shadow-[0_0_16px_var(--accent)]"
                  animate={{ x: [0, 820, 0], opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {timelineEvents.map((event, index) => (
                <motion.button
                  key={event.number}
                  type="button"
                  onClick={(clickEvent) => openEvent(index, clickEvent)}
                  aria-expanded={selectedEvent === index}
                  initial={{ opacity: 0, scale: 0.5, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08, type: "spring", stiffness: 260, damping: 18 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.94 }}
                  className="group relative z-10 flex w-24 shrink-0 flex-col items-center text-center outline-none"
                >
                  <motion.span
                    animate={isUnlocked ? { boxShadow: ["0 0 0 rgba(212,175,55,0)", "0 0 22px rgba(212,175,55,0.32)", "0 0 0 rgba(212,175,55,0)"] } : undefined}
                    transition={{ delay: 0.6 + index * 0.08, duration: 2.8, repeat: Infinity, repeatDelay: 2.5 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--bg-primary)] text-xs font-bold text-[var(--text-secondary)] transition duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-focus-visible:border-[var(--accent)]"
                  >
                    {event.number}
                  </motion.span>
                  <span className="mt-5 text-sm font-semibold text-[var(--text-secondary)] transition group-hover:text-[var(--text-primary)] group-focus-visible:text-[var(--text-primary)]">
                    {event.title}
                  </span>
                  <span className="mt-2 whitespace-nowrap text-xs text-[var(--text-secondary)]">{event.date}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {!isUnlocked && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-10 flex items-center justify-center px-4">
              <form onSubmit={unlockTimeline} className="w-full max-w-sm rounded-2xl border border-[var(--accent)]/50 bg-[var(--bg-secondary)]/95 p-6 text-center shadow-2xl shadow-[var(--accent)]/20 backdrop-blur-xl">
                <LockKeyhole className="mx-auto text-[var(--accent)]" size={26} />
                <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">Private timeline</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">Enter the key to reveal these chapters.</p>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => { setPassword(event.target.value); setPasswordError(false); }}
                  placeholder="Enter password"
                  aria-label="Timeline password"
                  className="mt-5 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-center text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
                />
                <button type="submit" className="mt-3 w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90">
                  Unlock timeline
                </button>
                {passwordError && <p className="mt-3 text-xs text-rose-300">That password does not unlock these memories.</p>}
              </form>
            </motion.div>
          )}
        </motion.div>

        {isUnlocked && activeEvent && selectedEvent !== null && (
          <>
            <button
              type="button"
              aria-label="Close checkpoint details"
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 z-[60] cursor-default bg-black/45 backdrop-blur-[2px]"
            />
            <motion.article
              key={activeEvent.number}
              initial={{ opacity: 0, scale: 0.92, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{ top: popupPosition.top, left: popupPosition.left, width: "min(360px, calc(100vw - 24px))" }}
              className="fixed z-[70] overflow-hidden rounded-2xl border border-[var(--accent)]/60 bg-[var(--bg-secondary)] p-6 shadow-2xl shadow-[var(--accent)]/20"
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkpoint-title"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    <CalendarDays size={15} /> Checkpoint {activeEvent.number}
                  </div>
                  <h3 id="checkpoint-title" className="mt-3 text-2xl font-bold text-[var(--text-primary)]">{activeEvent.title}</h3>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{activeEvent.date}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close checkpoint"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-full p-1.5 text-[var(--text-secondary)] transition hover:bg-[var(--accent)]/15 hover:text-[var(--accent)]"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="my-5 h-px bg-[var(--border)]" />
              <p className="text-sm leading-7 text-[var(--text-secondary)]">{activeEvent.detail}</p>
              <div className="mt-5 flex items-center gap-2 text-[var(--accent)]">
                <Heart size={16} fill="currentColor" />
                <span className="text-xs uppercase tracking-[0.16em]">{selectedEvent < timelineEvents.length - 1 ? "Continue through the story" : "A chapter remembered"}</span>
                <ArrowRight size={14} />
              </div>
            </motion.article>
          </>
        )}
      </div>
    </section>
  );
}

export default RelationshipTimeline;
