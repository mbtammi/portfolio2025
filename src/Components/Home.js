import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './Home.css';
import { FaInstagram, FaLinkedinIn, FaGithub, FaYoutube, FaRegEnvelope, FaArrowRight } from 'react-icons/fa';
import Miro2 from '../Images/Miro2.webp';
import About from './About';
import HomeIntro from './HomeIntro';
import SplitText from './bits/SplitText';
import LiquidChrome from './bits/LiquidChrome';
import TiltedCard from './bits/TiltedCard';
import CountUp from './bits/CountUp';
import ShinyText from './bits/ShinyText';

const fadeUp = (reduceMotion, delay = 0) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const stats = [
  { to: 7, suffix: '', label: 'years coding' },
  { to: 10, suffix: '+', label: 'projects shipped' },
  { to: 3.6, suffix: 'k', label: 'YT subscribers' },
  { to: 150, suffix: 'k', label: 'monthly views' },
];

const socialLinks = [
  { icon: <FaYoutube />, label: 'YouTube', className: 'youtube', href: 'https://www.youtube.com/@MiroTrying' },
  { icon: <FaLinkedinIn />, label: 'LinkedIn', className: 'linkedin', href: 'https://www.linkedin.com/in/miro-tammi-701bb3205/' },
  { icon: <FaGithub />, label: 'GitHub', className: 'github', href: 'https://github.com/mbtammi' },
  { icon: <FaInstagram />, label: 'Instagram', className: 'instagram', href: 'https://www.instagram.com/mirotammi/' },
  { icon: <FaRegEnvelope />, label: 'Contact Me', className: 'contact', href: 'mailto:mirotammi44@gmail.com' },
];

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
          {reduceMotion ? (
            <div className="home-hero-aurora" />
          ) : (
            <div className="home-hero-fx">
              <LiquidChrome baseColor={[0.08, 0.1, 0.15]} speed={0.25} amplitude={0.4} interactive />
            </div>
          )}
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
              <ShinyText text="Latest — Auto-Ranked · YouTube Optimizer" speed={4} color="#c8d4e8" shineColor="#ffffff" />
            </motion.a>

            {reduceMotion || !introDone ? (
              <h1 className="home-hero-title">Hi, Miro here!</h1>
            ) : (
              <div className="home-hero-title-wrap">
              <SplitText
                text="Hi, Miro here!"
                tag="h1"
                className="home-hero-title"
                textAlign="left"
                delay={40}
                duration={0.9}
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
              </div>
            )}

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

            <motion.dl className="home-stats" {...fadeUp(reduceMotion, 0.3)}>
              {stats.map(stat => (
                <div className="home-stat" key={stat.label}>
                  <dt className="home-stat-value">
                    <CountUp to={stat.to} duration={1.6} separator="," startWhen={introDone} />
                    {stat.suffix}
                  </dt>
                  <dd className="home-stat-label">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            className="home-hero-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltedCard
              imageSrc={Miro2}
              altText="Miro Tammi"
              containerHeight="600px"
              containerWidth="100%"
              imageHeight="600px"
              imageWidth="480px"
              rotateAmplitude={10}
              scaleOnHover={1.04}
              showMobileWarning={false}
              showTooltip={false}
            />
          </motion.div>
        </div>
      </section>

      <div className="home-rest">
        <div className="home-links-wrap">
          <div className="home-links">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`link-button ${link.className}`}
              >
                <div className="link-content">
                  <span className="link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
              </a>
            ))}
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
