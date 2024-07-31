import React from "react";
import styled from "styled-components";
import { buttonShadow } from "../styles/optionStyles";
import { css } from "@emotion/react";

export const StyledUploader = styled.div<{ $image: string | null }>`
  height: 25rem;
  overflow: hidden;
  border-radius: 15px;
  background-color: var(--color-brown-200);
  background-image: url("../../public/upload.svg");
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

export interface UploaderProps {
  image: string | null;
  children: React.ReactNode;
}

export default function Uploader({ image, children }: UploaderProps) {
  //   console.log("image:", image?.slice(0, 30));
  return <StyledUploader $image={image}>{children}</StyledUploader>;
}
