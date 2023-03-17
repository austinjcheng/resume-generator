import React, { useState, useRef, useEffect } from 'react';
import backgroundStyle from '../styles/background.module.css';
import paperStyle from '../styles/paper.module.css';
import inputStyle from '../styles/input.module.css';
import Typed from 'typed.js';

const HomePage = () => {
  return (
    <div className={backgroundStyle.container}>
      <h1>Resume Generator</h1>
      <p>Test</p>
      <StateContainer />
    </div>
  );
};

export function StateContainer() {
  const [experienceText, setExperienceText] = useState('{}');
  const [skillsText, setSkillsText] = useState('{}');

  const setSkills = (newText: string) => {
    console.log(`Skills set to ${newText}`);
    setSkillsText(newText);
  };

  const setExperience = (newText: string) => {
    console.log(`Experience set to ${newText}`);
    setExperienceText(newText);
  };

  return (
    <>
      <TextGenerator setSkills={setSkills} setExperience={setExperience}/>
          <div className={paperStyle.container}>
            <h1>Austin Cheng</h1>
            <h2>austinjcheng@gmail.com ❖ (562) 569-0311 ❖ github.com/austinjcheng</h2>
            <hr />
            <ProfessionalExperience content={experienceText}/>
            <Projects />
            <TechnicalSkills content={skillsText}/>
            <Education />
          </div>
    </>
  )
}

export function TextGenerator(props: any) {
  const [responseData, setResponseData] = useState(null);
  const [inputText, setInputText] = useState('Input Job Description Here');
  const setSkills = props.setSkills;
  const setExperience = props.setExperience;

  const handleButtonClick = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: inputText })
    };
    
    fetch('./api/openai', requestOptions)
      .then(response => response.json())
      .then(data => {
        setResponseData(data);
        setSkills(data);
        setExperience(data);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <input className={inputStyle.container} type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Submit</button>
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <pre>{responseData}</pre>
        </div>
      )}
    </div>
  );
}

type Content = {
  content: string;
}

export function ProfessionalExperience(props: Content) {
  const typedEl = useRef(null);
  const text = props.content;

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [text],
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, [props, text]);
  
  return (
    <>
      <h1>Professional Experience</h1>
      <span ref={typedEl} />
    </>
  )
}

export function TechnicalSkills(props: Content) {
  const typedEl = useRef(null);
  const text = props.content;
  
  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [text],
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, [props, text]);
  
  return (
    <>
      <hr />
      <h1>Technical Skills</h1>
      <span ref={typedEl} />
    </>
  )
}

export function Projects() {
  return (
    <>
      <hr />
      <h1>Projects</h1>
      <h2>Ecommerce Web App</h2>
      <ul>
        <li>Leveraged expertise in TypeScript and Next.js to develop an ecommerce website that combines multiple microservices.</li>
        <li>Integrated RESTful APIs, including a Stripe payment process microservice written in Java Spring, a product catalog microservice using MySQL database and ASP.NET, and a shopping cart microservice using Python and Django.</li>
        <li>Deployed the website onto Microsoft Azure using Docker and a CI/CD pipeline, ensuring consistent and reliable deployment and delivery of new features and updates.</li>
        <li>Implemented Jest-based unit tests to validate application code and improve software quality.</li>
      </ul>
      <h2>Resume Generator</h2>
      <ul>
        <li>Created a ChatGPT-powered Next.js app that generates job-tailored resumes to showcase matching skills</li>
      </ul>
    </>
  )
}

export function Education() {
  return (
    <>
      <hr />
      <h1>Education</h1>
      <h2>M.S. Computer Science</h2>
      <p>New York University, Tandon School of Engineering</p>
      <h2>B.S. Computer Science</h2>
      <p>California State University, Long Beach</p>
    </>
  )
}

export default HomePage;
