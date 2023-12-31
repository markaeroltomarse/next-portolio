import Button from "@components/Inputs/Button";
import Input from "@components/Inputs/InputText";
import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
export interface FloatingSendMessageProps {}

const FloatingSendMessage: React.FC<FloatingSendMessageProps> = (props) => {
  const {} = props;

  const [message, setMessage] = useState("");

  const { validateTheme } = useThemeStyle();
  const theme = validateTheme(
    "text-slate-700 bg-slate-300",
    "text-slate-50 bg-slate-700"
  );
  const border = validateTheme(" border-slate-200", "border-slate-500 ");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const { xs, sm } = useBreakpoints();
  const isMobile = xs === true || sm === true;

  return (
    <form
      className={`${theme} ${
        isMobile && "w-[99%]"
      }  ${border} border-t-2 border-r-2 fixed left-1/2 transform -translate-x-1/2 bottom-32 p-3 flex rounded-md`}
      onSubmit={handleSubmit}
    >
      <Input
        className="w-[300px]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button noBorder>
        <IoSend size={30} />
      </Button>
    </form>
  );
};

export default FloatingSendMessage;
