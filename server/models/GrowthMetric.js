const mongoose = require('mongoose');

const growthMetricSchema = new mongoose.Schema({
  platform: { type: String, enum: ['tiktok', 'youtube', 'website'], required: true },
  date: { type: Date, required: true },
  followers: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  websiteVisits: { type: Number, default: 0 },
  trafficSource: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('GrowthMetric', growthMetricSchema);
