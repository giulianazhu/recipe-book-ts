import styled, { css } from "styled-components";
import { media } from "../styles/optionStyles";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 2em;
  background-color: white;
  opacity: 0.7;
  ${media.md} {
    background-image: url("/chef.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const Logo = styled(NavLink)`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  flex: 0 0 3rem;
  border-radius: 50%;
  background-color: var(--color-beige-200);
  &:hover {
    background-color: red;
  }
  ${media.md} {
    display: none;
  }
`;

export const Toggler = styled.button`
  all: initial;
  display: none;
  color: inherit;
  font-size: 2.5em;
  cursor: pointer;
  &:hover {
    color: var(--color-beige-400);
  }
  ${media.md} {
    display: flex;
    align-items: center;
  }
`;

export const Link = styled(NavLink)<{ $view?: string }>`
  padding: 0.2em 0.5em;
  font-size: 1.8rem;
  &:hover {
    color: var(--color-orange-900);
  }
  ${(props) =>
    props.$view === "desktop" &&
    css`
      ${media.md} {
        display: none;
      }
    `}
`;

export interface NavBarProps {
  onToggle: () => void;
  view: "desktop" | "mobile";
}

export default function NavBar({ onToggle, view }: NavBarProps) {
  return (
    <Container>
      <Logo to="/search">
        <img src="chef.svg" alt="from_Freepik" />
      </Logo>
      <Toggler>
        <RxHamburgerMenu onClick={onToggle} />
      </Toggler>
      <Link to="/search" $view={view}>
        Search
      </Link>
      <Link to="/add" $view={view}>
        Add Recipe
      </Link>
      <Link to="/searchinf" $view={view}>
        Search_Inf
      </Link>
    </Container>
  );
}
