import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

interface PatientGuideAccordionProps {
  onOpenConsultation: () => void;
}

export const PatientGuideAccordion: React.FC<PatientGuideAccordionProps> = ({ onOpenConsultation }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <section id="patient-guide" className="w-full bg-white py-16 sm:py-20 border-t border-[#A8B8B2]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#855236]">
            PATIENT GUIDANCE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#004242]">
            Clear Answers to Common Questions
          </h2>
          <p className="text-sm sm:text-base text-[#536463]">
            Educational guidance on endodontic care and your clinic visit.
          </p>
        </div>

        {/* Interactive Accordion Container */}
        <div className="flex flex-col gap-3" id="faq-accordion">
          {CLINIC_CONFIG.faq.map((item, index) => {
            const isOpen = openIndices.includes(index);
            const accordionId = `faq-content-${index}`;

            return (
              <div
                key={index}
                className="rounded-xl bg-[#EDF2F1] border border-[#A8B8B2]/30 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={accordionId}
                  onClick={() => toggleIndex(index)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left text-[#0F1E1F] font-semibold text-base sm:text-lg hover:text-[#145B5A] transition-colors focus-visible:ring-2 focus-visible:ring-[#145B5A] cursor-pointer"
                >
                  <span className="pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#145B5A] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={accordionId}
                    role="region"
                    className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#536463] leading-relaxed border-t border-[#A8B8B2]/15"
                  >
                    <p>{item.answer}</p>
                    {index === 4 && (
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={onOpenConsultation}
                          className="text-xs font-semibold text-[#145B5A] underline hover:text-[#004242] cursor-pointer"
                        >
                          Fill consultation form →
                        </button>
                        <span className="text-xs text-[#A8B8B2]">or</span>
                        <a
                          href={CLINIC_CONFIG.phone.telHref}
                          className="text-xs font-semibold text-[#855236] hover:underline"
                        >
                          Call {CLINIC_CONFIG.phone.display}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-center text-[#536463] italic">
          Informational guide only. Treatment decisions require in-person clinical assessment and diagnostic examination.
        </p>
      </div>
    </section>
  );
};
