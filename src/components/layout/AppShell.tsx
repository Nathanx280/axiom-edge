import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Search, Briefcase, Bell, TrendingUp, Activity, Menu, X } from "lucide-react";

const navItems = [
  { to: "/", icon: BarChart3, label: "Dashboard" },
  { to: "/discover", icon: Search, label: "Discover" },
  { to: "/portfolio", icon: Briefcase, label: "Portfolio" },
  { to: "/alerts", icon: Bell, label: "Alerts" },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-border glass-strong sticky top-0 z-50 flex items-center px-4 gap-4">
        <button className="md:hidden text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2">
          <Activity className="text-primary" size={22} />
          <span className="font-bold text-lg text-gradient font-mono tracking-tight">NEXUS AI</span>
        </div>
        <div className="hidden md:flex items-center gap-1 ml-6">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname === to
                  ? "bg-primary/10 text-primary neon-glow-green"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" />
            LIVE
          </div>
          <TrendingUp size={16} className="text-primary" />
        </div>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-b border-border p-2 flex gap-1 z-40">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${
                pathname === to ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
