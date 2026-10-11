import React from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { Phone, MapPin, ShieldCheck, Star } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenPrivacy }) => {
  return (
    <footer className="w-full bg-[#145B5A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-[#A8B8B2]/20 pb-12">
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FFDBCB]">
                <svg className="w-6 h-6 fill-current text-[#FEBA98]" viewBox="0 0 24 24">
                  <path d="M18.8 4C17.3 2.8 15.2 3.1 13.8 4.2L12 5.7L10.2 4.2C8.8 3.1 6.7 2.8 5.2 4C2.7 6.1 2.2 10.3 3.6 13.2C4.5 15.1 5.8 17.5 7.4 20.3C7.9 21.2 9 21.7 10 21.4C11.1 21.1 11.7 20 11.5 18.9L11 16.5C11 16.2 11.2 16 11.5 16H12.5C12.8 16 13 16.2 13 16.5L12.5 18.9C12.3 20 12.9 21.1 14 21.4C15 21.7 16.1 21.2 16.6 20.3C18.2 17.5 19.5 15.1 20.4 13.2C21.8 10.3 21.3 6.1 18.8 4Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-xl text-white tracking-tight">
                  {CLINIC_CONFIG.name}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#FEBA98] font-semibold">
                  Endodontic & Natural Tooth Preservation
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#E0F1F2]/90 max-w-md leading-relaxed">
              Led by Dr. Nidhi Ruparelia, delivering specialized biological endodontics and conservative restorative
              care to preserve your natural smile in Gandhinagar.
            </p>

            <a
              href={CLINIC_CONFIG.maps.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-full border border-[#FFDBCB]/30 transition-colors"
            >
              <Star className="w-3.5 h-3.5 text-[#FEBA98] fill-[#FEBA98]" />
              <span className="text-xs text-white font-medium">5.0 ★ · 173 Google reviews</span>
            </a>
          </div>

          {/* Clinic Location (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#FEBA98] uppercase tracking-wider">
              Clinic Location
            </span>
            <address className="not-italic text-xs sm:text-sm text-[#E0F1F2]/90 space-y-1 leading-relaxed">
              <p>{CLINIC_CONFIG.address.line1}</p>
              <p>{CLINIC_CONFIG.address.line2}</p>
              <p>
                {CLINIC_CONFIG.address.locality}, {CLINIC_CONFIG.address.city}, {CLINIC_CONFIG.address.state}{' '}
                {CLINIC_CONFIG.address.pincode}
              </p>
            </address>

            <div className="pt-2">
              <a
                href={CLINIC_CONFIG.phone.telHref}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#FEBA98] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call: {CLINIC_CONFIG.phone.display}</span>
              </a>
            </div>
          </div>

          {/* Preservation Care Navigation (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#FEBA98] uppercase tracking-wider">
              Preservation Care
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E0F1F2]/90">
              <li>
                <button
                  onClick={() => onNavigateSection('root-canal-care')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Microscopic Root Canal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Tooth Re-treatment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Apicoectomy (Endodontic Surgery)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('patient-guide')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Post-Care & FAQ Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('consultation-booking')}
                  className="hover:text-white font-medium text-[#FEBA98] transition-colors cursor-pointer text-left"
                >
                  Book Consultation →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E0F1F2]/75">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Ashirwad Dental Care. Dr. Nidhi Ruparelia. All rights reserved.</p>
            <button
              onClick={onOpenPrivacy}
              className="underline hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
          <p className="text-center md:text-right max-w-xl text-[11px] leading-relaxed">
            Clinical disclaimer: Consultation and diagnostic imaging are required before clinical procedure confirmation.
            Content is educational and does not replace in-person dental diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
};
