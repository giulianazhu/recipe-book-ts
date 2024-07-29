import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import useToggle from "../hooks/useToggle";
import styled, { css } from "styled-components";
import FilterProvider from "../contexts/FilterContext";

const StyledAppLayout = styled.div<{ $visible: boolean }>`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto minmax(100vh, 1fr) auto;
  ${(props) =>
    !props.$visible &&
    css`
      max-height: 100vh;
      overflow: hidden;
    `}
  background-color: var(--color-brown-200);
`;

const Container = styled.div<{ $visible: boolean }>``;

export default function AppLayout() {
  const { toggle, mainVisible, handleToggle } = useToggle();

  return (
    <StyledAppLayout $visible={mainVisible}>
      <NavBar onToggle={handleToggle} view="desktop" />
      <FilterProvider>
        <Container $visible={mainVisible}>
          <Outlet />
        </Container>
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </FilterProvider>
      <Footer />
    </StyledAppLayout>
  );
}
