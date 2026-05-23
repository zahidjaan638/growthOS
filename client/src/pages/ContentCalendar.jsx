import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, X, Clock,
} from 'lucide-react';
import { calendarAPI } from '../services/api';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('month');
  const [filterPlatform, setFilterPlatform] = useState('');
  const [formData, setFormData] = useState({
    title: '', platform: 'tiktok', category: 'tech',
    date: '', time: '10:00', description: '', status: 'planned', language: 'ur',
  });

  const fetchEvents = useCallback(async () => {
    try {
      const params = {};
      if (filterPlatform) params.platform = filterPlatform;
      const res = await calendarAPI.getEvents(params);
      setEvents(res.data);
    } catch {
      setEvents([
        { id: '1', title: 'AI Tools Review', platform: 'tiktok', category: 'tech', date: new Date().toISOString(), time: '10:00', status: 'planned' },
        { id: '2', title: 'Freelancing Guide', platform: 'youtube', category: 'business', date: new Date(Date.now() + 86400000).toISOString(), time: '14:00', status: 'planned' },
        { id: '3', title: 'Comedy Sketch', platform: 'tiktok', category: 'entertainment', date: new Date(Date.now() + 172800000).toISOString(), time: '18:00', status: 'in-progress' },
        { id: '4', title: 'iPhone Tips', platform: 'youtube', category: 'tech', date: new Date(Date.now() + 259200000).toISOString(), time: '12:00', status: 'planned' },
        { id: '5', title: 'Dropshipping Tutorial', platform: 'youtube', category: 'business', date: new Date(Date.now() + 345600000).toISOString(), time: '15:00', status: 'planned' },
        { id: '6', title: 'Day in My Life', platform: 'tiktok', category: 'entertainment', date: new Date(Date.now() - 86400000).toISOString(), time: '09:00', status: 'published' },
      ]);
    }
  }, [filterPlatform]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();

  const calendarDays = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, currentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, currentMonth: true });
  }
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, currentMonth: false });
  }

  const getEventsForDay = (day) => {
    return events.filter(e => {
      const d = new Date(e.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  const isToday = (day) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const navigate = (dir) => {
    setCurrentDate(new Date(year, month + dir, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await calendarAPI.createEvent(formData);
      await fetchEvents();
    } catch {
      const newEvent = { id: String(Date.now()), ...formData };
      setEvents(prev => [...prev, newEvent]);
    }
    setShowModal(false);
    setFormData({
      title: '', platform: 'tiktok', category: 'tech',
      date: '', time: '10:00', description: '', status: 'planned', language: 'ur',
    });
  };

  const getWeekEvents = () => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return events.filter(e => {
      const d = new Date(e.date);
      return d >= startOfWeek && d <= endOfWeek;
    });
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h2>Content Calendar</h2>
        <p>Plan and schedule your TikTok & YouTube content</p>
      </div>

      <div className="filter-bar">
        <div className="tabs">
          <button className={`tab ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}>Monthly</button>
          <button className={`tab ${viewMode === 'week' ? 'active' : ''}`} onClick={() => setViewMode('week')}>Weekly</button>
        </div>

        <select
          className="form-control"
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
          style={{ width: 'auto', minWidth: 140 }}
        >
          <option value="">All Platforms</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>

        <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ marginLeft: 'auto' }}>
          <Plus size={16} /> New Event
        </button>
      </div>

      {viewMode === 'month' ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}><ChevronLeft size={18} /></button>
            <h3>{MONTHS[month]} {year}</h3>
            <button className="btn btn-secondary" onClick={() => navigate(1)}><ChevronRight size={18} /></button>
          </div>

          <div className="calendar-grid">
            {DAYS.map(d => <div key={d} className="calendar-day-header">{d}</div>)}
            {calendarDays.map((cd, i) => (
              <div
                key={i}
                className={`calendar-day ${!cd.currentMonth ? 'other-month' : ''} ${cd.currentMonth && isToday(cd.day) ? 'today' : ''}`}
              >
                <div className="day-number">{cd.day}</div>
                {cd.currentMonth && getEventsForDay(cd.day).map(evt => (
                  <div key={evt.id} className={`calendar-event ${evt.platform}`}>
                    {evt.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>This Week&apos;s Schedule</h3>
          {getWeekEvents().length === 0 ? (
            <div className="empty-state">
              <CalendarIcon />
              <h4>No events this week</h4>
              <p>Click &quot;New Event&quot; to start planning</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {getWeekEvents().map(evt => (
                <div
                  key={evt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 16,
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: `3px solid ${evt.platform === 'tiktok' ? 'var(--tiktok-color)' : 'var(--youtube-color)'}`,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{evt.title}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span className={`platform-badge ${evt.platform}`}>{evt.platform}</span>
                      <span className={`category-badge ${evt.category}`}>{evt.category}</span>
                      <span className={`status-badge ${evt.status}`}>{evt.status}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 13 }}>
                    <Clock size={14} />
                    {evt.time}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                    {new Date(evt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3>New Content Event</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  className="form-control"
                  value={formData.title}
                  onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="Video title..."
                  required
                />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Platform</label>
                  <select className="form-control" value={formData.platform} onChange={e => setFormData(p => ({ ...p, platform: e.target.value }))}>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}>
                    <option value="tech">Tech</option>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" className="form-control" value={formData.date} onChange={e => setFormData(p => ({ ...p, date: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" className="form-control" value={formData.time} onChange={e => setFormData(p => ({ ...p, time: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label>Language</label>
                <select className="form-control" value={formData.language} onChange={e => setFormData(p => ({ ...p, language: e.target.value }))}>
                  <option value="ur">Urdu</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} placeholder="Brief description..." />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
