import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIALS } from '../data/site';
import './Footer.css';

// Shared dark footer band. Pages pass their own headline and CTA when they need one.
const Footer = ({
  title = <>Let&apos;s build <em className="footer__em">something.</em></>,
  cta = <Link to="/contact" className="btn btn--primary">Get in touch</Link>,
  socials = SOCIALS,
  id,
  size = 'md',
}) => (
  <footer className={`footer footer--${size}`} id={id}>
    <div className="footer__top">
      <h2 className="footer__title">{title}</h2>
      <div className="footer__cta">{cta}</div>
    </div>
    <div className="footer__bottom">
      <div className="footer__socials">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
        ))}
      </div>
      <div>Finland → Netherlands</div>
    </div>
  </footer>
);

export default Footer;
