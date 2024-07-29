import styled from "styled-components";

export interface FooterProps {}

const StyledFooter = styled.footer`
  min-height: 300px;
  background-color: var(--color-brown-200);
`;

export default function Footer() {
  return <StyledFooter>Footer</StyledFooter>;
}
