
// defining the project types that will be used in the projects page and the project cards
export type ProjectType = {
    id : string;
    title : string;
    subtitle : string;
    description : string;
    bullets : string[];
    stack : string[];
    live : string | null;
    github : string;
    accent : string;
    accentDim : string;
    type : "web" | "data";
    tag: string;
};

// data for the projects page and the project cards
export const projects : ProjectType[] = [
  {
    id: "nomad-rider",
    title: "Nomad Rider",
    subtitle: "Travel-tech platform for digital nomads",
    description:
      "A destination discovery dashboard that helps remote workers find work-friendly spots in India and Nepal — filtered by Wi-Fi quality. Built solo from zero to deployed.",
    bullets: [
      "User auth with Clerk — personalized saved spots per account",
      "Full CRUD: create, browse, search, and delete listings",
      "Real-time search filtering across all destinations",
      "PostgreSQL database managed with Prisma ORM",
      "Deployed and live on Vercel with CI/CD from GitHub",
    ],
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Clerk", "Tailwind CSS", "shadcn/ui", "Vercel"],
    live: "https://nomad-rider.vercel.app",
    github: "https://github.com/NiroulaSunam/nomad-rider",
    accent: "#22d3ee",    // color for the project card
    accentDim: "rgba(34,211,238,0.08)",  // color for the project card when hovered
    type: "web",
    tag: "LIVE & DEPLOYED",
  },
  {
    id: "finance-tracker",
    title: "AI Finance Tracker",
    subtitle: "Natural language personal finance — in development",
    description:
      "An AI-powered finance tracker where you describe your expenses in plain English and the app categorizes, logs, and visualizes your spending automatically. No manual entry.",
    bullets: [
      "OpenAI API integration for natural language expense input",
      "Automatic categorization and tagging of transactions",
      "Spending insights dashboard with trends over time",
      "User accounts with personal finance data isolation",
    ],
    stack: ["Next.js 14", "TypeScript", "OpenAI API", "Prisma", "PostgreSQL", "Tailwind CSS"],
    live: null,
    github: "https://github.com/NiroulaSunam",
    accent: "#a78bfa",
    accentDim: "rgba(167,139,250,0.08)",
    type: "web",
    tag: "IN DEVELOPMENT",
  },
  {
    id: "ibm-hr",
    title: "IBM HR Attrition Analysis",
    subtitle: "Employee turnover analysis & retention strategy",
    description:
      "Identified critical flight-risk employee segments responsible for over 39% of total turnover using Python for data wrangling and an interactive Tableau dashboard for executive reporting.",
    bullets: [
      "Segmented 1,400+ employee records to isolate high-risk cohorts",
      "Built Tableau dashboard breaking down turnover by role and age group",
      "Proposed data-backed retention strategy targeting 18–25 age group",
      "Recommended Job Architecture Review to reduce recruitment costs",
    ],
    stack: ["Python", "Pandas", "Tableau", "EDA", "Data Visualization"],
    live: null,
    github: "https://github.com/NiroulaSunam/IBM-HR-KPI-Dashboard",
    accent: "#fb923c",
    accentDim: "rgba(251,146,60,0.08)",
    type: "data",
    tag: "DATA ANALYSIS",
  },
  {
    id: "walmart",
    title: "Walmart Sales Analysis",
    subtitle: "SQL pipeline for 45-store transactional dataset",
    description:
      "Analyzed large transactional datasets across 45 Walmart stores to identify patterns tied to holidays, store locations, and economic factors using advanced SQL engineering.",
    bullets: [
      "Built complex SQL pipelines with CTEs, window functions, and aggregations",
      "Identified peak demand weeks and primary drivers of sales fluctuations",
      "Delivered insights for optimizing staffing and inventory management",
      "Cleaned and structured raw data for reliable cross-store reporting",
    ],
    stack: ["SQL", "MySQL", "CTEs", "Window Functions", "Data Engineering"],
    live: null,
    github: "https://github.com/NiroulaSunam/walmart-analysis-sql",
    accent: "#34d399",
    accentDim: "rgba(52,211,153,0.08)",
    type: "data",
    tag: "SQL",
  },
  {
    id: "videogames",
    title: "Global Video Game Sales",
    subtitle: "Multi-dashboard Tableau analysis of worldwide sales",
    description:
      "Cleaned and standardized a large global sales dataset to build three interactive Tableau dashboards revealing platform dominance, genre trends, and publisher specialization across regions.",
    bullets: [
      "Standardized cross-platform dataset for accurate regional comparison",
      "Built 3 dashboards: platform dominance, genre popularity, publisher focus",
      "Revealed North American preferences differ significantly from global trends",
      "Highlighted localized marketing opportunities for publishers",
    ],
    stack: ["Tableau", "Data Cleaning", "Data Visualization", "EDA"],
    live: null,
    github: "https://github.com/NiroulaSunam/global-video-games-sales-analysis",
    accent: "#f472b6",
    accentDim: "rgba(244,114,182,0.08)",
    type: "data",
    tag: "TABLEAU",
  },
];
