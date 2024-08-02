import { createContext, useReducer } from "react";
import { scrollTop } from "../utils/utils";
import { FiltersType } from "../types/state";

export interface FilterContextType {
  filtersState: FiltersType;
  handleFilter: (key: string, value: number | string) => void;
  resetFilters: () => void;
}

export const FilterContext = createContext<FilterContextType | null>(null);

const initialState: FiltersType = {};

type ActionType =
  | { type: "setFilter"; payload: { key: string; value: number | string } }
  | { type: "resetFilters" };

function reducer(state: FiltersType, action: ActionType): FiltersType {
  switch (action.type) {
    case "setFilter":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "resetFilters":
      return { ...initialState };
    default:
      throw new Error("Unknown reducer action");
  }
}

interface FilterProviderProps {
  children?: React.ReactNode;
}

export default function FilterProvider({ children }: FilterProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleFilter(key: string, value: number | string) {
    dispatch({
      type: "setFilter",
      payload: { key, value },
    });
  }

  function resetFilters() {
    dispatch({ type: "resetFilters" });
    scrollTop();
  }

  return (
    <FilterContext.Provider
      value={{
        filtersState: state,
        handleFilter,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
