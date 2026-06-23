import { ThemeProvider } from "@contexts/theme.context";
import "@styles/globals.css";
import { AppProps } from "next/app";
import { Inter, JetBrains_Mono } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider>
        <div className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
