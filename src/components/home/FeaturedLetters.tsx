import { motion } from "framer-motion";
import { useState } from "react";

const letters = [
  {
    title: "A Simple Birthday Wish",
    author: "Aditya",
    mood: "Birthday wish",
    preview:
      "Happy birthday! I hope your day is full of good food, happy moments, and plenty of reasons to smile. Have a wonderful year ahead!",
  },
  {
    title: "Have A Lovely Day",
    author: "Humanshu",
    mood: "Warm wishes",
    preview:
      "Wishing you a very happy birthday! Enjoy your special day, keep smiling, and may all your plans work out beautifully.",
  },
  {
    title: "Many Happy Returns",
    author: "Narayan",
    mood: "Good wishes",
    preview:
      "Happy birthday! May this year bring you good health, new opportunities, and lots of happy memories with the people you love.",
  },
  {
    title: "Celebrate Your Day",
    author: "Aman",
    mood: "Celebration",
    preview:
      "Many many happy returns of the day! Have fun, celebrate properly, and enjoy every moment of your birthday.",
  },
  {
    title: "A Quiet Promise For You",
    author: "Afdob",
    mood: "With care",
    preview:
      "A birthday is not merely the turning of a number; it is a quiet proof of every day you have lived, survived, and made beautiful. I hope this year is gentle with your heart and generous with your dreams. Please remember that you never have to carry everything alone. I may not always know the perfect words, but I will always care about your peace, your smile, and the person you are becoming. May life give you reasons to look forward, while my words remain somewhere behind you, quietly wishing you well...",
    expandedNote:
      "O heaven, O Earth, bear witness to this sound,\nAnd crown what I profess with kind event\nIf I speak true; if hollowly, invert\nWhat best is boded me to mischief. I,\nBeyond all limit of what else i’ th’ world,\nDo love, prize, honor you.",
  },
];

function FeaturedLetters() {
  const [openLetter, setOpenLetter] = useState<string | null>(null);

  return (
    <section className="bg-[var(--bg-primary)] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <h2
          className="mb-14 text-center text-5xl font-bold text-[var(--text-primary)]"
        >
          Birthday Notes
        </h2>

        <div className="grid gap-8 lg:grid-cols-3">
          {letters.map((letter) => (
            <motion.article
              key={letter.title}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 backdrop-blur-xl"
            >
              <span className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                {letter.mood}
              </span>

              <h3 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">
                {letter.title}
              </h3>

              <p className="mt-4 leading-8 text-[var(--text-secondary)]">
                {letter.preview}
                {openLetter === letter.title && (
                  <span className="mt-3 block whitespace-pre-line border-l-2 border-[var(--accent)] pl-4 text-[var(--text-primary)]">
                    {letter.expandedNote ?? "Keep this note close today. It was written to make your birthday feel a little more personal."}
                  </span>
                )}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">
                  — {letter.author}
                </span>

                <button
                  type="button"
                  onClick={() => setOpenLetter((current) => current === letter.title ? null : letter.title)}
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {openLetter === letter.title ? "Close Note" : "Read More"}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedLetters;