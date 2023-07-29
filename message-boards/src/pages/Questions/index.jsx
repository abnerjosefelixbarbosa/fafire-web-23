import { Button, Container, Heading, Spinner, Stack } from '@chakra-ui/react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

import QuestionRow from '../../components/QuestionRow';
import supabase from '../../services/supabase';
import useSession from '../../hooks/useSession';

const getThreads = async () => {
  const { data } = await supabase.from('MBThread').select('*');

  return data;
};

const Questions = () => {
  const { data: questions, isLoading } = useSWR('/threads', getThreads);

  const { session } = useSession();

  return (
    <Container maxW={'6xl'}>
      <Stack>
        <Heading my={5}>Questions</Heading>
        {session && (
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
        )}
      </Stack>

      {isLoading ? (
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
        questions.map((question, index) => (
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
