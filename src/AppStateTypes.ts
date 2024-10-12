export type MovieCompany = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  reviews: number[];
  title: string;
  filmCompanyId: number;
  cost: number;
  releaseYear: number;
};

export type TableData = {
  id: number;
  title: string;
  review: number;
  movieCompany: string;
};
