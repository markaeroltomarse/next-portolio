import { ThemeContext } from "@contexts/theme.context";
import { useContext } from "react";

export default function useTheme() {
  return useContext(ThemeContext);
}
