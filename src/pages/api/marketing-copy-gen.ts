import openai from '@/utils/openai';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestData {
    copyText?: string;
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RequestData>
) {
    const { description } = req.body;

    const completion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: `You are a marketing expert, and a customer approaches you to write a very short and exciting marketing copy for them. 
                This is the topic for the marketing copy: '${description}.'`,
        temperature: 0.85,
        max_tokens: 40,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    const copyText = completion.data.choices[0].text;
    console.log('HERE IS: completion', copyText);

    if (!copyText) {
        return res.status(500).json({ error: 'No response from OpenAI' });
    }

    res.status(200).json({ copyText });
}
