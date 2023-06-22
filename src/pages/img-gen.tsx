import { useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SubmitButton = styled.button`
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: auto;
`;

interface shuffledQuestion {
    answers: string[];
    question: string;
    answer: string;
    wrongAnswers: string[];
}

interface ImgGenProp {
    shuffledQuestions: shuffledQuestion[];
}

const ImgGen = ({ shuffledQuestions }: ImgGenProp) => {
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const imagePayload = {
            description
        };

        try {
            const { data } = await axios({
                url: '/api/img-gen',
                method: 'POST',
                data: imagePayload
            });
            setImageUrl(data.data.imageUrl);
            setIsSubmitting(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <FormWrapper method="post" onSubmit={handleSubmit}>
            <div>
                <label>Image's description: </label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    disabled={isSubmitting}
                />
            </div>

            <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Generate Image'}
            </SubmitButton>

            {imageUrl ? <img src={imageUrl} /> : null}

            {isSubmitting ? <div>image is creating...</div> : null}
        </FormWrapper>
    );
};

export async function getServerSideProps() {
    return {
        props: {}
    };
}

export default ImgGen;
