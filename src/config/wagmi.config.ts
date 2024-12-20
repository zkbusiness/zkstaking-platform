import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { zkSync, zkSyncSepoliaTestnet } from "wagmi/chains";
import { APP_ENV } from "./env.config";
import { http } from "viem";

export const config = getDefaultConfig({
  appName: "ZK STAKE",
  appIcon: "",

  projectId: APP_ENV.PROJECT_ID ? APP_ENV.PROJECT_ID : "YOUR_PROJECT_ID",
  chains: [
    zkSync,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [zkSyncSepoliaTestnet] : []),
  ],
  transports: {
    [zkSync.id]: http(
      `https://zksync-mainnet.g.alchemy.com/v2/${APP_ENV.ALCHEMY_KEY}`
    ),
    [zkSyncSepoliaTestnet.id]: http(
      `https://zksync-sepolia.g.alchemy.com/v2/${APP_ENV.ALCHEMY_KEY}`
    ),
  },
  ssr: true,
});
