import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { APP_ENV } from "./env.config";
import { http } from "viem";

export const config = getDefaultConfig({
  appName: "ZK STAKE",
  appIcon: "",

  projectId: APP_ENV.PROJECT_ID ? APP_ENV.PROJECT_ID : "YOUR_PROJECT_ID",
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${APP_ENV.ALCHEMY_KEY}`
    ),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${APP_ENV.ALCHEMY_KEY}`
    ),
  },
  ssr: true,
});
