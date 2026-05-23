import { useState, useEffect } from 'react';
import {
  Users, Eye, Heart, Globe, TrendingUp, ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { growthAPI } from '../services/api';

const COLORS = ['#6c5ce7', '#ff0050', '#00d68f', '#00b4d8', '#ffaa00', '#9898b0'];

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [trafficSources, setTrafficSources] = useState([]);
  const [topContent, setTopContent] = useState([]);

  useEffect(() => {
    Promise.all([
      growthAPI.getSummary(),
      growthAPI.getMetrics({ days: 30 }),
      growthAPI.getTrafficSources(),
      growthAPI.getTopContent(),
    ]).then(([summaryRes, metricsRes, trafficRes, contentRes]) => {
      setSummary(summaryRes.data);
      setTrafficSources(trafficRes.data);
      setTopContent(contentRes.data.slice(0, 5));

      const grouped = {};
      metricsRes.data.forEach(m => {
        if (m.platform === 'website') return;
        if (!grouped[m.date]) grouped[m.date] = { date: m.date };
        grouped[m.date][m.platform + 'Views'] = m.views;
        grouped[m.date][m.platform + 'Followers'] = m.followers;
      });
      setMetrics(Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date)));
    }).catch(() => {
      setSummary({
        totalFollowers: 68500,
        totalViews: 285000,
        totalEngagement: 42300,
        websiteVisits: 5200,
        growth: {
          followersGrowth: '+12.5%',
          viewsGrowth: '+28.3%',
          engagementGrowth: '+15.7%',
          websiteGrowth: '+45.2%',
        },
      });
    });
  }, []);

  const stats = summary ? [
    { label: 'Total Followers', value: formatNumber(summary.totalFollowers), change: summary.growth.followersGrowth, icon: Users, color: 'purple' },
    { label: 'Total Views', value: formatNumber(summary.totalViews), change: summary.growth.viewsGrowth, icon: Eye, color: 'pink' },
    { label: 'Engagement', value: formatNumber(summary.totalEngagement), change: summary.growth.engagementGrowth, icon: Heart, color: 'red' },
    { label: 'Website Visits', value: formatNumber(summary.websiteVisits), change: summary.growth.websiteGrowth, icon: Globe, color: 'green' },
  ] : [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '13px',
        }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color, fontWeight: 600 }}>
              {p.name}: {formatNumber(p.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome back! Here&apos;s your growth overview</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
              <ArrowUpRight size={14} />
              {stat.change} this month
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <h3>Views Overview</h3>
            <span className="platform-badge tiktok" style={{ marginRight: 8 }}>TikTok</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={metrics}>
              <defs>
                <linearGradient id="tiktokGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff0050" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff0050" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="youtubeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff0000" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={v => v.slice(5)} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={formatNumber} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="tiktokViews" name="TikTok" stroke="#ff0050" fillOpacity={1} fill="url(#tiktokGrad)" />
              <Area type="monotone" dataKey="youtubeViews" name="YouTube" stroke="#ff0000" fillOpacity={1} fill="url(#youtubeGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Traffic Sources</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="visits"
                  nameKey="source"
                >
                  {trafficSources.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {trafficSources.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                  <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{s.source}</span>
                  <span style={{ fontWeight: 600 }}>{s.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Top Performing Content</h3>
          <TrendingUp size={20} style={{ color: 'var(--accent-primary)' }} />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Content</th>
                <th>Platform</th>
                <th>Category</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Shares</th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{c.title}</td>
                  <td><span className={`platform-badge ${c.platform}`}>{c.platform}</span></td>
                  <td><span className={`category-badge ${c.category}`}>{c.category}</span></td>
                  <td style={{ fontWeight: 600 }}>{formatNumber(c.views)}</td>
                  <td>{formatNumber(c.likes)}</td>
                  <td>{formatNumber(c.shares)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
