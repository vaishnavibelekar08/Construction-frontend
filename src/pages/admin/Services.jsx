import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Pagination from '../../components/Pagination';
import api from '../../api/axios';

const PER_PAGE = 10;

const empty = { title:'', description:'', estimated_cost:'', image:null };

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const load = () => { api.get('/services').then(r => { setServices(r.data); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditing(null); setError(''); setShowModal(true); };
  const openEdit = s => { setForm({ title:s.title, description:s.description, estimated_cost:s.estimated_cost, image:null }); setEditing(s.service_id); setError(''); setShowModal(true); };

  const handleSubmit = async e => {
    e.preventDefault(); setSaving(true); setError('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v !== null) fd.append(k, v); });
    try {
      if (editing) await api.put(`/services/${editing}`, fd);
      else await api.post('/services', fd);
      setShowModal(false); load();
    } catch(err) {
      setError(err.response?.data?.message || 'Error saving service.');
    } finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this service?')) return;
    await api.delete(`/services/${id}`);
    setServices(s => s.filter(x => x.service_id !== id));
  };

  return (
    <AdminLayout title="Services Management">
      <div className="card-dark p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 style={{ color:'var(--primary)', margin:0 }}>Services ({services.length})</h5>
          <button className="btn btn-gold" onClick={openAdd}><i className="bi bi-plus-lg me-2"></i>Add Service</button>
        </div>
        {loading ? <div className="text-center py-4"><div className="spinner-border" style={{ color:'var(--primary)' }}></div></div> : (
          <>
          <div className="table-responsive">
            <table className="table admin-table">
              <thead><tr><th>#</th><th>Image</th><th>Title</th><th>Description</th><th>Estimated Cost</th><th>Actions</th></tr></thead>
              <tbody>
                {services.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE).map((s, i) => (
                  <tr key={s.service_id}>
                    <td>{(currentPage-1)*PER_PAGE+i+1}</td>
                    <td>{s.image ? <img src={`/uploads/${s.image}`} alt={s.title} style={{ width:50, height:40, objectFit:'cover', borderRadius:6 }} /> : <i className="bi bi-image" style={{ color:'var(--text-muted)', fontSize:'1.5rem' }}></i>}</td>
                    <td style={{ fontWeight:600 }}>{s.title}</td>
                    <td style={{ maxWidth:250, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color:'var(--text-muted)', fontSize:'0.85rem' }}>{s.description}</td>
                    <td><span style={{ color:'var(--primary)', fontWeight:600 }}>{s.estimated_cost || '—'}</span></td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-sm" style={{ background:'rgba(200,134,10,0.15)', color:'var(--primary)', border:'1px solid var(--border-color)', borderRadius:8 }} onClick={() => openEdit(s)}><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-sm" style={{ background:'rgba(220,53,69,0.15)', color:'#ea868f', border:'1px solid rgba(220,53,69,0.3)', borderRadius:8 }} onClick={() => handleDelete(s.service_id)}><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalItems={services.length} itemsPerPage={PER_PAGE} onPageChange={p => setCurrentPage(p)} />
          </>
        )}
      </div>

      {showModal && (
        <div className="modal d-block admin-modal" style={{ background:'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Edit Service' : 'Add New Service'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4 form-dark">
                  {error && <div className="alert mb-3" style={{ background:'rgba(220,53,69,0.1)', border:'1px solid rgba(220,53,69,0.3)', color:'#ea868f', borderRadius:10 }}>{error}</div>}
                  <div className="mb-3"><label className="form-label">Service Title *</label><input className="form-control" value={form.title} onChange={e => setForm({...form, title:e.target.value})} required /></div>
                  <div className="mb-3"><label className="form-label">Description</label><textarea className="form-control" rows="4" value={form.description} onChange={e => setForm({...form, description:e.target.value})}></textarea></div>
                  <div className="mb-3"><label className="form-label">Estimated Cost</label><input className="form-control" value={form.estimated_cost} onChange={e => setForm({...form, estimated_cost:e.target.value})} placeholder="e.g. ₹15L – ₹80L" /></div>
                  <div className="mb-3"><label className="form-label">Image</label><input type="file" className="form-control" accept="image/*" onChange={e => setForm({...form, image:e.target.files[0]})} /></div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-gold" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold" disabled={saving}>{saving ? <span className="spinner-border spinner-border-sm me-2"></span> : null}{editing ? 'Update' : 'Add Service'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminServices;
