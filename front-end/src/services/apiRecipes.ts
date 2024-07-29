import { pageSizeOptions } from "../utils/constants";
import { formatQueries, isEmptyObj } from "../utils/utils";
import { urlport } from "./config";

export async function prefetchRecipes() {
  try {
    const res = await fetch(
      `${urlport}/recipes?_expand=difficulty&_expand=cuisine&_expand=diet`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not prefetch recipes`
      );
    }
    const data = await res.json();
    console.log("data returned", data);
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getRecipes(page = 1, pageSize = pageSizeOptions[0]) {
  try {
    const res = await fetch(
      `${urlport}/recipes?_expand=difficulty&_expand=cuisine&_expand=diet&_page=${page}&_limit=${pageSize}`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch recipes`
      );
    }
    const data = await res.json();
    const totCount = res.headers.get("X-Total-Count");
    const totPages = Math.ceil(totCount / pageSize);
    console.log("data returned", data, totCount, totPages);
    return { data, totCount, totPages };
  } catch (err) {
    console.error(err.message);
  }
}

export async function getRecipesInf(page = 1, pageSize = pageSizeOptions[0]) {
  try {
    const res = await fetch(
      `${urlport}/recipes?_expand=difficulty&_expand=cuisine&_expand=diet&_page=${page}&_limit=${pageSize}`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch recipes`
      );
    }
    const data = await res.json();
    const totCount = res.headers.get("X-Total-Count");
    const totPages = Math.ceil(totCount / pageSize);

    return {
      data,
      hasMore: page < totPages,
      totCount,
    };
  } catch (err) {
    console.error(err.message);
  }
}

export async function getFilterRecipes(
  filters,
  page = 1,
  pageSize = pageSizeOptions[0]
) {
  if (isEmptyObj(filters)) return getRecipes(page, pageSize);

  const queryFilters = formatQueries(filters);
  //filters turned to object first to pass into query key and then turned back into url search param to put in the url

  // console.log(queryFilters);
  try {
    const res = await fetch(
      `${urlport}/recipes?${queryFilters}&_expand=difficulty&_expand=cuisine&_expand=diet&_page=${page}&_limit=${pageSize}`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not filter recipes`
      );
    }
    const data = await res.json();
    const totCount = res.headers.get("X-Total-Count");
    const totPages = Math.ceil(totCount / pageSize);

    console.log("Date returned", data, totCount, totPages);
    return { data, totCount, totPages };
  } catch (err) {
    console.error(err.message);
  }
}

export async function getFilterRecipesInf(
  filters,
  page = 1,
  pageSize = pageSizeOptions[0]
) {
  if (isEmptyObj(filters)) return getRecipesInf(page, pageSize);

  const queryFilters = formatQueries(filters);
  //filters turned to object first to pass into query key and then turned back into url search param to put in the url

  // console.log(queryFilters);
  try {
    const res = await fetch(
      `${urlport}/recipes?${queryFilters}&_expand=difficulty&_expand=cuisine&_expand=diet&_page=${page}&_limit=${pageSize}`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not filter recipes`
      );
    }
    const data = await res.json();
    const totCount = res.headers.get("X-Total-Count");
    const totPages = Math.ceil(totCount / pageSize);

    // console.log("Date returned", data, totCount, totPages);
    return {
      data,
      hasMore: page < totPages,
      totCount,
    };
  } catch (err) {
    console.error(err.message);
  }
}

export async function getRecipe(id) {
  try {
    const res = await fetch(
      `${urlport}/recipes/${id}?&_expand=difficulty&_expand=cuisine&_expand=diet`
    );
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}. Could not get recipe`);
    }
    const data = await res.json();
    return data;
    // const comments = await getRecipeComments(data.id);
    // return{ ...data, comments };
  } catch (err) {
    console.error(err.message);
  }
}

export async function addRecipe(data) {
  try {
    const res = await fetch(`${urlport}/recipes`, {
      method: "POST",
      body: data,
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}. Could not add recipe`);
    }
    const result = await res.json();
    console.log("Success:", result);
    return result;
  } catch (err) {
    console.error(err.message);
  }
}

export async function updateRecipe(id, data) {
  try {
    const res = await fetch(`${urlport}/comments/${id}`, {
      method: "PUT",
      body: data,
    });
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not update recipe`
      );
    }
    const result = await res.json();
    return { status: res.status, result };
  } catch (err) {
    console.error(err.message);
  }
}

export async function deleteRecipe(id) {
  try {
    const res = await fetch(`${urlport}/recipes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not delete recipe`
      );
    }
    const result = await res.json();
    return { status: res.status, result };
  } catch (err) {
    console.error(err.message);
  }
}
