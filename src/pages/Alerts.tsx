import { Bell, TrendingUp, TrendingDown, AlertTriangle, Zap, Clock } from "lucide-react";

const alerts = [
  { id: 1, type: "undervalued", icon: TrendingDown, title: "TSM became undervalued", desc: "Taiwan Semiconductor's P/E dropped below historical average. AI Score remains 93.", time: "2 hours ago", color: "text-neon-blue" },
  { id: 2, type: "sentiment", icon: TrendingUp, title: "PLTR sentiment spike detected", desc: "Palantir social sentiment jumped 34% in 24h following new government contract announcement.", time: "4 hours ago", color: "text-chart-up" },
  { id: 3, type: "breakout", icon: Zap, title: "ARM breakout signal triggered", desc: "Arm Holdings crossed key resistance at $155 with 2.3x average volume.", time: "6 hours ago", color: "text-neon-amber" },
  { id: 4, type: "risk", icon: AlertTriangle, title: "CELH risk level elevated", desc: "Celsius Holdings risk score increased to 55. Revenue growth deceleration detected.", time: "8 hours ago", color: "text-destructive" },
  { id: 5, type: "emerging", icon: Zap, title: "ACHR momentum building", desc: "Archer Aviation showing early accumulation patterns. Volume up 180% this week.", time: "12 hours ago", color: "text-neon-purple" },
  { id: 6, type: "score", icon: TrendingUp, title: "NVDA AI Score upgraded to 96", desc: "NVIDIA's composite score increased after record data center revenue beat.", time: "1 day ago", color: "text-primary" },
  { id: 7, type: "undervalued", icon: TrendingDown, title: "MELI value opportunity", desc: "MercadoLibre trading 15% below intrinsic value estimate. Strong LATAM growth thesis intact.", time: "1 day ago", color: "text-neon-blue" },
  { id: 8, type: "sentiment", icon: TrendingUp, title: "SYM insider buying detected", desc: "Symbotic CEO purchased 50,000 shares at $31.20. Third insider buy this month.", time: "2 days ago", color: "text-chart-up" },
];

export default function Alerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Real-Time Alerts</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-detected signals, sentiment shifts, and opportunity alerts</p>
      </div>

      <div className="glass p-4 flex items-center gap-3">
        <Bell className="text-primary" size={18} />
        <span className="text-sm text-foreground font-medium">{alerts.length} active alerts</span>
        <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" /> Live monitoring
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map(a => (
          <div key={a.id} className="glass p-4 flex items-start gap-3 animate-slide-up hover:neon-glow-green transition-all">
            <div className={`p-2 rounded-lg bg-secondary ${a.color}`}>
              <a.icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
            </div>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1 whitespace-nowrap">
              <Clock size={10} /> {a.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
