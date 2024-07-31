import { Filters, Recipe } from "../types/data";

export function formatQueries(filters: Filters) {
  const queryFilters = new URLSearchParams();
  for (const filter in filters) {
    const query = filters[filter];
    if (query !== undefined) {
      queryFilters.append(filter, String(query));
    }
  }
  return queryFilters.toString();
}

interface NumericObject {
  [key: string]: number;
}

export function calcArrObjValAvg<T extends NumericObject>(
  arr: T[],
  property: keyof T
) {
  let avg = 0;
  for (const el of arr) {
    avg += el[property];
  }
  avg /= arr.length;
  return typeof avg === "number" && !isNaN(avg) ? avg.toFixed(1) : 0;
}

export function calcPageItems(page: number, pageSize: number) {
  let tot = 0;
  tot = page * pageSize;
  return tot;
}

export function filterByProperties(data: Recipe[], filtersObj: Filters) {
  const filteredData = data.filter((recipe) => {
    return Object.keys(filtersObj).every((filterKey) => {
      return recipe[filterKey] === filtersObj[filterKey];
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

export function formatDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() is zero-based
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}
