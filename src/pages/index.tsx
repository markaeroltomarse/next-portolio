import { NextPageWithLayout } from "@common_types/next-page-with-layout.types";
import FloatingMenu from "@components/Displays/FloatingMenu";
import AboutMe from "@features/about";
import HeroFeature from "@features/hero/hero.feature";
import SkillsFeature from "@features/skills";
import DefaultView from "@features/views/default-view.feature";
import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";
export interface HomePageIndexProps {}

const HomePageIndex: NextPageWithLayout<HomePageIndexProps> = () => {
  const router = useRouter();

  return (
    <>
      <div className="z-[10]">
        <SwipeableViews
          axis="x"
          index={Number(router.query?.sview) || 0}
          onChangeIndex={(e) => router.push("?sview=" + e)}
        >
          <HeroFeature className="container mx-auto" data-aos="fade-up" />
          <AboutMe className="container mx-auto" data-aos="fade-up" />
          <SkillsFeature className="" />
        </SwipeableViews>
        <FloatingMenu />
      </div>
    </>
  );
};

HomePageIndex.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultView>{page}</DefaultView>;
};

export default HomePageIndex;
