import { useState, useEffect } from 'react';
import {
  Hash, Copy, Check, Search, FileText,
} from 'lucide-react';
import { hashtagAPI } from '../services/api';

export default function HashtagSEO() {
  const [activeTab, setActiveTab] = useState('hashtags');
  const [category, setCategory] = useState('tech');
  const [platform, setPlatform] = useState('tiktok');
  const [hashtags, setHashtags] = useState([]);
  const [copied, setCopied] = useState('');
  const [seoTopic, setSeoTopic] = useState('');
  const [seoResult, setSeoResult] = useState(null);

  useEffect(() => {
    hashtagAPI.getHashtags({ category, platform })
      .then(res => setHashtags(res.data.hashtags || []))
      .catch(() => {
        setHashtags([
          "#TechTok", "#AI", "#Technology", "#CodingLife", "#TechTips",
          "#GadgetReview", "#Programming", "#iPhone", "#Android", "#TechNews",
          "#LearnToCode", "#AITools", "#FutureTech", "#Robotics", "#WebDev",
        ]);
      });
  }, [category, platform]);

  const generateSEO = async () => {
    if (!seoTopic) return;
    try {
      const res = await hashtagAPI.generateSEO({ topic: seoTopic, category, platform });
      setSeoResult(res.data);
    } catch {
      setSeoResult({
        titles: [
          `${seoTopic} - Complete Guide in Urdu/Hindi | 2025`,
          `${seoTopic} Tutorial for Beginners | Step by Step`,
          `Top 5 ${seoTopic} You MUST Know in 2025`,
        ],
        description: `In this video, I'll show you everything about ${seoTopic}. Whether you're a beginner or advanced, this tutorial will help you master ${seoTopic}.\n\n🔥 What you'll learn:\n- What is ${seoTopic}\n- Step by step tutorial\n- Pro tips and tricks\n\n#tech #${seoTopic.toLowerCase().replace(/\s+/g, '')} #tutorial`,
        tags: [seoTopic, `${seoTopic} tutorial`, `${seoTopic} 2025`, `${seoTopic} urdu`, `best ${seoTopic}`],
        hashtags: hashtags.slice(0, 10),
      });
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h2>Hashtag & SEO Tool</h2>
        <p>Optimize your content for maximum reach and discoverability</p>
      </div>

      <div className="tabs" style={{ maxWidth: 400 }}>
        <button className={`tab ${activeTab === 'hashtags' ? 'active' : ''}`} onClick={() => setActiveTab('hashtags')}>
          <Hash size={16} style={{ marginRight: 6 }} /> Hashtags
        </button>
        <button className={`tab ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>
          <Search size={16} style={{ marginRight: 6 }} /> SEO Writer
        </button>
      </div>

      <div className="filter-bar">
        <select className="form-control" value={category} onChange={e => setCategory(e.target.value)} style={{ width: 'auto', minWidth: 140 }}>
          <option value="tech">Tech</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <select className="form-control" value={platform} onChange={e => setPlatform(e.target.value)} style={{ width: 'auto', minWidth: 140 }}>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>

      {activeTab === 'hashtags' ? (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h3>Best Hashtags</h3>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(hashtags.join(' '), 'all-hashtags')}
              >
                {copied === 'all-hashtags' ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy All</>}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="tag"
                  onClick={() => copyToClipboard(tag, `tag-${i}`)}
                  title="Click to copy"
                >
                  {copied === `tag-${i}` ? '✓ Copied' : tag}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{hashtags.length}</strong> hashtags for{' '}
              <span className={`category-badge ${category}`}>{category}</span> on{' '}
              <span className={`platform-badge ${platform}`}>{platform}</span>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Quick Tips</h3>
            <div className="strategy-card" style={{ marginBottom: 0 }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>Use 3-5 hashtags per TikTok for best reach</li>
                <li>Mix popular & niche hashtags</li>
                <li>Put main hashtags in YouTube title</li>
                <li>Update hashtags based on trends weekly</li>
                <li>Use location tags for local reach</li>
                <li>Create a branded hashtag for your channel</li>
                <li>Research competitor hashtags</li>
                <li>Don&apos;t use banned or spam hashtags</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid-2">
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Generate SEO Content</h3>
            <div className="form-group">
              <label>Video Topic</label>
              <input
                className="form-control"
                value={seoTopic}
                onChange={e => setSeoTopic(e.target.value)}
                placeholder="e.g., AI Tools, Freelancing..."
              />
            </div>
            <button className="btn btn-primary" onClick={generateSEO} style={{ width: '100%', justifyContent: 'center' }}>
              <FileText size={16} /> Generate SEO Content
            </button>
          </div>

          <div>
            {seoResult ? (
              <div className="card">
                <h3 style={{ marginBottom: 16 }}>SEO Results</h3>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h4 style={{ fontSize: 14, color: 'var(--accent-secondary)' }}>Title Suggestions</h4>
                    <button className="copy-btn" onClick={() => copyToClipboard(seoResult.titles.join('\n'), 'titles')}>
                      {copied === 'titles' ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                  {seoResult.titles.map((title, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 14px',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: 6,
                        fontSize: 14,
                        cursor: 'pointer',
                        border: '1px solid var(--border-color)',
                      }}
                      onClick={() => copyToClipboard(title, `title-${i}`)}
                    >
                      {copied === `title-${i}` ? '✓ Copied!' : title}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h4 style={{ fontSize: 14, color: 'var(--accent-secondary)' }}>Description</h4>
                    <button className="copy-btn" onClick={() => copyToClipboard(seoResult.description, 'desc')}>
                      {copied === 'desc' ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                  <div style={{
                    padding: 14,
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 13,
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                  }}>
                    {seoResult.description}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h4 style={{ fontSize: 14, color: 'var(--accent-secondary)' }}>Tags</h4>
                    <button className="copy-btn" onClick={() => copyToClipboard(seoResult.tags.join(', '), 'tags')}>
                      {copied === 'tags' ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {seoResult.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
                <div className="empty-state">
                  <Search size={48} />
                  <h4>Enter a Topic</h4>
                  <p>Get optimized titles, descriptions & tags</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
