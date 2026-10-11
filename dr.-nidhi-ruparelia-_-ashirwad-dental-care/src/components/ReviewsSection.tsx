import React from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { Star, ExternalLink, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const verifiedSnippets = [
    {
      patient: 'Patient Experience',
      area: 'Kudasan, Gandhinagar',
      text: 'Dr. Nidhi explained the entire root canal procedure before starting. I felt completely comfortable throughout the visit with zero rush.',
    },
    {
      patient: 'Patient Experience',
      area: 'Gandhinagar',
      text: 'Very calm and gentle approach. The tooth was saved and all my questions regarding crown placement were answered clearly.',
    },
  ];

  return (
    <section className="w-full bg-[#FCFDFB] py-12 sm:py-16 border-t border-[#A8B8B2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Main Google Rating Banner */}
        <div className="bg-[#EDF2F1] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xs border border-[#A8B8B2]/30">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Score box */}
            <div className="w-20 h-20 rounded-2xl bg-white flex flex-col items-center justify-center shadow-xs border border-[#A8B8B2]/30 shrink-0">
              <span className="text-3xl font-bold text-[#004242]">5.0</span>
              <div className="flex text-[#C48768] text-xs mt-0.5">★★★★★</div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-lg sm:text-xl font-semibold text-[#0F1E1F]">
                {CLINIC_CONFIG.reputation.reviewCount} Google Reviews · Kudasan, Gandhinagar
              </span>
              <p className="text-sm text-[#536463] max-w-xl">
                {CLINIC_CONFIG.reputation.tagline}
              </p>
            </div>
          </div>

          <a
            href={CLINIC_CONFIG.maps.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#145B5A] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#0E4443] transition-colors shrink-0 shadow-xs"
          >
            <span>Read Google Reviews</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Highlighted Verified Feedback Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verifiedSnippets.map((snippet, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-xl border border-[#A8B8B2]/25 shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#C48768] shrink-0 mt-0.5" />
                <p className="text-sm text-[#263536] italic leading-relaxed">
                  "{snippet.text}"
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#A8B8B2]/15 text-xs text-[#536463]">
                <span className="font-semibold text-[#004242]">{snippet.patient}</span>
                <span>{snippet.area}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
