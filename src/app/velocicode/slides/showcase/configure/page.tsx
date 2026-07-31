"use client";

import { DM_Mono, Luckiest_Guy, Special_Elite } from "next/font/google";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "../../configure/configure.module.css";
import { ORG_DIRECTOR, ORG_MEMBERS } from "../../../people";
import { SHOWCASE_MUSIC } from "../showcase-music";

const DEFAULT_ORGANIZERS: Organizer[] = [
  ...(ORG_DIRECTOR ? [{ name: ORG_DIRECTOR.name, role: ORG_DIRECTOR.role }] : []),
  ...ORG_MEMBERS.map((m) => ({ name: m.name, role: m.role })),
];

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const elite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const CATEGORIES = [
  { id: "theme", label: "Best Use of Theme" },
  { id: "overall", label: "Best Overall" },
  { id: "crowd", label: "Crowd Favorite" },
] as const;

type CatId = (typeof CATEGORIES)[number]["id"];
type Game = { title: string; team: string; url: string };
type Organizer = { name: string; role: string };
type Winner = { name: string; game: string };
type CategoryWinners = Record<CatId, Winner[]>;
type MusicConfig = {
  enabled: boolean;
  fadeSecs: number;
  shuffle: boolean;
  enabledTracks: number[];
};

function ensureHttps(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  return `https://${trimmed}`;
}

function buildParams(
  games: Game[],
  organizers: Organizer[],
  winners: CategoryWinners,
  music: MusicConfig,
): URLSearchParams {
  const p = new URLSearchParams();

  let gIdx = 1;
  for (const g of games) {
    if (!g.title.trim()) continue;
    p.set(`g${gIdx}t`, g.title.trim());
    if (g.team.trim()) p.set(`g${gIdx}a`, g.team.trim());
    const url = ensureHttps(g.url);
    if (url) p.set(`g${gIdx}u`, url);
    gIdx++;
  }

  let oIdx = 1;
  for (const o of organizers) {
    if (!o.name.trim()) continue;
    p.set(`o${oIdx}n`, o.name.trim());
    if (o.role.trim()) p.set(`o${oIdx}r`, o.role.trim());
    oIdx++;
  }

  for (const cat of CATEGORIES) {
    let wIdx = 1;
    for (const w of winners[cat.id] ?? []) {
      if (!w.name.trim()) continue;
      p.set(`${cat.id}w${wIdx}`, w.name.trim());
      if (w.game.trim()) p.set(`${cat.id}g${wIdx}`, w.game.trim());
      wIdx++;
    }
  }

  if (!music.enabled) p.set("music", "0");
  if (music.fadeSecs !== 4) p.set("mfade", String(music.fadeSecs));
  if (music.shuffle) p.set("mshuffle", "1");
  if (music.enabledTracks.length < SHOWCASE_MUSIC.length) {
    p.set("mon", music.enabledTracks.join(","));
  }

  return p;
}

function buildDeckUrl(
  origin: string,
  games: Game[],
  organizers: Organizer[],
  winners: CategoryWinners,
  music: MusicConfig,
): string {
  const p = buildParams(games, organizers, winners, music);
  const qs = p.toString();
  return qs
    ? `${origin}/velocicode/slides/showcase?${qs}`
    : `${origin}/velocicode/slides/showcase`;
}

function buildConfigureUrl(
  origin: string,
  games: Game[],
  organizers: Organizer[],
  winners: CategoryWinners,
  music: MusicConfig,
): string {
  const p = buildParams(games, organizers, winners, music);
  const qs = p.toString();
  return qs
    ? `${origin}/velocicode/slides/showcase/configure?${qs}`
    : `${origin}/velocicode/slides/showcase/configure`;
}

function initWinners(): CategoryWinners {
  return {
    theme: [{ name: "", game: "" }],
    overall: [{ name: "", game: "" }],
    crowd: [{ name: "", game: "" }],
  };
}

function moveItem<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

const HANDLE_STYLE: React.CSSProperties = {
  cursor: "grab",
  padding: "6px 8px",
  color: "rgba(32,24,12,0.3)",
  fontSize: 20,
  flexShrink: 0,
  userSelect: "none",
  lineHeight: 1,
  alignSelf: "flex-start",
  marginTop: 6,
};

const REMOVE_STYLE: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: "0.85rem",
  background: "transparent",
  border: "2.5px solid #20180c",
  color: "#20180c",
  width: 34,
  height: 34,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  alignSelf: "flex-start",
  marginTop: 6,
};

const REMOVE_DISABLED: React.CSSProperties = {
  ...REMOVE_STYLE,
  opacity: 0.2,
  cursor: "not-allowed",
};

// ── Draggable list helpers ────────────────────────────────────────

type DragBag = {
  onDragStart: (i: number) => (e: React.DragEvent) => void;
  onDragOver: (i: number) => (e: React.DragEvent) => void;
  onDrop: (i: number) => (e: React.DragEvent) => void;
  onDragEnd: () => void;
  dragOver: number | null;
};

function useDragList<T>(
  _list: T[],
  setList: React.Dispatch<React.SetStateAction<T[]>>,
): DragBag {
  const srcIdx = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const onDragStart = useCallback(
    (i: number) => (e: React.DragEvent) => {
      srcIdx.current = i;
      e.dataTransfer.effectAllowed = "move";
    },
    [],
  );

  const onDragOver = useCallback(
    (i: number) => (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOver(i);
    },
    [],
  );

  const onDrop = useCallback(
    (i: number) => (e: React.DragEvent) => {
      e.preventDefault();
      const src = srcIdx.current;
      if (src !== null && src !== i) {
        setList((prev) => moveItem(prev, src, i));
      }
      srcIdx.current = null;
      setDragOver(null);
    },
    [setList],
  );

  const onDragEnd = useCallback(() => {
    srcIdx.current = null;
    setDragOver(null);
  }, []);

  return { onDragStart, onDragOver, onDrop, onDragEnd, dragOver };
}

// ── Inner component (uses useSearchParams) ────────────────────────

function ConfigureContent() {
  const params = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: read once on mount from URL params
  const initialGames = useMemo<Game[]>(() => {
    const out: Game[] = [];
    for (let i = 1; i <= 60; i++) {
      const t = params.get(`g${i}t`);
      if (!t) break;
      out.push({
        title: t,
        team: params.get(`g${i}a`) ?? "",
        url: params.get(`g${i}u`) ?? "",
      });
    }
    return out.length > 0 ? out : [{ title: "", team: "", url: "" }];
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: read once on mount from URL params
  const initialOrganizers = useMemo<Organizer[]>(() => {
    const out: Organizer[] = [];
    for (let i = 1; i <= 30; i++) {
      const n = params.get(`o${i}n`);
      if (!n) break;
      out.push({ name: n, role: params.get(`o${i}r`) ?? "" });
    }
    if (out.length > 0) return out;
    return DEFAULT_ORGANIZERS.length > 0 ? DEFAULT_ORGANIZERS : [{ name: "", role: "" }];
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: read once on mount from URL params
  const initialWinners = useMemo<CategoryWinners>(() => {
    const result = initWinners();
    for (const cat of CATEGORIES) {
      const ws: Winner[] = [];
      for (let i = 1; i <= 5; i++) {
        const name = params.get(`${cat.id}w${i}`);
        if (!name) break;
        ws.push({ name, game: params.get(`${cat.id}g${i}`) ?? "" });
      }
      if (ws.length > 0) result[cat.id] = ws;
    }
    return result;
  }, []);

  const [games, setGames] = useState<Game[]>(initialGames);
  const [organizers, setOrganizers] = useState<Organizer[]>(initialOrganizers);
  const [winners, setWinners] = useState<CategoryWinners>(initialWinners);

  // biome-ignore lint/correctness/useExhaustiveDependencies: read once on mount
  const initialMusic = useMemo<MusicConfig>(() => {
    const monParam = params.get("mon");
    const enabledTracks = monParam
      ? monParam
          .split(",")
          .map(Number)
          .filter((n) => n >= 0 && n < SHOWCASE_MUSIC.length)
      : SHOWCASE_MUSIC.map((_, i) => i);
    return {
      enabled: params.get("music") !== "0",
      fadeSecs: Math.max(0.5, Math.min(10, Number(params.get("mfade") ?? 4))),
      shuffle: params.get("mshuffle") === "1",
      enabledTracks,
    };
  }, []);

  const [musicEnabled, setMusicEnabled] = useState(initialMusic.enabled);
  const [fadeSecs, setFadeSecs] = useState(initialMusic.fadeSecs);
  const [shuffleTracks, setShuffleTracks] = useState(initialMusic.shuffle);
  const [enabledTracks, setEnabledTracks] = useState<Set<number>>(
    () => new Set(initialMusic.enabledTracks),
  );

  const musicConfig: MusicConfig = {
    enabled: musicEnabled,
    fadeSecs,
    shuffle: shuffleTracks,
    enabledTracks: [...enabledTracks].sort((a, b) => a - b),
  };

  const [copiedDeck, setCopiedDeck] = useState(false);
  const [copiedConfigure, setCopiedConfigure] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const deckUrl = buildDeckUrl(origin, games, organizers, winners, musicConfig);
  const configureUrl = buildConfigureUrl(
    origin,
    games,
    organizers,
    winners,
    musicConfig,
  );

  // ── Games ──────────────────────────────────────────────────────

  const gameDrag = useDragList(games, setGames);

  const addGame = useCallback(() => {
    setGames((prev) => [...prev, { title: "", team: "", url: "" }]);
  }, []);

  const removeGame = useCallback((i: number) => {
    setGames((prev) => prev.filter((_, idx) => idx !== i));
  }, []);

  const updateGame = useCallback(
    (i: number, field: keyof Game, value: string) => {
      setGames((prev) =>
        prev.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)),
      );
    },
    [],
  );

  // ── Organizers ────────────────────────────────────────────────

  const orgDrag = useDragList(organizers, setOrganizers);

  const addOrganizer = useCallback(() => {
    setOrganizers((prev) => [...prev, { name: "", role: "" }]);
  }, []);

  const removeOrganizer = useCallback((i: number) => {
    setOrganizers((prev) => prev.filter((_, idx) => idx !== i));
  }, []);

  const updateOrganizer = useCallback(
    (i: number, field: keyof Organizer, value: string) => {
      setOrganizers((prev) =>
        prev.map((o, idx) => (idx === i ? { ...o, [field]: value } : o)),
      );
    },
    [],
  );

  // ── Winners ───────────────────────────────────────────────────

  const winnerDragSrc = useRef<{ cat: CatId; i: number } | null>(null);
  const [winnerDragOver, setWinnerDragOver] = useState<{
    cat: CatId;
    i: number;
  } | null>(null);

  const addWinner = useCallback((catId: CatId) => {
    setWinners((prev) => ({
      ...prev,
      [catId]: [...(prev[catId] ?? []), { name: "", game: "" }],
    }));
  }, []);

  const removeWinner = useCallback((catId: CatId, i: number) => {
    setWinners((prev) => ({
      ...prev,
      [catId]: (prev[catId] ?? []).filter((_, idx) => idx !== i),
    }));
  }, []);

  const updateWinner = useCallback(
    (catId: CatId, i: number, field: keyof Winner, value: string) => {
      setWinners((prev) => ({
        ...prev,
        [catId]: (prev[catId] ?? []).map((w, idx) =>
          idx === i ? { ...w, [field]: value } : w,
        ),
      }));
    },
    [],
  );

  // ── Copy ──────────────────────────────────────────────────────

  const copyDeck = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(deckUrl);
      setCopiedDeck(true);
      setTimeout(() => setCopiedDeck(false), 2000);
    } catch {
      /* fallback */
    }
  }, [deckUrl]);

  const copyConfigure = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(configureUrl);
      setCopiedConfigure(true);
      setTimeout(() => setCopiedConfigure(false), 2000);
    } catch {
      /* fallback */
    }
  }, [configureUrl]);

  const fontCls = [
    luckiestGuy.className,
    elite.className,
    dmMono.className,
  ].join(" ");

  const ordinalLabel = (n: number) => {
    if (n === 1) return "1st";
    if (n === 2) return "2nd";
    if (n === 3) return "3rd";
    return `${n}th`;
  };

  return (
    <div className={`${styles.page} ${fontCls}`}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.dot} />
          VelociCode · Slides
        </div>
        <a href="/velocicode/slides" className={styles.navLink}>
          ← All slides
        </a>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Event · Aug 1</div>
        <h1 className={`${styles.title} ${luckiestGuy.className}`}>
          Configure Showcase
        </h1>
        <p className={styles.sub}>
          Add submissions, organizers, and award winners, then copy the link to
          launch the deck. Use &ldquo;Bookmark form&rdquo; to save your progress
          as a URL you can return to. Nothing is stored server-side.
        </p>

        <div className={styles.card}>
          {/* ── Games ──────────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              Submissions
              <span
                style={{
                  opacity: 0.55,
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: 0,
                  marginLeft: 10,
                }}
              >
                — shown in the gallery carousel
              </span>
            </div>

            {/* Column headers — offset to align with input columns, skipping handle + remove */}
            <div
              style={{
                paddingLeft: 36,
                paddingRight: 42,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                <span className={styles.label} style={{ flex: 1 }}>
                  Game title
                </span>
                <span className={styles.label} style={{ flex: 1 }}>
                  Team / creator
                </span>
              </div>
              <span className={styles.label}>
                itch.io URL (optional — generates QR code)
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {games.map((g, i) => (
                // biome-ignore lint/a11y/noStaticElementInteractions: drag-to-reorder, keyboard not needed for configure tool
                <div
                  key={`game-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: reorderable list
                    i
                  }`}
                  draggable
                  onDragStart={gameDrag.onDragStart(i)}
                  onDragOver={gameDrag.onDragOver(i)}
                  onDrop={gameDrag.onDrop(i)}
                  onDragEnd={gameDrag.onDragEnd}
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                    background:
                      gameDrag.dragOver === i
                        ? "rgba(196,77,36,0.06)"
                        : "transparent",
                    outline:
                      gameDrag.dragOver === i
                        ? "2px dashed #c44d24"
                        : "2px solid transparent",
                    padding: "4px 0",
                  }}
                >
                  <span style={HANDLE_STYLE} aria-hidden="true">
                    ⠿
                  </span>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <div style={{ display: "flex", gap: 8 }}>
                      <input
                        id={`g-title-${i}`}
                        type="text"
                        className={styles.input}
                        style={{ flex: 1 }}
                        placeholder="Dino Dash"
                        value={g.title}
                        onChange={(e) => updateGame(i, "title", e.target.value)}
                      />
                      <input
                        id={`g-team-${i}`}
                        type="text"
                        className={styles.input}
                        style={{ flex: 1 }}
                        placeholder="Team Fossil"
                        value={g.team}
                        onChange={(e) => updateGame(i, "team", e.target.value)}
                      />
                    </div>
                    <input
                      id={`g-url-${i}`}
                      type="text"
                      className={styles.input}
                      placeholder="itch.io/..."
                      value={g.url}
                      onChange={(e) => updateGame(i, "url", e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    style={games.length === 1 ? REMOVE_DISABLED : REMOVE_STYLE}
                    disabled={games.length === 1}
                    onClick={() => removeGame(i)}
                    aria-label="Remove submission"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={addGame}
              style={{
                background: "transparent",
                color: "#20180c",
                borderColor: "#20180c",
                boxShadow: "4px 4px 0 #20180c",
                alignSelf: "flex-start",
              }}
            >
              + Add submission
            </button>
          </div>

          {/* ── Organizers ──────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              Who Made It Happen
              <span
                style={{
                  opacity: 0.55,
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: 0,
                  marginLeft: 10,
                }}
              >
                — shown on the credits slide
              </span>
            </div>

            {/* Column headers */}
            <div
              style={{
                paddingLeft: 36,
                paddingRight: 42,
                display: "flex",
                gap: 8,
                marginBottom: 2,
              }}
            >
              <span className={styles.label} style={{ flex: 1 }}>
                Name
              </span>
              <span className={styles.label} style={{ flex: 1 }}>
                Role
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {organizers.map((o, i) => (
                // biome-ignore lint/a11y/noStaticElementInteractions: drag-to-reorder, keyboard not needed for configure tool
                <div
                  key={`org-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: reorderable list
                    i
                  }`}
                  draggable
                  onDragStart={orgDrag.onDragStart(i)}
                  onDragOver={orgDrag.onDragOver(i)}
                  onDrop={orgDrag.onDrop(i)}
                  onDragEnd={orgDrag.onDragEnd}
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                    background:
                      orgDrag.dragOver === i
                        ? "rgba(196,77,36,0.06)"
                        : "transparent",
                    outline:
                      orgDrag.dragOver === i
                        ? "2px dashed #c44d24"
                        : "2px solid transparent",
                    padding: "4px 0",
                  }}
                >
                  <span style={HANDLE_STYLE} aria-hidden="true">
                    ⠿
                  </span>
                  <div
                    style={{
                      flex: 1,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    <input
                      id={`o-name-${i}`}
                      type="text"
                      className={styles.input}
                      placeholder="Jane Smith"
                      value={o.name}
                      onChange={(e) =>
                        updateOrganizer(i, "name", e.target.value)
                      }
                    />
                    <input
                      id={`o-role-${i}`}
                      type="text"
                      className={styles.input}
                      placeholder="Lead Organizer"
                      value={o.role}
                      onChange={(e) =>
                        updateOrganizer(i, "role", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    style={
                      organizers.length === 1 ? REMOVE_DISABLED : REMOVE_STYLE
                    }
                    disabled={organizers.length === 1}
                    onClick={() => removeOrganizer(i)}
                    aria-label="Remove person"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={addOrganizer}
              style={{
                background: "transparent",
                color: "#20180c",
                borderColor: "#20180c",
                boxShadow: "4px 4px 0 #20180c",
                alignSelf: "flex-start",
              }}
            >
              + Add person
            </button>
          </div>

          {/* ── Winners ─────────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              Award Winners
              <span
                style={{
                  opacity: 0.55,
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: 0,
                  marginLeft: 10,
                }}
              >
                — each winner gets their own reveal slide, announced from last
                to first
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            >
              {CATEGORIES.map((cat) => {
                const catWinners = winners[cat.id] ?? [];
                return (
                  <div key={cat.id}>
                    <div
                      style={{
                        fontFamily: elite.style.fontFamily,
                        fontSize: "0.72rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#8c3914",
                        marginBottom: "10px",
                      }}
                    >
                      {cat.label}
                      {cat.id === "crowd" && (
                        <span
                          style={{
                            marginLeft: 10,
                            opacity: 0.55,
                            textTransform: "none",
                            letterSpacing: 0,
                          }}
                        >
                          — can be left blank and filled in at the last minute
                        </span>
                      )}
                    </div>

                    {/* Column headers — offset to skip handle + ordinal + gaps */}
                    <div
                      style={{
                        paddingLeft: 86,
                        paddingRight: 42,
                        display: "flex",
                        gap: 8,
                        marginBottom: 2,
                      }}
                    >
                      <span className={styles.label} style={{ flex: 1 }}>
                        Winner name
                      </span>
                      <span className={styles.label} style={{ flex: 1 }}>
                        Game name
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      {catWinners.map((w, i) => (
                        // biome-ignore lint/a11y/noStaticElementInteractions: drag-to-reorder, keyboard not needed for configure tool
                        <div
                          key={`${cat.id}-w-${i}`}
                          draggable
                          onDragStart={(e) => {
                            winnerDragSrc.current = { cat: cat.id, i };
                            e.dataTransfer.effectAllowed = "move";
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setWinnerDragOver({ cat: cat.id, i });
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const src = winnerDragSrc.current;
                            if (src && src.cat === cat.id && src.i !== i) {
                              setWinners((prev) => ({
                                ...prev,
                                [cat.id]: moveItem(
                                  prev[cat.id] ?? [],
                                  src.i,
                                  i,
                                ),
                              }));
                            }
                            winnerDragSrc.current = null;
                            setWinnerDragOver(null);
                          }}
                          onDragEnd={() => {
                            winnerDragSrc.current = null;
                            setWinnerDragOver(null);
                          }}
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "flex-start",
                            background:
                              winnerDragOver?.cat === cat.id &&
                              winnerDragOver?.i === i
                                ? "rgba(196,77,36,0.06)"
                                : "transparent",
                            outline:
                              winnerDragOver?.cat === cat.id &&
                              winnerDragOver?.i === i
                                ? "2px dashed #c44d24"
                                : "2px solid transparent",
                            padding: "4px 0",
                          }}
                        >
                          <span style={HANDLE_STYLE} aria-hidden="true">
                            ⠿
                          </span>
                          <div
                            style={{
                              fontFamily: elite.style.fontFamily,
                              fontSize: "0.72rem",
                              letterSpacing: "0.1em",
                              color: "#8c3914",
                              textTransform: "uppercase",
                              width: 34,
                              flexShrink: 0,
                              textAlign: "center",
                              paddingTop: 14,
                              lineHeight: 1,
                            }}
                          >
                            {ordinalLabel(i + 1)}
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: 8,
                            }}
                          >
                            <input
                              id={`${cat.id}-wn-${i}`}
                              type="text"
                              className={styles.input}
                              placeholder="Team or person"
                              value={w.name}
                              onChange={(e) =>
                                updateWinner(cat.id, i, "name", e.target.value)
                              }
                            />
                            <input
                              id={`${cat.id}-wg-${i}`}
                              type="text"
                              className={styles.input}
                              placeholder="Game title"
                              value={w.game}
                              onChange={(e) =>
                                updateWinner(cat.id, i, "game", e.target.value)
                              }
                            />
                          </div>
                          <button
                            type="button"
                            style={
                              catWinners.length === 1
                                ? REMOVE_DISABLED
                                : REMOVE_STYLE
                            }
                            disabled={catWinners.length === 1}
                            onClick={() => removeWinner(cat.id, i)}
                            aria-label="Remove winner"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnGhost}`}
                      onClick={() => addWinner(cat.id)}
                      style={{
                        background: "transparent",
                        color: "#20180c",
                        borderColor: "#20180c",
                        boxShadow: "4px 4px 0 #20180c",
                        alignSelf: "flex-start",
                        marginTop: "8px",
                        fontSize: "0.8rem",
                      }}
                    >
                      + Add winner
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ── Music ──────────────────────────────────────────── */}
          <div className={styles.section}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div className={styles.sectionLabel} style={{ marginBottom: 0 }}>
                Music
                <span
                  style={{
                    opacity: 0.55,
                    fontWeight: 400,
                    textTransform: "none",
                    letterSpacing: 0,
                    marginLeft: 10,
                  }}
                >
                  — background audio with crossfade
                </span>
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontFamily: dmMono.style.fontFamily,
                  fontSize: "0.82rem",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={musicEnabled}
                  onChange={(e) => setMusicEnabled(e.target.checked)}
                  style={{ width: 16, height: 16, cursor: "pointer" }}
                />
                Enable music
              </label>
            </div>

            {SHOWCASE_MUSIC.length === 0 ? (
              <div
                style={{
                  fontFamily: dmMono.style.fontFamily,
                  fontSize: "0.82rem",
                  color: "#8c3914",
                  opacity: 0.7,
                  padding: "12px 0",
                }}
              >
                No tracks configured — add .mp3 files to{" "}
                <code>/public/velocicode/music/</code> and list them in{" "}
                <code>showcase-music.ts</code>.
              </div>
            ) : (
              <div
                style={{
                  opacity: musicEnabled ? 1 : 0.4,
                  pointerEvents: musicEnabled ? "auto" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Track list */}
                <div>
                  <div className={styles.label} style={{ marginBottom: 8 }}>
                    Tracks
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {SHOWCASE_MUSIC.map((track, i) => (
                      <label
                        key={track.file}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          cursor: "pointer",
                          fontFamily: dmMono.style.fontFamily,
                          fontSize: "0.85rem",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={enabledTracks.has(i)}
                          onChange={(e) => {
                            const next = new Set(enabledTracks);
                            if (e.target.checked) next.add(i);
                            else next.delete(i);
                            setEnabledTracks(next);
                          }}
                          style={{ width: 15, height: 15, cursor: "pointer" }}
                        />
                        <span>{track.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Crossfade + shuffle row */}
                <div
                  style={{
                    display: "flex",
                    gap: 32,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div className={styles.label} style={{ marginBottom: 6 }}>
                      Crossfade — {fadeSecs}s
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={10}
                      step={0.5}
                      value={fadeSecs}
                      onChange={(e) =>
                        setFadeSecs(Number.parseFloat(e.target.value))
                      }
                      style={{ width: 160, accentColor: "#c44d24" }}
                    />
                  </div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                      fontFamily: dmMono.style.fontFamily,
                      fontSize: "0.82rem",
                      userSelect: "none",
                      marginTop: 18,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={shuffleTracks}
                      onChange={(e) => setShuffleTracks(e.target.checked)}
                      style={{ width: 15, height: 15, cursor: "pointer" }}
                    />
                    Shuffle
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Output ───────────────────────────────────────────────── */}
        <div className={styles.outputCard}>
          <div className={styles.outputHeader}>Generated link</div>
          <div className={styles.outputUrl}>{deckUrl}</div>
          <div className={styles.outputActions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={copyDeck}
            >
              {copiedDeck ? (
                <span className={styles.copyDone}>✓ Copied</span>
              ) : (
                "Copy deck link"
              )}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={copyConfigure}
              title="Copy a link back to this configure page with your current data pre-filled"
            >
              {copiedConfigure ? (
                <span className={styles.copyDone}>✓ Copied</span>
              ) : (
                "Bookmark form"
              )}
            </button>
            <a
              className={`${styles.btn} ${styles.btnGhost}`}
              href={deckUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Launch deck ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseConfigurePage() {
  return (
    <Suspense>
      <ConfigureContent />
    </Suspense>
  );
}
