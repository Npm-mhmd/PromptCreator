import { NavLink } from 'react-router-dom';
import { FiGrid, FiZap, FiBookmark, FiLayers, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const links = [
  { to: '/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/generate', icon: FiZap, label: 'Generate' },
  { to: '/library', icon: FiBookmark, label: 'My Prompts' },
  { to: '/templates', icon: FiLayers, label: 'Templates' },
  { to: '/settings', icon: FiSettings, label: 'Settings' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
];

const Sidebar = ({ open, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, themes } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: 'var(--bg-overlay)' }}
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 z-30 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--bg-sidebar)',
          borderRight: '2px solid var(--border-color)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <nav className="p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div
            className="p-4 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, var(--accent-light), transparent)`,
              border: '2px solid var(--accent-border)',
            }}
          >
            <p
              className="text-sm font-bold mb-1"
              style={{
                fontFamily: 'var(--font-sketch)',
                color: 'var(--accent)',
              }}
            >
              ✏️ Current Theme
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg">{themes[theme]?.emoji}</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {themes[theme]?.name}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-link w-full"
            style={{ color: 'var(--accent-rose)' }}
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
