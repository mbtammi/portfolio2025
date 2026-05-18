import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaVideo,
  FaBoxOpen,
  FaCameraRetro,
  FaMicrophoneLines,
  FaArrowRight,
  FaRegCalendar,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa6';
import './UGC.css';
import Miro2 from '../Images/Miro2.webp';
import CelsiusLogo from '../Images/brandlogos/Celsius.jpeg';
import OnePlusLogo from '../Images/brandlogos/oneplus.png';
import OnThatAssLogo from '../Images/brandlogos/onthatass.png';
import ContactUs from './ContactUs';

const CALENDLY_URL = 'https://calendly.com/mirotammi44/30min';
const FOLLOWERS = '5K+';
const MONTHLY_VIEWS = '50K+';

const SOCIALS = {
  youtube: 'https://www.youtube.com/@mirotrying',
  instagram: 'https://www.instagram.com/mirotammi/',
  tiktok: 'https://www.tiktok.com/@mirotrying',
};

const CONTENT_TYPES = [
  {
    icon: <FaVideo />,
    title: 'Talking-head testimonials',
    desc: 'Honest, on-camera reviews that feel like a friend telling another friend about your product.',
  },
  {
    icon: <FaBoxOpen />,
    title: 'Product demos & unboxings',
    desc: 'Clean, well-lit walkthroughs that show your product actually being used — not just unwrapped.',
  },
  {
    icon: <FaCameraRetro />,
    title: 'Lifestyle / aesthetic B-roll',
    desc: 'Cinematic clips of your product slotting into real, daily life. Editable, scroll-stopping footage.',
  },
  {
    icon: <FaMicrophoneLines />,
    title: 'Voiceover & scripted skits',
    desc: 'Hook-first short-form ads. Send me the angle, I’ll bring the voice, the timing, and the punchline.',
  },
];

const NICHES = [
  'Tech / SaaS / AI apps',
  'Lifestyle / fashion / travel',
  'Fitness / wellness / food',
  '…and honestly, most things — pitch me.',
];

const BRAND_LOGOS = [
  { name: 'Celsius', logo: CelsiusLogo },
  { name: 'OnePlus', logo: OnePlusLogo },
  { name: 'OnThatAss', logo: OnThatAssLogo },
];

const EXAMPLE_VIDEOS = [
  // { title: 'Talking-head for X', thumbnail: thumbImport, url: 'https://...' },
];

const fadeUp = (reduceMotion, delay = 0) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12%' },
  transition: reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const UGC = () => {
  const reduceMotion = useReducedMotion();

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('ugc-contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="ugc-container">
      {/* Hero */}
      <section className="ugc-hero" aria-label="UGC creator intro">
        <div className="ugc-hero-bg" aria-hidden="true">
          <div className="ugc-hero-aurora" />
          <div className="ugc-hero-rays" />
          <div className="ugc-hero-vignette" />
        </div>

        <div className="ugc-hero-inner">
          <motion.div
            className="ugc-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="ugc-hero-badge"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="ugc-hero-badge-dot" />
              Open for UGC collabs
            </motion.div>

            <motion.h1
              className="ugc-hero-title"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Hi, I&apos;m Miro &mdash; your next UGC creator.
            </motion.h1>

            <motion.p
              className="ugc-hero-subtitle"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              I make short, scroll-stopping content for brands &mdash; talking-head ads,
              product demos, cinematic B-roll, voiceover skits. Tech, lifestyle, fitness,
              food &mdash; if it fits in 60 seconds, I can sell it.
            </motion.p>

            <motion.div
              className="ugc-hero-ctas"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#ugc-contact" onClick={scrollToContact} className="ugc-cta ugc-cta-primary">
                Work with me
                <FaArrowRight className="ugc-cta-icon" aria-hidden />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ugc-cta ugc-cta-secondary"
              >
                <FaRegCalendar className="ugc-cta-icon" aria-hidden />
                Book a 15-min call
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="ugc-hero-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={Miro2} alt="Miro Tammi" className="ugc-hero-image" width={480} height={600} />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="ugc-section ugc-stats-section" aria-label="By the numbers">
        <div className="ugc-stats">
          {[
            { value: MONTHLY_VIEWS, label: 'Monthly views across socials' },
            { value: FOLLOWERS, label: 'Total followers (and growing)' },
            { value: '4', label: 'Content formats I deliver' },
          ].map((stat, i) => (
            <motion.div key={stat.label} className="ugc-stat-card" {...fadeUp(reduceMotion, i * 0.07)}>
              <div className="ugc-stat-value">{stat.value}</div>
              <div className="ugc-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="ugc-platform-row">
          <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube — @mirotrying">
            <FaYoutube />
          </a>
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram — @mirotammi">
            <FaInstagram />
          </a>
          <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok — @mirotrying">
            <FaTiktok />
          </a>
        </div>
      </section>

      {/* What I make */}
      <section className="ugc-section" aria-label="What I make">
        <motion.div className="ugc-section-header" {...fadeUp(reduceMotion)}>
          <span className="ugc-eyebrow">What I make</span>
          <h2 className="ugc-section-title">Four formats. Whatever the brief needs.</h2>
        </motion.div>

        <div className="ugc-grid-2x2">
          {CONTENT_TYPES.map((c, i) => (
            <motion.div key={c.title} className="ugc-card" {...fadeUp(reduceMotion, i * 0.07)}>
              <div className="ugc-card-icon" aria-hidden>{c.icon}</div>
              <h3 className="ugc-card-title">{c.title}</h3>
              <p className="ugc-card-desc">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who I work with */}
      <section className="ugc-section" aria-label="Who I work with">
        <motion.div className="ugc-section-header" {...fadeUp(reduceMotion)}>
          <span className="ugc-eyebrow">Who I work with</span>
          <h2 className="ugc-section-title">Niches I&apos;m built for.</h2>
        </motion.div>
        <div className="ugc-chips">
          {NICHES.map((n, i) => (
            <motion.div key={n} className="ugc-chip" {...fadeUp(reduceMotion, i * 0.05)}>
              {n}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past collabs */}
      <section className="ugc-section" aria-label="Past collaborations">
        <motion.div className="ugc-section-header" {...fadeUp(reduceMotion)}>
          <span className="ugc-eyebrow">Past collabs</span>
          <h2 className="ugc-section-title">Brands I&apos;ve worked with.</h2>
        </motion.div>

        {BRAND_LOGOS.length > 0 ? (
          <div className="ugc-logo-strip">
            {BRAND_LOGOS.map((b) => (
              <div key={b.name} className="ugc-logo-cell">
                <img src={b.logo} alt={b.name} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div className="ugc-placeholder" {...fadeUp(reduceMotion, 0.05)}>
            Logos dropping in here soon. Want to be one of them?
          </motion.div>
        )}

        {EXAMPLE_VIDEOS.length > 0 && (
          <div className="ugc-reel">
            {EXAMPLE_VIDEOS.map((v, i) => (
              <motion.a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ugc-reel-card"
                {...fadeUp(reduceMotion, i * 0.07)}
              >
                <img src={v.thumbnail} alt={v.title} />
                <span className="ugc-reel-title">{v.title}</span>
              </motion.a>
            ))}
          </div>
        )}
      </section>

      {/* Why me */}
      <section className="ugc-section" aria-label="Why me">
        <motion.div className="ugc-section-header" {...fadeUp(reduceMotion)}>
          <span className="ugc-eyebrow">Why me</span>
          <h2 className="ugc-section-title">Why brands actually like working with me.</h2>
        </motion.div>
        <div className="ugc-why-list">
          {[
            {
              title: 'Engineer brain, creator output',
              body: 'I read the brief, I get the goal, I turn it around fast. No babysitting required.',
            },
            {
              title: 'Finland → Netherlands story',
              body: 'Natural in both Nordic-minimal and warmer European tones. Easy to localize.',
            },
            {
              title: 'Already shipping weekly',
              body: 'Camera, lighting, edit pipeline — all running. You’re not paying me to figure it out.',
            },
          ].map((w, i) => (
            <motion.div key={w.title} className="ugc-why-card" {...fadeUp(reduceMotion, i * 0.07)}>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="ugc-contact" className="ugc-section ugc-cta-section" aria-label="Get in touch">
        <motion.div className="ugc-section-header" {...fadeUp(reduceMotion)}>
          <span className="ugc-eyebrow">Let&apos;s talk</span>
          <h2 className="ugc-section-title">Let&apos;s make something.</h2>
          <p className="ugc-section-sub">
            Drop a message below or grab a 15-min slot on my calendar &mdash; whichever feels less like work.
          </p>
        </motion.div>

        <motion.div className="ugc-cta-row" {...fadeUp(reduceMotion, 0.07)}>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ugc-cta ugc-cta-primary"
          >
            <FaRegCalendar className="ugc-cta-icon" aria-hidden />
            Book a 15-min call
          </a>
        </motion.div>

        <motion.div className="ugc-form-wrap" {...fadeUp(reduceMotion, 0.12)}>
          <ContactUs />
        </motion.div>
      </section>

      <footer className="ugc-footer">
        <p>&copy; {new Date().getFullYear()} Miro Tammi. Open for collabs.</p>
      </footer>
    </div>
  );
};

export default UGC;
