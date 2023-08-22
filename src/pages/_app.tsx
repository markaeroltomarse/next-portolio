import { NextPageWithLayout } from "@common_types/next-page-with-layout.types";
import AppLayout from "@layout/app-layout.layout";
import { wrapper } from "@store/index";
import "@styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App: React.FC<AppProps> = ({
  Component,
  ...rest
}: AppPropsWithLayout) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <AppLayout getLayout={getLayout}>
        <Component {...props.pageProps} />
      </AppLayout>
    </Provider>
  );
};

export default App;
