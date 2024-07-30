import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecipeCommentsInf } from "../../services/apiComments";

export interface useRecipeCommentsProps {}

export default function useRecipeCommentsInf(recipeId, page = 1, pageSize = 3) {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", recipeId, pageSize],
    queryFn: ({ pageParam = page }) =>
      getRecipeCommentsInf(recipeId, pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasMore) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
