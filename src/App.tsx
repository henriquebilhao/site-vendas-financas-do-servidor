import React from 'react';
import { MotionConfig } from 'motion/react';
import { Hero, Nav, TopBar, TrustMarquee } from './landing/Hero';
import { DashboardShowcase, ForWho, Security, ShiftTimeline, Together } from './landing/Sections';
import { LiveDemo } from './landing/LiveDemo';
import { Pricing } from './landing/Pricing';
import { Faq, FinalCta, Footer, StickyMobileCta } from './landing/Closing';

export default function App() {
  return (
    // reducedMotion="user": respeita quem desativou animações no sistema
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-hidden bg-navy-900 font-sans text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950">
        <TopBar />
        <Nav />
        <main>
          <Hero />
          <TrustMarquee />
          <ForWho />
          <ShiftTimeline />
          <LiveDemo />
          <DashboardShowcase />
          <Together />
          <Security />
          <Pricing />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <StickyMobileCta />
      </div>
    </MotionConfig>
  );
}
