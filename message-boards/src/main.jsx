import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from './Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AppRouter />
  </ChakraProvider>
);
