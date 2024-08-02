import { FaSearch } from "react-icons/fa";
import { Label } from "../styles/BaseStyledComponents/Form";
import { Heading } from "../styles/BaseStyledComponents/Heading";
import styled from "styled-components";
import { FlexBox } from "../styles/BaseStyledComponents/FlexBox";
import { boxShadow, buttonShadow } from "../styles/optionStyles";

const StyledSearchInput = styled.span`
  height: 3em;
  overflow: hidden;
  display: flex;
  border-radius: 15px;
  background-color: var(--color-grey-200);
  box-shadow: ${buttonShadow.sm_light};
  & input {
    all: initial;
    padding: 0.5em;
    flex: 0 1 100%;
    font: inherit;
    color: var(--color-grey-700);
  }
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5em;
    border: none;
    background-color: var(--color-brown-300);
    box-shadow: ${boxShadow.sm};
    cursor: pointer;
    &:hover {
      color: var(--color-brown-100);
    }
  }
`;

export interface SearchInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value: string;
  onSubmit?: () => void;
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
