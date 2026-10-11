import React from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { Star, ArrowRight, Sparkles, Activity, FileCheck2, ShieldCheck, Microscope } from 'lucide-react';

interface HeroSectionProps {
  onRequestConsultation: () => void;
  onExploreRootCanal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestConsultation,
  onExploreRootCanal,
}) => {
  return (
    <section id="home" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Practice Visual & Credibility Badge (50%) */}
        <div className="lg:col-span-6 relative flex flex-col justify-center">
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-full min-h-[420px] rounded-2xl overflow-hidden bg-[#EDF2F1] shadow-md border border-[#A8B8B2]/30">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe9z3wbAUeB6a-GkZpOmZ-y_DyHbd5fCX-SqG_1BV3Y4fdqbBV-7r4HEP0x__D6kMDd-7T4IbwgaXIOxU752LYUzW2HR9W5a368oZ5KxcXrCXGVlmgha7rDvNCWCjxwA5t5HZIJdpXPn05VMWuyxq5JfS5NS9GHUDqGPIw8lB9vyPXd9JLZLJYJTC-MWBvWpjJlaXSeKEPF0lOjXSCEXRHbMnal9zADw6tcDLb2DjcDt6nFsFo3Y2zpw"
              alt="Dr. Nidhi Ruparelia performing precision endodontic evaluation at Ashirwad Dental Care Kudasan"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Ambient gradient tint for clinical depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#004242]/50 via-transparent to-transparent pointer-events-none" />

            {/* Floating Credibility Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-[#A8B8B2]/40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FEBA98]/30 text-[#855236] flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-[#C48768] text-[#C48768]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0F1E1F] flex items-center gap-1.5">
                  <span>5.0</span>
                  <span className="text-xs text-[#C48768]">★★★★★</span>
                  <span className="text-xs text-[#536463] font-normal">· {CLINIC_CONFIG.reputation.reviewCount} Google Reviews</span>
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#536463]">
                  {CLINIC_CONFIG.name} · Kudasan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Teal Hero Proposition Card (50%) */}
        <div className="lg:col-span-6 bg-[#145B5A] text-white rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden border border-[#145B5A]">
          {/* Subtle biophilic watermark SVG in card background */}
          <svg
            className="absolute -right-16 -top-16 w-80 h-80 text-white/5 pointer-events-none select-none"
            fill="currentColor"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path d="M100 15 C60 15 40 45 40 85 C40 120 50 145 60 185 C70 185 80 150 100 150 C120 150 130 185 140 185 C150 145 160 120 160 85 C160 45 140 15 100 15 Z" />
          </svg>

          <div className="flex flex-col gap-5 relative z-10">
            {/* Top clinical eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FEBA98]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#FEBA98]">
                ENDODONTIC DENTAL CARE · KUDASAN
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
              Helping You Keep Your Natural Teeth.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#E6F7F8]/90 font-normal leading-relaxed max-w-xl">
              Understand your dental concerns, explore root canal treatment options, and receive clear guidance on the next steps for your oral health.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onRequestConsultation}
                className="inline-flex items-center justify-center bg-white text-[#145B5A] text-sm font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-[#E6F7F8] active:scale-[0.99] transition-all cursor-pointer"
              >
                Request a Consultation
              </button>

              <button
                onClick={onExploreRootCanal}
                className="inline-flex items-center justify-center bg-white/10 text-white text-sm font-medium px-5 py-3 rounded-lg hover:bg-white/20 active:scale-[0.99] transition-all border border-white/20 cursor-pointer"
              >
                Learn About Root Canal Care
              </button>
            </div>
          </div>

          {/* Direct Reassurance Bar */}
          <div className="pt-8 mt-8 border-t border-white/15 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs uppercase tracking-wider text-[#DBEBEC]">
              <div className="flex items-center gap-2">
                <Microscope className="w-4 h-4 text-[#FFDBCB]" />
                <span>Precision microscopy</span>
              </div>
              <span className="hidden sm:inline text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FFDBCB]" />
                <span>Calibrated diagnostics</span>
              </div>
              <span className="hidden sm:inline text-white/30">|</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFDBCB]" />
                <span>Patient-first explanations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
