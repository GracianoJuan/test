'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || 'all');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateURL(value, filterStatus);
  };

  const handleFilter = (value: string) => {
    setFilterStatus(value);
    updateURL(searchTerm, value);
  };

  const updateURL = (search: string, status: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status !== 'all') params.set('status', status);
    router.push(`/penilaian-idd?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari nama mitra atau perusahaan..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => handleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Status</option>
            <option value="submitted">Menunggu Review</option>
            <option value="reviewed">Sudah Direview</option>
            <option value="revision">Perlu Revisi</option>
            <option value="not-submitted">Belum Disubmit</option>
          </select>
        </div>
      </div>
    </div>
  );
}
