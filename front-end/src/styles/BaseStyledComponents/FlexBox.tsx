import styled, { css } from "styled-components";
import { boxShadow } from "../optionStyles";

export interface FlexBoxProps {
  $padding: string;
  $gap: string;
  $direction: "row" | "column";
  $wrap: "wrap" | "nowrap" | "wrap-reverse";
  $flow:
    | "wrap"
    | "row wrap"
    | "row-reverse nowrap"
    | "column wrap-reverse"
    | "column wrap";
  $justify:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  $items: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  $self: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  $flex: string;
  $boxShadow: string;
}

export const FlexBox = styled.div<Partial<FlexBoxProps>>`
  padding-block: 0.2em;
  display: flex;
  gap: 1em;
  ${(props) =>
    props.$padding &&
    css`
      padding: ${props.$padding};
    `}

  ${(props) =>
    props.$gap &&
    css`
      gap: ${props.$gap};
    `}
  ${(props) =>
    props.$direction &&
    css`
      flex-direction: ${props.$direction};
    `}
  ${(props) =>
    props.$flow &&
    css`
      flex-flow: ${props.$flow};
    `}
  ${(props) =>
    props.$justify &&
    css`
      justify-content: ${props.$justify};
    `}
    
    ${(props) =>
    props.$items &&
    css`
      align-items: ${props.$items};
    `}
    ${(props) =>
    props.$wrap &&
    css`
      flex-wrap: ${props.$wrap};
    `}
    ${(props) =>
    props.$flex &&
    css`
      flex: ${props.$flex};
    `}
    ${(props) =>
    props.$boxShadow &&
    css`
      ${boxShadow[$boxShadow]}
    `}
`;
