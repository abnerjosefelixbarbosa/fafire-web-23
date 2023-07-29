import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../../services/supabase';
import { Container } from '@chakra-ui/react';
import useSession from '../../hooks/useSession';
import { Navigate } from 'react-router-dom';

const MBAuth = () => {
  const { session } = useSession();

  if (!session) {
    return (
      <Container maxW='2xl'>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github']}
        />
      </Container>
    );
  }

  return <Navigate to='/' />;
};

export default MBAuth;
