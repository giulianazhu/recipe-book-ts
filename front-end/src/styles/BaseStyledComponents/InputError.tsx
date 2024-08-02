import { css } from "@emotion/react";
import styled from "styled-components";

export const InputError = styled.span<{ $color?: string; $size?: string }>`
  color: var(--color-red-500);
  font-style: italic;
  font-size: 1.2rem;
  ${(props) =>
    props.$color &&
    css`
      color: ${props.$color};
    `}
  ${(props) =>
    props.$size &&
    css`
      font-size: ${props.$size};
    `}
`;
