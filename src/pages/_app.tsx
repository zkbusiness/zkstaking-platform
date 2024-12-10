import type { AppProps } from "next/app";

import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>ZK Staking</title>
        <meta
          content="The Secured staking platform for $CODE"
          name="description"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
      </Head>

      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default MyApp;
