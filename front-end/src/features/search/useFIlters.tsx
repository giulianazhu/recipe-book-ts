import { useQueries } from "@tanstack/react-query";
import {
  getCuisines,
  getDiets,
  getDifficulties,
} from "../../services/apiFilters";

export default function useFilters() {
  const data = useQueries({
    queries: [
      { queryKey: ["cuisines"], queryFn: getCuisines },
      { queryKey: ["diets"], queryFn: getDiets },
      { queryKey: ["difficulties"], queryFn: getDifficulties },
    ],
  });

  const [cuisines, diets, difficulties] = data;
  // console.log(cuisines.data, diets.data, difficulties.data);

  return {
    cuisines: cuisines.data,
    diets: diets.data,
    difficulties: difficulties.data,
    isPending: data.some((el) => el.isPending),
    isError: data.some((el) => el.isError),
    error: data.find((el) => el && el.error),
  };
}
