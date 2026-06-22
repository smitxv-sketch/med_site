import React, { useState, useEffect } from 'react';
import { Play, Clock, AlertCircle, CheckCircle2, Server, Settings2, Users, Search, FileJson, Database, Copy, Loader2, Link as LinkIcon, Wifi, WifiOff, ArrowRight } from 'lucide-react';
import { Card } from '@/shared/ui/Card';

export default function DiagnosticTools() {
  const [activeTab, setActiveTab] = useState<'api' | 'audit' | 'scenario' | 'deepAudit' | 'linking'>('api');
  
  // API Tab State
  const [baseUrl, setBaseUrl] = useState('https://ci74.ru/booking/php/proxy.php');
  const [method, setMethod] = useState('spec_list');
  const [apiKey, setApiKey] = useState('');
  const [useServerProxy, setUseServerProxy] = useState(true);
  const [chatId, setChatId] = useState('206156880');
  
  // Method specific params
  const [spec, setSpec] = useState('Терапевт');
  const [branch, setBranch] = useState('');
  const [day, setDay] = useState(new Date().toISOString().split('T')[0].replace(/-/g, ''));
  const [docId, setDocId] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [requestUrl, setRequestUrl] = useState<string>('');
  const [requestPayload, setRequestPayload] = useState<any>(null);

  // Audit Tab State
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditCity, setAuditCity] = useState('chel');
  const [auditSpecialty, setAuditSpecialty] = useState('');
  const [auditDoctors, setAuditDoctors] = useState<any[]>([]);
  const [auditError, setAuditError] = useState('');

  // WP Audit State
  const [wpDoctors, setWpDoctors] = useState<any[]>([]);
  const [wpLoading, setWpLoading] = useState(false);
  const [wpStatus, setWpStatus] = useState<{connected: boolean, error?: string, host?: string} | null>(null);
  const [redisStatus, setRedisStatus] = useState<{connected: boolean, error?: string, message?: string} | null>(null);

  // Scenario State
  const [scenarioStep, setScenarioStep] = useState(0);
  const [scenarioCity] = useState('chel');
  const [scenarioSpecs, setScenarioSpecs] = useState<string[]>([]);
  const [selectedScenarioSpec, setSelectedScenarioSpec] = useState('');
  const [scenarioDoctors, setScenarioDoctors] = useState<any[]>([]);
  const [selectedScenarioDoc, setSelectedScenarioDoc] = useState<any>(null);
  const [scenarioSlots, setScenarioSlots] = useState<any[]>([]);
  const [scenarioLoading, setScenarioLoading] = useState(false);

  // Deep Audit State
  const [deepAuditLoading, setDeepAuditLoading] = useState(false);
  const [deepAuditDoctors, setDeepAuditDoctors] = useState<any[]>([]);
  const [selectedDeepAuditIds, setSelectedDeepAuditIds] = useState<number[]>([]);
  const [deepAuditResult, setDeepAuditResult] = useState<any>(null);

  // Linking State
  const [linkingLoading, setLinkingLoading] = useState(false);
  const [linkingData, setLinkingData] = useState<any>(null);
  const [linkingError, setLinkingError] = useState('');
  const [linkingSuccess, setLinkingSuccess] = useState('');

  useEffect(() => {
    checkWpStatus();
  }, []);

  const fetchDeepAuditDoctors = async () => {
    setDeepAuditLoading(true);
    try {
      const response = await fetch('/api/wp-doctors');
      const data = await response.json();
      setDeepAuditDoctors(data);
    } catch (error) {
      console.error('Failed to fetch WP doctors', error);
    } finally {
      setDeepAuditLoading(false);
    }
  };

  const handleDeepAuditFetch = async () => {
    if (selectedDeepAuditIds.length === 0) return;
    setDeepAuditLoading(true);
    try {
      const response = await fetch('/api/diagnostics/wp-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: selectedDeepAuditIds })
      });
      const data = await response.json();
      setDeepAuditResult(data);
    } catch (error) {
      console.error('Failed to fetch meta', error);
      alert('Failed to fetch metadata');
    } finally {
      setDeepAuditLoading(false);
    }
  };

  const toggleDeepAuditSelection = (id: number) => {
    setSelectedDeepAuditIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const fetchLinkingData = async () => {
    setLinkingLoading(true);
    setLinkingError('');
    setLinkingSuccess('');
    try {
      const response = await fetch('/api/diagnostics/doctor-matches');
      if (!response.ok) throw new Error('Failed to fetch linking data');
      const data = await response.json();
      setLinkingData(data);
    } catch (error: any) {
      setLinkingError(error.message);
    } finally {
      setLinkingLoading(false);
    }
  };

  const handleLinkDoctor = async (wpUserId: number, qmsId: string) => {
    setLinkingLoading(true);
    setLinkingError('');
    setLinkingSuccess('');
    try {
      const response = await fetch('/api/diagnostics/link-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wpUserId, qmsId })
      });
      if (!response.ok) throw new Error('Failed to link doctor');
      setLinkingSuccess('Врач успешно связан!');
      // Refresh data
      await fetchLinkingData();
    } catch (error: any) {
      setLinkingError(error.message);
      setLinkingLoading(false);
    }
  };

  const checkWpStatus = async () => {
    try {
      const response = await fetch('/api/diagnostics/wp-status');
      const data = await response.json();
      setWpStatus(data.wp);
      setRedisStatus(data.redis);
    } catch (e) {
      console.error('Failed to check status:', e);
      setWpStatus({ connected: false, error: 'Failed to check status' });
      setRedisStatus({ connected: false, error: 'Failed to check status' });
    }
  };

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    setResponseTime(null);
    
    const params: Record<string, string> = {
      chatid: chatId
    };

    if (method === 'getslotsbyspec') {
      if (spec) params.spec = spec;
      if (branch) params.qqc244branch = branch;
      if (day) params.day = day;
    }
    
    if (method === 'getdocinfo') {
      if (docId) params.qqc_doc = docId;
    }

    setRequestPayload(params);

    const startTime = performance.now();
    try {
      let response;
      
      if (useServerProxy) {
        setRequestUrl('/api/diagnostics/qms-proxy');
        response = await fetch('/api/diagnostics/qms-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endpoint: method,
            params: params,
            city: 'chel' // Defaulting to chel for tester
          })
        });
      } else {
        // Direct Client-Side Call (Legacy)
        const url = `${baseUrl}?endpoint=${method}&action=${method}`;
        setRequestUrl(url);
        
        const directParams = { ...params, apikey: apiKey, client_key: apiKey } as Record<string, string>;
        const formBody = Object.keys(directParams)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(directParams[key]))
          .join('&');

        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': apiKey,
            'apikey': apiKey
          },
          body: formBody
        });
      }
      
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      
      const data = await response.json().catch(() => null);
      setResult({
        status: response.status,
        ok: response.ok,
        data: data || 'Invalid JSON response'
      });
    } catch (error: any) {
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResult({
        status: 'Error',
        ok: false,
        data: { message: error.message }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRunAudit = async () => {
    setAuditLoading(true);
    setAuditError('');
    setAuditDoctors([]);
    
    try {
      const url = `/api/doctors?city=${auditCity}${auditSpecialty ? `&specialty=${encodeURIComponent(auditSpecialty)}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      setAuditDoctors(data || []);
    } catch (err: any) {
      setAuditError(err.message || 'Failed to fetch doctors');
    } finally {
      setAuditLoading(false);
    }
  };

  const fetchWpDoctors = async () => {
    setWpLoading(true);
    try {
      const response = await fetch('/api/wp-doctors');
      const data = await response.json();
      setWpDoctors(data);
    } catch (error) {
      console.error('Failed to fetch WP doctors', error);
      setWpDoctors([]);
    } finally {
      setWpLoading(false);
    }
  };

  // Scenario Logic
  const startScenario = async () => {
    setScenarioLoading(true);
    setScenarioStep(0);
    setScenarioSpecs([]);
    setScenarioDoctors([]);
    setScenarioSlots([]);
    
    try {
      const response = await fetch(`/api/services?city=${scenarioCity}`);
      const data = await response.json();
      setScenarioSpecs(data.map((s: any) => s.name));
      setScenarioStep(1);
    } catch (e) {
      console.error('Failed to load specialties:', e);
      alert('Failed to load specialties');
    } finally {
      setScenarioLoading(false);
    }
  };

  const loadScenarioDoctors = async (specName: string) => {
    setScenarioLoading(true);
    setSelectedScenarioSpec(specName);
    try {
      const response = await fetch(`/api/doctors?city=${scenarioCity}&specialty=${encodeURIComponent(specName)}`);
      const data = await response.json();
      setScenarioDoctors(data);
      setScenarioStep(2);
      
      // Auto-scroll to doctors section
      setTimeout(() => {
        document.getElementById('scenario-doctors')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (e) {
      console.error('Failed to load doctors:', e);
      alert('Failed to load doctors');
    } finally {
      setScenarioLoading(false);
    }
  };

  const loadScenarioSlots = async (doc: any) => {
    setScenarioLoading(true);
    setSelectedScenarioDoc(doc);
    try {
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const response = await fetch(`/api/slots?city=${scenarioCity}&doctor_id=${doc.id}&date=${today}&specialty=${encodeURIComponent(doc.specialty)}`);
      const data = await response.json();
      setScenarioSlots(data);
      setScenarioStep(3);

      // Auto-scroll to slots section
      setTimeout(() => {
        document.getElementById('scenario-slots')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (e) {
      console.error('Failed to load slots:', e);
      alert('Failed to load slots');
    } finally {
      setScenarioLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Server className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              Diagnostic Tools
            </h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">Test QMS API methods and audit doctor data.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {redisStatus && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium border ${
                redisStatus.connected 
                  ? 'bg-purple-50 text-purple-700 border-purple-200' 
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`} title={redisStatus.error || redisStatus.message}>
                <Database className="w-3 h-3 md:w-4 md:h-4" />
                Redis: {redisStatus.connected ? 'Connected' : 'Disabled'}
              </div>
            )}
            {wpStatus && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium border ${
                wpStatus.connected 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {wpStatus.connected ? <Wifi className="w-3 h-3 md:w-4 md:h-4" /> : <WifiOff className="w-3 h-3 md:w-4 md:h-4" />}
                WP DB: {wpStatus.connected ? 'Connected' : `Disconnected (${wpStatus.error || 'Unknown error'}${wpStatus.host ? ` at ${wpStatus.host}` : ''})`}
              </div>
            )}
            <button
              onClick={async () => {
                try {
                  await fetch('/api/wp-doctors/clear-cache', { method: 'POST' });
                  alert('WP Doctors cache cleared!');
                } catch {
                  alert('Failed to clear cache');
                }
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs md:text-sm font-medium transition-colors"
            >
              Clear WP Cache
            </button>
            <a href="/" className="text-blue-600 hover:underline font-medium text-sm">
              &larr; Back to App
            </a>
          </div>
        </div>

        {/* Tabs */}
        <Card className="flex border-b border-slate-200 rounded-t-xl px-2 overflow-x-auto no-scrollbar rounded-b-none border-x-0 border-t-0 shadow-none p-0">
          <button
            onClick={() => setActiveTab('api')}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'api' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            API Tester
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'audit' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            Doctor Content Audit
          </button>
          <button
            onClick={() => setActiveTab('scenario')}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'scenario' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Scenario Chain
          </button>
          <button
            onClick={() => { setActiveTab('deepAudit'); fetchDeepAuditDoctors(); }}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'deepAudit' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Database className="w-4 h-4" />
            Deep WP Audit
          </button>
          <button
            onClick={() => {
              setActiveTab('linking');
              if (!linkingData) fetchLinkingData();
            }}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'linking' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Связывание врачей
          </button>
        </Card>

        {activeTab === 'api' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Controls Panel */}
            <Card className="lg:col-span-4 p-4 md:p-6 space-y-5 h-fit">
              <h2 className="text-lg font-semibold border-b border-slate-100 pb-3 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-slate-400" />
                Configuration
              </h2>

              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <input 
                  type="checkbox" 
                  id="useServerProxy" 
                  checked={useServerProxy} 
                  onChange={(e) => setUseServerProxy(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="useServerProxy" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                  Use Server Proxy (Auto-Key)
                </label>
              </div>
              
              {!useServerProxy && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Proxy URL</label>
                    <input 
                      type="text" 
                      value={baseUrl} 
                      onChange={(e) => setBaseUrl(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">API Key</label>
                    <input 
                      type="text" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Chat ID</label>
                <input 
                  type="text" 
                  value={chatId} 
                  onChange={(e) => setChatId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Method</label>
                <select 
                  value={method} 
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                >
                  <option value="branch_list">branch_list (Филиалы)</option>
                  <option value="spec_list">spec_list (Специальности)</option>
                  <option value="getslotsbyspec">getslotsbyspec (Слоты/Врачи)</option>
                  <option value="getdocinfo">getdocinfo (Инфо о враче)</option>
                  <option value="getServicesToAppoint">getServicesToAppoint (Услуги)</option>
                </select>
              </div>

              {/* Extra Fields based on method */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Parameters</h3>
                
                {(method === 'getslotsbyspec' || method === 'slots') && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Specialty (spec)</label>
                      <input 
                        type="text" 
                        value={spec} 
                        onChange={(e) => setSpec(e.target.value)}
                        placeholder="e.g. Терапевт"
                        className="w-full border border-slate-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Branch ID (qqc244branch)</label>
                      <input 
                        type="text" 
                        value={branch} 
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="Optional"
                        className="w-full border border-slate-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Date (day) YYYYMMDD</label>
                      <input 
                        type="text" 
                        value={day} 
                        onChange={(e) => setDay(e.target.value)}
                        placeholder="e.g. 20231025"
                        className="w-full border border-slate-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      />
                    </div>
                  </>
                )}

                {method === 'getdocinfo' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Doctor ID (qqc_doc)</label>
                    <input 
                      type="text" 
                      value={docId} 
                      onChange={(e) => setDocId(e.target.value)}
                      className="w-full border border-slate-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                )}
                
                {method !== 'getslotsbyspec' && method !== 'slots' && method !== 'getdocinfo' && (
                  <p className="text-xs text-slate-400 italic">No extra parameters needed for this method.</p>
                )}
              </div>

              <button 
                onClick={handleTest}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-md shadow-blue-200"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Play className="w-5 h-5 fill-current" />
                )}
                {loading ? 'Executing...' : 'Run Request'}
              </button>
            </Card>

            {/* Results Panel */}
            <Card className="lg:col-span-8 p-6 flex flex-col">
              <h2 className="text-lg font-semibold border-b border-slate-100 pb-3 mb-4">Response</h2>
              
              {requestUrl && (
                <div className="mb-4 space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs break-all text-slate-600">
                    <span className="font-semibold text-blue-600">POST</span> {requestUrl}
                  </div>
                  {requestPayload && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-600">
                      <span className="font-semibold text-slate-800 block mb-1">Payload:</span>
                      {Object.entries(requestPayload).map(([k, v]) => (
                        <div key={k}><span className="text-purple-600">{k}</span>: {v as string}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {result && !loading && (
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${result.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {result.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      Status: {result.status}
                    </div>
                    
                    {responseTime !== null && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        {responseTime} ms
                      </div>
                    )}
                  </div>

                  <div className="flex-1 bg-slate-900 rounded-xl p-4 overflow-auto max-h-[600px] shadow-inner">
                    <pre className="text-emerald-400 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
                      {typeof result.data === 'object' 
                        ? JSON.stringify(result.data, null, 2) 
                        : result.data}
                    </pre>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'audit' && (
          <Card className="p-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <select 
                  value={auditCity} 
                  onChange={(e) => setAuditCity(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="chel">Челябинск (chel)</option>
                  <option value="spb">Санкт-Петербург (spb)</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Specialty (Optional)</label>
                <input 
                  type="text" 
                  value={auditSpecialty} 
                  onChange={(e) => setAuditSpecialty(e.target.value)}
                  placeholder="e.g. Терапевт"
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button 
                onClick={handleRunAudit}
                disabled={auditLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 h-[42px]"
              >
                {auditLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {auditLoading ? 'Fetching...' : 'Fetch QMS Doctors'}
              </button>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold text-slate-900">WordPress Database Doctors</h3>
                 <button
                    onClick={fetchWpDoctors}
                    disabled={wpLoading}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {wpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                    Fetch from WP DB
                  </button>
              </div>
              
              {wpDoctors.length > 0 ? (
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-auto text-xs font-mono max-h-[400px]">
                    {JSON.stringify(wpDoctors, null, 2)}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(wpDoctors, null, 2))}
                    className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors"
                    title="Copy JSON"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  {wpLoading ? 'Fetching from WordPress Database...' : 'No WP doctors fetched yet. Click the button above.'}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-6 mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">QMS API Response</h3>
              {auditError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Error fetching doctors</h3>
                    <p className="text-sm mt-1">{auditError}</p>
                  </div>
                </div>
              )}

              {!auditLoading && auditDoctors.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Found {auditDoctors.length} doctors</h3>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(auditDoctors, null, 2));
                        alert('Copied to clipboard');
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FileJson className="w-4 h-4" /> Copy Raw JSON
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {auditDoctors.map((doc, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50">
                        <div className="font-bold text-slate-900 mb-1">{doc.name}</div>
                        <div className="text-sm text-slate-600 mb-2">{doc.specialty || 'No specialty'}</div>
                        <div className="text-xs font-mono text-slate-400 bg-slate-100 p-1.5 rounded inline-block mb-2">
                          ID: {doc.id}
                        </div>
                        {doc.image ? (
                           <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 p-1 rounded">
                             <CheckCircle2 className="w-3 h-3" /> WP Enriched
                           </div>
                        ) : (
                           <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-1 rounded">
                             <AlertCircle className="w-3 h-3" /> Raw QMS Data
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {activeTab === 'scenario' && (
          <Card className="p-4 md:p-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-blue-600" />
              Scenario Chain Test
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8">
              <div className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-sm ${scenarioStep >= 0 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <span className="font-bold">1</span> Specialties
              </div>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-slate-300" />
              <div className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-sm ${scenarioStep >= 1 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <span className="font-bold">2</span> Doctors
              </div>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-slate-300" />
              <div className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-sm ${scenarioStep >= 2 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <span className="font-bold">3</span> Slots
              </div>
            </div>

            {scenarioStep === 0 && (
              <div className="text-center py-12">
                <button 
                  onClick={startScenario}
                  disabled={scenarioLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 hover:scale-105"
                >
                  {scenarioLoading ? 'Loading...' : 'Start Scenario: Fetch Specialties'}
                </button>
              </div>
            )}

            {scenarioStep >= 1 && (
              <div className="mb-8 animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900">Step 1: Select Specialty</h3>
                  {scenarioStep > 1 && (
                    <button 
                      onClick={() => setScenarioStep(1)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Change Specialty
                    </button>
                  )}
                </div>
                
                {scenarioStep === 1 ? (
                  <div className="flex flex-wrap gap-2">
                    {scenarioSpecs.map(spec => (
                      <button
                        key={spec}
                        onClick={() => loadScenarioDoctors(spec)}
                        disabled={scenarioLoading}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                          selectedScenarioSpec === spec 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm font-medium inline-block">
                    Selected: {selectedScenarioSpec}
                  </div>
                )}
              </div>
            )}

            {scenarioStep >= 2 && (
              <div id="scenario-doctors" className="mb-8 animate-fade-in scroll-mt-6">
                <h3 className="font-bold text-slate-900 mb-3">Step 2: Select Doctor ({selectedScenarioSpec})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {scenarioDoctors.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => loadScenarioSlots(doc)}
                      disabled={scenarioLoading}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedScenarioDoc?.id === doc.id 
                          ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                          : 'bg-white border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-bold text-slate-900">{doc.name}</div>
                      <div className="text-xs text-slate-500">{doc.specialty}</div>
                    </button>
                  ))}
                  {scenarioDoctors.length === 0 && (
                    <div className="col-span-3 text-slate-500 italic">No doctors found for this specialty.</div>
                  )}
                </div>
              </div>
            )}

            {scenarioStep >= 3 && (
              <div id="scenario-slots" className="animate-fade-in scroll-mt-6">
                <h3 className="font-bold text-slate-900 mb-3">Step 3: Available Slots ({selectedScenarioDoc?.name})</h3>
                <div className="bg-slate-900 rounded-xl p-4 overflow-auto max-h-[300px]">
                  <pre className="text-emerald-400 font-mono text-xs">
                    {JSON.stringify(scenarioSlots, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </Card>
        )}
        {activeTab === 'deepAudit' && (
          <Card className="p-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-600" />
              Deep WordPress User Meta Audit
            </h2>
            
            {!deepAuditResult ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Select Doctors to Audit</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={fetchDeepAuditDoctors}
                      disabled={deepAuditLoading}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 disabled:opacity-50 flex items-center gap-2"
                    >
                      <Loader2 className={`w-4 h-4 ${deepAuditLoading ? 'animate-spin' : ''}`} />
                      Refresh List
                    </button>
                    <button
                      onClick={handleDeepAuditFetch}
                      disabled={deepAuditLoading || selectedDeepAuditIds.length === 0}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {deepAuditLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      Fetch Metadata ({selectedDeepAuditIds.length})
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto p-1">
                  {deepAuditDoctors.map(doc => (
                    <div 
                      key={doc.ID} 
                      onClick={() => toggleDeepAuditSelection(doc.ID)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedDeepAuditIds.includes(doc.ID)
                          ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                          : 'bg-white border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center ${
                          selectedDeepAuditIds.includes(doc.ID) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'
                        }`}>
                          {selectedDeepAuditIds.includes(doc.ID) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{doc.display_name}</div>
                          <div className="text-xs text-slate-500">ID: {doc.ID} | QMS: {doc.qms_id}</div>
                          <div className="text-xs text-slate-500 mt-1">{doc.specialty}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {deepAuditDoctors.length === 0 && !deepAuditLoading && (
                    <div className="col-span-3 text-center py-8 text-slate-500">
                      No doctors found. Check WP connection.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={() => setDeepAuditResult(null)}
                    className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    &larr; Back to Selection
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(deepAuditResult, null, 2));
                      alert('Copied JSON to clipboard');
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" /> Copy Full JSON
                  </button>
                </div>
                
                <div className="bg-slate-900 rounded-xl p-4 overflow-auto max-h-[600px] shadow-inner">
                  <pre className="text-emerald-400 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(deepAuditResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'linking' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Связывание врачей (MIS &harr; WP)</h2>
                <button
                  onClick={fetchLinkingData}
                  disabled={linkingLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {linkingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Обновить данные
                </button>
              </div>

              {linkingError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  {linkingError}
                </div>
              )}

              {linkingSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5" />
                  {linkingSuccess}
                </div>
              )}

              {linkingData && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-sm text-slate-500 mb-1">Всего врачей в WP</div>
                      <div className="text-2xl font-bold text-slate-800">{linkingData.totalWpCount}</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-sm text-slate-500 mb-1">Всего врачей в МИС</div>
                      <div className="text-2xl font-bold text-slate-800">{linkingData.totalMisCount}</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="text-sm text-emerald-600 mb-1">Уже связаны</div>
                      <div className="text-2xl font-bold text-emerald-700">{linkingData.linkedCount}</div>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="text-sm text-amber-600 mb-1">Ждут связывания (WP)</div>
                      <div className="text-2xl font-bold text-amber-700">{linkingData.unlinkedWpCount}</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Предложенные совпадения</h3>
                    {linkingData.suggestions.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                        Нет предложений для связывания. Возможно, все врачи уже связаны или имена слишком отличаются.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {linkingData.suggestions.map((s: any, idx: number) => (
                          <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors bg-white">
                            <div className="flex-1 space-y-2 w-full">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">WP</span>
                                <span className="font-medium text-slate-900">{s.wpDoctor.display_name}</span>
                                <span className="text-xs text-slate-400">ID: {s.wpDoctor.ID}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">МИС</span>
                                <span className="font-medium text-slate-900">{s.misDoctor.name}</span>
                                <span className="text-xs text-slate-400">ID: {s.misDoctor.id}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-slate-500">Уверенность</span>
                                <span className={`font-bold ${s.confidence > 0.8 ? 'text-emerald-600' : s.confidence > 0.5 ? 'text-amber-500' : 'text-red-500'}`}>
                                  {Math.round(s.confidence * 100)}%
                                </span>
                              </div>
                              <button
                                onClick={() => handleLinkDoctor(s.wpDoctor.ID, s.misDoctor.id)}
                                disabled={linkingLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                              >
                                Связать
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
