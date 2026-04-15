import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Pagination from '../../components/Pagination';
import api from '../../api/axios';

const PER_PAGE = 10;

const empty = { name:'', location:'', cost:'', duration:'', status:'ongoing', description:'', image:null };

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const load = () => { api.get('/projects').then(r => { setProjects(r.data); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditing(null); setError(''); setShowModal(true); };
  const openEdit = p => { setForm({ name:p.name, location:p.location, cost:p.cost, duration:p.duration, status:p.status, description:p.description, image:null }); setEditing(p.project_id); setError(''); setShowModal(true); };

  const handleSubmit = async e => {
    e.preventDefault(); setSaving(true); setError('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v !== null) fd.append(k, v); });
    try {
      if (editing) await api.put(`/projects/${editing}`, fd);
      else await api.post('/projects', fd);
      setShowModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving project.');
    } finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    setProjects(p => p.filter(x => x.project_id !== id));
  };

  return (
    <AdminLayout title="Projects Management">
      <div className="card-dark p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 style={{ color:'var(--primary)', margin:0 }}>Projects ({projects.length})</h5>
          <button className="btn btn-gold" onClick={openAdd}><i className="bi bi-plus-lg me-2"></i>Add Project</button>
        </div>
        {loading ? <div className="text-center py-4"><div className="spinner-border" style={{ color:'var(--primary)' }}></div></div> : (
          <>
          <div className="table-responsive">
            <table className="table admin-table">
              <thead><tr><th>#</th><th>Name</th><th>Location</th><th>Cost</th><th>Duration</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {projects.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE).map((p, i) => (
                  <tr key={p.project_id}>
                    <td>{(currentPage-1)*PER_PAGE+i+1}</td>
                    <td style={{ fontWeight:600 }}>{p.name}</td>
                    <td>{p.location || '—'}</td>
                    <td>{p.cost || '—'}</td>
                    <td>{p.duration || '—'}</td>
                    <td><span className={`status-badge position-static status-${p.status}`}>{p.status}</span></td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-sm" style={{ background:'rgba(200,134,10,0.15)', color:'var(--primary)', border:'1px solid var(--border-color)', borderRadius:8 }} onClick={() => openEdit(p)}><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-sm" style={{ background:'rgba(220,53,69,0.15)', color:'#ea868f', border:'1px solid rgba(220,53,69,0.3)', borderRadius:8 }} onClick={() => handleDelete(p.project_id)}><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalItems={projects.length} itemsPerPage={PER_PAGE} onPageChange={p => setCurrentPage(p)} />
          </>
        )}
      </div>

      {showModal && (
        <div className="modal d-block admin-modal" style={{ background:'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Edit Project' : 'Add New Project'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4 form-dark">
                  {error && <div className="alert mb-3" style={{ background:'rgba(220,53,69,0.1)', border:'1px solid rgba(220,53,69,0.3)', color:'#ea868f', borderRadius:10 }}>{error}</div>}
                  <div className="row g-3">
                    <div className="col-md-6"><label className="form-label">Project Name *</label><input className="form-control" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required /></div>
                    <div className="col-md-6"><label className="form-label">Location</label><input className="form-control" value={form.location} onChange={e => setForm({...form, location:e.target.value})} /></div>
                    <div className="col-md-6"><label className="form-label">Cost</label><input className="form-control" value={form.cost} onChange={e => setForm({...form, cost:e.target.value})} placeholder="e.g. ₹50 Lakhs" /></div>
                    <div className="col-md-6"><label className="form-label">Duration</label><input className="form-control" value={form.duration} onChange={e => setForm({...form, duration:e.target.value})} placeholder="e.g. 12 months" /></div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select" value={form.status} onChange={e => setForm({...form, status:e.target.value})}>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="col-md-6"><label className="form-label">Image</label><input type="file" className="form-control" accept="image/*" onChange={e => setForm({...form, image:e.target.files[0]})} /></div>
                    <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows="4" value={form.description} onChange={e => setForm({...form, description:e.target.value})}></textarea></div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-gold" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold" disabled={saving}>{saving ? <span className="spinner-border spinner-border-sm me-2"></span> : null}{editing ? 'Update' : 'Add Project'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjects;
