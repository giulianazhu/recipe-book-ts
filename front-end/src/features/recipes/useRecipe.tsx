import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipe } from "../../services/apiRecipes";
import { ExpandedRecipeType } from "../../types/data";

export default function useRecipe(recipeId: string) {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recipes", recipeId],
    queryFn: () => getRecipe(recipeId),
    placeholderData: () => {
      const recipes: ExpandedRecipeType[] | undefined =
        queryClient.getQueryData(["recipes"]);
      return recipes?.find(
        (recipe: ExpandedRecipeType) => recipe.id === recipeId
      );
    },
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}
