export interface Company {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  marketCap: number; // billions
  price: number;
  change24h: number;
  aiScore: number; // 0-100
  growthScore: number;
  healthScore: number;
  sentimentScore: number;
  riskScore: number; // lower = less risky
  innovationScore: number;
  description: string;
  country: string;
  revenue: number; // billions
  ebitda: number;
  peRatio: number;
  priceHistory: number[];
  tags: string[];
  signal?: 'undervalued' | 'breakout' | 'momentum' | 'emerging';
}

export const companies: Company[] = [
  {
    id: "1", name: "NVIDIA Corporation", ticker: "NVDA", sector: "Technology",
    marketCap: 3200, price: 142.5, change24h: 3.2, aiScore: 96,
    growthScore: 98, healthScore: 92, sentimentScore: 94, riskScore: 35, innovationScore: 99,
    description: "Leading GPU and AI chip manufacturer powering the global AI revolution.",
    country: "US", revenue: 130, ebitda: 78, peRatio: 55,
    priceHistory: [95, 98, 102, 108, 115, 120, 118, 125, 130, 128, 135, 142],
    tags: ["AI", "Semiconductors", "Data Center", "Gaming"], signal: "momentum"
  },
  {
    id: "2", name: "Palantir Technologies", ticker: "PLTR", sector: "Technology",
    marketCap: 245, price: 105.8, change24h: 5.1, aiScore: 91,
    growthScore: 93, healthScore: 82, sentimentScore: 88, riskScore: 45, innovationScore: 95,
    description: "Enterprise AI & data analytics platform used by governments and Fortune 500.",
    country: "US", revenue: 3.5, ebitda: 0.9, peRatio: 180,
    priceHistory: [42, 45, 50, 55, 60, 68, 72, 78, 85, 92, 98, 105],
    tags: ["AI", "Defense", "Big Data", "Government"], signal: "breakout"
  },
  {
    id: "3", name: "Taiwan Semiconductor", ticker: "TSM", sector: "Technology",
    marketCap: 850, price: 185.2, change24h: 1.8, aiScore: 93,
    growthScore: 88, healthScore: 95, sentimentScore: 85, riskScore: 30, innovationScore: 92,
    description: "World's largest semiconductor foundry manufacturing chips for Apple, NVIDIA, AMD.",
    country: "Taiwan", revenue: 85, ebitda: 42, peRatio: 28,
    priceHistory: [120, 125, 130, 135, 140, 148, 152, 158, 165, 172, 178, 185],
    tags: ["Semiconductors", "Manufacturing", "AI Infrastructure"], signal: "undervalued"
  },
  {
    id: "4", name: "CrowdStrike Holdings", ticker: "CRWD", sector: "Cybersecurity",
    marketCap: 95, price: 395.6, change24h: -1.2, aiScore: 87,
    growthScore: 85, healthScore: 78, sentimentScore: 72, riskScore: 42, innovationScore: 88,
    description: "Cloud-native endpoint security platform protecting enterprises from cyber threats.",
    country: "US", revenue: 3.8, ebitda: 0.6, peRatio: 450,
    priceHistory: [280, 290, 300, 310, 320, 340, 350, 360, 370, 380, 390, 395],
    tags: ["Cybersecurity", "Cloud", "AI Security", "SaaS"]
  },
  {
    id: "5", name: "Novo Nordisk", ticker: "NVO", sector: "Healthcare",
    marketCap: 420, price: 118.3, change24h: 2.4, aiScore: 89,
    growthScore: 90, healthScore: 94, sentimentScore: 82, riskScore: 25, innovationScore: 86,
    description: "Global pharma leader in diabetes & obesity treatments (Ozempic, Wegovy).",
    country: "Denmark", revenue: 38, ebitda: 18, peRatio: 42,
    priceHistory: [85, 88, 92, 95, 98, 102, 105, 108, 110, 112, 115, 118],
    tags: ["Pharma", "GLP-1", "Obesity", "Biotech"], signal: "momentum"
  },
  {
    id: "6", name: "Symbotic Inc", ticker: "SYM", sector: "Robotics",
    marketCap: 18, price: 32.4, change24h: 8.5, aiScore: 82,
    growthScore: 92, healthScore: 65, sentimentScore: 78, riskScore: 65, innovationScore: 94,
    description: "AI-powered robotics and automation for warehouse and supply chain operations.",
    country: "US", revenue: 1.8, ebitda: -0.2, peRatio: -1,
    priceHistory: [15, 16, 18, 20, 22, 24, 25, 27, 28, 29, 31, 32],
    tags: ["Robotics", "AI", "Logistics", "Automation"], signal: "emerging"
  },
  {
    id: "7", name: "Celsius Holdings", ticker: "CELH", sector: "Consumer",
    marketCap: 12, price: 52.8, change24h: -2.1, aiScore: 74,
    growthScore: 80, healthScore: 70, sentimentScore: 68, riskScore: 55, innovationScore: 72,
    description: "High-growth functional energy drink brand disrupting the beverage industry.",
    country: "US", revenue: 1.5, ebitda: 0.3, peRatio: 85,
    priceHistory: [65, 62, 58, 55, 52, 50, 48, 50, 52, 51, 53, 52],
    tags: ["Consumer", "Beverages", "Health", "Growth"]
  },
  {
    id: "8", name: "Arm Holdings", ticker: "ARM", sector: "Technology",
    marketCap: 165, price: 158.9, change24h: 4.3, aiScore: 90,
    growthScore: 87, healthScore: 85, sentimentScore: 90, riskScore: 38, innovationScore: 96,
    description: "Designs CPU architectures powering virtually every smartphone and expanding into AI.",
    country: "UK", revenue: 3.2, ebitda: 1.2, peRatio: 200,
    priceHistory: [100, 105, 110, 115, 120, 128, 132, 138, 142, 148, 152, 158],
    tags: ["Semiconductors", "AI", "Mobile", "IoT"], signal: "breakout"
  },
  {
    id: "9", name: "MercadoLibre", ticker: "MELI", sector: "E-Commerce",
    marketCap: 105, price: 2080, change24h: 1.5, aiScore: 86,
    growthScore: 88, healthScore: 82, sentimentScore: 76, riskScore: 40, innovationScore: 84,
    description: "Latin America's largest e-commerce and fintech platform.",
    country: "Argentina", revenue: 18, ebitda: 3.2, peRatio: 65,
    priceHistory: [1500, 1550, 1600, 1650, 1700, 1780, 1820, 1880, 1920, 1980, 2020, 2080],
    tags: ["E-Commerce", "Fintech", "LATAM", "Payments"], signal: "undervalued"
  },
  {
    id: "10", name: "Archer Aviation", ticker: "ACHR", sector: "Aerospace",
    marketCap: 4.2, price: 9.8, change24h: 12.3, aiScore: 72,
    growthScore: 95, healthScore: 45, sentimentScore: 82, riskScore: 80, innovationScore: 98,
    description: "Developing electric vertical takeoff and landing (eVTOL) aircraft for urban mobility.",
    country: "US", revenue: 0.01, ebitda: -0.4, peRatio: -1,
    priceHistory: [4.5, 5, 5.5, 6, 6.2, 6.8, 7.2, 7.8, 8.2, 8.8, 9.2, 9.8],
    tags: ["eVTOL", "Aviation", "Urban Mobility", "EV"], signal: "emerging"
  },
  {
    id: "11", name: "Sea Limited", ticker: "SE", sector: "Technology",
    marketCap: 62, price: 130.5, change24h: 3.8, aiScore: 81,
    growthScore: 84, healthScore: 75, sentimentScore: 74, riskScore: 48, innovationScore: 80,
    description: "Southeast Asian tech giant spanning gaming, e-commerce, and digital finance.",
    country: "Singapore", revenue: 14, ebitda: 1.8, peRatio: 72,
    priceHistory: [80, 85, 88, 92, 95, 100, 105, 110, 115, 120, 125, 130],
    tags: ["Gaming", "E-Commerce", "Fintech", "SE Asia"]
  },
  {
    id: "12", name: "Vertiv Holdings", ticker: "VRT", sector: "Infrastructure",
    marketCap: 52, price: 138.2, change24h: 2.9, aiScore: 85,
    growthScore: 86, healthScore: 80, sentimentScore: 79, riskScore: 35, innovationScore: 82,
    description: "Critical digital infrastructure and cooling solutions for data centers.",
    country: "US", revenue: 7.5, ebitda: 1.5, peRatio: 58,
    priceHistory: [70, 75, 80, 85, 90, 98, 105, 112, 118, 125, 132, 138],
    tags: ["Data Center", "Infrastructure", "Cooling", "AI"], signal: "momentum"
  },
];

export const sectors = [...new Set(companies.map(c => c.sector))];
export const countries = [...new Set(companies.map(c => c.country))];
export const signals = ['undervalued', 'breakout', 'momentum', 'emerging'] as const;

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-neon-green';
  if (score >= 70) return 'text-neon-blue';
  if (score >= 50) return 'text-neon-amber';
  return 'text-neon-red';
}

export function getChangeColor(change: number): string {
  return change >= 0 ? 'text-chart-up' : 'text-chart-down';
}

export function formatMarketCap(cap: number): string {
  if (cap >= 1000) return `$${(cap / 1000).toFixed(1)}T`;
  if (cap >= 1) return `$${cap.toFixed(1)}B`;
  return `$${(cap * 1000).toFixed(0)}M`;
}

export function getSignalLabel(signal: string): string {
  const map: Record<string, string> = {
    undervalued: '💎 Undervalued',
    breakout: '🚀 Breakout',
    momentum: '📈 Momentum',
    emerging: '🌱 Emerging',
  };
  return map[signal] || signal;
}
