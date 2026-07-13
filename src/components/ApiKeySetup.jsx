import { useState } from 'react';
import { KeyRound, ExternalLink, Loader2 } from 'lucide-react';
import { setApiKey } from '../lib/groqAI';
import './api-key-setup.css';

export default function ApiKeySetup({ onSaved }) {
  const [value, setValue] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);

  async function handleSave(e) {
    e.preventDefault();
    const key = value.trim();
    if (!key) return;

    setChecking(true);
    setError(null);

    try {
      // Quick validation ping against the API before saving.
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: 'hi' }],
          max_tokens: 1,
        }),
      });

      if (!res.ok) {
        setError("Kalit ishlamadi. To'g'ri nusxalanganini tekshirib, qayta urinib ko'ring.");
        setChecking(false);
        return;
      }

      setApiKey(key);
      onSaved();
    } catch {
      setError("Ulanishda xatolik. Internetni tekshirib qayta urinib ko'ring.");
      setChecking(false);
    }
  }

  return (
    <div className="key-setup">
      <div className="key-setup-card">
        <div className="key-setup-icon">
          <KeyRound size={22} />
        </div>
        <h2>Bepul Groq API kalitini ulang</h2>
        <p>
          Arlot AI hech qanday umumiy akkaunt yoki murakkab ro'yxatdan o'tishni talab
          qilmaydi. Email yoki Google/GitHub bilan bepul Groq kalitini oling (kredit
          karta va yosh tasdiqlash shart emas) va shu yerga joylashtiring — kalit
          faqat sizning brauzeringizda saqlanadi.
        </p>

        <a
          href="https://console.groq.com/keys"
          target="_blank"
          rel="noreferrer"
          className="key-setup-link"
        >
          Bepul kalit olish (console.groq.com) <ExternalLink size={14} />
        </a>

        <form onSubmit={handleSave} className="key-setup-form">
          <input
            type="password"
            className="key-setup-input"
            placeholder="gsk_... kalitni shu yerga joylashtiring"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={checking}
            autoFocus
          />
          <button type="submit" className="btn btn-primary" disabled={checking || !value.trim()}>
            {checking ? <Loader2 size={16} className="spin" /> : 'Saqlash va boshlash'}
          </button>
        </form>

        {error && <p className="key-setup-error">{error}</p>}

        <p className="key-setup-note">
          Kalit hech qachon serverga yoki repoga yuborilmaydi — u faqat sizning
          brauzeringizdan to'g'ridan-to'g'ri Groq'ga boradi.
        </p>
      </div>
    </div>
  );
}
