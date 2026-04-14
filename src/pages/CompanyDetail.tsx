import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Globe } from "lucide-react";
import { companies, getScoreColor, getChangeColor, formatMarketCap } from "@/data/companies";
import ScoreGauge from "@/components/ScoreGauge";
import AIAnalysisPanel from "@/components/AIAnalysisPanel";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function CompanyDetail() {
  const { id } = useParams();
  const company = companies.find(c => c.id === id);

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground">Company not found</p>
        <Link to="/" className="text-primary text-sm hover:underline">← Back to Dashboard</Link>
      </div>
    );
  }

  const chartData = company.priceHistory.map((price, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    price,
  }));

  const color = company.change24h >= 0 ? "hsl(160, 100%, 45%)" : "hsl(0, 72%, 55%)";

  const metrics = [
    { label: "Growth", score: company.growthScore },
    { label: "Health", score: company.healthScore },
    { label: "Sentiment", score: company.sentimentScore },
    { label: "Innovation", score: company.innovationScore },
    { label: "Risk", score: 100 - company.riskScore },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="glass p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-xl text-primary">{company.ticker}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{company.sector}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Globe size={12} />{company.country}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mt-1">{company.name}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg">{company.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-mono text-3xl font-bold text-foreground">${company.price.toLocaleString()}</span>
            <p className={`font-mono text-sm font-medium ${getChangeColor(company.change24h)}`}>
              {company.change24h >= 0 ? "+" : ""}{company.change24h}%
            </p>
          </div>
          <ScoreGauge score={company.aiScore} label="AI Score" size="lg" />
        </div>
      </div>

      {/* Score breakdown */}
      <div className="glass p-5">
        <h3 className="font-bold text-foreground mb-4">Score Breakdown</h3>
        <div className="flex flex-wrap justify-around gap-4">
          {metrics.map(m => <ScoreGauge key={m.label} score={m.score} label={m.label} size="md" />)}
        </div>
      </div>

      {/* Financial metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Market Cap", v: formatMarketCap(company.marketCap) },
          { l: "Revenue", v: `$${company.revenue}B` },
          { l: "EBITDA", v: company.ebitda > 0 ? `$${company.ebitda}B` : "N/A" },
          { l: "P/E Ratio", v: company.peRatio > 0 ? company.peRatio.toString() : "N/A" },
        ].map(m => (
          <div key={m.l} className="glass p-3">
            <p className="text-xs text-muted-foreground">{m.l}</p>
            <p className="font-mono font-bold text-foreground">{m.v}</p>
          </div>
        ))}
      </div>

      {/* Price chart */}
      <div className="glass p-5">
        <h3 className="font-bold text-foreground mb-4">12-Month Price History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 16%, 20%)", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "hsl(210, 20%, 85%)" }}
              />
              <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#priceGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {company.tags.map(t => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{t}</span>
        ))}
      </div>

      {/* AI Analysis */}
      <AIAnalysisPanel company={company} />
    </div>
  );
}
