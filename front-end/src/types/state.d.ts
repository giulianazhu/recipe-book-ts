import { CommentType, RecipeType } from "./data";

export interface FiltersObjType
  extends Pick<RecipeType, "cuisineId" | dietId | "difficultyId"> {
  q?: string;
}

export type FiltersType = FiltersObjType | "all";

export type PageType = number;

export type PageSizeType = number;

export interface RecipeFormDataType extends RecipeType {
  id?: string;
  ingredients: string; //converted to array on the back-end
  image: File;
}

export interface CommentFormDataType extends Partial<CommentType> {
  rating: number;
  comment: string;
}
