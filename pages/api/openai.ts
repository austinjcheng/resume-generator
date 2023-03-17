// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import TextCompletion from '../../interfaces/TextCompletion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TextCompletion>
) {
  const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
          },
          body: JSON.stringify(
              {"model": "text-davinci-003", 
              "prompt": "Give me a lateral thinking riddle ", 
              "temperature": 0.8, 
              "max_tokens": 2000}),
      });
      const data = await response.json();
      console.log(data);
      
  res.status(200).json(data)
}
