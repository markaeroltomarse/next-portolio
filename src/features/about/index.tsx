import Me from "@assets/dp.jpg";
import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import Image from "next/image";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import ConvertsationComponent from "./components/conversation.component";
import FloatingSendMessage from "./components/send-message.component";
export interface AboutMeProps {
  className?: string;
}

const AboutMe: React.FC<AboutMeProps> = (props) => {
  const { className } = props;

  const router = useRouter();

  const { validateTheme } = useThemeStyle();
  const theme = validateTheme(
    "text-slate-700 bg-slate-300",
    "text-slate-50 bg-slate-700"
  );

  const { sm, xs } = useBreakpoints();

  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold flex gap-3 items-center ">
        About Me <CgProfile size={30} />
      </h2>
      <br />
      <div
        className={`flex gap-10 ${(xs || sm) && "flex-col"}`}
        data-aos="fade-up"
      >
        <div className="min-w-[200px] ">
          <Image
            src={Me}
            width={200}
            height={200}
            alt="Mark Aerol Tomarse"
            className="rounded-md"
          />
        </div>
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
