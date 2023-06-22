import { styled } from 'styled-components';

const Button = styled.div`
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
    text-align: center;
    &:hover {
        background-color: #e6e6e6;
    }
`;

interface ButtonAnswerProp {
    answer: string;
    onClick: () => void;
}

const ButtonAnswer = ({ answer, onClick }: ButtonAnswerProp) => {
    return <Button onClick={onClick}>{answer}</Button>;
};

export default ButtonAnswer;
