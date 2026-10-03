import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Arrow from './Arrow';
import { portrait, SOCIALS, YOUTUBE_URL } from '../data/site';
import './Links.css';

const social = (label) => SOCIALS.find((s) => s.label === label)?.href;

const LINKS = [
  { title: 'Auto-Ranked', note: 'My YouTube optimizer · new', href: 'https://auto-ranked.com/', variant: 'dark' },
  { title: 'mirotrying', note: 'Watch on YouTube', href: YOUTUBE_URL, variant: 'blush' },
  { title: 'UGC for brands', note: 'Rates, formats, booking', to: '/ugc', variant: 'outline' },
  { title: 'Tinkerit', note: 'My company website', href: 'https://www.tinkerit.fi/' },
  { title: 'LinkedIn', note: 'Professional network', href: social('LinkedIn') },
  { title: 'Instagram', note: '@mirotammi', href: social('Instagram') },
  { title: 'GitHub', note: 'Check my code', href: social('GitHub') },
].filter((l) => l.href || l.to);

const Links = () => {
  const reduce = useReducedMotion();
  const item = (i) => (reduce
    ? {}
    : {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] },
    });

  return (
    <div className="links">
      <motion.header className="links-header" {...item(0)}>
        <div className="arch links-portrait">
          <img src={portrait} alt="Miro with his black cat on his shoulder" />
        </div>
        <h1 className="links-name">Miro <em className="accent">Tammi</em></h1>
        <p className="eyebrow links-eyebrow">Engineer · Creator · Founder</p>
      </motion.header>

      <ul className="links-list">
        {LINKS.map((l, i) => {
          const inner = (
            <>
              <span className="links-card-text">
                <span className="links-card-title">{l.title}</span>
                <span className="links-card-note">{l.note}</span>
              </span>
              <Arrow direction={l.to ? 'right' : 'out'} size={18} />
            </>
          );
          const cls = `links-card links-card--${l.variant || 'plain'}`;
          return (
            <motion.li key={l.title} {...item(i + 1)}>
              {l.to ? (
                <Link to={l.to} className={cls}>{inner}</Link>
              ) : (
                <a href={l.href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a>
              )}
            </motion.li>
          );
        })}
      </ul>

      <Link to="/" className="links-home meta">mteif.com</Link>
    </div>
  );
};

export default Links;
