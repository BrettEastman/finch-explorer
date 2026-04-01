export interface Provider {
  id: string;
  name: string;
}

export const PROVIDERS: Provider[] = [
  { id: "gusto", name: "Gusto" },
  { id: "bamboo_hr", name: "BambooHR" },
  { id: "justworks", name: "Justworks" },
  { id: "paychex_flex", name: "Paychex Flex" },
  { id: "paycom", name: "Paycom" },
  { id: "paylocity", name: "Paylocity" },
  { id: "adp_workforce_now", name: "ADP Workforce Now" },
  { id: "rippling", name: "Rippling" },
  { id: "zenefits", name: "Zenefits" },
  { id: "trinet", name: "TriNet" },
  { id: "square_payroll", name: "Square Payroll" },
  { id: "insperity", name: "Insperity" },
];

export const SANDBOX_PRODUCTS = [
  "company",
  "directory",
  "individual",
  "employment",
] as const;
