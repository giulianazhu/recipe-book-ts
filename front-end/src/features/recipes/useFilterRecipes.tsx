import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilterRecipes } from "../../services/apiRecipes";
import { pageSizeOptions } from "../../utils/constants";
import { calcPageItems, filterByProperties } from "../../utils/utils";

export default function useFilterRecipes(
  filters = "all",
  page = 1,
  pageSize = pageSizeOptions[0]
) {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recipes", filters, page, pageSize],
    queryFn: () => getFilterRecipes(filters, page, pageSize),
    placeholderData: () => {
      // console.log("Using placeholder data...");

      const recipes = queryClient.getQueryData(["recipes"]) ?? [];
      const maxItemsPerPage = calcPageItems(page, pageSize);

      let data;

      if (!filters || filters === "all") {
        data = recipes.slice(0, maxItemsPerPage);
      } else {
        data = filterByProperties(recipes, filters).slice(0, maxItemsPerPage);
      }

      const totCount = data.length;
      const totPages = data.length / pageSize;

      return { data, totCount, totPages };
    },
  });

  queryClient.prefetchQuery({
    queryKey: ["recipes", filters, page + 1, pageSize],
    queryFn: () => getFilterRecipes(filters, page + 1, pageSize),
  });

  return { data, isPending, isError, error };
}
