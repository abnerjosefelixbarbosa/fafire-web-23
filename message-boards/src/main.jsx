import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from './Router.jsx';
import { SWRConfig } from 'swr';

function localStorageProvider() {
  // Ao inicializar, restauramos os dados de `localStorage` em um mapa.
  const map = new Map(
    JSON.parse(localStorage.getItem('@message-boards/swr') || '[]')
  );

  // Antes de descarregar o aplicativo, gravamos todos os dados em `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('@message-boards/swr', appCache);
  });

  // Ainda usamos o mapa para gravação e leitura para desempenho.
  return map;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider
    toastOptions={{
      defaultOptions: {
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      },
    }}
  >
    <SWRConfig value={{ provider: localStorageProvider }}>
      <AppRouter />
    </SWRConfig>
  </ChakraProvider>
);
