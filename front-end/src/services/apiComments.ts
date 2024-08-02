import { ApiInfiniteResults } from "../types/apidata";
import { CommentType } from "../types/data";
import { CommentFormDataType, PageSizeType, PageType } from "../types/state";
import { urlport } from "./config";

export async function getRecipeCommentsInf(
  recipeId: string,
  page: PageType,
  pageSize: PageSizeType
): Promise<ApiInfiniteResults<CommentType> | undefined> {
  try {
    const res = await fetch(
      `${urlport}/comments?recipeId=${recipeId}&_page=${page}&_limit=${pageSize}`
    );
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch recipe comments`
      );
    }
    const data = await res.json();
    const totCount = parseInt(res.headers.get("X-Total-Count") || "0");
    const totPages = Math.ceil(totCount / pageSize);

    const results: ApiInfiniteResults<CommentType> = {
      data,
      hasMore: page < totPages,
      totCount,
    };

    // console.log(results);

    return results;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Could not fetch recipe comments");
    }
  }
}

export async function addComment(recipeId: string, data: CommentFormDataType) {
  try {
    const res = await fetch(`${urlport}/recipes/${recipeId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not leave a review`
      );
    }
    const result = await res.json();
    // console.log("Success:", result);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Could not leave a review");
    }
  }
}

// export async function getComments() {
//   try {
//     const res = await fetch(`${urlport}/comments`);
//     if (!res.ok) {
//       throw new Error(
//         `Response status: ${res.status}. Could not fetch comments`
//       );
//     }
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// export async function getRecipeComments(recipeId) {
//   try {
//     const res = await fetch(`${urlport}/comments?recipeId=${recipeId}`);
//     if (!res.ok) {
//       throw new Error(
//         `Response status: ${res.status}. Could not fetch recipe comments`
//       );
//     }
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// export async function updateComment(id, data) {
//   try {
//     const res = await fetch(`${urlport}/comments/${id}`, {
//       method: "PUT",
//       body: data,
//     });
//     if (!res.ok) {
//       throw new Error(
//         `Response status: ${res.status}. Could not update comments`
//       );
//     }
//     const result = await res.json();
//     return { status: res.status, result };
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// export async function deleteComment(id) {
//   try {
//     const res = await fetch(`${urlport}/comments/${id}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) {
//       throw new Error(
//         `Response status: ${res.status}. Could not delete comments`
//       );
//     }
//     const result = await res.json();
//     return { status: res.status, result };
//   } catch (err) {
//     console.error(err.message);
//   }
// }
