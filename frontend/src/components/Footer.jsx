import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <footer className='bg-screenbglight pt-12 pb-24'>
      <div className='w-[92%] mx-auto'>
        <div className='flex md:flex-row flex-col'>

          <div className="basis-2/5">
            <button onClick={() => { navigate('/'); scrollToTop() }} className="cursor-pointer text-white text-5xl font-semibold">CertifyPro</button>
            <h2 className="text-[#999] text-sm my-6">Effortless Certificate Generation for Clubs and Organizations.</h2>
            <p className="text-[#666] text-sm">Copyright © 2024 Devik Gupta. All rights reserved.</p>
          </div>

          <div className="basis-1/5">
            <h3 className="text-white mb-6 mt-6 md:mt-0 font-medium">Navigation</h3>
            <button onClick={() => { navigate('/generator'); scrollToTop() }} className="text-[#999] hover:text-[#ddd] text-sm mb-[10px] block">Generator</button>
          </div>

          <div className="basis-1/5">
            <h3 className="text-white mb-6 mt-6 md:mt-0 font-medium">Resources</h3>
            <button onClick={() => { window.open('https://www.flaticon.com/authors/freepik', '_blank') }} className="text-[#999] hover:text-[#ddd] text-sm block">Freepik</button>
            <button onClick={() => { window.open('https://www.flaticon.com', '_blank') }} className="text-[#999] hover:text-[#ddd] text-sm block my-[10px]">Flaticon</button>
            <button onClick={() => { window.open('https://www.canva.com/certificates/templates', '_blank') }} className='text-[#999] hover:text-[#ddd] text-sm block'>Canva</button>
          </div>

        </div>
      </div>
    </footer>
  );
}
