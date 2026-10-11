import React from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { CheckCircle2, Shield, MessageSquare, Clock, BadgeCheck, Calendar } from 'lucide-react';

interface ClinicianProfileProps {
  onBookConsultation: () => void;
}

export const ClinicianProfile: React.FC<ClinicianProfileProps> = ({ onBookConsultation }) => {
  return (
    <section id="clinician" className="w-full bg-white py-16 sm:py-20 border-t border-[#A8B8B2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#855236]">
            DEDICATED DENTAL LEADERSHIP
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#004242]">
            Personal Attention. Clear Explanations.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Portrait of Dr. Nidhi Ruparelia */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg bg-[#EDF2F1] border border-[#A8B8B2]/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxDa86vDrHDH7s_9HwUl4Ze_R3wmZ-XTYRUA5c2r5VGBJ-Tk39-yKfLFK5x4UgykOI_4WSGdEBs_4BfTtO1i0tF7XaN8k3gCob4QNnkz3-vdlUmAEehb0F6HTbLt_vzzIvOEDx2QEW05B1Uzfi9cNcnAD-l9HJ4PjE--MV-9xU9KrukZVKx33MJJoCl57v6BCbZRHVP7M29EJwSWbDhNGJN5Lsq1vZzie-slfF_li7LEDcudh6KyvT5A"
                alt="Dr. Nidhi Ruparelia, dental practitioner at Ashirwad Dental Care Kudasan"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004242]/30 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Decorative accent corner block */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FFDBCB]/40 rounded-2xl -z-10 hidden sm:block" />
          </div>

          {/* Right: Profile text & clinical principles */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#145B5A]">
                {CLINIC_CONFIG.doctorName}
              </h3>
              <span className="text-base sm:text-lg font-medium text-[#855236]">
                {CLINIC_CONFIG.doctorTitle} · {CLINIC_CONFIG.name}, Kudasan
              </span>
            </div>

            <p className="text-base sm:text-lg text-[#263536] leading-relaxed font-normal">
              Dr. Nidhi Ruparelia is dedicated to providing calm, transparent, and precise dental care. With a focus
              on patient communication and natural tooth preservation, every consultation begins with listening
              carefully to your symptoms and clearly reviewing your treatment alternatives.
            </p>

            {/* Key Principles List */}
            <div className="bg-[#EDF2F1] rounded-xl p-5 sm:p-6 flex flex-col gap-4 border border-[#A8B8B2]/30">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#004242]">
                Clinical Care Principles
              </span>
              <ul className="space-y-3 text-sm text-[#263536]">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#145B5A] shrink-0 mt-0.5" />
                  <span>Focus on preserving sound tooth structure wherever clinically viable</span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-[#145B5A] shrink-0 mt-0.5" />
                  <span>Clear, jargon-free explanations of your radiographic findings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#145B5A] shrink-0 mt-0.5" />
                  <span>Unhurried consultations designed to address your individual questions and comfort</span>
                </li>
              </ul>
            </div>

            {/* Verified badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2 text-xs text-[#536463]">
                <BadgeCheck className="w-4 h-4 text-[#855236] shrink-0" />
                <span>Confirmed practicing clinician at Swagat Rainforest 1, Kudasan, Gandhinagar.</span>
              </div>

              <button
                onClick={onBookConsultation}
                className="inline-flex items-center gap-2 bg-[#145B5A] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#0E4443] transition-colors cursor-pointer shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book with Dr. Nidhi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
