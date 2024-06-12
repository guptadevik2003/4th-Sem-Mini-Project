import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages - Root
import Home from 'pages/Root/Home';
import PageNotFound from 'pages/Root/PageNotFound';
import Generator from 'pages/Root/Generator';

// Components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path='/'>

          <Route path='' element={<><Navbar /><Home /><Footer /></>} />

          <Route path='generator' element={<><Navbar /><Generator /><Footer /></>} />

          <Route path='*' element={<><Navbar /><PageNotFound /><Footer /></>} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}
