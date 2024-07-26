import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useState } from "react";

export interface AppLayoutProps {}

export default function AppLayout() {
  const [isToggle, setIsToggle] = useState("false");

  function handleToggle() {
    setIsToggle((prev) => (prev === "false" ? "true" : "false"));
  }

  return (
    <>
      <NavBar handleToggle={handleToggle} layout="main" />
      {/* <SearchProvider> */}
      <Outlet />
      <SideBar isToggle={isToggle} handleToggle={handleToggle} />
      {/* </SearchProvider> */}
      <Footer />
    </>
  );
}
