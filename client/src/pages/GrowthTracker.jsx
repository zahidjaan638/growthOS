import { useState, useEffect } from 'react';
import {
  Users, Eye, Heart, MessageCircle, Share2, TrendingUp,
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { growthAPI } from '../services/api';

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export default function GrowthTracker() {
  const [metrics, setMetrics] = useState([]);
  const [topContent, setTopContent] = useState([]);
  const [trafficSources, setTrafficSources] = useState([]);
  const [days, setDays] = useState(30);
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    const params = { days };
    if (platform) params.platform = platform;

    Promise.all([
      growthAPI.getMetrics(params),
      growthAPI.getTopContent({ platform }),
      growthAPI.getTrafficSources(),
    ]).then(([metricsRes, contentRes, trafficRes]) => {
      const grouped = {};
      metricsRes.data.forEach(m => {
        if (m.platform === 'website') return;
        const key = m.date;
        if (!grouped[key]) grouped[key] = { date: key };
        const prefix = m.platform;
        grouped[key][prefix + 'Followers'] = m.followers;
        grouped[key][prefix + 'Views'] = m.views;
        grouped[key][prefix + 'Likes'] = m.likes;
        grouped[key][prefix + 'Comments'] = m.comments;
        grouped[key][prefix + 'Shares'] = m.shares;
      });
      setMetrics(Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date)));
      setTopContent(contentRes.data);
      setTrafficSources(trafficRes.data);
    }).catch(() => {});
  }, [days, platform]);

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
        <h2>Growth Tracker</h2>
        <p>Monitor your follower growth and content performance</p>
      </div>

      <div className="filter-bar">
        <div className="tabs">
          {[7, 30, 60, 90].map(d => (
            <button key={d} className={`tab ${days === d ? 'active' : ''}`} onClick={() => setDays(d)}>
              {d}D
            </button>
          ))}
        </div>
        <select className="form-control" value={platform} onChange={e => setPlatform(e.target.value)} style={{ width: 'auto', minWidth: 140 }}>
          <option value="">All Platforms</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <h3><Users size={18} style={{ marginRight: 8 }} />Follower Growth</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={v => v.slice(5)} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={formatNumber} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {(!platform || platform === 'tiktok') && (
                <Line type="monotone" dataKey="tiktokFollowers" name="TikTok" stroke="#ff0050" strokeWidth={2} dot={false} />
              )}
              {(!platform || platform === 'youtube') && (
                <Line type="monotone" dataKey="youtubeFollowers" name="YouTube" stroke="#ff0000" strokeWidth={2} dot={false} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <h3><Eye size={18} style={{ marginRight: 8 }} />Views</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={metrics.filter((_, i) => i % 3 === 0)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={v => v.slice(5)} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={formatNumber} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {(!platform || platform === 'tiktok') && (
                <Bar dataKey="tiktokViews" name="TikTok" fill="#ff0050" radius={[4, 4, 0, 0]} />
              )}
              {(!platform || platform === 'youtube') && (
                <Bar dataKey="youtubeViews" name="YouTube" fill="#ff0000" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <h3><Heart size={18} style={{ marginRight: 8 }} />Engagement</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={v => v.slice(5)} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={formatNumber} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="tiktokLikes" name="TikTok Likes" stroke="#ff0050" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="youtubeLikes" name="YouTube Likes" stroke="#ff0000" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Website Traffic Sources</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {trafficSources.map((source, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', width: 140, flexShrink: 0 }}>{source.source}</span>
                <div className="effectiveness-bar" style={{ flex: 1 }}>
                  <div
                    className="effectiveness-fill"
                    style={{
                      width: `${source.percentage}%`,
                      background: ['var(--accent-gradient)', 'var(--tiktok-gradient)', 'var(--youtube-gradient)', 'linear-gradient(135deg, #00d68f, #00e6a0)', 'linear-gradient(135deg, #ffaa00, #ffcc00)', 'linear-gradient(135deg, #9898b0, #b0b0c0)'][i] || 'var(--accent-gradient)',
                    }}
                  />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, width: 60, textAlign: 'right' }}>{formatNumber(source.visits)}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 36, textAlign: 'right' }}>{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3><TrendingUp size={18} style={{ marginRight: 8 }} />Best Performing Content</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Content</th>
                <th>Platform</th>
                <th>Category</th>
                <th><Eye size={14} /> Views</th>
                <th><Heart size={14} /> Likes</th>
                <th><Share2 size={14} /> Shares</th>
                <th><MessageCircle size={14} /> Date</th>
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
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
