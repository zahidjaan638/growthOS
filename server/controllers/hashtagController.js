const { hashtagSets, seoTemplates } = require('../data/hashtags');

exports.getHashtags = (req, res) => {
  const { category, platform } = req.query;
  const cat = category || 'tech';
  const plat = platform || 'tiktok';

  const hashtags = hashtagSets[cat]?.[plat] || hashtagSets.tech.tiktok;

  res.json({
    category: cat,
    platform: plat,
    hashtags,
    hashtagString: hashtags.join(' '),
    count: hashtags.length,
  });
};

exports.generateSEO = (req, res) => {
  const { topic, category, platform, count } = req.body;
  const cat = category || 'tech';
  const templates = seoTemplates[cat] || seoTemplates.tech;
  const year = new Date().getFullYear();

  const titles = templates.titles.map(t =>
    t.replace('{topic}', topic || 'Amazing Topic')
      .replace('{year}', year)
      .replace('{count}', count || '5')
      .replace('{minutes}', '10')
      .replace('{action}', 'Master')
  );

  const description = templates.descriptions[0]
    .replace(/{topic}/g, topic || 'this amazing topic')
    .replace('{point1}', `What is ${topic || 'this topic'} and why it matters`)
    .replace('{point2}', 'Step by step tutorial and guide')
    .replace('{point3}', 'Pro tips and common mistakes to avoid')
    .replace('{timestamps}', '2:00 Getting Started\n5:00 Deep Dive\n8:00 Pro Tips')
    .replace(/{handle}/g, 'yourusername')
    .replace('{topic_tag}', (topic || 'tech').toLowerCase().replace(/\s+/g, ''));

  const hashtags = hashtagSets[cat]?.[platform || 'youtube'] || hashtagSets.tech.youtube;
  const tags = [
    topic || 'tech',
    `${topic || 'tech'} tutorial`,
    `${topic || 'tech'} ${year}`,
    `${topic || 'tech'} urdu`,
    `${topic || 'tech'} hindi`,
    `${topic || 'tech'} for beginners`,
    `best ${topic || 'tech'}`,
    `${topic || 'tech'} guide`,
    `how to ${topic || 'learn tech'}`,
    `${topic || 'tech'} pakistan`,
  ];

  res.json({
    titles,
    description,
    tags,
    hashtags: hashtags.slice(0, 10),
  });
};
