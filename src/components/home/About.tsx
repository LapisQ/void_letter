import { motion } from "framer-motion";

function About() {
  return (
    <section className="bg-[var(--bg-primary)] py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-[var(--text-primary)]"
        >
          WHO AM I
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-10 max-w-3xl text-xl leading-10 text-[var(--text-secondary)]"
        >
          The one who had everything yet lost in life, Tried everything when nothing was right.
          I used to love her the most but she was a stranger in the disguise.

        </motion.p>

         <section className="space-y-8">

          <div
            className="
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
            "
          >
            <p className="text-center text-[var(--text-secondary)]">
              
            </p>
          </div>

        </section>

      </div>
    </section>
  );
}

export default About;