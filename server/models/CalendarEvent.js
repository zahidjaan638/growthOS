const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, enum: ['tiktok', 'youtube'], required: true },
  category: { type: String, enum: ['tech', 'business', 'entertainment'], required: true },
  date: { type: Date, required: true },
  time: { type: String },
  description: { type: String },
  status: { type: String, enum: ['planned', 'in-progress', 'published'], default: 'planned' },
  language: { type: String, enum: ['en', 'ur'], default: 'en' },
}, { timestamps: true });

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);
