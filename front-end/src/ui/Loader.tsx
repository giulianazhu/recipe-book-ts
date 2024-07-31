import styled, { keyframes } from "styled-components";
import { Heading } from "../styles/BaseStyledComponents/Heading";

const rotate = keyframes`
  0% {
    transform: rotate(-30deg);
  }
  100%{
    transform: rotate(30deg)
  }
`;

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadWrap = styled.div`
  padding-block-end: 10rem;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const LoadHeading = styled(Heading)`
  font-size: 2.5rem;
  color: var(--color-brown-500);
`;

const LoadLogo = styled.div`
  width: 25%;
  height: 25%;
  animation: ${rotate} 1.5s alternate-reverse infinite;
`;

export interface LoaderProps {}

export default function Loader() {
  return (
    <StyledLoader>
      <LoadWrap>
        <LoadHeading as="h1">Loading...</LoadHeading>
        <LoadLogo>
          <img src="hat.svg" alt="Freepik_flowicon" />
        </LoadLogo>
      </LoadWrap>
    </StyledLoader>
  );
}
