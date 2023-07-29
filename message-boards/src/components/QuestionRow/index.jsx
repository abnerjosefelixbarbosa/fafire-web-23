import { Stack, Text } from '@chakra-ui/react';
import { FcLock } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export default function QuestionRow({ description, id, lock, title }) {
  return (
    <Stack p='4' boxShadow='lg' borderRadius='sm'>
      <Stack
        as={Link}
        direction='row'
        alignItems='center'
        to={`/questions/${id}`}
      >
        <Text fontWeight='semibold'>{title}</Text>
        {lock && <FcLock />}
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
      >
        <Text
          as='pre'
          fontSize={{ base: 'sm' }}
          textAlign={'left'}
          maxW={'4xl'}
        >
          {description.substring(0, 100)}...
        </Text>
      </Stack>
    </Stack>
  );
}
