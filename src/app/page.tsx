"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import SchedulePreview from "@/components/SchedulePreview";
import ScrollStory from "@/components/ScrollStory";
import ClassExperience from "@/components/ClassExperience";
import StudioGallery from "@/components/StudioGallery";
import Membership from "@/components/Membership";
import Testimonials from "@/components/Testimonials";
import Boutique from "@/components/Boutique";
import FinalCTA from "@/components/FinalCTA";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import PetalDivider from "@/components/PetalDivider";
import VideoStrip from "@/components/VideoStrip";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BrandIntro />
        <PetalDivider />
        <SchedulePreview />
        <VideoStrip />
        <ScrollStory />
        <PetalDivider flip />
        <ClassExperience />
        <PetalDivider />
        <StudioGallery />
        <Membership />
        <PetalDivider flip />
        <Testimonials />
        <Boutique />
        <FinalCTA />
        <Location />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
