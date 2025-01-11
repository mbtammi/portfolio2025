import React from 'react';
import './Links.css';
import { FaInstagram, FaYoutube, FaLinkedin, FaGithub, FaLink } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import Framer Motion

const Links = () => {
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Staggered animation for each item
        type: 'spring',
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.div
      className="links-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="links-title">Links</h1>
      <ul className="links-list">
        {[
          {
            name: 'Tinkerit',
            description: 'My company website',
            href: 'https://www.tinkerit.fi/',
            icon: <FaLink />,
          },
          {
            name: 'mirotrying',
            description: 'Watch my Youtube',
            href: 'https://www.youtube.com/@mirotrying',
            icon: <FaYoutube />,
          },
          {
            name: 'LinkedIn',
            description: 'Professional network',
            href: 'https://www.linkedin.com/in/miro-tammi-701bb3205/',
            icon: <FaLinkedin />,
          },
          {
            name: 'mirotammi',
            description: 'Follow my instagram',
            href: 'https://www.instagram.com/mirotammi/',
            icon: <FaInstagram />,
          },
          {
            name: 'GitHub',
            description: 'Check my code',
            href: 'https://github.com/mbtammi',
            icon: <FaGithub />,
          },
        ].map((link, index) => (
          <motion.li
            key={link.name}
            className="link-item"
            custom={index}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <div className="link-content">
                <span className="link-name">{link.name}</span>
                <span className="link-description">{link.description}</span>
                <div className="link-icon">{link.icon}</div>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Links;
