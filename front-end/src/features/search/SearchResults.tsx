import styled, { css } from "styled-components";
import { media } from "../../styles/optionStyles";
import SearchItem from "./SearchItem";

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

export interface RecipeListProps {}

export default function SearchResults({ data: recipes }) {
  return (
    <SearchList>
      {recipes.map((recipe) => (
        <SearchItem data={recipe} key={recipe.id} />
      ))}
    </SearchList>
  );
}
