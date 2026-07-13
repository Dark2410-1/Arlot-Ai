import { Link } from 'react-router-dom';
import { Code2, Gamepad2, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import './home.css';

const FEATURES = [
  {
    icon: Code2,
    accent: 'code',
    title: 'Dasturlash bo\'yicha aniq javoblar',
    desc: "Algoritmlar, debugging, freymvorklar va kod namunalari — texnik jihatdan to'g'ri va amaliy tushuntirishlar bilan.",
  },
  {
    icon: Gamepad2,
    accent: 'game',
    title: "O'yinlar bo'yicha ekspert maslahat",
    desc: "O'yin mexanikasi, strategiyalar, boss janglari va geymerlik maslahatlari bo'yicha ishonchli javoblar.",
  },
  {
    icon: Zap,
    accent: 'code',
    title: 'Tezkor va bepul',
    desc: "Backend yoki API kalitisiz — to'g'ridan-to'g'ri brauzerda ishlaydi, javoblar bir zumda oqim tarzida keladi.",
  },
  {
    icon: ShieldCheck,
    accent: 'game',
    title: 'Ochiq manba',
    desc: "To'liq kodi GitHub'da — o'zingiz o'rganish, o'zgartirish yoki fork qilishingiz mumkin.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Dasturlash · O'yinlar · Sun'iy intellekt</span>
            <h1 className="hero-title">
              Ikki soha uchun bitta
              <br />
              aqlli yordamchi.
            </h1>
            <p className="hero-desc">
              Arlot AI — kodni tuzatishdan tortib, sevimli o'yiningizdagi qiyin bossni
              yengishgacha. Har bir javob avtomatik ravishda <span className="tag-inline tag-code">CODE</span>{' '}
              yoki <span className="tag-inline tag-game">GAME</span> deb belgilanadi.
            </p>
            <div className="hero-actions">
              <Link to="/chat" className="btn btn-primary">
                Chatni boshlash <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn">
                Qanday ishlaydi?
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="terminal">
              <div className="terminal-bar">
                <span className="t-dot" style={{ background: '#ff5f57' }} />
                <span className="t-dot" style={{ background: '#febc2e' }} />
                <span className="t-dot" style={{ background: '#28c840' }} />
                <span className="terminal-title mono">arlot-ai — chat</span>
              </div>
              <div className="terminal-body mono">
                <p className="t-line t-user">&gt; useEffect ichida fetch qilsam, cleanup kerakmi?</p>
                <p className="t-line">
                  <span className="tag-inline tag-code">CODE</span> Ha — komponent unmount
                  bo'lganda so'rovni bekor qilish uchun AbortController ishlating...
                </p>
                <p className="t-line t-user" style={{ marginTop: 14 }}>
                  &gt; Elden Ring'da Malenia'ni qanday yengaman?
                </p>
                <p className="t-line">
                  <span className="tag-inline tag-game">GAME</span> Uning Waterfowl Dance
                  hujumidan qochish uchun...
                </p>
                <p className="t-cursor">_</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Nima uchun Arlot</span>
            <h2>Ikki mavzu, bitta chuqur ekspertiza</h2>
          </div>

          <div className="feature-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className={`feature-icon icon-${f.accent}`}>
                  <f.icon size={20} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Savolingiz bormi?</h2>
            <p>Kod parchasini joylashtiring yoki o'yin haqida so'rang — Arlot tayyor.</p>
          </div>
          <Link to="/chat" className="btn btn-primary">
            Suhbatga o'tish <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
