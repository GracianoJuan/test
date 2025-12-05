'use client';

import { useState } from 'react';
import UserTable from '@/components/Usertable';
import ReqTable from '@/components/ReqTable'
import { userRequests } from '@/config/userConfig';

const UserList = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'users'>('requests');

  const pendingCount = userRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">User Management</h1>
        <p className="text-gray-600">Kelola permintaan dan daftar user</p>
      </div>

      {/* Tab Container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <ul className="flex">
            <li className="flex-1">
              <button
                onClick={() => setActiveTab('requests')}
                className={`w-full px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'requests'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  Daftar Permintaan
                  {pendingCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </div>
                {activeTab === 'requests' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            </li>
            <li className="flex-1">
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'users'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
              >
                Daftar Akun
                {activeTab === 'users' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            </li>
          </ul>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'requests' ? <ReqTable /> : <UserTable />}
        </div>
      </div>
    </div>
  );
}

export default UserList
/**
 * config approve user : name email from assign role,action (approve, reject/delete)
 * config all user list (only show name email role)
 * make sure the config isnt mixed with the page/component code so i can easily change it later with actual value
 */