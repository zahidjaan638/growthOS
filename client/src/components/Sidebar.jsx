import {
  LayoutDashboard,
  CalendarDays,
  TrendingUp,
  PenTool,
  Hash,
  BarChart3,
  Megaphone,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'calendar', label: 'Content Calendar', icon: CalendarDays },
  { id: 'trending', label: 'Viral Topics', icon: TrendingUp },
  { id: 'scripts', label: 'AI Script Writer', icon: PenTool },
  { id: 'hashtags', label: 'Hashtag & SEO', icon: Hash },
  { id: 'growth', label: 'Growth Tracker', icon: BarChart3 },
  { id: 'traffic', label: 'Traffic Booster', icon: Megaphone },
];

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">G</div>
          <div>
            <h1>GrowthOS</h1>
            <span>Creator Dashboard</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => {
                setActivePage(item.id);
                setIsOpen(false);
              }}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p className="version">GrowthOS v1.0</p>
        </div>
      </aside>
    </>
  );
}
