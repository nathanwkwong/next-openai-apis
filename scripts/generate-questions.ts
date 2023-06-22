import openai from '../src/utils/openai';

import fs from 'fs';

const fsPromise = fs.promises;

const answerShape = [
    {
        question: "Who is Luke Skywalker's father?",
        answer: 'Darth Vader',
        wrongAnswers: ['Obi-Wan Kenobi', 'Emperor Palpatine', 'Yoda']
    }
];

const genQuestions = async () => {
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
        console.log('No response from OpenAI');
        return;
    }

    await fsPromise.writeFile(
        './src/data/questions.json',
        JSON.stringify(JSON.parse(questions), null, 2)
    );
};

genQuestions();

export default genQuestions;
