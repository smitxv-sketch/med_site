import React from 'react';
import { ChevronLeft, User } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatSpecialty, formatExperience } from '../utils/formatters';

export function AuditStep() {
  const { handleSetStep, allDoctors, formatDoctorName, config } = useBooking();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => handleSetStep('service')} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Полный список врачей ({allDoctors.length})</h2>
      </div>

      <div className="space-y-8">
        {allDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col sm:flex-row gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0 shadow-inner border border-gray-100">
                {doctor.image ? (
                  <img src={doctor.image} className="w-full h-full object-cover" alt={doctor.name} referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">{formatDoctorName(doctor.name)}</h3>
                <div className="text-[var(--color-primary)] font-medium text-lg mb-3">{formatSpecialty(doctor.specialty, config)}</div>
                <div className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded-md w-max">ID: {doctor.id}</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About */}
              <div className="space-y-5">
                <h4 className="font-bold text-sm uppercase text-gray-400 tracking-wider">О враче</h4>
                
                {doctor.anonce && (
                  <div className="text-sm text-gray-800 font-medium bg-[var(--color-primary)]/5 p-4 rounded-xl border border-[var(--color-primary)]/10 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.anonce }} />
                )}

                {doctor.description ? (
                  <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.description }} />
                ) : (
                  <div className="text-sm text-gray-400 italic">Нет описания</div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {doctor.degree && (
                    <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100 font-medium">
                      {doctor.degree}
                    </span>
                  )}
                  {doctor.category && (
                    <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-100 font-medium">
                      {doctor.category}
                    </span>
                  )}
                  {doctor.experienceYears && (
                    <span className="text-xs bg-[var(--color-accent)] text-white px-3 py-1.5 rounded-lg shadow-sm font-bold">
                      Стаж {formatExperience(doctor.experienceYears)}
                    </span>
                  )}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-5">
                <h4 className="font-bold text-sm uppercase text-gray-400 tracking-wider">Образование</h4>
                
                {doctor.educationHistory && doctor.educationHistory.length > 0 ? (
                  <ul className="space-y-4">
                    {doctor.educationHistory.map((edu, idx) => (
                      <li key={idx} className="text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="font-bold text-[var(--color-primary)] mb-1">{edu.year}</div>
                        <div className="font-bold text-gray-900 leading-snug">{edu.organization}</div>
                        <div className="text-gray-500 mt-1">{edu.specialty}</div>
                      </li>
                    ))}
                  </ul>
                ) : doctor.educationText ? (
                  <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.educationText }} />
                ) : (
                  <div className="text-sm text-gray-400 italic">Нет данных об образовании</div>
                )}
              </div>
            </div>
            
            {/* Debug Raw Meta */}
            <div className="p-6 sm:px-8 border-t border-gray-50 bg-gray-50/50">
              <details className="group">
                <summary className="cursor-pointer text-xs font-mono text-gray-400 hover:text-gray-600 flex items-center justify-between transition-colors">
                  <span>Show Raw Meta (Debug)</span>
                </summary>
                <div className="relative mt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(JSON.stringify(doctor.rawMeta, null, 2));
                      const btn = e.currentTarget;
                      const originalText = btn.innerText;
                      btn.innerText = 'Copied!';
                      setTimeout(() => btn.innerText = originalText, 2000);
                    }}
                    className="absolute top-2 right-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-600 transition-colors z-10"
                  >
                    Copy JSON
                  </button>
                  <pre className="p-4 bg-gray-100 rounded-xl text-[10px] overflow-x-auto font-mono text-gray-500 max-h-60 overflow-y-auto border border-gray-200">
                    {JSON.stringify(doctor.rawMeta, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
