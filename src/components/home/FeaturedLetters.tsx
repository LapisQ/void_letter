import { motion } from "framer-motion";

const letters = [
  {
    title: "The Last Letter",
    author: "Anonymous",
    mood: "Heartbreak",
    preview:
      "Some people leave without saying goodbye. Others stay forever inside unfinished sentences...",
  },
  {
    title: "Midnight Thoughts",
    author: "Prince",
    mood: "Philosophy",
    preview:
      "Silence has a strange habit of becoming louder than words whenever we try to sleep...",
  },
  {
    title: "If You Ever Read This",
    author: "Anonymous",
    mood: "Love",
    preview:
      "I never expected these words to reach you. Maybe they never will, but writing them is enough...",
  },
];

function FeaturedLetters() {
  return (
    <section className="bg-[var(--bg-primary)] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center text-5xl font-bold text-[var(--text-primary)]"
        >
          Featured Letters
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-3">
          {letters.map((letter, index) => (
            <motion.article
              key={letter.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
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
              </p>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">
                  — {letter.author}
                </span>

                <button className="rounded-full border border-[var(--border)] px-4 py-2 text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                  Read More
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