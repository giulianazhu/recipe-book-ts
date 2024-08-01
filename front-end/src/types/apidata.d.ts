import { CategoryType } from "./data";

export interface ApiPaginatedResults<DataType> {
  data: DataType;
  totCount: number;
  totPages: number;
}

export type ApiFiltersResults = CategoryType[];
