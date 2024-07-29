import styled from "styled-components";
import { Heading } from "../styles/BaseStyledComponents/Heading";
import { Button } from "../styles/BaseStyledComponents/Button";

const StyledError = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledErrorWrap = styled.div`
  padding-block-end: 10rem;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 1.5em;
  text-align: center;
`;

const StyledErrorHeading = styled(Heading)`
  color: var(--color-red-500);
`;

const StyledReloadButton = styled(Button)`
  padding: 0.5em 0.8em;
  border: var(--color-red-400) 2px solid;
  background-color: var(--color-red-500);
  color: var(--color-yellow-100);
  &:hover {
    border: var(--color-orange-300) 2px solid;
    background-color: var(--color-orange-500);
  }
`;

export interface ErrorProps {
  children?: React.ReactNode;
}

export default function Error({ children }: ErrorProps) {
  return (
    <StyledError>
      <StyledErrorWrap>
        <StyledErrorHeading as="h1">
          Oops! Something went wrong...
        </StyledErrorHeading>
        <Heading as="h4">{children}</Heading>
        <StyledReloadButton onClick={() => window.location.reload()}>
          Reload
        </StyledReloadButton>
      </StyledErrorWrap>
    </StyledError>
  );
}
