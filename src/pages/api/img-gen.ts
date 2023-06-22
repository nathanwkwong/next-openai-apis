import openai from '@/utils/openai';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { description, size } = req.body;
    const imageSize = size === 'large' ? '512x512' : '256x256';

    try {
        const response = await openai.createImage({
            prompt: description,
            n: 1, // number of images to generate
            size: imageSize
        });

        const imageUrl = response.data.data[0].url;

        if (!imageUrl) {
            res.status(500).json({ error: 'No response from OpenAI' });
            return;
        }
        res.status(200).json({ success: true, data: { imageUrl } });
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        res.status(500).json({
            success: false,
            error: 'The image could not be generated'
        });
    }
}
