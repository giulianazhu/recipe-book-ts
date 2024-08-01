import { useEffect, useRef, useState } from "react";
import Pagination from "../../ui/Pagination";
import SearchResults from "./SearchResults";
import { pageSizeOptions } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import useFilterRecipes from "../recipes/useFilterRecipes";
import Error from "../../ui/Error";
import { scrollTop } from "../../utils/utils";

export interface ResultsProps {}

export default function Results() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const [searchParams] = useSearchParams();
  const prevQueries = useRef(searchParams.toString());

  function handlePage(page) {
    setPage(page);
    scrollTop();
  }

  function handlePageSize(size) {
    setPageSize(size);
    scrollTop();
  }

  useEffect(
    //to reset page back to 1 if query changed
    function () {
      // console.log(searchParams.toString());
      const currQueries = searchParams.toString();
      if (prevQueries !== currQueries) {
        setPage(1);
        prevQueries.current = currQueries;
      }
    },
    [searchParams]
  );

  const filters = {};
  for (const [key, value] of searchParams.entries()) {
    if (value && value !== "null") {
      filters[key] = value;
    } else continue;
  }

  const {
    data: { data: recipes, totCount, totPages },
    isLoading,
    isError,
    error,
  } = useFilterRecipes(filters, page, pageSize);

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
