import React from 'react';
import { MotionConfig } from 'motion/react';
import { Hero, Nav, TopBar, TopBarOffer, TrustMarquee } from './landing/Hero';
import { ForWho, ShiftTimeline, Together } from './landing/Sections';
import { DashboardFeatures, DashboardSimulator } from './landing/Dashboard';
import { Authority, ForWhom, SocialProof, VideoSection } from './landing/Story';
import { LiveDemo } from './landing/LiveDemo';
import { AssistantReplies } from './landing/Respostas';
import { AnnualExclusives, Pricing } from './landing/Pricing';
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
          <ShiftTimeline />
          <LiveDemo />
          <AssistantReplies />
          <DashboardFeatures />
          <DashboardSimulator />
          <Together />

          {/* 6. Para quem é */}
          <ForWhom />

          {/* 7. Autoridade */}
          <Authority />

          {/* 5. Ferramentas e entregáveis + 8. Planos */}
          <AnnualExclusives />
          <Pricing />

          {/* 9. Dúvidas */}
          <Faq />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
