import Navbar from "@components/Displays/Navbar";
import LoadingAnimation from "@components/Displays/PageLoading";
import ParticlesComponent from "@components/Displays/Particles";
import useAppSelector from "@hooks/app-selector.hook";
import AOS from "aos";
import "aos/dist/aos.css";
import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
export interface AppLayoutProps {
  children: React.ReactElement;
  getLayout: (_page: ReactElement) => ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { children, getLayout } = props;
  const isDark = useAppSelector((store) => store.components.isDarkMode);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({
      delay: 400,
      duration: 800,
    });
  });

  const theme: string = useMemo(() => {
    if (isDark) return `bg-slate-900 text-slate-50`;
    return `text-slate-900 bg-slate-50`;
  }, [isDark]);

  return (
    <div className={`${theme} min-h-[100vh] transition-all`}>
      {isLoaded ? (
        <>
          <Navbar />
          {getLayout(children)}
          <ParticlesComponent />
        </>
      ) : (
        <LoadingAnimation onLoaded={() => setIsLoaded(true)} />
      )}
      {/* <Navbar />
      {getLayout(children)}
      <ParticlesComponent /> */}
    </div>
  );
};

export default AppLayout;
