/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Page Not Found - CertifyPro';
  }, []);

  return (
    <div className="flex flex-col items-center w-[92%] h-[80vh] justify-center mx-auto pb-[30px]">
      <img className="md:w-[30%] w-[80%]" src="/page-not-found.svg"/>
      <h1 className="text-white text-[12px] md:text-[16px]">The page you are looking for might have been removed,</h1>
      <h1 className="text-white text-[12px] md:text-[16px]">had it's name changed or is temporarily unavailable.</h1>
      <button onClick={() => navigate('/')} className="bg-blurple text-white font-medium px-5 py-2 rounded-lg hover:bg-transparent hover:text-blurple border border-blurple mt-[40px]">GO TO HOMEPAGE</button>
    </div>
  );
}
