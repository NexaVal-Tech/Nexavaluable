import React, { Children } from 'react'
import LadingLayout from '../components/Layouts/LadingLayout'
import ScrollingCards from "../components/cards/scrollingCards";
import ScrollFadeIn from "../components/Animations/ScrollAnimation";
import { useEffect } from "react";
import { animate, inView } from "motion";
import Hero from '../components/Hero/Hero'
import AmbitiousCard from '../components/Section/ambitiousCard'
import AiautoCard from '../components/Aiauto/AiautoCard'
import ImpactSection from "../components/Impact-section/impactSection"
import About from '../components/about/About';
import PrivateT from '../components/PrivateTeam/PrivateT'
import WhySec from '../components/Whysection/WhySec'
import Footer from '../components/Fotter/Footer'
function index() {

  return (
    <LadingLayout>
      <Hero />
      <ScrollingCards />
      <About />
      <AmbitiousCard />
      <AiautoCard />
      <ImpactSection />
      <PrivateT />
      <WhySec />
      <Footer />
    </LadingLayout>
  );


}

export default index 
