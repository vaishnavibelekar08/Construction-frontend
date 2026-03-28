import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const AdminLogin = () => {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      if (data.user.role !== 'admin') {
        setError('Access denied. Admin accounts only.');
        return;
      }
      login(data.user, data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div className="text-center mb-4">
          <div style={{ width: 72, height: 72, background: 'var(--gradient-primary)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem', color: '#000' }}>
            <i className="bi bi-building-fill"></i>
          </div>
          <h2 style={{ color: 'var(--primary)', fontFamily: 'Poppins', fontWeight: 800 }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-muted)' }}>Mahalakshmi Construction</p>
        </div>
        <div className="card-dark p-4 form-dark">
          <h5 style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Sign In to Admin Panel</h5>
          {error && (
            <div className="alert mb-3" style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.3)', color: '#ea868f', borderRadius: 10, padding: '12px 16px' }}>
              <i className="bi bi-exclamation-circle me-2"></i>{error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRight: 'none', color: 'var(--primary)' }}>
                  <i className="bi bi-telephone"></i>
                </span>
                <input type="tel" className="form-control" style={{ borderLeft: 'none' }} placeholder="Your phone number" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })} required />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRight: 'none', color: 'var(--primary)' }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input type="password" className="form-control" style={{ borderLeft: 'none' }} placeholder="Your password" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} required />
              </div>
            </div>
            <button type="submit" className="btn btn-gold w-100 py-3" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</> : <><i className="bi bi-box-arrow-in-right me-2"></i>Sign In</>}
            </button>
          </form>
        </div>
        <div className="text-center mt-4">
          <a href="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
            <i className="bi bi-arrow-left me-1"></i>Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
