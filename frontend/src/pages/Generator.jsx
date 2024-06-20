/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
// import { useNavigate } from 'react-router-dom';

export default function Generator() {
  // const navigate = useNavigate();

  // Form Inputs
  const [template, setTemplate] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [sign, setSign] = useState("");
  const [file, setFile] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [eventName, setEventName] = useState("");
  const [customLink, setCustomLink] = useState("");
  const [linkVerified, setLinkVerified] = useState(false);

  useEffect(() => {
    document.title = 'Generator - CertifyPro';
  }, []);

  async function changeTemplate(id) {
    setTemplate(id);

    document.querySelectorAll('.template').forEach(item => {
      item.classList.remove('border-blurple');
      item.classList.add('border-transparent');
    })

    let activeTemplate = document.querySelector(`.template-${id}`)
    activeTemplate.classList.remove('border-transparent');
    activeTemplate.classList.add('border-blurple');
  }

  async function inputChangeMade(e) {
    e = e.target;
    if(e.name === 'title') {
      setTitle(e.value);
    } else if(e.name === 'description') {
      setDesc(e.value);
    } else if(e.name === 'date') {
      setDate(e.value);
    } else if(e.name === 'signature') {
      setSign(e.value);
    } else if(e.name === 'orgName') {
      setOrgName(e.value);
    } else if(e.name === 'eventName') {
      setEventName(e.value);
    } else if(e.name === 'customLink') {
      setCustomLink(e.value);
      setLinkVerified(false);
      document.getElementById('checkSpan').classList.remove('hidden');
      document.getElementById('checkIconYes').classList.add('hidden');
      document.getElementById('checkIconNo').classList.add('hidden');
      document.getElementById('checkBtn').classList.add('bg-blurple');
      document.getElementById('checkBtn').classList.remove('bg-green-500');
      document.getElementById('checkBtn').classList.remove('bg-red-500');
    }
  }

  async function fileUploaded(e) {
    let file = e.target.files[0];
    document.getElementById('file-name').textContent = file.name;

    if(file.size > 5 * 1024 * 1024) {
      return alert("Error! File too large [ Max: 5 MB ]")
    }

    setFile(file);
  }

  async function handleCheck() {
    const regex = /^[a-zA-Z0-9-]+$/;
    if(!regex.test(customLink)) return alert("Custom Link can only include alphanumeric characters (A-Z, a-z, 0-9) and dashes (-)");

    await fetch('/api/generator/verify-link', {
      method: 'POST',
      body: new URLSearchParams({ "custom_link": customLink })
    })
    .then(res => res.json())
    .then(data => {
      if(!data.success) return alert(data.error);
      
      if(data.verified) {
        setLinkVerified(true);
        document.getElementById('checkIconYes').classList.remove('hidden');
        document.getElementById('checkSpan').classList.add('hidden');
        document.getElementById('checkIconNo').classList.add('hidden');
        document.getElementById('checkBtn').classList.add('bg-green-500');
        document.getElementById('checkBtn').classList.remove('bg-blurple');
        document.getElementById('checkBtn').classList.remove('bg-red-500');
      } else {
        setLinkVerified(false);
        document.getElementById('checkIconNo').classList.remove('hidden');
        document.getElementById('checkSpan').classList.add('hidden');
        document.getElementById('checkIconYes').classList.add('hidden');
        document.getElementById('checkBtn').classList.add('bg-red-500');
        document.getElementById('checkBtn').classList.remove('bg-blurple');
        document.getElementById('checkBtn').classList.remove('bg-green-500');
      }
    })

  }

  async function handleSubmit() {
    if(template == null || template < 0 || template > 8) return alert("No Template!");
    if(!title.length) return alert("No Title!");
    if(!desc.length) return alert("No Description!");
    if(!date.length) return alert("No Date!");
    if(!sign.length) return alert("No Signature!");
    if(!orgName.length) return alert("No Organization Name!");
    if(!eventName.length) return alert("No Event Name!");
    if(!file) return alert("No File!");
    if(!customLink) return alert("No Custom Link!");
    if(!linkVerified) return alert("Custom Link not Checked!");
    
    let formData = new FormData();
    formData.append('template', template);
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('date', date);
    formData.append('signature', sign);
    formData.append('file', file);
    formData.append('organization_name', orgName);
    formData.append('event_name', eventName);
    formData.append('custom_link', customLink);

    await fetch('/api/generator', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(data => {
      if(!data.success) return alert(data.error);
      document.getElementById('submitModal').classList.toggle('hidden');
    })
  }

  async function handlePreview() {
    if(template == null || template < 0 || template > 8) return alert("No Template!");
    if(!title.length) return alert("No Title!");
    if(!desc.length) return alert("No Description!");
    if(!date.length) return alert("No Date!");
    if(!sign.length) return alert("No Signature!");

    await fetch('/api/generator/preview', {
      method: 'POST',
      body: new URLSearchParams({
        "template": template,
        "title": title,
        "description": desc,
        "date": date,
        "signature": sign,
      })
    })
    .then(res => res.json())
    .then(data => {
      if(!data.success) return alert(data.error)

      document.getElementById('previewModalImg').src = `data:image/png;base64,${data.data}`;
      
      document.getElementById('previewModal').classList.toggle('hidden');
    })
  }

  window.onclick = function(event) {
    if(event.target == document.getElementById('previewModal')) {
      document.getElementById('previewModal').classList.toggle('hidden');
    }
    if(event.target == document.getElementById('submitModal')) {
      document.getElementById('submitModal').classList.toggle('hidden');
    }
  }

  async function handleCopy() {
    let copyText = `https://certifypro.me/certificates/${customLink}`;
    navigator.clipboard.writeText(copyText);
    alert("Copied the link: "+copyText);
  }

  return (
    <div>

      <div>
        <div className='md:w-[65%] w-[92%] mx-auto py-10 md:py-40'>

          <h1 className='text-center text-white font-semibold md:text-4xl text-3xl'>Create Your Certificate</h1>
          <h2 className="my-5 text-center text-[#999] text-2xl">Select a template, enter some values and hit Generate to get your certificates</h2>

          <div className="bg-screenbglight rounded-lg p-6 md:p-8">

            <div>

              <h2 className='text-white font-medium md:text-2xl text-xl'>Select Certificate Template</h2>
              <p className="text-[#999] mt-1 mb-4">Our tool offers a wide range of templates to use as a base for designing your certificate.</p>

              <div className="grid md:grid-cols-3 gap-3">
                <img className="w-full border-4 border-transparent cursor-pointer template template-0" onClick={() => changeTemplate(0)} src="certificate-demo-0.png" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-1" onClick={() => changeTemplate(1)} src="certificate-demo-1.png" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-2" onClick={() => changeTemplate(2)} src="certificate-demo-2.png" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-3" onClick={() => changeTemplate(3)} src="certificate-demo-3.png" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-4" onClick={() => changeTemplate(4)} src="certificate-demo-4.png" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-5" onClick={() => changeTemplate(5)} src="certificate-demo-5.png" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-6" onClick={() => changeTemplate(6)} src="certificate-demo-6.png" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-7" onClick={() => changeTemplate(7)} src="certificate-demo-7.png" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-8" onClick={() => changeTemplate(8)} src="certificate-demo-8.png" />
              </div>
            </div>

            <div className="mt-12">

              <h2 className='text-white font-medium md:text-2xl text-xl'>Enter Personalized Information</h2>
              <p className="text-[#999] mt-1 mb-4">Edit the details of your certificate to make it personal.</p>

              <div>

                <h3 className="text-white text-lg font-medium mb-1">Title</h3>
                <textarea value={title} onChange={inputChangeMade} name="title" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />
                <p className='text-[#999] text-sm'>Supports 2 lines</p>

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Description</h3>
                <textarea value={desc} onChange={inputChangeMade} name="description" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />
                <p className='text-[#999] text-sm'>Supports 3 lines</p>

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Date</h3>
                <input value={date} onChange={inputChangeMade} name="date" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Signature</h3>
                <input value={sign} onChange={inputChangeMade} name="signature" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />
              
              </div>

              <button onClick={handlePreview} className='mt-6 bg-premiumbg text-premiumicon bg-opacity-[0.14] font-medium px-5 py-3 rounded-lg hover:bg-opacity-[0.25] border border-premiumborder border-opacity-[0]'>Preview</button>

            </div>

            <div className="mt-12">

              <h2 className='text-white font-medium md:text-2xl text-xl'>Upload Student Data</h2>
              <p className="text-[#999] mt-1 mb-4">Upload an Excel file (.xlsx) with the heading "Name" and the students' names listed below it, like this:</p>

              <table className='table-auto border-collapse text-[#999]'>
                <thead>
                  <tr className='bg-cardbgdark text-left'>
                    <th className='px-4 py-2 border-[0.1px] border-[#999]'>0</th>
                    <th className='px-4 py-2 border-[0.1px] border-[#999]'>Name</th>
                  </tr>
                </thead>
                <tbody className='bg-transparent'>
                  <tr>
                    <td className='px-4 py-2 border-[0.1px] border-[#999]'>1</td>
                    <td className='px-4 py-2 border-[0.1px] border-[#999]'>John Doe</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-2 border-[0.1px] border-[#999]'>2</td>
                    <td className='px-4 py-2 border-[0.1px] border-[#999]'>Jane Smith</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-2 border-[0.1px] border-[#999]'>3</td>
                    <td className='px-4 py-2 border-[0.1px] border-[#999]'>Emily Clark</td>
                  </tr>
                </tbody>
              </table>

              <div className='mt-8 flex flex-col md:flex-row md:items-center'>
                <div>
                  <label className='text-white bg-blurple font-medium px-5 py-3 rounded-lg border-blurple hover:bg-blurplehover hover:border-blurplehover' htmlFor="excel" >Choose File</label>
                  <input onChange={fileUploaded} name="excel" type="file" accept='.xlsx,.xls' id='excel' hidden/>
                </div>
                <span className='text-white md:ml-3 mt-5 md:mt-0 md:max-w-[60%]' id='file-name'>No file chosen</span>
              </div>
              
            </div>

            <div className='mt-12'>

              <h2 className='text-white font-medium md:text-2xl text-xl'>Enter Event Details</h2>
              <p className='text-[#999] mt-1 mb-4'>Enter event data to be shown on the shareable link page.</p>

              <div>

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Club / Organization Name</h3>
                <input value={orgName} onChange={inputChangeMade} name="orgName" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Event Name</h3>
                <input value={eventName} onChange={inputChangeMade} name="eventName" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Custom Link</h3>
                <div className='bg-cardbgdark rounded-lg flex'>
                  <input value={customLink} onChange={inputChangeMade} name="customLink" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />
                  <button onClick={handleCheck} id='checkBtn' className='text-white bg-blurple rounded-lg m-1 w-[90px] flex items-center justify-center'><span className='font-medium' id='checkSpan'>Check</span><FaCheck className='hidden' id='checkIconYes' size={32} /><FaXmark className='hidden' id='checkIconNo' size={32} /></button>
                </div>
                <p className='text-[#999] text-sm mt-2'>https://certifypro.me/certificates/{customLink}</p>

              </div>
            </div>
            
            <div className='mt-12'>
              <button className='bg-discordgreen text-black px-5 py-3 rounded-lg border border-discordgreen hover:text-discordgreen hover:bg-transparent' onClick={handleSubmit} >Generate</button>
            </div>
            
          </div>

        </div>
      </div>

      {/* Preview Modal Starts */}
      <div className='hidden fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-[0.4] flex items-center justify-center' id='previewModal'>
        <div className='bg-cardbgdark rounded-lg w-[92%] p-5 max-w-2xl shadow'>
          <h1 className='text-white font-medium md:text-3xl text-2xl'>Certificate Preview</h1>
          <img id='previewModalImg' className='w-full rounded-lg mt-3 mb-5' />
          <button className='text-white bg-blurple border border-blurple px-5 py-3 w-full rounded-lg hover:bg-blurplehover hover:border-blurplehover' onClick={() => document.getElementById('previewModal').classList.toggle('hidden')}>Close Preview</button>
        </div>
      </div>
      {/* Preview Modal Ends */}

      {/* Submit Modal Starts */}
      <div className='hidden fixed z-20 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-[0.4] flex items-center justify-center' id='submitModal'>
        <div className='bg-cardbgdark rounded-lg w-[92%] p-5 max-w-2xl shadow'>
          <h1 className='text-white font-medium md:text-3xl text-2xl'>Share Certificate Link</h1>
          <input value={`https://certifypro.me/certificates/${customLink}`} className='w-[100%] rounded-lg bg-screenbglight bg-opacity-50 text-[#999] px-2 py-3 mt-4 mb-6 focus:outline-none' disabled/>
          <div className='mb-1 w-full justify-between flex'>
            <button className='bg-transparent text-white p-3 rounded-lg border border-white hover:text-[#999] hover:border-[#999]' onClick={handleCopy} >Copy Link</button>
            <button className='bg-blurple text-white px-5 py-3 rounded-lg border border-blurple hover:bg-blurplehover hover:border-blurplehover' onClick={() => document.getElementById('submitModal').classList.toggle('hidden')} >Done</button>
          </div>
        </div>
      </div>
      {/* Submit Modal Ends */}

    </div>
  );
}
