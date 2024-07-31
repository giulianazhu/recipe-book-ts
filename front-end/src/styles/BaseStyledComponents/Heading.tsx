import styled, { css } from "styled-components";

export const Heading = styled.h1<{ $color?: string }>`
  padding-block: 0.5em;
  ${(props) =>
    props.$color &&
    css`
      color: ${props.$color};
    `}
`;
