import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const AdminProfile = () => {
  const { user, login, token } = useAuth();
  const [form, setForm] = useState({ username: user?.username || '', email: user?.email || '', phone: user?.phone || '', current_password: '', new_password: '', confirm_password: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault(); setSaving(true); setSuccess(''); setError('');
    if (form.new_password && form.new_password !== form.confirm_password) {
      setError('New passwords do not match.'); setSaving(false); return;
    }
    try {
      await api.put('/admin/profile', {
        username: form.username,
        email: form.email,
        phone: form.phone,
        current_password: form.current_password || undefined,
        new_password: form.new_password || undefined,
      });
      setSuccess('Profile updated successfully!');
      login({ ...user, username: form.username, email: form.email, phone: form.phone }, token);
      setForm(f => ({ ...f, current_password: '', new_password: '', confirm_password: '' }));
    } catch(err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally { setSaving(false); }
  };

  return (
    <AdminLayout title="Admin Profile">
      <div className="row g-4 justify-content-center">
        {/* Info card */}
        <div className="col-lg-4">
          <div className="card-dark p-4 text-center">
            <div style={{ width:80, height:80, background:'var(--gradient-primary)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', fontSize:'2rem', color:'#000' }}>
              <i className="bi bi-person-fill"></i>
            </div>
            <h5 style={{ color:'var(--text-light)' }}>{user?.username}</h5>
            <span style={{ background:'rgba(200,134,10,0.15)', color:'var(--primary)', padding:'4px 16px', borderRadius:50, fontSize:'0.8rem', fontWeight:600, textTransform:'capitalize' }}>{user?.role}</span>
            <hr style={{ borderColor:'var(--border-color)', margin:'1.5rem 0' }} />
            <div className="text-start" style={{ color:'var(--text-muted)', fontSize:'0.9rem' }}>
              <div className="mb-2"><i className="bi bi-telephone me-2 text-primary-custom"></i>{user?.phone}</div>
              <div><i className="bi bi-envelope me-2 text-primary-custom"></i>{user?.email || 'Not set'}</div>
            </div>
          </div>
        </div>

        {/* Update form */}
        <div className="col-lg-8">
          <div className="card-dark p-4 form-dark">
            <h5 style={{ color:'var(--primary)', marginBottom:'1.5rem' }}><i className="bi bi-person-gear me-2"></i>Update Profile</h5>
            {success && <div className="alert mb-3" style={{ background:'rgba(40,167,69,0.1)', border:'1px solid rgba(40,167,69,0.3)', color:'#75b798', borderRadius:10 }}><i className="bi bi-check-circle me-2"></i>{success}</div>}
            {error && <div className="alert mb-3" style={{ background:'rgba(220,53,69,0.1)', border:'1px solid rgba(220,53,69,0.3)', color:'#ea868f', borderRadius:10 }}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label">Username</label><input className="form-control" value={form.username} onChange={e => setForm({...form, username:e.target.value})} /></div>
                <div className="col-md-6"><label className="form-label">Phone</label><input className="form-control" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} /></div>
                <div className="col-12"><label className="form-label">Email</label><input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></div>
                <div className="col-12"><hr style={{ borderColor:'var(--border-color)', margin:'0.5rem 0' }} /><small style={{ color:'var(--text-muted)' }}>Change Password (leave blank to keep current password)</small></div>
                <div className="col-12"><label className="form-label">Current Password</label><input type="password" className="form-control" value={form.current_password} onChange={e => setForm({...form, current_password:e.target.value})} placeholder="Required to change password" /></div>
                <div className="col-md-6"><label className="form-label">New Password</label><input type="password" className="form-control" value={form.new_password} onChange={e => setForm({...form, new_password:e.target.value})} /></div>
                <div className="col-md-6"><label className="form-label">Confirm New Password</label><input type="password" className="form-control" value={form.confirm_password} onChange={e => setForm({...form, confirm_password:e.target.value})} /></div>
                <div className="col-12 mt-2">
                  <button type="submit" className="btn btn-gold px-5" disabled={saving}>{saving ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : <><i className="bi bi-check-lg me-2"></i>Save Changes</>}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
