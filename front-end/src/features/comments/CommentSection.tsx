import styled from "styled-components";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { Heading } from "../../styles/BaseStyledComponents/Heading";
import { x2boxShadow } from "../../styles/optionStyles";
import CommentForm from "./CommentForm";
import { formatDate } from "../../utils/utils";
import StarRating from "../../ui/StarRating";
import useRecipeCommentsInf from "./useRecipeCommentsInf";
import React from "react";

const Container = styled(FlexBox)`
  flex-direction: column;
  border-top: 3px solid var(--color-golden-200);
  font-size: 0.8em;
`;

const CommentList = styled(FlexBox)`
  flex-direction: column;
  gap: 3em;
  border-radius: 15px;
`;

const Comment = styled(FlexBox)`
  padding: 1em;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 15px;
  background-color: var(--color-grey-100);
  box-shadow: ${x2boxShadow.sm};
`;

const LoadMore = styled.button`
  border: none;
  background-color: inherit;
  text-decoration: underline;
  &:hover {
    color: var(--color-grey-500);
  }
`;

export interface CommentSectionProps {}

export default function CommentSection({ id }) {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecipeCommentsInf(id);

  if (isPending || isError) {
    return (
      <Container>
        <CommentForm id={id} />
        <CommentList>
          <Heading>
            {isPending ? "Loading Reviews" : "Could not retrieve reviews"}
          </Heading>
        </CommentList>
      </Container>
    );
  }

  const { pageParams, pages } = data;

  console.log(pages);

  const totCount = pages[0].totCount;

  return (
    <Container>
      <CommentForm id={id} />
      <Heading as="h3">{totCount} Reviews</Heading>
      <CommentList>
        {pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {page.data.map((c) => (
              <Comment key={c.id}>
                <FlexBox $items="baseline">
                  <Heading as="h4">{c.id}</Heading>
                  <div>posted on {formatDate(c.date)}</div>
                </FlexBox>
                <FlexBox $items="center" $gap="0.3em">
                  <StarRating
                    value={c.rating}
                    color="var(--color-golden-300)"
                  />
                  {c.rating}
                </FlexBox>
                <div>{c.comment}</div>
              </Comment>
            ))}
          </React.Fragment>
        ))}
        <LoadMore
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load more"
            : "End"}
        </LoadMore>
      </CommentList>
    </Container>
  );
}
