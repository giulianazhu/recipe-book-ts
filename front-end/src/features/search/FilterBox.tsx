import styled, { css } from "styled-components";
import useFilterContext from "../../contexts/useFilterContext";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { Heading } from "../../styles/BaseStyledComponents/Heading";
import { buttonShadow } from "../../styles/optionStyles";
import { CategoryType } from "../../types/data";

const Filter = styled.label<{ $checked?: boolean }>`
  padding: 0.5em 0.8em;
  border-radius: 15px;
  border: 1px solid var(--color-brown-200);
  color: var(--color-brown-500);
  font-size: 0.9em;
  cursor: pointer;
  box-shadow: ${buttonShadow.sm_dark};

  &:hover {
    background-color: var(--color-grey-200);
  }
  ${(props) =>
    props.$checked &&
    css`
      color: var(--color-brown-900);
      background-color: var(--color-grey-200);
      transform: scale(1.05);
    `}
  & label {
    cursor: inherit;
  }
  & input {
    /* display: none; */ //works but just in case...
    /* visibility: hidden;doesnt remove the radio button space*/
    opacity: 0; //fallback for older browers??? but like visibility does not remove taken space
    appearance: none;
  }
`;

export interface FilterBoxProps {
  filterOptions: CategoryType[] | undefined;
  filterType: string;
  fieldName: string;
}

export default function FilterBox({
  filterOptions,
  filterType,
  fieldName,
}: FilterBoxProps) {
  const { filtersState, handleFilter } = useFilterContext();

  return (
    <FlexBox $direction="column" $padding="0.5em 0">
      <Heading as="h5" $color="var(--color-brown-500)">
        {filterType}
      </Heading>
      <FlexBox $flow="wrap" $padding="0">
        {filterOptions?.map((option) => (
          <Filter
            htmlFor={option.name}
            key={option.name}
            $checked={filtersState[fieldName] === option.id}
          >
            {option.name}
            <input
              type="radio"
              id={option.name}
              name={fieldName}
              value={option.id}
              checked={filtersState[fieldName] === option.id}
              onChange={() => handleFilter(fieldName, option.id)}
            />
          </Filter>
        ))}
      </FlexBox>
    </FlexBox>
  );
}
