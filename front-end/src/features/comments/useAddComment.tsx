import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../services/apiComments";

export default function useAddComment(recipeId) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => addComment(recipeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", recipeId] });
      queryClient.invalidateQueries({ queryKey: ["comments", recipeId] });
      console.log("Success");
    },
    onError: (err) => {
      console.err("Error", err.message);
    },
  });
  return { mutate, isPending, isError, error };
}
