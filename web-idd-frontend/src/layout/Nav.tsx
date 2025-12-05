import Link from "next/link";
import { Home, FileEdit, CheckSquare, UserCheck2, FileText } from 'lucide-react';

interface NavProps {
  currentPage?: string;
  isOpen: boolean;
  onClose: () => void;
}

// Import your pageList from the hook
import { pageList } from "@/hooks/usePage";

// Map icons to paths
const getIconForPath = (path: string) => {
  switch (path) {
    case '/':
      return Home;
    case '/form-idd':
      return FileEdit;
    case '/penilaian-idd':  
      return CheckSquare;
    case '/user-list':
      return UserCheck2;
    case '/lampiran':
      return FileText;
    default:
      return Home;
  }
};

const Nav: React.FC<NavProps> = ({ currentPage, isOpen, onClose }) => {
  const navClasses = `
    fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] lg:h-auto
    bg-white lg:bg-gray-50 shadow-lg lg:shadow-none
    w-64 lg:w-auto lg:flex-row
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    z-40 lg:z-auto`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-brightness-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <nav className={navClasses}>
        {/* <div className="lg:hidden px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-700">Navigasi</h3>
        </div> */}
        <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 p-4 lg:p-2 lg:bg-white lg:shadow-sm">
          {pageList.map((page) => {
            const Icon = getIconForPath(page.path);
            const isActive = currentPage === page.path;
            return (
              <li key={page.path}>
                <Link
                  href={page.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{page.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Nav;