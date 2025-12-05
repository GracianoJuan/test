export type SubmissionStatus = 'submitted' | 'not-submitted' | 'reviewed' | 'revision' | 'failed'

export interface PartnerSubmission {
  id: string;
  partnerName: string;
  companyName: string;
  submissionDate: string | null;
  status: SubmissionStatus;
  completedForms: string[];
  totalForms: number;
  score?: number;
  reviewer?: string;
}

export const evalConfig: PartnerSubmission[] = [
  {
    id: '1',
    partnerName: 'John Doe',
    companyName: 'PT ABC Indonesia',
    submissionDate: '2025-11-15',
    status: 'submitted',
    completedForms: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    totalForms: 7,
  },
  {
    id: '2',
    partnerName: 'Jane Smith',
    companyName: 'PT XYZ Energi',
    submissionDate: '2025-11-10',
    status: 'reviewed',
    completedForms: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    totalForms: 7,
    score: 85,
    reviewer: 'Ahmad Hidayat',
  },
  {
    id: '3',
    partnerName: 'Robert Johnson',
    companyName: 'PT Mitra Sejahtera',
    submissionDate: null,
    status: 'not-submitted',
    completedForms: ['A', 'B', 'C'],
    totalForms: 7,
  },
  {
    id: '4',
    partnerName: 'Maria Garcia',
    companyName: 'PT Global Resources',
    submissionDate: '2025-11-12',
    status: 'failed',
    completedForms: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    totalForms: 7,
    score: 65,
    reviewer: 'Siti Nurhaliza',
  },
];

// Evaluation criteria for each form
export interface EvalCriteria {
  category: string;
  weight: number;
  description: string;
  maxScore: number;
}

export const evaluationCriteria: Record<string, EvalCriteria[]> = {
  'A': [
    { category: 'Kelengkapan Data', weight: 30, description: 'Semua informasi perusahaan lengkap dan akurat', maxScore: 30 },
    { category: 'Validitas Dokumen', weight: 40, description: 'Dokumen pendukung valid dan sesuai', maxScore: 40 },
    { category: 'Konsistensi Informasi', weight: 30, description: 'Informasi konsisten dengan dokumen', maxScore: 30 },
  ],
  'B': [
    { category: 'Transparansi Afiliasi', weight: 40, description: 'Pengungkapan afiliasi lengkap dan jelas', maxScore: 40 },
    { category: 'Struktur Kepemilikan', weight: 35, description: 'Struktur kepemilikan terdokumentasi dengan baik', maxScore: 35 },
    { category: 'Compliance', weight: 25, description: 'Tidak ada conflict of interest', maxScore: 25 },
  ],
  'C': [
    { category: 'Keterbukaan Informasi', weight: 40, description: 'Pengungkapan hubungan dengan pemerintah', maxScore: 40 },
    { category: 'Integritas', weight: 35, description: 'Tidak ada indikasi pelanggaran etika', maxScore: 35 },
    { category: 'Dokumentasi', weight: 25, description: 'Dokumentasi lengkap dan terverifikasi', maxScore: 25 },
  ],
  'D': [
    { category: 'Riwayat Litigasi', weight: 50, description: 'Tidak ada litigasi material atau sudah selesai', maxScore: 50 },
    { category: 'Transparansi', weight: 30, description: 'Pengungkapan penuh atas kasus hukum', maxScore: 30 },
    { category: 'Risk Assessment', weight: 20, description: 'Penilaian risiko hukum yang memadai', maxScore: 20 },
  ],
  'E': [
    { category: 'Compliance Sanksi', weight: 60, description: 'Tidak terlibat dengan negara yang dikenai sanksi', maxScore: 60 },
    { category: 'Due Diligence', weight: 40, description: 'Proses screening dan verifikasi memadai', maxScore: 40 },
  ],
  'F': [
    { category: 'Kesehatan Keuangan', weight: 35, description: 'Kondisi keuangan perusahaan sehat', maxScore: 35 },
    { category: 'Transparansi Keuangan', weight: 30, description: 'Laporan keuangan transparan dan audited', maxScore: 30 },
    { category: 'Payment Terms', weight: 35, description: 'Metode pembayaran jelas dan compliant', maxScore: 35 },
  ],
  'G': [
    { category: 'Kebijakan Anti-Korupsi', weight: 35, description: 'Kebijakan anti-korupsi yang jelas', maxScore: 35 },
    { category: 'Implementasi', weight: 40, description: 'Implementasi kebijakan etika bisnis efektif', maxScore: 40 },
    { category: 'Training & Awareness', weight: 25, description: 'Program pelatihan etika berjalan', maxScore: 25 },
  ],
};

// Mock user form answers
export interface FormAnswer {
  questionId: string;
  question: string;
  answer: string | string[] | Record<string, any>;
  answerType: 'text' | 'radio' | 'table';
}

export const mockFormAnswers: Record<string, FormAnswer[]> = {
  'A': [
    {
      questionId: '1',
      question: 'Nama lengkap perusahaan sesuai dengan akta pendirian?',
      answer: 'PT ABC Indonesia Sejahtera',
      answerType: 'text'
    },
    {
      questionId: '2',
      question: 'Tahun pendirian perusahaan?',
      answer: '2015',
      answerType: 'text'
    },
    {
      questionId: '3',
      question: 'Apakah perusahaan memiliki izin operasional yang valid?',
      answer: 'Ya',
      answerType: 'radio'
    },
  ],
  'B': [
    {
      questionId: '1',
      question: 'Apakah perusahaan memiliki afiliasi dengan perusahaan lain?',
      answer: 'Ya',
      answerType: 'radio'
    },
    {
      questionId: '2',
      question: 'Daftar pemegang saham perusahaan',
      answer: [
        { nama: 'John Doe', persentase: '60%' },
        { nama: 'Jane Smith', persentase: '40%' }
      ],
      answerType: 'table'
    },
  ],
  'C': [
    {
      questionId: '1',
      question: 'Apakah terdapat direksi/komisaris yang memiliki hubungan dengan pejabat pemerintah?',
      answer: 'Tidak',
      answerType: 'radio'
    },
  ],
  'D': [
    {
      questionId: '1',
      question: 'Apakah terdapat kasus litigasi yang sedang berjalan?',
      answer: 'Tidak',
      answerType: 'radio'
    },
  ],
  'E': [
    {
      questionId: '1',
      question: 'Apakah perusahaan melakukan transaksi dengan negara yang dikenai sanksi internasional?',
      answer: 'Tidak',
      answerType: 'radio'
    },
  ],
  'F': [
    {
      questionId: '1',
      question: 'Total aset perusahaan (dalam miliar rupiah)',
      answer: '500',
      answerType: 'text'
    },
    {
      questionId: '2',
      question: 'Apakah laporan keuangan diaudit oleh KAP terdaftar?',
      answer: 'Ya',
      answerType: 'radio'
    },
  ],
  'G': [
    {
      questionId: '1',
      question: 'Apakah perusahaan memiliki kebijakan anti-korupsi tertulis?',
      answer: 'Ya',
      answerType: 'radio'
    },
    {
      questionId: '2',
      question: 'Frekuensi pelatihan etika bisnis per tahun',
      answer: '2 kali per tahun',
      answerType: 'text'
    },
  ],
};