import { motion } from "framer-motion";
import Background from "./Background";
import ScrollIndicator from "../home/ScrollIndicator";

function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">

      {/* Background Glow */}

   <Background />

      {/* Hero Content */}

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.3,
        }}
        className="relative z-10 text-center"
      >

        <h2 className="mb-6 text-xl tracking-[0.8em] text-[var(--accent)]">
          WHERE LOVE BECOMES
        </h2>

        <h1 className="text-7xl font-bold tracking-[0.35em] text-[var(--text-primary)] md:text-8xl">
          VOID LETTERS
        </h1>

        <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-[var(--text-secondary)]">

          Some stories end.

          Others become literature.

          Leave your words,

          read forgotten confessions,

          and discover letters from every corner of the world.

        </p>

        <button className="mt-14 rounded-full border border-yellow-400 px-10 py-4 text-lg bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border)] transition duration-300 hover:bg-yellow-300 hover:text-black">

          Begin Reading

        </button>

      </motion.div>
<ScrollIndicator />
    </section>
    
  );
}

export default Hero;