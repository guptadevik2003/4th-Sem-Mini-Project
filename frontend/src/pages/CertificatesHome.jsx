/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaSearch, FaFilePdf, FaImage } from 'react-icons/fa';
import { FaCloudArrowDown } from 'react-icons/fa6';

export default function CertificatesHome() {
  const navigate = useNavigate();
  const { custom_link } = useParams();
  const [certData, setCertData] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [studentName, setStudentName] = useState(null);

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

  async function downloadHandler(fileType) {
    await fetch(`/api/certificates/${custom_link}/download`, {
      method: 'POST',
      body: new URLSearchParams({
        student: studentName,
        fileType,
      }),
    })
    .then(res => res.json())
    .then(data => {
      if(!data.success) return alert(data.error);

      let dataURL
      if(fileType === 'png') {
        dataURL = `data:image/png;base64,${data.data}`;
      }
      if(fileType === 'pdf') {
        dataURL = `data:application/pdf;base64,${data.data}`;
      }

      let downloadLink = document.createElement('a')
      downloadLink.href = dataURL
      downloadLink.download = data.fileName

      downloadLink.click();

    })
  }

  async function handleClick(student) {
    setStudentName(student);
    document.getElementById('downloadModal').classList.toggle('hidden');
  }

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

            <button className='text-white bg-blurple hover:bg-blurplehover rounded-lg p-2' onClick={() => handleClick(student)}><FaDownload size={20} /></button>

          </div>
        );
      })
    );
  }

  window.onclick = function(event) {
    if(event.target == document.getElementById('downloadModal')) {
      document.getElementById('downloadModal').classList.toggle('hidden');
    }
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

      {/* Download Modal Start */}
      <div className='hidden fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-[0.4] flex items-center justify-center' id='downloadModal'>
        <div className='bg-cardbgdark rounded-lg w-[92%] px-5 py-7 max-w-lg shadow text-center flex flex-col items-center'>
          <h1 className='text-white font-semibold text-2xl md:3xl mb-1'>Download</h1>
          <p className='text-[#999] text-lg'>Do you want to proceed with <br className='hidden md:block' />download for <span className='font-semibold text-[#aaa]'>{studentName}</span>?</p>
          <div className='bg-iconbg my-10 w-[200px] h-[200px] rounded-full flex items-center justify-center border-2 border-blurple'>
            <FaCloudArrowDown className='text-blurple' size={90} />
          </div>
          <div className='flex flex-col gap-3'>
            <button onClick={() => downloadHandler('pdf')} className='bg-blurple text-white flex items-center justify-center font-medium w-72 px-3 py-3 gap-1 rounded-lg hover:bg-blurplehover'><FaFilePdf size={30} />Download PDF</button>
            <button onClick={() => downloadHandler('png')} className='bg-blurple text-white flex items-center justify-center font-medium w-72 px-3 py-3 gap-2 rounded-lg hover:bg-blurplehover'><FaImage size={30} />Download Image</button>
          </div>
          <button className='text-blurple font-medium w-72 px-5 py-3 rounded-lg bg-blurple bg-opacity-15 hover:bg-opacity-25 mt-10' onClick={() => document.getElementById('downloadModal').classList.toggle('hidden')}>Cancel</button>
        </div>
      </div>
      {/* Download Modal Ends */}

    </div>
  );
}
