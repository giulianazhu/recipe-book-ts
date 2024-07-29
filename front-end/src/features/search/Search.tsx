import { Outlet } from "react-router-dom";
import Loader from "../../ui/Loader";
import SearchBox from "./SearchBox";
import useFilters from "./useFIlters";

export interface SearchProps {}

export default function Search() {
  const { cuisines, diets, difficulties, isPending, isError, error } =
    useFilters();

  if (isPending) return <Loader />;

  console.log(cuisines, diets);

  const filters = {
    cuisines,
    diets,
    difficulties,
    isError,
    error,
  };

  return (
    <div>
      <SearchBox type="main" filters={filters} />
      <Outlet />
    </div>
  );
}
