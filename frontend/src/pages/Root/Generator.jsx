import { useEffect, useState } from 'react';
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

  async function handleSubmit() {
    if(!template) return alert("No Template!");
    if(!title.length) return alert("No Title!");
    if(!desc.length) return alert("No Description!");
    if(!date.length) return alert("No Date!");
    if(!sign.length) return alert("No Signature!");
    if(!file) return alert("No File!");
    
    let formData = new FormData();
    formData.append('template', template);
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('date', date);
    formData.append('signature', sign);
    formData.append('file', file);

    await fetch('/api/generator', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div>

      <div>
        <div className='md:w-[65%] w-[92%] mx-auto py-10 md:py-40'>

          <h1 className='text-center text-white font-semibold md:text-4xl text-3xl'>Create Your Certificate</h1>
          <h2 className="my-5 text-center text-[#999] text-2xl">Select a template, enter some values and hit PLACEHOLDER to get your certificates</h2>

          <div className="bg-screenbglight rounded-lg p-6 md:p-8">

            <div>

              <h2 className='text-white font-medium md:text-2xl text-xl'>Select Certificate Template</h2>
              <p className="text-[#999] mt-1 mb-4">Our tool offers a wide range of templates to use as a base for designing your certificate.</p>

              <div className="grid md:grid-cols-3 gap-3">
                <img className="w-full border-4 border-transparent cursor-pointer template template-0" onClick={() => changeTemplate(0)} src="certificate.jpeg" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-1" onClick={() => changeTemplate(1)} src="certificate.jpeg" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-2" onClick={() => changeTemplate(2)} src="certificate.jpeg" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-3" onClick={() => changeTemplate(3)} src="certificate.jpeg" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-4" onClick={() => changeTemplate(4)} src="certificate.jpeg" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-5" onClick={() => changeTemplate(5)} src="certificate.jpeg" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-6" onClick={() => changeTemplate(6)} src="certificate.jpeg" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-7" onClick={() => changeTemplate(7)} src="certificate.jpeg" />
                <img className="w-full border-4 border-transparent cursor-pointer template template-8" onClick={() => changeTemplate(8)} src="certificate.jpeg" />
              </div>
            </div>

            <div className="mt-12">

              <h2 className='text-white font-medium md:text-2xl text-xl'>Enter Personalized Information</h2>
              <p className="text-[#999] mt-1 mb-4">Edit the details of your certificate to make it personal.</p>

              <div>

                <h3 className="text-white text-lg font-medium mb-1">Title</h3>
                <input value={title} onChange={inputChangeMade} name="title" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Description</h3>
                <textarea value={desc} onChange={inputChangeMade} name="description" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Date</h3>
                <input value={date} onChange={inputChangeMade} name="date" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Signature</h3>
                <input value={sign} onChange={inputChangeMade} name="signature" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />
              
              </div>
            </div>

            <div className="mt-12">

              <h2 className='text-white font-medium md:text-2xl text-xl'>Upload Student Data</h2>
              <p className="text-[#999] mt-1 mb-4">Upload an Excel file (.xlsx) containing the names of your students.</p>

              <div className='mt-8 flex flex-col md:flex-row md:items-center'>
                <div>
                  <label className='text-white bg-blurple font-medium px-5 py-3 rounded-lg border-blurple hover:bg-blurplehover hover:border-blurplehover' htmlFor="excel" >Choose File</label>
                  <input onChange={fileUploaded} name="excel" type="file" accept='.xlsx,.xls' id='excel' hidden/>
                </div>
                <span className='text-white md:ml-3 mt-5 md:mt-0 md:max-w-[60%]' id='file-name'>No file chosen</span>
              </div>
              
            </div>
            
            <div className='mt-12'>
              <button className='text-green-500 border border-green-500 px-5 py-3' onClick={handleSubmit} >Submit</button>
            </div>
            
          </div>

        </div>
      </div>

    </div>
  );
}
