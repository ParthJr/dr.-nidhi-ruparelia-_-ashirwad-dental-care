import React, { useState, useEffect } from 'react';
import {
  ConsultationRequest,
  getStoredConsultations,
  updateConsultationStatus,
  clearStoredConsultations,
} from '../services/consultationService';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { X, Phone, Calendar, Clock, Copy, Check, Download, Trash2, User, FileText } from 'lucide-react';

interface ReceptionInquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInquiriesUpdated?: () => void;
}

export const ReceptionInquiriesModal: React.FC<ReceptionInquiriesModalProps> = ({
  isOpen,
  onClose,
  onInquiriesUpdated,
}) => {
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadInquiries = () => {
    setInquiries(getStoredConsultations());
  };

  useEffect(() => {
    if (isOpen) {
      loadInquiries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: ConsultationRequest['status']) => {
    updateConsultationStatus(id, newStatus);
    loadInquiries();
    if (onInquiriesUpdated) onInquiriesUpdated();
  };

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all consultation inquiries from this device?')) {
      clearStoredConsultations();
      loadInquiries();
      if (onInquiriesUpdated) onInquiriesUpdated();
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Full Name', 'Phone', 'Service', 'Date', 'Time Window', 'Symptoms', 'Status', 'Submitted At'];
    const rows = inquiries.map((r) => [
      r.id,
      `"${r.fullName}"`,
      r.mobileNumber,
      `"${r.serviceInterest}"`,
      r.preferredDate,
      `"${r.preferredTime}"`,
      `"${(r.symptomsNotes || '').replace(/"/g, '""')}"`,
      r.status,
      r.submittedAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ashirwad_dental_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div
        className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] shadow-2xl flex flex-col border border-[#A8B8B2]/40 z-10 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Clinic Reception Queue"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#A8B8B2]/20 flex items-center justify-between bg-[#EDF2F1]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#145B5A] text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#0F1E1F]">
                Clinic Reception Desk · Inquiries
              </h3>
              <p className="text-xs text-[#536463]">
                {CLINIC_CONFIG.name} — Kudasan Front Office Queue
              </p>
            </div>
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
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#E0F1F2]/60 p-3 rounded-xl border border-[#A8B8B2]/30 text-xs">
            <div className="text-[#004242]">
              <span className="font-semibold">{inquiries.length} total inquiries</span> stored securely on this device.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                disabled={inquiries.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#145B5A] font-semibold hover:bg-slate-50 border border-[#A8B8B2]/30 disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleClearAll}
                disabled={inquiries.length === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[#BA1A1A] hover:bg-[#FFDAD6]/40 disabled:opacity-40 cursor-pointer"
                title="Clear queue"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-3 text-[#536463]">
              <FileText className="w-10 h-10 text-[#A8B8B2]" />
              <p className="text-sm font-medium">No consultation inquiries received yet.</p>
              <p className="text-xs max-w-sm text-[#A8B8B2]">
                When prospective patients submit the "Request a Consultation" form, their appointment details appear
                here for clinic staff to review and call back.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {inquiries.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#FCFDFB] rounded-xl p-4 border border-[#A8B8B2]/30 flex flex-col gap-3 shadow-xs hover:border-[#145B5A]/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#A8B8B2]/15 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#0F1E1F]">{req.fullName}</span>
                      <span className="text-[11px] font-mono text-[#536463] bg-[#EDF2F1] px-1.5 py-0.5 rounded">
                        {req.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer ${
                          req.status === 'PENDING_CLINIC_CONFIRMATION'
                            ? 'bg-[#FFDBCB] text-[#693B21] border-[#FEBA98]'
                            : req.status === 'CONTACTED'
                            ? 'bg-[#E0F1F2] text-[#004242] border-[#91D1CF]'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value="PENDING_CLINIC_CONFIRMATION">Pending Confirmation</option>
                        <option value="CONTACTED">Patient Contacted</option>
                        <option value="APPOINTMENT_SCHEDULED">Appointment Scheduled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#263536]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#145B5A]" />
                      <a href={`tel:${req.mobileNumber}`} className="font-semibold text-[#145B5A] hover:underline">
                        {req.formattedPhone}
                      </a>
                      <button
                        onClick={() => handleCopyPhone(req.id, req.mobileNumber)}
                        className="p-1 text-[#536463] hover:text-[#145B5A] cursor-pointer"
                        title="Copy phone"
                      >
                        {copiedId === req.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#855236]" />
                      <span>{req.preferredDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#855236]" />
                      <span>{req.preferredTime}</span>
                    </div>
                  </div>

                  <div className="bg-[#EDF2F1]/60 p-2.5 rounded-lg text-xs flex flex-col gap-1">
                    <span className="font-semibold text-[#004242]">Service: {req.serviceInterest}</span>
                    {req.symptomsNotes ? (
                      <p className="text-[#536463] italic">"{req.symptomsNotes}"</p>
                    ) : (
                      <span className="text-[#A8B8B2] italic">No specific symptoms recorded</span>
                    )}
                  </div>

                  <div className="text-[10px] text-[#A8B8B2] flex items-center justify-between">
                    <span>Submitted: {new Date(req.submittedAt).toLocaleString()}</span>
                    <span>Front desk verification required</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#A8B8B2]/20 bg-[#EDF2F1] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#145B5A] text-white text-xs font-semibold rounded-lg hover:bg-[#0E4443] transition-colors cursor-pointer"
          >
            Close Reception View
          </button>
        </div>
      </div>
    </div>
  );
};
