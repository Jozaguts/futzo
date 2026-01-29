// types/index.ts
export {};

declare global {
  interface Window {
    FB: any;
    statusChangeCallback: (any: any) => any;
    google: {
      maps: any;
    };
  }
}
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
// vue3-easy-data-table.d.ts

declare module 'vue3-easy-data-table' {
  import { DefineComponent } from 'vue';

  // Add a default export for the component
  const EasyDataTable: DefineComponent;
  export default EasyDataTable;

  // Retain original exports
  export type SortType = 'asc' | 'desc';
  export type FilterComparison = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'in';
  export type Item = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  export type FilterOption =
    | {
        field: string;
        comparison: 'between';
        criteria: [number, number];
      }
    | {
        field: string;
        comparison: '=' | '!=';
        criteria: number | string;
      }
    | {
        field: string;
        comparison: '>' | '>=' | '<' | '<=';
        criteria: number;
      }
    | {
        field: number | string;
        comparison: 'in';
        criteria: number[] | string[];
      }
    | {
        field: string;
        comparison: (value: any, criteria: string) => boolean; // eslint-disable-line @typescript-eslint/no-explicit-any
        criteria: string;
      };
  export type Header = {
    text: string;
    value: string;
    sortable?: boolean;
    fixed?: boolean;
    width?: number;
  };
  export type ServerOptions = {
    page: number;
    rowsPerPage: number;
    sortBy?: string | string[];
    sortType?: SortType | SortType[];
  };
  export type ClickRowArgument = Item & {
    isSelected?: boolean;
    indexInCurrentPage?: number;
  };
  export type UpdateSortArgument = {
    sortType: SortType | null;
    sortBy: string;
  };
  export type HeaderItemClassNameFunction = (header: Header, columnNumber: number) => string;
  export type BodyRowClassNameFunction = (item: Item, rowNumber: number) => string;
  export type BodyItemClassNameFunction = (column: string, rowNumber: number) => string;
  export type TextDirection = 'center' | 'left' | 'right';
}
