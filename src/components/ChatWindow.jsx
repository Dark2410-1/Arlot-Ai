import { useEffect, useRef, useState } from 'react';
import { Send, Loader2, TriangleAlert, KeyRound } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ApiKeySetup from './ApiKeySetup';
import { streamChat, guessTopic, getApiKey, clearApiKey } from '../lib/groqAI';
import './chat-window.css';

const SUGGESTIONS = [
  "React'da useEffect qanday ishlaydi?",
  "Python'da list comprehension misoli",
  'Elden Ring boss janglariga maslahat',
  "Valorant'da aim'ni qanday yaxshilash mumkin?",
];

let idCounter = 0;
const nextId = () => `m-${Date.now()}-${idCounter++}`;

const WELCOME = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Salom! Men Arlot AI — dasturlash va o'yinlar bo'yicha yordamchiman. Kod bilan bog'liq muammo yoki o'yin haqida savolingiz bormi?",
  topic: 'other',
};

export default function ChatWindow() {
  const [hasKey, setHasKey] = useState(() => Boolean(getApiKey()));
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function handleSend(rawText) {
    const text = (rawText ?? input).trim();
    if (!text || isSending) return;

    setError(null);
    const userMsg = { id: nextId(), role: 'user', content: text };
    const aiMsgId = nextId();
    const history = [...messages, userMsg];

    setMessages([...history, { id: aiMsgId, role: 'assistant', content: '', topic: guessTopic(text), pending: true }]);
    setInput('');
    setIsSending(true);

    try {
      await streamChat(
        history.map((m) => ({ role: m.role, content: m.content })),
        (partial) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === aiMsgId ? { ...m, content: partial } : m))
          );
        }
      );
      setMessages((prev) => prev.map((m) => (m.id === aiMsgId ? { ...m, pending: false } : m)));
    } catch (err) {
      if (err.message === 'MISSING_KEY') {
        setHasKey(false);
      } else {
        setError(err.message || 'AI javob berishda xatolik yuz berdi.');
      }
      setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
    } finally {
      setIsSending(false);
      textareaRef.current?.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleChangeKey() {
    clearApiKey();
    setHasKey(false);
  }

  const showSuggestions = messages.length === 1;

  return (
    <div className="chat-shell">
      <div className="chat-header">
        <span className="chat-header-status">
          <span className={`status-dot ${hasKey ? 'status-on' : 'status-off'}`} />
          {hasKey ? 'Ulangan · Groq' : 'Ulanmagan'}
        </span>
        {hasKey && (
          <button className="chat-header-key-btn" onClick={handleChangeKey}>
            <KeyRound size={13} /> Kalitni o'zgartirish
          </button>
        )}
      </div>

      {!hasKey ? (
        <ApiKeySetup onSaved={() => setHasKey(true)} />
      ) : (
        <>
          <div className="chat-scroll" ref={scrollRef}>
            <div className="chat-messages">
              {messages.map((m) => (
                <MessageBubble key={m.id} {...m} />
              ))}

              {showSuggestions && (
                <div className="suggestions" role="group" aria-label="Taklif qilingan savollar">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="suggestion-chip" onClick={() => handleSend(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="chat-error" role="alert">
              <TriangleAlert size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="composer">
            <textarea
              ref={textareaRef}
              className="composer-input"
              placeholder="Dasturlash yoki o'yin haqida savol yozing..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
            />
            <button
              className="composer-send"
              onClick={() => handleSend()}
              disabled={isSending || !input.trim()}
              aria-label="Yuborish"
            >
              {isSending ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
