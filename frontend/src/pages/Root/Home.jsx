/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaLink, FaPenNib, FaCloudArrowDown, FaStar } from 'react-icons/fa6';
import { FaStream } from 'react-icons/fa';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'CertifyPro - Effortless Certificate Generation for Clubs and Organizations';
  }, []);

  return (
    <div>

      <div>
        <div className='md:w-[65%] w-[92%] mx-auto py-10 md:py-40'>

          <div className='grid grid-cols-1 md:grid-cols-2 items-center'>

            <div>
              <h1 className='text-white font-semibold md:text-3xl text-2xl'>Effortless Certificate Generator</h1>
              <p className='mt-5 text-[#999]'>CertifyPro is a cutting-edge online platform that simplifies the process of generating certificates for clubs, organizations, and events.</p>
              <p className='mt-5 text-[#999]'>Generate personalized certificates for Free and download the printable PDF certificates instantly!</p>
              <div className='mt-10 flex md:flex-row flex-col items-center'>
                <button onClick={() => navigate('/generator')} className='bg-blurple text-white font-medium px-5 py-3 md:w-auto w-full rounded-lg border border-blurple hover:bg-blurplehover hover:border-blurplehover'>Create Certificate Now!</button>
              </div>
            </div>

            <div className='md:ml-7 mt-7 md:mt-0'>
              <img className='w-full' src="/certificate-demo-home.jpeg" alt="Demo Certificate" />
            </div>

          </div>

        </div>
      </div>

      <div className='bg-screenbglight'>
        <div className='md:w-[65%] w-[92%] mx-auto py-10 md:py-40'>

          <h1 className='text-white font-semibold md:text-3xl text-2xl'>What exactly does CertifyPro offer?</h1>
          <p className='mt-5 text-[#999]'>Here's why you should start using CertifyPro today.</p>

          <div className='grid grid-cols-1 md:grid-cols-2'>

            <div className="flex mt-10 md:mr-6">
              <div className="flex justify-center items-center min-w-[50px] min-h-[50px] w-[50px] h-[50px] mt-[4px] bg-iconbg border border-blurple rounded-full">
                <FaCrown className="text-blurple" size={29} />
              </div>
              <div className="ml-6">
                <h2 className="text-white font-medium">High Quality Templates</h2>
                <p className="text-[#999] text-sm">Start with one of our customizable free certificate templates.</p>
              </div>
            </div>

            <div className="flex mt-10 md:mr-6">
              <div className="flex justify-center items-center min-w-[50px] min-h-[50px] w-[50px] h-[50px] mt-[4px] bg-iconbg border border-blurple rounded-full">
                <FaLink className="text-blurple" size={29} />
              </div>
              <div className="ml-6">
                <h2 className="text-white font-medium">Easy Sharing via Link</h2>
                <p className="text-[#999] text-sm">Share certificates effortlessly via custom link in seconds.</p>
              </div>
            </div>

            <div className="flex mt-10 md:mr-6">
              <div className="flex justify-center items-center min-w-[50px] min-h-[50px] w-[50px] h-[50px] mt-[4px] bg-iconbg border border-blurple rounded-full">
                <FaPenNib className="text-blurple" size={26} />
              </div>
              <div className="ml-6">
                <h2 className="text-white font-medium">No Design Skills Needed</h2>
                <p className="text-[#999] text-sm">If you're a professional in any field, this is the certificate tool for you.</p>
              </div>
            </div>

            <div className="flex mt-10 md:mr-6">
              <div className="flex justify-center items-center min-w-[50px] min-h-[50px] w-[50px] h-[50px] mt-[4px] bg-iconbg border border-blurple rounded-full">
                <FaCloudArrowDown className="text-blurple" size={29} />
              </div>
              <div className="ml-6">
                <h2 className="text-white font-medium">Free Instant Downloads</h2>
                <p className="text-[#999] text-sm">Download your certificates immediately after creation with just one click.</p>
              </div>
            </div>

            <div className="flex mt-10 md:mr-6">
              <div className="flex justify-center items-center min-w-[50px] min-h-[50px] w-[50px] h-[50px] mt-[4px] bg-iconbg border border-blurple rounded-full">
                <FaStream className="text-blurple" size={25} />
              </div>
              <div className="ml-6">
                <h2 className="text-white font-medium">Bulk Certificate Generation</h2>
                <p className="text-[#999] text-sm">Efficiently generate multiple certificates at once, perfect for large-scale events.</p>
              </div>
            </div>

            <div className="flex mt-10 md:mr-6">
              <div className="flex justify-center items-center min-w-[50px] min-h-[50px] w-[50px] h-[50px] mt-[4px] bg-iconbg border border-blurple rounded-full">
                <FaStar className="text-blurple" size={29} />
              </div>
              <div className="ml-6">
                <h2 className="text-white font-medium">User-Friendly Interface</h2>
                <p className="text-[#999] text-sm">Enjoy a simple, intuitive interface designed for hassle-free certificate creation.</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div>
        <div className='md:w-[65%] w-[92%] mx-auto py-10 md:py-40'>

          <h1 className='text-white font-semibold md:text-3xl text-2xl'>Get started with <br className='md:hidden' />CertifyPro in 3 steps</h1>

          <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-10'>

            <div className='bg-screenbglight rounded-lg p-8'>
              <div className='flex justify-center items-center min-w-[64px] min-h-[64px] w-[64px] h-[64px] bg-iconbg rounded-lg'>
                <FaPenNib className="text-blurple" size={35} />
              </div>
              <h1 className='text-white font-semibold mt-6 text-3xl'>Design</h1>
              <p className='text-[#999] mt-3'>Select a template from our pre-designed templates and customize it to your needs.</p>
            </div>

            <div className='bg-screenbglight rounded-lg p-8'>
              <div className='flex justify-center items-center min-w-[64px] min-h-[64px] w-[64px] h-[64px] bg-iconbg rounded-lg'>
                <FaLink className="text-blurple" size={35} />
              </div>
              <h1 className='text-white font-semibold mt-6 text-3xl'>Share</h1>
              <p className='text-[#999] mt-3'>Share your certificates with ease using a custom link, tailored for your recipients.</p>
            </div>

            <div className='bg-screenbglight rounded-lg p-8'>
              <div className='flex justify-center items-center min-w-[64px] min-h-[64px] w-[64px] h-[64px] bg-iconbg rounded-lg'>
                <FaCloudArrowDown className="text-blurple" size={35} />
              </div>
              <h1 className='text-white font-semibold mt-6 text-3xl'>Download</h1>
              <p className='text-[#999] mt-3'>Download your certificates in high-quality PDF or image format for printing or digital use.</p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
