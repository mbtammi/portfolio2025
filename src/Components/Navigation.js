import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { EMAIL, SOCIALS } from '../data/site';
import './Navigation.css';

const LINKS = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/youtube', label: 'YouTube' },
  { to: '/ugc', label: 'UGC' },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  // Closing by Escape or the toggle hands focus back to the toggle.
  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    // The header sits outside <main>, so making main inert keeps Tab inside the bar + menu.
    const main = document.querySelector('main');
    if (main) main.inert = open;
    if (!open) return undefined;
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (main) main.inert = false;
    };
  }, [open]);

  return (
    <header className={`nav${open ? ' nav--open' : ''}`}>
      <div className="nav__bar container">
        <Link to="/" className="nav__brand">Miro Tammi</Link>
        <nav aria-label="Main" className="nav__links">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav__link">{l.label}</NavLink>
          ))}
          <Link to="/contact" className={`btn btn--small ${pathname === '/contact' ? 'btn--primary' : 'btn--dark'}`}>
            Get in touch
          </Link>
        </nav>
        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          ref={toggleRef}
          onClick={() => (open ? close() : setOpen(true))}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16'} />
          </svg>
        </button>
      </div>

      <div id="mobile-menu" className="menu" ref={menuRef} hidden={!open}>
        <nav aria-label="Mobile" className="menu__links">
          {[{ to: '/', label: 'Home' }, ...LINKS].map((l, i) => (
            <NavLink key={l.to} to={l.to} end className="menu__link">
              <span>{l.label}</span>
              <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
            </NavLink>
          ))}
        </nav>
        <div className="menu__foot">
          <Link to="/contact" className="btn btn--primary">Get in touch</Link>
          <div className="menu__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
          <a className="menu__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
