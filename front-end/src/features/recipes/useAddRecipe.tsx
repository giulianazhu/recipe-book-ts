import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe } from "../../services/apiRecipes";

export default function useAddRecipe() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (err) => {
      if (err instanceof Error) {
        console.error(err.message);
      }
    },
  });
  return { mutate, isPending, isError, error };
}
