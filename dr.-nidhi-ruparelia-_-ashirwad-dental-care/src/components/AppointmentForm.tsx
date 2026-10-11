import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import {
  submitConsultationRequest,
  validateIndianMobile,
  validateAppointmentDate,
} from '../services/consultationService';
import { Send, CheckCircle, AlertCircle, Loader2, Calendar, Phone, Clock, User } from 'lucide-react';

interface AppointmentFormProps {
  selectedService?: string;
  onSubmissionSuccess?: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedService,
  onSubmissionSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [serviceInterest, setServiceInterest] = useState(
    selectedService || CLINIC_CONFIG.services[0].title
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM – 1:00 PM)');
  const [symptomsNotes, setSymptomsNotes] = useState('');
  const [consentAgreed, setConsentAgreed] = useState(false);

  // Validation errors
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [successRequestId, setSuccessRequestId] = useState<string | null>(null);

  // Sync incoming selectedService
  useEffect(() => {
    if (selectedService) {
      setServiceInterest(selectedService);
    }
  }, [selectedService]);

  // Set default minimum date (today)
  const todayStr = new Date().toISOString().split('T')[0];

  const handlePhoneChange = (val: string) => {
    setMobileNumber(val);
    if (val.trim().length >= 10) {
      const res = validateIndianMobile(val);
      if (!res.isValid) {
        setPhoneError(res.error || 'Invalid Indian mobile number');
      } else {
        setPhoneError(null);
      }
    } else {
      setPhoneError(null);
    }
  };

  const handleDateChange = (val: string) => {
    setPreferredDate(val);
    if (val) {
      const res = validateAppointmentDate(val);
      if (!res.isValid) {
        setDateError(res.error || 'Invalid date');
      } else {
        setDateError(null);
      }
    } else {
      setDateError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate phone
    const phoneRes = validateIndianMobile(mobileNumber);
    if (!phoneRes.isValid) {
      setPhoneError(phoneRes.error || 'Please enter a valid 10-digit mobile number');
      return;
    }

    // Validate date if selected
    if (preferredDate) {
      const dateRes = validateAppointmentDate(preferredDate);
      if (!dateRes.isValid) {
        setDateError(dateRes.error || 'Please select a valid upcoming date');
        return;
      }
    }

    if (!consentAgreed) {
      setFormError('Please check the confirmation box to submit your inquiry.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitConsultationRequest({
        fullName,
        mobileNumber,
        serviceInterest,
        preferredDate: preferredDate || todayStr,
        preferredTime,
        symptomsNotes,
        consentAgreed,
      });

      if (result.success) {
        setSubmittedSuccess(true);
        setSuccessRequestId(result.requestId || null);
        if (onSubmissionSuccess) {
          onSubmissionSuccess();
        }
      } else {
        setFormError(result.message);
      }
    } catch (err: any) {
      setFormError(
        'An unexpected network error occurred while submitting your inquiry. Please call the clinic directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setMobileNumber('');
    setServiceInterest(CLINIC_CONFIG.services[0].title);
    setPreferredDate('');
    setPreferredTime('Morning (10:00 AM – 1:00 PM)');
    setSymptomsNotes('');
    setConsentAgreed(false);
    setSubmittedSuccess(false);
    setSuccessRequestId(null);
    setPhoneError(null);
    setDateError(null);
    setFormError(null);
  };

  return (
    <section id="consultation-booking" className="w-full bg-[#E6F7F8] py-16 sm:py-20 border-t border-[#A8B8B2]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="text-center flex flex-col gap-2 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#855236]">
            APPOINTMENT INQUIRY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#004242]">
            Let's Discuss Your Dental Concerns.
          </h2>
          <p className="text-sm sm:text-base text-[#536463]">
            Request a consultation and share a convenient time for the clinic team to contact you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-md border border-[#A8B8B2]/30">
          {submittedSuccess ? (
            /* Success State */
            <div className="flex flex-col items-center text-center gap-5 py-6">
              <div className="w-16 h-16 rounded-full bg-[#E0F1F2] text-[#145B5A] flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#145B5A]" />
              </div>

              <div className="flex flex-col gap-2 max-w-md">
                <h3 className="text-xl font-semibold text-[#004242]">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-[#263536] font-medium leading-relaxed bg-[#EDF2F1] p-4 rounded-xl border border-[#A8B8B2]/30">
                  "Your consultation request has been received. The clinic team will contact you to confirm availability."
                </p>
                {successRequestId && (
                  <p className="text-xs text-[#536463] mt-1">
                    Reference ID: <span className="font-mono font-semibold text-[#004242]">{successRequestId}</span>
                  </p>
                )}
                <p className="text-xs text-[#536463] mt-2">
                  Our front desk at Swagat Rainforest 1, Kudasan reviews requests promptly. For immediate tooth pain
                  or urgent inquiries, please call us directly at{' '}
                  <a href={CLINIC_CONFIG.phone.telHref} className="text-[#145B5A] font-semibold underline">
                    {CLINIC_CONFIG.phone.display}
                  </a>.
                </p>
              </div>

              <button
                onClick={handleResetForm}
                className="mt-2 text-xs font-semibold text-[#145B5A] hover:text-[#0E4443] underline cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              {formError && (
                <div className="bg-[#FFDAD6] border border-[#BA1A1A]/30 text-[#93000A] p-4 rounded-xl text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="full-name" className="text-xs font-semibold text-[#0F1E1F]">
                    Full Name <span className="text-[#BA1A1A]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full bg-[#FCFDFB] border border-[#A8B8B2] px-3.5 py-2.5 rounded-lg text-sm text-[#263536] placeholder:text-[#A8B8B2] focus:border-[#145B5A] focus:ring-2 focus:ring-[#145B5A]/20 transition-all outline-hidden"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mobile-number" className="text-xs font-semibold text-[#0F1E1F]">
                    Mobile Number <span className="text-[#BA1A1A]">*</span>
                  </label>
                  <div className="flex items-center bg-[#FCFDFB] border border-[#A8B8B2] rounded-lg overflow-hidden focus-within:border-[#145B5A] focus-within:ring-2 focus-within:ring-[#145B5A]/20">
                    <span className="px-3 text-xs font-semibold text-[#536463] bg-[#EDF2F1] py-2.5 border-r border-[#A8B8B2]/50">
                      +91
                    </span>
                    <input
                      id="mobile-number"
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="98765 43210"
                      maxLength={14}
                      className="w-full bg-transparent px-3 py-2.5 text-sm text-[#263536] placeholder:text-[#A8B8B2] outline-hidden"
                    />
                  </div>
                  {phoneError ? (
                    <span className="text-[11px] text-[#BA1A1A]">{phoneError}</span>
                  ) : (
                    <span className="text-[11px] text-[#536463]">10-digit Indian mobile number</span>
                  )}
                </div>
              </div>

              {/* Service of Interest */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service-interest" className="text-xs font-semibold text-[#0F1E1F]">
                  Service of Interest <span className="text-[#BA1A1A]">*</span>
                </label>
                <select
                  id="service-interest"
                  required
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="w-full bg-[#FCFDFB] border border-[#A8B8B2] px-3.5 py-2.5 rounded-lg text-sm text-[#263536] focus:border-[#145B5A] focus:ring-2 focus:ring-[#145B5A]/20 transition-all outline-hidden cursor-pointer"
                >
                  {CLINIC_CONFIG.services.map((svc) => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="Toothache / Emergency Evaluation">Toothache / Urgent Evaluation</option>
                  <option value="Other / General Consultation">Other / General Consultation</option>
                </select>
              </div>

              {/* Preferred Date & Time Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="preferred-date" className="text-xs font-semibold text-[#0F1E1F]">
                    Preferred Date
                  </label>
                  <input
                    id="preferred-date"
                    type="date"
                    min={todayStr}
                    value={preferredDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full bg-[#FCFDFB] border border-[#A8B8B2] px-3.5 py-2.5 rounded-lg text-sm text-[#263536] focus:border-[#145B5A] focus:ring-2 focus:ring-[#145B5A]/20 transition-all outline-hidden"
                  />
                  {dateError && <span className="text-[11px] text-[#BA1A1A]">{dateError}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="preferred-time" className="text-xs font-semibold text-[#0F1E1F]">
                    Preferred Time Window
                  </label>
                  <select
                    id="preferred-time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-[#FCFDFB] border border-[#A8B8B2] px-3.5 py-2.5 rounded-lg text-sm text-[#263536] focus:border-[#145B5A] focus:ring-2 focus:ring-[#145B5A]/20 transition-all outline-hidden cursor-pointer"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="symptoms-notes" className="text-xs font-semibold text-[#0F1E1F]">
                  Describe Any Symptoms or Dental History (Optional)
                </label>
                <textarea
                  id="symptoms-notes"
                  rows={3}
                  value={symptomsNotes}
                  onChange={(e) => setSymptomsNotes(e.target.value)}
                  placeholder="e.g. Sensitivity to cold, discomfort when chewing on lower right molar..."
                  className="w-full bg-[#FCFDFB] border border-[#A8B8B2] px-3.5 py-2.5 rounded-lg text-sm text-[#263536] placeholder:text-[#A8B8B2] focus:border-[#145B5A] focus:ring-2 focus:ring-[#145B5A]/20 transition-all outline-hidden resize-none"
                />
              </div>

              {/* Disclaimer Consent Checkbox */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="disclaimer-agree"
                  type="checkbox"
                  required
                  checked={consentAgreed}
                  onChange={(e) => setConsentAgreed(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-[#A8B8B2] text-[#145B5A] focus:ring-[#145B5A] mt-0.5 cursor-pointer"
                />
                <label htmlFor="disclaimer-agree" className="text-xs text-[#536463] cursor-pointer">
                  I understand this request is subject to confirmation by the clinic team.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-[#145B5A] text-white font-medium text-sm py-3 px-6 rounded-lg shadow-sm hover:bg-[#0E4443] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Request a Consultation</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#536463] pt-1 leading-normal">
                Your information is treated with confidentiality. This form initiates an inquiry; our front desk will
                call to confirm your appointment time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
