import React, {useState} from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import hyvy from '../Images/hyvy.png'
import kaasalainen from '../Images/kaasalainen.png'
import Once from '../Images/Once-2.png'
import saa from '../Images/saa.png'
import tinkerit from '../Images/tinkerit.png'
import niko from '../Images/niko.png'
import kyssari from '../Images/kyssari.png'
import movit from '../Images/movit.png'
import Modal from './Modal';

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
  const [selectedProject, setSelectedProject] = useState(null);
  const [technologies, setTechnologies] = useState([
    ...new Set(projects.flatMap(project => project.stack))
  ]);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const shuffleTechnologies = () => {
    setTechnologies(prevTech => {
      const shuffled = [...prevTech];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.03,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const techStackVariants = {
    hidden: { 
      opacity: 0,
      y: 100
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const techItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="projects-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 
        className="projects-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>
      <motion.p 
        className='project-title-text'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Click on the cards for more info.
      </motion.p>
      <motion.div 
        className="projects-list"
        variants={containerVariants}
      >
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => openModal(project)}
          >
            <div className="project-card-header">
              <motion.img 
                src={project.image} 
                alt={project.name} 
                className="project-image"
                whileHover={{ scale: 1.1, opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
              <div className="project-title">
                <h2>{project.name}</h2>
                {project.codeLink && (
                  <motion.a 
                    href={project.codeLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Code
                  </motion.a>
                )}
              </div>
            </div>
            <p className="project-description">{project.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {selectedProject && <Modal project={selectedProject} closeModal={closeModal} />}
      
      <motion.div
        className="project-stack"
        variants={techStackVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Technology used in these projects:
        </motion.h4>
        <motion.ul>
          {technologies.map((tech, idx) => (
            <motion.li 
              key={tech}
              className="tech-item"
              variants={techItemVariants}
              whileHover="hover"
              custom={idx}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: idx * 0.25
                }
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }
              }}
            >
              {tech}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default Projects;