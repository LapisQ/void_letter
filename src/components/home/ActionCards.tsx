import {
  BookOpen,
  Globe2,
  PenSquare,
  ScrollText,
} from "lucide-react";

import ActionCard from "./ActionCard";

function ActionCards() {
  return (
    <section className="bg-black py-32 px-6">

      <div className="mx-auto max-w-7xl">

        <div
          className="
          grid
          gap-8
          md:grid-cols-2
          xl:grid-cols-4
          "
        >
          <ActionCard
            title="Make Post"
            subtitle="Write something that deserves to be remembered."
            icon={PenSquare}
            link="/make-post"
          />

          <ActionCard
            title="Read Posts"
            subtitle="Discover anonymous letters from people around the world."
            icon={BookOpen}
            link="/read-post"
          />

          <ActionCard
            title="Write Your Question"
            subtitle="Share your thoughts anonymously."
            icon={ScrollText}
            link="/write-question"
          />

          <ActionCard
            title="Read World"
            subtitle="Explore writings from every country."
            icon={Globe2}
            link="/read-world"
          />
        </div>

      </div>

    </section>
  );
}

export default ActionCards;