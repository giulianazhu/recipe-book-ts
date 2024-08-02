import { ApiCategoriesResults } from "../types/apidata";
import { urlport } from "./config";

export async function getCuisines(): Promise<ApiCategoriesResults | undefined> {
  try {
    const res = await fetch(`${urlport}/cuisines`);
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch cuisines data`
      );
    }
    const data: ApiCategoriesResults = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Could not fetch cuisines data");
    }
  }
}

export async function getDiets(): Promise<ApiCategoriesResults | undefined> {
  try {
    const res = await fetch(`${urlport}/diets`);
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch diets data`
      );
    }
    const data: ApiCategoriesResults = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Could not fetch diets data");
    }
  }
}

export async function getDifficulties(): Promise<
  ApiCategoriesResults | undefined
> {
  try {
    const res = await fetch(`${urlport}/difficulties`);
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch difficulties data`
      );
    }
    const data: ApiCategoriesResults = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Could not fetch difficulties data");
    }
  }
}
