import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const GetQuote = () => {
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', project_type:'', budget:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'phone') {
      newValue = value.replace(/\D/g, '').slice(0, 10); // Only 10 numbers
    } else if (name === 'name') {
      newValue = value.replace(/[0-9]/g, ''); // No numbers
    }
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await api.post('/inquiries', form);
      setSuccess(true);
      setForm({ name:'', phone:'', email:'', address:'', project_type:'', budget:'', message:'' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section style={{ background: 'var(--secondary-dark)', padding: '60px 0' }}>
        <div className="container text-center">
          <div className="gold-badge">Free Quote</div>
          <h1 className="section-title">Request a Quote</h1>
          <div className="divider-gold"></div>
          <p className="section-subtitle">Fill in your project details and we'll get back to you within 24 hours with a detailed estimate.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {success ? (
                <div className="card-dark p-5 text-center">
                  <div style={{ width: 80, height: 80, background: 'rgba(40,167,69,0.2)', border: '2px solid #28a745', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <i className="bi bi-check-lg" style={{ fontSize: '2rem', color: '#28a745' }}></i>
                  </div>
                  <h3 style={{ color: 'var(--primary)' }}>Quote Request Submitted!</h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Thank you for reaching out. Our team will contact you within 24 hours with a detailed estimate.</p>
                  <button className="btn btn-gold mt-3" onClick={() => setSuccess(false)}>Submit Another Request</button>
                </div>
              ) : (
                <div className="card-dark p-4 p-md-5 form-dark">
                  <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><i className="bi bi-clipboard-check me-2"></i>Project Details</h4>
                  {error && <div className="alert alert-danger" style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.3)', color: '#ea868f', borderRadius: 10 }}>{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone Number *</label>
                        <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Project Type</label>
                        <select className="form-select" name="project_type" value={form.project_type} onChange={handleChange}>
                          <option value="">Select project type</option>
                          <option>Residential Construction</option>
                          <option>Commercial Construction</option>
                          <option>Interior Design</option>
                          <option>Renovation</option>
                          <option>Project Planning</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Address / Location</label>
                        <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="Project site address or location" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Estimated Budget</label>
                        <select className="form-select" name="budget" value={form.budget} onChange={handleChange}>
                          <option value="">Select budget range</option>
                          <option>Below ₹10 Lakhs</option>
                          <option>₹10L – ₹50L</option>
                          <option>₹50L – ₹1 Crore</option>
                          <option>₹1Cr – ₹5 Crore</option>
                          <option>Above ₹5 Crore</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Project Description / Message</label>
                        <textarea className="form-control" name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Describe your project requirements, timeline, any specific needs..."></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-gold w-100 py-3" disabled={loading}>
                          {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Submitting...</> : <><i className="bi bi-send me-2"></i>Submit Quote Request</>}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div className="card-dark p-4 mb-4">
                <h5 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Why Request a Quote?</h5>
                {['Free, no-obligation estimate', 'Response within 24 hours', 'Expert consultation included', 'Detailed cost breakdown', 'Flexible payment options'].map(item => (
                  <div key={item} className="d-flex gap-2 mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <i className="bi bi-check-circle-fill" style={{ color: 'var(--primary)', flexShrink: 0 }}></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="card-dark p-4">
                <h5 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Contact Directly</h5>
                {[['telephone', '+91 98765 43210'],['whatsapp','WhatsApp Us'],['envelope','info@mahalakshmi.com']].map(([icon, text]) => (
                  <div key={text} className="d-flex gap-2 mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <i className={`bi bi-${icon}`} style={{ color: 'var(--primary)' }}></i><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetQuote;
