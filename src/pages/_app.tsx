import type { AppProps } from "next/app";

import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "../styles/global.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { StakeContextProvider } from "../contexts/StakeContext";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

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
        <link href="/images/favicon.ico" rel="icon" sizes="any" />
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <StakeContextProvider>
            <main className=" flex justify-center">
              <div className=" px-0  xl:max-w-[1500px] ">
                <NavBar />
                <Component {...pageProps} />
                <Footer />
              </div>
            </main>
          </StakeContextProvider>
        </QueryClientProvider>
      </WagmiProvider>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default MyApp;
