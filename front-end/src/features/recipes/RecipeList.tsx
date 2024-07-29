import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { pageSizeOptions } from "../../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFilterRecipes from "./useFilterRecipes";
import Error from "../../ui/Error";
import { Heading } from "../../styles/BaseStyledComponents/Heading";
import RecipeDetails from "./RecipeDetails";
import { media } from "../../styles/optionStyles";

const Container = styled.div`
  padding-inline: 1em;
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

export interface RecipeListProps {}

export default function RecipeList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const [searchParams] = useSearchParams();
  const prevQueries = useRef(searchParams.toString());

  const navigate = useNavigate();

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

  console.log(recipes);

  return (
    <Container>
      <span>Results for ...</span>
      <Heading as="h5">Found {totCount} results </Heading>
      <List>
        {recipes.map((recipe) => (
          <RecipeDetails recipe={recipe} key={recipe.id} />
        ))}
      </List>
      <div>Pagination</div>
    </Container>
  );
}
