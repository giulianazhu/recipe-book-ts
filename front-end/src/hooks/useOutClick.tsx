import { useEffect } from "react";

export default function useOutClick(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(
    function () {
      function listener(e: MouseEvent | TouchEvent) {
        if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
          return;
        }
        handler();
      }
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}
