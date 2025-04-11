import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../layouts/Header.jsx";
import HeroSection from "../Composants/HeroSection.jsx";
import Footer from "../layouts/Footer.jsx";
import About from "../Composants/About.jsx";
import Testimonials from "../Composants/Testimonials.jsx";
import FAQ from "../Composants/FAQ.jsx";
function Home() {
  return (
    <div className="w-full   ">
      <Header />
      <HeroSection />
      <About />
      <Testimonials/>
      <FAQ/>
      <Footer />
    </div>
  );
}

export default Home;
