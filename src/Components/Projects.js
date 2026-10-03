import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS, CATEGORIES } from '../data/site';
import Arrow from './Arrow';
import Footer from './Footer';
import './Projects.css';

const pad = (n) => String(n).padStart(2, '0');

const ProjectImage = ({ project, featured }) => {
  const contain = project.imageFit === 'contain';
  const wellClass = [
    'projects-well',
    featured && 'projects-well--featured',
    contain && 'projects-well--contain',
    project.dark && 'projects-well--dark',
  ].filter(Boolean).join(' ');
  return (
    <div className={wellClass}>
      <img src={project.image} alt="" loading="lazy" />
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const reduce = useReducedMotion();

  const counts = useMemo(() => {
    const c = {};
    PROJECTS.forEach((p) => { c[p.category] = (c[p.category] || 0) + 1; });
    return c;
  }, []);

  const visible = PROJECTS
    .map((p, i) => ({ ...p, number: pad(i + 1) }))
    .filter((p) => filter === 'all' || p.category === filter);
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);

  const enter = (delay = 0) => (reduce ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const chips = [{ id: 'all', label: 'All', count: PROJECTS.length }]
    .concat(CATEGORIES.map((c) => ({ ...c, count: counts[c.id] || 0 })));

  return (
    <div className="projects">
      <header className="projects-header container">
        <motion.div className="projects-header__title" {...enter()}>
          <p className="eyebrow">{PROJECTS.length} projects · 2020 → now</p>
          <h1 className="h1">Work<span className="accent italic">.</span></h1>
        </motion.div>
        <motion.p className="lede projects-header__lede" {...enter(0.1)}>
          Products I&apos;ve launched, sites I&apos;ve built for clients, and experiments that taught me something.
        </motion.p>
      </header>

      <div className="container">
        <div className="projects-filters" role="group" aria-label="Filter projects by category">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.label} · {c.count}
            </button>
          ))}
        </div>
        <p className="visually-hidden" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
      </div>

      <section className="projects-list container" aria-label="Projects">
        {featured && (
          <motion.div key={`featured-${filter}`} {...enter(0.15)}>
            <Link to={`/projects/${featured.slug}`} className="projects-featured">
              <ProjectImage project={featured} featured />
              <div className="projects-featured__body">
                <p className="meta projects-num">{featured.number} — {featured.meta}</p>
                <h2 className="projects-featured__name">{featured.name}</h2>
                <p className="projects-featured__tagline">{featured.tagline}</p>
                <ul className="projects-tags" aria-label="Stack">
                  {featured.stack.map((s) => <li key={s} className="tag">{s}</li>)}
                </ul>
                <span className="projects-featured__cta">Read case study <Arrow /></span>
              </div>
            </Link>
          </motion.div>
        )}

        {rest.length > 0 && (
          <ul className="projects-grid">
            {rest.map((p, i) => (
              <motion.li key={`${filter}-${p.slug}`} {...enter(reduce ? 0 : 0.15 + Math.min(i, 5) * 0.05)}>
                <Link to={`/projects/${p.slug}`} className="projects-card">
                  <ProjectImage project={p} />
                  <p className="meta projects-num">{p.number} — {p.meta}</p>
                  <h2 className="h3 projects-card__name">{p.name}</h2>
                  <p className="body">{p.tagline}</p>
                  <p className="meta">{p.stack.join(' · ')}</p>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </section>

      <Footer title={<>Got a project <em className="footer__em">in mind?</em></>} />
    </div>
  );
};

export default Projects;
