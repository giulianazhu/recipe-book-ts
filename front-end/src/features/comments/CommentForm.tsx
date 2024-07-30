import { Button } from "../../styles/BaseStyledComponents/Button";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { Heading } from "../../styles/BaseStyledComponents/Heading";
import { buttonShadow } from "../../styles/optionStyles";
import StarRating from "../../ui/StarRating";
import styled from "styled-components";
import useAddComment from "./useAddComment";
import { Controller, useForm } from "react-hook-form";
import Error from "../../ui/Error";
import { InputError } from "../../styles/BaseStyledComponents/InputError";

const Textarea = styled.textarea`
  padding: 0.5em;
  width: 100%;
  border: none;
  border-radius: 15px;
  background-color: var(--color-grey-200);
  &:focus {
    outline: none;
  }
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1em;
`;

const FormButton = styled(Button)`
  background-color: var(--color-brown-400);
  color: white;
  box-shadow: ${buttonShadow.sm_dark};
  &:hover {
    background-color: var(--color-brown-500);
    transform: scale(1.02);
  }
`;

export interface CommentFormProps {}

export default function CommentForm({ id }) {
  const {
    mutate: handleAddComment,
    isPending,
    isError,
    error,
  } = useAddComment(id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    data.date = new Date().toISOString();
    data.rating = parseInt(data.rating);
    console.log("data sent", JSON.stringify(data));
    handleAddComment(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  if (isError)
    return <Error>{error?.message ?? "Error: Try again later"}</Error>;

  return (
    <FlexBox $direction="column">
      <Heading as="h3">Leave a Review</Heading>
      <Controller
        control={control}
        name="rating"
        rules={{ required: "Rating is required" }}
        render={({ field: { onChange, value } }) => (
          <StarRating
            onChange={onChange}
            name="rating"
            isPending={isPending}
            value={value}
            color="var(--color-golden-300)"
            size="large"
          />
        )}
        disabled={isPending}
      />
      <InputError>{errors?.rating && errors?.rating?.message}</InputError>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          name="comment"
          id="comment"
          rows={5}
          {...register("comment", { disabled: isPending })}
          placeholder="Write something..."
        ></Textarea>
        <FormButton>{!isPending ? "Post Review" : "Posting..."}</FormButton>
      </Form>
    </FlexBox>
  );
}
