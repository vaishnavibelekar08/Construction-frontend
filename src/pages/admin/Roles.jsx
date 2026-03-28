import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axios';

const AdminRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/roles').then(r => { setRoles(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Roles">
      <div className="card-dark p-4 mb-4" style={{ background:'rgba(200,134,10,0.05)', border:'1px solid var(--border-color)', borderRadius:'var(--radius)' }}>
        <div className="d-flex gap-3 align-items-start">
          <i className="bi bi-info-circle" style={{ color:'var(--primary)', fontSize:'1.25rem', flexShrink:0, marginTop:2 }}></i>
          <div>
            <strong style={{ color:'var(--primary)' }}>About Roles</strong>
            <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', margin:0, marginTop:4 }}>System roles are fixed and define what each user can access. Roles are assigned to users when creating or editing their accounts in the Users section.</p>
          </div>
        </div>
      </div>

      <div className="card-dark p-4">
        <h5 style={{ color:'var(--primary)', marginBottom:'1.5rem' }}>System Roles</h5>
        {loading ? <div className="text-center py-4"><div className="spinner-border" style={{ color:'var(--primary)' }}></div></div> : (
          <div className="row g-4">
            {roles.map(role => (
              <div className="col-md-6" key={role.id}>
                <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border-color)', borderRadius:'var(--radius)', padding:'1.5rem' }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div style={{ width:48, height:48, background: role.name==='admin' ? 'var(--gradient-primary)' : 'rgba(108,117,125,0.3)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <i className={`bi ${role.name==='admin' ? 'bi-shield-fill-check' : 'bi-person-fill'}`} style={{ fontSize:'1.3rem', color: role.name==='admin' ? '#000' : 'var(--text-muted)' }}></i>
                    </div>
                    <div>
                      <h6 style={{ color:'var(--text-light)', margin:0 }}>{role.label}</h6>
                      <span style={{ background: role.name==='admin' ? 'rgba(200,134,10,0.15)' : 'rgba(108,117,125,0.2)', color: role.name==='admin' ? 'var(--primary)' : 'var(--text-muted)', padding:'2px 10px', borderRadius:50, fontSize:'0.75rem', fontWeight:600 }}>{role.name}</span>
                    </div>
                  </div>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', margin:0, lineHeight:1.7 }}>{role.description}</p>
                  <div className="mt-3 d-flex align-items-center gap-2">
                    <i className="bi bi-lock-fill" style={{ color:'var(--text-muted)', fontSize:'0.8rem' }}></i>
                    <small style={{ color:'var(--text-muted)', fontSize:'0.8rem' }}>System-defined — cannot be modified</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminRoles;
