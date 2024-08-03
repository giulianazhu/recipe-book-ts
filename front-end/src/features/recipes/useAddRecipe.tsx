import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe } from "../../services/apiRecipes";
import toast from "react-hot-toast";

export default function useAddRecipe() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe successfully added!");
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Failed to add recipe...");
    },
  });
  return { mutate, isPending, isError, error };
}
