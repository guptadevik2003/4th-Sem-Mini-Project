import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'CertifyPro - Effortless Certificate Generation for Clubs and Organizations';
  }, []);

  return (
    <div>

      <div>
        <div className='md:w-[50%] w-[92%] mx-auto py-10 md:py-40'>
          <h1 className='text-white font-semibold md:text-3xl text-2xl'>Effortless Certificate Generator</h1>
          <p className='mt-5 text-[#999]'>CertifyPro is a cutting-edge online platform that simplifies the process of generating certificates for clubs, organizations, and events.</p>
          <div className='mt-10 flex md:flex-row flex-col items-center'>
            <button onClick={() => navigate('/generator')} className='bg-blurple text-white font-medium px-5 py-3 md:w-auto w-full rounded-lg border border-blurple hover:bg-blurplehover hover:border-blurplehover'>Generate Certificate</button>
            <p className='text-[#999] mt-5 md:mt-0 md:ml-5'>It's free and easy to use.</p>
          </div>
        </div>
      </div>

      <div className='bg-screenbglight'>
        <div className='md:w-[50%] w-[92%] mx-auto py-10 md:py-40'>
          <h1 className='text-white'>PLACEHOLDER</h1>
        </div>
      </div>

      <div>
        <div className='md:w-[50%] w-[92%] mx-auto py-10 md:py-40'>
          <h1 className='text-white'>PLACEHOLDER 2</h1>
        </div>
      </div>

    </div>
  );
}
