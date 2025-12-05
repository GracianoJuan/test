'use client';

import { useState } from 'react';
import { UserRequest, userRequests, roleConfig } from '@/config/userConfig';
import { Check, X, Mail, MessageSquare, AlertCircle } from 'lucide-react';

export default function ReqTable() {
  const [requests, setRequests] = useState<UserRequest[]>(userRequests);
  const [selectedRole, setSelectedRole] = useState<Record<string, string>>({});

  const handleApprove = (id: string) => {
    const request = requests.find(r => r.id === id);
    const assignedRole = selectedRole[id] || request?.requestedRole;
    
    console.log('Approving request:', { id, assignedRole });
    alert(`User ${request?.name} disetujui dengan role: ${assignedRole}`);
    
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleReject = (id: string) => {
    const request = requests.find(r => r.id === id);
    console.log('Rejecting request:', id);
    alert(`Permintaan dari ${request?.name} ditolak`);
    
    setRequests(requests.filter(r => r.id !== id));
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');

  if (pendingRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">Tidak ada permintaan pending</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nama</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal Request</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role yang Diminta</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Assign Role</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pendingRequests.map((request) => {
            const roleStyle = roleConfig[request.requestedRole];
            
            return (
              <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800">{request.name}</p>
                    {request.message && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MessageSquare size={12} />
                        {request.message}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm">{request.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">

                    <span className="text-sm">
                      {new Date(request.requestDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${roleStyle.color}`}>
                    {roleStyle.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={selectedRole[request.id] || request.requestedRole}
                    onChange={(e) => setSelectedRole({ ...selectedRole, [request.id]: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="partner">Partner</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      title="Approve"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Reject"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}