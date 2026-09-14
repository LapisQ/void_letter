import { useEffect, useState } from "react";

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
  const [visibleChapters, setVisibleChapters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-chapter-id");
            if (id) {
              setVisibleChapters((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    chapters.forEach((chapter) => {
      const element = document.querySelector(`[data-chapter-id="${chapter.id}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-20">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-[-12%] top-0 h-80 w-80 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[var(--accent)]/12 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-32 h-52 w-52 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />

        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="mb-12 rounded-[3rem] border border-[var(--border)] bg-[var(--surface)]/90 p-10 shadow-2xl shadow-[var(--accent)]/20 backdrop-blur-xl">
            <div className="flex flex-col gap-4 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">RedaWorld</p>
              <h1 className="font-serif text-5xl font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)] sm:text-6xl">
                A Soft, Romantic World
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                A book-inspired reading experience with large chapter titles, page-like spacing, and gentle story flow.
              </p>
            </div>
          </div>

          <div className="rounded-[3rem] border border-[var(--border)] bg-[var(--surface)]/95 p-10 shadow-2xl shadow-[var(--accent)]/15 backdrop-blur-xl">
            {chapters.map((chapter, index) => (
              <section
                key={chapter.id}
                data-chapter-id={chapter.id}
                className={`mx-auto max-w-4xl mb-16 transition-all duration-700 ease-out ${
                  visibleChapters[chapter.id]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="mb-10 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent)]">Chapter {index + 1}</p>
                  <h2 className="mt-6 font-serif text-7xl font-bold leading-[0.92] tracking-[-0.04em] text-[var(--text-primary)] sm:text-8xl">
                    {chapter.title}
                  </h2>
                  <p className="mx-auto mt-6 max-w-3xl text-lg italic text-[var(--text-secondary)]">
                    {chapter.subtitle}
                  </p>
                </div>

                <div className="space-y-8 text-lg leading-9 text-[var(--text-secondary)]">
                  {chapter.content.map((paragraph, idx) => (
                    <p key={idx} className="text-lg first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[var(--accent)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="mx-auto max-w-4xl rounded-[2rem] border border-[var(--border)] bg-[var(--accent)]/10 p-6 text-[var(--text-secondary)]">
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent)]">End of Pages</p>
              <p className="mt-3 text-base leading-7">The chapter ends softly, leaving space for the next sentiment to bloom.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ReadYS;
