import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaXmark } from 'react-icons/fa6';

export default function Navbar() {
  const navigate = useNavigate();
  const [navbarShown, setNavbarShown] = useState(false);

  function showHideNavbar() {
    let navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('top-[9%]');
    setNavbarShown(prev => !prev);
  }

  return (
    <header className='bg-screenbgdark py-5'>
      <nav className='flex justify-between items-center w-[92%] mx-auto'>
        <div className='flex items-center select-none cursor-pointer' onClick={() => navigate('/')}>
          <img className='h-10 md:h-12' src="/icon.png" alt="CertifyPro" />
          <h1 className='ml-3 text-white text-3xl font-medium'>CertifyPro</h1>
        </div>
        <div className='nav-links md:static absolute bg-screenbgdark md:min-h-fit min-h-[100%] left-0 top-[-100%] md:w-auto w-full flex px-5'>
          <ul className='w-[100%] py-4 flex md:flex-row flex-col md:items-center gap-4 font-medium'>

            <li>
              <button onClick={() => { showHideNavbar(); navigate('/generator'); }} className='text-[#999] hover:text-[#ddd]'>Generator</button>
            </li>
            <li>
              <button onClick={() => { showHideNavbar(); navigate('/'); }} className='text-[#999] hover:text-[#ddd]'>PLACEHOLDER</button>
            </li>
            <li>
              <button onClick={() => { showHideNavbar(); navigate('/'); }} className='text-[#999] hover:text-[#ddd]'>PLACEHOLDER</button>
            </li>

          </ul>
        </div>
        <div className='md:hidden flex items-center gap-6'>

          {navbarShown ? (
          <FaXmark onClick={showHideNavbar} className='text-3xl cursor-pointer md:hidden relative left-1' color='white' size={32} />
          ) : (
          <FaBars onClick={showHideNavbar} className='text-3xl cursor-pointer md:hidden ml-1' color='white' size={27} />
          )}

        </div>
      </nav>
    </header>
  );
}
