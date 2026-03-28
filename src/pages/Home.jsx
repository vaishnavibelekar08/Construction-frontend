import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const serviceIcons = ['house-door', 'buildings', 'easel', 'tools', 'clipboard-check'];

const Home = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data.slice(0, 3))).catch(() => {});
    api.get('/projects').then(r => setProjects(r.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="gold-badge">🏆 Trusted Since 2010</div>
              <h1 className="hero-title">
                Building <span>Excellence</span><br />Crafting Your Dream
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                South India's premier construction company delivering world-class residential, commercial, and renovation services with unmatched quality and precision.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/get-quote" className="btn btn-gold">Get Free Quote <i className="bi bi-arrow-right ms-1"></i></Link>
                <Link to="/projects" className="btn btn-outline-gold">View Projects</Link>
              </div>
              <div className="hero-stats">
                {[['500+', 'Projects Done'], ['14+', 'Years Experience'], ['98%', 'Client Satisfaction'], ['50+', 'Expert Team']].map(([num, label]) => (
                  <div className="stat-item" key={label}>
                    <span className="stat-number">{num}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 420, height: 420,
                  background: 'linear-gradient(135deg, rgba(200,134,10,0.15), rgba(200,134,10,0.05))',
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  border: '2px solid rgba(200,134,10,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'pulse 4s ease-in-out infinite',
                }}>
                  <i className="bi bi-buildings" style={{ fontSize: '10rem', color: 'var(--primary)', opacity: 0.8 }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{ background: 'var(--secondary-dark)' }}>
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">Our Services</div>
            <h2 className="section-title">What We Build</h2>
            <div className="divider-gold"></div>
            <p className="section-subtitle">Comprehensive construction services tailored to your vision and budget.</p>
          </div>
          <div className="row g-4">
            {services.length > 0 ? services.map((s, i) => (
              <div className="col-lg-4 col-md-6" key={s.service_id}>
                <div className="service-card h-100">
                  {s.image ? (
                    <img src={`/uploads/${s.image}`} alt={s.title} />
                  ) : (
                    <div style={{ height: 200, background: 'linear-gradient(135deg,var(--bg-dark),var(--bg-card))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`bi bi-${serviceIcons[i % serviceIcons.length]}`} style={{ fontSize: '4rem', color: 'var(--primary)', opacity: 0.6 }}></i>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="mb-2" style={{ color: 'var(--text-light)' }}>{s.title}</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.description?.substring(0, 100)}...</p>
                    {s.estimated_cost && <span className="cost-badge"><i className="bi bi-currency-rupee"></i> {s.estimated_cost}</span>}
                  </div>
                </div>
              </div>
            )) : [0,1,2].map(i => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div className="service-card h-100">
                  <div style={{ height: 200, background: 'linear-gradient(135deg,var(--bg-dark),var(--bg-card))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`bi bi-${serviceIcons[i]}`} style={{ fontSize: '4rem', color: 'var(--primary)', opacity: 0.6 }}></i>
                  </div>
                  <div className="card-body">
                    <div style={{ height: 20, background:'rgba(255,255,255,0.05)', borderRadius:4, marginBottom:8 }}></div>
                    <div style={{ height: 60, background:'rgba(255,255,255,0.03)', borderRadius:4 }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/services" className="btn btn-gold">All Services <i className="bi bi-arrow-right ms-1"></i></Link>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section>
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">Our Portfolio</div>
            <h2 className="section-title">Featured Projects</h2>
            <div className="divider-gold"></div>
            <p className="section-subtitle">A glimpse of our finest construction work across South India.</p>
          </div>
          <div className="row g-4">
            {projects.map(p => (
              <div className="col-lg-4 col-md-6" key={p.project_id}>
                <div className="project-card h-100">
                  <span className={`status-badge status-${p.status}`}>{p.status}</span>
                  {p.image ? <img src={`/uploads/${p.image}`} alt={p.name} /> : (
                    <div style={{ height: 220, background: 'linear-gradient(135deg,#0d1520,#1a2332)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="bi bi-building" style={{ fontSize: '5rem', color: 'var(--primary)', opacity: 0.5 }}></i>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 style={{ color: 'var(--text-light)' }}>{p.name}</h5>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {p.location && <small style={{ color: 'var(--text-muted)' }}><i className="bi bi-geo-alt me-1 text-primary-custom"></i>{p.location}</small>}
                      {p.cost && <small style={{ color: 'var(--text-muted)' }}><i className="bi bi-currency-rupee me-1 text-primary-custom"></i>{p.cost}</small>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/projects" className="btn btn-gold">View All Projects <i className="bi bi-arrow-right ms-1"></i></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--secondary-dark)', padding: '80px 0' }}>
        <div className="container text-center">
          <div className="gold-badge">Ready to Build?</div>
          <h2 className="section-title mb-3">Start Your Dream Project Today</h2>
          <p className="section-subtitle mb-4">Contact our experts for a free consultation and detailed quote.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/get-quote" className="btn btn-gold btn-lg">Request a Free Quote</Link>
            <Link to="/contact" className="btn btn-outline-gold btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
