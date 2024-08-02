import { useEffect, useRef, useState } from "react";
import Pagination from "../../ui/Pagination";
import SearchResults from "./SearchResults";
import { pageSizeOptions } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import useFilterRecipes from "./useFilterRecipes";
import Error from "../../ui/Error";
import { scrollTop } from "../../utils/utils";
import { FiltersType } from "../../types/state";

export default function Results() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const [searchParams] = useSearchParams();
  const prevQueries = useRef(searchParams.toString());

  function handlePage(page: number) {
    setPage(page);
    scrollTop();
  }

  function handlePageSize(size: number) {
    setPageSize(size);
    scrollTop();
  }

  useEffect(
    //to reset page back to 1 if query changed
    function () {
      const currQueries = searchParams.toString();
      if (prevQueries.current !== currQueries) {
        setPage(1);
        prevQueries.current = currQueries;
      }
    },
    [searchParams]
  );

  const filters: FiltersType = {};

  for (const [key, value] of searchParams.entries()) {
    if (value && value !== "null") {
      (filters as FiltersType)[key as keyof FiltersType] = value;
    } else continue;
  }

  const { data, isLoading, isError, error } = useFilterRecipes(
    filters,
    page,
    pageSize
  );

  const recipes = data?.data;
  const totCount = data?.totCount ?? 0;
  const totPages = data?.totPages ?? 0;

  if (isError)
    return <Error>{error?.message ?? "Error: Try again later"}</Error>;

  console.log(recipes);

  return (
    <Pagination
      totCount={totCount}
      totPages={totPages}
      onClickPage={handlePage}
      page={page}
      pageSize={pageSize}
      onClickPageSize={handlePageSize}
    >
      <SearchResults data={recipes} isPending={isLoading} />
    </Pagination>
  );
}
