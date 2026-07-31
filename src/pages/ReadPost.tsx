import { useEffect, useState } from "react";

interface Post {
  pid: string | number;
  timestamp: string;
  writer: string;
  dedicatedTo: string;
  message: string;
}

function ReadPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const API_URL =
    "https://script.google.com/macros/s/AKfycbw6LD6FaLvUAdpsCd7jbsKPNRAiyR-H2vzs9dAqpey3JA_hga-zB9Iz1_1hhUgTvWL1KQ/exec";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        return response.json();
      })
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);
  const formatDate = (date: string) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <section className="mb-14 text-center">
          <p
            className="
              mb-3
              text-sm
              uppercase
              tracking-[0.4em]
              text-[var(--accent)]
            "
          >
            VOID LETTERS

          </p>
          <h1
            className="
              text-5xl
              font-bold
              text-[var(--text-primary)]
            "
          >
            Thoughtful Greeting's
          </h1>
          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-[var(--text-secondary)]
            "
          >

            Every letter here was written by someone,
            somewhere, carrying words they wanted the
            world to hear.

          </p>
        </section>
        {/* Posts */}
        <section className="space-y-8">

          {/* Loading */}

          {
            loading && (

              <div
                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-8
                  text-center
                "
              >
                <p className="text-[var(--text-secondary)]">

                  Opening the Greetings...

                </p>
              </div>
            )
          }

          {/* Error */}
          {
            error && (

              <div
                className="
                  rounded-3xl
                  border
                  border-red-400/30
                  bg-[var(--surface)]
                  p-8
                  text-center
                "
              >

                <p className="text-red-400">

                  Unable to load letters.

                </p>


              </div>

            )
          }
          {/* Empty */}
          {
            !loading &&
            !error &&
            posts.length === 0 && (

              <div
                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-8
                  text-center
                "
              >

                <p className="text-[var(--text-secondary)]">

                  No letters written yet...

                </p>


              </div>

            )
          }
          {/* Letter Cards */}
          {
            posts.map((post) => (
              <article
                key={post.pid}

                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-8
                  transition
                  duration-300
                  hover:-translate-y-1
                "
              >
                {/* Quote */}
                <div className="relative">
                  <span
                    className="
                      absolute
                      -left-3
                      -top-5
                      text-5xl
                      text-[var(--accent)]
                      opacity-40
                    "
                  >

                    "
                  </span>
                  <p
                    className="
                      text-xl
                      leading-9
                      italic
                      text-[var(--text-primary)]
                    "
                  >

                    {post.message}

                  </p>
                </div>

                {/* Divider */}
                <div
                  className="
                    my-7
                    h-px
                    bg-[var(--border)]
                  "
                />
                {/* Details */}
                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:justify-between
                    sm:items-center
                    text-sm
                    text-[var(--text-secondary)]
                  "
                >

                  <div>
                    <p>
                      Words of:
                      <span
                        className="
                          ml-2
                          text-[var(--accent)]
                        "
                      >
                        {
                          post.writer ||
                          "Anonymous"
                        }

                      </span>
                    </p>

                    <p className="mt-2">
                      Dedicated to:
                      <span className="ml-2">
                        {
                          post.dedicatedTo ||
                          "The world"
                        }

                      </span>
                    </p>
                    <p className="mt-2">

                      {formatDate(post.timestamp)}

                    </p>
                  </div>
                  <div
                    className="
                      font-semibold
                      text-[var(--accent)]
                    "
                  >
                    #
                    {
                      String(post.pid)
                      .padStart(3,"0")
                    }


                  </div>
                </div>
              </article>
            ))
          }
        </section>
      </div>
    </main>

  );

}

export default ReadPosts;