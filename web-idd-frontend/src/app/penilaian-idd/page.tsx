import { evalConfig } from '@/config/evalConfig';
import PenilaianStats from '@/components/PenilaianStats';
import SearchFilter from '@/components/SearchFilter';
import PartnerCard from '@/components/PartnerCard';
import { FileX } from 'lucide-react';

interface PageProps {
  searchParams: {
    search?: string;
    status?: string;
  };
}

const PenilaianIDD = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const searchTerm = params.search?.toLowerCase() || '';
  const filterStatus = params.status || 'all';

  const filteredPartners = evalConfig.filter((partner) => {
    const matchSearch =
      partner.partnerName.toLowerCase().includes(searchTerm) ||
      partner.companyName.toLowerCase().includes(searchTerm);

    const matchFilter = filterStatus === 'all' || partner.status === filterStatus;

    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Penilaian IDD</h1>
        <p className="text-gray-600">Review dan evaluasi form IDD dari mitra</p>
      </div>

      <PenilaianStats />
      <SearchFilter />

      <div className="space-y-4">
        {filteredPartners.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FileX size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Tidak ada data yang sesuai dengan pencarian</p>
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))
        )}
      </div>
    </div>
  );
}

export default PenilaianIDD