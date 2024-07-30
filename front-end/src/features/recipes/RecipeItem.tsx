import styled from "styled-components";
import { urlport } from "../../services/config";
import { Button } from "../../styles/BaseStyledComponents/Button";
import { media, x2boxShadow } from "../../styles/optionStyles";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { useNavigate } from "react-router-dom";
import { calcArrObjValAvg } from "../../utils/utils";
import { FaStar } from "react-icons/fa";

export interface RecipeDetailsProps {}

const Container = styled.div`
  padding: 0.5em;
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  border-radius: 15px;
  box-shadow: ${x2boxShadow.md};
  cursor: pointer;
  transition: transform 0.5 ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
  ${media.xl} {
    padding: 0.3em;
    grid-template-rows: 200px 1fr;
    grid-template-columns: 1fr;
  }
`;

const ImgWrap = styled.div`
  border-radius: 15px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DescBox = styled(FlexBox)`
  padding-inline: 1em;
  ${media.xl} {
    padding: 0.5em;
    flex-direction: column;
  }
`;

const DetailBox = styled(FlexBox)`
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 300px;
  ${media.xl} {
    flex: initial;
  }
`;

const Title = styled(FlexBox)`
  justify-content: space-between;
  align-items: last baseline;
  font-size: 1em;
  font-weight: bold;
  color: var(--color-brown-400);
  border-bottom: 2px solid var(--color-golden-200);
`;

export const RatingTag = styled.span`
  display: flex;
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

const InteractiveBox = styled.div`
  padding-block: 0.4em;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: justify-between;
  flex: 1 1 200px;
  ${Button} {
    align-self: flex-end;
    width: 100%;
    max-width: 200px;
    font-size: 0.9em;
    background-color: var(--color-brown-600);
    &:hover {
      background-color: var(--color-brown-700);
    }
  }
  ${media.xl} {
    padding-block: 0.2em;
    flex: 1 0 auto;
  }
`;

export default function RecipeItem({ recipe }) {
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
        <DetailBox>
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
        </DetailBox>
        <InteractiveBox>
          <Button
            $role="primary"
            $padding="0.2em 1em"
            onClick={() => navigate(`/search/${recipe.id}`)}
          >
            Details
          </Button>
        </InteractiveBox>
      </DescBox>
    </Container>
  );
}
