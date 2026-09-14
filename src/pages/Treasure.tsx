import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: number;
  date: string;
  time: string;
  author: string;
  text: string;
  mediaName?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "audio" | "file";
}

interface MessageGroup {
  date: string;
  messages: ChatMessage[];
}

const messagePattern = /^(?:\[)?(\d{1,4}[/.-]\d{1,2}[/.-]\d{1,4}),\s+(\d{1,2}:\d{2}(?::\d{2})?\s*(?:[ap]m\.?)?)\]?\s*(?:-\s+)?([^:]+):\s?(.*)$/i;
const mediaPattern = /<attached:\s*(.+?)>|(.+?)\s+\(file attached\)/i;
const treasurePassword = "Lapis@Queen";
const bundledChatNames = [
  "chat.txt",
  "_chat.txt",
  "WhatsApp Chat with Lapis Q.txt",
];

function getMediaType(name: string): ChatMessage["mediaType"] {
  const extension = name.split(".").pop()?.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "heic", "heif"].includes(extension ?? "")) return "image";
  if (["mp4", "mov", "webm", "m4v"].includes(extension ?? "")) return "video";
  if (["mp3", "m4a", "ogg", "wav", "opus", "aac"].includes(extension ?? "")) return "audio";
  return "file";
}

function getInitials(author: string) {
  return author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getBundledMediaUrl(name: string) {
  return `/treasure/${name.split(/[\\/]/).map(encodeURIComponent).join("/")}`;
}

function renderEmojiText(text: string, keyPrefix: string): ReactNode[] {
  const emojiPattern = /(\p{Extended_Pictographic}(?:\uFE0E|\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0E|\uFE0F)?|\p{Emoji_Modifier})*)/gu;
  const emojiOnlyPattern = /^\p{Extended_Pictographic}(?:\uFE0E|\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0E|\uFE0F)?|\p{Emoji_Modifier})*$/u;

  return text.split(emojiPattern).map((part, index) => (
    emojiOnlyPattern.test(part)
      ? <span key={`${keyPrefix}-emoji-${index}`} className="inline-block align-middle text-[1.28em] leading-none">{part}</span>
      : <span key={`${keyPrefix}-text-${index}`}>{part}</span>
  ));
}

function renderMessageText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|```[^`]+```|\*[^*]+\*|_[^_]+_|~[^~]+~)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-bold text-[var(--text-primary)]">{renderEmojiText(part.slice(2, -2), `bold-${index}`)}</strong>;
    }

    if (part.startsWith("```") && part.endsWith("```")) {
      return <code key={index} className="rounded bg-[var(--bg-secondary)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--accent)]">{part.slice(3, -3)}</code>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{renderEmojiText(part.slice(1, -1), `italic-${index}`)}</em>;
    }

    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={index}>{renderEmojiText(part.slice(1, -1), `underscore-${index}`)}</em>;
    }

    if (part.startsWith("~") && part.endsWith("~")) {
      return <del key={index}>{renderEmojiText(part.slice(1, -1), `strike-${index}`)}</del>;
    }

    return renderEmojiText(part, `plain-${index}`);
  }).flat();
}

function normalizeChatText(text: string) {
  return text
    .replace(/\uFEFF/g, "")
    .replace(/\u202F/g, " ")
    .replace(/â€¯/g, " ");
}

function parseChat(text: string) {
  const messages: ChatMessage[] = [];

  for (const line of normalizeChatText(text).split(/\r\n|\n|\r/)) {
    const match = line.match(messagePattern);

    if (!match) {
      if (messages.length && line.trim()) messages[messages.length - 1].text += `\n${line}`;
      continue;
    }

    const [, date, time, author, rawText] = match;
    const mediaMatch = rawText.match(mediaPattern);
    const mediaName = (mediaMatch?.[1] ?? mediaMatch?.[2])?.trim().replace(/[.,;]$/, "");
    messages.push({
      id: messages.length,
      date,
      time,
      author: author.trim(),
      text: mediaName ? "" : rawText,
      mediaName,
    });
  }

  return messages;
}

function parseBundledChat(text: string) {
  return parseChat(text).map((message) => {
    if (!message.mediaName) return message;

    return {
      ...message,
      mediaUrl: getBundledMediaUrl(message.mediaName),
      mediaType: getMediaType(message.mediaName),
    };
  });
}

function Treasure() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [archiveName, setArchiveName] = useState("Bundled treasure folder");
  const [chatName, setChatName] = useState("Treasure Archive");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageLimit, setMessageLimit] = useState(200);
  useEffect(() => {
    if (!isUnlocked) return;

    let cancelled = false;

    async function loadBundledTreasure() {
      setIsLoading(true);
      setError("");

      try {
        const loadedChat = await Promise.any(
          bundledChatNames.map(async (name) => {
            const response = await fetch(`/treasure/${encodeURIComponent(name)}`, { cache: "force-cache" });
            if (!response.ok) throw new Error(`Could not load ${name}`);
            const text = await response.text();
            const parsedMessages = parseBundledChat(text);
            if (!parsedMessages.length) throw new Error(`${name} is not a readable chat export`);
            return { name, messages: parsedMessages };
          })
        );

        if (!cancelled) {
          setMessages(loadedChat.messages);
          setMessageLimit(200);
          setArchiveName("Bundled treasure folder");
          setChatName(loadedChat.name.replace(/\.txt$/i, ""));
        }
      } catch (loadError) {
        if (!cancelled) setError("No WhatsApp chat text file was found in public/treasure. Keep the original filename or add chat.txt there.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadBundledTreasure();
    return () => {
      cancelled = true;
    };
  }, [isUnlocked]);

  const visibleMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((message) => `${message.author} ${message.text} ${message.mediaName ?? ""}`.toLowerCase().includes(query));
  }, [messages, search]);

  const displayedMessages = useMemo(
    () => visibleMessages.slice(0, messageLimit),
    [messageLimit, visibleMessages]
  );

  const messageGroups = useMemo<MessageGroup[]>(() => {
    return displayedMessages.reduce<MessageGroup[]>((groups, message) => {
      const currentGroup = groups[groups.length - 1];
      if (currentGroup?.date === message.date) {
        currentGroup.messages.push(message);
      } else {
        groups.push({ date: message.date, messages: [message] });
      }
      return groups;
    }, []);
  }, [displayedMessages]);

  const leftParticipant = messages[0]?.author;

  function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password === treasurePassword) {
      setIsUnlocked(true);
      return;
    }

    navigate("/", { replace: true, state: { accessDenied: true } });
  }

  if (!isUnlocked) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-6 pb-10 pt-24 text-[var(--text-primary)]">
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <section className="relative w-full max-w-md rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-2xl shadow-[var(--accent)]/15 backdrop-blur-xl sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">Treasure / private archive</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Open a treasured memory</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">This private archive is protected. Enter the password to reveal its pages.</p>
          <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                autoFocus
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)]"
              />
            </label>
            <button type="submit" className="w-full rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-primary)] transition hover:opacity-90">
              Unlock Treasure
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] px-4 pb-10 pt-24 text-[var(--text-primary)] sm:px-6">
      <div className="pointer-events-none absolute left-[-8%] top-20 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-[var(--accent)]/10 backdrop-blur-xl sm:rounded-[2rem]">
        <header className="border-b border-[var(--border)] px-4 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">Treasure / private archive</p>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">A room for treasured memories</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">Open a chat export and revisit its words, images, and little moments in a calm reading space.</p>
            </div>
            <span className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-3 text-sm font-semibold text-[var(--accent)] sm:w-auto">
              {isLoading ? "Opening treasure..." : "Treasure folder loaded"}
            </span>
          </div>
          {error && <p className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        </header>

        <div className="grid min-h-[30rem] lg:grid-cols-[19rem_1fr]">
          <aside className="border-b border-[var(--border)] p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <label className="block rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
              <span className="sr-only">Search messages</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search memories" className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]" />
            </label>
            <div className="mt-5 border-b border-[var(--border)] pb-5">
              <p className="truncate text-lg font-medium">{chatName}</p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">{archiveName ? `${messages.length} memories` : "No archive loaded"}</p>
            </div>
            <div className="hidden pt-5 text-xs leading-6 text-[var(--text-secondary)] lg:block">
              <p>Everything is read locally in your browser.</p>
              <p className="mt-3">Images, videos, audio, and files appear inline when the archive references them.</p>
            </div>
          </aside>

          <div className="relative bg-[var(--bg-primary)]">
            {messages.length === 0 ? (
              <div className="flex min-h-[30rem] flex-col items-center justify-center px-5 text-center sm:min-h-[35rem] sm:px-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--accent)]/10 text-2xl text-[var(--accent)]">✦</div>
                <h2 className="mt-6 text-2xl font-semibold">Your conversation belongs here</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-[var(--text-secondary)]">Place your extracted files in the public/treasure folder and the conversation will appear here automatically.</p>
              </div>
            ) : (
              <div className="space-y-5 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.05),transparent_35%)] p-3 sm:p-8">
                <div className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs text-[var(--text-secondary)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  {displayedMessages.length} of {visibleMessages.length} matching memories
                </div>
                {messageGroups.map((group) => (
                  <div key={group.date} className="mx-auto min-w-0 max-w-3xl">
                    <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)] sm:gap-4 sm:text-xs sm:tracking-[0.25em]">
                      <span className="h-px flex-1 bg-[var(--border)]" />
                      <span>{group.date}</span>
                      <span className="h-px flex-1 bg-[var(--border)]" />
                    </div>

                    <div className="space-y-4">
                      {group.messages.map((message) => {
                        const isRightMessage = Boolean(leftParticipant && message.author !== leftParticipant);

                        return (
                          <div key={message.id} className={`flex min-w-0 ${isRightMessage ? "justify-end" : "justify-start"}`}>
                            <article className={`w-[92%] max-w-xl rounded-2xl border px-3 py-3 shadow-lg sm:w-full sm:px-6 sm:py-4 ${
                              isRightMessage
                                ? "border-[var(--accent)]/25 bg-[var(--accent)]/12 shadow-[var(--accent)]/10"
                                : "border-[var(--border)] bg-[var(--surface)] shadow-[var(--accent)]/5"
                            }`}>
                              <div className={`flex items-start gap-3 ${isRightMessage ? "flex-row-reverse text-right" : ""}`}>
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-semibold text-[var(--accent)]">
                                  {getInitials(message.author)}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 ${isRightMessage ? "justify-end" : "justify-between"}`}>
                                    <p className="text-sm font-semibold text-[var(--accent)]">{message.author}</p>
                                    <p className="text-[11px] text-[var(--text-secondary)]">{message.time}</p>
                                  </div>
                                  {message.mediaUrl && message.mediaType === "image" && <img src={message.mediaUrl} alt={message.mediaName ?? "Chat media"} className="mt-4 max-h-96 max-w-full rounded-xl object-contain" />}
                                  {message.mediaUrl && message.mediaType === "video" && <video src={message.mediaUrl} controls className="mt-4 max-h-96 max-w-full rounded-xl" />}
                                  {message.mediaUrl && message.mediaType === "audio" && <audio src={message.mediaUrl} controls className="mt-3 max-w-full" />}
                                  {message.mediaName && !message.mediaUrl && <p className="mt-3 break-words text-sm text-[var(--text-secondary)]">Media not found in this archive: {message.mediaName}</p>}
                                  {message.mediaName && message.mediaUrl && message.mediaType === "file" && <a href={message.mediaUrl} download={message.mediaName} className="mt-3 block break-words text-sm text-[var(--accent)] underline">Download {message.mediaName}</a>}
                                  {message.text && <p className="mt-3 break-words whitespace-pre-wrap text-[15px] leading-7 tracking-[0.01em] text-[var(--text-primary)] [font-family:'Segoe_UI','Segoe_UI_Emoji','Apple_Color_Emoji','Noto_Color_Emoji',sans-serif]">{renderMessageText(message.text)}</p>}
                                </div>
                              </div>
                            </article>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {displayedMessages.length < visibleMessages.length && (
                  <button
                    type="button"
                    onClick={() => setMessageLimit((limit) => limit + 200)}
                    className="mx-auto block rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-3 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/20"
                  >
                    Load more memories
                  </button>
                )}
                {visibleMessages.length === 0 && <p className="py-16 text-center text-sm text-[var(--text-secondary)]">No memories match your search.</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Treasure;