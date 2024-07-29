import { createContext, useReducer } from "react";
import { scrollTop } from "../utils/utils";
import { FiltersState } from "../types/data";

export const FilterContext = createContext<object | null>(null);

type ActionType =
  | { type: "setFilter"; payload: { key: string; value: number } }
  | { type: "resetFilters" };

const initialState: FiltersState = {};

function reducer(state: FiltersState, action: ActionType) {
  switch (action.type) {
    case "setFilter":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "resetFilters":
      return { initialState };
    default:
      throw new Error("Unknown reducer action");
  }
}

interface FilterProviderProps {
  children?: React.ReactNode;
}

export default function FilterProvider({ children }: FilterProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setFilter(key: string, value: number) {
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
        setFilter,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
