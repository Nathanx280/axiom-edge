import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { companies, sectors, signals, getSignalLabel } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";

const presetQueries = [
  { label: "High-growth AI companies", filter: (c: typeof companies[0]) => c.sector === "Technology" && c.growthScore >= 85 },
  { label: "Undervalued opportunities", filter: (c: typeof companies[0]) => c.signal === "undervalued" },
  { label: "Low-risk, high-health", filter: (c: typeof companies[0]) => c.riskScore <= 35 && c.healthScore >= 85 },
  { label: "Emerging breakouts", filter: (c: typeof companies[0]) => c.signal === "emerging" || c.signal === "breakout" },
];

export default function Discover() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [selectedSignal, setSelectedSignal] = useState<string>("All");
  const [minScore, setMinScore] = useState(0);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activePreset !== null) {
      return companies.filter(presetQueries[activePreset].filter);
    }
    return companies.filter(c => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.ticker.toLowerCase().includes(search.toLowerCase());
      const matchSector = selectedSector === "All" || c.sector === selectedSector;
      const matchSignal = selectedSignal === "All" || c.signal === selectedSignal;
      const matchScore = c.aiScore >= minScore;
      return matchSearch && matchSector && matchSignal && matchScore;
    });
  }, [search, selectedSector, selectedSignal, minScore, activePreset]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Smart Discovery</h1>
        <p className="text-sm text-muted-foreground mt-1">Find high-probability investment opportunities with AI-powered search</p>
      </div>

      {/* Smart queries */}
      <div className="glass p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-neon-amber" />
          <span className="text-sm font-medium text-foreground">Quick Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => setActivePreset(activePreset === i ? null : i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePreset === i ? "bg-primary/15 text-primary neon-glow-green" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-4">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Advanced Filters</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search company or ticker..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActivePreset(null); }}
              className="w-full bg-secondary text-foreground text-sm rounded-lg pl-9 pr-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
          <select value={selectedSector} onChange={e => { setSelectedSector(e.target.value); setActivePreset(null); }}
            className="bg-secondary text-foreground text-xs rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="All">All Sectors</option>
            {sectors.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={selectedSignal} onChange={e => { setSelectedSignal(e.target.value); setActivePreset(null); }}
            className="bg-secondary text-foreground text-xs rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="All">All Signals</option>
            {signals.map(s => <option key={s} value={s}>{getSignalLabel(s)}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Min Score: {minScore}</span>
            <input type="range" min={0} max={95} step={5} value={minScore}
              onChange={e => { setMinScore(Number(e.target.value)); setActivePreset(null); }}
              className="w-20 accent-primary" />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} results found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(c => <CompanyCard key={c.id} company={c} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">No companies match your criteria</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
