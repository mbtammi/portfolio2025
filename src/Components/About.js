import React from 'react';
import './About.css';
import { FaCode, FaReact, FaDatabase, FaBusinessTime, FaBrain, FaMicrophone, FaVideo } from 'react-icons/fa'; // Importing React FA icons

const About = () => {
  return (
    <div className="about-container">
      <section className="about-skills">
        {/* <h2>About Me</h2>
        <p>
          Hi, I'm a passionate and dedicated software developer with a journey that began in 2020. I specialize in building exceptional web applications, mastering technologies like <strong>React, TypeScript, JavaScript,</strong> and <strong>CSS</strong>. With expertise in database management and cloud systems, I have a proven track record of delivering robust API solutions and completing entire projects independently.
        </p>
        <p>
          Beyond coding, I'm an entrepreneur at heart. As the co-founder and CEO of a business, I've gained invaluable experience in leading a team, connecting with customers, and mentoring colleagues. My background in business studies has equipped me with the strategic insight to bridge the gap between technology and business needs effectively.
        </p>
        <p>
          Collaboration and communication are my strengths. I've thrived in team environments, successfully guiding projects to completion. My public speaking experience includes presenting for my company and even performing stand-up comedy, which has honed my ability to engage audiences and deliver messages confidently.
        </p>
        <p>
          Recently, I've been focusing on growing my YouTube channel, which has been reaching new milestones. I approach content creation with the same professionalism I bring to software development — writing scripts, filming, and editing videos to create engaging and impactful content.
        </p>
        <p>
          If there's one thing that defines me, it's my work ethic. I'm one of the most hardworking individuals you'll meet, constantly striving to outwork others and deliver results. While I may not always have the perfect solution, my commitment to excellence ensures I will always find a way to succeed.
        </p> */}
        <h2>Skills & Expertise</h2>
        <ul>
          <li>
            <FaCode className="skill-icon" />
            <span className="skill-text">Software Development:</span> Expert in <strong>React, TypeScript, JavaScript, CSS</strong>, and building complete solutions from scratch.
          </li>
          <li>
            <FaReact className="skill-icon" />
            <span className="skill-text">Web Development:</span> Proficient in creating modern and responsive web applications, combining clean code with strong design principles.
          </li>
          <li>
            <FaDatabase className="skill-icon" />
            <span className="skill-text">Database & Cloud Systems:</span> Skilled in managing relational and non-relational databases and deploying cloud-based solutions.
          </li>
          <li>
            <FaBusinessTime className="skill-icon" />
            <span className="skill-text">Leadership & Business Strategy:</span> Experienced as a CEO and team leader, with a solid foundation in business strategy and customer relations.
          </li>
          <li>
            <FaVideo className="skill-icon" />
            <span className="skill-text">Content Creation & Storytelling:</span> Advanced in scriptwriting, video production, and editing to build a successful YouTube channel.
          </li>
          <li>
            <FaMicrophone className="skill-icon" />
            <span className="skill-text">Public Speaking & Performance:</span> Confident speaker with experience in company presentations and stand-up comedy.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
