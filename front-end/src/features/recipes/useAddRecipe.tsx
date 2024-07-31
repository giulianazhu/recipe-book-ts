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
      console.err(err);
    },
  });
  return { mutate, isPending, isError, error };
}
