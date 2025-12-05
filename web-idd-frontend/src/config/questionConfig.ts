// config/questionConfig.ts
export type AnswerType = 'text' | 'radio' | 'table' | 'radio-then-table' | 'radio-then-text';

export interface Question {
  id: string;
  question: string;
  answerType: AnswerType;
  options?: string[];
  tableConfig?: TableConfig;
}

export interface TableConfig {
  columns: TableColumn[];
}

export interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  placeholder?: string;
  options?: string[];
}

// Predefined option sets for reusability
export const optionSets = {
  yesNo: ['Ya', 'Tidak'],
  trueFalse: ['Benar', 'Salah'],
  bentukPerusahaan: ['Dalam Negeri', 'Luar Negeri'],
  tipePerusahaan: [
    'BUMN',
    'Joint Venture',
    'Konsorsium',
    'UMKM',
    'Koperasi',
    'Agen Tunggal/Agen/Distributor',
    'Lembaga Ilmiah/Pendidikan/Penelitian Negeri Swasta',
    'Nirlaba/Non Profit',
    'Lembaga/Badan Pemerintah',
    'Lainnya'
  ],
  klasifikasiPerusahaan: ['Kecil', 'Menengah', 'Besar'],
};

// Predefined table configurations
export const tableConfigs = {
  shareholders: {
    columns: [
      { key: 'nama', label: 'Nama Pemegang Saham', type: 'text' as const, placeholder: 'Nama lengkap' },
      { key: 'persentase', label: 'Persentase (%)', type: 'number' as const, placeholder: '0-100' },
    ]
  },
  litigation: {
    columns: [
      { key: 'jenis', label: 'Jenis Kasus', type: 'text' as const, placeholder: 'Jenis kasus' },
      { key: 'status', label: 'Status', type: 'select' as const, options: ['Berjalan', 'Selesai', 'Banding'] },
      { key: 'tahun', label: 'Tahun', type: 'number' as const, placeholder: 'YYYY' },
    ]
  },
  directors: {
    columns: [
      { key: 'nama', label: 'Nama', type: 'text' as const, placeholder: 'Nama lengkap' },
      { key: 'jabatan', label: 'Jabatan', type: 'select' as const, options: ['Direktur Utama', 'Direktur', 'Komisaris'] },
      { key: 'periode', label: 'Periode', type: 'text' as const, placeholder: '2020-2025' },
    ]
  },
  affiliates: {
    columns: [
      { key: 'namaPerusahaan', label: 'Nama Perusahaan', type: 'text' as const, placeholder: 'Nama perusahaan afiliasi' },
      { key: 'hubungan', label: 'Hubungan', type: 'text' as const, placeholder: 'Jenis hubungan' },
      { key: 'negara', label: 'Negara', type: 'text' as const, placeholder: 'Negara domisili' },
    ]
  },
};

// Mock questions data - Form A (Informasi Perusahaan)
export const questionsFormA: Question[] = [
  {
    id: 'A1',
    question: 'Nama lengkap perusahaan sesuai dengan akta pendirian?',
    answerType: 'text'
  },
  {
    id: 'A2',
    question: 'Bentuk perusahaan?',
    answerType: 'radio',
    options: optionSets.bentukPerusahaan
  },
  {
    id: 'A3',
    question: 'Tipe perusahaan?',
    answerType: 'radio',
    options: optionSets.tipePerusahaan
  },
  {
    id: 'A4',
    question: 'Klasifikasi perusahaan berdasarkan aset?',
    answerType: 'radio',
    options: optionSets.klasifikasiPerusahaan
  },
  {
    id: 'A5',
    question: 'Daftar pemegang saham perusahaan',
    answerType: 'table',
    tableConfig: tableConfigs.shareholders
  },
  {
    id: 'A6',
    question: 'Daftar direksi dan komisaris',
    answerType: 'table',
    tableConfig: tableConfigs.directors
  },
];

// Mock questions data - Form B (Informasi Afiliasi Mitra)
export const questionsFormB: Question[] = [
  {
    id: 'B1',
    question: 'Apakah perusahaan memiliki afiliasi dengan perusahaan lain?',
    answerType: 'radio-then-table',
    options: optionSets.yesNo,
    tableConfig: tableConfigs.affiliates
  },
  {
    id: 'B2',
    question: 'Apakah terdapat hubungan kepemilikan silang?',
    answerType: 'radio-then-text',
    options: optionSets.yesNo
  },
];

// Mock questions data - Form C (Hubungan dengan Pemerintah)
export const questionsFormC: Question[] = [
  {
    id: 'C1',
    question: 'Apakah terdapat direksi/komisaris yang memiliki hubungan dengan pejabat pemerintah?',
    answerType: 'radio-then-text',
    options: optionSets.yesNo
  },
  {
    id: 'C2',
    question: 'Apakah perusahaan pernah menerima kontrak dari pemerintah?',
    answerType: 'radio',
    options: optionSets.yesNo
  },
];

// Mock questions data - Form D (Informasi Litigasi)
export const questionsFormD: Question[] = [
  {
    id: 'D1',
    question: 'Apakah terdapat kasus litigasi yang sedang berjalan?',
    answerType: 'radio-then-table',
    options: optionSets.yesNo,
    tableConfig: tableConfigs.litigation
  },
  {
    id: 'D2',
    question: 'Apakah perusahaan pernah dinyatakan pailit?',
    answerType: 'radio-then-text',
    options: optionSets.yesNo
  },
];

// Mock questions data - Form E (Keterlibatan dengan Sanctioned Country)
export const questionsFormE: Question[] = [
  {
    id: 'E1',
    question: 'Apakah perusahaan melakukan transaksi dengan negara yang dikenai sanksi internasional?',
    answerType: 'radio-then-text',
    options: optionSets.yesNo
  },
];

// Mock questions data - Form F (Informasi Keuangan dan Pembayaran)
export const questionsFormF: Question[] = [
  {
    id: 'F1',
    question: 'Total aset perusahaan (dalam miliar rupiah)',
    answerType: 'text'
  },
  {
    id: 'F2',
    question: 'Apakah laporan keuangan diaudit oleh KAP terdaftar?',
    answerType: 'radio',
    options: optionSets.yesNo
  },
];

// Mock questions data - Form G (Etika Bisnis)
export const questionsFormG: Question[] = [
  {
    id: 'G1',
    question: 'Apakah perusahaan memiliki kebijakan anti-korupsi tertulis?',
    answerType: 'radio',
    options: optionSets.yesNo
  },
  {
    id: 'G2',
    question: 'Frekuensi pelatihan etika bisnis per tahun',
    answerType: 'text'
  },
];

// Map form letters to their questions
export const formQuestions: Record<string, Question[]> = {
  'A': questionsFormA,
  'B': questionsFormB,
  'C': questionsFormC,
  'D': questionsFormD,
  'E': questionsFormE,
  'F': questionsFormF,
  'G': questionsFormG,
};

// Helper function to get questions by form
export const getQuestionsByForm = (formLetter: string): Question[] => {
  return formQuestions[formLetter] || [];
};