import { RecipeType } from "./data";

export interface FiltersObjType
  extends Pick<RecipeType, "cuisineId" | dietId | "difficultyId"> {
  q?: string;
}

export type FiltersType = FiltersObjType | "all";

export type PageType = number;

export type PageSizeType = number;

export interface RecipeFormDataType extends RecipeType {
  ingredients: string; //converted to array on the back-end
  image: File;
}
