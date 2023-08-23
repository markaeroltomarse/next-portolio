import Button from "@components/Inputs/Button";
import useAppDispatch from "@hooks/app-dispatch.hook";
import useAppSelector from "@hooks/app-selector.hook";
import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import { setIsDarkMode } from "@store/slices/componentes.slice";
import { useMemo } from "react";
import { BsCodeSlash, BsFillSunFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { MdDarkMode } from "react-icons/md";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = (props) => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((store) => store.components.isDarkMode);

  const { sm, xs } = useBreakpoints();

  const themeButton = useMemo(() => {
    if (isDark) {
      return (
        <Button
          className="bg-yellow-200 rounded shadow-sm"
          onClick={() => dispatch(setIsDarkMode(!isDark))}
          noBorder
        >
          <MdDarkMode className="text-yellow-400" size={20} />
        </Button>
      );
    }

    return (
      <>
        <Button
          className="bg-slate-700  rounded shadow-sm"
          onClick={() => dispatch(setIsDarkMode(!isDark))}
          noBorder
        >
          <BsFillSunFill className="text-slate-50" size={20} />
        </Button>
      </>
    );
  }, [sm, xs, isDark]);

  const { validateTheme } = useThemeStyle();
  const theme = validateTheme(`bg-slate-50`, `bg-slate-900`);

  return (
    <nav
      className={`z-[100] fixed top-0 ${theme} left-1/2 transform -translate-x-1/2 flex justify-between container mx-auto ${
        (sm || xs) && "py-5"
      } py-10 items-center `}
    >
      <h2 className="text-3xl flex gap-2 items-center">
        <BsCodeSlash className="text-green-600" size={40} />
        <b>MTOMARSE</b>
      </h2>
      {!sm && !xs ? (
        <div className="flex gap-5">
          {themeButton}
          <Button
            className="bg-blue-500 rounded flex gap-3 text-blue-50 shadow-sm"
            noBorder
          >
            <ImProfile className="text-blue-100" size={20} />
            <h5>DOWNLOAD MY CV</h5>
          </Button>
        </div>
      ) : (
        themeButton
      )}
    </nav>
  );
};

export default Navbar;
