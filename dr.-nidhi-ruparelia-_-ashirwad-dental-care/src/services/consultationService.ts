export interface ConsultationRequest {
  id: string;
  fullName: string;
  mobileNumber: string;
  formattedPhone: string;
  serviceInterest: string;
  preferredDate: string;
  preferredTime: string;
  symptomsNotes?: string;
  consentAgreed: boolean;
  submittedAt: string;
  status: 'PENDING_CLINIC_CONFIRMATION' | 'CONTACTED' | 'APPOINTMENT_SCHEDULED';
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  requestId?: string;
  isDuplicate?: boolean;
}

const STORAGE_KEY = 'ashirwad_consultation_requests';

/**
 * Validates Indian mobile number: 10 digits starting with 6, 7, 8, or 9
 */
export function validateIndianMobile(phone: string): { isValid: boolean; cleaned: string; error?: string } {
  // Strip whitespace, dashes, leading +91 or 0
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }

  if (cleaned.length !== 10) {
    return { isValid: false, cleaned, error: 'Mobile number must be exactly 10 digits.' };
  }

  if (!/^[6-9]/.test(cleaned)) {
    return { isValid: false, cleaned, error: 'Indian mobile numbers must begin with 6, 7, 8, or 9.' };
  }

  return { isValid: true, cleaned };
}

/**
 * Checks if preferred date is today or in the future
 */
export function validateAppointmentDate(dateString: string): { isValid: boolean; error?: string } {
  if (!dateString) {
    return { isValid: true }; // Date is optional or defaulted
  }

  const selectedDate = new Date(dateString);
  selectedDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Please choose a valid calendar date.' };
  }

  if (selectedDate < today) {
    return { isValid: false, error: 'Preferred appointment date cannot be in the past.' };
  }

  return { isValid: true };
}

/**
 * Retrieves stored consultation inquiries from local storage
 */
export function getStoredConsultations(): ConsultationRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read consultation requests from storage:', err);
    return [];
  }
}

/**
 * Saves consultation requests to local storage
 */
function saveStoredConsultations(records: ConsultationRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save consultation request to storage:', err);
  }
}

/**
 * Checks for recent duplicate submissions (same phone and service within 10 minutes)
 */
function isDuplicateSubmission(cleanedPhone: string, service: string): boolean {
  const existing = getStoredConsultations();
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

  return existing.some((req) => {
    const reqTime = new Date(req.submittedAt).getTime();
    return req.mobileNumber === cleanedPhone && req.serviceInterest === service && reqTime > tenMinutesAgo;
  });
}

/**
 * Submits consultation request with validation, duplicate detection, and persistent storage
 */
export async function submitConsultationRequest(data: {
  fullName: string;
  mobileNumber: string;
  serviceInterest: string;
  preferredDate?: string;
  preferredTime: string;
  symptomsNotes?: string;
  consentAgreed: boolean;
}): Promise<SubmissionResult> {
  // 1. Basic validation
  if (!data.fullName.trim()) {
    return { success: false, message: 'Please provide your full name.' };
  }

  const phoneCheck = validateIndianMobile(data.mobileNumber);
  if (!phoneCheck.isValid) {
    return { success: false, message: phoneCheck.error || 'Please enter a valid 10-digit mobile number.' };
  }

  if (data.preferredDate) {
    const dateCheck = validateAppointmentDate(data.preferredDate);
    if (!dateCheck.isValid) {
      return { success: false, message: dateCheck.error || 'Please select a valid upcoming date.' };
    }
  }

  if (!data.consentAgreed) {
    return { success: false, message: 'Please acknowledge that appointment slots are subject to clinic verification.' };
  }

  // 2. Duplicate detection
  if (isDuplicateSubmission(phoneCheck.cleaned, data.serviceInterest)) {
    return {
      success: false,
      isDuplicate: true,
      message:
        'A consultation request with this phone number was already sent recently. Our clinic team will reach out to you shortly.',
    };
  }

  // 3. Optional remote API integration point (if configured)
  const apiEndpoint = (import.meta as any).env?.VITE_API_ENDPOINT;
  if (apiEndpoint) {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          mobileNumber: phoneCheck.cleaned,
          formattedPhone: `+91 ${phoneCheck.cleaned}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
    } catch (networkError) {
      console.warn('Configured remote endpoint failed; falling back to local clinic queue:', networkError);
      // We still store locally so the enquiry is never silently discarded
    }
  } else {
    // Simulate brief network delay for authentic interaction
    await new Promise((res) => setTimeout(res, 450));
  }

  // 4. Record to persistent local queue
  const newRequest: ConsultationRequest = {
    id: `ADC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: data.fullName.trim(),
    mobileNumber: phoneCheck.cleaned,
    formattedPhone: `+91 ${phoneCheck.cleaned.slice(0, 5)} ${phoneCheck.cleaned.slice(5)}`,
    serviceInterest: data.serviceInterest,
    preferredDate: data.preferredDate || new Date().toISOString().split('T')[0],
    preferredTime: data.preferredTime,
    symptomsNotes: data.symptomsNotes?.trim() || '',
    consentAgreed: data.consentAgreed,
    submittedAt: new Date().toISOString(),
    status: 'PENDING_CLINIC_CONFIRMATION',
  };

  const currentList = getStoredConsultations();
  saveStoredConsultations([newRequest, ...currentList]);

  return {
    success: true,
    requestId: newRequest.id,
    message: 'Your consultation request has been received. The clinic team will contact you to confirm availability.',
  };
}

/**
 * Updates status of a stored request (Clinic Reception helper)
 */
export function updateConsultationStatus(id: string, status: ConsultationRequest['status']): void {
  const current = getStoredConsultations();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  saveStoredConsultations(updated);
}

/**
 * Clears stored requests (Clinic Reception maintenance)
 */
export function clearStoredConsultations(): void {
  localStorage.removeItem(STORAGE_KEY);
}
