import styled, { css } from 'styled-components';
import React, { useState } from 'react';

const Input = styled.input`
  ${props => css`
  height: 100px;
  `}
`;

const Container = styled.div`
  ${props => css`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, #d3959b, #bfe6ba);
`}
`;

const HomePage = () => {
  
  return (
    <Container>
      <h1>Test</h1>
      <Traits />
    </Container>
  );
};

export function Traits() {
  const [responseData, setResponseData] = useState(null);
  const [inputText, setInputText] = useState('This is the input');

      const handleButtonClick = async () => {
        const key = process.env.OPENAI_KEY;
      const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + {key},
          },
          body: JSON.stringify(
              {"model": "text-davinci-003", 
              "prompt": "Give me a lateral thinking riddle ", 
              "temperature": .8, 
              "max_tokens": 2000}),
      });
      const data = await response.json();
      setResponseData(data);
      };

      const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputText(event.target.value);
      };

  return (
    <div>
      <Input type="text" value={inputText} onChange={handleInputChange} />
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

export default HomePage;
