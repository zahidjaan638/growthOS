require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/calendar', require('./routes/calendar'));
app.use('/api/trending', require('./routes/trending'));
app.use('/api/scripts', require('./routes/scripts'));
app.use('/api/hashtags', require('./routes/hashtags'));
app.use('/api/growth', require('./routes/growth'));
app.use('/api/traffic', require('./routes/traffic'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GrowthOS API is running' });
});

app.listen(PORT, () => {
  console.log(`GrowthOS server running on port ${PORT}`);
});
