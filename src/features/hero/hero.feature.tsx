import Me from "@assets/dp.jpg";
import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import useTypingEffect from "@hooks/type-animation.hook";
import Image from "next/image";
import { useRouter } from "next/router";
export interface HeroFeatureProps {
  className?: string;
}

const HeroFeature: React.FC<HeroFeatureProps> = (props) => {
  const { className } = props;
  const router = useRouter();
  const isCurrentView = router.query?.sview === "0";

  const typedText = useTypingEffect("MARK AEROL TOMARSE", {
    duration: 300,
    isStop: !isCurrentView,
  });

  const { validateTheme } = useThemeStyle();
  const color = validateTheme("text-slate-700", "text-slate-50");

  const { sm, xs, md } = useBreakpoints();
  const isMobile = sm === true || xs === true;
  const isTablet = sm === true || xs === true || md === true;

  return (
    <>
      <div
        className={`${className} h-[70vh] flex items-center `}
        data-aos="fade-up"
      >
        <div
          className={`flex justify-between  w-full items-center ${
            isMobile && "flex-col-reverse text-center gap-10"
          }`}
        >
          <div className="flex flex-col gap-5">
            <h1
              className={`${
                isTablet ? "text-3xl" : "text-6xl"
              } font-bold typing-text h-10`}
            >
              {typedText}
            </h1>
            <p className={`${color}`}>
              {`Hello, I'm passionate web developer based in the Philippines.`}
            </p>

            <div>
              <code
                className={`bg-[#34495e] text-slate-50 ${
                  isMobile && "text-[18px]"
                } text-2xl px-5 py-2 rounded-sm transition-all`}
              >
                {"< Fullstack Developer />"}
              </code>
            </div>
          </div>
          {isMobile && <div className={`h-[200px] `}></div>}
          <Image
            src={Me}
            width={isMobile ? 200 : 300}
            height={isMobile ? 200 : 300}
            alt=""
            className={`particle rounded-full border-8 ${
              isMobile ? "top-10" : "right-0"
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default HeroFeature;
