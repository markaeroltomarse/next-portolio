import Button from "@components/Inputs/Button";
import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import { useRouter } from "next/router";
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
    "text-slate-50 bg-slate-700"
  );

  const { sm, xs } = useBreakpoints();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={`${theme} shadow-md fixed left-1/2 transform -translate-x-1/2 bottom-0 p-3 rounded-ss-md rounded-se-md flex ${
        (xs || sm) && "w-full justify-center"
      }`}
    >
      <Button noBorder onClick={() => handleClick("?sview=0")}>
        <AiOutlineHome size={50} />
      </Button>
      <Button noBorder onClick={() => handleClick("?sview=1")}>
        <SiAboutdotme size={50} />
      </Button>
      <Button noBorder onClick={() => handleClick("?sview=2")}>
        <HiCode size={50} />
      </Button>
      <Button noBorder onClick={() => handleClick("?sview=3")}>
        <AiOutlineSetting size={50} />
      </Button>
    </div>
  );
};

export default FloatingMenu;
