import React from 'react';
import { useBooking } from '../context/BookingContext';
import { testConnection } from '../services/api';

export function DebugModal() {
  const { 
    showDebug, setShowDebug, handleSetStep, copyDebugInfo, diagnostics, 
    connectionTest, setConnectionTest, testingConnection, setTestingConnection,
    config, formData, services, doctors, text
  } = useBooking();

  if (!showDebug) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowDebug(false)}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Debug Information</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setShowDebug(false);
                handleSetStep('audit');
              }}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm font-medium transition-colors"
            >
              Все врачи (Audit)
            </button>
            <button 
              onClick={copyDebugInfo}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium transition-colors"
            >
              Copy JSON
            </button>
          </div>
        </div>
        <div className="space-y-4 text-xs font-mono">
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <strong className="block text-slate-900 mb-2 text-sm">System Diagnostics:</strong>
            <div className="grid grid-cols-2 gap-2 mb-2">
               <div>Source: <span className="font-bold">{diagnostics?.dataSource}</span></div>
               <div>Env: {diagnostics?.nodeEnv}</div>
            </div>
            {diagnostics?.tenants && Object.entries(diagnostics.tenants).map(([key, val]: [string, any]) => (
              <div key={key} className="mb-2 p-2 bg-white rounded border border-slate-100">
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
              </div>
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
        <button 
          onClick={() => setShowDebug(false)}
          className="mt-6 w-full py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
