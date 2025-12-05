'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PartnerSubmission, EvalCriteria, FormAnswer } from '@/config/evalConfig';
import { CheckCircle, FileCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface ReviewFormProps {
    partner: PartnerSubmission;
    forms: string[];
    formTitles: Record<string, string>;
    evaluationCriteria: Record<string, EvalCriteria[]>;
    mockFormAnswers: Record<string, FormAnswer[]>;
}

const ReviewForm = ({
    partner,
    forms,
    formTitles,
    evaluationCriteria,
    mockFormAnswers
}: ReviewFormProps) => {
    const router = useRouter();
    const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [expandedForms, setExpandedForms] = useState<Record<string, boolean>>({});

    const handleScoreChange = (form: string, criteria: string, score: number) => {
        setScores(prev => ({
            ...prev,
            [form]: {
                ...(prev[form] || {}),
                [criteria]: score
            }
        }));
    };

    const toggleForm = (form: string) => {
        setExpandedForms(prev => ({ ...prev, [form]: !prev[form] }));
    };

    const calculateFormScore = (form: string) => {
        const formScores = scores[form] || {};
        return Object.values(formScores).reduce((sum, score) => sum + score, 0);
    };

    const handleSubmitReview = () => {  
        console.log('Submitting review:', { partner, scores, notes });
        alert('Review berhasil disimpan!');
        router.push('/penilaian-idd');
    };

    const totalScore = forms.reduce((sum, form) => sum + calculateFormScore(form), 0) / forms.length || 0;

    return (
        <div className="bg-white rounded-xl shadow-md">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
                <button
                    onClick={() => router.push('/penilaian-idd')}
                    className="text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                >
                    ← Kembali ke Daftar
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                        {partner.partnerName.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{partner.partnerName}</h2>
                        <p className="text-gray-600">{partner.companyName}</p>
                        {partner.submissionDate && (
                            <p className="text-sm text-gray-500 mt-1">
                                Disubmit: {new Date(partner.submissionDate).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Forms Review */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Review Form IDD</h3>

                <div className="space-y-4">
                    {forms.map((form) => {
                        const isExpanded = expandedForms[form];
                        const formScore = calculateFormScore(form);
                        const answers = mockFormAnswers[form] || [];
                        const criteria = evaluationCriteria[form] || [];

                        return (
                            <div key={form} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                                {/* Form Header - Collapsible */}
                                <button
                                    onClick={() => toggleForm(form)}
                                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                            {form}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-semibold text-gray-800">Form {form}: {formTitles[form]}</h4>
                                            <p className="text-sm text-gray-600">Skor: {formScore.toFixed(1)}/100</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {partner.completedForms.includes(form) ? (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                                <CheckCircle size={14} />
                                                Lengkap
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                Belum Lengkap
                                            </span>
                                        )}
                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </button>

                                {/* Form Content - Expandable */}
                                {isExpanded && partner.completedForms.includes(form) && (
                                    <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-6">
                                        {/* User's Answers Section */}
                                        <div className="bg-white rounded-lg p-5 border border-gray-200">
                                            <h5 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <FileCheck size={18} className="text-blue-600" />
                                                Jawaban Mitra
                                            </h5>
                                            <div className="space-y-4">
                                                {answers.map((answer, idx) => (
                                                    <div key={answer.questionId} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                                            {idx + 1}. {answer.question}
                                                        </p>
                                                        {answer.answerType === 'table' && Array.isArray(answer.answer) ? (
                                                            <div className="overflow-x-auto">
                                                                <table className="min-w-full text-sm">
                                                                    <thead className="bg-gray-100">
                                                                        <tr>
                                                                            <th className="px-3 py-2 text-left font-medium text-gray-700">No</th>
                                                                            {Object.keys(answer.answer[0] || {}).map(key => (
                                                                                <th key={key} className="px-3 py-2 text-left font-medium text-gray-700 capitalize">
                                                                                    {key}
                                                                                </th>
                                                                            ))}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {answer.answer.map((row: any, rowIdx: number) => (
                                                                            <tr key={rowIdx} className="border-t border-gray-200">
                                                                                <td className="px-3 py-2 text-gray-600">{rowIdx + 1}</td>
                                                                                {Object.values(row).map((val: any, colIdx: number) => (
                                                                                    <td key={colIdx} className="px-3 py-2 text-gray-800">
                                                                                        {val}
                                                                                    </td>
                                                                                ))}
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-gray-800 bg-gray-50 px-3 py-2 rounded">
                                                                {Array.isArray(answer.answer)
                                                                    ? answer.answer.join(', ')
                                                                    : typeof answer.answer === 'object'
                                                                        ? JSON.stringify(answer.answer, null, 2)
                                                                        : String(answer.answer)
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        

                                        {/* Notes Section */}
                                        <div className="bg-white rounded-lg p-5 border border-gray-200">
                                            <label className="block text-sm font-semibold text-gray-800 mb-3">
                                                Catatan Reviewer untuk Form {form}
                                            </label>
                                            <textarea
                                                value={notes[form] || ''}
                                                onChange={(e) => setNotes({ ...notes, [form]: e.target.value })}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Tambahkan catatan, feedback, atau rekomendasi untuk form ini..."
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Summary */}
                <div className="mt-8 p-6 bg-linear-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Ringkasan Penilaian</h4>
                            <p className="text-sm text-gray-600">Total dari semua form yang dinilai</p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold text-blue-600">
                                {totalScore.toFixed(1)}
                            </p>
                            <p className="text-sm text-gray-600">dari 100</p>
                        </div>
                    </div>

                    {/* Score breakdown */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {forms.map(form => (
                            <div key={form} className="bg-white rounded-lg p-3 text-center">
                                <p className="text-xs text-gray-600 mb-1">Form {form}</p>
                                <p className="text-lg font-bold text-gray-800">{calculateFormScore(form).toFixed(1)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4 justify-end">
                    <button
                        onClick={() => router.push('/penilaian-idd')}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmitReview}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-md"
                    >
                        <FileCheck size={20} />
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm