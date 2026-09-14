function About() {
  return (
    <section className="bg-[var(--bg-primary)] py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2
          className="text-5xl font-bold text-[var(--text-primary)]"
        >
          FOR THE BIRTHDAY GIRL
        </h2>

        <p
          className="mx-auto mt-10 max-w-3xl text-xl leading-10 text-[var(--text-secondary)]"
        >
          Today is not for ordinary words. It is for celebrating the person who makes ordinary days brighter, conversations warmer, and memories worth keeping.
          May this next year bring you gentle mornings, unexpected joy, and every beautiful thing you have been quietly hoping for.

        </p>

        <div className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-3 text-sm uppercase tracking-[0.25em] text-[var(--accent)]">
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span>your day, your year, your story</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

      </div>
    </section>
  );
}

export default About;