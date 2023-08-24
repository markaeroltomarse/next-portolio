import Me from "@assets/dp.jpg";
import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import Image from "next/image";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import ConvertsationComponent from "./components/conversation.component";
import FloatingSendMessage from "./components/send-message.component";
export interface AboutMeProps {
  className?: string;
}

const AboutMe: React.FC<AboutMeProps> = (props) => {
  const { className } = props;

  const router = useRouter();

  const { validateTheme } = useThemeStyle();
  const color = validateTheme("text-slate-700", "text-slate-100");

  const { sm, xs } = useBreakpoints();
  const isMobile = xs === true || sm === true;

  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold flex gap-3 items-center ">
        About Me <CgProfile size={30} />
      </h2>
      <br />
      <div
        className={`flex gap-10 ${(xs || sm) && "flex-col"} pb-[20vh]`}
        data-aos="fade-up"
      >
        <div className={`${isMobile && "min-w-[200px] flex gap-5"}`}>
          <Image
            src={Me}
            width={isMobile ? 100 : 200}
            height={isMobile ? 100 : 200}
            alt="Mark Aerol Tomarse"
            className="rounded-md"
          />
          {isMobile && (
            <div className="flex gap-2 flex-col">
              <h5 className={`${color} font-bold`}>Mark Aerol Tomarse</h5>
              <code
                className={`bg-[#34495e] text-slate-50 text-xs px-5 p-1 rounded-sm transition-all`}
              >
                {"< Fullstack Developer />"}
              </code>
            </div>
          )}
        </div>

        {isMobile && (
          <div className="flex justify-center">
            <HiOutlineChatBubbleLeftRight className="text-slate-400" />
          </div>
        )}

        {router.query?.sview === "1" && (
          <>
            <ConvertsationComponent />
            <FloatingSendMessage />
          </>
        )}
      </div>
    </div>
  );
};

export default AboutMe;
