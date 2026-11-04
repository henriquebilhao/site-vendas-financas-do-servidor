import React from 'react';
import { MotionConfig } from 'motion/react';
import { Hero, Nav, TopBar, TrustMarquee } from './landing/Hero';
import { ForWho, ShiftTimeline, Together } from './landing/Sections';
import { DashboardFeatures, DashboardSimulator } from './landing/Dashboard';
import { Authority, Deliverables, ForWhom, SocialProof, VideoSection } from './landing/Story';
import { LiveDemo } from './landing/LiveDemo';
import { Pricing } from './landing/Pricing';
import { Faq, FinalCta, Footer } from './landing/Closing';

export default function App() {
  return (
    // reducedMotion="user": respeita quem desativou animações no sistema
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-navy-900 font-sans text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950">
        {/* faixa de lançamento + menu ficam fixos no topo */}
        <div className="sticky top-0 z-50">
          <TopBar />
          <Nav />
        </div>
        <main>
          {/* 1. Promessa principal */}
          <Hero />
          <TrustMarquee />

          {/* 2. Prova social */}
          <SocialProof />

          {/* 3. Dores do público */}
          <ForWho />

          {/* 4. Resolução: funcionalidades */}
          <VideoSection />
          <ShiftTimeline />
          <LiveDemo />
          <DashboardFeatures />
          <DashboardSimulator />
          <Together />

          {/* 5. Entregáveis e bônus */}
          <Deliverables />

          {/* 6. Para quem é */}
          <ForWhom />

          {/* 7. Autoridade */}
          <Authority />

          {/* 8. Planos */}
          <Pricing />

          {/* 9. Dúvidas */}
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
