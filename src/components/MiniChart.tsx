import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface MiniChartProps {
  data: number[];
  positive: boolean;
}

export default function MiniChart({ data, positive }: MiniChartProps) {
  const chartData = data.map((v, i) => ({ v, i }));
  const color = positive ? "hsl(160, 100%, 45%)" : "hsl(0, 72%, 55%)";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`g-${positive}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#g-${positive})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
