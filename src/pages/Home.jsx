import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../layouts/Header.jsx";
import HeroSection from "../Composants/HeroSection.jsx";
import Footer from '../layouts/Footer.jsx';
import About from '../Composants/About.jsx';
function Home() {
  return (
    <div className="w-full   ">
      <Header />
      <HeroSection />
      <About />
      <Footer />
    </div>
  );
}

export default Home;
