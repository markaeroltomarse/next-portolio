import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";

export interface ConvertsationComponentProps {}

const ConvertsationComponent: React.FC<ConvertsationComponentProps> = () => {
  const { validateTheme } = useThemeStyle();
  const theme = validateTheme(
    "text-slate-700 bg-slate-300",
    "text-slate-50 bg-slate-700"
  );
  const border = validateTheme(" border-slate-200", "border-slate-500 ");

  const { xs, sm } = useBreakpoints();
  const isMobile = xs === true || sm === true;

  return (
    <div
      className="flex flex-col gap-5 w-full pb-[20vh] font-medium"
      data-aos="fade-up"
    >
      <div
        className={`${theme} ${border} border-t-2 border-r-2 p-5 rounded-md ${
          isMobile ? "w-10/12" : "w-1/4"
        }`}
      >
        Hello <br />
        <br /> {`I'm Mark Aerol Tomarse. You can ask anything about me 🙂`}
      </div>

      <div className="flex justify-end" data-aos="fade-up">
        <div
          className={`${theme} ${border} border-t-2 border-r-2 p-5 rounded-md ${
            isMobile ? "w-10/12" : "w-1/4"
          }`}
        >
          How many years you have as developer?
        </div>
      </div>

      <div
        className={`${theme} ${border} border-t-2 border-r-2 p-5 rounded-md ${
          isMobile ? "w-10/12" : "w-1/4"
        }`}
        data-aos="fade-up"
      >
        Great! <br />
        <br />{" "}
        {`
I have been working as a Full Stack developer at Xurpas Inc. for 1 year. However, in the year before I was employed there, I had already been developing web applications for small business clients and personal use.`}
      </div>

      <div className="flex justify-end " data-aos="fade-up">
        <div
          className={`${theme} ${border} border-t-2 border-r-2 p-5 rounded-md ${
            isMobile ? "w-10/12" : "w-1/4"
          }`}
        >
          Are you college graduate?
        </div>
      </div>

      <div
        className={`${theme} ${border} border-t-2 border-r-2 p-5 rounded-md ${
          isMobile ? "w-10/12" : "w-1/4"
        }`}
        data-aos="fade-up"
      >
        Yes! <br />
        <br /> I Graduated at STI College year of 2022. Its awesome and lots of
        memory while studying to code.
      </div>

      <div className="flex justify-end  " data-aos="fade-up">
        <div
          className={`${theme} ${border} border-t-2 border-r-2 p-5 rounded-md ${
            isMobile ? "w-10/12" : "w-1/4"
          }`}
        >
          How did you learn to code?
        </div>
      </div>

      <div
        className={`${theme} ${border} border-t-2 border-r-2 p-5 rounded-md ${
          isMobile ? "w-10/12" : "w-1/4"
        }`}
        data-aos="fade-up"
      >
        Interesting! <br />
        <br />{" "}
        {`I've recently become curious about software and have been learning about how it works. I've mostly been using free online courses and learning from skilled teachers in programming. I'm really thankful for them, as they've played a significant role in getting me to where I am now. It's clear to me that being resourceful and connecting with others who share the same goal is essential in this journey. 🤓`}
        <br />
      </div>

      {/* {router.query?.sview === "1" &&
        conversation.map((con: any) =>
          con.me ? (
            <div className={`${theme} p-5 rounded-md w-1/2`}>{con.message}</div>
          ) : (
            <div className="flex justify-end" data-aos="fade-up">
              <div className={`${theme} p-5 rounded-md w-1/3`}>
                {con.message}
              </div>
            </div>
          )
        )} */}
    </div>
  );
};

export default ConvertsationComponent;
