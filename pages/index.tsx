import React, { useState } from 'react';
import Background from '../styles/background.module.css';
import Paper from '../styles/paper.module.css';
import Input from '../styles/input.module.css';

const HomePage = () => {
  return (
    <div className={Background.container}>
      <h1>Resume Generator</h1>
      <p>Test</p>
      <TextGenerator />
      <div className={Paper.container}>
        <h1>Austin Cheng</h1>
        <h2>austinjcheng@gmail.com ❖ (562) 569-0311 ❖ github.com/austinjcheng</h2>
        <hr />
        <Projects />
        <Education />
      </div>
    </div>
  );
};

export function TextGenerator() {
  const [responseData, setResponseData] = useState(null);
  const [inputText, setInputText] = useState('This is the input');

      const handleButtonClick = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: inputText })
        };
        
        fetch('./api/openai', requestOptions)
          .then(response => response.json())
          .then(data => setResponseData(data))
          .catch(error => console.error(error));
      };

      const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputText(event.target.value);
      };

  return (
    <div>
      <input className={Input.container} type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Submit</button>
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}


export function ProfessionalExperience() {
  
}

export function TechnicalSkills() {

}

export function Projects() {
  return (
    <>
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
