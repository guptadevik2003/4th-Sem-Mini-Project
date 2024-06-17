/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaSearch } from 'react-icons/fa';

export default function CertificatesHome() {
  const navigate = useNavigate();
  const { custom_link } = useParams();
  const [certData, setCertData] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    document.title = 'Loading - CertifyPro';

    async function fetchData() {
      await fetch(`/api/certificates/${custom_link}`)
      .then(res => res.json())
      .then(data => {
        if(!data.success) {
          setCertData(data);
          document.title = 'Wrong Custom Link - CertifyPro'
          return;
        } else {
          setCertData(data.data);
          document.title = `${data.data.event_name} - CertifyPro`;
        }

      })
    }
    fetchData();

  }, [custom_link]);

  function RenderStudents({ students }) {
    students = students.sort((a, b) => { if(a<b) return -1; if(a>b) return 1; return 0; })

    students = students.filter((a) => { return a.toLowerCase().includes(filterQuery.toLowerCase()); })

    if(students.length == 0) return (
      <div className='text-center h-[70%] flex justify-center items-center'>
        <h1 className='text-[#999] text-3xl md:text-4xl font-bold'>NO DATA FOUND</h1>
      </div>
    );

    return (
      Object.keys(students).map((item, ind) => {
        let student = students[item];
        let color = ['purple','green','yellow','blue','red'];

        return (
          <div key={student} className='bg-cardbgdark my-3 py-2 px-3 flex justify-between items-center rounded-lg'>

            <div className='flex items-center gap-3'>

              <div className={'text-white h-9 w-9 rounded-full flex items-center justify-center text-2xl bg-opacity-65'+` bg-contact${color[ind%5]}`}>
                <span>{student.charAt(0).toUpperCase()}</span>
              </div>

              <h1 className='text-white font-medium overflow-hidden text-ellipsis text-nowrap max-w-[60vw] md:max-w-[35vw]'>{student}</h1>

            </div>

            <button className='text-white bg-blurple hover:bg-blurplehover rounded-lg p-2'><FaDownload size={20} /></button>

          </div>
        );
      })
    );
  }

  // Data is Loading
  if(certData == null) return (
    <div className='w-[92%] mx-auto h-[90vh] flex justify-center items-center'>
      <h1 className='text-cardbgdark text-6xl font-bold animate-pulse'>CERTIFYPRO</h1>
    </div>
  );

  // Custom Link not Found
  if(!certData.success && certData.error) return (
    <div className="w-[92%] mx-auto h-[90vh] flex flex-col items-center justify-center pb-[100px]">
      <img className="md:w-[30%] w-[80%]" src="/page-not-found.svg"/>
      <h1 className="text-white text-[12px] md:text-[16px]">The Certificate with this Custom Link does not exist,</h1>
      <h1 className="text-white text-[12px] md:text-[16px]">or has been expired / temporarily unavailable.</h1>
      <button onClick={() => navigate('/')} className="bg-blurple text-white font-medium px-5 py-2 rounded-lg hover:bg-transparent hover:text-blurple border border-blurple mt-[40px]">GO TO HOMEPAGE</button>
    </div>
  );

  // Everything is Working Fine
  return (
    <div className='md:w-[50%] w-[92%] mx-auto h-[90vh] py-5'>

      <h1 className="text-white font-bold md:text-4xl text-3xl text-center mb-1">{certData.event_name}</h1>
      
      <h2 className='text-[#999] font-medium md:text-2xl text-xl text-center mb-8'>{certData.organization_name}</h2>
      
      <div className='text-[#999] flex bg-cardbgdark rounded-lg mb-5 items-center border border-[#999]'>
        <FaSearch className='ml-2' size={25} />
        <input value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} name='filterQuery' className='w-[100%] rounded-lg bg-cardbgdark p-2 outline-none' placeholder='Search' type="text" />
      </div>
      
      <RenderStudents students={certData.students} />

    </div>
  );
}
