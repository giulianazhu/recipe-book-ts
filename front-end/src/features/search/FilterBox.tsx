import styled, { css } from "styled-components";
import useFilterContext from "../../contexts/useFilterContext";
import { FlexBox } from "../../styles/BaseStyledComponents/FlexBox";
import { Heading } from "../../styles/BaseStyledComponents/Heading";
import { boxShadow } from "../../styles/optionStyles";

const Filter = styled.label<{ $checked?: boolean }>`
  padding: 0.5em 0.8em;
  border-radius: 15px;
  background-color: var(--color-brown-300);
  font-size: 0.8em;
  color: white;
  cursor: pointer;
  box-shadow: ${boxShadow.sm};

  &:hover {
    background-color: var(--color-beige-500);
  }
  ${(props) =>
    props.$checked &&
    css`
      background-color: var(--color-beige-500);
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

export interface FilterBoxProps {}

export default function FilterBox({ options, label, name }) {
  const { filtersState, setFilter } = useFilterContext();

  return (
    <FlexBox $direction="column" $padding="0.5em 0">
      <Heading as="h5" $color="var(--color-brown-500)">
        {label}
      </Heading>
      <FlexBox $flow="wrap" $padding="0">
        {options.map((option) => (
          <Filter
            htmlFor={option.name}
            key={option.name}
            $checked={filtersState[name] === option.id}
          >
            {option.name}
            <input
              type="radio"
              id={option.name}
              name={name}
              value={option.id}
              checked={filtersState[name] === option.id}
              onChange={() => setFilter(name, option.id)}
            />
          </Filter>
        ))}
      </FlexBox>
    </FlexBox>
  );
}
