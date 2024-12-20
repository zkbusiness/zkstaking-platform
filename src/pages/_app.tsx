import type { AppProps } from "next/app";

import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "@styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import NavBar from "@components/ui/NavBar";
import Footer from "@components/ui/Footer";
import { StakeContextProvider } from "@contexts/StakeContext";
import { WagmiProvider } from "wagmi";
import { config } from "@config/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import merge from "lodash.merge";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const myTheme = merge(darkTheme(), {
    colors: {
      accentColor: "#ffffff16",
      accentColorForeground: "white",
      connectButtonBackground: "#ffffff16",
      connectButtonText: "",
      closeButtonBackground: "",
    },
  } as Theme);
  return (
    <div>
      <Head>
        <title>ZKsync Staking</title>
        <meta
          content="The Secured staking platform for ZK"
          name="description"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preload" as="image" href="https://zksyncstaking.com/images/logo.png" />

        <meta name="application-name" content="ZkSyncStaking" />
        <meta name="generator" content="ZkSyncStaking" />
        <meta name="keywords" content="ZkSync, ZkStaking, Staking, zk, ZK, ZkSyncStaking, zksyncstaking" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:title" content="Zk Sync Staking" />
        <meta property="og:url" content="https://zksyncstaking.com/" />
        <meta property="og:site_name" content="Zk Sync Staking" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://zksyncstaking.com/images/banner.jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zk Sync Staking" />
        <meta name="twitter:image" content="https://zksyncstaking.com/images/banner.jpg" />
        <link rel="icon" href="https://zksyncstaking.com/favicon.ico" type="image/x-icon" sizes="16x16" />


      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider coolMode={false} theme={myTheme}>
            <StakeContextProvider>
              <main className=" flex justify-center">
                <div className=" px-0  w-full xl:max-w-[1500px] ">
                  <NavBar />
                  <Component {...pageProps} />
                  <Footer />
                </div>
              </main>
            </StakeContextProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
      <ToastContainer position="bottom-right" className="z-[100000]" />
    </div>
  );
}

export default MyApp;
