import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EXPERIENCE, TECHNOLOGIES, portrait } from '../data/site';
import Footer from './Footer';
import './About.css';

const STORY = [
  <>
    My journey in tech really took shape around 2020. I build solid web applications with{' '}
    <strong>React, TypeScript, JavaScript, Python and CSS</strong>, and I&apos;m comfortable with databases, cloud setups and
    APIs, carrying a project from idea to production on my own when needed.
  </>,
  <>
    Beyond coding, I&apos;m an entrepreneur. As co-founder and CEO I&apos;ve led a team, worked with customers and
    helped colleagues grow. Business studies gave me a useful lens for connecting product decisions to real outcomes.
  </>,
  <>
    I&apos;ve shipped work in teams, presented for my company, and even done stand-up comedy, all of which sharpened
    how I speak to an audience.
  </>,
  <>
    I put real energy into my YouTube channel: scripting, filming and editing with the same care I bring to code. And
    if one thing defines me, it&apos;s work ethic.{' '}
    <em className="about-story__kicker">I stay until the problem is solved.</em>
  </>,
];

const SKILLS = [
  { title: 'Software development', text: 'React, TypeScript, JavaScript, Python and CSS. Complete solutions from scratch.' },
  { title: 'Web & mobile', text: 'Modern, responsive apps that pair clean code with good design.' },
  { title: 'Databases & cloud', text: 'Relational and non-relational databases, cloud deployments.' },
  { title: 'Leadership & strategy', text: 'CEO and team lead with a foundation in business and customer relations.' },
  { title: 'Content & storytelling', text: 'Scriptwriting, filming and editing for YouTube and brands.' },
  { title: 'Speaking', text: 'Company presentations, and stand-up comedy.' },
];

const About = () => {
  const reduceMotion = useReducedMotion();

  const enter = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        };

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <div className="about">
      <section className="container about-hero" aria-labelledby="about-title">
        <motion.div className="about-hero__text" {...enter()}>
          <p className="eyebrow">Profile</p>
          <h1 id="about-title" className="h1">
            About <em className="accent">me</em>
          </h1>
          <p className="about-hero__lede">
            Software engineer, creator and business owner. Originally from Finland, now in the Netherlands.
          </p>
        </motion.div>
        <motion.div className="arch about-hero__portrait" {...enter(0.1)}>
          <img src={portrait} alt="Miro with his black cat on his shoulder" />
        </motion.div>
      </section>

      <motion.section className="container about-story" aria-labelledby="about-story-title" {...reveal}>
        <h2 id="about-story-title" className="eyebrow about-story__label">The longer version</h2>
        <div className="about-story__body">
          {STORY.map((block, i) => (
            <p key={i}>{block}</p>
          ))}
        </div>
      </motion.section>

      <section className="container about-skills" aria-labelledby="about-skills-title">
        <h2 id="about-skills-title" className="h2">
          What I <em>do</em>
        </h2>
        <ol className="about-skills__grid">
          {SKILLS.map((skill, i) => (
            <motion.li key={skill.title} className="about-skills__cell" {...reveal}>
              <span className="meta" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3">{skill.title}</h3>
              <p className="body">{skill.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="container about-exp" aria-labelledby="about-exp-title">
        <h2 id="about-exp-title" className="h2">Experience</h2>
        <ul className="about-exp__list">
          {EXPERIENCE.map((job) => (
            <motion.li key={`${job.company}-${job.period}`} className="about-exp__row" {...reveal}>
              <span className="about-exp__period">{job.period}</span>
              <div>
                <h3 className="about-exp__company">{job.company}</h3>
                <p className="about-exp__title">{job.title}</p>
              </div>
              <div className="about-exp__desc">
                <p>{job.description}</p>
                <ul className="about-exp__stack" aria-label={`${job.company} technologies`}>
                  {job.stack.map((t) => <li key={t} className="tag">{t}</li>)}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="container about-tech" aria-labelledby="about-tech-title">
        <h2 id="about-tech-title" className="h2">
          Tools I&apos;ve <em>used</em>
        </h2>
        <dl className="about-tech__groups">
          {TECHNOLOGIES.map((g) => (
            <motion.div key={g.group} className="about-tech__group" {...reveal}>
              <dt className="eyebrow">{g.group}</dt>
              <dd>
                <ul className="about-tech__list">
                  {g.items.map((t) => <li key={t} className="tag">{t}</li>)}
                </ul>
              </dd>
            </motion.div>
          ))}
        </dl>
      </section>

      <Footer />
    </div>
  );
};

export default About;
