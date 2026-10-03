import autoRanked from '../Images/auto-ranked-real.png';
import globe from '../Images/globe.png';
import flexliving from '../Images/flexliving.png';
import movit from '../Images/movit.png';
import onceADay from '../Images/Once-2.png';
import tinkerit from '../Images/tinkerit.png';
import hyvy from '../Images/hyvy.png';
import niko from '../Images/niko.png';
import kaasalainen from '../Images/kaasalainen.png';
import weather from '../Images/saa.png';
import portrait from '../Images/Miro2.webp';
import celsius from '../Images/brandlogos/Celsius.jpeg';
import oneplus from '../Images/brandlogos/oneplus.png';
import onthatass from '../Images/brandlogos/onthatass.png';

export { portrait };

export const EMAIL = 'mirotammi44@gmail.com';
export const CALENDLY_URL = 'https://calendly.com/mirotammi44/30min';

export const SOCIALS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@mirotrying' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/miro-tammi-701bb3205/' },
  { label: 'GitHub', href: 'https://github.com/mbtammi' },
  { label: 'Instagram', href: 'https://www.instagram.com/mirotammi/' },
];

export const TIKTOK_URL = 'https://www.tiktok.com/@mirotrying';
export const YOUTUBE_URL = 'https://www.youtube.com/@mirotrying';

// Static fallbacks; the YouTube page shows live numbers when the API responds.
export const STATS = [
  { value: '7', label: 'years coding' },
  { value: '10+', label: 'projects shipped' },
  { value: '3.6k', label: 'YouTube subscribers' },
  { value: '180K+', label: 'monthly views across socials', accent: true },
];

export const BRANDS = [
  { name: 'Celsius', logo: celsius },
  { name: 'OnePlus', logo: oneplus },
  { name: 'OnThatAss', logo: onthatass },
];

export const CATEGORIES = [
  { id: 'product', label: 'Products' },
  { id: 'client', label: 'Client work' },
  { id: 'experiment', label: 'Experiments' },
];

// imageFit 'contain' = logo-like image shown small on a tinted well.
export const PROJECTS = [
  {
    slug: 'auto-ranked',
    name: 'Auto-Ranked',
    category: 'product',
    meta: 'Product · Live',
    tagline: 'A YouTube optimizer: plan content, sharpen titles and move faster from idea to publish.',
    longDescription:
      'Auto-Ranked is a YouTube optimizer: plan content, sharpen titles, and move faster from idea to publish. I built it because I needed it for my own channel.',
    image: autoRanked,
    imageFit: 'contain',
    dark: true,
    stack: ['React', 'AI', 'YouTube'],
    weblink: 'https://auto-ranked.com',
    featured: true,
  },
  {
    slug: 'worldofthemaps',
    name: 'WorldOfTheMaps',
    category: 'product',
    meta: 'Product · Live',
    tagline: 'Wordle for maps. Guess the country, get hints by distance.',
    longDescription:
      'A daily game inspired by Wordle, but for maps. You guess the country from the map shown and get hints based on how close each guess is. Built with React and a custom API for map and country data.',
    image: globe,
    stack: ['Vite', 'React', 'Globe.gl'],
    weblink: 'https://worldofthemaps.com',
  },
  {
    slug: 'flexliving',
    name: 'Flexliving',
    category: 'experiment',
    meta: 'Experiment · Open source',
    tagline: "Review apartments and validate other people's reviews.",
    longDescription:
      'A web app for reviewing apartments and validating the reviews of others. Built with Next.js and Tailwind CSS, deployed on Vercel.',
    image: flexliving,
    stack: ['Next.js', 'Tailwind', 'Vercel'],
    codeLink: 'https://github.com/mbtammi/flexliving',
  },
  {
    slug: 'tinkerit',
    name: 'Tinkerit',
    category: 'client',
    meta: 'Company · CEO',
    tagline: 'Co-founded with university friends. Ran the business, wrote code.',
    longDescription:
      'The company I co-founded with university colleagues. As CEO I handled the day-to-day, took part in development, and guided the other co-founders on the business side.',
    image: tinkerit,
    stack: ['JavaScript', 'EmailJS'],
    weblink: 'https://tinkerit.fi',
  },
  {
    slug: 'movit',
    name: 'Movit integration',
    category: 'client',
    meta: 'Client work',
    tagline: 'Connecting several taxi companies to one dispatch system.',
    longDescription:
      'A complex integration between multiple taxi companies and a driving management system. Lots of work with the Movit admins to get everything running, and guidance on how to make future integrations easier.',
    image: movit,
    imageFit: 'contain',
    stack: ['React', 'REST API'],
  },
  {
    slug: 'onceaday',
    name: 'OnceADay',
    category: 'product',
    meta: 'Product · Play Store',
    tagline: 'The simplest habit tracker, because the others were too complex.',
    longDescription:
      'The simplest habit tracker, since all the other ones are too complex. Also a way to learn how publishing to the Play Store works.',
    image: onceADay,
    stack: ['React Native', 'Expo'],
    weblink: 'https://play.google.com/store/apps/details?id=com.mirotrying.mironappsimple',
  },
  {
    slug: 'kaasalainen',
    name: 'Eristyspalvelu Kaasalainen',
    category: 'client',
    meta: 'Client work · Live',
    tagline: 'A fast, reliable site for a local insulation business.',
    longDescription:
      'A custom website for a local insulation business. They wanted a simple process; we delivered quickly with a scalable, reliable site.',
    image: kaasalainen,
    stack: ['React', 'REST API'],
    weblink: 'https://www.eristys.fi/',
  },
  {
    slug: 'niko',
    name: 'Niko',
    category: 'client',
    meta: 'Client work',
    tagline: 'A mobile-ready site for a sales practitioner.',
    longDescription:
      'A scalable, mobile-ready website built to the customer’s brief, with close contact throughout and clear explanations of how each solution helps them.',
    image: niko,
    stack: ['Node.js', 'React'],
  },
  {
    slug: 'hyvyapp',
    name: 'HyvyApp',
    category: 'experiment',
    meta: 'Experiment',
    tagline: 'Helping students pick their educational path from daily stats.',
    longDescription:
      'A project to help students decide their future based on daily statistics they provide. I built the admin user and authentication; it never launched for lack of time.',
    image: hyvy,
    imageFit: 'contain',
    stack: ['TypeScript', 'MongoDB', 'Firebase'],
    codeLink: 'https://gitlab.jyu.fi/mbtammi/mteifv1',
  },
  {
    slug: 'weather-app',
    name: 'Weather app',
    category: 'experiment',
    meta: 'Experiment · Open source',
    tagline: 'Single-page app pulling live weather from a REST API.',
    longDescription:
      'A weather app that fetches live data from a REST API for the location the user enters. Great full-stack practice.',
    image: weather,
    imageFit: 'contain',
    stack: ['React', 'REST API'],
    codeLink: 'https://github.com/mbtammi/fullstack/tree/master/osa2/maidentiedot',
  },
];

export const EXPERIENCE = [
  { company: 'Rewize', period: '2026/05 — now', title: 'Full-stack Engineer', description: 'Building the Rewize product end to end, from Python data pipelines to the React web app.', stack: ['Python', 'React', 'TypeScript', 'MongoDB', 'BigQuery', 'GCP', 'Prefect'] },
  { company: 'Tinkerit', period: '2023/07 — now', title: 'Chief Executive Officer', description: 'Building a company from the ground up with three co-founders. Customer outreach, integrations, team management.', stack: ['Business Development', 'Team Management', 'Integration APIs', 'Project Management'] },
  { company: 'Tietoevry', period: '2024/06 — 2025/04', title: 'Mobile Developer', description: 'A custom mobile app for a large dairy company.', stack: ['React Native', 'TypeScript', 'Azure', 'Git'] },
  { company: 'Woolman', period: '2023/05 — 2024/05', title: 'Full-stack Developer', description: 'Shopify online stores for customers.', stack: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'HTML'] },
  { company: 'Webso', period: '2023/01 — 2023/05', title: 'Software Developer', description: 'IT products for customers in an agile startup.', stack: ['Agile', 'JavaScript', 'React', 'Node.js', 'Git'] },
  { company: 'Nordea', period: '2022/05 — 2022/09', title: 'IT Developer', description: 'Performance testing and features on the mobile banking app.', stack: ['Performance Testing', 'Mobile Development', 'Java', 'Android', 'Testing Frameworks'] },
  { company: 'University of Jyväskylä', period: '2022 — 2023', title: 'Programming Course Advisor', description: 'Helped students with weekly tasks; created and supervised the course exam.', stack: ['Python', 'Java', 'Teaching', 'Mentoring', 'Algorithm Design'] },
];

// Everything from the old Work page's technology list, grouped.
export const TECHNOLOGIES = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'HTML', 'CSS', 'Liquid'] },
  { group: 'Frameworks', items: ['React', 'React Native', 'Next.js', 'Node.js', 'Vite', 'Expo', 'Tailwind CSS', 'Shopify', 'Globe.gl'] },
  { group: 'Data & cloud', items: ['MongoDB', 'BigQuery', 'Firebase', 'GCP', 'Azure', 'Vercel', 'Prefect', 'REST APIs', 'EmailJS'] },
  { group: 'Practice', items: ['Git', 'Agile', 'Android', 'Performance Testing', 'Testing Frameworks', 'Algorithm Design', 'Integration APIs', 'Project Management', 'Team Management', 'Business Development', 'Teaching', 'Mentoring'] },
];
