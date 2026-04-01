export interface Provider {
  id: string;
  name: string;
}

export const PROVIDERS: Provider[] = [
  { id: "gusto", name: "Gusto" },
  { id: "bamboo_hr", name: "BambooHR" },
  { id: "justworks", name: "Justworks" },
  { id: "paychex_flex", name: "Paychex Flex" },
  { id: "adp_workforce_now", name: "ADP Workforce Now" },
  { id: "rippling", name: "Rippling" },
];

export const SANDBOX_PRODUCTS = [
  "company",
  "directory",
  "individual",
  "employment",
] as const;
