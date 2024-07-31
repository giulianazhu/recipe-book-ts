import { css } from "@emotion/react";
import { FlexBox } from "../styles/BaseStyledComponents/FlexBox";
import styled from "styled-components";
import { buttonShadow, media } from "../styles/optionStyles";
import { pageSizeOptions } from "../utils/constants";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Container = styled.div`
  padding: 0.5em 1.5em;
  min-height: 150vh; //keep page height constant
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  gap: 2em;
  font-size: 1.3rem;
  ${media.xs} {
    padding-inline: 0.1em;
  }
`;

const TopPage = styled(FlexBox)`
  justify-content: space-between;
  ${media.lg} {
    flex-direction: column;
  }
`;

const PageSizeSelect = styled(FlexBox)`
  flex-wrap: wrap;
  gap: 0.2em 0.5em;
`;

const PageSizeOption = styled.button`
  all: initial;
  font: inherit;
  text-decoration: underline;
  color: var(--color-grey-400);
  cursor: pointer;
  &:disabled {
    color: inherit;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.3em;
  border: 1px solid var(--color-grey-300);
  border-radius: 15px;
  &:focus {
    outline: none;
  }
  ${media.lg} {
    align-self: flex-end;
  }
`;

const BottomPage = styled(FlexBox)`
  align-items: center;
  justify-self: center;
`;

const PageLabel = styled.button<{ $current?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-grey-300);
  border-radius: 50%;
  background-color: var(--color-grey-200);
  box-shadow: ${buttonShadow.sm_dark};
  &:hover {
    border: 1px solid var(--color-brown-400);
  }
  ${(props) =>
    props.$current &&
    css`
      border: 1px solid var(--color-golden-200);
      background-color: var(--color-golden-300);
      color: white;
    `}
`;

const PageButton = styled(PageLabel)`
  background-color: var(--color-grey-100);
  border-color: var(--color-grey-200);
  &:hover {
    background-color: var(--color-grey-200);
  }
  &:disabled {
    box-shadow: none;
    color: var(--color-grey-400);
    &:hover {
      background-color: var(--color-grey-100);
      border: none;
    }
  }
`;

export interface PaginationProps {}

export default function Pagination({
  totCount,
  totPages,
  children,
  page,
  pageSize,
  onClickPage,
  onClickPageSize,
}) {
  const pages = [];
  for (let i = 1; i <= totPages; i++) {
    pages.push(i);
  }

  return (
    <Container>
      <TopPage>
        <PageSizeSelect>
          <p>Found {totCount} results:</p>
          {pageSizeOptions.map((size) => (
            <PageSizeOption
              key={size}
              disabled={pageSize === size}
              onClick={() => onClickPageSize(size)}
            >{`Show 0-${size} items`}</PageSizeOption>
          ))}
        </PageSizeSelect>
        <Select
          name="_sort"
          id="_sort"
          onChange={() => alert("Yet to apply feature")}
        >
          <option value="-id">Most recent</option>
          <option value="id">Least recent</option>
        </Select>
      </TopPage>

      {children}

      <BottomPage>
        <PageButton disabled={page === 1} onClick={() => onClickPage(page - 1)}>
          <RiArrowLeftSLine />
        </PageButton>
        {pages.map((p) => (
          <PageLabel
            $current={p === page}
            onClick={() => onClickPage(p)}
            key={p}
          >
            {p}
          </PageLabel>
        ))}
        <PageButton
          disabled={page === totPages}
          onClick={() => onClickPage(page + 1)}
        >
          <RiArrowRightSLine />
        </PageButton>
      </BottomPage>
    </Container>
  );
}
