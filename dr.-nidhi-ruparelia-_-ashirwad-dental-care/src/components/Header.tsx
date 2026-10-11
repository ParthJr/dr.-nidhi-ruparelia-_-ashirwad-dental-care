import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { Phone, Menu, X, Calendar, UserCheck, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenReception: () => void;
  pendingInquiriesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onOpenReception,
  pendingInquiriesCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'root-canal-care', 'services', 'clinician', 'patient-journey', 'patient-guide', 'contact-location'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'clinician' },
    { label: 'Root Canal Care', id: 'root-canal-care' },
    { label: 'Treatments', id: 'services' },
    { label: 'Patient Guide', id: 'patient-guide' },
    { label: 'Contact', id: 'contact-location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FCFDFB]/95 backdrop-blur-md shadow-xs border-b border-[#A8B8B2]/30 py-2'
            : 'bg-[#FCFDFB]/90 backdrop-blur-sm border-b border-[#A8B8B2]/20 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Clinic Branding */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 text-left group focus-visible:ring-2 focus-visible:ring-[#145B5A] rounded-lg p-1"
            aria-label="Ashirwad Dental Care - Return to top"
          >
            <div className="w-10 h-10 rounded-xl bg-[#145B5A] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              {/* Tooth icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.8 4C17.3 2.8 15.2 3.1 13.8 4.2L12 5.7L10.2 4.2C8.8 3.1 6.7 2.8 5.2 4C2.7 6.1 2.2 10.3 3.6 13.2C4.5 15.1 5.8 17.5 7.4 20.3C7.9 21.2 9 21.7 10 21.4C11.1 21.1 11.7 20 11.5 18.9L11 16.5C11 16.2 11.2 16 11.5 16H12.5C12.8 16 13 16.2 13 16.5L12.5 18.9C12.3 20 12.9 21.1 14 21.4C15 21.7 16.1 21.2 16.6 20.3C18.2 17.5 19.5 15.1 20.4 13.2C21.8 10.3 21.3 6.1 18.8 4Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg sm:text-xl text-[#004242] tracking-tight leading-tight">
                {CLINIC_CONFIG.name}
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#536463]">
                Dr. Nidhi Ruparelia · Kudasan
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium py-1 transition-colors relative cursor-pointer ${
                    isActive
                      ? 'text-[#004242] font-semibold'
                      : 'text-[#536463] hover:text-[#004242]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#145B5A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Contacts & CTA */}
          <div className="flex items-center gap-3">
            {/* Click to call link */}
            <a
              href={CLINIC_CONFIG.phone.telHref}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#145B5A] hover:text-[#004242] px-2.5 py-1.5 rounded-lg hover:bg-[#EDF2F1] transition-colors"
              title="Call Ashirwad Dental Care"
            >
              <Phone className="w-4 h-4 text-[#C48768]" />
              <span>{CLINIC_CONFIG.phone.display}</span>
            </a>

            {/* Request a Consultation CTA */}
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center bg-[#145B5A] text-white text-xs sm:text-sm font-medium px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-xs hover:bg-[#0E4443] transition-all cursor-pointer"
            >
              Request a Consultation
            </button>

            {/* Reception inquiries review tool (honest admin/desk access) */}
            <button
              onClick={onOpenReception}
              className="relative p-2 rounded-lg text-[#536463] hover:text-[#145B5A] hover:bg-[#EDF2F1] transition-colors"
              title="Clinic Desk Inquiries"
              aria-label="Clinic Reception Queue"
            >
              <UserCheck className="w-5 h-5" />
              {pendingInquiriesCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#C48768] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#263536] hover:bg-[#EDF2F1] focus-visible:ring-2 focus-visible:ring-[#145B5A]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div
            className="fixed top-20 right-0 w-full max-w-sm h-[calc(100vh-80px)] bg-[#FCFDFB] border-l border-[#A8B8B2]/30 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#A8B8B2]/20 pb-4">
                <p className="text-xs uppercase font-semibold text-[#855236] tracking-wider mb-1">
                  Ashirwad Dental Care
                </p>
                <p className="text-sm text-[#536463]">
                  Kudasan, Gandhinagar · Dr. Nidhi Ruparelia
                </p>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-[#263536] hover:bg-[#EDF2F1] hover:text-[#145B5A] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="pt-2 border-t border-[#A8B8B2]/20 flex flex-col gap-3">
                <a
                  href={CLINIC_CONFIG.phone.telHref}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#EDF2F1] text-[#145B5A] font-semibold text-sm hover:bg-[#dbebec] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C48768]" />
                  <span>Call {CLINIC_CONFIG.phone.display}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#145B5A] text-white py-3 rounded-lg font-medium text-sm shadow-xs hover:bg-[#0E4443] transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request a Consultation</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#A8B8B2]/20 text-xs text-[#536463]">
              <p>Swagat Rainforest 1, E106, Kudasan, Gandhinagar</p>
              <p className="mt-1 font-medium text-[#004242]">Mon 10:00 AM onwards</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
