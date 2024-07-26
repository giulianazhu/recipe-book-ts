import styled, { css } from "styled-components";
import { media } from "../styles/optionStyles";
import { useRef } from "react";
import useOutClick from "../hooks/useOutClick";
import { FlexBox } from "../styles/BaseStyledComponents/FlexBox";
import { Link, Toggler } from "./NavBar";
import { RxHamburgerMenu } from "react-icons/rx";

const Container = styled.nav<{ $visible: boolean }>`
  position: fixed;
  z-index: 100;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  overflow: auto;
  display: none;
  background-color: #fff9f8;
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

const StyledNavSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2em;
`;

export interface SideBarProps {
  toggle: boolean;
  onToggle: () => void;
}

export default function SideBar({ toggle, onToggle }: SideBarProps) {
  // const { cuisines, diets, difficulties, isPending, isError, error } =
  //   useFilters();

  const elementRef = useRef<HTMLDivElement | null>(null);

  function handleOutClick() {
    if (toggle) {
      onToggle();
    }
  }

  useOutClick(elementRef, handleOutClick);

  // if (isPending)
  //   return (
  //     <StyledSideBar>
  //       <Loader />;
  //     </StyledSideBar>
  //   );

  // const useFiltersData = {
  //   cuisines,
  //   diets,
  //   difficulties,
  //   isError,
  //   error,
  // };

  return (
    <Container $visible={toggle} ref={elementRef}>
      <FlexBox $justify="space-between" $items="center">
        <Toggler>
          <RxHamburgerMenu onClick={onToggle} />
        </Toggler>
        <StyledNavSection>
          <Link to="/add" onClick={onToggle}>
            Add Recipe
          </Link>
          <Link to="/searchinf" onClick={onToggle}>
            Dummy
          </Link>
        </StyledNavSection>
      </FlexBox>
      {/* <SearchBox handleToggle={onToggle} useFiltersData={useFiltersData} /> */}
    </Container>
  );
}
