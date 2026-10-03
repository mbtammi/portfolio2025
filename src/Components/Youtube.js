import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Arrow from './Arrow';
import Footer from './Footer';
import { BRANDS, STATS, YOUTUBE_URL } from '../data/site';
import { fetchYouTube, formatCount, formatDuration } from '../lib/youtube';
import './Youtube.css';

const FALLBACK_SUBSCRIBERS = STATS.find((s) => s.label === 'YouTube subscribers')?.value || '3.6k';
const GRID_COUNT = 6;

const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : dateFormat.format(d);
};

let warned = false;
const warnOnce = (reason) => {
  if (warned) return;
  warned = true;
  // eslint-disable-next-line no-console
  console.warn('[YouTube] showing fallback:', reason);
};

const PlayIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5l12 7-12 7z" />
  </svg>
);

const FeaturedVideo = ({ video, status }) => {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  if (status === 'loading') {
    return <div className="youtube-featured youtube-skeleton" aria-hidden="true" />;
  }

  if (!video) {
    return (
      <a className="youtube-featured youtube-featured--empty" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
        <span className="youtube-play"><PlayIcon /></span>
        <span className="youtube-featured__label">Watch on YouTube</span>
      </a>
    );
  }

  if (playing) {
    return (
      <div className="youtube-featured">
        <iframe
          ref={frameRef}
          className="youtube-featured__frame"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="youtube-featured youtube-featured--facade" onClick={() => setPlaying(true)}
      aria-label={`Play video: ${video.title}`}>
      <img className="youtube-featured__thumb" src={video.thumbnail} alt="" />
      <span className="youtube-play"><PlayIcon /></span>
      <span className="youtube-featured__caption">
        <span className="youtube-featured__kicker">Latest video · {formatDuration(video.durationSeconds)}</span>
        <span className="youtube-featured__title">{video.title}</span>
      </span>
    </button>
  );
};

const VideoCard = ({ video }) => (
  <a className="youtube-card" href={watchUrl(video.id)} target="_blank" rel="noopener noreferrer">
    <div className="youtube-card__thumb">
      {video.thumbnail && <img src={video.thumbnail} alt="" loading="lazy" />}
      <span className="youtube-card__duration">{formatDuration(video.durationSeconds)}</span>
    </div>
    <h3 className="youtube-card__title">{video.title}</h3>
    {video.publishedAt && (
      <time className="youtube-card__date" dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
    )}
  </a>
);

const Youtube = () => {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchYouTube({ signal: controller.signal })
      .then((result) => {
        setData(result);
        setStatus(result.videos.length ? 'ready' : 'empty');
        if (!result.videos.length) warnOnce('no long-form videos returned');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        warnOnce(err.message);
        setStatus('error');
      });
    return () => controller.abort();
  }, []);

  const videos = data?.videos || [];
  const gridVideos = videos.slice(1, GRID_COUNT + 1);
  const subscribers = data?.channel?.subscribers ? formatCount(data.channel.subscribers) : FALLBACK_SUBSCRIBERS;
  // Lifetime channel views, live from the API only; hidden when the API is unavailable.
  const totalViews = data?.channel?.views ? formatCount(data.channel.views) : null;

  const rise = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <div className="youtube-page">
      <section className="container youtube-hero">
        <motion.div className="youtube-hero__copy" {...rise()}>
          <p className="eyebrow">YouTube · @mirotrying</p>
          <h1 className="youtube-hero__title">
            miro<em className="accent">trying</em>
          </h1>
          <p className="lede">
            Tech, productivity and life as a software engineer. Scripted, filmed and edited by me, usually with the
            cat in frame.
          </p>
          <dl className="youtube-hero__stats">
            <div>
              <dt className="stat-label">subscribers</dt>
              <dd className="youtube-hero__stat">{subscribers}</dd>
            </div>
            {totalViews && (
              <div>
                <dt className="stat-label">total views</dt>
                <dd className="youtube-hero__stat accent">{totalViews}</dd>
              </div>
            )}
          </dl>
          <div className="youtube-hero__actions">
            <a className="btn btn--primary" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              Subscribe on YouTube
            </a>
            <Link className="btn btn--secondary" to="/ugc">Brand deals</Link>
          </div>
        </motion.div>
        <motion.div className="youtube-hero__media" {...rise(0.15)}>
          <FeaturedVideo video={videos[0]} status={status} />
        </motion.div>
      </section>

      <section className="container youtube-latest" aria-labelledby="youtube-latest-title">
        <div className="youtube-latest__head">
          <h2 id="youtube-latest-title" className="h2">
            Latest <em>videos</em>
          </h2>
          <a className="text-link" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
            Open channel <Arrow direction="out" />
          </a>
        </div>

        {status === 'loading' && (
          <div className="youtube-grid" aria-busy="true" aria-label="Loading videos">
            {Array.from({ length: GRID_COUNT }, (_, i) => (
              <div key={i} className="youtube-card youtube-card--skeleton" aria-hidden="true">
                <div className="youtube-card__thumb youtube-skeleton" />
                <div className="youtube-skeleton youtube-skeleton__line" />
                <div className="youtube-skeleton youtube-skeleton__line youtube-skeleton__line--short" />
              </div>
            ))}
          </div>
        )}

        {status === 'ready' && gridVideos.length > 0 && (
          <div className="youtube-grid">
            {gridVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {(status === 'error' || status === 'empty' || (status === 'ready' && gridVideos.length === 0)) && (
          <div className="youtube-fallback">
            <div>
              <h3 className="h3">Watch the latest videos on YouTube</h3>
              <p className="body">New uploads land on the channel first. Come say hi in the comments.</p>
            </div>
            <a className="btn btn--dark" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              Open channel <Arrow direction="out" />
            </a>
          </div>
        )}
      </section>

      <section className="container" aria-label="Brands I've worked with">
        <div className="youtube-brands">
          <p className="eyebrow youtube-brands__label">Brands I&apos;ve worked with</p>
          <ul className="youtube-brands__logos">
            {BRANDS.map((brand) => (
              <li key={brand.name}>
                <img src={brand.logo} alt={brand.name} />
              </li>
            ))}
          </ul>
          <Link className="text-link youtube-brands__cta" to="/ugc">
            Work with me <Arrow />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Youtube;
