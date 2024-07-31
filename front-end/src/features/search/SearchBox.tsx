import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { buttonShadow, media } from "../../styles/optionStyles";
import { Button } from "../../styles/BaseStyledComponents/Button";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { formatQueries, scrollTop } from "../../utils/utils";
import useFilterContext from "../../contexts/useFilterContext";
import Error from "../../ui/Error";
import FilterBox from "./FilterBox";
import SearchInput from "../../ui/SearchInput";
import { Heading } from "../../styles/BaseStyledComponents/Heading";

const Container = styled(FlexBox)<{ $type?: string }>`
  padding-inline: 1em;
  width: 100%;
  height: max-content;
  font-size: 1.3rem;
  ${(props) =>
    props.$type === "main" &&
    css`
      border-right: 2px solid var(--color-grey-200);
      ${media.md} {
        display: none;
      }
    `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const SearchButton = styled(Button)`
  padding: 0.5em;
  flex: auto;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-brown-600);
  color: white;
  font-size: 0.8em;
  box-shadow: ${buttonShadow.sm_dark};
  &:hover {
    transform: scale(1.02);
    background-color: var(--color-brown-700);
  }
  ${(props) =>
    props.type === "reset" &&
    css`
      background-color: var(--color-grey-200);
      color: var(--color-brown-600);
      &:hover {
        background-color: var(--color-grey-100);
      }
    `};
`;

interface SearchBoxProps {
  type?: string;
  onSearchSubmit?: () => void;
  filters: object;
}

export default function SearchBox({
  type,
  onSearchSubmit,
  filters,
}: SearchBoxProps) {
  const { cuisines, diets, difficulties, isError, error } = filters;

  const navigate = useNavigate();

  const { filtersState, setFilter, resetFilters } = useFilterContext();

  const location = useLocation();
  // console.log(location.pathname);

  function handleSubmit(e) {
    e.preventDefault();
    scrollTop();
    if (location.pathname === "/searchinf") {
      navigate(`${location.pathname}?${formatQueries(filtersState)}`);
    } else navigate(`/search?${formatQueries(filtersState)}`);
  }

  //using pathname coz i have two types of search pages (pagination and infinite load)
  //default case navigate to /search to be redirected to search page even when im filtering on mobile view with sidebar searchbox on top of a non-searchresult page

  if (isError)
    return <Error>{error?.message ?? "Error: Try again later"}</Error>;

  return (
    <Container $type={type}>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          name="q"
          id="q"
          label="Search"
          onChange={(e) => setFilter("q", e.target.value)}
          value={filtersState?.q ?? ""}
          onSubmit={onSearchSubmit}
        />
        <FlexBox $direction="column">
          <Heading as="h4"> Filters </Heading>
          <FilterBox options={cuisines} name="cuisineId" label="Cuisine" />
          <FilterBox options={diets} name="dietId" label="Dietary Preference" />
          <FilterBox
            options={difficulties}
            name="difficultyId"
            label="Difficulty Level"
          />
        </FlexBox>
        <FlexBox $justify="center" $flex="auto">
          <SearchButton
            onClick={() => {
              resetFilters();
            }}
            type="reset"
          >
            Reset Filters
          </SearchButton>
          <SearchButton type="submit" onClick={onSearchSubmit}>
            Apply Filters
          </SearchButton>
        </FlexBox>
      </Form>
    </Container>
  );
}
