export type Location = {
  id?: number;
  name: string;
  city: string;
  address: string;
  autocomplete_prediction: object;
};

export type LocationStoreRequest = {
  tags: string[];
} & Location;
