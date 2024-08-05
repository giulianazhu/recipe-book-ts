import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollTop } from "../utils/utils";

export interface ScrollToTopProps {
  children: React.ReactNode;
}

export default function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollTop();
  }, [pathname]);

  return <>{children}</>;
}
