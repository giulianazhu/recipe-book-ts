import Pagination from "../../ui/Pagination";
import SearchResults from "./SearchResults";
import { useSearchParams } from "react-router-dom";
import useFilterRecipes from "./useFilterRecipes";
import Error from "../../ui/Error";
import { FiltersType } from "../../types/state";
import useFilterContext from "../../contexts/useFilterContext";

export default function Results() {
  const [searchParams] = useSearchParams();

  const { handlePage, handlePageSize, handleSort, filtersState } =
    useFilterContext();

  const { page, pageSize, sort, order } = filtersState;

  const filters: FiltersType = {};

  for (const [key, value] of searchParams.entries()) {
    if (value && value !== "null") {
      (filters as FiltersType)[key as keyof FiltersType] = value;
    } else continue;
  }

  const { data, isLoading, isError, error } = useFilterRecipes(
    filters,
    page,
    pageSize,
    sort,
    order
  );

  const recipes = data?.data;
  const totCount = data?.totCount ?? 0;
  const totPages = data?.totPages ?? 0;

  if (isError)
    return <Error>{error?.message ?? "Error: Try again later"}</Error>;

  // console.log(recipes);

  return (
    <Pagination
      totCount={totCount}
      totPages={totPages}
      onClickPage={handlePage}
      page={page}
      pageSize={pageSize}
      onClickPageSize={handlePageSize}
      onChangeSort={handleSort}
    >
      <SearchResults data={recipes} isPending={isLoading} />
    </Pagination>
  );
}
