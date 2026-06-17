import React from 'react';
import { useBooking } from '../context/BookingContext';
import { testConnection } from '../services/api';
import { Card } from '@/shared/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DebugModal() {
  const { 
    showDebug, setShowDebug, handleSetStep, copyDebugInfo, diagnostics, 
    connectionTest, setConnectionTest, testingConnection, setTestingConnection,
    config, formData, services, doctors, text, bookingLogs
  } = useBooking();

  return (
    <Dialog open={showDebug} onOpenChange={setShowDebug}>
      <DialogContent showCloseButton={false} className="max-w-5xl flex flex-col w-[calc(100vw-24px)] md:w-full h-[calc(100vh-24px)] md:h-[80vh]">
        <DialogHeader className="p-4 border-b shrink-0 pr-12 bg-white z-10 relative">
          <button 
            onClick={() => setShowDebug(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full transition-colors flex items-center justify-center bg-transparent z-50"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 w-full pr-8">
            <DialogTitle>Debug Information</DialogTitle>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => {
                  setShowDebug(false);
                  handleSetStep('audit');
                }}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm font-medium transition-colors whitespace-nowrap"
              >
                Все врачи (Audit)
              </button>
              <button 
                onClick={() => {
                   const payload = {
                     service_id: formData.service?.id,
                     doctor_id: formData.doctor?.id,
                     slot: formData.slot?.time,
                     date: formData.date || new Date().toISOString().split('T')[0],
                     patient: {
                       name: formData.name,
                       email: formData.email,
                       phone: formData.phone
                     }
                   };
                   navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
                   alert('Booking Payload copied!');
                }}
                className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm font-medium transition-colors whitespace-nowrap"
              >
                Copy Заявку
              </button>
              <button 
                onClick={() => {
                   navigator.clipboard.writeText(JSON.stringify(bookingLogs, null, 2));
                   alert('Booking logs copied!');
                }}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 text-sm font-medium transition-colors whitespace-nowrap"
              >
                Copy Логи Записи
              </button>
              <button 
                onClick={copyDebugInfo}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium transition-colors whitespace-nowrap"
              >
                Copy Полный JSON
              </button>
            </div>
          </div>
        </DialogHeader>
        <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs font-mono bg-slate-50/50 overscroll-contain">
          {bookingLogs && bookingLogs.length > 0 && (
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <strong className="block text-slate-900 mb-2 text-sm">Booking Process Logs:</strong>
              <div className="space-y-2">
                {bookingLogs.map((log, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-2 rounded">
                    <div className="flex justify-between items-start mb-1 text-xs">
                      <span className="font-bold text-slate-700">{log.tag}</span>
                      <span className="text-slate-400">{new Date(log.time).toLocaleTimeString()}</span>
                    </div>
                    {Object.keys(log).filter(k => k !== 'time' && k !== 'tag').length > 0 && (
                      <pre className="text-blue-700 bg-blue-50/50 p-1.5 rounded overflow-x-auto">
                        {JSON.stringify(Object.fromEntries(Object.entries(log).filter(([k]) => k !== 'time' && k !== 'tag')), null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
            <strong className="block text-slate-900 mb-2 text-sm">System Diagnostics:</strong>
            <div className="grid grid-cols-2 gap-2 mb-2">
               <div>Source: <span className="font-bold">{diagnostics?.dataSource}</span></div>
               <div>Env: {diagnostics?.nodeEnv}</div>
            </div>
            {diagnostics?.tenants && Object.entries(diagnostics.tenants).map(([key, val]: [string, any]) => (
              <Card key={key} className="mb-2 p-2 border border-slate-100">
                <div className="flex justify-between items-center">
                    <div className="font-bold text-slate-700">{val.name} ({key})</div>
                    <button 
                        onClick={async () => {
                            setTestingConnection(true);
                            try {
                                const res = await testConnection(key);
                                setConnectionTest(res);
                            } catch (e) {
                                setConnectionTest({ error: String(e) });
                            } finally {
                                setTestingConnection(false);
                            }
                        }}
                        disabled={testingConnection}
                        className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50"
                    >
                        {testingConnection ? 'Testing...' : 'Test API'}
                    </button>
                </div>
                <div className="flex gap-4 mt-1">
                  <span className={val.hasApiKey ? "text-green-600" : "text-red-500"}>
                    API Key: {val.hasApiKey ? `Present (${val.apiKeyValuePreview})` : "MISSING"}
                  </span>
                  <span className={val.hasAddress ? "text-green-600" : "text-red-500"}>
                    Address: {val.hasAddress ? "Present" : "MISSING"}
                  </span>
                </div>
              </Card>
            ))}
            
            {connectionTest && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <strong className="block mb-1">Connection Test Result:</strong>
                    <pre className="overflow-x-auto max-h-40">{JSON.stringify(connectionTest, null, 2)}</pre>
                </div>
            )}
          </div>

          <div>
            <strong className="block text-gray-700 mb-1">Config:</strong>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto max-h-40">{JSON.stringify(config, null, 2)}</pre>
          </div>
          <div>
            <strong className="block text-gray-700 mb-1">Form Data:</strong>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto max-h-40">{JSON.stringify(formData, null, 2)}</pre>
          </div>
          <div>
            <strong className="block text-gray-700 mb-1">Services ({services.length}):</strong>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto max-h-40">{JSON.stringify(services, null, 2)}</pre>
          </div>
          <div>
            <strong className="block text-gray-700 mb-1">Doctors ({doctors.length}):</strong>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto max-h-40">{JSON.stringify(doctors, null, 2)}</pre>
          </div>
          <div>
            <strong className="block text-gray-700 mb-1">Text:</strong>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto max-h-40">{JSON.stringify(text, null, 2)}</pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
