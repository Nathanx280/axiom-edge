import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  color?: string;
}

export default function StatCard({ icon: Icon, label, value, sub, color = "text-primary" }: StatCardProps) {
  return (
    <div className="glass p-4 flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-primary/10 ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono font-bold text-lg text-foreground">{value}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}
