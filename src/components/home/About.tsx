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
          What is Void Letters?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-10 max-w-3xl text-xl leading-10 text-[var(--text-secondary)]"
        >
          Void Letters is a place where thoughts survive.
          Write a confession, share a memory, ask a question,
          or leave behind words that deserve to outlive the moment.
        </motion.p>

      </div>
    </section>
  );
}

export default About;