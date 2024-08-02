import { Outlet } from "react-router-dom";
import Loader from "../../ui/Loader";
import SearchBox from "./SearchBox";
import useFilters from "./useFilters";
import styled from "styled-components";
import { media } from "../../styles/optionStyles";
import Error from "../../ui/Error";
import { UseMultipleDataReturns } from "../../types/hookdata";
import { CategoryType } from "../../types/data";

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  ${media.md} {
    grid-template-columns: 1fr;
  }
`;

export interface SearchProps {}

export default function Search() {
  const { cuisines, diets, difficulties, isPending, isError, error } =
    useFilters();

  if (isPending) return <Loader />;
  if (isError)
    return <Error>{error?.message ?? "Error: Try again later"}</Error>;

  const filters = {
    cuisines,
    diets,
    difficulties,
    isError,
    error,
  };

  return (
    <Container>
      <SearchBox type="main" filters={filters} />
      <Outlet />
    </Container>
  );
}
