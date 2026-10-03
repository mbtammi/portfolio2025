import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../data/site';
import Arrow from './Arrow';
import './ProjectDetail.css';

const pad = (n) => String(n).padStart(2, '0');

const hostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

// "Auto-Ranked" -> Auto-<em>Ranked</em>; "Movit integration" -> Movit <em>integration</em>;
// single words get an accent full stop instead.
const Title = ({ name }) => {
  const cut = Math.max(name.lastIndexOf(' '), name.lastIndexOf('-'));
  if (cut <= 0) return <>{name}<span className="accent italic">.</span></>;
  return <>{name.slice(0, cut + 1)}<em className="accent">{name.slice(cut + 1)}</em></>;
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const index = PROJECTS.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return (
      <div className="project-missing container section">
        <p className="eyebrow">404</p>
        <h1 className="display">Project not found<span className="accent italic">.</span></h1>
        <p className="lede">That case study doesn&apos;t exist, or it moved.</p>
        <Link to="/projects" className="btn btn--dark">
          <Arrow direction="left" /> All work
        </Link>
      </div>
    );
  }

  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const contain = project.imageFit === 'contain';

  const enter = (delay = 0) => (reduce ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const facts = [
    { label: 'Category', value: project.meta },
    project.stack?.length && { label: 'Stack', value: project.stack.join(' · ') },
    project.weblink && {
      label: 'Live',
      value: (
        <a href={project.weblink} target="_blank" rel="noopener noreferrer" className="project-fact__link">
          {hostname(project.weblink)} <Arrow direction="out" size={14} />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      ),
    },
    project.codeLink && {
      label: 'Code',
      value: (
        <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-fact__link">
          {hostname(project.codeLink)} <Arrow direction="out" size={14} />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      ),
    },
  ].filter(Boolean);

  const wellClass = [
    'project-hero',
    contain && 'project-hero--contain',
    project.dark && 'project-hero--dark',
  ].filter(Boolean).join(' ');

  return (
    <article className="project" key={project.slug}>
      <header className="project-header container">
        <Link to="/projects" className="text-link project-back">
          <Arrow direction="left" /> All work
        </Link>
        <motion.div className="project-header__title" {...enter()}>
          <p className="eyebrow">Case study {pad(index + 1)}</p>
          <h1 className="project-title"><Title name={project.name} /></h1>
        </motion.div>
        <motion.dl className="project-facts" style={{ '--project-fact-count': facts.length }} {...enter(0.1)}>
          {facts.map((f) => (
            <div key={f.label} className="project-fact">
              <dt className="meta project-fact__label">{f.label}</dt>
              <dd className="project-fact__value">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </header>

      <motion.div className="container" {...enter(0.2)}>
        <div className={wellClass}>
          <img src={project.image} alt={`${project.name} ${contain ? 'logo' : 'screenshot'}`} />
        </div>
      </motion.div>

      <section className="project-story container section" aria-labelledby="project-idea">
        <h2 id="project-idea" className="project-story__heading">The idea</h2>
        <p className="project-story__text">{project.longDescription}</p>
      </section>

      <div className="project-next-wrap">
        <Link to={`/projects/${next.slug}`} className="project-next">
          <span className="project-next__text">
            <span className="project-next__eyebrow">Next project</span>
            <span className="project-next__name">{next.name}</span>
          </span>
          <Arrow size={56} />
        </Link>
      </div>
    </article>
  );
};

export default ProjectDetail;
