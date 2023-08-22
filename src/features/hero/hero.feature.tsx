import Me from "@assets/dp.jpg";
import useTypingEffect from "@hooks/type-animation.hook";
import Image from "next/image";
export interface HeroFeatureProps {}

const HeroFeature: React.FC<HeroFeatureProps> = () => {
  const typedText = useTypingEffect("MARK AEROL TOMARSE", {
    duration: 500,
  });
  return (
    <>
      <div className="h-[80vh] flex items-center " data-aos="fade-up">
        <div className="flex justify-between  w-full items-center">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-6xl">{typedText}</h1>
            <p className="text-slate-200">
              {`Hello, I'm passionate web developer based in the Philippines.`}
            </p>

            <div>
              <code className="bg-[#34495e] text-2xl px-5 py-2 rounded-sm transition-all">
                {"< Fullstack Developer />"}
              </code>
            </div>
          </div>
          <Image
            src={Me}
            width={300}
            height={300}
            alt=""
            className="rounded-full border-8"
          />
        </div>
      </div>
    </>
  );
};

export default HeroFeature;
