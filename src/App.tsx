import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ThreePillarsSection } from './components/ThreePillarsSection';
import { StrategicDeepDiveSection } from './components/StrategicDeepDiveSection';
import { AudioAndPhotoCaptureSection } from './components/AudioAndPhotoCaptureSection';
import { InteractiveSimulatorSection } from './components/InteractiveSimulatorSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const handleOpenCheckout = () => {
    const el = document.getElementById('planos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      
      {/* Top Navbar with direct Hotmart action */}
      <Navbar onOpenCheckout={handleOpenCheckout} />

      {/* Main Page Flow - Ordered Dobras */}
      <main className="flex-1">
        
        {/* Dobra 1: Hero Section */}
        <HeroSection onOpenCheckout={handleOpenCheckout} />

        {/* Dobra 2: Three Pillars / Methodology Glass Cards */}
        <ThreePillarsSection onOpenCheckout={handleOpenCheckout} />

        {/* Dobra 3: Audio & Photo of Receipt Capture (replaces social proof) */}
        <AudioAndPhotoCaptureSection />

        {/* Dobra 4: Strategic Deep-Dive & Mobile Mockup */}
        <StrategicDeepDiveSection onOpenCheckout={handleOpenCheckout} />

        {/* Dobra 5: Live Interactive Simulator (clearly separates Despesa vs Receita) */}
        <InteractiveSimulatorSection />

        {/* Dobra 6: 4 Pricing Plans with Dependent Options & 7-Day Guarantee */}
        <PricingSection />

        {/* Dobra 8: FAQ */}
        <FaqSection />

      </main>

      {/* Dobra 9: Footer */}
      <Footer />

    </div>
  );
}
