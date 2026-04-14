import { useState } from "react";
import { Brain, Loader2, AlertTriangle, TrendingUp, Target, Zap } from "lucide-react";
import { Company } from "@/data/companies";
import { supabase } from "@/integrations/supabase/client";

interface AIAnalysisPanelProps {
  company: Company;
}

export default function AIAnalysisPanel({ company }: AIAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("bull");

  const tabs = [
    { id: "bull", label: "Bull Case", icon: TrendingUp },
    { id: "risks", label: "Hidden Risks", icon: AlertTriangle },
    { id: "outlook", label: "Outlook", icon: Target },
    { id: "failure", label: "Failure Modes", icon: Zap },
  ];

  const prompts: Record<string, string> = {
    bull: `Analyze why ${company.name} (${company.ticker}) is a strong investment. AI Score: ${company.aiScore}/100. Growth: ${company.growthScore}, Health: ${company.healthScore}, Sentiment: ${company.sentimentScore}. Market cap: $${company.marketCap}B. Revenue: $${company.revenue}B. Sector: ${company.sector}. Be specific, data-driven, concise. 3-4 paragraphs max.`,
    risks: `What are the hidden risks most investors miss about ${company.name} (${company.ticker})? Risk score: ${company.riskScore}/100. Consider competitive, regulatory, macro, and execution risks. Be specific and analytical. 3-4 paragraphs.`,
    outlook: `Provide a short-term (6mo) and long-term (3yr) investment outlook for ${company.name} (${company.ticker}). Current price: $${company.price}. P/E: ${company.peRatio}. Growth score: ${company.growthScore}/100. Include price trajectory reasoning. 3-4 paragraphs.`,
    failure: `What would make ${company.name} (${company.ticker}) fail as an investment? Consider worst-case scenarios, disruption risks, and existential threats. Be brutally honest. 3-4 paragraphs.`,
  };

  const generateAnalysis = async (tab: string) => {
    setActiveTab(tab);
    setAnalysis(null);
    setLoading(true);

    try {
      const response = await supabase.functions.invoke("ai-analysis", {
        body: { prompt: prompts[tab], company: company.name },
      });

      if (response.error) throw response.error;
      setAnalysis(response.data?.analysis || "Analysis unavailable.");
    } catch (e) {
      console.error(e);
      setAnalysis("Unable to generate analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-primary" size={20} />
        <h3 className="font-bold text-foreground">AI Investment Analyst</h3>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono">GPT</span>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => generateAnalysis(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === id && analysis
                ? "bg-primary/15 text-primary neon-glow-green"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-[120px]">
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground py-8 justify-center">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm font-mono">Generating analysis...</span>
          </div>
        ) : analysis ? (
          <div className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-wrap">
            {analysis}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground py-8 text-center">
            Click a tab above to generate AI analysis for <span className="text-primary font-mono">{company.ticker}</span>
          </div>
        )}
      </div>
    </div>
  );
}
