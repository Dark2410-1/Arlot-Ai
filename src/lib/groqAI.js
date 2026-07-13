// Arlot AI — AI access layer
//
// Powered directly by the Groq API (https://console.groq.com) — an
// OpenAI-compatible endpoint with a genuinely free, no-credit-card tier
// and no age-verification or regional gating like some other providers.
// Each visitor pastes their own free API key (created in ~30 seconds at
// https://console.groq.com/keys with just an email/Google/GitHub login),
// which is stored ONLY in their own browser's localStorage. It is never
// sent anywhere except directly to Groq's API, and never committed to
// this repo.

export const MODEL = 'llama-3.3-70b-versatile';
export const STORAGE_KEY = 'arlot_groq_api_key';

const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export const SYSTEM_PROMPT = `Sen "Arlot AI" — dasturlash (programming) va video o'yinlar (games) sohasiga ixtisoslashgan yordamchisan.

Qoidalar:
1. Dasturlash va o'yinlarga oid savollarga (kod, algoritmlar, frameworklar, debugging, o'yin dizayni, o'yin mexanikasi, o'yinlarni o'tish, geymerlik maslahatlari va h.k.) juda aniq, texnik jihatdan to'g'ri va amaliy javob ber. Kerak bo'lsa kod namunalarini keltir.
2. Agar savol boshqa sohaga oid bo'lsa (siyosat, tibbiyot, umumiy hayotiy maslahat va hokazo), buni ochiq ayt: bu mavzu sening asosiy ixtisosligingdan tashqarida, va qisqa umumiy javob berib, keyin foydalanuvchini dasturlash yoki o'yinlar haqida so'rashga taklif qil. Butunlay rad etma — faqat ixtisoslashmaganingni bildir.
3. Javoblaring qisqa, aniq va professional bo'lsin. Ortiqcha cho'zib yubormaslik kerak.
4. Foydalanuvchi qaysi tilda yozsa, o'sha tilda javob ber (o'zbek, rus yoki ingliz).`;

const CODE_KEYWORDS = [
  'kod', 'code', 'dastur', 'algoritm', 'function', 'funksiya', 'bug', 'xato',
  'debug', 'react', 'javascript', 'python', 'java', 'c++', 'sql', 'api',
  'css', 'html', 'git', 'github', 'framework', 'library', 'kutubxona',
  'server', 'baza', 'database', 'kompilyator', 'sintaksis', 'syntax',
  'massiv', 'array', 'loop', 'sikl', 'class', 'obyekt', 'terminal',
];

const GAME_KEYWORDS = [
  'oyin', "o'yin", 'game', 'geymer', 'gamer', 'konsol', 'console',
  'ps5', 'xbox', 'steam', 'unity', 'unreal', 'minecraft', 'valorant',
  'dota', 'cs2', 'fortnite', 'genshin', 'mobile legends', 'pubg',
  'strategiya', 'level', 'boss', 'karakter', 'personaj', 'quest',
  'multiplayer', 'esport', 'nintendo', 'rpg', 'fps',
];

/**
 * Very lightweight, local (non-AI) topic guess used only to color-tag a
 * message bubble in the UI ([CODE] / [GAME] / [OTHER]) instantly, without
 * waiting on a model round-trip.
 */
export function guessTopic(text = '') {
  const t = text.toLowerCase();
  const codeHit = CODE_KEYWORDS.some((k) => t.includes(k));
  const gameHit = GAME_KEYWORDS.some((k) => t.includes(k));
  if (codeHit && !gameHit) return 'code';
  if (gameHit && !codeHit) return 'game';
  if (codeHit && gameHit) return 'code';
  return 'other';
}

export function getApiKey() {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function setApiKey(key) {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function clearApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

function toOpenAIMessages(history) {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
  ];
}

function friendlyError(status, rawText) {
  if (status === 401) {
    return "API kalit noto'g'ri yoki yaroqsiz. Sozlamalardan kalitni tekshiring.";
  }
  if (status === 429) {
    return "Bepul limitga yetdingiz. Bir necha soniya kutib, qayta urinib ko'ring.";
  }
  return `AI xizmatidan xatolik qaytdi (${status}). ${rawText?.slice(0, 140) || ''}`;
}

/**
 * Streams a chat completion straight from the Groq API using the
 * visitor's own free key. Yields accumulated text via onChunk.
 */
export async function streamChat(history, onChunk) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('MISSING_KEY');
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: toOpenAIMessages(history),
      stream: true,
    }),
  });

  if (!res.ok || !res.body) {
    const rawText = await res.text().catch(() => '');
    throw new Error(friendlyError(res.status, rawText));
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const jsonStr = trimmed.slice(5).trim();
      if (!jsonStr || jsonStr === '[DONE]') continue;

      try {
        const parsed = JSON.parse(jsonStr);
        const text = parsed?.choices?.[0]?.delta?.content ?? '';
        if (text) {
          full += text;
          onChunk(full);
        }
      } catch {
        // ignore partial/malformed chunk, next read will complete it
      }
    }
  }

  return full;
}
