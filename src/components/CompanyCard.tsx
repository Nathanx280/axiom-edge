import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Company, getScoreColor, getChangeColor, formatMarketCap, getSignalLabel } from "@/data/companies";
import ScoreGauge from "./ScoreGauge";
import MiniChart from "./MiniChart";

export default function CompanyCard({ company }: { company: Company }) {
  const { id, name, ticker, sector, price, change24h, aiScore, marketCap, signal, priceHistory } = company;

  return (
    <Link
      to={`/company/${id}`}
      className="glass p-4 hover:neon-glow-green transition-all duration-300 group animate-slide-up block"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-primary">{ticker}</span>
            {signal && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {getSignalLabel(signal)}
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-foreground truncate mt-0.5 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground">{sector} · {formatMarketCap(marketCap)}</p>
        </div>
        <ScoreGauge score={aiScore} label="AI Score" size="sm" />
      </div>

      <div className="flex items-end justify-between mt-3">
        <div>
          <span className="font-mono text-lg font-bold text-foreground">${price.toLocaleString()}</span>
          <div className={`flex items-center gap-1 text-xs font-medium ${getChangeColor(change24h)}`}>
            {change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change24h >= 0 ? "+" : ""}{change24h}%
          </div>
        </div>
        <div className="w-24 h-10">
          <MiniChart data={priceHistory} positive={change24h >= 0} />
        </div>
      </div>
    </Link>
  );
}
