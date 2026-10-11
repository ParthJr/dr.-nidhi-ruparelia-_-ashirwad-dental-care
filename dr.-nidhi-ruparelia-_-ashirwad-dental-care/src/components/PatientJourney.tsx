import React from 'react';
import { MessageSquareText, SearchCheck, CheckCircle2 } from 'lucide-react';

export const PatientJourney: React.FC = () => {
  const steps = [
    {
      num: 1,
      badgeColor: 'bg-[#145B5A]',
      icon: <MessageSquareText className="w-6 h-6 text-[#145B5A]" />,
      title: 'Discuss Your Concerns',
      description:
        'Explain your symptoms and ask questions about your dental health in a calm environment without rush or technical intimidation.',
    },
    {
      num: 2,
      badgeColor: 'bg-[#004242]',
      icon: <SearchCheck className="w-6 h-6 text-[#004242]" />,
      title: 'Understand Your Options',
      description:
        'Receive an assessment and discuss appropriate treatment options with the clinician, reviewing costs, prognosis, and timeframe.',
    },
    {
      num: 3,
      badgeColor: 'bg-[#855236]',
      icon: <CheckCircle2 className="w-6 h-6 text-[#855236]" />,
      title: 'Plan the Next Steps',
      description:
        'Understand the proposed care, follow-up requirements, and any recommended restorative crown to secure your natural tooth.',
    },
  ];

  return (
    <section id="patient-journey" className="w-full bg-[#FCFDFB] py-16 sm:py-20 border-t border-[#A8B8B2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#855236]">
            TRANSPARENT CARE PATHWAY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#004242]">
            Know What to Expect at Your Visit
          </h2>
          <p className="text-sm sm:text-base text-[#536463]">
            A structured, calm appointment pathway designed around clarity and patient reassurance.
          </p>
        </div>

        {/* 3-Step Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-[#A8B8B2]/30 flex flex-col gap-5 hover:shadow-md hover:border-[#145B5A]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-10 h-10 rounded-full ${step.badgeColor} text-white font-semibold text-base flex items-center justify-center`}
                >
                  {step.num}
                </span>
                <div className="p-2 rounded-xl bg-[#EDF2F1]">{step.icon}</div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-[#0F1E1F]">{step.title}</h3>
                <p className="text-sm text-[#536463] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
