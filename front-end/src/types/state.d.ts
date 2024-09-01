import { CommentType, RecipeType } from "./data";

export interface FiltersType
  extends Partial<Pick<RecipeType, "cuisineId" | "dietId" | "difficultyId">> {
  q?: string;
  [key: string]: typeof FiltersType | PageType | PageSizeType | SortEndpoints;
}

export type PageType = number;

export type PageSizeType = number;

export type SortEndpoints = "id" | "-id" | "name" | "-name" | "";

export type OrderEndpoints = "asc" | "desc" | "";

export interface SortType {
  name: string;
  value: (SortEndpoints | OrderEndpoints | "")[];
}

export interface RecipeFormDataType extends RecipeType {
  id?: string;
  ingredients: string; //converted to array on the back-end
  image: FileList;
  // [key: string]: typeof RecipeFormDataType;
}

export interface CommentFormDataType extends Partial<CommentType> {
  rating: number;
  comment?: string;
}
