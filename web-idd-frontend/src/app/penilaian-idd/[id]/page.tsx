import { evalConfig, evaluationCriteria, mockFormAnswers } from '@/config/evalConfig';
import { notFound } from 'next/navigation';
import ReviewForm from '@/components/ReviewForm';

interface PageProps {
  params: any;
}

const PartnerDetailPage = async ({ params }: PageProps) => {
  const { id } = await params
  const partner = evalConfig.find(p => p.id === id)

  if (!partner) {
    notFound()
  }

  const forms = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const formTitles: Record<string, string> = {
    'A': 'Informasi Perusahaan',
    'B': 'Informasi Afiliasi Mitra',
    'C': 'Hubungan dengan Pemerintah',
    'D': 'Informasi Litigasi',
    'E': 'Keterlibatan dengan Sanctioned Country',
    'F': 'Informasi Keuangan dan Pembayaran',
    'G': 'Etika Bisnis',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ReviewForm
        partner={partner}
        forms={forms}
        formTitles={formTitles}
        evaluationCriteria={evaluationCriteria}
        mockFormAnswers={mockFormAnswers}
      />
      <div>
        All result
      </div>
    </div>
  )
}

export default PartnerDetailPage