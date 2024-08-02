import { CommentType, RecipeType } from "./data";

export interface FiltersType
  extends Partial<Pick<RecipeType, "cuisineId" | "dietId" | "difficultyId">> {
  q?: string;
  [key: string]: typeof FiltersType;
}

export type PageType = number;

export type PageSizeType = number;

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
