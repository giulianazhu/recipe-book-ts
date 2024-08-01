export interface RecipeType {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  cuisineId: string;
  dietId: string;
  difficultyId: string;
  image: string;
}

export interface ExpandedRecipeType extends RecipeType {
  cuisine: CategoryType;
  diet: CategoryType;
  difficulty: CategoryType;
  comments: CommentType[];
}

export interface CategoryType {
  id: string;
  name: string;
}

export interface CommentType {
  id: string;
  recipeId: string;
  comment: string;
  rating: number;
  date: string;
}
