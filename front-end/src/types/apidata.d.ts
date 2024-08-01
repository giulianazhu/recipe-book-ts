import { CategoryType } from "./data";

export interface ApiPaginatedResults<DataType> {
  data: DataType[];
  totCount: number;
  totPages: number;
}

export interface ApiInfiniteResults<DataType> {
  data: DataType[];
  hasMore: boolean;
  totCount: number;
}

export type ApiFiltersResults = CategoryType[];
