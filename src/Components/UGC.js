import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './UGC.css';
import Footer from './Footer';
import Arrow from './Arrow';
import {
  BRANDS,
  CALENDLY_URL,
  EMAIL,
  TIKTOK_URL,
  YOUTUBE_URL,
  SOCIALS,
  portrait,
} from '../data/site';

const FOLLOWERS = '5K+';
const MONTHLY_VIEWS = '180K+';

const CONTENT_TYPES = [
  {
    title: 'Talking-head testimonials',
    desc: 'Honest on-camera reviews that feel like a friend telling a friend about your product.',
  },
  {
    title: 'Product demos & unboxings',
    desc: 'Clean, well-lit walkthroughs that show the product actually being used.',
  },
  {
    title: 'Lifestyle B-roll',
    desc: 'Cinematic clips of your product in real daily life. Editable, scroll-stopping footage.',
  },
  {
    title: 'Voiceover & scripted skits',
    desc: 'Hook-first short-form ads. Send the angle; I bring the voice, the timing and the punchline.',
  },
];

const STATS = [
  { value: MONTHLY_VIEWS, label: 'monthly views across socials', accent: true },
  { value: FOLLOWERS, label: 'total followers, and growing' },
  { value: String(CONTENT_TYPES.length), label: 'content formats I deliver' },
];

const NICHES = [
  'Tech, SaaS & AI apps',
  'Lifestyle, fashion & travel',
  'Fitness, wellness & food',
];

// Add clips here: { title: 'Talking-head for X', thumbnail: thumbImport, url: 'https://...' }
const EXAMPLE_VIDEOS = [];

const INSTAGRAM_URL = SOCIALS.find((s) => s.label === 'Instagram')?.href;

const FOOTER_SOCIALS = [
  { label: 'YouTube', href: YOUTUBE_URL },
  { label: 'Instagram', href: INSTAGRAM_URL },
  { label: 'TikTok', href: TIKTOK_URL },
].filter((s) => s.href);

const fadeUp = (reduceMotion, delay = 0) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const enter = (reduceMotion, delay = 0) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const UGC = () => {
  const reduceMotion = useReducedMotion();
  const hasExamples = EXAMPLE_VIDEOS.length > 0;

  const scrollToContact = () => {
    const el = document.getElementById('ugc-contact');
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    el.querySelector('a, button')?.focus({ preventScroll: true });
  };

  return (
    <div className="ugc">
      <section className="container ugc-hero" aria-labelledby="ugc-title">
        <div className="ugc-hero__copy">
          <motion.p className="ugc-hero__pill" {...enter(reduceMotion)}>
            <span className="ugc-hero__dot" aria-hidden="true" />
            Open for UGC collabs
          </motion.p>
          <motion.h1 id="ugc-title" className="display ugc-hero__title" {...enter(reduceMotion, 0.06)}>
            Hi, I&apos;m Miro. Your next <em className="accent">UGC creator.</em>
          </motion.h1>
          <motion.p className="lede ugc-hero__lede" {...enter(reduceMotion, 0.12)}>
            Short, scroll-stopping content for brands: talking-head ads, product demos, cinematic
            B-roll, voiceover skits. If it fits in 60 seconds, I can sell it.
          </motion.p>
          <motion.div className="ugc-hero__ctas" {...enter(reduceMotion, 0.18)}>
            <button type="button" onClick={scrollToContact} className="btn btn--primary">
              Work with me
              <Arrow direction="down" />
            </button>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
              Book a 15-min call
              <Arrow direction="out" />
            </a>
          </motion.div>
        </div>

        <motion.div className="ugc-hero__visual" {...enter(reduceMotion, 0.14)}>
          <div className="ugc-phone">
            <img
              src={portrait}
              alt="Miro with his black cat on his shoulder"
              width={480}
              height={600}
            />
          </div>
        </motion.div>
      </section>

      <section className="container" aria-label="By the numbers">
        <dl className="ugc-stats">
          {STATS.map((s) => (
            <div key={s.label} className="ugc-stats__item">
              <dt className="stat-label">{s.label}</dt>
              <dd className={`ugc-stats__value${s.accent ? ' accent' : ''}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {BRANDS.length > 0 && (
        <section className="container ugc-brands" aria-labelledby="ugc-brands-title">
          <h2 id="ugc-brands-title" className="eyebrow ugc-brands__label">Trusted by</h2>
          <ul className="ugc-brands__list">
            {BRANDS.map((b) => (
              <li key={b.name}>
                <img src={b.logo} alt={b.name} className="ugc-brands__logo" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container ugc-make" aria-labelledby="ugc-make-title">
        <motion.h2 id="ugc-make-title" className="h2" {...fadeUp(reduceMotion)}>
          What I <em>make</em>
        </motion.h2>
        <ol className="ugc-make__grid">
          {CONTENT_TYPES.map((c, i) => (
            <motion.li key={c.title} className="ugc-make__card" {...fadeUp(reduceMotion, i * 0.06)}>
              <span className="meta" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3 ugc-make__card-title">{c.title}</h3>
              <p className="ugc-make__card-desc">{c.desc}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className={`container ugc-niches${hasExamples ? ' ugc-niches--with-examples' : ''}`}>
        <motion.div className="ugc-niches__col" {...fadeUp(reduceMotion)}>
          <h2 className="ugc-niches__title">Niches</h2>
          <ul className="ugc-niches__list">
            {NICHES.map((n) => (
              <li key={n}>{n}</li>
            ))}
            <li className="ugc-niches__more">…honestly, most things. Pitch me.</li>
          </ul>
        </motion.div>

        {hasExamples && (
          <motion.div className="ugc-examples" {...fadeUp(reduceMotion, 0.08)}>
            <h2 className="ugc-niches__title">Examples</h2>
            <ul className="ugc-examples__grid">
              {EXAMPLE_VIDEOS.map((v) => (
                <li key={v.url}>
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="ugc-examples__card">
                    {v.thumbnail && <img src={v.thumbnail} alt="" />}
                    <span className="ugc-examples__caption">{v.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </section>

      <Footer
        id="ugc-contact"
        size="lg"
        title={<>Let&apos;s make something that <em className="footer__em">sells.</em></>}
        cta={
          <>
            <a href={`mailto:${EMAIL}`} className="btn btn--primary ugc-footer__email">{EMAIL}</a>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--on-ink">
              Book a 15-min call
              <Arrow direction="out" />
            </a>
          </>
        }
        socials={FOOTER_SOCIALS}
      />
    </div>
  );
};

export default UGC;
