import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="mono footer-text">
          Arlot AI — <span style={{ color: 'var(--accent-code)' }}>{'</>'}</span> dasturlash va{' '}
          <span style={{ color: 'var(--accent-game)' }}>🎮</span> o'yinlar uchun.
        </p>
        <p className="mono footer-text footer-muted">
          Ochiq kodli · Puter.js orqali ishlaydi · API kalitsiz
        </p>
      </div>
    </footer>
  );
}
