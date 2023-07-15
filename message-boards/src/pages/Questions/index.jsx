import { Button, Container, Heading, Spinner, Stack } from '@chakra-ui/react';
import QuestionRow from '../../components/QuestionRow';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../services/supabase';

const Questions = () => {
  const [state, setState] = useState({
    loading: true,
    questions: [],
  });

  useEffect(() => {
    supabase
      .from('MBThread')
      .select('*')
      .then((response) => {
        setState({ loading: false, questions: response.data });
      });
  }, [setState]);

  return (
    <Container maxW={'6xl'}>
      <Stack>
        <Heading my={5}>Questions</Heading>
        <Button
          as={Link}
          bg='blue.500'
          to='new'
          _hover={{ bg: 'blue.400' }}
          color={'white'}
          textAlign='right'
        >
          New Thread
        </Button>
      </Stack>

      {state.loading ? (
        <Container
          display='flex'
          height='500px'
          justifyContent='center'
          alignItems='center'
        >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Container>
      ) : (
        state.questions.map((question, index) => (
          <QuestionRow
            id={question.slug}
            description={question.description}
            key={index}
            title={question.title}
          />
        ))
      )}
    </Container>
  );
};

export default Questions;
