import React, {useState} from 'react';
import { motion } from 'framer-motion';  // Import motion
import './Projects.css';
import hyvy from '../Images/hyvy.png'
import kaasalainen from '../Images/kaasalainen.png'
import Once from '../Images/Once-2.png'
import saa from '../Images/saa.png'
import tinkerit from '../Images/tinkerit.png'
import niko from '../Images/niko.png'
import kyssari from '../Images/kyssari.png'
import movit from '../Images/movit.png'
import Modal from './Modal'; // Import the

const projects = [
  {
    name: 'Movit-Integration',
    description: 'Integration between a website and Movit (Private code)',
    codeLink: '',
    longDescription: 'Building a complex integration between multiple taxi companies and a driving management system. Talking a lot with the Movit system admins to get everything working and guiding them on how to proceed in the future to ease the integration process in the future.',
    image: movit,
    stack: ['CSS', 'React', 'RestAPI'],
  },
  {
    name: 'HyvyApp',
    description: 'An app to help students discover their educational paths',
    codeLink: 'https://gitlab.jyu.fi/mbtammi/mteifv1',
    image: hyvy,
    longDescription: 'A project to help student decide their future based on user-provided daily statistics. Build admin user and authentication on this. Lack of time main reason for this project to never see the day light. ',
    stack: ['Typescript', 'MongoDB', 'Firebase'],
  },
  {
    name: 'Niko',
    description: 'Scalable and mobile capable website for a sales practitioner (Private code)',
    codeLink: '',
    longDescription: 'I have built several websites according to customers request and being in touch with the customer on the whole process. Explaining the solutions to the customer and how they can benefit on those.',
    image: niko,
    stack: ['NodeJS', 'React'],
  },
  {
    name: 'Weather App',
    description: 'Single-page app with a REST API to get weather info',
    codeLink: 'https://github.com/mbtammi/fullstack/tree/master/osa2/maidentiedot',
    longDescription: 'Building a weather app with the help of RestAPI to fetch the data from online based on location provided by the user. Great Full Stack experience gained.',
    image: saa,
    stack: ['CSS', 'React', 'RestAPI'],
  },
  {
    name: 'Tinkerit',
    description: 'Developing a scalable website and a business (Private code)',
    codeLink: '',
    longDescription: 'My business co-founded with my university colleagues. I operate as a CEO on this business and handle day to day activities. I also participate in coding processes and guide the other Co-founders on business related topics.',
    image: tinkerit,
    stack: ['Javascript', 'EmailJS'],
  },
  {
    name: 'Eristyspalvelu Kaasalainen',
    description: 'A local insulation service business (Private code)',
    codeLink: '',
    longDescription: 'Building a custom portfolio website for a customer in need. They wanted to simplify the process and proceeded to connect with my company and we delivered quickly and developed a scalable and a reliable website.',
    image: kaasalainen,
    stack: ['RestAPI', 'HTML', 'React', 'CSS'],
  },
  {
    name: 'OnceADay',
    description: 'A habit tracker for Android (In development)',
    codeLink: '',
    longDescription: 'The simplest habit tracker since all the other ones are too complex. Wanted to see how you upload an app to the Play Store.',
    image: Once,
    stack: ['React Native', 'Expo GO'],
  },
  {
    name: 'Future?',
    description: 'I will tell about possible future projects here',
    codeLink: '',
    longDescription: "What should one write here? Always learning new technologies and improving my abilities on the current ones.",
    image: kyssari,
    stack: [],
  }
];

const Projects = () => {

  const [selectedProject, setSelectedProject] = useState(null); // State to manage selected project

  const openModal = (project) => {
    setSelectedProject(project); // Set the selected project
  };

  const closeModal = () => {
    setSelectedProject(null); // Close the modal
  };

  // Get all technologies used across all projects and remove duplicates
  const allTechnologies = [
    ...new Set(projects.flatMap(project => project.stack)) // Flatten stack and remove duplicates using Set
  ];

    return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <p className='project-title-text'>Click on the cards for more info.</p>
      <div className="projects-list">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openModal(project)} // Open modal when clicking a project
          >
            <div className="project-card-header">
              <img src={project.image} alt={project.name} className="project-image" />
              <div className="project-title">
                <h2>{project.name}</h2>
                {project.codeLink && (
                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link">View Code</a>
                )}
              </div>
            </div>
            <p className="project-description">{project.description}</p>
          </motion.div>
        ))}
      </div>

      {/* If a project is selected, show the modal */}
      {selectedProject && <Modal project={selectedProject} closeModal={closeModal} />}
      
      {/* Stack section at the bottom */}
      <motion.div
        className="project-stack"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: projects.length * 0.1 }}
      >
        <h4>Technology used in these projects:</h4>
        <ul>
          {allTechnologies.map((tech, idx) => (
            <li key={idx}>{tech}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Projects;
