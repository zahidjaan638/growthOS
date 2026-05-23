const trendingTopics = require('../data/trendingTopics');

exports.getTrending = (req, res) => {
  const { category, platform } = req.query;

  let topics = [];

  if (category && trendingTopics[category]) {
    topics = trendingTopics[category];
  } else {
    topics = [
      ...trendingTopics.tech,
      ...trendingTopics.business,
      ...trendingTopics.entertainment,
    ];
  }

  if (platform) {
    topics = topics.filter(t => t.platform === platform || t.platform === 'both');
  }

  res.json(topics);
};

exports.getCategories = (req, res) => {
  res.json(Object.keys(trendingTopics));
};
