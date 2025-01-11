import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import { FaInstagram, FaYoutube, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'; // Import FaIcons, including FaEnvelope

const Navigation = () => {
  return (
    <nav className="navigation">
      {/* Name on the left */}
      <div className="name">
        <span>MIRO</span>
      </div>

      {/* Navigation links in the center */}
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className="nav-item"
            activeClassName="active" // Add active class for the active link
          >
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/about"
            className="nav-item"
            activeClassName="active" // Add active class for the active link
          >
            About
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/projects"
            className="nav-item"
            activeClassName="active" // Add active class for the active link
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/youtube"
            className="nav-item"
            activeClassName="active" // Add active class for the active link
          >
            YouTube
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/links"
            className="nav-item"
            activeClassName="active" // Add active class for the active link
          >
            Links
          </NavLink>
        </li>
      </ul>

      {/* Social media links on the right */}
      <div className="navigation-social-links">
        <a
          href="https://www.instagram.com/mirotammi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="link-icon-nav" />
        </a>
        <a
          href="https://www.youtube.com/@MiroTrying"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="link-icon-nav" />
        </a>
        <a
          href="https://www.linkedin.com/in/yourlinkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="link-icon-nav" />
        </a>
        <a
          href="mailto:mirotammi44@gmail.com" // Link to send email
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className="link-icon-nav" />
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
