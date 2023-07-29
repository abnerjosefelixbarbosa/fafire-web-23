import {
  Box,
  Button,
  CardHeader,
  Heading,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import useSWR from 'swr';

import supabase from '../../../services/supabase';
import ModalComponent from '../../../components/Modal';
import Answer from './Answer';
import useSession from '../../../hooks/useSession';

const defaultAnswerState = { id: undefined, text: '' };

const getMBMessagesByThreadId = async ({ threadId }) => {
  const { data } = await supabase
    .from('MBMessage')
    .select('*')
    .filter('thread_id', 'eq', threadId);

  return data;
};

const Answers = ({ threadId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [answer, setAnswer] = useState(defaultAnswerState);
  const { session } = useSession();
  const toast = useToast();
  const {
    data: answers = [],
    isLoading,
    mutate,
  } = useSWR({ key: '/messages', threadId }, getMBMessagesByThreadId);

  const onReplyThread = async () => {
    const { data, error } = await supabase
      .from('MBMessage')
      .upsert({ id: answer.id, text: answer.text, thread_id: threadId })
      .select('*')
      .single();

    if (error) {
      toast({
        title: 'An unexpacted error happened.',
        description: error.message,
        status: 'error',
      });

      return console.error(error);
    }

    let newAnswers = [...answers, data];

    if (answer.id) {
      newAnswers = answers.map((_answer) => {
        if (answer.id === _answer.id) {
          return {
            ..._answer,
            text: answer.text,
          };
        }

        return _answer;
      });
    }

    mutate(newAnswers);

    toast({
      title: 'Anwered',
      description: `Thread answered with success.`,
      status: 'success',
    });

    onClose();
  };

  const openAnswerModal = (answer) => {
    onOpen();

    setAnswer(answer);
  };

  return (
    <>
      <CardHeader display='flex' justifyContent='space-between' my={4}>
        <Heading>Answers ({answers.length})</Heading>
        {session && (
          <Button
            colorScheme='blue'
            onClick={() => openAnswerModal(defaultAnswerState)}
          >
            Reply
          </Button>
        )}
      </CardHeader>

      {isLoading ? (
        <Box display='flex' justifyContent='center' p={4}>
          <Spinner />
        </Box>
      ) : (
        answers.map((answer, index) => (
          <Answer
            answer={answer}
            isLastRow={index + 1 === answers.length}
            key={index}
            mutate={mutate}
            openEditAnswerModal={() => openAnswerModal(answer)}
          />
        ))
      )}

      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title={`${answer.id ? 'Update' : 'Add'} Answer`}
        secondaryButtonProps={{
          title: 'Answer',
          onClick: onReplyThread,
        }}
      >
        <Textarea
          my={4}
          onChange={(event) =>
            setAnswer({
              ...answer,
              text: event.target.value,
            })
          }
          value={answer.text}
        />
      </ModalComponent>
    </>
  );
};

export default Answers;
