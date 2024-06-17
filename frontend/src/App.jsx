import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from 'pages/Home';
import PageNotFound from 'pages/PageNotFound';
import Generator from 'pages/Generator';
import CertificatesHome from 'pages/CertificatesHome';

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

          <Route path='certificates/:custom_link'>

            <Route path='' element={<><Navbar /><CertificatesHome /><Footer /></>} />

          </Route>

          <Route path='*' element={<><Navbar /><PageNotFound /><Footer /></>} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}
