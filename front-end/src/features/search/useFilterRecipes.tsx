import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilterRecipes } from "../../services/apiRecipes";
import { pageSizeOptions } from "../../utils/constants";
import {
  calcPageItems,
  filterByProperties,
  isEmptyObj,
} from "../../utils/utils";
import { FiltersType, OrderEndpoints, SortEndpoints } from "../../types/state";
import { ApiPaginatedResults } from "../../types/apidata";
import { ExpandedRecipeType } from "../../types/data";

export default function useFilterRecipes(
  filters: FiltersType = {},
  page = 1,
  pageSize = pageSizeOptions[0],
  sort: SortEndpoints = "",
  order: OrderEndpoints = ""
) {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, isLoading } = useQuery({
    queryKey: ["recipes", filters, page, pageSize, sort, order],
    queryFn: () => getFilterRecipes(filters, page, pageSize, sort, order),
    placeholderData: () => {
      // console.log("Using placeholder data...");

      const recipes: ExpandedRecipeType[] =
        queryClient.getQueryData(["recipes"]) ?? [];
      const maxItemsPerPage = calcPageItems(page, pageSize);

      let data;

      if (sort === "name") {
        if (order === "asc") {
          recipes.sort((a, b) => parseInt(a.name) - parseInt(b.name));
        } else {
          recipes.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        }
      }
      if (sort === "id") {
        if (order === "asc") {
          recipes.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        } else {
          recipes.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        }
      }

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
