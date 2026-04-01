import React from 'react';
import { Copy, Check, Layout, Users, Calendar } from 'lucide-react';

const CodeBlock = ({ code, id }: { code: string; id: string }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="relative mt-2 rounded-lg bg-slate-900 p-4">
      <code className="text-sm text-slate-50 font-mono block whitespace-pre-wrap break-all">
        {code}
      </code>
      <button
        onClick={() => copyToClipboard(code, id)}
        className="absolute top-2 right-2 p-2 rounded-md bg-slate-800 text-slate-400 hover:text-white transition-colors"
      >
        {copied === id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default function IntegrationPage() {
  const baseUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Integration Guide</h1>
          <p className="text-lg text-gray-600">
            How to embed the booking widget into your existing WordPress site or any other platform.
          </p>
        </div>

        {/* Scenario 1: General Embedding */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Layout className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Scenario 1: General Booking Page</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-600">
              Use this code to embed the full booking wizard on a general "Book Appointment" page. 
              The user will start by selecting a service.
            </p>
            <CodeBlock 
              id="general"
              code={`<iframe 
  src="${baseUrl}" 
  width="100%" 
  height="650px" 
  frameborder="0" 
  style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);"
></iframe>`} 
            />
          </div>
        </div>

        {/* Scenario 2: Doctor Specific */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Scenario 2: Doctor's Personal Page</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-600">
              On a doctor's profile page (e.g., Dr. Smith), use this code to skip the "Select Doctor" step 
              and show their available slots immediately.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>Note:</strong> Replace <code>doctor_id</code> with the actual ID from your system (e.g., <code>dr_smith</code>, <code>dr_doe</code>).
            </div>
            <CodeBlock 
              id="doctor"
              code={`<iframe 
  src="${baseUrl}/?doctor_id=YOUR_DOCTOR_ID" 
  width="100%" 
  height="600px" 
  frameborder="0" 
  style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);"
></iframe>`} 
            />
          </div>
        </div>

        {/* Scenario 3: Service Specific */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Scenario 3: Service Landing Page</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-600">
              On a specific service page (e.g., "Teeth Whitening"), use this code to pre-select the service.
              The user will immediately see a list of doctors performing this service.
            </p>
            <CodeBlock 
              id="service"
              code={`<iframe 
  src="${baseUrl}/?service_id=YOUR_SERVICE_ID" 
  width="100%" 
  height="600px" 
  frameborder="0" 
  style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);"
></iframe>`} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
