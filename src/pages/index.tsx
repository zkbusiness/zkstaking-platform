import type { NextPage } from "next";

import React from "react";
import VideoPlayer from "@components/Home/VideoSection";
import HomeHeader from "@components/Home/Home";
import { Sections } from "@components/Home/Section";
import CardSection from "@components/Home/CardSection";
import FaqSection from "@components/Home/FaqSection";

const Home: NextPage = () => {
  return (
    <div>
      <VideoPlayer />
      <HomeHeader />
      <Sections />
      <CardSection />
      <FaqSection />
    </div>
  );
};

export default Home;
