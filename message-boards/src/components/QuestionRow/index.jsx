import { Stack, Text } from '@chakra-ui/react';
import { FcLock } from 'react-icons/fc';

export default function QuestionRow({ description, title }) {
  return (
    <Stack p='4' boxShadow='lg' borderRadius='sm'>
      <Stack direction='row' alignItems='center'>
        <Text fontWeight='semibold'>{title}</Text>
        <FcLock />
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
      >
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          {description}
        </Text>
      </Stack>
    </Stack>
  );
}
