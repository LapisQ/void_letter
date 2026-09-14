import { motion } from "framer-motion";
import { Check, Heart, LockKeyhole, Send, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { createPost } from "../services/api";

function MakePost() {

    const [formData, setFormData] = useState({
      from: "",
      to: "Lapis Q",
      content: ""
});

const [loading, setLoading] = useState(false);
const [published, setPublished] = useState(false);
const [mood, setMood] = useState("warm");

const moods = {
  warm: "A little warmth for your favourite person.",
  playful: "Add a little mischief to the birthday magic.",
  heartfelt: "Say the thing your heart has been holding onto.",
};

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (!formData.from.trim() || !formData.content.trim()) return;

  try {
    setLoading(true);
    setPublished(false);

    const response = await createPost(
    formData.from,
    "Lapis Q",
    formData.content
);

    if (response) setPublished(true);

  } catch (error: unknown) {
  console.error("Publish Error:", error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert(JSON.stringify(error));
  }
} finally {

    setLoading(false);

  }
}

function chooseMood(nextMood: keyof typeof moods) {
  setMood(nextMood);
  setPublished(false);
}

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] px-4 pb-20 pt-28 sm:px-6">
      <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-pink-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        <section className="mb-10 text-center sm:mb-14">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-[var(--accent)]">
            <Sparkles size={15} /> WISH ME!!
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="text-5xl font-bold tracking-tight text-[var(--text-primary)] sm:text-7xl">
            A wish, just for her.
          </motion.h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Leave a little piece of your heart here. It will find its way to Lapis Q.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl backdrop-blur-xl sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">Who's wishing?</label>
                <input
                  type="text"
                  value={formData.from}
                  onChange={(event) => { setFormData({ ...formData, from: event.target.value }); setPublished(false); }}
                  className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
                  placeholder="Your name, or stay anonymous"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">Dedicated to</label>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-[var(--text-primary)]">
                  <LockKeyhole size={17} className="text-[var(--accent)]" />
                  <input type="text" value="Lapis Q" readOnly aria-readonly="true" className="w-full bg-transparent outline-none" />
                </div>
                <p className="mt-2 text-xs text-[var(--text-secondary)]">This wish is reserved for Lapis Q.</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="wish-content" className="text-sm font-medium text-[var(--text-primary)]">Your wish</label>
                  <span className="text-xs text-[var(--text-secondary)]">{formData.content.length}/500</span>
                </div>
                <textarea
                  id="wish-content"
                  value={formData.content}
                  maxLength={500}
                  onChange={(event) => { setFormData({ ...formData, content: event.target.value }); setPublished(false); }}
                  className="min-h-36 w-full resize-y rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 leading-7 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
                  placeholder="Write the words you want her to keep..."
                  required
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {(Object.keys(moods) as Array<keyof typeof moods>).map((option) => (
                  <button key={option} type="button" onClick={() => chooseMood(option)} className={`rounded-full border px-3 py-1.5 text-xs capitalize transition ${mood === option ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]" : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]"}`}>
                    {option}
                  </button>
                ))}
              </div>

              <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90 disabled:cursor-wait disabled:opacity-50">
                {loading ? "Sending your wish..." : <><Send size={17} /> Send the wish</>}
              </button>
              {published && <p className="inline-flex items-center gap-2 pl-3 text-sm text-[var(--accent)]"><Check size={17} /> Your wish is on its way.</p>}
            </form>
          </motion.section>

          <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="sticky top-24 rounded-3xl border border-[var(--accent)]/25 bg-[var(--surface)] p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="mb-8 flex items-center justify-between text-[var(--accent)]">
              <Heart size={22} fill="currentColor" />
              <span className="text-xs uppercase tracking-[0.25em]">live preview</span>
            </div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)]">For Lapis Q</p>
            <p className="mt-6 min-h-36 whitespace-pre-wrap break-words font-serif text-2xl leading-relaxed text-[var(--text-primary)]">
              {formData.content || "Your beautiful words will appear here..."}
            </p>
            <div className="mt-8 border-t border-[var(--border)] pt-5">
              <p className="text-sm italic text-[var(--text-secondary)]">{moods[mood as keyof typeof moods]}</p>
              <p className="mt-5 text-right text-sm text-[var(--accent)]">With love, {formData.from || "someone special"}</p>
            </div>
          </motion.aside>
        </div>

      </div>
    </main>
  );
}

export default MakePost;