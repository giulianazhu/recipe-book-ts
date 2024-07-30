import { Outlet } from "react-router-dom";
import Loader from "../../ui/Loader";
import SearchBox from "./SearchBox";
import useFilters from "./useFIlters";
import styled from "styled-components";
import { media } from "../../styles/optionStyles";
import { Divider } from "../../styles/BaseStyledComponents/Divider";

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px auto 1fr;
  ${media.md} {
    grid-template-columns: 1fr;
  }
`;

const ShrinkBox = styled.div`
  font-size: 0.8em;
`;

export interface SearchProps {}

export default function Search() {
  const { cuisines, diets, difficulties, isPending, isError, error } =
    useFilters();

  if (isPending) return <Loader />;

  const filters = {
    cuisines,
    diets,
    difficulties,
    isError,
    error,
  };

  return (
    <Container>
      <ShrinkBox>
        <SearchBox type="main" filters={filters} />
      </ShrinkBox>
      <Divider />
      <Outlet />
    </Container>
  );
}
