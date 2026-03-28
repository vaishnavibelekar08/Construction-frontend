import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Pagination from '../../components/Pagination';
import api from '../../api/axios';

const PER_PAGE = 10;

const empty = { username:'', phone:'', email:'', password:'', role:'user' };

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const load = () => { api.get('/users').then(r => { setUsers(r.data); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditing(null); setError(''); setShowModal(true); };
  const openEdit = u => { setForm({ username:u.username, phone:u.phone, email:u.email||'', password:'', role:u.role }); setEditing(u.user_id); setError(''); setShowModal(true); };

  const handleSubmit = async e => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const payload = { ...form };
      if (editing && !payload.password) delete payload.password;
      if (editing) await api.put(`/users/${editing}`, payload);
      else await api.post('/users', payload);
      setShowModal(false); load();
    } catch(err) {
      setError(err.response?.data?.message || 'Error saving user.');
    } finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this user?')) return;
    await api.delete(`/users/${id}`);
    setUsers(u => u.filter(x => x.user_id !== id));
  };

  return (
    <AdminLayout title="Users Management">
      <div className="card-dark p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 style={{ color:'var(--primary)', margin:0 }}>Users ({users.length})</h5>
          <button className="btn btn-gold" onClick={openAdd}><i className="bi bi-person-plus me-2"></i>Add User</button>
        </div>
        {loading ? <div className="text-center py-4"><div className="spinner-border" style={{ color:'var(--primary)' }}></div></div> : (
          <>
          <div className="table-responsive">
            <table className="table admin-table">
              <thead><tr><th>#</th><th>Username</th><th>Phone</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody>
                {users.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE).map((u, i) => (
                  <tr key={u.user_id}>
                    <td>{(currentPage-1)*PER_PAGE+i+1}</td>
                    <td style={{ fontWeight:600 }}>{u.username}</td>
                    <td>{u.phone}</td>
                    <td>{u.email || '—'}</td>
                    <td>
                      <span style={{ background: u.role==='admin' ? 'rgba(200,134,10,0.15)' : 'rgba(108,117,125,0.2)', color: u.role==='admin' ? 'var(--primary)' : 'var(--text-muted)', padding:'3px 12px', borderRadius:50, fontSize:'0.8rem', fontWeight:600, textTransform:'capitalize' }}>{u.role}</span>
                    </td>
                    <td style={{ fontSize:'0.85rem' }}>{new Date(u.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-sm" style={{ background:'rgba(200,134,10,0.15)', color:'var(--primary)', border:'1px solid var(--border-color)', borderRadius:8 }} onClick={() => openEdit(u)}><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-sm" style={{ background:'rgba(220,53,69,0.15)', color:'#ea868f', border:'1px solid rgba(220,53,69,0.3)', borderRadius:8 }} onClick={() => handleDelete(u.user_id)}><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalItems={users.length} itemsPerPage={PER_PAGE} onPageChange={p => setCurrentPage(p)} />
          </>
        )}
      </div>

      {showModal && (
        <div className="modal d-block admin-modal" style={{ background:'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Edit User' : 'Add New User'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4 form-dark">
                  {error && <div className="alert mb-3" style={{ background:'rgba(220,53,69,0.1)', border:'1px solid rgba(220,53,69,0.3)', color:'#ea868f', borderRadius:10 }}>{error}</div>}
                  <div className="row g-3">
                    <div className="col-md-6"><label className="form-label">Username *</label><input className="form-control" value={form.username} onChange={e => setForm({...form, username:e.target.value})} required /></div>
                    <div className="col-md-6"><label className="form-label">Phone *</label><input className="form-control" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} required /></div>
                    <div className="col-md-6"><label className="form-label">Email</label><input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></div>
                    <div className="col-md-6">
                      <label className="form-label">Role</label>
                      <select className="form-select" value={form.role} onChange={e => setForm({...form, role:e.target.value})}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="col-12"><label className="form-label">{editing ? 'New Password (leave blank to keep)' : 'Password *'}</label><input type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required={!editing} /></div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-gold" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold" disabled={saving}>{saving ? <span className="spinner-border spinner-border-sm me-2"></span> : null}{editing ? 'Update' : 'Add User'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
