import { useState } from "react";

export default function useToggle() {
  const [toggle, setToggle] = useState(false);

  const [mainVisible, setMainVisible] = useState(true);

  function handleToggle() {
    setToggle((prev) => !prev);
    setMainVisible((prev) => !prev);
  }

  function enableToggle() {
    setToggle(true);
    setMainVisible(false);
  }

  function disableToggle() {
    setToggle(false);
    setMainVisible(true);
  }

  return { toggle, mainVisible, handleToggle, enableToggle, disableToggle };
}
