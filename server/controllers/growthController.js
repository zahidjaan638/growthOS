const { generateDemoMetrics, topContent, trafficSources } = require('../data/demoMetrics');

exports.getMetrics = (req, res) => {
  const { platform, days } = req.query;
  let metrics = generateDemoMetrics();

  if (platform) {
    metrics = metrics.filter(m => m.platform === platform);
  }

  if (days) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - parseInt(days));
    metrics = metrics.filter(m => new Date(m.date) >= cutoff);
  }

  res.json(metrics);
};

exports.getTopContent = (req, res) => {
  const { platform, category } = req.query;
  let content = [...topContent];

  if (platform) content = content.filter(c => c.platform === platform);
  if (category) content = content.filter(c => c.category === category);

  content.sort((a, b) => b.views - a.views);
  res.json(content);
};

exports.getTrafficSources = (req, res) => {
  res.json(trafficSources);
};

exports.getSummary = (req, res) => {
  const metrics = generateDemoMetrics();
  const latest = {};

  for (const m of metrics) {
    if (!latest[m.platform] || new Date(m.date) > new Date(latest[m.platform].date)) {
      latest[m.platform] = m;
    }
  }

  const totalFollowers = (latest.tiktok?.followers || 0) + (latest.youtube?.followers || 0);
  const totalViews = (latest.tiktok?.views || 0) + (latest.youtube?.views || 0);
  const totalEngagement = (latest.tiktok?.likes || 0) + (latest.youtube?.likes || 0) +
    (latest.tiktok?.comments || 0) + (latest.youtube?.comments || 0);

  res.json({
    totalFollowers,
    totalViews,
    totalEngagement,
    websiteVisits: latest.website?.websiteVisits || 0,
    platforms: latest,
    growth: {
      followersGrowth: '+12.5%',
      viewsGrowth: '+28.3%',
      engagementGrowth: '+15.7%',
      websiteGrowth: '+45.2%',
    },
  });
};
