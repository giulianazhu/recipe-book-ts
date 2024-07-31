import { css } from "@emotion/react";
import styled from "styled-components";
import { buttonShadow } from "../optionStyles";

// ref: https://dev.to/danireptor/how-to-style-and-customize-html-file-input-in-react-54fo
export const Uploader = styled.div<{ $image: string | null }>`
  height: 25rem;
  overflow: hidden;
  border-radius: 15px;
  background-color: var(--color-brown-200);
  background-image: url("upload.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  box-shadow: ${buttonShadow.md_light};
  & input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  ${(props) =>
    props.$image &&
    css`
      background-image: ${`url(${props.$image})`};
      /* background-color: var(--color-brown-300); */
      /* background-position: center; */
      background-size: cover;
      /* background-repeat: no-repeat; */
    `}
`;
