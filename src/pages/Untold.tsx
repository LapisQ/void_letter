import { motion } from "framer-motion";
import { LockKeyhole, Sparkles } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { verifyPrivatePassword } from "../services/privateAccess";

const answers = [
  "Not in a million year.",
  "No",
  "Yes",
  "Ofcource Dear - I Do a lot.",
];

const catDialogues = [
  "What the Hell, Seriously!!",
  "How could you say that !",
  "That's true but is it all?",
  "That's my master's girl for you!",
];

const passwordDialogues = [
  "Go Ahead enter the code.",
  "I don't have the whole day.",
  "I have a job to do myself.",
  "If you keep me waiting here that means you are not lapis.",
  "Master is waiting since he was born.",
  "O God, Those slow humans.",
];

type MascotMood = "thinking" | "delighted" | "furious" | "very-angry" | "angry" | "little-happy" | "very-happy";

function CatMascot({ mood, hoverMood, dialogue, className = "", roaming = false, screenRoaming = false }: { mood: MascotMood; hoverMood: MascotMood | null; dialogue: string | null; className?: string; roaming?: boolean; screenRoaming?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const expression = hoverMood ?? (isHovered ? "very-happy" : mood);
  const isAngry = expression === "furious" || expression === "very-angry" || expression === "angry";
  const isHappy = expression === "delighted" || expression === "little-happy" || expression === "very-happy";

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={screenRoaming ? { x: [0, "28vw", "28vw", "62vw", "62vw", "34vw", "34vw", 0], y: [0, "16vh", "16vh", "42vh", "42vh", "62vh", "62vh", 0], rotate: [-3, 3, 3, -2, -2, 2, 2, 0] } : roaming ? { x: [-24, 20, -14, 24, 0], y: [0, -12, 6, -8, 0], rotate: [-3, 2, -2, 3, 0] } : isAngry ? { x: expression === "very-angry" ? [-7, 7, -7, 7, 0] : [-4, 4, -4, 0] } : expression === "thinking" ? { rotate: [-3, 3, -3] } : { y: [0, -5, 0] }}
      transition={{ duration: screenRoaming ? 30 : roaming ? 8 : expression === "very-angry" ? 0.35 : 1.2, repeat: isAngry && !roaming && !screenRoaming ? 0 : Infinity, repeatDelay: 1.5 }}
      className={`group relative flex h-32 w-32 shrink-0 cursor-pointer items-end justify-center rounded-[2rem] border-2 border-[var(--accent)]/60 bg-[var(--bg-secondary)] pb-3 shadow-lg shadow-[var(--accent)]/15 ${className}`}
      aria-label="Interactive animated cat guardian"
    >
      {dialogue && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-20 left-1/2 z-20 w-72 -translate-x-1/2 rounded-2xl border border-[var(--accent)]/40 bg-[var(--surface)] px-5 py-4 text-center text-base font-semibold leading-6 text-[var(--text-primary)] shadow-lg shadow-[var(--accent)]/10 sm:w-80 sm:text-lg sm:leading-7">
          {dialogue}
          <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-[var(--accent)]/40 bg-[var(--surface)]" />
        </motion.div>
      )}
      <motion.span
        animate={{ rotate: isAngry ? (expression === "very-angry" ? [-25, 25, -25] : [-18, 18, -18]) : [12, 28, 12] }}
        transition={{ duration: isAngry ? 0.25 : 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-5 bottom-8 h-16 w-7 origin-bottom rounded-r-full border-r-4 border-t-4 border-[var(--accent)]"
      />
      <span className="absolute left-5 top-3 h-9 w-9 rotate-[-25deg] rounded-tl-xl border-l-4 border-t-4 border-[var(--accent)] bg-pink-300/70" />
      <span className="absolute right-5 top-3 h-9 w-9 rotate-[25deg] rounded-tr-xl border-r-4 border-t-4 border-[var(--accent)] bg-pink-300/70" />
      <span className="relative z-10 h-24 w-24 rounded-[45%] border-2 border-[var(--accent)] bg-gradient-to-b from-amber-200 to-amber-400 shadow-inner shadow-white/50 transition duration-300 group-hover:from-yellow-100 group-hover:to-orange-300">
        <span className={`absolute left-5 top-9 h-3 w-2 rounded-full bg-slate-900 transition-transform ${isAngry ? "rotate-[55deg]" : expression === "very-happy" ? "scale-y-50" : ""}`} />
        <span className={`absolute right-5 top-9 h-3 w-2 rounded-full bg-slate-900 transition-transform ${isAngry ? "rotate-[-55deg]" : expression === "very-happy" ? "scale-y-50" : ""}`} />
        <span className="absolute left-1/2 top-[3.1rem] h-2.5 w-3 -translate-x-1/2 rounded-full bg-pink-400" />
        <span className={`absolute left-1/2 top-[3.75rem] h-2 w-7 -translate-x-1/2 border-b-2 border-slate-800 ${isHappy ? "rounded-b-full" : "rounded-full"}`} />
        <span className="absolute left-1/2 top-[3.25rem] h-2 w-2 -translate-x-1/2 rounded-full bg-slate-800" />
        <span className="absolute left-[-0.8rem] top-[3.65rem] h-px w-7 -rotate-6 bg-slate-700/70" />
        <span className="absolute left-[-0.8rem] top-[4.2rem] h-px w-7 rotate-6 bg-slate-700/70" />
        <span className="absolute right-[-0.8rem] top-[3.65rem] h-px w-7 rotate-6 bg-slate-700/70" />
        <span className="absolute right-[-0.8rem] top-[4.2rem] h-px w-7 -rotate-6 bg-slate-700/70" />
        <span className="absolute bottom-[-0.55rem] left-1/2 h-5 w-10 -translate-x-1/2 rounded-full border-2 border-[var(--accent)] bg-amber-300" />
      </span>
      <span className="absolute -right-3 -top-3 rounded-full bg-[var(--accent)] px-2 py-1 text-xs font-bold text-black shadow-md">CAT</span>
    </motion.div>
  );
}

function Untold() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordDialogueIndex, setPasswordDialogueIndex] = useState(0);
  const [passwordError, setPasswordError] = useState(false);
  const [mascotMood, setMascotMood] = useState<MascotMood>("thinking");
  const [hoverMood, setHoverMood] = useState<MascotMood | null>(null);
  const [hoverDialogue, setHoverDialogue] = useState<string | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      return;
    }

    const dialogueTimer = window.setInterval(() => {
      setPasswordDialogueIndex((currentIndex) => (currentIndex + 1) % passwordDialogues.length);
    }, 3000);

    return () => window.clearInterval(dialogueTimer);
  }, [isUnlocked]);

  useEffect(() => {
    if (!isEntering) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      setIsAccepted(true);
    }, 4000);

    return () => window.clearTimeout(redirectTimer);
  }, [isEntering]);

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (await verifyPrivatePassword(password)) {
      setIsUnlocked(true);
      setPasswordError(false);
      return;
    }

    setPasswordError(true);
  }

  function handleAnswer(answer: string) {
    if (answer === answers[3]) {
      setMascotMood("delighted");
      setHoverMood(null);
      setHoverDialogue(null);
      setIsEntering(true);
      return;
    }

    setMascotMood("furious");
    setWrongAnswer(true);
  }

  if (!isUnlocked) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-6 pb-10 pt-24 text-[var(--text-primary)]">
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-pink-400/10 blur-3xl" />
        <CatMascot mood="thinking" hoverMood={null} dialogue={passwordDialogues[passwordDialogueIndex]} screenRoaming className="pointer-events-auto absolute left-6 top-28 z-10 scale-75 sm:left-10 sm:scale-90" />
        <div className="relative z-20 mx-auto w-full max-w-md">
          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-2xl shadow-[var(--accent)]/15 backdrop-blur-xl sm:p-10">
          <LockKeyhole className="mx-auto text-[var(--accent)]" size={30} />
          <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">Untold / private room</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">A secret is waiting</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">Enter the password to meet the guardian of this page.</p>
          <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="sr-only">Password</span>
              <input type="password" value={password} onChange={(event) => { setPassword(event.target.value); setPasswordError(false); }} placeholder="Enter password" autoComplete="current-password" autoFocus className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-center text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)]" />
            </label>
            <button type="submit" className="w-full rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-primary)] transition hover:scale-[1.02] hover:opacity-90">Unlock Untold</button>
            {passwordError && <p className="text-xs text-rose-300">That key does not open this room.</p>}
          </form>
          </motion.section>
        </div>
      </main>
    );
  }

  if (!isAccepted) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-6 pb-20 pt-28 text-[var(--text-primary)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(212,175,55,0.12),transparent_42%)]" />
        <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-3xl rounded-[2rem] border border-[var(--accent)]/30 bg-[var(--surface)] p-6 text-center shadow-2xl shadow-[var(--accent)]/10 backdrop-blur-xl sm:p-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:text-left">
            <CatMascot mood={mascotMood} hoverMood={hoverMood} dialogue={hoverDialogue} />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Guardian checkpoint</p>
              <h1 className="mt-4 text-3xl font-bold sm:text-5xl">One question before you enter</h1>
              <p className="mt-5 text-xl leading-9 text-[var(--text-primary)]">Do you Love Afdob <span className="text-[var(--accent)]">______</span> ?</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {answers.map((answer, index) => (
                  <motion.button key={answer} type="button" disabled={isEntering} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} onMouseEnter={() => { setHoverMood(["very-angry", "angry", "little-happy", "very-happy"][index] as MascotMood); setHoverDialogue(catDialogues[index]); }} onMouseLeave={() => { setHoverMood(null); setHoverDialogue(null); }} onFocus={() => { setHoverMood(["very-angry", "angry", "little-happy", "very-happy"][index] as MascotMood); setHoverDialogue(catDialogues[index]); }} onBlur={() => { setHoverMood(null); setHoverDialogue(null); }} onClick={() => handleAnswer(answer)} className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-left text-sm text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)] disabled:cursor-wait disabled:opacity-60">
                    <span className="mr-2 text-[var(--accent)]">{index + 1}.</span>{answer}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {wrongAnswer && (
            <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative mx-auto mt-8 max-w-lg rounded-2xl border border-rose-300/40 bg-rose-300/10 px-5 py-4 text-sm font-semibold text-rose-100 shadow-lg">
              <span className="absolute -top-2 left-12 h-4 w-4 rotate-45 border-l border-t border-rose-300/40 bg-[#391d28]" />
              I won't allow you to move further!!
            </motion.div>
          )}

          <p className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]"><Sparkles size={14} className="text-[var(--accent)]" /> Choose wisely, the guardian is watching</p>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] px-6 pb-20 pt-32 text-[var(--text-primary)] lg:px-10">
      <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Words waiting for a voice</p>
          <h1 className="mt-6 font-serif text-6xl font-bold leading-tight tracking-[-0.04em] sm:text-8xl">Untold</h1>
        </div>
        <div className="border-l border-[var(--accent)]/50 pl-6 sm:pl-10">
          <p className="max-w-2xl text-2xl leading-relaxed text-[var(--text-primary)] sm:text-4xl">There is a kind of freedom in giving the unspoken somewhere to land.</p>
          <p className="mt-8 max-w-xl leading-8 text-[var(--text-secondary)]">This is a quiet place for thoughts that never found the right moment, stories that stayed folded away, and feelings that deserve to be named.</p>
          <div className="mt-12 flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-[var(--accent)]"><span className="h-px w-12 bg-[var(--accent)]" />Begin with one honest line</div>
        </div>
      </section>
    </main>
  );
}

export default Untold;