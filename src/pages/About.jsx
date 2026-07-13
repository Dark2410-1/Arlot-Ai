import { Code2, Gamepad2, Cpu } from 'lucide-react';
import './about.css';

const STACK = [
  ['React 18', 'UI kutubxonasi'],
  ['Vite', 'Build tool'],
  ['Groq API', "Bepul AI qatlami (o'z kalitingiz bilan)"],
  ['llama-3.3-70b-versatile', 'Standart model'],
];

export default function About() {
  return (
    <section className="about">
      <div className="container about-inner">
        <span className="eyebrow">Loyiha haqida</span>
        <h1 className="about-title">Arlot AI qanday ishlaydi</h1>
        <p className="about-lead">
          Arlot — ikkita aniq sohaga ixtisoslashgan sun'iy intellekt yordamchisi:
          {' '}
          <span className="tag-inline tag-code" style={{ marginRight: 4 }}>
            dasturlash
          </span>
          va
          <span className="tag-inline tag-game" style={{ marginLeft: 4 }}>
            video o'yinlar
          </span>
          . Boshqa mavzularda ham suhbatlasha oladi, lekin eng chuqur va aniq javoblarni
          shu ikki sohada beradi.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon icon-code">
              <Code2 size={20} />
            </div>
            <h3>Dasturlash</h3>
            <p>
              Algoritmlar, freymvorklar, debugging, arxitektura savollari — kod
              namunalari bilan tushuntiriladi.
            </p>
          </div>
          <div className="about-card">
            <div className="about-icon icon-game">
              <Gamepad2 size={20} />
            </div>
            <h3>O'yinlar</h3>
            <p>
              O'yin mexanikasi, strategiya, boss janglar, geymerlik maslahatlari
              bo'yicha amaliy javoblar.
            </p>
          </div>
        </div>

        <div className="about-section">
          <h2>
            <Cpu size={18} style={{ verticalAlign: '-3px', marginRight: 8 }} />
            Texnologiya
          </h2>
          <p style={{ marginBottom: 18 }}>
            Loyiha to'liq frontendda ishlaydi — maxsus backend serveri kerak emas. Har
            bir foydalanuvchi{' '}
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noreferrer"
              className="inline-link"
            >
              Groq Console
            </a>{' '}
            orqali o'zining bepul API kalitini oladi va uni faqat o'z brauzerida
            (localStorage) saqlaydi. Kalit hech qachon serverga yoki GitHub repoga
            yuborilmaydi — shuning uchun loyihani xavfsiz holda ochiq (public)
            repositoriyada saqlash mumkin.
          </p>

          <div className="stack-table">
            {STACK.map(([name, desc]) => (
              <div className="stack-row" key={name}>
                <span className="mono stack-name">{name}</span>
                <span className="stack-desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2>Cheklovlar</h2>
          <p>
            Arlot dasturlash va o'yinlardan tashqari mavzularda ham javob beradi, lekin
            bunday hollarda buni ochiq bildiradi va suhbatni asosiy ixtisosligiga
            qaytarishga harakat qiladi. Bu chegara tizim ko'rsatmasi (system prompt)
            darajasida belgilangan va{' '}
            <code className="mono">src/lib/groqAI.js</code> faylida tahrirlash mumkin.
          </p>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="btn about-github"
        >
          GitHub'da ko'rish →
        </a>
      </div>
    </section>
  );
}
