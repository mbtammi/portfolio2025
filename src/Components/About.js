import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './About.css';
import {
  FaCode,
  FaReact,
  FaDatabase,
  FaBusinessTime,
  FaMicrophone,
  FaVideo,
} from 'react-icons/fa';

const storyBlocks = [
  <>
    I&apos;m a passionate software developer — my journey in tech really took shape around 2020. I specialize in
    building solid web applications with <strong>React, TypeScript, JavaScript,</strong> and <strong>CSS</strong>,
    and I&apos;m comfortable with databases, cloud setups, APIs, and carrying a project from idea to production on my
    own when needed.
  </>,
  <>
    Beyond coding, I&apos;m an entrepreneur: as co-founder and CEO I&apos;ve led a team, worked with customers, and
    helped colleagues grow. Business studies gave me a useful lens for connecting product decisions to real outcomes.
  </>,
  <>
    Collaboration and communication matter to me. I&apos;ve shipped work in teams, presented for my company, and even
    done stand-up comedy — all of which sharpened how I speak to an audience, whether that&apos;s users or teammates.
  </>,
  <>
    I put real energy into my YouTube channel: scripting, filming, and editing with the same care I bring to code. And
    if one thing defines me, it&apos;s work ethic — I don&apos;t always have the perfect answer on day one, but I stay
    until the problem is solved.
  </>,
];

function Reveal({ children, index, reduceMotion, as: MotionComponent = motion.div, className = '' }) {
  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-12% 0px', amount: 0.15 },
        transition: { duration: 0.5, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <MotionComponent className={className} {...motionProps}>
      {children}
    </MotionComponent>
  );
}

const About = () => {
  const { pathname } = useLocation();
  const isPage = pathname === '/about';
  const reduceMotion = useReducedMotion();

  const heroMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      };

  const skills = [
    {
      icon: FaCode,
      label: 'Software Development:',
      text: (
        <>
          Expert in <strong>React, TypeScript, JavaScript, CSS</strong>, and building complete solutions from scratch.
        </>
      ),
    },
    {
      icon: FaBusinessTime,
      label: 'Leadership & Business Strategy:',
      text: (
        <>Experienced as a CEO and team leader, with a solid foundation in business strategy and customer relations.</>
      ),
    },
    {
      icon: FaVideo,
      label: 'Content Creation & Storytelling:',
      text: (
        <>
          Advanced in scriptwriting, video production, and editing to build a successful YouTube channel.
        </>
      ),
    },
    {
      icon: FaReact,
      label: 'Web Development:',
      text: (
        <>
          Proficient in creating modern and responsive web applications, combining clean code with strong design
          principles.
        </>
      ),
    },
    {
      icon: FaDatabase,
      label: 'Database & Cloud Systems:',
      text: (
        <>
          Skilled in managing relational and non-relational databases and deploying cloud-based solutions.
        </>
      ),
    },
    {
      icon: FaMicrophone,
      label: 'Public Speaking & Performance:',
      text: (
        <>Confident speaker with experience in company presentations and stand-up comedy.</>
      ),
    },
  ];

  return (
    <div className={`about-root ${isPage ? 'about-root--page' : 'about-root--embed'}`}>
      {isPage && (
        <header className="about-page-hero">
          <div className="about-page-hero__bg" aria-hidden />
          <motion.div className="about-page-hero__inner" {...heroMotion}>
            <p className="about-page-hero__eyebrow">Profile</p>
            <h1 className="about-page-hero__title">About me</h1>
            <p className="about-page-hero__lede">
              Software engineer, creator, and business owner — originally from Finland, now in the Netherlands. This is
              the longer version of how I work and what I care about.
            </p>
          </motion.div>
        </header>
      )}

      {isPage && (
        <div className="about-prose">
          {storyBlocks.map((block, i) => (
            <Reveal key={i} index={i} reduceMotion={reduceMotion} as={motion.p} className="about-prose__p">
              {block}
            </Reveal>
          ))}
        </div>
      )}

      <section className="about-skills-block" aria-labelledby="skills-heading">
        <Reveal index={isPage ? storyBlocks.length : 0} reduceMotion={reduceMotion} as={motion.div} className="about-skills-block__head">
          <h2 id="skills-heading" className="about-skills-block__title">
            Skills &amp; expertise
          </h2>
        </Reveal>

        <ul className="about-skills-list">
          {skills.map((item, index) => {
            const Icon = item.icon;
            const baseIndex = (isPage ? storyBlocks.length : 0) + 1 + index;
            return (
              <Reveal
                key={item.label}
                index={baseIndex}
                reduceMotion={reduceMotion}
                as={motion.li}
                className="about-skills-list__item"
              >
                <Icon className="skill-icon" aria-hidden />
                <span className="about-skills-list__text">
                  <span className="skill-text">{item.label}</span> {item.text}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default About;
