import { useQueryClient } from "@tanstack/react-query";
import { prefetchRecipes } from "../../services/apiRecipes";

export default function usePrefetchRecipes() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["recipes"],
    queryFn: prefetchRecipes,
  });
}
