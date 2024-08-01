import { ApiPaginatedResults } from "../types/apidata";
import { ExpandedRecipeType, RecipeType } from "../types/data";
import { FiltersObjType, PageSizeType, PageType } from "../types/state";
import { pageSizeOptions } from "../utils/constants";
import { formatQueries, isEmptyObj } from "../utils/utils";
import { urlport } from "./config";

export async function prefetchRecipes(): Promise<
  ExpandedRecipeType | undefined
> {
  try {
    const res = await fetch(
      `${urlport}/recipes?_expand=difficulty&_expand=cuisine&_expand=diet&_embed=comments`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not prefetch recipes`
      );
    }
    const data: ExpandedRecipeType = await res.json();
    console.log("data returned", data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Could not prefetch recipes");
    }
  }
}

export async function getRecipes(
  page: number = 1,
  pageSize: number = pageSizeOptions[0]
): Promise<ApiPaginatedResults<ExpandedRecipeType> | undefined> {
  try {
    const res = await fetch(
      `${urlport}/recipes?_expand=difficulty&_expand=cuisine&_expand=diet&_page=${page}&_limit=${pageSize}&_embed=comments`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch recipes`
      );
    }
    const data = await res.json();
    const totCount = parseInt(res.headers.get("X-Total-Count") || "0");
    const totPages = Math.ceil(totCount / pageSize);

    // console.log("data returned", data, totCount, totPages);
    const results: ApiPaginatedResults<ExpandedRecipeType> = {
      data,
      totCount,
      totPages,
    };

    return results;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Could not fetch recipes");
    }
  }
}

export async function getFilterRecipes(
  filters: FiltersObjType,
  page: PageType = 1,
  pageSize: PageSizeType = pageSizeOptions[0]
): Promise<ApiPaginatedResults<ExpandedRecipeType> | undefined> {
  if (isEmptyObj(filters)) return getRecipes(page, pageSize);

  const queryFilters = formatQueries(filters);
  //filters turned to object first to pass into query key and then turned back into url search param to put in the url

  try {
    const res = await fetch(
      `${urlport}/recipes?${queryFilters}&_expand=difficulty&_expand=cuisine&_expand=diet&_page=${page}&_limit=${pageSize}&_embed=comments`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not filter recipes`
      );
    }
    const data = await res.json();
    const totCount = parseInt(res.headers.get("X-Total-Count") || "0");
    const totPages = Math.ceil(totCount / pageSize);

    // console.log("Date returned", data, totCount, totPages);

    const results: ApiPaginatedResults<ExpandedRecipeType> = {
      data,
      totCount,
      totPages,
    };

    return results;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Could not filter recipes");
    }
  }
}

export async function getRecipe(
  id: string | number
): Promise<ExpandedRecipeType | undefined> {
  try {
    const res = await fetch(
      `${urlport}/recipes/${id}?&_expand=difficulty&_expand=cuisine&_expand=diet&_embed=comments`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not get requested recipe`
      );
    }
    const data: ExpandedRecipeType = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Coult not get requested recipe");
    }
  }
}

export async function addRecipe(
  data: FormData
): Promise<RecipeType | undefined> {
  try {
    const res = await fetch(`${urlport}/recipes`, {
      method: "POST",
      body: data,
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}. Could not add recipe`);
    }
    const result: RecipeType = await res.json();
    // console.log("Success:", result);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Coult not add recipe");
    }
  }
}

//BELOW = unused apis

// export async function getRecipesInf(page = 1, pageSize = pageSizeOptions[0]) {
//   try {
//     const res = await fetch(
//       `${urlport}/recipes?_expand=difficulty&_expand=cuisine&_expand=diet&_page=${page}&_limit=${pageSize}`
//     );
//     if (!res.ok) {
//       throw new Error(
//         `Response status: ${res.status}. Could not fetch recipes`
//       );
//     }
//     const data = await res.json();
//     const totCount = res.headers.get("X-Total-Count");
//     const totPages = Math.ceil(totCount / pageSize);

//     return {
//       data,
//       hasMore: page < totPages,
//       totCount,
//     };
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// export async function getFilterRecipesInf(
//   filters,
//   page = 1,
//   pageSize = pageSizeOptions[0]
// ) {
//   if (isEmptyObj(filters)) return getRecipesInf(page, pageSize);

//   const queryFilters = formatQueries(filters);
//   //filters turned to object first to pass into query key and then turned back into url search param to put in the url

//   // console.log(queryFilters);
//   try {
//     const res = await fetch(
//       `${urlport}/recipes?${queryFilters}&_expand=difficulty&_expand=cuisine&_expand=diet&_page=${page}&_limit=${pageSize}`
//     );
//     if (!res.ok) {
//       throw new Error(
//         `Response status: ${res.status}. Could not filter recipes`
//       );
//     }
//     const data = await res.json();
//     const totCount = res.headers.get("X-Total-Count");
//     const totPages = Math.ceil(totCount / pageSize);

//     // console.log("Date returned", data, totCount, totPages);
//     return {
//       data,
//       hasMore: page < totPages,
//       totCount,
//     };
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// export async function updateRecipe(id, data) {
//   try {
//     const res = await fetch(`${urlport}/comments/${id}`, {
//       method: "PUT",
//       body: data,
//     });
//     if (!res.ok) {
//       throw new Error(
//         `Response status: ${res.status}. Could not update recipe`
//       );
//     }
//     const result = await res.json();
//     return { status: res.status, result };
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// export async function deleteRecipe(id) {
//   try {
//     const res = await fetch(`${urlport}/recipes/${id}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) {
//       throw new Error(
//         `Response status: ${res.status}. Could not delete recipe`
//       );
//     }
//     const result = await res.json();
//     return { status: res.status, result };
//   } catch (err) {
//     console.error(err.message);
//   }
// }
