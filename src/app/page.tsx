"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import ScrollStory from "@/components/ScrollStory";
import ClassExperience from "@/components/ClassExperience";
import SchedulePreview from "@/components/SchedulePreview";
import StudioGallery from "@/components/StudioGallery";
import Membership from "@/components/Membership";
import Testimonials from "@/components/Testimonials";
import Boutique from "@/components/Boutique";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BrandIntro />
        <ScrollStory />
        <ClassExperience />
        <SchedulePreview />
        <StudioGallery />
        <Membership />
        <Testimonials />
        <Boutique />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
