import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Questions from './pages/Questions';
import QuestionForm from './pages/Questions/QuestionForm';
import Question from './pages/Questions/Question';
import QuestionOutlet from './pages/Questions/QuestionOutlet';
import Auth from './pages/auth';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} path='/'>
        <Route element={<Home />} index />
        <Route element={<Auth />} path='auth' />

        <Route path='/questions'>
          <Route element={<Questions />} index />
          <Route element={<QuestionForm />} path='new' />
          <Route element={<QuestionOutlet />} path=':slug'>
            <Route index element={<Question />} />
            <Route element={<QuestionForm />} path='update' />
          </Route>
        </Route>

        <Route path='*' element={<h1>Page does not exist.</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
