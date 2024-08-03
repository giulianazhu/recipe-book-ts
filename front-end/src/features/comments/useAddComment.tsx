import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../services/apiComments";
import { CommentFormDataType } from "../../types/state";
import toast from "react-hot-toast";

export default function useAddComment(recipeId: string) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: CommentFormDataType) => addComment(recipeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", recipeId] });
      queryClient.invalidateQueries({ queryKey: ["comments", recipeId] });
      toast.success("Review successfully submitted!");
    },
    onError: (err) => {
      console.error("Error", err.message);
      toast.error("Failed to submit Review...");
    },
  });
  return { mutate, isPending, isError, error };
}
