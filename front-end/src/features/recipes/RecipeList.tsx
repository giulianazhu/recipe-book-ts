import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { pageSizeOptions } from "../../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFilterRecipes from "./useFilterRecipes";
import Error from "../../ui/Error";
import { Heading } from "../../styles/BaseStyledComponents/Heading";
import { media } from "../../styles/optionStyles";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { Button } from "../../styles/BaseStyledComponents/Button";
import { scrollTop } from "../../utils/utils";
import RecipeItem from "./RecipeItem";

const Container = styled(FlexBox)`
  padding-inline: 1em;
  min-height: 150vh; //keep page height constant
  max-height: 300vh;
  flex-direction: column;
  justify-content: space-between;
  ${media.xl} {
    padding-inline: 0.3em;
  }
  ${media.xs} {
    padding-inline: 0.1em;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 200px;
  gap: 0.5em;
  ${media.xl} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: minmax(500px, max-content);
    gap: 1.5em;
  }
`;

const Select = styled.select`
  padding-inline: 0.3em;
  border: 1px solid var(--color-grey-300);
  border-radius: 15px;
  font-size: 0.8em;
  &:focus {
    outline: none;
  }
`;

const PageLabel = styled(FlexBox)<{ $current: boolean }>`
  width: 2em;
  height: 2em;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-grey-300);
  border-radius: 50%;
  background-color: var(--color-grey-200);
  font-size: 0.8em;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--color-brown-500);
  }
  ${(props) =>
    props.$current &&
    css`
      border: 1px solid var(--color-golden-200);
      background-color: var(--color-golden-300);
      color: white;
    `}
`;

const PageButton = styled(Button)`
  font-size: 0.8em;
  background-color: var(--color-grey-100);
  &:hover {
    background-color: var(--color-brown-200);
  }
  ${(props) =>
    props.disabled &&
    css`
      box-shadow: none;
      color: var(--color-grey-400);
      &:hover {
        background-color: var(--color-grey-100);
      }
    `}
`;

const Divider = styled.span`
  height: 1.5em;
  border: 1.5px solid var(--color-brown-300);
`;

export interface RecipeListProps {}

export default function RecipeList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const [searchParams] = useSearchParams();
  const prevQueries = useRef(searchParams.toString());

  const navigate = useNavigate();

  function handlePage(page) {
    setPage(page);
    scrollTop();
  }

  useEffect(
    //to reset page back to 1 if query changed
    function () {
      // console.log(searchParams.toString());
      const currQueries = searchParams.toString();
      if (prevQueries !== currQueries) {
        setPage(1);
        prevQueries.current = currQueries;
      }
    },
    [searchParams]
  );

  const filters = {};
  for (const [key, value] of searchParams.entries()) {
    if (value && value !== "null") {
      filters[key] = value;
    } else continue;
  }

  const {
    data: { data: recipes, totCount, totPages },
    isPending,
    isError,
    error,
  } = useFilterRecipes(filters, page, pageSize);

  if (isPending) return <h1>Searching...</h1>;
  if (isError)
    return <Error>{error?.message ?? "Error: Try again later"}</Error>;

  const pages = [];
  for (let i = 1; i <= totPages; i++) {
    pages.push(i);
  }

  console.log(recipes);

  return (
    <Container>
      <FlexBox $direction="column">
        <span>Results for ...</span>
        <FlexBox $justify="space-between">
          <Heading as="h5">Found {totCount} results </Heading>
          <Select
            name="_sort"
            id="_sort"
            onChange={() => alert("Yet to apply feature")}
          >
            <option value="-id">Most recent</option>
            <option value="id">Least recent</option>
          </Select>
        </FlexBox>
        <List>
          {recipes.map((recipe) => (
            <RecipeItem recipe={recipe} key={recipe.id} />
          ))}
        </List>
      </FlexBox>
      <FlexBox $padding="2em 0" $items="center" $justify="flex-end" $gap="1em">
        <FlexBox>
          {pages.map((p) => (
            <PageLabel
              $current={p === page}
              onClick={() => handlePage(p)}
              key={p}
            >
              {p}
            </PageLabel>
          ))}
        </FlexBox>
        <Divider />
        <FlexBox>
          <PageButton
            disabled={page === 1}
            onClick={() => handlePage(page - 1)}
          >
            Previous
          </PageButton>
          <PageButton
            disabled={page === totPages}
            onClick={() => handlePage(page + 1)}
          >
            Next
          </PageButton>
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
