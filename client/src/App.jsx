import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ContentCalendar from './pages/ContentCalendar';
import ViralTopics from './pages/ViralTopics';
import ScriptWriter from './pages/ScriptWriter';
import HashtagSEO from './pages/HashtagSEO';
import GrowthTracker from './pages/GrowthTracker';
import TrafficBooster from './pages/TrafficBooster';

const pages = {
  dashboard: Dashboard,
  calendar: ContentCalendar,
  trending: ViralTopics,
  scripts: ScriptWriter,
  hashtags: HashtagSEO,
  growth: GrowthTracker,
  traffic: TrafficBooster,
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const PageComponent = pages[activePage] || Dashboard;

  return (
    <div className="app-layout">
      <div className="mobile-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32,
            height: 32,
            background: 'var(--accent-gradient)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: 'white',
          }}>G</div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>GrowthOS</span>
        </div>
        <div style={{ width: 24 }} />
      </div>

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="main-content">
        <PageComponent />
      </main>
    </div>
  );
}
