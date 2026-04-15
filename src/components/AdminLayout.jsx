import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin/dashboard', icon: 'speedometer2', label: 'Dashboard' },
  { to: '/admin/inquiries', icon: 'envelope', label: 'Inquiries' },
  { to: '/admin/projects', icon: 'building', label: 'Projects' },
  { to: '/admin/services', icon: 'tools', label: 'Services' },
  { to: '/admin/users', icon: 'people', label: 'Users' },
  { to: '/admin/roles', icon: 'shield-lock', label: 'Roles' },
  { to: '/admin/profile', icon: 'person-gear', label: 'Profile' },
];

const AdminLayout = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <i className="bi bi-building-fill"></i>
          <span>ML Construction</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ to, icon, label }) => (
            <div className="nav-item" key={to}>
              <NavLink to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className={`bi bi-${icon}`}></i>{label}
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="d-flex align-items-center gap-2 mb-3">
            <div style={{ width: 38, height: 38, background: 'var(--gradient-primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className="bi bi-person-fill" style={{ color: '#000' }}></i>
            </div>
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 600 }}>{user?.username}</div>
              <div style={{ color: 'var(--primary)', fontSize: '0.75rem', textTransform: 'capitalize' }}>{user?.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-gold btn-sm w-100">
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <h5 style={{ margin: 0, color: 'var(--text-light)', fontWeight: 700 }}>{title}</h5>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <i className="bi bi-calendar3 me-2"></i>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
