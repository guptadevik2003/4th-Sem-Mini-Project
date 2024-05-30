import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages - Root
import Home from 'pages/Root/Home';
import PageNotFound from 'pages/Root/PageNotFound';

// Components


export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path='/'>

          <Route path='' element={<><Home /></>} />

          <Route path='*' element={<><PageNotFound /></>} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}
