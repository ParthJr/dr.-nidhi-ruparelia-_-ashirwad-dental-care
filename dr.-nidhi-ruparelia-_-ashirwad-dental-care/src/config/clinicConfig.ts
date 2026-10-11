export interface ClinicConfig {
  name: string;
  brandTitle: string;
  doctorName: string;
  doctorTitle: string;
  specialization: string;
  address: {
    line1: string;
    line2: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
    fullFormatted: string;
  };
  phone: {
    raw: string;
    display: string;
    telHref: string;
    international: string;
  };
  schedule: {
    primaryDay: string;
    startTime: string;
    note: string;
    weeklyOverview: { day: string; hours: string }[];
  };
  reputation: {
    rating: number;
    reviewCount: number;
    platform: string;
    tagline: string;
  };
  maps: {
    searchUrl: string;
    directionsUrl: string;
    placeName: string;
    embedFallbackQuery: string;
  };
  services: {
    id: string;
    title: string;
    tagline: string;
    badge?: string;
    description: string;
    indicators: string[];
    details: string[];
    suitableFor: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  clinicalCarePrinciples: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const CLINIC_CONFIG: ClinicConfig = {
  name: "Ashirwad Dental Care",
  brandTitle: "Dr. Nidhi Ruparelia — Ashirwad Dental Care",
  doctorName: "Dr. Nidhi Ruparelia",
  doctorTitle: "Dental Practitioner",
  specialization: "Endodontic & Natural Tooth Preservation",
  address: {
    line1: "Swagat Rainforest 1, Ashirwad Dental Clinic, E106",
    line2: "Kudasan Road, near Black Pepper restaurant",
    locality: "Kudasan",
    city: "Gandhinagar",
    state: "Gujarat",
    pincode: "382419",
    landmark: "Near Black Pepper restaurant, Swagat Rainforest 1 commercial arcade",
    fullFormatted:
      "Swagat Rainforest 1, Ashirwad Dental Clinic, E106, Kudasan Road, near Black Pepper restaurant, Kudasan, Gandhinagar, Gujarat 382419",
  },
  phone: {
    raw: "09979798033",
    display: "099797 98033",
    telHref: "tel:09979798033",
    international: "+91 99797 98033",
  },
  schedule: {
    primaryDay: "Monday",
    startTime: "10:00 AM",
    note: "Consultations by appointment. Please contact the clinic directly for weekly clinical schedules and emergency slots.",
    weeklyOverview: [
      { day: "Monday", hours: "From 10:00 AM (By Appointment)" },
      { day: "Tuesday – Saturday", hours: "Morning & Evening Slots (Contact Clinic)" },
      { day: "Sunday", hours: "Emergency Enquiries / Prior Booking" },
    ],
  },
  reputation: {
    rating: 5.0,
    reviewCount: 173,
    platform: "Google Business Profile",
    tagline: "Verified 5.0 rating reflecting gentle root canal care and attentive explanations.",
  },
  maps: {
    searchUrl:
      "https://www.google.com/maps/search/?api=1&query=Ashirwad+Dental+Clinic+Swagat+Rainforest+1+Kudasan+Gandhinagar+Gujarat+382419",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Ashirwad+Dental+Clinic+Swagat+Rainforest+1+Kudasan+Gandhinagar",
    placeName: "Swagat Rainforest 1, Kudasan, Gandhinagar",
    embedFallbackQuery: "Swagat+Rainforest+1+Kudasan+Gandhinagar+Ashirwad+Dental",
  },
  clinicalCarePrinciples: [
    {
      title: "Preserve Sound Tooth Structure",
      description: "Conservative clinical methods aimed at saving biological dentin and natural root systems.",
      icon: "Shield",
    },
    {
      title: "Clear, Jargon-Free Explanations",
      description: "Direct walk-through of digital radiograph findings and treatment alternatives before beginning.",
      icon: "MessageSquare",
    },
    {
      title: "Unhurried Consultations",
      description: "Dedicated chairside time to address individual comfort, questions, and procedural expectations.",
      icon: "Clock",
    },
  ],
  services: [
    {
      id: "single-sitting-rct",
      title: "Single-sitting Root Canal",
      tagline: "Targeted canal cleaning, disinfection, and obturation in eligible cases.",
      badge: "Subject to Assessment",
      description:
        "Comprehensive canal cleaning, rotary disinfection, and hermetic biocompatible filling performed efficiently when clinical indicators permit.",
      indicators: [
        "Calibrated digital access",
        "Micro-rotary disinfection",
        "Biocompatible hermetic seal",
      ],
      details: [
        "Suitable for select non-calcified canals without extensive acute apical suppuration.",
        "Reduces multiple local anesthesia episodes while preserving treatment efficacy.",
        "Clinical eligibility determined strictly after diagnostic radiograph review.",
      ],
      suitableFor: "Patients with vital or non-vital teeth without severe persistent acute exudate.",
    },
    {
      id: "endodontic-retreatment",
      title: "Endodontic Retreatment",
      tagline: "Careful removal of prior root filling and meticulous disinfection.",
      description:
        "Careful removal of prior obturation materials and microscopic cleaning to resolve persistent canal infection or recurrent discomfort.",
      indicators: [
        "Exploration of missed anatomy",
        "Elimination of persistent biofilm",
        "Preservation of remaining dentin",
      ],
      details: [
        "Navigates complex curvature, previously untreated accessory canals, or ledge corrections.",
        "Eliminates resistant intra-canal bacteria using ultrasonic irrigation protocols.",
        "Provides an opportunity to save natural teeth previously marked for extraction.",
      ],
      suitableFor: "Teeth with failing previous root canals, chronic soreness, or new periapical infection.",
    },
    {
      id: "endodontic-surgery",
      title: "Endodontic Surgery (Apicoectomy)",
      tagline: "Surgical root-end resection and retrograde seal for persistent lesions.",
      description:
        "Targeted surgical root-end resection and biological retro-seal when conventional canal access is insufficient to clear periapical pathology.",
      indicators: [
        "Periapical tissue clearance",
        "Ultrasonic root-end prep",
        "Mineral trioxide aggregate seal",
      ],
      details: [
        "Conservative micro-surgical technique isolating the persistent root-tip infection.",
        "Direct visualization of root-end fractures or anatomical anomalies.",
        "Retrograde seal placed with biocompatible bioceramic materials.",
      ],
      suitableFor: "Persistent periapical lesions not resolving through orthograde endodontic treatment.",
    },
    {
      id: "assessment-second-opinion",
      title: "Assessment & Second Opinion",
      tagline: "Comprehensive diagnostic pulp testing and impartial treatment guidance.",
      description:
        "Detailed clinical evaluation of dental symptoms, previous treatment history, and impartial treatment planning for complex presentations.",
      indicators: [
        "Diagnostic pulp vitality testing",
        "Long-term prognosis evaluation",
        "Transparent options review",
      ],
      details: [
        "Careful mapping of thermal sensitivity, percussion tenderness, and radiographic signs.",
        "Objective comparison between tooth retention versus replacement options.",
        "No pressure to proceed; comprehensive clarity regarding all clinical pathways.",
      ],
      suitableFor: "Patients seeking clarity on uncertain tooth pain, cracked teeth, or complex treatment plans.",
    },
  ],
  faq: [
    {
      question: "What is root canal treatment?",
      answer:
        "Root canal treatment involves gently removing damaged, infected, or inflamed pulp tissue from within the inner root canals. The interior canal anatomy is meticulously disinfected and hermetically sealed with biocompatible materials to preserve the natural root structure and prevent tooth extraction.",
    },
    {
      question: "When might root canal treatment be considered?",
      answer:
        "Treatment is typically considered when deep dental decay penetrates the inner pulp, when teeth experience persistent thermal sensitivity or spontaneous throbbing ache, following accidental tooth trauma, or when radiographic scans show periapical bone lesions.",
    },
    {
      question: "What happens during a dental assessment?",
      answer:
        "During your visit, Dr. Nidhi carries out a gentle clinical exam, records digital radiographs, performs pulp vitality checks if indicated, and presents an unhurried, transparent explanation of your options before any treatment begins.",
    },
    {
      question: "What is endodontic retreatment?",
      answer:
        "If a tooth that previously received a root canal fails to heal or experiences new infection due to complex hidden anatomy or recurrent decay, retreatment carefully removes the old filling, thoroughly re-disinfects the canal spaces, and reseals them.",
    },
    {
      question: "How can I request an appointment?",
      answer:
        "You can fill out the consultation request form on this page with your preferred date and time, or call our Kudasan clinic directly at 099797 98033. Our front desk coordinates scheduling directly with you to confirm your visit.",
    },
    {
      question: "Will I need a crown after a root canal procedure?",
      answer:
        "Back teeth (premolars and molars) withstand significant chewing forces and typically benefit from a protective ceramic crown or onlay to prevent structural fracture and ensure lasting stability. Dr. Nidhi will review your specific tooth's remaining natural structure during treatment planning.",
    },
  ],
};
