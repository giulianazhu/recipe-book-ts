import styled, { css } from "styled-components";

interface Box {
  padding: string;
}

export const Box = styled.div<Box>`
  padding-block: 0.2em;
  ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}
`;
