import { useState } from "react";
import { Plus, X, TrendingUp, PieChart, DollarSign } from "lucide-react";
import { companies, formatMarketCap, getChangeColor } from "@/data/companies";
import ScoreGauge from "@/components/ScoreGauge";
import { ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Tooltip } from "recharts";

interface Holding {
  companyId: string;
  shares: number;
}

const COLORS = ["hsl(160,100%,45%)", "hsl(200,100%,50%)", "hsl(270,100%,65%)", "hsl(38,100%,55%)", "hsl(0,72%,55%)", "hsl(180,70%,50%)"];

export default function Portfolio() {
  const [holdings, setHoldings] = useState<Holding[]>([
    { companyId: "1", shares: 50 },
    { companyId: "3", shares: 30 },
    { companyId: "5", shares: 100 },
  ]);
  const [addTicker, setAddTicker] = useState("");

  const portfolioData = holdings.map(h => {
    const c = companies.find(co => co.id === h.companyId)!;
    return { ...c, shares: h.shares, value: h.shares * c.price };
  }).filter(Boolean);

  const totalValue = portfolioData.reduce((s, d) => s + d.value, 0);
  const avgScore = Math.round(portfolioData.reduce((s, d) => s + d.aiScore * d.value, 0) / totalValue);
  const totalChange = portfolioData.reduce((s, d) => s + (d.change24h / 100) * d.value, 0);

  const pieData = portfolioData.map(d => ({ name: d.ticker, value: d.value }));

  const addHolding = () => {
    const found = companies.find(c => c.ticker.toLowerCase() === addTicker.toLowerCase());
    if (found && !holdings.find(h => h.companyId === found.id)) {
      setHoldings([...holdings, { companyId: found.id, shares: 10 }]);
      setAddTicker("");
    }
  };

  const removeHolding = (id: string) => setHoldings(holdings.filter(h => h.companyId !== id));
  const updateShares = (id: string, shares: number) =>
    setHoldings(holdings.map(h => h.companyId === id ? { ...h, shares: Math.max(1, shares) } : h));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Portfolio Builder</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-optimized portfolio management with real-time scoring</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-5 flex items-center gap-4">
          <DollarSign className="text-primary" size={24} />
          <div>
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="font-mono text-2xl font-bold text-foreground">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <p className={`text-xs font-mono font-medium ${getChangeColor(totalChange)}`}>
              {totalChange >= 0 ? "+" : ""}${totalChange.toFixed(0)} today
            </p>
          </div>
        </div>
        <div className="glass p-5 flex items-center justify-center">
          <ScoreGauge score={avgScore || 0} label="Portfolio Score" size="lg" />
        </div>
        <div className="glass p-5">
          <p className="text-xs text-muted-foreground mb-2">Allocation</p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <RPieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(220,18%,10%)", border: "1px solid hsl(220,16%,20%)", borderRadius: 8, fontSize: 12 }} />
              </RPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Add */}
      <div className="glass p-4 flex gap-2">
        <input
          value={addTicker}
          onChange={e => setAddTicker(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addHolding()}
          placeholder="Add ticker (e.g. NVDA)..."
          className="flex-1 bg-secondary text-foreground text-sm rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
        />
        <button onClick={addHolding} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1">
          <Plus size={14} /> Add
        </button>
      </div>

      {/* Holdings */}
      <div className="space-y-2">
        {portfolioData.map(d => (
          <div key={d.id} className="glass p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-primary">{d.ticker}</span>
                <span className="text-xs text-muted-foreground">{d.name}</span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <span className="font-mono">${d.price}</span>
                <span className={`font-mono ${getChangeColor(d.change24h)}`}>{d.change24h >= 0 ? "+" : ""}{d.change24h}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={d.shares}
                onChange={e => updateShares(d.id, parseInt(e.target.value) || 1)}
                className="w-16 bg-secondary text-foreground text-xs rounded-md px-2 py-1 border border-border text-center font-mono"
              />
              <span className="text-xs text-muted-foreground">shares</span>
            </div>
            <div className="text-right min-w-[80px]">
              <p className="font-mono font-bold text-sm text-foreground">${d.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="text-xs text-muted-foreground">{((d.value / totalValue) * 100).toFixed(1)}%</p>
            </div>
            <ScoreGauge score={d.aiScore} label="" size="sm" />
            <button onClick={() => removeHolding(d.id)} className="text-muted-foreground hover:text-destructive transition-colors">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {holdings.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <PieChart size={40} className="mx-auto mb-3 opacity-30" />
          <p>Add tickers to build your portfolio</p>
        </div>
      )}
    </div>
  );
}
