import React from 'react';
import { motion } from 'framer-motion'; // For animation
import './Modal.css'; // Create a separate CSS file for styling

const Modal = ({ project, closeModal }) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={closeModal}
    >
      <motion.div
        className="modal-content"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="modal-header">
          <h2>{project.name}</h2>
          <button className="close-btn" onClick={closeModal}>X</button>
        </div>
        <div className="modal-body">
          <p>{project.longDescription}</p>
          <div className="modal-stack">
            <h4>Technology used:</h4>
            <ul>
              {project.stack.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>
          {project.codeLink && (
            <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="modal-link">View Code</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
