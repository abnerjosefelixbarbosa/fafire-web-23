import { Box, Button, Text, useToast } from '@chakra-ui/react';
import supabase from '../../../services/supabase';
import useSession from '../../../hooks/useSession';

const Answer = ({ answer, isLastRow, openEditAnswerModal, mutate }) => {
  const toast = useToast();
  const { session } = useSession();

  const onRemoveAnswer = async (id) => {
    if (!confirm('Are you sure you want to delete this answer?')) {
      return;
    }

    const { data } = await supabase
      .from('MBMessage')
      .delete()
      .filter('id', 'eq', id)
      .select();

    if (!data.length) {
      return toast({
        title: 'Error',
        description: 'An unexpacted error happened.',
        status: 'error',
      });
    }

    toast({
      title: 'Deleted',
      description: 'Answer deleted with success.',
      status: 'success',
    });

    mutate(
      (prevState) => (
        {
          ...prevState,
          answers: prevState.answers.filter((answer) => answer.id !== id),
        },
        { revalidate: false }
      )
    );
  };

  return (
    <Box
      borderBottom={isLastRow ? undefined : '1px'}
      borderColor='#dadada'
      padding={4}
      my={2}
    >
      <Text>{answer.text}</Text>

      {session && session.user.id === answer.owner_id && (
        <Box mt={2}>
          <Button
            size='xs'
            colorScheme='blue'
            mr={2}
            onClick={openEditAnswerModal}
            variant='outline'
          >
            Edit
          </Button>

          <Button
            size='xs'
            colorScheme='red'
            onClick={() => onRemoveAnswer(answer.id)}
            variant='outline'
          >
            Remove
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Answer;
