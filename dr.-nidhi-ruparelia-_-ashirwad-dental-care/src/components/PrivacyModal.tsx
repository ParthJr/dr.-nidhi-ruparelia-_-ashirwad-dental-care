import React from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div
        className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col border border-[#A8B8B2]/40 z-10 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Patient Privacy Notice"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#A8B8B2]/20 flex items-center justify-between bg-[#EDF2F1]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#145B5A]" />
            <h3 className="text-base font-semibold text-[#0F1E1F]">
              Patient Privacy Notice & Data Handling
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#536463] hover:text-[#0F1E1F] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#263536] leading-relaxed">
          <div>
            <h4 className="font-semibold text-[#004242] mb-1">1. Scope of Inquiry Information</h4>
            <p className="text-[#536463]">
              {CLINIC_CONFIG.name} collects your full name, mobile number, preferred consultation timeframe, and
              optional notes regarding your symptoms strictly for the purpose of scheduling your clinical
              examination and answering your inquiries.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#004242] mb-1">2. Confidentiality & Non-Disclosure</h4>
            <p className="text-[#536463]">
              Your contact details and symptom notes are never sold, rented, or distributed to third-party marketing
              agencies or pharmaceutical distributors. Access is restricted exclusively to Dr. Nidhi Ruparelia and
              authorized clinic staff at Swagat Rainforest 1, Kudasan.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#004242] mb-1">3. Clinical Examination Required</h4>
            <p className="text-[#536463]">
              Information submitted online does not establish a formal doctor-patient relationship nor constitute
              definitive diagnostic advice. Precise diagnosis and procedural determinations occur only in person
              following calibrated clinical examination and radiographic evaluation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#004242] mb-1">4. Questions or Records Removal</h4>
            <p className="text-[#536463]">
              If you wish to modify or erase your consultation enquiry, you may contact the clinic directly at{' '}
              <a href={CLINIC_CONFIG.phone.telHref} className="text-[#145B5A] font-semibold underline">
                {CLINIC_CONFIG.phone.display}
              </a>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#A8B8B2]/20 bg-[#EDF2F1] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#145B5A] text-white text-xs font-semibold rounded-lg hover:bg-[#0E4443] transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
