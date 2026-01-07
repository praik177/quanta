import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, Zap, Users, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Explorer', path: '/', icon: Home },
    { name: 'Free', path: '/free', icon: TrendingUp },
    { name: 'Pro', path: '/pro', icon: Zap },
    { name: 'Social', path: '/social', icon: Users },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const styles = {
    sidebar: {
      height: '100vh',
      width: '256px',
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      borderRight: '1px solid rgba(71, 85, 105, 0.5)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(71, 85, 105, 0.3)'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #c084fc, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.25rem'
    },
    tagline: {
      fontSize: '0.75rem',
      color: '#94a3b8'
    },
    nav: {
      flex: 1,
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    navItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      textDecoration: 'none',
      color: isActive ? 'white' : '#94a3b8',
      background: isActive ? 'linear-gradient(to right, #9333ea, #db2777)' : 'transparent',
      transition: 'all 0.2s',
      cursor: 'pointer',
      fontWeight: '500',
      position: 'relative'
    }),
    proBadge: {
      marginLeft: 'auto',
      fontSize: '0.625rem',
      backgroundColor: '#eab308',
      color: '#000',
      padding: '0.25rem 0.5rem',
      borderRadius: '9999px',
      fontWeight: 'bold'
    },
    footer: {
      padding: '1rem',
      borderTop: '1px solid rgba(71, 85, 105, 0.3)'
    },
    userInfo: {
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(71, 85, 105, 0.3)'
    },
    username: {
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
      color: '#cbd5e1'
    },
    email: {
      fontSize: '0.75rem',
      color: '#64748b'
    },
    logoutButton: {
      width: '100%',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: '#ef4444',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem',
      transition: 'background-color 0.2s'
    },
    footerText: {
      fontSize: '0.75rem',
      color: '#64748b',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.sidebar}>
      {/* Logo/Brand Section */}
      <div style={styles.header}>
        <div style={styles.logo}>QUANTA</div>
        <div style={styles.tagline}>Predict. Simulate. Profit.</div>
      </div>

      {/* Navigation Items */}
      <nav style={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              style={styles.navItem(isActive)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(71, 85, 105, 0.3)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
            >
              <Icon size={20} />
              <span>{item.name}</span>
              {item.name === 'Pro' && (
                <span style={styles.proBadge}>PRO</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section with User Info and Logout */}
      <div style={styles.footer}>
        {user && (
          <div style={styles.userInfo}>
            <div style={styles.username}>{user.username}</div>
            <div style={styles.email}>{user.email}</div>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
          }}
        >
          <LogOut size={16} />
          Log Out
        </button>
        <p style={styles.footerText}>© 2025 Quanta</p>
      </div>
    </div>
  );
};

export default Sidebar;