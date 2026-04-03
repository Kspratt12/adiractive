"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        {/* Hero */}
        <section className="px-6 lg:px-16 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="label-text text-[10px] text-warm-gray hover:text-pink-hot transition-colors mb-6 inline-flex items-center gap-2 tracking-[0.2em]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back Home
            </Link>

            <motion.div initial={{ opacity: 0.5, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="label-text text-pink-hot mb-4 block tracking-[0.25em] text-[10px]">Our Story</span>
              <h1 className="heading-xl text-[clamp(2.2rem,5vw,4.5rem)] text-charcoal mb-6">
                What is <span className="italic text-pink-deep">Haven?</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
              <div className="rounded-2xl overflow-hidden shadow-xl neon-glow">
                <img src="/brand2.jpg" alt="Haven Reformer Studio founders" className="w-full h-[400px] sm:h-[500px] object-cover" />
              </div>
              <div>
                <h2 className="heading-lg text-2xl sm:text-3xl text-charcoal mb-4">
                  Meet Shannon Daly
                </h2>
                <p className="label-text text-pink-hot text-[10px] mb-4">Founder &amp; Lead Instructor</p>
                <div className="space-y-4 body-text text-charcoal-light text-[15px]">
                  <p>
                    Haven is a boutique reformer studio created to be a place of
                    strength, joy, and belonging. While we use a traditional Pilates
                    reformer, Haven is not traditional Pilates. Our classes are
                    strength-based, athletic, and intentionally designed to challenge
                    your body through modern reformer training, endurance, and
                    full-body conditioning.
                  </p>
                  <p>
                    Each class is built to help you feel strong, capable, and
                    confident, physically and mentally.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 sm:p-12 card-elevated mb-12">
              <h2 className="heading-lg text-2xl sm:text-3xl text-charcoal mb-6">Our Mission</h2>
              <div className="space-y-4 body-text text-charcoal-light text-[15px] max-w-3xl">
                <p>
                  At the heart of Haven is our faith-based foundation. Our mission is
                  rooted in the belief that every person is worthy of care,
                  encouragement, and community. This shapes how we lead, teach, and
                  welcome. Not as a requirement, but as an invitation.
                </p>
                <p>
                  Haven is a space where everyone belongs, where kindness leads, and
                  where joy is found through movement and connection.
                </p>
                <p>
                  We believe movement is a gift and community is essential. That is why
                  our small-group format allows for intentional coaching, genuine
                  relationships, and a supportive environment where you are seen and
                  celebrated.
                </p>
                <p>
                  Whether you come for the workout, the people, or the sense of peace
                  that fills the room, our goal is for Haven to feel like a safe place
                  to grow in strength, confidence, and joy.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
              {[
                { title: "Strength", text: "Not just physical. The confidence you carry when you walk out our doors." },
                { title: "Joy", text: "Music-driven, energy-filled classes that make you want to come back." },
                { title: "Community", text: "Small groups where encouragement is real and every person matters." },
              ].map((v) => (
                <div key={v.title} className="bg-warm-white rounded-2xl p-6 sm:p-8 text-center">
                  <h3 className="heading-md text-xl text-pink-hot mb-3">{v.title}</h3>
                  <p className="body-text text-sm text-charcoal-light">{v.text}</p>
                </div>
              ))}
            </div>

            {/* Team */}
            <h2 className="heading-lg text-2xl sm:text-3xl text-charcoal mb-6 text-center">Our Instructors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
              {[
                { name: "Shannon Daly", role: "Founder", img: "/brand1.jpg" },
                { name: "Ginevra Myers", role: "Instructor", img: "/brand2.jpg" },
                { name: "Erika Parker", role: "Instructor", img: "/coach1.jpg" },
                { name: "Kasey Everette", role: "Instructor", img: "/coach2.jpg" },
                { name: "Megan Cornell", role: "Instructor", img: "/vertical5.png" },
              ].map((t) => (
                <div key={t.name} className="text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-pink-light/40 ring-offset-2 ring-offset-cream mx-auto mb-3">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-[11px] text-warm-gray">{t.role}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="heading-lg text-2xl text-charcoal mb-4 italic">
                Come as you are and we&apos;ll meet you there.
              </p>
              <a
                href="https://momence.com/u/haven-reformer-studio-SkXWwM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-pink-hot text-cream text-[11px] font-medium tracking-[0.2em] uppercase rounded-full hover:bg-pink-deep transition-all duration-500 neon-glow-strong"
              >
                Book Your First Class
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
