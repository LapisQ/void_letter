import {
  CakeSlice,
  Gift,
  Heart,
  Sparkles,
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
            title="Birthday Letter"
            subtitle="Write a wish that deserves to be remembered."
            icon={CakeSlice}
            link="/make-post"
          />

          <ActionCard
            title="Birthday Wishes"
            subtitle="Read the kind words waiting to be found."
            icon={Heart}
            link="/read-post"
          />

          <ActionCard
            title="Your Treasure"
            subtitle="Open the private memories saved just for you."
            icon={Gift}
            link="/treasure"
          />

          <ActionCard
            title="A Year of Magic"
            subtitle="Step into stories, dreams, and new beginnings."
            icon={Sparkles}
            link="/read-world"
          />
        </div>

      </div>

    </section>
  );
}

export default ActionCards;