import type { NextPage } from "next";

import React from "react";
import VideoPlayer from "@components/Home/VideoSection";
import HomeHeader from "@components/Home/Home";
import { Sections } from "@components/Home/Section";
import CardSection from "@components/Home/CardSection";


const Home: NextPage = () => {
  return (
    <div>
      <VideoPlayer />
      <HomeHeader />

      <Sections />

      <CardSection />
    </div>
  );
};

export default Home;
