import { useState } from "react";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { Uploader } from "../../styles/BaseStyledComponents/Uploader";
import useFilters from "../search/useFIlters";
import useAddRecipe from "./useAddRecipe";
import { useForm } from "react-hook-form";
import { Button } from "../../styles/BaseStyledComponents/Button";
import styled from "styled-components";
import Loader from "../../ui/Loader";
import { buttonShadow, media, x2boxShadow } from "../../styles/optionStyles";
import { InputError } from "../../styles/BaseStyledComponents/InputError";

const Container = styled.div`
  margin: 1em 15%;
  padding: 2em;
  height: max-content;
  border-radius: 15px;
  box-shadow: ${x2boxShadow.md};
  font-size: 1.3rem;
  ${media.xl} {
    margin-inline: 10%;
  }
  ${media.md} {
    margin: 1em 0;
    padding: 1em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const Section = styled.section`
  padding: 1em;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1em;
  border-radius: 15px;
  background-color: var(--color-grey-200);
  box-shadow: ${x2boxShadow.sm};
  ${media.xl} {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  ${media.xl} {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  ${InputError} {
    font-weight: normal;
    &::before {
      content: " ";
    }
  }
`;

const Content = styled(FlexBox)`
  flex-direction: column;
`;

const FormRow = styled(FlexBox)`
  flex-direction: column;
  gap: 0.5em;
`;

const Input = styled.input`
  padding: 0.3em 0.5em;
  max-width: 100%;
  border-radius: 15px;
  border: 1px solid var(--color-grey-200);
  box-shadow: ${buttonShadow.sm_light};
  &:focus {
    outline: none;
    box-shadow: ${buttonShadow.md_light};
    background-color: var(--color-brown-200);
  }
`;

const Select = styled(Input)`
  width: 50%;
  gap: 1em;
  &:focus {
    background-color: white;
  }
  ${media.xl} {
    width: 100%;
  }
`;

const FormButton = styled(Button)`
  padding: 0.5em 1em;
  align-self: center;
`;

export interface AddRecipeFormProps {}

export default function AddRecipeForm() {
  const [isUploaded, setIsUploaded] = useState<string | null>(null);
  const [filename, setFilename] = useState("");
  console.log({ isUploaded, filename });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      ingredients: "",
      instructions: "",
      cuisineId: "",
      dietId: "",
      difficultyId: "",
      image: null,
    },
    // mode: "onBlur",
  });

  const { cuisines, diets, difficulties, isPending: isLoading } = useFilters();

  const { mutate: handleAddRecipe, isPending, isError, error } = useAddRecipe();

  function handleUpload(file) {
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        setIsUploaded(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function onSubmit(data) {
    const formData = new FormData();
    for (let props in data) {
      formData.append(props, data[props]);
    }
    formData.set("image", data.image[0]);

    handleAddRecipe(formData, {
      onSuccess: (data) => {
        reset();
        setIsUploaded(null);
        setFilename("");
        console.log(data);
      },
    });
  }

  if (isLoading) return <Loader />;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Section>
          <Title>Recipe Details</Title>

          <Content>
            <FormRow>
              <Label htmlFor="name">
                Recipe Name
                <InputError>{errors?.name && errors?.name?.message}</InputError>
              </Label>
              <Input
                type="text"
                id="name"
                {...register("name", {
                  required: "*required",
                  disabled: isPending,
                })}
              />
            </FormRow>
            <FormRow>
              <Label htmlFor="ingredients">
                Ingredients
                <InputError>
                  {errors?.ingredients && errors?.ingredients?.message}
                </InputError>
              </Label>
              <Input
                as="textarea"
                id="ingredients"
                {...register("ingredients", {
                  required: "*required",
                  disabled: isPending,
                })}
              ></Input>
            </FormRow>
            <FormRow>
              <Label htmlFor="instructions">
                Instructions
                <InputError>
                  {errors?.instructions && errors?.instructions?.message}
                </InputError>
              </Label>
              <Input
                as="textarea"
                id="instructions"
                {...register("instructions", {
                  required: "*required",
                  disabled: isPending,
                })}
              />
            </FormRow>
          </Content>
        </Section>
        <Section>
          <Title>Categories</Title>
          <Content>
            <FormRow>
              <Label htmlFor="cuisineId">
                Cuisine
                <InputError>
                  {errors?.cuisineId && errors?.cuisineId?.message}
                </InputError>
              </Label>
              <Select
                as="select"
                id="cuisineId"
                {...register("cuisineId", {
                  required: "*Required",
                  disabled: isPending,
                })}
              >
                {cuisines.map((cuisine) => (
                  <option value={cuisine.id} key={cuisine.id}>
                    {cuisine.name}
                  </option>
                ))}
              </Select>
            </FormRow>
            <FormRow>
              <Label htmlFor="dietId">
                Diet
                <InputError>
                  {errors?.dietId && errors?.dietId?.message}
                </InputError>
              </Label>
              <Select
                as="select"
                id="dietId"
                {...register("dietId", {
                  required: "*Required",
                  disabled: isPending,
                })}
              >
                {diets.map((diet) => (
                  <option value={diet.id} key={diet.id}>
                    {diet.name}
                  </option>
                ))}
              </Select>
            </FormRow>
            <FormRow>
              <Label htmlFor="difficultyId">
                Difficulty
                <InputError>
                  {errors?.difficultyId && errors?.difficultyId?.message}
                </InputError>
              </Label>
              <Select
                as="select"
                id="difficultyId"
                {...register("difficultyId", {
                  required: "*Required",
                  disabled: isPending,
                })}
              >
                {difficulties.map((difficulty) => (
                  <option value={difficulty.id} key={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </Select>
            </FormRow>
          </Content>
        </Section>
        <Section>
          <Title>Image</Title>
          <Content>
            <FormRow>
              <Label htmlFor="image">
                {isUploaded ? `Image chosen: ${filename}` : "Upload a image"}
                <InputError>
                  {errors?.image && errors?.image?.message}
                </InputError>
              </Label>
              <Uploader
                $image={isUploaded}
                //cant seem to make it work by passing prop
                style={
                  isUploaded
                    ? { backgroundImage: `url(${isUploaded})` }
                    : { backgroundImage: `url(${"../../public/upload.svg"})` }
                }
              >
                <input
                  type="file"
                  id="image"
                  {...register("image", {
                    required: "*required",
                    disabled: isPending,
                  })}
                  onChange={async (e) => handleUpload(e.target.files[0])}
                />
              </Uploader>
            </FormRow>
          </Content>
        </Section>
        <FormButton disabled={isPending} $role="primary">
          {isPending ? "Submitting" : "Submit"}
        </FormButton>
      </Form>
    </Container>
  );
}
