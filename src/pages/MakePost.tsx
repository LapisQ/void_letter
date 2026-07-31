import { useState } from "react";
import { createPost } from "../services/api";

function MakePost() {

    const [formData, setFormData] = useState({
      from: "",
      to: "",
      content: ""
});

const [loading, setLoading] = useState(false);

async function handleSubmit() {
  try {
    setLoading(true);

    const response = await createPost(
    formData.from,
    formData.to,
    formData.content
);

    alert(response.message);

    console.log(response);

  } catch (error: any) {
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

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <section className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[var(--accent)]">
            VOID LETTERS
          </p>

          <h1 className="text-5xl font-bold text-[var(--text-primary)]">
            Greet Your Partner
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Some words are never spoken.
            Some are written here.
          </p>
        </section>

        {/* Writing Paper */}
        <section
          className="
            rounded-3xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-10
            shadow-xl
            backdrop-blur-xl
          "
        >
          <div className="space-y-6">

  <div>
    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
      Who's Writing 
    </label>

    <input
      type="text"
      value={formData.from}
      onChange={(e) =>
        setFormData({
          ...formData,
          from: e.target.value,
        })
      }
      className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
      placeholder="Your Name - Can be anonymous"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
      Dedicated To
    </label>

    <input
      type="text"
      value={formData.to}
      onChange={(e) =>
        setFormData({
          ...formData,
          to: e.target.value,
        })
      }
      className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
      placeholder="Who are you writing to?"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
      I want to say
    </label>

    <input
      type="text"
      value={formData.content}
      onChange={(e) =>
        setFormData({
          ...formData,
          content: e.target.value,
        })
      }
      className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
      placeholder="Your Message"
    />
  </div>

  <button
    onClick={handleSubmit}
    disabled={loading}
    className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
  >
    {loading ? "Publishing..." : "Publish Letter"}
  </button>

</div>
        </section>

      </div>
    </main>
  );
}

export default MakePost;