export default function Generator() {
  return (
    <div>

      <div>
        <div className='md:w-[50%] w-[92%] mx-auto py-10 md:py-40'>
          <h1 className='text-center text-white font-semibold md:text-4xl text-3xl'>Create Your Certificate</h1>
          <h2 className="my-5 text-center text-[#999] text-2xl">Select a template, enter some values and hit PLACEHOLDER to get your certificates</h2>

          <div className="bg-screenbglight rounded-lg p-6 md:p-8">

            <div>
              <h2 className='text-white font-medium md:text-2xl text-xl'>Select Certificate Template</h2>
              <p className="text-[#999] mt-1 mb-4">Our tool offers a wide range of templates to use as a base for designing your certificate.</p>

              <div className="grid md:grid-cols-3 gap-3">
                <img className="w-full" src="certificate.jpeg" />
                <img className="w-full" src="certificate.jpeg" />
                <img className="w-full" src="certificate.jpeg" />
                <img className="w-full" src="certificate.jpeg" />
                <img className="w-full" src="certificate.jpeg" />
                <img className="w-full" src="certificate.jpeg" />
                <img className="w-full" src="certificate.jpeg" />
                <img className="w-full" src="certificate.jpeg" />
                <img className="w-full" src="certificate.jpeg" />
              </div>
            </div>

            <div className="mt-12">
              <h2 className='text-white font-medium md:text-2xl text-xl'>Enter Personalized Information</h2>
              <p className="text-[#999] mt-1 mb-4">Edit the details of your certificate to make it personal.</p>

              <div>
                <h3 className="text-white text-lg font-medium mb-1">Title</h3>
                <input name="title" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Description</h3>
                <input name="description" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Date</h3>
                <input name="date" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />

                <h3 className="text-white text-lg font-medium mb-1 mt-4">Signature</h3>
                <input name="signature" className="w-[100%] rounded-lg bg-cardbgdark text-white p-2 focus:outline-none" type="text" />
              </div>
            </div>

            <div className="mt-12">
              <h2 className='text-white font-medium md:text-2xl text-xl'>Upload Student Data</h2>
              <p className="text-[#999] mt-1 mb-4">Upload an Excel file (.xlsx) containing the names of your students.</p>

              <div>
                <input name="excel" type="file" />
              </div>
            </div>
            
          </div>

        </div>
      </div>

    </div>
  );
}
