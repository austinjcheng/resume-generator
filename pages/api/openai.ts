import type { NextApiRequest, NextApiResponse } from 'next'
import TextCompletion from '../../interfaces/TextCompletion'
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const { inputText } = req.body;

  const experience_response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
          },
          body: JSON.stringify(
              {"model": "text-davinci-003", 
              "prompt": `${process.env.OPENAI_EXPERIENCE_PROMPT} ${inputText}`, 
              "temperature": 0.8, 
              "max_tokens": 2000}),
          }
  );
  const experience_data = await experience_response.json();
  const experience_text = experience_data.choices[0].text;

  const skills_response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
          },
          body: JSON.stringify(
              {"model": "text-davinci-003", 
              "prompt": `${process.env.OPENAI_SKILLS_PROMPT} ${inputText}`, 
              "temperature": 0.8, 
              "max_tokens": 2000}),
          }
  );
  const skills_data = await skills_response.json();
  const skills_text = skills_data.choices[0].text;
      
  res.status(200).json([experience_text, skills_text])
}
