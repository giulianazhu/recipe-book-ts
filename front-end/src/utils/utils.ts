import { ExpandedRecipeType } from "../types/data";
import { FiltersType } from "../types/state";

export function formatQueries(filters: FiltersType) {
  const queryFilters = new URLSearchParams();
  for (const filter in filters) {
    const query = filters[filter];
    if (query !== undefined) {
      queryFilters.append(filter, String(query));
    }
  }
  return queryFilters.toString();
}

export function calcArrObjValAvg<DataType>(
  arr: DataType[],
  property: keyof DataType
) {
  let avg = 0;
  for (const el of arr) {
    if (typeof el[property] === "number") {
      avg += el[property];
    }
  }
  avg /= arr.length;
  return typeof avg === "number" && !isNaN(avg) ? avg.toFixed(1) : 0;
}

export function calcPageItems(page: number, pageSize: number) {
  let tot = 0;
  tot = page * pageSize;
  return tot;
}

export function filterByProperties(
  data: ExpandedRecipeType[],
  filtersObj: FiltersType
) {
  const filteredData = data.filter((recipe) => {
    return Object.keys(filtersObj).every((filterKey) => {
      return (
        recipe[filterKey as keyof ExpandedRecipeType] === filtersObj[filterKey]
      );
    });
  });
  return filteredData;
}

export function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function isEmptyObj(obj: object) {
  return Object.values(obj).length === 0;
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() is zero-based
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}
