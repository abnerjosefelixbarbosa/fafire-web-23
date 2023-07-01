import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Questions from './pages/Questions';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} path='/'>
        <Route element={<Home />} index />
        <Route element={<Questions />} path='/questions' />

        <Route path='*' element={<h1>Page does not exist.</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
