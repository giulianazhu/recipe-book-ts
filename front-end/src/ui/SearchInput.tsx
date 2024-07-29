import { FaSearch } from "react-icons/fa";
import { Label } from "../styles/BaseStyledComponents/Form";
import { Heading } from "../styles/BaseStyledComponents/Heading";
import styled from "styled-components";
import { FlexBox } from "../styles/BaseStyledComponents/FlexBox";
import { boxShadow, buttonShadow } from "../styles/optionStyles";

const StyledSearchInput = styled.span`
  overflow: hidden;
  display: flex;
  border-radius: 15px;
  background-color: var(--color-grey-200);
  /* box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.2); */
  box-shadow: ${buttonShadow.smLight};

  & input {
    all: initial;
    padding: 0.2em 0em 0.2em 0.5em;
    flex: 0 1 100%;
    font: inherit;
    color: var(--color-grey-700);
  }
  & button {
    //button wrapping search logo svg
    all: initial;
    margin-inline-start: auto;
    width: 50px;
    height: 50px;
    flex: 0 0 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-brown-300);
    color: var(--color-grey-700);
    box-shadow: ${boxShadow.sm};
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
  & svg {
    width: 100%;
  }
`;

export interface SearchInputProps {
  name: string;
  onChange: (e) => void;
  id: string | number;
  value: string;
  onSubmit: () => void;
  label: string;
}

export default function SearchInput({
  name,
  onChange,
  id,
  value,
  onSubmit,
  label,
}: SearchInputProps) {
  return (
    <FlexBox $direction="column">
      <Label htmlFor="q">
        <Heading as="h4">{label}</Heading>
      </Label>
      <StyledSearchInput>
        <input
          type="text"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        />
        <button type="submit" onClick={onSubmit}>
          <FaSearch />
        </button>
      </StyledSearchInput>
    </FlexBox>
  );
}
