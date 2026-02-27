export interface RecentSearchItem {
  id: string;
  keyword: string;
  createdAt: string;
}

const STORAGE_KEY = "recent_searches_v1";
const MAX_ITEMS = 10;

function safeParse(value: string | null): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function normalizeKeyword(keyword: string) {
  return keyword.trim().replace(/\s+/g, " ");
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `r_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function readRecentSearches(): RecentSearchItem[] {
  if (typeof window === "undefined") return [];

  const raw = safeParse(localStorage.getItem(STORAGE_KEY));
  if (!Array.isArray(raw)) return [];

  const items: RecentSearchItem[] = [];
  for (const v of raw) {
    if (!isRecord(v)) continue;
    const id = typeof v.id === "string" ? v.id : "";
    const keyword = typeof v.keyword === "string" ? normalizeKeyword(v.keyword) : "";
    const createdAt = typeof v.createdAt === "string" ? v.createdAt : "";
    if (!keyword) continue;
    items.push({
      id: id || makeId(),
      keyword,
      createdAt: createdAt || new Date().toISOString(),
    });
  }

  // keyword 기준으로 최신 1개만 유지 (대소문자/공백 무시)
  const seen = new Set<string>();
  const deduped: RecentSearchItem[] = [];
  for (const item of items) {
    const key = item.keyword.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  return deduped.slice(0, MAX_ITEMS);
}

export function writeRecentSearches(items: RecentSearchItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
}

export function addRecentSearch(keyword: string): RecentSearchItem[] {
  const normalized = normalizeKeyword(keyword);
  if (!normalized) return readRecentSearches();

  const now = new Date().toISOString();
  const current = readRecentSearches();
  const next: RecentSearchItem[] = [
    { id: makeId(), keyword: normalized, createdAt: now },
    ...current.filter((x) => x.keyword.toLowerCase() !== normalized.toLowerCase()),
  ].slice(0, MAX_ITEMS);

  writeRecentSearches(next);
  return next;
}

export function removeRecentSearch(id: string): RecentSearchItem[] {
  const next = readRecentSearches().filter((x) => x.id !== id);
  writeRecentSearches(next);
  return next;
}

export function clearRecentSearches() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

