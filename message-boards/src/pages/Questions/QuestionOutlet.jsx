import { Outlet, useParams } from 'react-router-dom';
import supabase from '@/services/supabase';
import { Container, Spinner } from '@chakra-ui/react';
import useSWR from 'swr';

const getThreadBySlug = async ({ slug }) => {
  const { data } = await supabase
    .from('MBThread')
    .select('*')
    .filter('slug', 'eq', slug)
    .single();

  return data;
};

const QuestionOutlet = () => {
  const { slug } = useParams();

  const { data: question, isLoading } = useSWR(
    { key: '/thread', slug },
    getThreadBySlug
  );

  if (isLoading) {
    return (
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
    );
  }

  return <Outlet context={{ question }} />;
};

export default QuestionOutlet;
