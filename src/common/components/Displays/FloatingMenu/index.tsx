import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiCode } from "react-icons/hi";
export interface FloatingMenuProps {}

const FloatingMenu: React.FC<FloatingMenuProps> = (props) => {
  const {} = props;

  const router = useRouter();

  const { validateTheme } = useThemeStyle();
  const theme = validateTheme(
    "text-slate-700 bg-slate-300 border-slate-200",
    "border-slate-500 text-slate-50 bg-slate-700 bg-gradient-to-r from-slate-900 to-slate-700"
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

      return "";
    },
    [router.query]
  );

  const isActiveSize = useCallback(
    (sview: number) => {
      if (router.query?.sview && +router.query?.sview === sview) {
        return 50;
      }

      return 30;
    },
    [router.query]
  );

  const isActive = useCallback(
    (sview: number) => {
      return router.query?.sview && +router.query?.sview === sview;
    },
    [router.query]
  );

  return (
    <div
      className={`${theme} border-t-2  fixed left-1/2 transform -translate-x-1/2 bottom-0 p-3 rounded-ss-md rounded-se-md flex ${
        (xs || sm) && "w-full justify-center"
      } flex justify-between gap-10 px-5`} // grid grid-cols-5 gap-5
    >
      <div
        onClick={() => handleClick("?sview=0")}
        className={`flex items-center justify-center py-2 cursor-pointer ${
          !isActive(0) && "hover:opacity-20"
        }`}
      >
        <AiOutlineHome size={isActiveSize(0)} color={isActiveColor(0)} />
      </div>
      {/* 
      <div
        onClick={() => handleClick("?sview=1")}
        className={`flex items-center justify-center py-2 cursor-pointer ${
          !isActive(1) && "hover:opacity-20"
        }`}
      >
        <SiAboutdotme size={isActiveSize(1)} color={isActiveColor(1)} />
      </div> */}
      <div
        onClick={() => handleClick("?sview=2")}
        className={`flex items-center justify-center py-2 cursor-pointer ${
          !isActive(2) && "hover:opacity-20"
        }`}
      >
        <HiCode size={isActiveSize(2)} color={isActiveColor(2)} />
      </div>
      <div
        onClick={() => handleClick("?sview=3")}
        className={`flex items-center justify-center py-2 cursor-pointer ${
          !isActive(3) && "hover:opacity-20"
        }`}
      >
        <BsPersonWorkspace size={isActiveSize(3)} color={isActiveColor(3)} />
      </div>
      <div
        onClick={() => handleClick("?sview=4")}
        className={`flex items-center justify-center py-2 cursor-pointer ${
          !isActive(4) && "hover:opacity-20"
        }`}
      >
        <AiOutlineSetting size={isActiveSize(4)} color={isActiveColor(4)} />
      </div>
    </div>
  );
};

export default FloatingMenu;
