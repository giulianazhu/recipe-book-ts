import { urlport } from "./config";

//not needed
export async function getComments() {
  try {
    const res = await fetch(`${urlport}/comments`);
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch comments`
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getRecipeComments(recipeId) {
  try {
    const res = await fetch(`${urlport}/comments?recipeId=${recipeId}`);
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch recipe comments`
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getRecipeCommentsInf(recipeId, page, pageSize) {
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
    const totCount = res.headers.get("X-Total-Count");
    const totPages = Math.ceil(totCount / pageSize);

    console.log(data);

    return {
      data,
      hasMore: page < totPages,
      totCount,
    };
  } catch (err) {
    console.error(err.message);
  }
}

export async function addComment(recipeId, data) {
  try {
    const res = await fetch(`${urlport}/recipes/${recipeId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}. Could not add comments`);
    }
    const result = await res.json();
    console.log("Success:", result);
  } catch (err) {
    console.error(err.message);
  }
}

export async function updateComment(id, data) {
  try {
    const res = await fetch(`${urlport}/comments/${id}`, {
      method: "PUT",
      body: data,
    });
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not update comments`
      );
    }
    const result = await res.json();
    return { status: res.status, result };
  } catch (err) {
    console.error(err.message);
  }
}

export async function deleteComment(id) {
  try {
    const res = await fetch(`${urlport}/comments/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not delete comments`
      );
    }
    const result = await res.json();
    return { status: res.status, result };
  } catch (err) {
    console.error(err.message);
  }
}
