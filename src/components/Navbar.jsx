import { NavLink } from 'react-router-dom';
import './navbar.css';

const LINKS = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/chat', label: 'Chat' },
  { to: '/about', label: 'Haqida' },
];

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <NavLink to="/" className="brand" aria-label="Arlot AI — bosh sahifa">
          <img src="./logo.png" alt="Arlot AI" className="brand-logo" />
          <span className="brand-name">
            Arlot<span className="brand-ai">.AI</span>
          </span>
        </NavLink>

        <nav className="nav-links" aria-label="Asosiy navigatsiya">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/chat" className="btn btn-primary nav-cta">
          Suhbatni boshlash
        </NavLink>
      </div>
    </header>
  );
}
