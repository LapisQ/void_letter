function ReadPosts() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6">

        {/* Header */}
        <section className="mb-14 text-center">

          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-[var(--accent)]">
            VOID LETTERS
          </p>

          <h1 className="text-5xl font-bold text-[var(--text-primary)]">
            Read Letters
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Every letter here was written by someone,
            somewhere, carrying words they wanted the
            world to hear.
          </p>

        </section>

        {/* Posts Container */}

        <section className="space-y-8">

          <div
            className="
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-8
            "
          >
            <p className="text-center text-[var(--text-secondary)]">
              Posts will appear here...
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}

export default ReadPosts;