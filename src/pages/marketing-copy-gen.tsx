import { useState } from 'react';
import Container from '@/components/Container';
import Main from '@/components/Main';
import axios from 'axios';
import SubmitButton from '@/components/ButtonSubmit';
import { styled } from 'styled-components';

const TextareaStyled = styled.textarea`
    padding: 0.5rem;
    height: 5rem;
    width: 100%;
`;

const CardAnswer = styled.div`
    width: 300px;
`;

const MarketingCopy = () => {
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestedText, setSuggestedText] = useState('');

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const payload = {
            description
        };

        try {
            const { data } = await axios({
                url: '/api/marketing-copy-gen',
                method: 'POST',
                data: payload
            });

            setSuggestedText(data.copyText);
            setIsSubmitting(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Container>
            <Main>
                <TextareaStyled
                    placeholder="Enter your product name"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <SubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}>
                    {isSubmitting ? 'Submitting...' : 'Generate Image'}
                </SubmitButton>
                <CardAnswer>
                    <h3>Your marketing copy suggestion:</h3>
                    <p>{suggestedText}</p>
                </CardAnswer>
            </Main>
        </Container>
    );
};

export async function getServerSideProps() {
    return {
        props: {}
    };
}

export default MarketingCopy;
