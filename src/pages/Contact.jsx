import { useState } from 'react';
import api from '../api/axios';

const Contact = () => {
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', message:'' });
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
      await api.post('/inquiries', { ...form, project_type: 'General Inquiry' });
      setSuccess(true);
      setForm({ name:'', phone:'', email:'', address:'', message:'' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    ['geo-alt', 'Our Office', '123, Construction Road, Bangalore, Karnataka - 560001'],
    ['telephone', 'Phone Number', '+91 98765 43210'],
    ['envelope', 'Email Address', 'info@mahalakshmiconstruction.com'],
    ['clock', 'Working Hours', 'Monday – Saturday: 9:00 AM – 6:00 PM'],
  ];

  return (
    <>
      <section style={{ background: 'var(--secondary-dark)', padding: '60px 0' }}>
        <div className="container text-center">
          <div className="gold-badge">Get In Touch</div>
          <h1 className="section-title">Contact Us</h1>
          <div className="divider-gold"></div>
          <p className="section-subtitle">Have a question or ready to start your project? We'd love to hear from you.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <h3 style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Get In Touch</h3>
              <div className="d-flex flex-column gap-4">
                {contactInfo.map(([icon, label, value]) => (
                  <div key={label} className="d-flex gap-3">
                    <div style={{ width: 48, height: 48, background: 'var(--gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`bi bi-${icon}`} style={{ color: '#000', fontSize: '1.1rem' }}></i>
                    </div>
                    <div>
                      <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 3 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map embed */}
              <div className="mt-5" style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="250" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card-dark p-4 p-md-5 form-dark">
                <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><i className="bi bi-chat-dots me-2"></i>Send us a Message</h4>
                {success && (
                  <div className="alert mb-3" style={{ background: 'rgba(40,167,69,0.1)', border: '1px solid rgba(40,167,69,0.3)', color: '#75b798', borderRadius: 10 }}>
                    <i className="bi bi-check-circle me-2"></i>Message sent! We'll get back to you soon.
                  </div>
                )}
                {error && <div className="alert" style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.3)', color: '#ea868f', borderRadius: 10 }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number *</label>
                      <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile number" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="Your address" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea className="form-control" name="message" value={form.message} onChange={handleChange} rows="5" placeholder="How can we help you?"></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-gold w-100 py-3" disabled={loading}>
                        {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Sending...</> : <><i className="bi bi-send me-2"></i>Send Message</>}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
