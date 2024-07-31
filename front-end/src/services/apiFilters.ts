import { urlport } from "./config";

export async function getCuisines() {
  try {
    const res = await fetch(`${urlport}/cuisines`);
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch cuisines data`
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unexpected error occured");
    }
  }
}

export async function getDiets() {
  try {
    const res = await fetch(`${urlport}/diets`);
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch diets data`
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unexpected error occured");
    }
  }
}

export async function getDifficulties() {
  try {
    const res = await fetch(`${urlport}/difficulties`);
    if (!res.ok) {
      throw new Error(
        `Response status: ${res.status}. Could not fetch difficulties data`
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unexpected error occured");
    }
  }
}
