import { useEffect, useState } from 'react';
import api from '../api/axios';

const serviceIcons = ['house-door', 'buildings', 'easel', 'tools', 'clipboard-check', 'shield-check'];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services').then(r => { setServices(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <section style={{ background: 'var(--secondary-dark)', padding: '60px 0' }}>
        <div className="container">
          <div className="text-center mb-0">
            <div className="gold-badge">Our Services</div>
            <h1 className="section-title">Construction Services</h1>
            <div className="divider-gold"></div>
            <p className="section-subtitle">From foundations to finishing touches — we handle every aspect of construction with expertise and dedication.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: 'var(--primary)' }}></div>
            </div>
          ) : (
            <div className="row g-4">
              {services.map((s, i) => (
                <div className="col-lg-6" key={s.service_id}>
                  <div className="card-dark h-100 overflow-hidden" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: 120, flexShrink: 0, background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {s.image ? (
                        <img src={`/uploads/${s.image}`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <i className={`bi bi-${serviceIcons[i % serviceIcons.length]}`} style={{ fontSize: '2.5rem', color: '#000' }}></i>
                      )}
                    </div>
                    <div className="p-4">
                      <h5 style={{ color: 'var(--text-light)', marginBottom: '0.75rem' }}>{s.title}</h5>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>{s.description}</p>
                      {s.estimated_cost && (
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Estimated Cost</span>
                          <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1rem' }}>{s.estimated_cost}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: 'var(--secondary-dark)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us?</h2>
            <div className="divider-gold"></div>
          </div>
          <div className="row g-4">
            {[
              ['award', 'Award-Winning Quality', 'ISO certified construction processes ensuring highest build quality.'],
              ['people', 'Expert Team', '50+ skilled professionals — architects, engineers & craftsmen.'],
              ['clock-history', 'On-Time Delivery', '95%+ projects delivered on scheduled timelines.'],
              ['cash-coin', 'Transparent Pricing', 'No hidden costs — detailed estimates upfront.'],
            ].map(([icon, title, desc]) => (
              <div className="col-md-6 col-lg-3" key={title}>
                <div className="card-dark p-4 text-center h-100">
                  <i className={`bi bi-${icon}`} style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem', display: 'block' }}></i>
                  <h6 style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>{title}</h6>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
