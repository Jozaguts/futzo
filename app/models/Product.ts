export type ProductPrices = {
  kickoff: FutzoPlan;
  pro_play: FutzoPlan;
  elite_league: FutzoPlan;
};

export type FutzoPlan = {
  sku: string;
  name: string;
  currency: Currency;
  price: string;
  promo_price: string;
  annually_price: string;
  url: string;
  discount: string;
  cta: string;
  prices: Prices;
  annual_saving: string;
};

export type Currency = {
  id: number;
  name: string;
  symbol: string;
  iso_code: string;
  payment_gateway: string;
  is_default: boolean;
  properties: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
};

export type Prices = {
  year: Month;
  month: Month;
};

export type Month = {
  yearly_price: string;
  price: string;
  symbol: string;
  iso_code: string;
  promo: string;
};
export type PlanCard = {
  title?: string;
  img_path?: string;
  symbol?: string;
  price?: string;
  iso_code?: string;
  annually_price?: string;
  promo_price?: string;
  discount?: string;
  cta?: string;
  url?: string;
  annual_saving?: string;
  features?: string[];
};
