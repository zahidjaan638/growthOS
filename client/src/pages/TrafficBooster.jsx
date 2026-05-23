import { useState, useEffect } from 'react';
import {
  Megaphone, Link2, Mail, Copy, Check, ExternalLink,
} from 'lucide-react';
import { trafficAPI } from '../services/api';

export default function TrafficBooster() {
  const [activeTab, setActiveTab] = useState('cta');
  const [platform, setPlatform] = useState('tiktok');
  const [category, setCategory] = useState('tech');
  const [ctaSuggestions, setCtaSuggestions] = useState([]);
  const [bioStrategy, setBioStrategy] = useState(null);
  const [leadStrategy, setLeadStrategy] = useState(null);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (activeTab === 'cta') {
      trafficAPI.getCTASuggestions({ platform, category })
        .then(res => setCtaSuggestions(res.data))
        .catch(() => {
          setCtaSuggestions([
            { text: "🔗 Full tutorial on my website - link in bio!", type: "bio_link", effectiveness: 92 },
            { text: "📱 Download the free guide - bio link!", type: "lead_magnet", effectiveness: 88 },
            { text: "💻 Want the source code? Link in bio!", type: "bio_link", effectiveness: 85 },
          ]);
        });
    } else if (activeTab === 'bio') {
      trafficAPI.getBioLinkStrategy()
        .then(res => setBioStrategy(res.data))
        .catch(() => {});
    } else if (activeTab === 'leads') {
      trafficAPI.getLeadCaptureStrategy()
        .then(res => setLeadStrategy(res.data))
        .catch(() => {});
    }
  }, [activeTab, platform, category]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const getEffectivenessColor = (val) => {
    if (val >= 90) return 'var(--success)';
    if (val >= 80) return 'var(--info)';
    if (val >= 70) return 'var(--warning)';
    return 'var(--text-muted)';
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h2>Website Traffic Booster</h2>
        <p>Drive more traffic from your social media to your website</p>
      </div>

      <div className="tabs" style={{ maxWidth: 500 }}>
        <button className={`tab ${activeTab === 'cta' ? 'active' : ''}`} onClick={() => setActiveTab('cta')}>
          <Megaphone size={16} style={{ marginRight: 6 }} /> CTA Suggestions
        </button>
        <button className={`tab ${activeTab === 'bio' ? 'active' : ''}`} onClick={() => setActiveTab('bio')}>
          <Link2 size={16} style={{ marginRight: 6 }} /> Bio Link
        </button>
        <button className={`tab ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
          <Mail size={16} style={{ marginRight: 6 }} /> Lead Capture
        </button>
      </div>

      {activeTab === 'cta' && (
        <>
          <div className="filter-bar">
            <select className="form-control" value={platform} onChange={e => setPlatform(e.target.value)} style={{ width: 'auto', minWidth: 140 }}>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
            </select>
            <select className="form-control" value={category} onChange={e => setCategory(e.target.value)} style={{ width: 'auto', minWidth: 140 }}>
              <option value="tech">Tech</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          <div className="grid-2">
            {ctaSuggestions.map((cta, i) => (
              <div key={i} className="cta-card">
                <div className="cta-text">{cta.text}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div className="effectiveness" style={{ flex: 1 }}>
                    <span>Effectiveness:</span>
                    <div className="effectiveness-bar">
                      <div
                        className="effectiveness-fill"
                        style={{
                          width: `${cta.effectiveness}%`,
                          background: getEffectivenessColor(cta.effectiveness),
                        }}
                      />
                    </div>
                    <span style={{ fontWeight: 600, color: getEffectivenessColor(cta.effectiveness) }}>{cta.effectiveness}%</span>
                  </div>
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(cta.text, `cta-${i}`)}
                  >
                    {copied === `cta-${i}` ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {cta.type.replace(/_/g, ' ')}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'bio' && bioStrategy && (
        <div>
          <div className="grid-2" style={{ marginBottom: 24 }}>
            {bioStrategy.recommended.map((strategy, i) => (
              <div key={i} className="strategy-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--accent-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'white',
                  }}>
                    {strategy.priority}
                  </div>
                  <h4>{strategy.title}</h4>
                </div>
                <p>{strategy.description}</p>
                {strategy.links && (
                  <ul>
                    {strategy.links.map((link, j) => (
                      <li key={j}>
                        <ExternalLink size={12} style={{ marginRight: 4 }} />
                        {link}
                      </li>
                    ))}
                  </ul>
                )}
                {strategy.pages && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {strategy.pages.map((page, j) => (
                      <div key={j} style={{ padding: 10, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: 13 }}>
                        <strong>{page.name}</strong>
                        <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>{page.purpose}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Optimization Tips</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {bioStrategy.tips.map((tip, i) => (
                <div
                  key={i}
                  style={{
                    padding: 14,
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 14,
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 700, flexShrink: 0 }}>💡</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leads' && leadStrategy && (
        <div>
          <div className="grid-2" style={{ marginBottom: 24 }}>
            {leadStrategy.strategies.map((strategy, i) => (
              <div key={i} className="strategy-card">
                <h4>{strategy.name}</h4>
                <p>{strategy.description}</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Conversion: </span>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>{strategy.conversionRate}</span>
                  </div>
                  <div style={{ fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Difficulty: </span>
                    <span style={{
                      color: strategy.difficulty === 'Easy' ? 'var(--success)' : 'var(--warning)',
                      fontWeight: 600,
                    }}>{strategy.difficulty}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>EXAMPLES:</div>
                <ul>
                  {strategy.examples.map((ex, j) => (
                    <li key={j}>{ex}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Recommended Email Tools</h3>
            <div className="grid-3">
              {leadStrategy.emailTools.map((tool, i) => (
                <div
                  key={i}
                  style={{
                    padding: 20,
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    border: tool.recommended ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  }}
                >
                  {tool.recommended && (
                    <div style={{ fontSize: 10, color: 'var(--accent-primary)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>
                      Recommended
                    </div>
                  )}
                  <h4 style={{ marginBottom: 8 }}>{tool.name}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{tool.cost}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
