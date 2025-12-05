export type FormStatus = 'pending' | 'in-progress' | 'done';

export interface FormConfigItem {
  form: string;
  status: FormStatus;
  title: string;
  description: string;
}

export const formConfig: FormConfigItem[] = [
  { 
    form: "A", 
    status: 'done',
    title: "Informasi Perusahaan",
    description: "Data umum dan profil perusahaan"
  },
  { 
    form: "B", 
    status: 'in-progress',
    title: "Informasi Afiliasi Mitra",
    description: "Hubungan afiliasi dan kemitraan"
  },
  { 
    form: "C", 
    status: 'pending',
    title: "Hubungan dengan Pemerintah",
    description: "Relasi dan interaksi dengan entitas pemerintah"
  },
  { 
    form: "D", 
    status: 'pending',
    title: "Informasi Litigasi",
    description: "Riwayat gugatan dan sengketa hukum"
  },
  { 
    form: "E", 
    status: 'pending',
    title: "Keterlibatan dengan Sanctioned Country",
    description: "Transaksi dengan negara yang dikenai sanksi"
  },
  { 
    form: "F", 
    status: 'pending',
    title: "Informasi Keuangan dan Pembayaran",
    description: "Data keuangan dan metode pembayaran"
  },
  { 
    form: "G", 
    status: 'pending',
    title: "Etika Bisnis",
    description: "Kebijakan dan praktik etika bisnis"
  },
];