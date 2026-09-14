import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";

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

interface MediaFile {
  name: string;
  url: string;
  type: ChatMessage["mediaType"];
}

const messagePattern = /^(?:\[)?(\d{1,4}[/.-]\d{1,2}[/.-]\d{1,4}),\s+(\d{1,2}:\d{2}(?::\d{2})?\s*(?:[ap]m\.?)?)\]?\s*(?:-\s+)?([^:]+):\s?(.*)$/i;
const mediaPattern = /<attached:\s*(.+?)>|(.+?)\s+\(file attached\)/i;
const treasurePassword = "Lapis@Queen";

function getFileName(path: string) {
  return decodeURIComponent(path.split("/").pop() ?? path).toLowerCase();
}

function getMediaType(name: string): ChatMessage["mediaType"] {
  const extension = name.split(".").pop()?.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "heic", "heif"].includes(extension ?? "")) return "image";
  if (["mp4", "mov", "webm", "m4v"].includes(extension ?? "")) return "video";
  if (["mp3", "m4a", "ogg", "wav", "opus", "aac"].includes(extension ?? "")) return "audio";
  return "file";
}

function parseChat(text: string, mediaFiles: MediaFile[]) {
  const messages: ChatMessage[] = [];

  for (const line of text.replace(/\uFEFF/g, "").split(/\r?\n/)) {
    const match = line.match(messagePattern);

    if (!match) {
      if (messages.length && line.trim()) messages[messages.length - 1].text += `\n${line}`;
      continue;
    }

    const [, date, time, author, rawText] = match;
    const mediaMatch = rawText.match(mediaPattern);
    const mediaName = mediaMatch?.[1] ?? mediaMatch?.[2];
    const media = mediaName
      ? mediaFiles.find((file) => getFileName(file.name) === getFileName(mediaName))
      : undefined;

    messages.push({
      id: messages.length,
      date,
      time,
      author: author.trim(),
      text: mediaName ? "" : rawText,
      mediaName,
      mediaUrl: media?.url,
      mediaType: media?.type,
    });
  }

  return messages;
}

function Treasure() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [archiveName, setArchiveName] = useState("");
  const [chatName, setChatName] = useState("WhatsApp Chat");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  useEffect(() => () => mediaUrls.forEach((url) => URL.revokeObjectURL(url)), [mediaUrls]);

  const visibleMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((message) => `${message.author} ${message.text} ${message.mediaName ?? ""}`.toLowerCase().includes(query));
  }, [messages, search]);

  function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password === treasurePassword) {
      setIsUnlocked(true);
      return;
    }

    navigate("/", { replace: true, state: { accessDenied: true } });
  }

  async function handleArchive(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError("");
    setMessages([]);
    setMediaUrls([]);

    try {
      const archive = await JSZip.loadAsync(file);
      const entries = Object.values(archive.files).filter((entry) => !entry.dir);
      const chatEntry = entries
        .filter((entry) => entry.name.toLowerCase().endsWith(".txt"))
        .sort((a, b) => Number(!a.name.toLowerCase().includes("chat")) - Number(!b.name.toLowerCase().includes("chat")))[0];

      if (!chatEntry) throw new Error("This archive does not contain a WhatsApp chat text file.");

      const mediaEntries = entries.filter((entry) => entry !== chatEntry);
      const mediaFiles = await Promise.all(mediaEntries.map(async (entry) => {
        const blob = await entry.async("blob");
        const url = URL.createObjectURL(blob);
        return { name: entry.name, url, type: getMediaType(entry.name) } satisfies MediaFile;
      }));

      setMediaUrls(mediaFiles.map((media) => media.url));
      setMessages(parseChat(await chatEntry.async("string"), mediaFiles));
      setArchiveName(file.name);
      setChatName(file.name.replace(/\.zip$/i, "").replace(/^WhatsApp Chat - /i, "") || "WhatsApp Chat");
    } catch (archiveError) {
      setError(archiveError instanceof Error ? archiveError.message : "We could not read this archive.");
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  }

  if (!isUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b141a] px-6 pb-10 pt-24 text-[#e9edef]">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111b21] p-8 shadow-2xl sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#53bdeb]">Treasure / private archive</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Enter the password</h1>
          <p className="mt-3 text-sm leading-6 text-[#aebac1]">This conversation is private. Enter the password to open the chat reader.</p>
          <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                autoFocus
                className="w-full rounded-lg border border-white/10 bg-[#202c33] px-4 py-3 text-[#e9edef] outline-none transition placeholder:text-[#8696a0] focus:border-[#53bdeb]"
              />
            </label>
            <button type="submit" className="w-full rounded-lg bg-[#00a884] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#06cf9c]">
              Open Treasure
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b141a] px-4 pb-10 pt-24 text-[#e9edef] sm:px-6">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#111b21] shadow-2xl">
        <header className="border-b border-white/10 bg-[#202c33] px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#53bdeb]">Treasure / private archive</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Chat reader</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#aebac1]">Open a WhatsApp export ZIP and revisit the conversation exactly where its memories live.</p>
            </div>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#00a884] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#06cf9c]">
              {isLoading ? "Opening archive..." : "Choose WhatsApp ZIP"}
              <input type="file" accept=".zip,application/zip" className="hidden" onChange={handleArchive} disabled={isLoading} />
            </label>
          </div>
          {error && <p className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        </header>

        <div className="grid min-h-[35rem] lg:grid-cols-[19rem_1fr]">
          <aside className="border-b border-white/10 bg-[#111b21] p-4 lg:border-b-0 lg:border-r">
            <label className="block rounded-lg bg-[#202c33] px-4 py-3">
              <span className="sr-only">Search messages</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search messages" className="w-full bg-transparent text-sm text-[#e9edef] outline-none placeholder:text-[#8696a0]" />
            </label>
            <div className="mt-5 border-b border-white/10 pb-5">
              <p className="truncate text-lg font-medium">{chatName}</p>
              <p className="mt-1 text-xs text-[#8696a0]">{archiveName ? `${messages.length} messages` : "No archive loaded"}</p>
            </div>
            <div className="hidden pt-5 text-xs leading-6 text-[#8696a0] lg:block">
              <p>Everything is read locally in your browser.</p>
              <p className="mt-3">Media from the archive appears inline when the chat references its original filename.</p>
            </div>
          </aside>

          <div className="relative bg-[#0b141a]">
            {messages.length === 0 ? (
              <div className="flex min-h-[35rem] flex-col items-center justify-center px-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#202c33] text-2xl text-[#53bdeb]">◌</div>
                <h2 className="mt-6 text-2xl font-semibold">Your conversation belongs here</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-[#8696a0]">Export a WhatsApp chat with media, then choose the ZIP above. Nothing is uploaded or stored by this reader.</p>
              </div>
            ) : (
              <div className="space-y-2 bg-[radial-gradient(circle_at_20%_20%,rgba(37,55,66,0.25),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(18,45,47,0.18),transparent_35%)] p-4 sm:p-8">
                <div className="mx-auto mb-6 w-fit rounded-lg bg-[#182229] px-3 py-2 text-xs text-[#8696a0]">{visibleMessages.length} of {messages.length} messages</div>
                {visibleMessages.map((message) => (
                  <article key={message.id} className="max-w-2xl rounded-lg bg-[#202c33] px-3 py-2 shadow-sm sm:px-4">
                    <p className="text-xs font-semibold text-[#53bdeb]">{message.author}</p>
                    {message.mediaUrl && message.mediaType === "image" && <img src={message.mediaUrl} alt={message.mediaName ?? "Chat media"} className="mt-2 max-h-80 max-w-full rounded-lg object-contain" />}
                    {message.mediaUrl && message.mediaType === "video" && <video src={message.mediaUrl} controls className="mt-2 max-h-80 max-w-full rounded-lg" />}
                    {message.mediaUrl && message.mediaType === "audio" && <audio src={message.mediaUrl} controls className="mt-2 max-w-full" />}
                    {message.mediaName && !message.mediaUrl && <p className="mt-2 text-sm text-[#8696a0]">Media not found in this archive: {message.mediaName}</p>}
                    {message.mediaName && message.mediaUrl && message.mediaType === "file" && <a href={message.mediaUrl} download={message.mediaName} className="mt-2 block text-sm text-[#53bdeb] underline">Download {message.mediaName}</a>}
                    {message.text && <p className="mt-1 whitespace-pre-wrap text-[15px] leading-6 text-[#e9edef]">{message.text}</p>}
                    <p className="mt-1 text-right text-[11px] text-[#8696a0]">{message.date}, {message.time}</p>
                  </article>
                ))}
                {visibleMessages.length === 0 && <p className="py-16 text-center text-sm text-[#8696a0]">No messages match your search.</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Treasure;