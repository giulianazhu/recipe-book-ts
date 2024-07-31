import styled from "styled-components";
import { media } from "../../styles/optionStyles";
import SearchItem from "./SearchItem";
import Loader from "../../ui/Loader";

const SearchList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 200px;
  gap: 1em;
  ${media.xl} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: minmax(300px, max-content);
    gap: 3em;
  }
`;

const LoaderWrap = styled.div`
  height: 80vh;
`;

export interface RecipeListProps {}

export default function SearchResults({ data: recipes, isPending }) {
  if (isPending)
    return (
      <LoaderWrap>
        <Loader />
      </LoaderWrap>
    );
  return (
    <SearchList>
      {recipes.map((recipe) => (
        <SearchItem data={recipe} key={recipe.id} />
      ))}
    </SearchList>
  );
}
