import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      alignItems={'center'}
      as={'a'}
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      cursor={'pointer'}
      display={'inline-flex'}
      h={8}
      href={href}
      justifyContent={'center'}
      rounded={'full'}
      transition={'background 0.3s ease'}
      w={8}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      bottom={0}
      color={useColorModeValue('gray.700', 'gray.200')}
      position='fixed'
      width='100%'
    >
      <Container
        align={{ base: 'center', md: 'center' }}
        as={Stack}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        maxW={'6xl'}
        py={4}
        spacing={4}
      >
        <Text>© {new Date().getFullYear()} Message Boards.</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
