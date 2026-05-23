const demoEvents = [
  { id: '1', title: 'AI Tools Review', platform: 'tiktok', category: 'tech', date: new Date().toISOString(), time: '10:00', description: 'Review top 5 AI tools', status: 'planned', language: 'ur' },
  { id: '2', title: 'Freelancing Guide', platform: 'youtube', category: 'business', date: new Date(Date.now() + 86400000).toISOString(), time: '14:00', description: 'Complete freelancing tutorial', status: 'planned', language: 'ur' },
  { id: '3', title: 'Comedy Sketch', platform: 'tiktok', category: 'entertainment', date: new Date(Date.now() + 172800000).toISOString(), time: '18:00', description: 'Funny tech support call', status: 'in-progress', language: 'en' },
  { id: '4', title: 'iPhone Tips & Tricks', platform: 'youtube', category: 'tech', date: new Date(Date.now() + 259200000).toISOString(), time: '12:00', description: 'Hidden iPhone features', status: 'planned', language: 'en' },
  { id: '5', title: 'Dropshipping Tutorial', platform: 'youtube', category: 'business', date: new Date(Date.now() + 345600000).toISOString(), time: '15:00', description: 'Start dropshipping from Pakistan', status: 'planned', language: 'ur' },
  { id: '6', title: 'Day in My Life Vlog', platform: 'tiktok', category: 'entertainment', date: new Date(Date.now() - 86400000).toISOString(), time: '09:00', description: 'A day as a content creator', status: 'published', language: 'en' },
];

let events = [...demoEvents];
let nextId = 7;

exports.getEvents = (req, res) => {
  const { platform, category, month, year } = req.query;
  let filtered = [...events];

  if (platform) filtered = filtered.filter(e => e.platform === platform);
  if (category) filtered = filtered.filter(e => e.category === category);
  if (month && year) {
    filtered = filtered.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === parseInt(month) && d.getFullYear() === parseInt(year);
    });
  }

  res.json(filtered);
};

exports.createEvent = (req, res) => {
  const event = { id: String(nextId++), ...req.body };
  events.push(event);
  res.status(201).json(event);
};

exports.updateEvent = (req, res) => {
  const { id } = req.params;
  const idx = events.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });
  events[idx] = { ...events[idx], ...req.body };
  res.json(events[idx]);
};

exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  events = events.filter(e => e.id !== id);
  res.json({ message: 'Event deleted' });
};
