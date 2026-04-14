import { useState, useMemo } from "react";
import { Activity, TrendingUp, Zap, Shield, ArrowUpDown } from "lucide-react";
import { companies, sectors } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";
import StatCard from "@/components/StatCard";

type SortKey = "aiScore" | "growthScore" | "change24h" | "marketCap";

export default function Dashboard() {
  const [sortBy, setSortBy] = useState<SortKey>("aiScore");
  const [filterSector, setFilterSector] = useState<string>("All");

  const filtered = useMemo(() => {
    let list = filterSector === "All" ? companies : companies.filter(c => c.sector === filterSector);
    return [...list].sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));
  }, [sortBy, filterSector]);

  const avgScore = Math.round(companies.reduce((s, c) => s + c.aiScore, 0) / companies.length);
  const topGainer = companies.reduce((a, b) => a.change24h > b.change24h ? a : b);
  const signalCount = companies.filter(c => c.signal).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Ranking Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time AI-scored investment intelligence across global markets</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Activity} label="Avg AI Score" value={avgScore.toString()} sub="across 12 companies" />
        <StatCard icon={TrendingUp} label="Top Gainer" value={`+${topGainer.change24h}%`} sub={topGainer.ticker} color="text-chart-up" />
        <StatCard icon={Zap} label="Active Signals" value={signalCount.toString()} sub="opportunities detected" color="text-neon-amber" />
        <StatCard icon={Shield} label="Companies" value={companies.length.toString()} sub="tracked globally" color="text-neon-blue" />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">Sort:</span>
          {(["aiScore", "growthScore", "change24h", "marketCap"] as SortKey[]).map(key => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                sortBy === key ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {key === "aiScore" ? "AI Score" : key === "growthScore" ? "Growth" : key === "change24h" ? "24h Change" : "Market Cap"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-muted-foreground font-medium">Sector:</span>
          <select
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
            className="bg-secondary text-foreground text-xs rounded-md px-2 py-1 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="All">All Sectors</option>
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(c => <CompanyCard key={c.id} company={c} />)}
      </div>
    </div>
  );
}
