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

import PrivateT from '../components/PrivateTeam/PrivateT'
import WhySec from '../components/Whysection/WhySec'
import Footer from '../components/Fotter/Footer'
function index() {
  //  useEffect(() => {
  //    inView(".scroll-section pre", (element) => {
  //      animate(
  //        element,
  //        { opacity: 1, x: [-100, 0] },
  //        {
  //          duration: 0.9,
  //          easing: [0.17, 0.55, 0.55, 1],
  //        }
  //      );

  //      return () => animate(element, { opacity: 0, x: -100 });
  //    });
  //  }, []);

  return (
    <LadingLayout>
      <Hero />
      <ScrollingCards />
      <AmbitiousCard />
      <AiautoCard />
      <PrivateT />
      <ImpactSection />
      <WhySec />
      < Footer />
    </LadingLayout>
  );


}

export default index 



// ambinution;