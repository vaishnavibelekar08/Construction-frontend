import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer-custom">
    <div className="container">
      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <h5 className="text-primary-custom mb-3">
            <i className="bi bi-building me-2"></i>Mahalakshmi Construction
          </h5>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Building dreams with precision and excellence. Over a decade of trusted construction services across South India.
          </p>
          <div className="d-flex gap-3 mt-3">
            {['facebook', 'instagram', 'linkedin', 'whatsapp'].map(icon => (
              <a key={icon} href="#" className="btn-outline-gold" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                <i className={`bi bi-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="col-lg-2 col-6">
          <h6 style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: 1 }}>Quick Links</h6>
          <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
            {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/projects', 'Projects'], ['/contact', 'Contact']].map(([path, label]) => (
              <li key={path} className="mb-2">
                <Link to={path} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  <i className="bi bi-chevron-right me-1" style={{ fontSize: '0.75rem' }}></i>{label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-3 col-6">
          <h6 style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: 1 }}>Services</h6>
          <ul className="list-unstyled" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {['Residential Construction', 'Commercial Construction', 'Interior Design', 'Renovation Services', 'Project Planning'].map(s => (
              <li key={s} className="mb-2"><i className="bi bi-dot me-1"></i>{s}</li>
            ))}
          </ul>
        </div>
        <div className="col-lg-3">
          <h6 style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: 1 }}>Contact Us</h6>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {[
              ['geo-alt', '123, Construction Road, Bangalore, Karnataka - 560001'],
              ['telephone', '+91 98765 43210'],
              ['envelope', 'info@mahalakshmiconstruction.com'],
              ['clock', 'Mon–Sat: 9:00 AM – 6:00 PM'],
            ].map(([icon, text]) => (
              <div key={icon} className="d-flex gap-2 mb-3">
                <i className={`bi bi-${icon}`} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}></i>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr style={{ borderColor: 'var(--border-color)' }} />
      <div className="d-flex flex-wrap justify-content-between align-items-center" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <span>© 2024 Mahalakshmi Construction. All rights reserved.</span>
        <Link to="/admin/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Admin Panel</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
