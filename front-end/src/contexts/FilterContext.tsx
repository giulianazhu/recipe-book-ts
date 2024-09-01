import { createContext, useReducer } from "react";
import { formatQueries, scrollTop } from "../utils/utils";
import { FiltersType, PageSizeType, PageType } from "../types/state";
import { pageSizeOptions } from "../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface FilterContextType {
  filtersState: FiltersType;
  handleFilter: (key: string, value: number | string) => void;
  resetFilters: () => void;
  handlePage: (_e: React.ChangeEvent<unknown>, page: number) => void;
  handlePageSize: (size: number) => void;
  handleSort: (option: string) => void;
  handleSearch: () => void;
}

export const FilterContext = createContext<FilterContextType | null>(null);

const initialState: FiltersType = {
  page: 1,
  pageSize: pageSizeOptions[0],
  sort: "",
  order: "",
};

type ActionType =
  | { type: "setFilter"; payload: { key: string; value: number | string } }
  | { type: "resetFilters" }
  | { type: "setPage"; payload: PageType }
  | { type: "setPageSize"; payload: PageSizeType }
  | { type: "setSort"; payload: { sort: string; order: string } }
  | { type: "search" };

function reducer(state: FiltersType, action: ActionType): FiltersType {
  switch (action.type) {
    case "setFilter":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "resetFilters":
      return { ...initialState };
    case "setPage":
      return {
        ...state,
        page: action.payload,
      };
    case "setPageSize":
      return {
        ...state,
        pageSize: action.payload,
      };
    case "setSort":
      return {
        ...state,
        ...action.payload,
      };
    case "search":
      return {
        ...state,
        page: 1,
      };
    default:
      throw new Error("Unknown reducer action");
  }
}

interface FilterProviderProps {
  children?: React.ReactNode;
}

export default function FilterProvider({ children }: FilterProviderProps) {
  const [searchParams] = useSearchParams();

  const currentState: FiltersType = {};

  for (const [key, value] of searchParams.entries()) {
    if (value && value !== "null") {
      if (key === "page" || key === "pageSize") {
        (currentState as FiltersType)[key as keyof FiltersType] =
          parseInt(value);
      } else {
        (currentState as FiltersType)[key as keyof FiltersType] = value;
      }
    } else continue;
  }

  const [state, dispatch] = useReducer(reducer, currentState);
  const navigate = useNavigate();

  function handleFilter(key: string, value: number | string) {
    dispatch({
      type: "setFilter",
      payload: { key, value },
    });
  }

  function resetFilters() {
    dispatch({ type: "resetFilters" });
    scrollTop();
    navigate(
      `/search?${formatQueries({
        ...initialState,
      })}`
    );
  }

  function handlePage(_e: React.ChangeEvent<unknown>, page: number) {
    dispatch({ type: "setPage", payload: page });
    scrollTop();
    navigate(`/search?${formatQueries({ ...state, page })}`);
  }

  function handlePageSize(size: number) {
    dispatch({ type: "setPageSize", payload: size });
    scrollTop();
    navigate(`/search?${formatQueries({ ...state, pageSize: size })}`);
  }

  function handleSort(option: string) {
    const options = option.split(",");
    const formattedOptions = { sort: options[0], order: options[1] };
    dispatch({ type: "setSort", payload: formattedOptions });
    navigate(`/search?${formatQueries({ ...state, ...formattedOptions })}`);
  }

  function handleSearch() {
    dispatch({ type: "search" });
    scrollTop();
    navigate(`/search?${formatQueries({ ...state, page: 1 })}`);
  }

  return (
    <FilterContext.Provider
      value={{
        filtersState: state,
        handleFilter,
        resetFilters,
        handlePage,
        handlePageSize,
        handleSort,
        handleSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
