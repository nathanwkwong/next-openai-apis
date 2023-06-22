import questions from '@/data/questions.json';
import ButtonAnswer from '@/components/ButtonAnswer';
import { useState } from 'react';
import Container from '@/components/Container';
import Main from '@/components/Main';
import Question from '@/components/Question';

interface shuffledQuestion {
    answers: string[];
    question: string;
    answer: string;
    wrongAnswers: string[];
}

interface JsQuizProp {
    shuffledQuestions: shuffledQuestion[];
}

const JsQuiz = ({ shuffledQuestions }: JsQuizProp) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const handleGameReset = () => {
        setCurrentQuestion(0);
        setScore(0);
    };

    if (currentQuestion > shuffledQuestions.length - 1) {
        return (
            <Container>
                <Main>
                    <p>Game Over</p>
                    <p>Score: {score} / 10</p>
                    <button onClick={handleGameReset}>Play Again</button>
                </Main>
            </Container>
        );
    }

    const {
        question,
        answers,
        answer: correctAnswer
    } = shuffledQuestions[currentQuestion];

    const handleAnswer = (answer: string) => {
        if (correctAnswer === answer) {
            setScore(score + 1);
        }
        setCurrentQuestion(currentQuestion + 1);
    };

    return (
        <Container>
            <Main>
                <Question>Q: {question}</Question>
                <p>Score: {score} / 10</p>
                {answers.map((answer) => {
                    return (
                        <ButtonAnswer
                            answer={answer}
                            onClick={() => handleAnswer(answer)}
                        />
                    );
                })}
            </Main>
        </Container>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            shuffledQuestions: questions.map((q) => ({
                ...q,
                answers: [q.answer, ...q.wrongAnswers].sort(
                    () => Math.random() - 0.5
                )
            }))
        }
    };
}

export default JsQuiz;
