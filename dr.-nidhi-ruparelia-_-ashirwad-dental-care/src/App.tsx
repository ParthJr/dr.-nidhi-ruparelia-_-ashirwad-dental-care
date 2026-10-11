/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RootCanalSection } from './components/RootCanalSection';
import { ServicesSection } from './components/ServicesSection';
import { ClinicianProfile } from './components/ClinicianProfile';
import { PatientJourney } from './components/PatientJourney';
import { PatientGuideAccordion } from './components/PatientGuideAccordion';
import { ReviewsSection } from './components/ReviewsSection';
import { AppointmentForm } from './components/AppointmentForm';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ReceptionInquiriesModal } from './components/ReceptionInquiriesModal';
import { PrivacyModal } from './components/PrivacyModal';
import { getStoredConsultations } from './services/consultationService';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Root Canal Treatment');
  const [isReceptionOpen, setIsReceptionOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [inquiriesCount, setInquiriesCount] = useState(0);

  const refreshInquiriesCount = () => {
    const list = getStoredConsultations();
    setInquiriesCount(list.length);
  };

  useEffect(() => {
    refreshInquiriesCount();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollToSection('consultation-booking');
  };

  const handleOpenConsultation = () => {
    scrollToSection('consultation-booking');
  };

  const handleExploreRootCanal = () => {
    scrollToSection('root-canal-care');
  };

  return (
    <div className="min-h-screen bg-[#FCFDFB] text-[#263536] flex flex-col font-sans selection:bg-[#145B5A]/20 selection:text-[#145B5A]">
      {/* 1. Header & Navigation */}
      <Header
        onOpenConsultation={handleOpenConsultation}
        onOpenReception={() => setIsReceptionOpen(true)}
        pendingInquiriesCount={inquiriesCount}
      />

      {/* Main Content Sections in Required Order */}
      <main className="flex-1 w-full pt-16 sm:pt-20">
        {/* 2. Hero: "Helping You Keep Your Natural Teeth." */}
        <HeroSection
          onRequestConsultation={handleOpenConsultation}
          onExploreRootCanal={handleExploreRootCanal}
        />

        {/* 3. Root Canal Treatment Explanation */}
        <RootCanalSection onEnquire={handleOpenConsultation} />

        {/* 4. Listed Endodontic Services */}
        <ServicesSection onSelectService={handleSelectServiceFromCard} />

        {/* 5. Clinician Profile: Dr. Nidhi Ruparelia */}
        <ClinicianProfile onBookConsultation={handleOpenConsultation} />

        {/* 6. Patient Journey: "Know What to Expect at Your Visit" */}
        <PatientJourney />

        {/* 7. Patient Information Accordion: Common Questions */}
        <PatientGuideAccordion onOpenConsultation={handleOpenConsultation} />

        {/* 8. Google Review Summary: 5.0 from 173 Reviews */}
        <ReviewsSection />

        {/* 9. Validated Consultation Request Form */}
        <AppointmentForm
          selectedService={selectedService}
          onSubmissionSuccess={refreshInquiriesCount}
        />

        {/* 10. Contact and Location in Kudasan, Gandhinagar */}
        <LocationSection onBookOnline={handleOpenConsultation} />
      </main>

      {/* 11. Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Reception Queue Modal */}
      <ReceptionInquiriesModal
        isOpen={isReceptionOpen}
        onClose={() => setIsReceptionOpen(false)}
        onInquiriesUpdated={refreshInquiriesCount}
      />

      {/* Privacy Notice Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
