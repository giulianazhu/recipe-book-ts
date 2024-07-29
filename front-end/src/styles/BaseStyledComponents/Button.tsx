import styled, { css } from "styled-components";
import { buttonShadow } from "../optionStyles";

const roles = {
  primary: css`
    background-color: var(--color-brown-400);
    color: white;
    &:hover {
      background-color: var(--color-brown-500);
    }
  `,
  secondary: css`
    border: 1px solid var(--color-brown-400);
    color: var(--color-brown-400);
    &:hover {
      background-color: var(--color-brown-100);
    }
  `,
  tertiary: css`
    color: var(--color-brown-400);
    text-decoration: underline;
    &:hover {
      color: var(--color-brown-500);
    }
  `,
};

interface Button {
  $role?: "primary" | "secondary" | "tertiary";
  $size?: string;
  $padding?: string;
}

export const Button = styled.button<Button>`
  border: none;
  border-radius: 15px;
  padding: 0.2em 0.5em;
  transform: scale(1.02);
  box-shadow: ${buttonShadow.sm_dark};
  ${(props) => props.$role && roles[props.$role]}
  ${(props) =>
    props.$size &&
    css`
      font-size: ${props.$size};
    `}
  ${(props) =>
    props.$padding &&
    css`
      padding: ${props.$padding};
    `}
`;
