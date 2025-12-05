// config/userConfig.ts
export type UserRole = 'admin' | 'assessor' | 'viewer' | 'partner';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface UserRequest {
  id: string;
  name: string;
  email: string;
  requestedRole: UserRole;
  requestDate: string;
  status: RequestStatus;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

// Mock data for user requests
export const userRequests: UserRequest[] = [
  {
    id: '1',
    name: 'Ahmad Firmansyah',
    email: 'ahmad.firmansyah@example.com',
    requestedRole: 'partner',
    requestDate: '2025-11-28',
    status: 'pending',
    message: 'Ingin mendaftar sebagai mitra untuk PT ABC Indonesia'
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    email: 'siti.nur@example.com',
    requestedRole: 'viewer',
    requestDate: '2025-11-27',
    status: 'pending',
    message: 'Request akses untuk review IDD'
  },
  {
    id: '12',
    name: 'adada dadaurhaliza',
    email: 'siti.nur@example.com',
    requestedRole: 'admin',
    requestDate: '2025-11-27',
    status: 'pending',
    message: 'Request akses untuk manage IDD'
  },
  {
    id: '3',
    name: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    requestedRole: 'partner',
    requestDate: '2025-11-25',
    status: 'approved',
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@example.com',
    requestedRole: 'assessor',
    requestDate: '2025-11-24',
    status: 'rejected',
  },
];

// Mock data for existing users
export const existingUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@plnepi.co.id',
    role: 'admin',
    createdAt: '2024-01-15',
    lastLogin: '2025-11-30',
    isActive: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@plnepi.co.id',
    role: 'viewer',
    createdAt: '2024-03-20',
    lastLogin: '2025-11-29',
    isActive: true
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@partner.com',
    role: 'partner',
    createdAt: '2024-05-10',
    lastLogin: '2025-11-28',
    isActive: true
  },
  {
    id: '4',
    name: 'Maria Garcia',
    email: 'maria@partner.com',
    role: 'partner',
    createdAt: '2024-06-15',
    lastLogin: '2025-10-15',
    isActive: false
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@plnepi.co.id',
    role: 'assessor',
    createdAt: '2024-08-01',
    lastLogin: '2025-11-30',
    isActive: true
  },
];

// Role display configuration
export const roleConfig: Record<UserRole, { label: string; color: string }> = {
  admin: {
    label: 'Admin',
    color: 'bg-red-100 text-purple-700 border-purple-200'
  },
  assessor: {
    label: 'assessor',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  viewer: {
    label: 'assessor',
    color: 'bg-yellow-100 text-blue-700 border-blue-200'
  },
  partner: {
    label: 'Partner',
    color: 'bg-green-100 text-green-700 border-green-200'
  }
};