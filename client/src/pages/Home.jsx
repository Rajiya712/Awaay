import React from "react";
import EasyStepSection from "../components/HomeSection/EasyStepSection";
import WhyChooseSection from "../components/HomeSection/WhyChooseSection";
import HeroSection from "../components/HomeSection/HeroSection";
import AvailableSection from "../components/HomeSection/AvailableSection";
import SearchResult from "../components/SearchResult";

function Home() {
  return (
    <>
      <HeroSection />
      <SearchResult />
      <EasyStepSection />
      <AvailableSection />
      <WhyChooseSection />
    </>
  );
}

export default Home;
