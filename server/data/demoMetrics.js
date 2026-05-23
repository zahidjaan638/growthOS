function generateDemoMetrics() {
  const now = new Date();
  const metrics = [];

  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const dayFactor = (90 - i) / 90;
    const randomFactor = () => 0.7 + Math.random() * 0.6;

    metrics.push({
      platform: 'tiktok',
      date: date.toISOString().split('T')[0],
      followers: Math.floor((5000 + dayFactor * 45000) * randomFactor()),
      views: Math.floor((10000 + dayFactor * 200000) * randomFactor()),
      likes: Math.floor((2000 + dayFactor * 50000) * randomFactor()),
      shares: Math.floor((200 + dayFactor * 5000) * randomFactor()),
      comments: Math.floor((100 + dayFactor * 3000) * randomFactor()),
    });

    metrics.push({
      platform: 'youtube',
      date: date.toISOString().split('T')[0],
      followers: Math.floor((2000 + dayFactor * 18000) * randomFactor()),
      views: Math.floor((5000 + dayFactor * 80000) * randomFactor()),
      likes: Math.floor((500 + dayFactor * 8000) * randomFactor()),
      shares: Math.floor((50 + dayFactor * 1000) * randomFactor()),
      comments: Math.floor((30 + dayFactor * 800) * randomFactor()),
    });

    metrics.push({
      platform: 'website',
      date: date.toISOString().split('T')[0],
      websiteVisits: Math.floor((100 + dayFactor * 5000) * randomFactor()),
      trafficSource: ['tiktok', 'youtube', 'google', 'direct', 'instagram'][Math.floor(Math.random() * 5)],
    });
  }

  return metrics;
}

const topContent = [
  {
    title: "AI Tools That Will Blow Your Mind",
    platform: "tiktok",
    views: 2500000,
    likes: 350000,
    shares: 45000,
    date: "2025-05-15",
    category: "tech",
  },
  {
    title: "How I Made $5000 in One Week",
    platform: "youtube",
    views: 850000,
    likes: 42000,
    shares: 8500,
    date: "2025-05-10",
    category: "business",
  },
  {
    title: "Pakistani Street Food Marathon",
    platform: "youtube",
    views: 1200000,
    likes: 89000,
    shares: 12000,
    date: "2025-05-08",
    category: "entertainment",
  },
  {
    title: "This Coding Trick Changes Everything",
    platform: "tiktok",
    views: 5800000,
    likes: 720000,
    shares: 95000,
    date: "2025-05-01",
    category: "tech",
  },
  {
    title: "Day in Life of a Pakistani YouTuber",
    platform: "youtube",
    views: 620000,
    likes: 31000,
    shares: 5200,
    date: "2025-04-28",
    category: "entertainment",
  },
  {
    title: "Start Freelancing TODAY - Beginner Guide",
    platform: "tiktok",
    views: 1800000,
    likes: 210000,
    shares: 32000,
    date: "2025-04-25",
    category: "business",
  },
];

const trafficSources = [
  { source: "TikTok Bio Link", visits: 12500, percentage: 35 },
  { source: "YouTube Description", visits: 8900, percentage: 25 },
  { source: "Google Search", visits: 5700, percentage: 16 },
  { source: "Direct Traffic", visits: 4300, percentage: 12 },
  { source: "Instagram", visits: 2800, percentage: 8 },
  { source: "Other", visits: 1400, percentage: 4 },
];

module.exports = { generateDemoMetrics, topContent, trafficSources };
