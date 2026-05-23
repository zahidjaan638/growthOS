import { useState, useEffect } from 'react';
import { TrendingUp, Eye, Flame, Search } from 'lucide-react';
import { trendingAPI } from '../services/api';

export default function ViralTopics() {
  const [topics, setTopics] = useState([]);
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = {};
    if (category) params.category = category;
    if (platform) params.platform = platform;

    trendingAPI.getTopics(params)
      .then(res => setTopics(res.data))
      .catch(() => {
        setTopics([
          { title: "AI Tools That Replace Your 9-5 Job", titleUrdu: "AI ٹولز جو آپ کی 9-5 نوکری کی جگہ لے لیں", platform: "both", estimatedViews: "500K - 2M", trending: true, tags: ["ai", "technology"] },
          { title: "How I Made $10K/Month with Dropshipping", titleUrdu: "میں نے ڈراپ شپنگ سے ماہانہ $10K کیسے کمائے", platform: "both", estimatedViews: "1M - 5M", trending: true, tags: ["dropshipping", "money"] },
          { title: "Day in Life of a Content Creator", titleUrdu: "ایک کانٹینٹ کریٹر کی زندگی کا ایک دن", platform: "both", estimatedViews: "1M - 5M", trending: true, tags: ["vlog", "creator"] },
          { title: "This AI Can Clone Your Voice in Seconds", titleUrdu: "یہ AI سیکنڈوں میں آپ کی آواز کلون کر سکتا ہے", platform: "tiktok", estimatedViews: "2M - 10M", trending: true, tags: ["ai", "voice"] },
          { title: "5 Side Hustles That Pay $5000/Month", titleUrdu: "5 سائیڈ ہسلز جو ماہانہ $5000 دیتے ہیں", platform: "both", estimatedViews: "2M - 8M", trending: true, tags: ["sidehustle", "income"] },
          { title: "Reacting to Pakistan's Viral Videos", titleUrdu: "پاکستان کی وائرل ویڈیوز پر ردعمل", platform: "both", estimatedViews: "2M - 10M", trending: true, tags: ["reaction", "viral"] },
        ]);
      });
  }, [category, platform]);

  const filtered = topics.filter(t =>
    !searchQuery ||
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.titleUrdu?.includes(searchQuery)
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <h2>Viral Topic Finder</h2>
        <p>Discover trending topics and video ideas in English & Urdu</p>
      </div>

      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="form-control"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
        </div>
        <select className="form-control" value={category} onChange={e => setCategory(e.target.value)} style={{ width: 'auto', minWidth: 140 }}>
          <option value="">All Categories</option>
          <option value="tech">Tech</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <select className="form-control" value={platform} onChange={e => setPlatform(e.target.value)} style={{ width: 'auto', minWidth: 140 }}>
          <option value="">All Platforms</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card purple">
          <div className="stat-icon"><TrendingUp size={24} /></div>
          <div className="stat-value">{filtered.length}</div>
          <div className="stat-label">Trending Topics</div>
        </div>
        <div className="stat-card pink">
          <div className="stat-icon"><Flame size={24} /></div>
          <div className="stat-value">{filtered.filter(t => t.trending).length}</div>
          <div className="stat-label">Hot Right Now</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"><Eye size={24} /></div>
          <div className="stat-value">50M+</div>
          <div className="stat-label">Total View Potential</div>
        </div>
      </div>

      <div className="grid-2">
        {filtered.map((topic, i) => (
          <div key={i} className="trending-card">
            {topic.trending && <span className="trending-badge">TRENDING</span>}
            <h4>{topic.title}</h4>
            {topic.titleUrdu && <p className="urdu-title">{topic.titleUrdu}</p>}

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {topic.platform === 'both' ? (
                <>
                  <span className="platform-badge tiktok">TikTok</span>
                  <span className="platform-badge youtube">YouTube</span>
                </>
              ) : (
                <span className={`platform-badge ${topic.platform}`}>{topic.platform}</span>
              )}
            </div>

            <div className="views-estimate">
              <Eye size={14} />
              Est. Views: {topic.estimatedViews}
            </div>

            {topic.tags && (
              <div style={{ marginTop: 12 }}>
                {topic.tags.map((tag, j) => (
                  <span key={j} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
