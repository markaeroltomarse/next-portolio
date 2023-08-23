import { useEffect, useState } from "react";

interface Breakpoints {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

const useBreakpoints = (): Breakpoints => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const breakpoints: Breakpoints = {
    xs: windowWidth < 576,
    sm: windowWidth >= 576 && windowWidth < 768,
    md: windowWidth >= 768 && windowWidth < 992,
    lg: windowWidth >= 992 && windowWidth < 1200,
    xl: windowWidth >= 1200,
  };

  return breakpoints;
};

export default useBreakpoints;
