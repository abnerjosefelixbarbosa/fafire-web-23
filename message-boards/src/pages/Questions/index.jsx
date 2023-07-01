import { Container, Heading } from '@chakra-ui/react';
import QuestionRow from '../../components/QuestionRow';
import { useEffect, useState } from 'react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, [setQuestions]);

  return (
    <Container maxW={'6xl'}>
      <Heading my={5}>Questions</Heading>

      {questions.map((question, index) => (
        <QuestionRow
          description={question.body}
          key={index}
          title={`${index + 1} ${question.title}`}
        />
      ))}
    </Container>
  );
};

export default Questions;
