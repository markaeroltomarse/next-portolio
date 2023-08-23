import { useCallback } from "react";
import useAppSelector from "./app-selector.hook";

const useThemeStyle = () => {
  const isDark = useAppSelector((store) => store.components.isDarkMode);
  const validateTheme = useCallback(
    (light: string, dark: string) => {
      if (isDark) return dark;

      return light;
    },
    [isDark]
  );

  return {
    validateTheme,
  };
};

export default useThemeStyle;
