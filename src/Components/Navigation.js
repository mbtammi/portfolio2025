import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

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
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            Work
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/youtube"
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            YouTube
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/links"
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            Links
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/codertype"
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            CoderType
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
          href="https://www.linkedin.com/in/miro-tammi-701bb3205/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="link-icon-nav" />
        </a>
        <a
          href="mailto:mirotammi44@gmail.com"
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
