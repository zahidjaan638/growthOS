# GrowthOS 🚀

A professional social media growth dashboard for TikTok and YouTube creators. Built with React.js, Node.js, and MongoDB.

![GrowthOS](https://img.shields.io/badge/GrowthOS-v1.0-6c5ce7?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js)

## Features

### 1. Content Calendar
- Monthly/weekly content planner
- Separate schedules for TikTok & YouTube
- Filter by Tech, Business, Entertainment categories
- Create, edit, and track content status

### 2. Viral Topic Finder
- Trending topics across categories
- Video ideas in both Urdu & English
- Estimated views potential
- Filter by platform and category

### 3. AI Script Writer
- 60-second TikTok scripts
- 10-minute YouTube scripts
- Hook + Content + CTA format
- Scripts in Urdu & English

### 4. Hashtag & SEO Tool
- Best hashtags for Tech/Business/Entertainment
- YouTube title & description generator
- Tags generator with copy-to-clipboard

### 5. Growth Tracker Dashboard
- Follower growth charts
- Views and engagement analytics
- Best performing content tracker
- Website traffic source tracking

### 6. Website Traffic Booster
- CTA suggestions with effectiveness ratings
- Bio link optimization strategies
- Lead capture strategy guide
- Email tool recommendations

## Tech Stack

- **Frontend:** React.js 18 + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (optional, works with demo data)
- **Charts:** Recharts
- **Icons:** Lucide React
- **UI:** Custom dark mode design, fully responsive

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (optional)

### Installation

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env` in the `server/` directory:

```bash
cp server/.env.example server/.env
```

Configure:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `OPENAI_API_KEY` - OpenAI API key (for AI features)

### Running

```bash
# Development (both frontend and backend)
npm run dev

# Frontend only
npm run dev:client

# Backend only
npm run dev:server

# Production build
npm run build
npm start
```

## Project Structure

```
growthOS/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Global styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/             # Database config
│   ├── controllers/        # Route handlers
│   ├── data/               # Demo/seed data
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── index.js            # Server entry
└── package.json            # Root package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calendar` | Get calendar events |
| POST | `/api/calendar` | Create calendar event |
| PUT | `/api/calendar/:id` | Update calendar event |
| DELETE | `/api/calendar/:id` | Delete calendar event |
| GET | `/api/trending` | Get trending topics |
| POST | `/api/scripts/generate` | Generate video script |
| GET | `/api/hashtags` | Get hashtags |
| POST | `/api/hashtags/seo` | Generate SEO content |
| GET | `/api/growth/metrics` | Get growth metrics |
| GET | `/api/growth/top-content` | Get top content |
| GET | `/api/growth/summary` | Get growth summary |
| GET | `/api/traffic/cta` | Get CTA suggestions |
| GET | `/api/traffic/bio-link` | Get bio link strategy |
| GET | `/api/traffic/lead-capture` | Get lead capture strategy |

## License

MIT
