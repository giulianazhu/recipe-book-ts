import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecipeCommentsInf } from "../../services/apiComments";

export default function useRecipeCommentsInf(recipeId: string, pageSize = 3) {
  const {
    data,
    isPending,
    isSuccess,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", recipeId, pageSize],
    queryFn: ({ pageParam }) =>
      getRecipeCommentsInf(recipeId, pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.hasMore) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  return {
    data,
    isPending,
    isSuccess,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
