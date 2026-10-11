import React from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ArrowRight } from 'lucide-react';

interface LocationSectionProps {
  onBookOnline: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onBookOnline }) => {
  return (
    <section id="contact-location" className="w-full bg-[#EDF2F1] py-16 sm:py-20 border-t border-[#A8B8B2]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#855236]">
            VISIT ASHIRWAD DENTAL CARE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#004242]">
            Find Ashirwad Dental Care
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Practice Contact Details Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs border border-[#A8B8B2]/30">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0F1E1F]">
                  {CLINIC_CONFIG.doctorName}
                </h3>
                <span className="text-sm font-semibold text-[#145B5A]">
                  {CLINIC_CONFIG.name}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-[#263536]">
                <MapPin className="w-5 h-5 text-[#855236] shrink-0 mt-0.5" />
                <address className="not-italic text-sm text-[#263536] leading-relaxed">
                  {CLINIC_CONFIG.address.line1},<br />
                  {CLINIC_CONFIG.address.line2},<br />
                  {CLINIC_CONFIG.address.locality}, {CLINIC_CONFIG.address.city}, {CLINIC_CONFIG.address.state} {CLINIC_CONFIG.address.pincode}
                </address>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 text-[#263536]">
                <Phone className="w-5 h-5 text-[#855236] shrink-0" />
                <a
                  href={CLINIC_CONFIG.phone.telHref}
                  className="text-lg font-semibold text-[#145B5A] hover:underline"
                >
                  {CLINIC_CONFIG.phone.display}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 text-[#263536]">
                <Clock className="w-5 h-5 text-[#855236] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#263536]">
                  <p>
                    <span className="font-semibold text-[#0F1E1F]">Hours:</span> Monday from 10:00 AM
                  </p>
                  <p className="text-[#536463] mt-1 leading-normal">
                    {CLINIC_CONFIG.schedule.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-[#A8B8B2]/30">
              <a
                href={CLINIC_CONFIG.phone.telHref}
                className="inline-flex items-center gap-2 bg-[#145B5A] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#0E4443] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {CLINIC_CONFIG.phone.display}</span>
              </a>

              <a
                href={CLINIC_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#EDF2F1] text-[#145B5A] text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#DBEBEC] transition-colors border border-[#A8B8B2]/40"
              >
                <Navigation className="w-4 h-4 text-[#855236]" />
                <span>Get Directions</span>
              </a>

              <button
                onClick={onBookOnline}
                className="inline-flex items-center gap-1 text-[#855236] text-xs sm:text-sm font-semibold px-2 py-2 hover:underline cursor-pointer"
              >
                <span>Book Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Google Map Container Component */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden shadow-xs border border-[#A8B8B2]/30 flex flex-col relative min-h-[360px]">
            {/* Map image graphic from Stitch specification */}
            <div
              className="w-full h-full min-h-[360px] bg-cover bg-center flex flex-col justify-end p-4 sm:p-6 relative"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCe9tFxSglzoIcmR_eZCwnUJAzxxgnMWdBJH1ue61SJ24-IV815qs2oteIeYbWDSwPaVyxlCzfmRV-ftGswSm_yt6uMdxGFzZUR7ftychnpNjF5t4GgVTqYKpi7KS3U7zYfprPWP8A6Da1Ms2qiM54Nd6q8eNaN5_Ut4J9kOzLfJzi3cOKbuTw9wpgh7VlhKuyxLS9weoeew_duXrCHqvyRHtlyg6v06x4Nwkh2k8tES5zSNh8Fv5HaHQ')",
              }}
            >
              {/* Map pin marker icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-[#145B5A] text-white flex items-center justify-center shadow-lg ring-4 ring-white animate-bounce">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="mt-1 bg-white/95 px-2.5 py-1 rounded-md shadow-md text-[11px] font-bold text-[#004242] border border-[#A8B8B2]/40 whitespace-nowrap">
                  Ashirwad Dental Care
                </div>
              </div>

              {/* Floating Address Bar */}
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl max-w-md shadow-md border border-[#A8B8B2]/40 relative z-10 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#004242] font-semibold text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-[#855236] shrink-0" />
                    <span>Kudasan Road, Swagat Rainforest 1</span>
                  </div>
                  <a
                    href={CLINIC_CONFIG.maps.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#145B5A] font-semibold underline flex items-center gap-1 hover:text-[#004242]"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-[#536463] leading-relaxed">
                  Located near Black Pepper restaurant. Ground and first-floor parking available in commercial arcade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
