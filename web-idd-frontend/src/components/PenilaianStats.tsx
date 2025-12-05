import { evalConfig } from '@/config/evalConfig';
import { Building2, Clock, CheckCircle, FileX } from 'lucide-react';

export default function PenilaianStats() {
  const stats = {
    total: evalConfig.length,
    submitted: evalConfig.filter(p => p.status === 'submitted').length,
    reviewed: evalConfig.filter(p => p.status === 'reviewed').length,
    notSubmitted: evalConfig.filter(p => p.status === 'not-submitted').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Mitra</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Building2 className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Menunggu Review</p>
            <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Clock className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Sudah Direview</p>
            <p className="text-2xl font-bold text-green-600">{stats.reviewed}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Belum Submit</p>
            <p className="text-2xl font-bold text-gray-600">{stats.notSubmitted}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <FileX className="text-gray-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}