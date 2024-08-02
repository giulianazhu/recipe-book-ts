import { CategoryType } from "./data";

export interface ApiPaginatedResults<DataType> {
  data: DataType[];
  totCount: number;
  totPages: number;
}

export interface ApiInfiniteResults<DataType> {
  data: DataType[] | undefined;
  hasMore: boolean;
  totCount: number;
}

export type ApiCategoriesResults = CategoryType[];
