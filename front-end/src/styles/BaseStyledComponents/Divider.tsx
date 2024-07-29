import styled from "styled-components";
import { media } from "../optionStyles";

export const Divider = styled.div`
  margin-inline: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.2);
  ${media.md} {
    display: none;
  }
`;
