import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  Button,
  Box,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import supabase from '../../services/supabase';

const threadSchema = z
  .object({
    description: z.string().min(3).max(1000),
    id: z.number().optional(),
    slug: z.string().optional(),
    title: z.string().min(4).max(100),
  })
  .transform((form) => ({
    ...form,
    slug: form.title.toLowerCase().replaceAll(' ', '-'),
  }));

const toastOptions = {
  duration: 5000,
  isClosable: true,
  position: 'bottom-right',
};

const QuestionForm = () => {
  const { question } = useOutletContext() ?? {
    question: { description: '', title: '' },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: question,
    mode: 'onChange',
    resolver: zodResolver(threadSchema),
  });

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (form) => {
    try {
      const { error } = await supabase.from('MBThread').upsert(form);

      if (error) {
        throw error;
      }

      const context = form.id ? 'updated' : 'created';

      toast({
        ...toastOptions,
        title: `Thread ${context}.`,
        description: `Thread ${context} with success.`,
        status: 'success',
      });

      navigate('/questions');
    } catch (error) {
      toast({
        ...toastOptions,
        title: 'An unexpacted error happened.',
        description: error.message,
        status: 'error',
      });
    }
  };

  return (
    <Container maxW='4xl' paddingY={10} paddingX={20}>
      <Heading mb={8}>Thread Form </Heading>

      <FormControl isInvalid={errors.title}>
        <FormLabel>Title</FormLabel>
        <Input type='text' {...register('title')} />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.description}>
        <FormLabel>Description</FormLabel>
        <Textarea rows={10} {...register('description')} />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>

      <Box mt={4}>
        <Button mr={2} as={Link} to='/questions'>
          Cancel
        </Button>

        <Button
          colorScheme='messenger'
          isDisabled={!isValid}
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default QuestionForm;
