import type { NextApiRequest, NextApiResponse } from 'next'
import TextCompletion from '../../interfaces/TextCompletion'
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TextCompletion>
) {
  const { inputText } = req.body;

  const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
          },
          body: JSON.stringify(
              {"model": "text-davinci-003", 
              "prompt": `${process.env.OPENAI_PROMPT} ${inputText}`, 
              "temperature": 0.8, 
              "max_tokens": 2000}),
          }
  );
  const data = await response.json();
  const text = data.choices[0].text;
      
  res.status(200).json(text)
}
