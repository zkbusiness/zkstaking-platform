import { useState, useEffect } from "react";

export const useScreenWidth = (breakpoint: number = 1024) => {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsNarrowScreen(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkScreenWidth();

    // Add event listener
    window.addEventListener("resize", checkScreenWidth);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, [breakpoint]);

  return isNarrowScreen;
};
