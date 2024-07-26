import { useState } from "react";

export default function useToggle() {
  const [toggle, setToggle] = useState<boolean>(false);

  function handleToggle() {
    setToggle((prev) => !prev);
  }

  function enableToggle() {
    setToggle(true);
  }

  function disableToggle() {
    setToggle(false);
  }

  return { toggle, handleToggle, enableToggle, disableToggle };
}
