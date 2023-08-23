import Button from "@components/Inputs/Button";
import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { HiCode } from "react-icons/hi";
import { SiAboutdotme } from "react-icons/si";
export interface FloatingMenuProps {}

const FloatingMenu: React.FC<FloatingMenuProps> = (props) => {
  const {} = props;

  const router = useRouter();

  const { validateTheme } = useThemeStyle();
  const theme = validateTheme(
    "text-slate-700 bg-slate-300",
    "text-slate-50 bg-slate-700 bg-gradient-to-r from-slate-900 to-slate-700"
  );

  const { sm, xs } = useBreakpoints();

  const handleClick = (path: string) => {
    router.push(path);
  };

  const isActiveColor = useCallback(
    (sview: number) => {
      if (router.query?.sview && +router.query?.sview === sview) {
        return "#05c46b";
      }

      return "#d2dae2";
    },
    [router.query]
  );

  return (
    <div
      className={`${theme} shadow-md fixed left-1/2 transform -translate-x-1/2 bottom-0 p-3 rounded-ss-md rounded-se-md flex ${
        (xs || sm) && "w-full justify-center"
      }`}
    >
      <Button noBorder onClick={() => handleClick("?sview=0")}>
        <AiOutlineHome size={50} color={isActiveColor(0)} />
      </Button>
      <Button noBorder onClick={() => handleClick("?sview=1")}>
        <SiAboutdotme size={50} color={isActiveColor(1)} />
      </Button>
      <Button noBorder onClick={() => handleClick("?sview=2")}>
        <HiCode size={50} color={isActiveColor(2)} />
      </Button>
      <Button noBorder onClick={() => handleClick("?sview=3")}>
        <AiOutlineSetting size={50} color={isActiveColor(3)} />
      </Button>
    </div>
  );
};

export default FloatingMenu;
