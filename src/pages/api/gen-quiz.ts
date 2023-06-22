import openai from '@/utils/openai';
import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';

const fsPromise = fs.promises;

const answerShape = [
    {
        question: 'What is a callback function in JavaScript?',
        answer: 'A function passed as an argument to another function',
        wrongAnswers: [
            'A type of loop',
            'A form of object',
            'A collection of variables'
        ]
    }
];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `
                generate 10 trivia questions for JavaScript with answers. 
                include wrong answers format the response as JSON in the shape of:
                 ${JSON.stringify(answerShape)}
                `
            }
        ]
    });
    const questions = completion.data.choices[0].message?.content;

    if (!questions) {
        return res.status(500).json({ error: 'No response from OpenAI' });
    }

    await fsPromise.writeFile(
        './src/data/questions.json',
        JSON.stringify(JSON.parse(questions), null, 2)
    );

    res.status(200).json({ responseObj: JSON.parse(questions) });
}
