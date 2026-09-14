function Untold() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] px-6 pb-20 pt-32 text-[var(--text-primary)] lg:px-10">
      <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Words waiting for a voice</p>
          <h1 className="mt-6 font-serif text-6xl font-bold leading-tight tracking-[-0.04em] sm:text-8xl">
            Untold
          </h1>
        </div>

        <div className="border-l border-[var(--accent)]/50 pl-6 sm:pl-10">
          <p className="max-w-2xl text-2xl leading-relaxed text-[var(--text-primary)] sm:text-4xl">
            There is a kind of freedom in giving the unspoken somewhere to land.
          </p>
          <p className="mt-8 max-w-xl leading-8 text-[var(--text-secondary)]">
            This is a quiet place for thoughts that never found the right moment, stories that stayed folded away, and feelings that deserve to be named.
          </p>
          <div className="mt-12 flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
            <span className="h-px w-12 bg-[var(--accent)]" />
            Begin with one honest line
          </div>
        </div>
      </section>
    </main>
  );
}

export default Untold;