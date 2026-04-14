import { getScoreColor } from "@/data/companies";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}

export default function ScoreGauge({ score, label, size = "md" }: ScoreGaugeProps) {
  const dims = { sm: 48, md: 64, lg: 88 };
  const strokes = { sm: 4, md: 5, lg: 6 };
  const fonts = { sm: "text-xs", md: "text-sm", lg: "text-xl" };
  const labelFonts = { sm: "text-[9px]", md: "text-[10px]", lg: "text-xs" };

  const s = dims[size];
  const stroke = strokes[size];
  const r = (s - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: s, height: s }}>
        <svg width={s} height={s} className="-rotate-90">
          <circle cx={s/2} cy={s/2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
          <circle
            cx={s/2} cy={s/2} r={r} fill="none"
            stroke="currentColor"
            className={getScoreColor(score)}
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center font-mono font-bold ${fonts[size]} ${getScoreColor(score)}`}>
          {score}
        </span>
      </div>
      <span className={`${labelFonts[size]} text-muted-foreground font-medium uppercase tracking-wider`}>{label}</span>
    </div>
  );
}
