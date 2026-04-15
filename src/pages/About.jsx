const About = () => {
  const team = [
    { name: 'Ramesh Kumar', role: 'CEO & Founder', icon: 'person-badge', exp: '20+ Years' },
    { name: 'Priya Nair', role: 'Head Architect', icon: 'pencil-ruler', exp: '15+ Years' },
    { name: 'Suresh Babu', role: 'Project Manager', icon: 'clipboard-check', exp: '12+ Years' },
    { name: 'Anitha Devi', role: 'Interior Designer', icon: 'palette', exp: '10+ Years' },
  ];
  const achievements = [
    ['500+', 'Projects Completed'],
    ['14+', 'Years Experience'],
    ['50+', 'Team Members'],
    ['98%', 'Client Satisfaction'],
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary-dark)', padding: '80px 0 60px' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="gold-badge">About Us</div>
            <h1 className="section-title">Our Story of Excellence</h1>
            <div className="divider-gold"></div>
          </div>
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '1rem' }}>
                Founded in 2010, <strong style={{ color: 'var(--primary)' }}>Mahalakshmi Construction</strong> began as a small residential contractor with a simple vision — to build homes that families love and buildings that stand the test of time.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '1rem', marginTop: '1rem' }}>
                Over the past 14 years, we've grown into one of South India's most trusted construction companies, delivering over 500 successful projects ranging from luxury villas and commercial complexes to interior renovations and urban development.
              </p>
              <div className="d-flex gap-4 mt-4 flex-wrap">
                {achievements.map(([num, label]) => (
                  <div key={label} className="text-center">
                    <div className="stat-number">{num}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                {[
                  ['bi-bullseye', 'Our Mission', 'To deliver superior construction services that exceed client expectations while maintaining the highest standards of safety, quality, and sustainability.'],
                  ['bi-eye', 'Our Vision', 'To be South India\'s most innovative and trusted construction company, transforming landscapes with excellence and integrity.'],
                ].map(([icon, title, text]) => (
                  <div className="col-12" key={title}>
                    <div className="card-dark p-4">
                      <div className="d-flex gap-3 align-items-start">
                        <div style={{ width:48, height:48, background:'var(--gradient-primary)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <i className={`${icon} text-dark fs-5`}></i>
                        </div>
                        <div>
                          <h5 style={{ color:'var(--primary)', marginBottom:'0.5rem' }}>{title}</h5>
                          <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', marginBottom:0, lineHeight:1.7 }}>{text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">Our Services</div>
            <h2 className="section-title">What We Offer</h2>
            <div className="divider-gold"></div>
          </div>
          <div className="row g-4">
            {[
              ['house-door', 'Residential', 'Custom homes & villas built with premium materials and modern design.'],
              ['buildings', 'Commercial', 'Offices, malls & industrial buildings with precision engineering.'],
              ['easel', 'Interior Design', 'Elegant interiors that blend aesthetics with functionality.'],
              ['tools', 'Renovation', 'Expert renovation services that breathe new life into old spaces.'],
              ['geo-alt', 'Project Planning', 'Comprehensive planning, budgeting, and project management.'],
              ['shield-check', 'Quality Assurance', 'Rigorous quality checks at every stage of construction.'],
            ].map(([icon, title, desc]) => (
              <div className="col-lg-4 col-md-6" key={title}>
                <div className="card-dark p-4 h-100">
                  <div style={{ width:56, height:56, background:'var(--gradient-primary)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
                    <i className={`bi bi-${icon}`} style={{ fontSize:'1.5rem', color:'#000' }}></i>
                  </div>
                  <h5 style={{ color:'var(--text-light)', marginBottom:'0.75rem' }}>{title}</h5>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background:'var(--secondary-dark)' }}>
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">Our Team</div>
            <h2 className="section-title">Meet the Experts</h2>
            <div className="divider-gold"></div>
          </div>
          <div className="row g-4 justify-content-center">
            {team.map(m => (
              <div className="col-lg-3 col-md-6" key={m.name}>
                <div className="card-dark p-4 text-center h-100">
                  <div style={{ width:80, height:80, background:'var(--gradient-primary)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', fontSize:'2rem', color:'#000' }}>
                    <i className={`bi bi-${m.icon}`}></i>
                  </div>
                  <h5 style={{ color:'var(--text-light)', marginBottom:'0.25rem' }}>{m.name}</h5>
                  <p style={{ color:'var(--primary)', fontWeight:600, fontSize:'0.85rem', marginBottom:'0.5rem' }}>{m.role}</p>
                  <span style={{ background:'rgba(200,134,10,0.1)', color:'var(--text-muted)', fontSize:'0.8rem', padding:'3px 10px', borderRadius:50, border:'1px solid var(--border-color)' }}>{m.exp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
