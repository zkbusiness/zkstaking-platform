import type { NextPage } from "next";

import React from "react";
import VideoPlayer from "@components/Home/VideoSection";
import HomeHeader from "@components/Home/Home";
import { Section, SectionProps } from "@components/Home/Section";
import CardSection from "@components/Home/CardSection";

const sectionsData: SectionProps[] = [
  {
    subtitle: "ZK SYNC STAKING",
    title: "A ZkSyncStaking platform...",
    description:
      "ZK Sync Staking focuses on security with stringent measures in place to keep user funds safe. On ZkSyncStaking, the competitive nature of staking rewards, along with very low fees, creates a high appeal for many investors.",
    imageSrc: "/images/zk-coin-front.png",
    imageAlt: "security",
  },
  {
    subtitle: "INCOME BY APR",
    title: "Initial Bonus",
    description:
      "At our staking platform, we understand how important returns are for your investments. That’s why we offer an APY of 8.7%, designed to help you grow your assets over time. Even more exciting, the first 100 users who join us will receive a special rate of 13.5% APY on their initial stake. This limited-time offer is a great way to kickstart your earnings. We invite you to take part in this exclusive promotion before it runs out!",
    imageSrc: "/images/staking.jpg",
    imageAlt: "APY",
  },
  {
    subtitle: "USER-FRIENDLY DESIGN",
    title: "",
    description:
      "ZKsync offers secure one-tap onboarding via FaceID/Passkeys, eliminating the need for seed phrases and reducing the risk of hacks. By automatically creating modular smart accounts at the protocol level, ZKsync enables a delightful, customizable UX, allowing users to seamlessly access all ZK chains with what feels like a single account directly from their application.",
    imageSrc: "/images/user-centric.webp",
    imageAlt: "User Friendly",
  },

  {
    subtitle: "STAKE ON ZKSYNC",
    title: "Ready to Stake for ZK?",
    description:
      "Stake now and be part of our community!",
    imageAlt: "Stake for ZK",
  },
];

const Home: NextPage = () => {
  return (
    <div>
      <VideoPlayer />
      <HomeHeader />
      {sectionsData.map((data, id) => (
        <Section key={id} {...data} reversed={id % 2 === 1} />
      ))}
      <CardSection />
    </div>
  );
};

export default Home;
