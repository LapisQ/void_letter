interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
}

const chapters: Chapter[] = [
  {
    id: "chapter-1",
    title: "First Light",
    subtitle: "When your smile became my sunrise",
    content: [
      "I still remember the first time I saw you. The world slowed, and everything suddenly felt soft and glowing. It was like the universe had been holding its breath, just waiting for you.",
      "Your laughter filled the air around me. It was gentle, warm, and somehow made the ordinary feel magical.",
      "Every small moment with you felt like a secret story written just for us."
    ]
  },
  {
    id: "chapter-2",
    title: "Moonlit Whispers",
    subtitle: "The nights we shared our dreams",
    content: [
      "Late nights became our canvas. We spoke in whispers, in moonlight, in quiet promises that felt weightless and always real.",
      "Your hand in mine was a wordless poem I never wanted to finish. It made every heartbeat feel like an invitation.",
      "I loved how your eyes reflected the stars, turning our moments into stories I wanted to hold forever."
    ]
  },
  {
    id: "chapter-3",
    title: "Petal Promises",
    subtitle: "A world built from soft words",
    content: [
      "I want to paint your world with petals and gentle notes. Each chapter of us is full of tenderness, laughter, and a sweet kind of forever.",
      "You are the melody that makes my heart dance, the calm in every storm, and the reason I believe in love that feels like home.",
      "This story is ours, written in the softest light, wrapped in every little thing I adore about you."
    ]
  }
];

function ReadYS() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-20">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-[-12%] top-0 h-80 w-80 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[var(--accent)]/12 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-32 h-52 w-52 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-12 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/90 p-8 shadow-2xl shadow-[var(--accent)]/20 backdrop-blur-xl sm:p-12">
            <div className="flex flex-col gap-4 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">RedaWorld / Short Stories</p>
              <h1 className="font-serif text-5xl font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)] sm:text-6xl">
                Stories to keep close
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                Small worlds, gathered in one place. Open a story whenever you need a little softness.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {chapters.map((chapter, index) => (
              <article
                key={chapter.id}
                className="group flex h-full flex-col rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-7 shadow-xl shadow-[var(--accent)]/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-2xl hover:shadow-[var(--accent)]/10 sm:p-9"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Story {String(index + 1).padStart(2, "0")}</p>
                  <span className="text-2xl text-[var(--accent)]/70 transition group-hover:text-[var(--accent)]">↗</span>
                </div>
                <div className="mt-10">
                  <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)]">
                    {chapter.title}
                  </h2>
                  <p className="mt-4 text-lg italic leading-8 text-[var(--text-secondary)]">
                    {chapter.subtitle}
                  </p>
                </div>

                <p className="mt-8 flex-1 border-t border-[var(--border)] pt-7 text-base leading-8 text-[var(--text-secondary)]">
                  {chapter.content[0]}
                </p>

                <details className="mt-7 border-t border-[var(--border)] pt-5">
                  <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Read story <span className="ml-2 transition group-open:rotate-90">→</span>
                  </summary>
                  <div className="mt-6 space-y-5 text-base leading-8 text-[var(--text-secondary)]">
                    {chapter.content.slice(1).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ReadYS;
