import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipe } from "../../services/apiRecipes";

export default function useRecipe(recipeId) {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recipes", recipeId],
    queryFn: () => getRecipe(recipeId),
    placeholderData: () => {
      return queryClient
        .getQueryData(["recipes"])
        ?.find((recipe) => recipe.id === recipeId);
    },
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}
