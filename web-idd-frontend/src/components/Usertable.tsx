'use client';

import { useState } from 'react';
import { User, existingUsers, roleConfig } from '@/config/userConfig';
import { Mail, Calendar, Circle, Trash2 } from 'lucide-react';

export default function UserTable() {
  const [users] = useState<User[]>(existingUsers);
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredUsers = filterRole === 'all' 
    ? users 
    : users.filter(u => u.role === filterRole);

  return (
    <div>
      {/* Filter */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Filter Role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Role</option>
            <option value="admin">Administrator</option>
            <option value="user">User</option>
            <option value="partner">Partner</option>
          </select>
          <span className="text-sm text-gray-600">
            Total: {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Terdaftar</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Login</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => {
              const roleStyle = roleConfig[user.role];
              
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${roleStyle.color}`}>
                      {roleStyle.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm">
                        {new Date(user.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {user.lastLogin 
                        ? new Date(user.lastLogin).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })
                        : '-'
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Circle 
                        size={8} 
                        className={user.isActive ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'} 
                      />
                      <span className={`text-sm ${user.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}