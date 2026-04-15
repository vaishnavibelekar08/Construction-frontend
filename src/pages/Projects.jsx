import { useEffect, useState } from 'react';
import api from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/projects').then(r => { setProjects(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  return (
    <>
      <section style={{ background: 'var(--secondary-dark)', padding: '60px 0' }}>
        <div className="container text-center">
          <div className="gold-badge">Portfolio</div>
          <h1 className="section-title">Our Projects</h1>
          <div className="divider-gold"></div>
          <p className="section-subtitle mb-4">Explore our portfolio of completed and ongoing construction projects.</p>
          <div className="d-flex gap-2 justify-content-center flex-wrap mt-4">
            {[['all','All Projects'],['completed','Completed'],['ongoing','Ongoing']].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)}
                className={filter === val ? 'btn btn-gold' : 'btn btn-outline-gold'}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading ? (
            <div className="text-center py-5"><div className="spinner-border" style={{ color: 'var(--primary)' }}></div></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-building-x" style={{ fontSize: '4rem', color: 'var(--text-muted)' }}></i>
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>No projects found.</p>
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map(p => (
                <div className="col-lg-4 col-md-6" key={p.project_id}>
                  <div className="project-card h-100" style={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
                    <span className={`status-badge status-${p.status}`}>{p.status}</span>
                    {p.image ? (
                      <img src={`/uploads/${p.image}`} alt={p.name} />
                    ) : (
                      <div style={{ height: 220, background: 'linear-gradient(135deg,#0d1520,#1a2332)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-building" style={{ fontSize: '5rem', color: 'var(--primary)', opacity: 0.5 }}></i>
                      </div>
                    )}
                    <div className="card-body">
                      <h5 style={{ color: 'var(--text-light)' }}>{p.name}</h5>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {p.location && <small style={{ color: 'var(--text-muted)' }}><i className="bi bi-geo-alt me-1 text-primary-custom"></i>{p.location}</small>}
                        {p.cost && <small style={{ color: 'var(--text-muted)' }}><i className="bi bi-currency-rupee me-1 text-primary-custom"></i>{p.cost}</small>}
                        {p.duration && <small style={{ color: 'var(--text-muted)' }}><i className="bi bi-calendar me-1 text-primary-custom"></i>{p.duration}</small>}
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.75rem', marginBottom: 0 }}>{p.description?.substring(0, 80)}...</p>
                      <div className="mt-3">
                        <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>View Details <i className="bi bi-arrow-right ms-1"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <div className="modal d-block admin-modal" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSelected(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selected.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body p-0">
                {selected.image ? (
                  <img src={`/uploads/${selected.image}`} alt={selected.name} style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: 200, background: 'linear-gradient(135deg,#0d1520,#1a2332)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-building" style={{ fontSize: '6rem', color: 'var(--primary)', opacity: 0.5 }}></i>
                  </div>
                )}
                <div className="p-4">
                  <div className="row g-3 mb-3">
                    {[['geo-alt','Location',selected.location],['currency-rupee','Cost',selected.cost],['calendar','Duration',selected.duration],['circle-fill','Status',selected.status]].filter(([,, v]) => v).map(([icon, label, val]) => (
                      <div className="col-6 col-md-3" key={label}>
                        <div style={{ background: 'rgba(200,134,10,0.05)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '12px' }}>
                          <i className={`bi bi-${icon} text-primary-custom me-1`}></i>
                          <small style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>{label}</small>
                          <strong style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'capitalize' }}>{val}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selected.description && <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{selected.description}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
