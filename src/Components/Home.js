import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './Home.css';
import { FaInstagram, FaLinkedinIn, FaGithub, FaYoutube, FaRegEnvelope, FaArrowRight } from 'react-icons/fa';
import Miro2 from '../Images/Miro2.webp';
import About from './About';
import HomeIntro from './HomeIntro';

const fadeUp = (reduceMotion, delay = 0) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const Home = () => {
  const reduceMotion = useReducedMotion();
  const [introDone, setIntroDone] = useState(reduceMotion === true);
  const finishIntro = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    if (reduceMotion === true) setIntroDone(true);
  }, [reduceMotion]);

  return (
    <div className="home-container-base">
      {!introDone && <HomeIntro onComplete={finishIntro} />}
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero-bg" aria-hidden="true">
          <div className="home-hero-aurora" />
          <div className="home-hero-rays" />
          <div className="home-hero-vignette" />
        </div>

        <div className="home-hero-inner">
          <motion.div
            className="home-hero-copy"
            {...fadeUp(reduceMotion, 0)}
          >
            <motion.a
              href="https://auto-ranked.com"
              target="_blank"
              rel="noopener noreferrer"
              className="home-hero-badge"
              {...fadeUp(reduceMotion, 0.08)}
            >
              <span className="home-hero-badge-dot" />
              Latest — Auto-Ranked · YouTube Optimizer
            </motion.a>

            <motion.h1
              className="home-hero-title"
              {...fadeUp(reduceMotion, 0.12)}
            >
              Hi, Miro here!
            </motion.h1>

            <motion.p className="home-subtitle" {...fadeUp(reduceMotion, 0.18)}>
              I&apos;m a 25-year-old software engineer, content creator, business owner, and M.Sc. — originally from Finland, now living in the Netherlands. I love shipping products, learning fast, and taking on challenges that push me to grow.
            </motion.p>

            <motion.div className="home-hero-ctas" {...fadeUp(reduceMotion, 0.24)}>
              <a
                href="https://auto-ranked.com"
                target="_blank"
                rel="noopener noreferrer"
                className="home-cta home-cta-primary"
              >
                Auto-Ranked
                <FaArrowRight className="home-cta-icon" aria-hidden />
              </a>
              <Link to="/projects" className="home-cta home-cta-secondary">
                View work
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="home-hero-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={Miro2} alt="Miro Tammi" className="home-large-image" width={480} height={600} />
          </motion.div>
        </div>
      </section>

      <div className="home-rest">
        <div className="home-links-wrap">
          <div className="home-links">
            <a href="https://www.youtube.com/@MiroTrying" target="_blank" rel="noopener noreferrer" className="link-button youtube">
              <div className="link-content">
                <FaYoutube className="link-icon" />
                <span>YouTube</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/miro-tammi-701bb3205/" target="_blank" rel="noopener noreferrer" className="link-button linkedin">
              <div className="link-content">
                <FaLinkedinIn className="link-icon" />
                <span>LinkedIn</span>
              </div>
            </a>
            <a href="https://github.com/mbtammi" target="_blank" rel="noopener noreferrer" className="link-button github">
              <div className="link-content">
                <FaGithub className="link-icon" />
                <span>GitHub</span>
              </div>
            </a>
            <a href="https://www.instagram.com/mirotammi/" target="_blank" rel="noopener noreferrer" className="link-button instagram">
              <div className="link-content">
                <FaInstagram className="link-icon" />
                <span>Instagram</span>
              </div>
            </a>
            <a href="mailto:mirotammi44@gmail.com" target="_blank" rel="noopener noreferrer" className="link-button contact">
              <div className="link-content">
                <FaRegEnvelope className="link-icon" />
                <span>Contact Me</span>
              </div>
            </a>
          </div>
        </div>

        <About />

        <footer className="home-footer">
          <p>© {new Date().getFullYear()} Miro&apos;s Portfolio. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
