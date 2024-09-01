import { FlexBox } from "../styles/BaseStyledComponents/FlexBox";
import styled from "styled-components";
import { media } from "../styles/optionStyles";
import { pageSizeOptions, sortOptionNames } from "../utils/constants";
import React from "react";
import PagingBox from "./PagingBox";
import useFilterContext from "../contexts/useFilterContext";

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

const BottomPage = styled.div``;

export interface PaginationProps {
  totCount: number;
  totPages: number;
  children: React.ReactNode;
  page: number;
  pageSize: number;
  onClickPage: (_e: React.ChangeEvent<unknown>, page: number) => void;
  onClickPageSize: (val: number) => void;
  onChangeSort: (option: string) => void;
}

export default function Pagination({
  totCount = 0,
  totPages = 0,
  children,
  page = 1,
  pageSize = pageSizeOptions[0],
  onClickPage,
  onClickPageSize,
  onChangeSort,
}: PaginationProps) {
  const pages = [];
  for (let i = 1; i <= totPages; i++) {
    pages.push(i);
  }

  const {
    filtersState: { sort, order },
  } = useFilterContext();

  return (
    <Container>
      <TopPage>
        <PageSizeSelect>
          <p>Found {totCount || 0} results:</p>
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
          onChange={(e) => {
            onChangeSort(e.target.value);
          }}
          defaultValue={`${sort},${order}`}
        >
          {sortOptionNames.map((option, i) => (
            <option
              value={option.value}
              key={i}
              selected={`${sort},${order}` === option.value.toString()}
            >
              {option.name}
            </option>
          ))}
        </Select>
      </TopPage>

      {children}

      <BottomPage>
        <PagingBox page={page} totPages={totPages} onClickPage={onClickPage} />
      </BottomPage>
    </Container>
  );
}
