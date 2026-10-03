import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Arrow from './Arrow';
import { EMAIL, CALENDLY_URL, SOCIALS } from '../data/site';
import './Contact.css';

const SERVICE_ID = 'service_g0zbdtm';
const TEMPLATE_ID = 'template_nid9r2a';
const USER_ID = 'cZ263R-BKLX5meEdu';

const TOPICS = ['A project', 'A job', 'UGC / brand', 'Something else'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINKEDIN = SOCIALS.find((s) => s.label === 'LinkedIn')?.href;

const CHANNELS = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  LINKEDIN && { label: 'LinkedIn', value: 'Miro Tammi', href: LINKEDIN, external: true },
  { label: 'Call', value: 'Book a call', href: CALENDLY_URL, external: true },
].filter(Boolean);

const validate = ({ name, email, message }) => {
  const errors = {};
  if (!name.trim()) errors.name = 'Please tell me your name.';
  if (!email.trim()) errors.email = 'Please add your email so I can reply.';
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'That email address doesn’t look right.';
  if (!message.trim()) errors.message = 'Please write a short message.';
  return errors;
};

const Contact = () => {
  const reduce = useReducedMotion();
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [topic, setTopic] = useState(TOPICS[0]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const doneRef = useRef(null);

  // The form unmounts on success, so move focus to the confirmation instead of losing it to <body>.
  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus();
  }, [status]);

  const enter = (delay = 0) => (reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(values);
    setErrors(found);
    const first = ['name', 'email', 'message'].find((k) => found[k]);
    if (first) {
      refs[first].current?.focus();
      return;
    }
    setStatus('sending');
    // Same template variables as the old form: to_name (sender's name), from_name (sender's email), message.
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        to_name: values.name.trim(),
        from_name: values.email.trim(),
        message: `[Topic: ${topic}]\n\n${values.message.trim()}`,
      }, USER_ID)
      .then(() => setStatus('sent'), () => setStatus('error'));
  };

  const fieldProps = (key) => ({
    id: `contact-${key}`,
    name: key,
    ref: refs[key],
    value: values[key],
    onChange,
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    className: `input${errors[key] ? ' contact-input--invalid' : ''}`,
  });

  const fieldError = (key) => errors[key] && (
    <p id={`contact-${key}-error`} className="contact-error">{errors[key]}</p>
  );

  const sending = status === 'sending';

  return (
    <div className="contact container">
      <motion.div className="contact-intro" {...enter()}>
        <p className="eyebrow">Contact</p>
        <h1 className="contact-title">Say <em className="accent">hello.</em></h1>
        <p className="lede">
          A project, a role, a brand collab, or just a question about the cat. I read everything and usually
          reply within a couple of days.
        </p>
        <ul className="contact-channels">
          {CHANNELS.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                className="contact-channel"
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="meta contact-channel-label">{c.label}</span>
                <span className="contact-channel-value">
                  {c.value}
                  {c.external && <Arrow direction="out" />}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div className="contact-card" {...enter(0.1)}>
        {status === 'sent' ? (
          <div className="contact-done" role="status">
            <h2 ref={doneRef} tabIndex={-1} className="contact-card-title">Thanks — message sent.</h2>
            <p className="lede">I&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="contact-card-title">Send a message</h2>

            <div className="contact-row">
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
                {fieldError('name')}
              </div>
              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input type="email" autoComplete="email" placeholder="you@company.com" {...fieldProps('email')} />
                {fieldError('email')}
              </div>
            </div>

            <fieldset className="contact-topics">
              <legend>What&apos;s it about?</legend>
              <div className="contact-chips">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="chip"
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea placeholder="Tell me a bit about it" {...fieldProps('message')} />
              {fieldError('message')}
            </div>

            {status === 'error' && (
              <p className="contact-alert" role="alert">
                Something went wrong sending that. Please try again, or email me directly at{' '}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            )}

            <div className="contact-actions">
              <p className="contact-hint">All fields required.</p>
              <button type="submit" className="btn btn--primary" disabled={sending} aria-disabled={sending}>
                {sending ? 'Sending…' : <>Send message <Arrow /></>}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;
