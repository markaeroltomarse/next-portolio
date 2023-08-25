import Navbar from "@components/Displays/Navbar";
import LoadingAnimation from "@components/Displays/PageLoading";
import ParticlesComponent from "@components/Displays/Particles";
import useThemeStyle from "@hooks/theme-style.hook";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";
export interface AppLayoutProps {
  children: React.ReactElement;
  getLayout: (_page: ReactElement) => ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { children, getLayout } = props;
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({
      delay: 400,
      duration: 800,
    });
  });

  const { validateTheme } = useThemeStyle();
  const theme = validateTheme(
    `text-slate-900 bg-slate-50`,
    `bg-slate-900 text-slate-50`
  );

  useEffect(() => {
    if (!router.query?.sview) {
      router.push("?sview=0");
    }
  }, [router.query]);

  return (
    <div className={`${theme} min-h-[100vh] transition-all w-[100vw]`}>
      {isLoaded ? (
        <>
          <Navbar />
          <div className="h-[15vh]"></div>
          {getLayout(children)}
          <ParticlesComponent />
        </>
      ) : (
        <LoadingAnimation onLoaded={() => setIsLoaded(true)} />
      )}
    </div>
  );
};

export default AppLayout;
