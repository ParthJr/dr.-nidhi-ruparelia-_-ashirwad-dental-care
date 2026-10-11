import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import {
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  RotateCcw,
  Sparkles,
  Search,
  ChevronDown,
  Info,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'single-sitting-rct':
        return <Stethoscope className="w-6 h-6 text-[#145B5A]" />;
      case 'endodontic-retreatment':
        return <RotateCcw className="w-6 h-6 text-[#145B5A]" />;
      case 'endodontic-surgery':
        return <Sparkles className="w-6 h-6 text-[#855236]" />;
      case 'assessment-second-opinion':
        return <Search className="w-6 h-6 text-[#145B5A]" />;
      default:
        return <Stethoscope className="w-6 h-6 text-[#145B5A]" />;
    }
  };

  return (
    <section id="services" className="w-full py-16 sm:py-20 bg-[#FCFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#855236]">
            COMPREHENSIVE ENDODONTIC PRACTICES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#004242]">
            Dental Care Guided by Your Needs
          </h2>
          <p className="text-sm sm:text-base text-[#536463]">
            Specialized endodontic procedures aimed at preserving tooth structure and resolving inner-tooth
            inflammation through gentle, conservative modalities.
          </p>
        </div>

        {/* 4 Structured Service Cards Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_CONFIG.services.map((service, index) => {
            const isAltCard = index % 2 === 0;
            const isExpanded = expandedDetails === service.id;

            return (
              <div
                key={service.id}
                className={`rounded-2xl p-6 flex flex-col justify-between shadow-xs border border-[#A8B8B2]/30 hover:shadow-md hover:border-[#145B5A]/40 transition-all ${
                  isAltCard ? 'bg-[#EDF2F1]' : 'bg-white'
                }`}
              >
                <div className="flex flex-col gap-4">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs ${
                        isAltCard ? 'bg-white' : 'bg-[#EDF2F1]'
                      }`}
                    >
                      {getServiceIcon(service.id)}
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FFDBCB] text-[#693B21]">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-semibold text-[#0F1E1F] leading-snug">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-[#536463] leading-relaxed">{service.description}</p>
                  </div>

                  {/* Clinical Indicators */}
                  <ul className="space-y-1.5 text-xs text-[#263536] pt-1">
                    {service.indicators.map((ind, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#145B5A] shrink-0" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expandable Clinical Details */}
                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-[#A8B8B2]/20 text-xs text-[#536463] space-y-1.5 bg-black/[0.02] p-2.5 rounded-lg">
                      <p className="font-semibold text-[#004242]">Clinical Protocol:</p>
                      {service.details.map((detail, idx) => (
                        <p key={idx} className="flex items-start gap-1">
                          <span className="text-[#145B5A]">•</span>
                          <span>{detail}</span>
                        </p>
                      ))}
                      <p className="mt-2 text-[11px] italic text-[#855236]">
                        Ideal for: {service.suitableFor}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-[#A8B8B2]/30 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => onSelectService(service.title)}
                      className="text-xs sm:text-sm font-semibold text-[#145B5A] hover:text-[#004242] inline-flex items-center gap-1 group cursor-pointer"
                    >
                      <span>Learn more & enquire</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      onClick={() => setExpandedDetails(isExpanded ? null : service.id)}
                      className="text-[11px] text-[#536463] hover:text-[#145B5A] underline flex items-center gap-0.5 cursor-pointer"
                      title={isExpanded ? 'Hide details' : 'Show clinical notes'}
                    >
                      <span>{isExpanded ? 'Less' : 'Details'}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Disclaimer Notice */}
        <div className="bg-[#DBEBEC]/60 rounded-xl p-3 sm:p-4 text-center border border-[#A8B8B2]/30">
          <p className="text-xs text-[#263536] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5">
            <Info className="w-4 h-4 text-[#145B5A]" />
            <span>Notice: The clinic must confirm procedure eligibility based on individual diagnostic evaluation.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
