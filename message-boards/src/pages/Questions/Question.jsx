import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Text,
} from '@chakra-ui/react';
import { FcLock } from 'react-icons/fc';
import { Link, useOutletContext } from 'react-router-dom';
import Answers from './components/Answers';
import useSession from '../../hooks/useSession';

const Question = () => {
  const { question } = useOutletContext();
  const { session } = useSession();

  return (
    <Container maxW='4xl' paddingY={10} paddingX={20}>
      <Card>
        <CardHeader>
          <Box display='flex' justifyContent='space-between'>
            <div>
              {question.lock && <FcLock />}

              <Heading>{question.title}</Heading>
            </div>

            {session && session.user.id === question.owner_id && (
              <Button as={Link} to='update'>
                Update
              </Button>
            )}
          </Box>
        </CardHeader>
        <CardBody>
          <Text
            as='pre'
            fontSize={{ base: 'sm' }}
            textAlign={'left'}
            maxW={'4xl'}
          >
            {question.description}
          </Text>
        </CardBody>

        <Divider />

        <Answers threadId={question.id} />
      </Card>
    </Container>
  );
};

export default Question;
