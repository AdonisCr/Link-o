import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HeroSection from "./HeroSection";

function Home() {
  return (
    <div className="w-full   ">
      <Header />
      <HeroSection />
    </div>
  );
}

export default Home;
