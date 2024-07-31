import styled, { css } from "styled-components";
import { media } from "../styles/optionStyles";
import { useRef } from "react";
import useOutClick from "../hooks/useOutClick";
import { FlexBox } from "../styles/BaseStyledComponents/FlexBox";
import { Link, Toggler } from "./NavBar";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchBox from "../features/search/SearchBox";
import useFilters from "../features/search/useFilters";

const Container = styled.nav<{ $visible?: boolean }>`
  position: fixed;
  top: 0;
  z-index: 100;
  height: 100vh;
  overflow-y: scroll;
  display: none;
  background-color: var(--color-brown-100);
  transition: left 0.5s ease-in-out;

  ${media.md} {
    display: flex;
    flex-flow: column;
    max-width: 100%;
    ${(props) =>
      props.$visible
        ? css`
            left: 0;
          `
        : css`
            left: -120%;
          `}
  }
`;

export interface SideBarProps {
  toggle: boolean;
  onToggle: () => void;
}

export default function SideBar({ toggle, onToggle }: SideBarProps) {
  const { cuisines, diets, difficulties, isPending, isError, error } =
    useFilters();

  const elementRef = useRef<HTMLDivElement | null>(null);

  function handleOutClick() {
    if (toggle) {
      onToggle();
    }
  }

  useOutClick(elementRef, handleOutClick);

  if (isPending) return <div>Loading...</div>;

  const filters = {
    cuisines,
    diets,
    difficulties,
    isError,
    error,
  };

  return (
    <Container $visible={toggle} ref={elementRef}>
      <FlexBox $justify="space-between" $items="center">
        <Toggler>
          <RxHamburgerMenu onClick={onToggle} />
        </Toggler>
        <FlexBox $justify="flex-end" $gap="1em">
          <Link to="/add" onClick={onToggle}>
            Add Recipe
          </Link>
          <Link to="/search" onClick={onToggle}>
            Dummy
          </Link>
        </FlexBox>
      </FlexBox>
      <SearchBox onSearchSubmit={onToggle} filters={filters} />
    </Container>
  );
}
