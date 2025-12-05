import { PartnerSubmission } from '@/config/evalConfig';
import { Building2, Calendar, User, Clock, CheckCircle, AlertCircle, FileX } from 'lucide-react';
import Link from 'next/link';

interface PartnerCardProps {
  partner: PartnerSubmission;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'submitted':
        return {
          label: 'Menunggu Review',
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: <Clock size={16} />,
          bgColor: 'bg-blue-50',
        };
      case 'reviewed':
        return {
          label: 'Sudah Direview',
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: <CheckCircle size={16} />,
          bgColor: 'bg-green-50',
        };
      case 'failed':
        return {
          label: 'Resiko Tinggi',
          color: 'bg-red-100 text-yellow-700 border-yellow-200',
          icon: <AlertCircle size={16} />,
          bgColor: 'bg-red-50',
        };
      default:
        return {
          label: 'Belum Disubmit',
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: <FileX size={16} />,
          bgColor: 'bg-gray-50',
        };
    }
  };

  const statusConfig = getStatusConfig(partner.status);
  const progressPercentage = (partner.completedForms.length / partner.totalForms) * 100;

  return (
    <div className={`bg-white border-2 rounded-xl shadow-md p-6 hover:shadow-lg transition-all ${statusConfig.bgColor} border-gray-200`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">
              {partner.partnerName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{partner.partnerName}</h3>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusConfig.color} flex items-center gap-1`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <Building2 size={16} />
                {partner.companyName}
              </p>

              {partner.submissionDate && (
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <Calendar size={14} />
                  Disubmit: {new Date(partner.submissionDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}

              {partner.reviewer && (
                <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                  <User size={14} />
                  Reviewer: {partner.reviewer}
                </p>
              )}
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress Form ({partner.completedForms.length}/{partner.totalForms})</span>
              <span className="font-semibold">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {partner.score !== undefined && (
            <div className="mt-3">
              <span className="text-sm font-medium text-gray-700">
                Skor: <span className={`text-lg font-bold ${
                  partner.score >= 80 ? 'text-green-600' : 
                  partner.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>{partner.score}</span>/100
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {partner.status === 'not-submitted' ? (
            <button
              disabled
              className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed flex items-center gap-2 justify-center"
            >
              <FileX size={18} />
              Belum Tersedia
            </button>
          ) : (
            <Link
              href={`/penilaian-idd/${partner.id}`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
            >
              {partner.status === 'submitted' ? 'Mulai Review' : 'Lihat Detail'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}