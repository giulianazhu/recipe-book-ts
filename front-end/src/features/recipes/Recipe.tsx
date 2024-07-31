import { useParams } from "react-router-dom";
import useRecipe from "./useRecipe";
import { urlport } from "../../services/config";
import { styled } from "styled-components";
import { calcArrObjValAvg } from "../../utils/utils";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
import { buttonShadow, media, x2boxShadow } from "../../styles/optionStyles";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { Heading } from "../../styles/BaseStyledComponents/Heading";
import { FaStar } from "react-icons/fa";
import CommentSection from "../comments/CommentSection";

const Container = styled.div`
  margin-inline: auto;
  width: 60%;
  height: max-content;
  overflow: hidden;
  border-radius: 15px;
  background-color: var(--color-grey-100);
  box-shadow: ${buttonShadow.sm_dark};
  ${media.md} {
    width: 90%;
  }
  ${media.sm} {
    width: 99%;
  }
`;

const ImgWrap = styled.div`
  width: 100%;
  height: 400px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
  }
`;

const Overview = styled(FlexBox)`
  padding-inline: 1em;
  flex-direction: column;
  border-left: 3px solid var(--color-golden-200);
  font-size: 0.8em;
  & span {
    font-weight: bold;
  }
`;

const Rating = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
`;

const IngredientsTable = styled.div`
  margin-block: 0.5em;
  padding: 0.5em;
  border-radius: 15px;
  box-shadow: ${x2boxShadow.sm};
`;

const List = styled(FlexBox)`
  flex-direction: column;
  border-radius: 15px;
  font-size: 0.8em;
  color: var(--color-brown-700);
`;

const Instructions = styled(FlexBox)`
  margin-block: 2em;
  flex-direction: column;
  gap: 2em;
  font-size: 0.9em;
  ${media.xs} {
    gap: 4em;
  }
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: 7em 1fr;
  align-items: baseline;
  & span {
    font-size: 1.2em;
    font-weight: bold;
    color: var(--color-brown-300);
  }
  ${media.xs} {
    grid-template-columns: 1fr;
    grid-auto-rows: max-content 1fr;
    gap: 1em;
  }
`;

export interface RecipeProps {}

export default function Recipe() {
  const { id: recipeId } = useParams();

  const { data, isPending, isError, error } = useRecipe(recipeId);

  if (isPending) return <Loader />;
  if (isError)
    return <Error>{error?.message ?? "Error: Try again later"}</Error>;

  const {
    name,
    ingredients,
    instructions,
    image,
    comments,
    cuisine,
    diet,
    difficulty,
  } = data;

  const avgRating = calcArrObjValAvg(comments, "rating");
  const instructionSteps = instructions?.split(". ") ?? [];

  return (
    <Container>
      <ImgWrap>
        <img src={`${urlport}${image}`} alt={`Image of ${name}`} />
      </ImgWrap>
      <FlexBox $direction="column" $padding="0.5em 1em" $gap="1em">
        <Heading>{name}</Heading>

        <Overview>
          <div>
            <span>Rating: </span>
            <Rating>
              <p>{avgRating}</p>
              <FaStar color="var(--color-golden-300)" />
            </Rating>
          </div>
          <div>
            <span>Cuisine: </span>
            {cuisine.name}
          </div>
          <div>
            <span>Dietary Preference: </span>
            {diet.name}
          </div>
          <div>
            <span>Difficulty Level: </span>
            {difficulty.name}
          </div>
        </Overview>
        <IngredientsTable>
          <Heading as="h4">Ingredients</Heading>
          <List>
            {ingredients.map((i) => (
              <p key={i}>{i}</p>
            ))}
          </List>
        </IngredientsTable>
        <Instructions>
          {instructionSteps.map((step, i) => (
            <Step key={i}>
              <span>Step {i + 1}</span>
              <p>
                {step}. Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Nihil consequuntur hic doloremque qui quae voluptatem
                dolorem eius ipsam iure, voluptatum, aperiam sunt officiis, sed
                alias neque maxime asperiores repellendus ea!
              </p>
            </Step>
          ))}
        </Instructions>
        <CommentSection id={recipeId} />
      </FlexBox>
    </Container>
  );
}
