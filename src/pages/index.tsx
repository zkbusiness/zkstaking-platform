import type { NextPage } from "next";

import React from "react";
import VideoPlayer from "../components/Home/VideoSection";
import Header from "../components/Home/Home";
import { Section, SectionProps } from "../components/Home/Section";
import CardSection from "../components/Home/CardSection";

const sectionsData: SectionProps[] = [
  {
    subtitle: "ZK CHAINS",
    title: "A network of ZK chains...",
    description:
      "ZK chains are high performance, verifiable, modular rollups and validiums powered by ZKsync. United in an elastic network, ZK chains can be added or expanded to handle increased transaction volume without affecting costs or hardware requirements for verification.",
    imageSrc: "/images/zk-stack.webp",
    imageAlt: "ZK chains network illustration",
  },
  {
    subtitle: "NATIVE INTEROPERABILITY",
    title: "...sharing users and liquidity...",
    description:
      "ZK chains provide native, frictionless interoperability presented in a consistent and easy-to-use interface. This enables trustless communication and asset transfers between chains leveraging the full range of users and liquidity across the entire ZK chain ecosystem. Unlike traditional, centralized solutions, this protocol relies solely on cryptography for security.",
    imageSrc: "/images/native-bridging.png",
    imageAlt: "ZK chains network diagram",
  },
  {
    subtitle: "USER-CENTRIC DESIGN",
    title: "...with unmatched UX.",
    description:
      "ZKsync offers secure one-tap onboarding via FaceID/Passkeys, eliminating the need for seed phrases and reducing the risk of hacks. By automatically creating modular smart accounts at the protocol level, ZKsync enables a delightful, customizable UX, allowing users to seamlessly access all ZK chains with what feels like a single account directly from their application.",
    imageSrc: "/images/user-centric.webp",
    imageAlt: "User experience illustration",
  },

  {
    subtitle: "BUILD ON ZKSYNC",
    title: "Ready to build on ZKsync?",
    description:
      "Build and deploy your app or ZK chain in minutes with familiar EVM code that works just like you'd expect it to.",
    imageAlt: "Build on ZKsync illustration",
  },
];

const Home: NextPage = () => {
  return (
    <div>
      <VideoPlayer />
      <Header />
      {sectionsData.map((data, id) => (
        <Section key={id} {...data} reversed={id % 2 === 1} />
      ))}
      <CardSection />
    </div>
  );
};

export default Home;
