import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS, STATS, BRANDS, EMAIL, portrait } from '../data/site';
import Arrow from './Arrow';
import Footer from './Footer';
import HomeIntro from './HomeIntro';
import './Home.css';

const FEATURED = PROJECTS.find((p) => p.slug === 'auto-ranked');
const MORE = ['worldofthemaps', 'flexliving', 'tinkerit']
  .map((slug) => PROJECTS.find((p) => p.slug === slug))
  .filter(Boolean);

// Play the cat intro once per page load, not on every return to "/".
let introPlayed = false;

const pad = (n) => String(n).padStart(2, '0');

const Home = () => {
  const reduceMotion = useReducedMotion();
  const [introDone, setIntroDone] = useState(introPlayed);
  const finishIntro = useCallback(() => {
    introPlayed = true;
    setIntroDone(true);
  }, []);

  // Content fades in once; reduced motion renders it in place.
  const enter = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <div className="home">
      {!introDone && <HomeIntro onComplete={finishIntro} />}

      <section className="container home-hero" aria-labelledby="home-title">
        <motion.div className="home-hero__copy" {...enter(0)}>
          <p className="eyebrow">Software engineer · Creator · Founder</p>
          <h1 id="home-title" className="display home-hero__title">
            I build products &amp; tell <em className="accent">stories</em> about it.
          </h1>
          <p className="lede home-hero__lede">
            Finnish developer living in the Netherlands. React and TypeScript by day, YouTube by night,
            and the occasional stand-up set.
          </p>
          <div className="home-hero__actions">
            <Link to="/projects" className="btn btn--primary">
              See my work <Arrow />
            </Link>
            <Link to="/youtube" className="btn btn--secondary">Watch on YouTube</Link>
          </div>
        </motion.div>
        <motion.div className="arch home-hero__portrait" {...enter(0.12)}>
          <img src={portrait} alt="Miro with his black cat on his shoulder" />
        </motion.div>
      </section>

      <section className="container" aria-label="At a glance">
        <motion.dl className="stats home-stats" {...enter(0.2)}>
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="stat-label">{s.label}</dt>
              <dd className={`stat-value${s.accent ? ' accent' : ''}`}>{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </section>

      <section className="container section home-work" aria-labelledby="home-work-title">
        <div className="home-work__head">
          <h2 id="home-work-title" className="h2">Selected <em>work</em></h2>
          <Link to="/projects" className="text-link home-work__all">
            All projects <Arrow />
          </Link>
        </div>

        {FEATURED && (
          <motion.div {...reveal}>
            <Link to={`/projects/${FEATURED.slug}`} className="home-feature">
              <div className="home-feature__media">
                <img src={FEATURED.image} alt={`${FEATURED.name} logo`} />
              </div>
              <div className="home-feature__body">
                <p className="meta home-feature__kicker">01 — Latest product</p>
                <h3 className="home-feature__name">{FEATURED.name}</h3>
                <p className="lede">{FEATURED.tagline}</p>
                <ul className="home-feature__tags" aria-label="Stack">
                  {FEATURED.stack.map((t) => (
                    <li key={t} className="tag">{t}</li>
                  ))}
                </ul>
              </div>
            </Link>
          </motion.div>
        )}

        <ul className="home-cards">
          {MORE.map((p, i) => (
            <motion.li key={p.slug} {...reveal}>
              <Link to={`/projects/${p.slug}`} className="home-card">
                <img
                  className={`home-card__img${p.imageFit === 'contain' ? ' home-card__img--contain' : ''}`}
                  src={p.image}
                  alt={`${p.name} screenshot`}
                  loading="lazy"
                />
                <span className="meta">{pad(i + 2)}</span>
                <h3 className="h3">{p.name}</h3>
                <p className="body">{p.tagline}</p>
              </Link>
            </motion.li>
          ))}
        </ul>

        <Link to="/projects" className="btn btn--secondary home-work__all-mobile">All projects</Link>
      </section>

      <section className="container home-beyond" aria-labelledby="home-beyond-title">
        <h2 id="home-beyond-title" className="h2">Beyond <em>code</em></h2>
        <div className="home-beyond__grid">
          <motion.div {...reveal}>
            <Link to="/youtube" className="home-beyond__card home-beyond__card--yt">
              <p className="eyebrow home-beyond__eyebrow">YouTube · @mirotrying</p>
              <p className="home-beyond__title">
                Tech, productivity and life as a <em>software engineer.</em>
              </p>
              <span className="home-beyond__cta">Watch the latest videos <Arrow /></span>
            </Link>
          </motion.div>
          <motion.div {...reveal}>
            <Link to="/ugc" className="home-beyond__card home-beyond__card--ugc">
              <p className="eyebrow">UGC for brands</p>
              <p className="home-beyond__title">
                Short, scroll-stopping content that <em className="accent">sells.</em>
              </p>
              <div className="home-beyond__foot">
                <span className="home-beyond__cta">Work with me <Arrow /></span>
                <span className="home-beyond__brands">
                  {BRANDS.map((b) => (
                    <img key={b.name} src={b.logo} alt={b.name} loading="lazy" />
                  ))}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer
        size="lg"
        cta={<a href={`mailto:${EMAIL}`} className="btn btn--primary home-footer__email">{EMAIL}</a>}
      />
    </div>
  );
};

export default Home;
