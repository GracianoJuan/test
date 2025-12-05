import { FileText, BarChart, CheckCircle, Download } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className=" bg-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Selamat Datang di Sistem IDD
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl">
          Platform Integrity Due Diligence PT PLN Energi Primer Indonesia.
        </p>
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
      
        {/* kalian dapat mengunduh user manual disini */}
        <button className='bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex gap-2 rounded-md px-2 py-1'>Unduh User Manual<Download/></button>

        <div className="space-y-4">
          {/* {[
            { title: 'Belum mengisi profil', time: '2 jam yang lalu' },
            { title: 'Penilaian IDD selesai direview', time: '5 jam yang lalu' },
            { title: 'Form IDD baru dibuat', time: '1 hari yang lalu' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Home;