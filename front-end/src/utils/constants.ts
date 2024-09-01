import { SortType } from "../types/state";

export const pageSizeOptions = [4, 8, 12];

export const sortOptionNames: SortType[] = [
  { name: "Sort by oldest", value: ["id", "asc"] },
  { name: "Sort by newest", value: ["id", "desc"] },
  { name: "Sort by A - Z", value: ["name", "asc"] },
  { name: "Sort by Z - A", value: ["name", "desc"] },
];
