import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../services/apiComments";
import { CommentFormDataType } from "../../types/state";

export default function useAddComment(recipeId: string) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: CommentFormDataType) => addComment(recipeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", recipeId] });
      queryClient.invalidateQueries({ queryKey: ["comments", recipeId] });
      console.log("Success");
    },
    onError: (err) => {
      console.error("Error", err.message);
    },
  });
  return { mutate, isPending, isError, error };
}
