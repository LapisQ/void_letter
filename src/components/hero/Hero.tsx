import { motion } from "framer-motion";
import { CakeSlice, Gift, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Background from "./Background";
import ScrollIndicator from "../home/ScrollIndicator";

function Hero() {
  const [wishMade, setWishMade] = useState(false);
  const [mood, setMood] = useState("joy");
  const [surprise, setSurprise] = useState(false);
  const [hearts, setHearts] = useState(0);

  const moodMessages = {
    joy: "Today looks good on you.",
    dreamy: "May your softest dreams find their way to you.",
    sparkle: "You deserve a year that feels a little magical.",
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0">
        <Background />
      </div>

      {/* Hero Content */}

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.3,
        }}
        className="relative z-10 px-5 text-center"
      >
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.45em] text-[var(--accent)] sm:text-xl sm:tracking-[0.8em]">
          A LITTLE BIRTHDAY WORLD
        </h2>

        <h1 className="text-5xl font-bold tracking-[0.08em] text-[var(--text-primary)] sm:text-7xl sm:tracking-[0.15em] md:text-9xl md:tracking-[0.2em]">
          HAPPY BIRTHDAY
        </h1>

        <div className="mx-auto mt-5 inline-flex items-center rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/15 px-5 py-2 text-sm font-semibold tracking-[0.18em] text-[var(--accent)] shadow-lg shadow-[var(--accent)]/10 sm:mt-6 sm:text-base">
          21 SEP 20XX
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:mt-10 sm:text-xl sm:leading-9">
          A small corner of the internet made for your smile, your stories, and all the lovely things that make you, you.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-14 sm:flex-row">
          <Link
            to="/treasure"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-[var(--bg-primary)] transition duration-300 hover:scale-105 hover:opacity-90"
          >
            <Gift size={17} />
            Open your birthday treasure
          </Link>
          <button
            type="button"
            onClick={() => setWishMade((made) => !made)}
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm transition duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] ${
              wishMade
                ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
            }`}
          >
            <CakeSlice size={17} className="text-[var(--accent)]" />
            {wishMade ? "Wish sent into the universe" : "Make a birthday wish"}
          </button>
        </div>

        {wishMade && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mx-auto mt-8 max-w-lg rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] px-6 py-4 text-sm leading-7 text-[var(--text-secondary)] shadow-xl shadow-[var(--accent)]/10"
          >
            May this year bring you the kind of happiness that feels peaceful, surprising, and completely yours.
          </motion.div>
        )}

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface)]/75 p-3 shadow-lg shadow-[var(--accent)]/10 backdrop-blur-xl sm:mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
              <Sparkles size={13} /> mood
            </span>
            {Object.keys(moodMessages).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMood(option)}
                className={`rounded-full px-3 py-1.5 text-xs capitalize transition ${mood === option ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--accent)]/10 hover:text-[var(--text-primary)]"}`}
              >
                {option}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSurprise((current) => !current)}
              className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {surprise ? "Hide secret" : "Tiny secret"}
            </button>
            <button
              type="button"
              onClick={() => setHearts((current) => current + 1)}
              aria-label="Send a heart"
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
            >
              <Heart size={14} fill={hearts > 0 ? "currentColor" : "none"} /> {hearts}
            </button>
          </div>

          {(surprise || mood !== "joy") && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 border-t border-[var(--border)] pt-2 text-xs italic text-[var(--text-secondary)]"
            >
              {surprise ? "Secret: someone is quietly very proud of the person you are becoming." : moodMessages[mood as keyof typeof moodMessages]}
            </motion.p>
          )}
        </div>

      </motion.div>
<ScrollIndicator />
    </section>
    
  );
}

export default Hero;