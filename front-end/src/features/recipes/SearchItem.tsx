import styled from "styled-components";
import { urlport } from "../../services/config";
import { Button } from "../../styles/BaseStyledComponents/Button";
import { media, x2boxShadow } from "../../styles/optionStyles";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { useNavigate } from "react-router-dom";
import { calcArrObjValAvg } from "../../utils/utils";
import { FaBookmark, FaRegBookmark, FaStar } from "react-icons/fa";

export interface RecipeDetailsProps {}

const Container = styled(FlexBox)`
  padding: 0.5em;
  height: 100%;
  border-radius: 15px;
  box-shadow: ${x2boxShadow.md};
  cursor: pointer;
  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.01);
  }
  ${media.xl} {
    padding: 0.3em;
    flex-direction: column;
  }
`;

const ImgWrap = styled.div`
  overflow: hidden;
  flex: 0 0 200px;
  border-radius: 15px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DescBox = styled(FlexBox)`
  flex: 1 1 auto;
  ${media.xl} {
    padding: 0.5em;
    flex-direction: column;
  }
`;

const DetailsBox = styled(FlexBox)`
  flex: 1 1 auto;
  flex-direction: column;
`;

const Title = styled(FlexBox)`
  justify-content: space-between;
  align-items: baseline;
  font-size: 1em;
  color: var(--color-brown-400);
  border-bottom: 1px solid var(--color-golden-200);
  & span {
    font-weight: normal;
  }
`;

export const RatingTag = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  gap: 0.5em;
`;

const Description = styled.p`
  font-size: 0.9em;
`;

const TagBox = styled(FlexBox)`
  gap: 0.5em;
  flex-wrap: wrap;
`;

const Tag = styled(Button)`
  border: 1px solid var(--color-brown-200);
  color: var(--color-brown-400);
  background-color: var(--color-grey-200);
  font-size: 0.7em;
  box-shadow: none;
`;

const InteractiveBox = styled(FlexBox)`
  padding-inline: 0.5em;
  margin-left: auto;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  ${media.xl} {
    padding-block: 0.2em;
    width: 100%;
    flex: 0 0 auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const InteractiveIcon = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
`;

const ItemButton = styled(Button)`
  padding: 0.2em 1em;
  width: 100%;
  max-width: 150px;
  font-size: 0.9em;
  background-color: var(--color-brown-300);
  &:hover {
    background-color: var(--color-brown-500);
  }
  ${media.xl} {
    max-width: 100px;
  }
`;

export default function SearchItem({ data: recipe }) {
  const navigate = useNavigate();

  const avgRating = calcArrObjValAvg(recipe.comments, "rating");

  return (
    <Container onClick={() => navigate(`/search/${recipe.id}`)}>
      <ImgWrap>
        <img
          src={`${urlport}${recipe.image}`}
          alt={`Image of ${recipe.name}`}
        />
      </ImgWrap>
      <DescBox>
        <DetailsBox>
          <Title as="h1">
            <p>{recipe.name.toUpperCase()}</p>
            <RatingTag>
              {avgRating} <FaStar color="var(--color-golden-300)" />
            </RatingTag>
          </Title>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
            voluptates autem fugit quae harum
          </Description>
          <TagBox>
            <Tag>{recipe.cuisine.name}</Tag>
            <Tag>{recipe.diet.name}</Tag>
            <Tag>{recipe.difficulty.name}</Tag>
          </TagBox>
        </DetailsBox>
        <InteractiveBox>
          <InteractiveIcon>
            <FaBookmark
              onClick={(e) => {
                alert("Placeholder");
                e.stopPropagation();
              }}
            />
          </InteractiveIcon>
          <ItemButton
            $role="primary"
            onClick={() => navigate(`/search/${recipe.id}`)}
          >
            Details
          </ItemButton>
        </InteractiveBox>
      </DescBox>
    </Container>
  );
}
