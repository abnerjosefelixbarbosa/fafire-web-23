import { Stack, Button } from '@chakra-ui/react';
import Hero from '../components/Hero';

function Home() {
  return (
    <Hero
      title='Message Boards'
      subtitle='Fafire Tech Questions'
      description='The objective of a message board is to facilitate communication and information exchange among users in an online environment.'
    >
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
        <Button
          rounded={'full'}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Open a Thread
        </Button>
        <Button rounded={'full'}>How It Works</Button>
      </Stack>
    </Hero>
  );
}

export default Home;
