import React from 'react';
import { MotionConfig } from 'motion/react';
import { Hero, Nav, StickyCta, TopBar, TopBarOffer, TrustMarquee } from './landing/Hero';
import { ForWho, ShiftTimeline, Together } from './landing/Sections';
import { DashboardFeatures, DashboardSimulator } from './landing/Dashboard';
import { Authority, ForWhom, SocialProof, VideoSection } from './landing/Story';
import { LiveDemo } from './landing/LiveDemo';
import { AnnualBenefits, AnnualExclusives, Pricing } from './landing/Pricing';
import { Faq, Footer } from './landing/Closing';

export default function App() {
  return (
    // reducedMotion="user": respeita quem desativou animações no sistema
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-navy-900 font-sans text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950">
        {/* só a faixa com a contagem regressiva fica fixa no topo */}
        <TopBar />
        <TopBarOffer />
        <Nav />
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

          {/* 5. Para quem é (logo depois da solução, para a pessoa se reconhecer cedo) */}
          <ForWhom />

          <ShiftTimeline />
          <LiveDemo />
          <DashboardFeatures />
          <DashboardSimulator />
          <Together />

          {/* 6. Autoridade */}
          <Authority />

          {/* 7. Ferramentas e entregáveis + 8. Planos */}
          <AnnualExclusives />
          <Pricing />
          <AnnualBenefits />

          {/* 9. Dúvidas */}
          <Faq />
        </main>
        <Footer />
        <StickyCta />
      </div>
    </MotionConfig>
  );
}
