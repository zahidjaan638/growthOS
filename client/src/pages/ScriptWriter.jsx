import { useState } from 'react';
import {
  PenTool, Copy, Check, Lightbulb, Clock,
} from 'lucide-react';
import { scriptAPI } from '../services/api';

export default function ScriptWriter() {
  const [platform, setPlatform] = useState('tiktok');
  const [category, setCategory] = useState('tech');
  const [language, setLanguage] = useState('ur');
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');

  const generateScript = async () => {
    setLoading(true);
    try {
      const res = await scriptAPI.generate({ platform, category, language, topic });
      setScript(res.data);
    } catch {
      setScript({
        platform,
        language,
        category,
        topic: topic || 'General',
        duration: platform === 'tiktok' ? '60 seconds' : '10 minutes',
        script: {
          hook: platform === 'tiktok'
            ? `🔥 رُکو! کیا آپ جانتے ہیں کہ "${topic || 'یہ AI ٹول'}" آپ کی زندگی بدل سکتا ہے؟`
            : `السلام علیکم دوستو! آج کی ویڈیو میں ہم بات کریں گے "${topic || 'ٹیکنالوجی'}" کے بارے میں!`,
          content: `آج میں آپ کو بتاتا ہوں ${topic || 'اس ٹیکنالوجی'} کے بارے میں جو 2025 میں سب سے زیادہ ٹرینڈ کر رہی ہے۔\n\nسب سے پہلے، یہ بالکل مفت ہے ✅\nدوسرا، اسے استعمال کرنا بہت آسان ہے 📱\nتیسرا، یہ آپ کا وقت اور پیسے دونوں بچائے گا 💰`,
          cta: `🚀 ابھی فالو کریں تاکہ ایسے مزید ٹپس ملیں!\n👆 بائیو میں لنک پر کلک کریں\n💬 کمنٹ میں بتائیں آپ نے کیا سیکھا!`,
        },
        tips: [
          'Keep energy HIGH from the start',
          'Use text overlays for key points',
          'Add trending sounds',
          'Post between 6-10 PM for best reach',
        ],
      });
    }
    setLoading(false);
  };

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(section);
    setTimeout(() => setCopied(''), 2000);
  };

  const copyFullScript = () => {
    if (!script) return;
    const full = `=== HOOK ===\n${script.script.hook}\n\n=== CONTENT ===\n${script.script.content}\n\n=== CTA ===\n${script.script.cta}`;
    copyToClipboard(full, 'full');
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h2>AI Script Writer</h2>
        <p>Generate professional video scripts in Urdu & English</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Script Settings</h3>

          <div className="form-group">
            <label>Platform</label>
            <div className="tabs">
              <button className={`tab ${platform === 'tiktok' ? 'active' : ''}`} onClick={() => setPlatform('tiktok')}>
                TikTok (60s)
              </button>
              <button className={`tab ${platform === 'youtube' ? 'active' : ''}`} onClick={() => setPlatform('youtube')}>
                YouTube (10min)
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="tech">Tech</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>
            <div className="tabs">
              <button className={`tab ${language === 'ur' ? 'active' : ''}`} onClick={() => setLanguage('ur')}>
                اردو (Urdu)
              </button>
              <button className={`tab ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>
                English
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Topic (Optional)</label>
            <input
              className="form-control"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g., AI Tools, Freelancing, Comedy..."
            />
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={generateScript}
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {loading ? (
              <span className="loading">Generating...</span>
            ) : (
              <>
                <PenTool size={18} />
                Generate Script
              </>
            )}
          </button>

          {script && script.tips && (
            <div style={{ marginTop: 20 }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 14 }}>
                <Lightbulb size={16} style={{ color: 'var(--warning)' }} />
                Pro Tips
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {script.tips.map((tip, i) => (
                  <li key={i} style={{ padding: '6px 0', fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--accent-primary)' }}>→</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          {script ? (
            <div className="card">
              <div className="card-header">
                <div>
                  <h3>Generated Script</h3>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <span className={`platform-badge ${script.platform}`}>{script.platform}</span>
                    <span className={`category-badge ${script.category}`}>{script.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                      <Clock size={12} /> {script.duration}
                    </span>
                  </div>
                </div>
                <button className="copy-btn" onClick={copyFullScript}>
                  {copied === 'full' ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy All</>}
                </button>
              </div>

              <div className="script-output">
                <div className="script-section">
                  <div className="script-section-label hook">
                    🎣 HOOK
                    <button className="copy-btn" onClick={() => copyToClipboard(script.script.hook, 'hook')}>
                      {copied === 'hook' ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                  <div className="script-text">{script.script.hook}</div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '16px 0' }} />

                <div className="script-section">
                  <div className="script-section-label content">
                    📝 CONTENT
                    <button className="copy-btn" onClick={() => copyToClipboard(script.script.content, 'content')}>
                      {copied === 'content' ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                  <div className="script-text">{script.script.content}</div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '16px 0' }} />

                <div className="script-section">
                  <div className="script-section-label cta">
                    📢 CALL TO ACTION
                    <button className="copy-btn" onClick={() => copyToClipboard(script.script.cta, 'cta')}>
                      {copied === 'cta' ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                  <div className="script-text">{script.script.cta}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <div className="empty-state">
                <PenTool size={48} />
                <h4>Ready to Write</h4>
                <p>Configure your settings and click &quot;Generate Script&quot;</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
