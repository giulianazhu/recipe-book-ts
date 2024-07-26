import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import useToggle from "../hooks/useToggle";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto minmax(100vh, 1fr) auto;
  background-color: var(--color-beige-100); //to be removed
`;

export default function AppLayout() {
  const { toggle, handleToggle } = useToggle();

  return (
    <StyledAppLayout>
      <NavBar onToggle={handleToggle} view="desktop" />
      {/* <SearchProvider> */}
      <Outlet />
      <SideBar toggle={toggle} onToggle={handleToggle} />
      {/* </SearchProvider> */}
      <Footer />
    </StyledAppLayout>
  );
}
