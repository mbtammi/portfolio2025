// YouTube Data API v3 client. Costs 3 quota units per uncached load
// (channels + playlistItems + videos) instead of 100+ for search.list.

const API = 'https://www.googleapis.com/youtube/v3';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const SHORTS_MAX_SECONDS = 180;

// "PT1H2M3S" / "P1DT2H" -> seconds. Returns 0 for anything unparseable.
export function parseDuration(iso) {
  const m = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(iso || '');
  if (!m) return 0;
  const [, d = 0, h = 0, min = 0, s = 0] = m;
  return Math.floor(Number(d) * 86400 + Number(h) * 3600 + Number(min) * 60 + Number(s));
}

// 754 -> "12:34", 3723 -> "1:02:03"
export function formatDuration(seconds) {
  const total = Math.max(0, Math.floor(seconds || 0));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

// 950 -> "950", 3612 -> "3.6k", 182000 -> "182k", 1250000 -> "1.3M"
export function formatCount(n) {
  const num = Number(n);
  if (!Number.isFinite(num) || num < 0) return '';
  const short = (v, unit) => {
    const fixed = v < 10 ? v.toFixed(1) : String(Math.round(v));
    return `${fixed.replace(/\.0$/, '')}${unit}`;
  };
  if (num >= 1e6) return short(num / 1e6, 'M');
  if (num >= 1e3) {
    const k = num / 1e3;
    // 999_600 would round to "1000k"; show it as millions instead.
    return k >= 999.5 ? short(num / 1e6, 'M') : short(k, 'k');
  }
  return String(Math.round(num));
}

// Shorts can be up to 3 minutes, so only keep anything longer.
export function filterLongForm(videos) {
  return (videos || []).filter((v) => v.durationSeconds > SHORTS_MAX_SECONDS);
}

function cacheKey(channelId) {
  return `yt-cache-v1:${channelId}`;
}

function readCache(channelId) {
  try {
    const raw = window.localStorage.getItem(cacheKey(channelId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(channelId, data) {
  try {
    window.localStorage.setItem(cacheKey(channelId), JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // storage full or blocked; caching is best-effort
  }
}

async function get(endpoint, params, signal) {
  const url = `${API}/${endpoint}?${new URLSearchParams(params)}`;
  const res = await fetch(url, { signal });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const reason = body?.error?.errors?.[0]?.reason || body?.error?.status || `HTTP ${res.status}`;
    throw new Error(`YouTube ${endpoint}: ${reason}`);
  }
  return body;
}

function toVideo(item) {
  const t = item.snippet?.thumbnails || {};
  return {
    id: item.id,
    title: item.snippet?.title || '',
    publishedAt: item.snippet?.publishedAt || '',
    thumbnail: (t.maxres || t.high || t.medium || t.default || {}).url || '',
    durationSeconds: parseDuration(item.contentDetails?.duration),
    live: item.snippet?.liveBroadcastContent && item.snippet.liveBroadcastContent !== 'none',
  };
}

/**
 * Fetch channel stats and latest long-form uploads.
 * Resolves to { channel: { subscribers, views }, videos: [...] }.
 * Throws with a short reason when the key/channel is missing or the API fails.
 */
export async function fetchYouTube({
  apiKey = process.env.REACT_APP_YOUTUBE_API_KEY,
  channelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID,
  signal,
} = {}) {
  if (!apiKey || !channelId) throw new Error('YouTube API key or channel id is not configured');

  const cached = readCache(channelId);
  if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS) return cached.data;

  try {
    const channelRes = await get('channels', { part: 'contentDetails,statistics', id: channelId, key: apiKey }, signal);
    const channel = channelRes.items?.[0];
    if (!channel) throw new Error('YouTube channels: channel not found');
    const uploads = channel.contentDetails?.relatedPlaylists?.uploads;

    const playlist = await get('playlistItems', { part: 'contentDetails', playlistId: uploads, maxResults: 25, key: apiKey }, signal);
    const ids = (playlist.items || []).map((i) => i.contentDetails?.videoId).filter(Boolean);

    let videos = [];
    if (ids.length) {
      const videosRes = await get('videos', { part: 'snippet,contentDetails', id: ids.join(','), key: apiKey }, signal);
      videos = filterLongForm((videosRes.items || []).map(toVideo).filter((v) => !v.live))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .map(({ live, ...v }) => v);
    }

    const stats = channel.statistics || {};
    const data = {
      channel: {
        subscribers: stats.hiddenSubscriberCount ? null : Number(stats.subscriberCount) || null,
        views: Number(stats.viewCount) || null,
      },
      videos,
    };
    writeCache(channelId, data);
    return data;
  } catch (err) {
    // A stale cache beats an empty page when the API is down or out of quota.
    if (cached && err.name !== 'AbortError') return cached.data;
    throw err;
  }
}
