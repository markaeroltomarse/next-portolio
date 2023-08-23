import { NextPageWithLayout } from "@common_types/next-page-with-layout.types";
import AppLayout from "@layout/app-layout.layout";
import { wrapper } from "@store/index";
import "@styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
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
    <>
      <Head>
        <title>Food Truck Co.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="application-name" content="MARK AEROL TOMARSE" />
        <meta name="description" content="Mark Aerol Tomarse" />
        <meta name="keywords" content="MARK AEROL TOMARSE" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Provider store={store}>
        <AppLayout getLayout={getLayout}>
          <Component {...props.pageProps} />
        </AppLayout>
      </Provider>
    </>
  );
};

export default App;
