import React, { useState } from 'react';
import { Microscope, Activity, ShieldCheck, Info } from 'lucide-react';

interface RootCanalSectionProps {
  onEnquire: () => void;
}

type AnatomyPart = 'enamel' | 'dentin' | 'pulp' | 'canal' | null;

export const RootCanalSection: React.FC<RootCanalSectionProps> = ({ onEnquire }) => {
  const [activePart, setActivePart] = useState<AnatomyPart>(null);

  const anatomyDetails: Record<
    Exclude<AnatomyPart, null>,
    { name: string; role: string; clinicalRelevance: string }
  > = {
    enamel: {
      name: 'Enamel (Outer Layer)',
      role: 'The hardest biological mineral surface in the body, protecting against chewing forces.',
      clinicalRelevance:
        'When decay penetrates through the enamel without timely treatment, bacteria can reach the underlying softer dentin.',
    },
    dentin: {
      name: 'Dentin (Structural Core)',
      role: 'Micro-tubular tissue comprising the bulk of the tooth crown and roots.',
      clinicalRelevance:
        'Contains microscopic tubules connecting directly to the dental pulp. Endodontic care aims to preserve sound dentin integrity.',
    },
    pulp: {
      name: 'Dental Pulp Chamber',
      role: 'Contains blood vessels, nerve endings, and connective cellular tissue.',
      clinicalRelevance:
        'When irreversibly inflamed or infected by deep decay or trauma, gently clearing and disinfecting this chamber relieves pain and saves the tooth.',
    },
    canal: {
      name: 'Root Canals & Apex',
      role: 'Narrow pathways traversing down each root apex into the jawbone.',
      clinicalRelevance:
        'Carefully shaped, disinfected using micro-rotary files, and hermetically sealed to prevent bacterial re-entry into surrounding bone.',
    },
  };

  return (
    <section id="root-canal-care" className="w-full bg-white py-16 sm:py-20 border-t border-[#A8B8B2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header with Vertical Deep Teal Accent */}
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="w-1.5 h-16 sm:h-20 bg-[#145B5A] rounded-full shrink-0 mt-1" />
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#145B5A]">
              SPECIALIST CARE · NATURAL TOOTH RETENTION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#004242]">
              Understanding Root Canal Treatment
            </h2>
            <p className="text-sm sm:text-base text-[#536463] leading-relaxed">
              Root canal treatment may help address certain problems affecting the inside of a tooth. A dental
              professional can assess your symptoms, explain the available options, and recommend an appropriate
              course of care.
            </p>
          </div>
        </div>

        {/* Core Anatomy Diagram & Step Breakdown Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Tooth Cross-Section Diagram */}
          <div className="lg:col-span-5 bg-[#EDF2F1] rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-xs border border-[#A8B8B2]/30">
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#A8B8B2]/20">
              <span className="text-sm font-semibold text-[#004242]">Natural Tooth Internal Anatomy</span>
              <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#145B5A]/10 text-[#145B5A]">
                Interactive Cross Section
              </span>
            </div>

            {/* SVG Tooth Diagram */}
            <div className="w-full max-w-xs py-4 flex justify-center relative">
              <svg
                className="w-full h-auto max-h-[300px]"
                viewBox="0 0 280 330"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Enamel Shell */}
                <path
                  d="M 60,105 C 60,35 220,35 220,105 C 220,135 210,175 190,255 C 180,295 160,305 150,305 C 145,305 142,275 140,225 C 138,275 135,305 130,305 C 120,305 100,295 90,255 C 70,175 60,135 60,105 Z"
                  fill={activePart === 'enamel' ? '#AEEEEC' : '#E0F1F2'}
                  stroke={activePart === 'enamel' ? '#145B5A' : '#A8B8B2'}
                  strokeWidth={activePart === 'enamel' ? '2.5' : '1.5'}
                  className="transition-colors cursor-pointer"
                  onMouseEnter={() => setActivePart('enamel')}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === 'enamel' ? null : 'enamel')}
                />

                {/* Dentin Layer */}
                <path
                  d="M 75,110 C 75,60 205,60 205,110 C 205,140 195,180 178,250 C 170,285 156,290 150,290 C 146,290 144,265 140,220 C 136,265 134,290 130,290 C 124,290 110,285 102,250 C 85,180 75,140 75,110 Z"
                  fill={activePart === 'dentin' ? '#C4DEDB' : '#D5E6E7'}
                  stroke={activePart === 'dentin' ? '#145B5A' : '#BFC8C7'}
                  strokeWidth={activePart === 'dentin' ? '2.5' : '1'}
                  className="transition-colors cursor-pointer"
                  onMouseEnter={() => setActivePart('dentin')}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === 'dentin' ? null : 'dentin')}
                />

                {/* Pulp Chamber & Root Canals */}
                <path
                  d="M 105,110 C 105,90 175,90 175,110 C 175,125 160,145 160,175 C 160,215 152,270 148,270 C 146,270 144,230 140,190 C 136,230 134,270 132,270 C 128,270 120,215 120,175 C 120,145 105,125 105,110 Z"
                  fill={activePart === 'pulp' || activePart === 'canal' ? '#855236' : '#A76D4E'}
                  opacity={activePart === 'pulp' || activePart === 'canal' ? '1' : '0.85'}
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setActivePart('pulp')}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() => setActivePart(activePart === 'pulp' ? null : 'pulp')}
                />

                {/* Apical openings */}
                <circle cx="132" cy="270" r="3" fill="#BA1A1A" />
                <circle cx="148" cy="270" r="3" fill="#BA1A1A" />

                {/* Callout Lines */}
                {/* Enamel */}
                <line x1="210" y1="75" x2="250" y2="75" stroke="#004242" strokeDasharray="2,2" strokeWidth="1.5" />
                <text x="254" y="78" fill="#004242" fontFamily="Inter" fontSize="10" fontWeight="600">
                  Enamel
                </text>

                {/* Dentin */}
                <line x1="195" y1="125" x2="240" y2="125" stroke="#004242" strokeDasharray="2,2" strokeWidth="1.5" />
                <text x="244" y="128" fill="#004242" fontFamily="Inter" fontSize="10" fontWeight="600">
                  Dentin
                </text>

                {/* Pulp */}
                <line x1="105" y1="115" x2="30" y2="115" stroke="#855236" strokeDasharray="2,2" strokeWidth="1.5" />
                <text x="5" y="118" fill="#855236" fontFamily="Inter" fontSize="10" fontWeight="600">
                  Pulp
                </text>

                {/* Canal */}
                <line x1="120" y1="205" x2="30" y2="205" stroke="#855236" strokeDasharray="2,2" strokeWidth="1.5" />
                <text x="2" y="208" fill="#855236" fontFamily="Inter" fontSize="10" fontWeight="600">
                  Canal
                </text>
              </svg>
            </div>

            {/* Dynamic Anatomy Description or Default Schematic Note */}
            <div className="w-full mt-2 min-h-[64px] bg-white/70 rounded-xl p-3 border border-[#A8B8B2]/30 text-xs">
              {activePart ? (
                <div>
                  <span className="font-semibold text-[#004242] block mb-0.5">
                    {anatomyDetails[activePart].name}
                  </span>
                  <p className="text-[#263536]">{anatomyDetails[activePart].role}</p>
                  <p className="text-[#536463] mt-1 italic">{anatomyDetails[activePart].clinicalRelevance}</p>
                </div>
              ) : (
                <div className="text-[#536463] text-center flex items-center justify-center gap-1.5 h-full">
                  <Info className="w-3.5 h-3.5 text-[#145B5A] shrink-0" />
                  <span>Tap or hover over anatomical layers above to view their biological function.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: 3 Procedural Milestones Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Step 01 */}
            <div className="bg-[#FCFDFB] p-5 sm:p-6 rounded-xl flex items-start gap-4 shadow-xs border border-[#A8B8B2]/30 hover:border-[#145B5A]/50 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#145B5A] text-white flex items-center justify-center shrink-0 font-semibold text-sm">
                01
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-[#145B5A]" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#0F1E1F]">Assessment</h3>
                </div>
                <p className="text-sm text-[#536463] leading-relaxed">
                  Discuss your symptoms and undergo an appropriate dental examination with calibrated radiographic
                  diagnostics to determine tooth vitality and periapical status.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-[#FCFDFB] p-5 sm:p-6 rounded-xl flex items-start gap-4 shadow-xs border border-[#A8B8B2]/30 hover:border-[#145B5A]/50 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#004242] text-white flex items-center justify-center shrink-0 font-semibold text-sm">
                02
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#145B5A]" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#0F1E1F]">Treatment Planning</h3>
                </div>
                <p className="text-sm text-[#536463] leading-relaxed">
                  Understand the recommended approach, possible alternatives, and what the procedure involves. Every
                  step is clearly explained before proceeding.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-[#FCFDFB] p-5 sm:p-6 rounded-xl flex items-start gap-4 shadow-xs border border-[#A8B8B2]/30 hover:border-[#855236]/50 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#855236] text-white flex items-center justify-center shrink-0 font-semibold text-sm">
                03
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#855236]" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#0F1E1F]">Follow-up Care</h3>
                </div>
                <p className="text-sm text-[#536463] leading-relaxed">
                  Receive guidance about crown restoration, ongoing oral hygiene, and any recommended follow-up
                  appointments to ensure lasting tooth stability.
                </p>
              </div>
            </div>

            {/* Action & Clinical Disclaimer */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                onClick={onEnquire}
                className="inline-flex items-center justify-center bg-[#145B5A] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#0E4443] transition-colors cursor-pointer shrink-0"
              >
                Enquire About Root Canal Care
              </button>
              <p className="text-xs text-[#536463] max-w-md italic leading-tight">
                Individual treatment decisions require clinical examination and diagnostic imaging. We do not
                guarantee treatment outcomes without prior assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
