import { useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  getCuisines,
  getDiets,
  getDifficulties,
} from "../../services/apiFilters";
import { CategoryType } from "../../types/data";

export default function useFilters() {
  const data: [
    UseQueryResult<CategoryType[], Error>,
    UseQueryResult<CategoryType[], Error>,
    UseQueryResult<CategoryType[], Error>
  ] = useQueries({
    queries: [
      { queryKey: ["cuisines"], queryFn: getCuisines },
      { queryKey: ["diets"], queryFn: getDiets },
      { queryKey: ["difficulties"], queryFn: getDifficulties },
    ],
  });

  const [cuisines, diets, difficulties] = data;
  // console.log(cuisines.data, diets.data, difficulties.data);

  const dataWithError = data.find((el) => el && el.error);
  const error = dataWithError?.error;

  return {
    cuisines: cuisines.data,
    diets: diets.data,
    difficulties: difficulties.data,
    isPending: !!data.some((el) => el.isPending),
    isError: !!data.some((el) => el.isError),
    error,
  };
}
