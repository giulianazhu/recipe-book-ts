import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilterRecipes } from "../../services/apiRecipes";
import { pageSizeOptions } from "../../utils/constants";
import {
  calcPageItems,
  filterByProperties,
  isEmptyObj,
} from "../../utils/utils";
import { FiltersType } from "../../types/state";
import { ApiPaginatedResults } from "../../types/apidata";
import { ExpandedRecipeType, RecipeType } from "../../types/data";

export default function useFilterRecipes(
  filters: FiltersType = {},
  page = 1,
  pageSize = pageSizeOptions[0]
) {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, isLoading } = useQuery({
    queryKey: ["recipes", filters, page, pageSize],
    queryFn: () => getFilterRecipes(filters, page, pageSize),
    placeholderData: () => {
      // console.log("Using placeholder data...");

      const recipes: RecipeType[] = queryClient.getQueryData(["recipes"]) ?? [];
      const maxItemsPerPage = calcPageItems(page, pageSize);

      let data;

      if (isEmptyObj(filters)) {
        data = recipes.slice(0, maxItemsPerPage);
      } else {
        data = filterByProperties(recipes, filters).slice(0, maxItemsPerPage);
      }

      const totCount = data.length;
      const totPages = data.length / pageSize;

      const results: ApiPaginatedResults<ExpandedRecipeType> = {
        data,
        totCount,
        totPages,
      };

      return results;
    },
  });

  queryClient.prefetchQuery({
    queryKey: ["recipes", filters, page + 1, pageSize],
    queryFn: () => getFilterRecipes(filters, page + 1, pageSize),
  });

  return { data, isPending, isError, error, isLoading };
}
