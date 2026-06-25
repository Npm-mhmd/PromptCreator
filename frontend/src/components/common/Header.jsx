import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronDown, FiEdit3 } from 'react-icons/fi';

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b-2 border-ink-200 fixed top-0 left-0 right-0 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-paper-100 rounded-xl transition-colors lg:hidden border-2 border-transparent hover:border-ink-200"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-sketch font-bold text-ink-800 group-hover:text-sketch-coral transition-colors hidden sm:inline">
              Prompt Creator
            </span>
          </Link>
        </div>

        {user && (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-paper-100 rounded-xl transition-colors border-2 border-transparent hover:border-ink-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sketch-coral to-sketch-peach flex items-center justify-center text-sm font-bold text-white shadow-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-ink-700 hidden sm:block">{user.name}</span>
              <FiChevronDown size={14} className="text-ink-400" />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-ink-200 rounded-2xl shadow-lg z-20 py-1 animate-fade-in overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink-700 hover:bg-paper-100 transition-colors"
                  >
                    <FiUser size={16} />
                    Profile
                  </Link>
                  <hr className="border-ink-100" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-sketch-rose hover:bg-paper-100 transition-colors w-full"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
