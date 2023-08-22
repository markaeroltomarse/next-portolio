import { NextPageWithLayout } from "@common_types/next-page-with-layout.types";
import HeroFeature from "@features/hero/hero.feature";
import DefaultView from "@features/views/default-view.feature";

export interface HomePageIndexProps {}

const HomePageIndex: NextPageWithLayout<HomePageIndexProps> = (props) => {
  const {} = props;

  return <HeroFeature />;
};

HomePageIndex.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultView>{page}</DefaultView>;
};

export default HomePageIndex;
