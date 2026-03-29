import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats').then(r => { setStats(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { icon: 'building', label: 'Total Projects', value: stats.totalProjects, color: '#c8860a', link: '/admin/projects' },
    { icon: 'check-circle', label: 'Completed Projects', value: stats.completedProjects, color: '#28a745', link: '/admin/projects' },
    { icon: 'arrow-repeat', label: 'Ongoing Projects', value: stats.ongoingProjects, color: '#ffc107', link: '/admin/projects' },
    { icon: 'envelope', label: 'Total Inquiries', value: stats.totalInquiries, color: '#0dcaf0', link: '/admin/inquiries' },
    { icon: 'tools', label: 'Services Listed', value: stats.totalServices, color: '#6f42c1', link: '/admin/services' },
    { icon: 'people', label: 'Total Users', value: stats.totalUsers, color: '#fd7e14', link: '/admin/users' },
  ] : [];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" style={{ color: 'var(--primary)' }}></div></div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            {cards.map(c => (
              <div className="col-lg-4 col-md-6" key={c.label}>
                <Link to={c.link} style={{ textDecoration: 'none' }}>
                  <div className="stat-card d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}99)` }}>
                      <i className={`bi bi-${c.icon}`}></i>
                    </div>
                    <div>
                      <div className="stat-label">{c.label}</div>
                      <div className="stat-value" style={{ color: c.color }}>{c.value}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card-dark p-4">
            <h5 style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}>Quick Actions</h5>
            <div className="row g-3">
              {[
                ['/admin/projects', 'bi-plus-circle', 'Add New Project'],
                ['/admin/services', 'bi-plus-square', 'Add New Service'],
                ['/admin/inquiries', 'bi-envelope-open', 'View Inquiries'],
                ['/admin/users', 'bi-person-plus', 'Add User'],
              ].map(([to, icon, label]) => (
                <div className="col-6 col-md-3" key={label}>
                  <Link to={to} className="btn btn-outline-gold w-100 py-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <i className={icon} style={{ fontSize: '1.5rem' }}></i>
                    <span style={{ fontSize: '0.8rem' }}>{label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Statistics Chart */}
          <div className="card-dark p-4 mt-4">
            <h5 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Project Statistics (Monthly)</h5>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--text-muted)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="var(--text-muted)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-light)'
                    }}
                    itemStyle={{ fontSize: '13px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar 
                    name="Projects Count" 
                    dataKey="count" 
                    fill="var(--primary)" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                  />
                  <Bar 
                    name="Total Cost (Cr)" 
                    dataKey="totalCost" 
                    fill="#28a745" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                  />
                  <Bar 
                    name="Avg Duration (Mo)" 
                    dataKey="totalDuration" 
                    fill="#0dcaf0" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-muted mt-3" style={{ fontSize: '0.8rem' }}>
              <i className="bi bi-info-circle me-1"></i>
              Cost is shown in Crores (Cr). Duration is the sum of project durations for that month.
            </p>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
