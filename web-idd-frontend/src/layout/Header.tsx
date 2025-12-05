import React from "react";
import { Menu, X, User, LogOut } from 'lucide-react';
import Link from "next/link";


interface HeaderProps {
  title?: string;
  setOpen: () => void;
  isOpen: boolean;
  setNav: () => void;
  navOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, setOpen, isOpen, setNav, navOpen }) => {
  return (
    <div className="bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={setNav}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle navigation"
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-12 rounded-lg bg-[url('/logo.png')] bg-cover bg-center flex items-center justify-center">

            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-gray-800">PT PLN Energi Primer Indonesia</h1>
              <p className="text-xs text-gray-500">Integrity Due Diligence System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <h2 className="hidden md:block text-lg font-semibold text-gray-700">{title}</h2>

          <div className="relative">
            <button
              onClick={setOpen}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Use menu"
            >
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@plnepi.co.id</p>
                </div>
                <Link className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                  href={'/profile'}
                >
                  <User size={16} />
                  Profil
                </Link>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-red-600 transition-colors">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;