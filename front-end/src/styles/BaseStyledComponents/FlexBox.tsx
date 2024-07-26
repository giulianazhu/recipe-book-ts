import styled, { css } from "styled-components";

export interface FlexBoxProps {
  $gap: string;
  $direction: "row" | "column";
  $wrap: "wrap" | "nowrap" | "wrap-reverse";
  $flow:
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
  $items: "flex-start" | "center" | "flex-end" | "stretch";
  $self: "flex-start" | "center" | "flex-end" | "stretch";
  $flex: string;
}

export const FlexBox = styled.div<Partial<FlexBoxProps>>`
  padding: 0.2em;
  display: flex;
  gap: 1em;

  ${(props) =>
    props.$gap &&
    css`
      gap: ${props.$gap};
    `}
  ${(props) =>
    props.$flow &&
    css`
      flex-direction: ${props.$flow};
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
`;
