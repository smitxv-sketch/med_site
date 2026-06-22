import React, { useState, useEffect } from 'react';
import { RefreshCw, Settings, Play, CheckCircle2, XCircle, Loader2, Database, Key, Globe, Clock } from 'lucide-react';

export const SyncView: React.FC = () => {
  const [config, setConfig] = useState({ STRAPI_URL: '', STRAPI_TOKEN: '' });
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [syncingCity, setSyncingCity] = useState<'spb' | 'chelyabinsk' | null>(null);

  useEffect(() => {
    fetchConfig();
    fetchLogs();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/sync-engine/config');
      const data = await res.json();
      setConfig({
        STRAPI_URL: data.STRAPI_URL || '',
        STRAPI_TOKEN: data.STRAPI_TOKEN || ''
      });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/sync-engine/logs');
      const data = await res.json();
      setLogs(data);
    } catch (e) {
      console.error(e);
    }
  };

  const saveConfig = async () => {
    setLoading(true);
    try {
      await fetch('/api/sync-engine/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      alert('Настройки сохранены');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/sync-engine/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: config.STRAPI_URL, token: config.STRAPI_TOKEN })
      });
      const data = await res.json();
      setTestResult(data);
    } catch (e: any) {
      setTestResult({ success: false, message: e.message });
    } finally {
      setLoading(false);
    }
  };

  const runSync = async (city: 'spb' | 'chelyabinsk') => {
    setSyncingCity(city);
    try {
      const res = await fetch('/api/sync-engine/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
      });
      const data = await res.json();
      if (!data.success) {
        alert('Ошибка синхронизации: ' + data.message);
      } else {
        alert('Синхронизация успешно завершена!');
      }
      fetchLogs();
    } catch (e: any) {
      alert('Ошибка: ' + e.message);
    } finally {
      setSyncingCity(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <RefreshCw className="text-indigo-600" />
          Движок синхронизации
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Settings className="text-indigo-600" />
              Настройки Strapi
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <Globe size={16} /> URL сервера Strapi
                </label>
                <input 
                  type="text"
                  value={config.STRAPI_URL}
                  onChange={(e) => setConfig({ ...config, STRAPI_URL: e.target.value })}
                  placeholder="http://localhost:1337"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <Key size={16} /> API Токен (Full Access)
                </label>
                <input 
                  type="password"
                  value={config.STRAPI_TOKEN}
                  onChange={(e) => setConfig({ ...config, STRAPI_TOKEN: e.target.value })}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={saveConfig}
                  disabled={loading}
                  className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Сохранить
                </button>
                <button
                  onClick={testConnection}
                  disabled={loading || !config.STRAPI_URL || !config.STRAPI_TOKEN}
                  className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Тест связи
                </button>
              </div>

              {testResult && (
                <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${testResult.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {testResult.success ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <XCircle size={18} className="shrink-0 mt-0.5" />}
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Play className="text-indigo-600" />
              Запуск синхронизации
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Воркер скачает данные из источника, преобразует их в формат Strapi и отправит по REST API.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => runSync('spb')}
                disabled={syncingCity !== null || !config.STRAPI_URL}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {syncingCity === 'spb' ? <Loader2 size={18} className="animate-spin" /> : <Database size={18} />}
                Синхронизировать СПБ
              </button>
              <button
                onClick={() => runSync('chelyabinsk')}
                disabled={syncingCity !== null || !config.STRAPI_URL}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {syncingCity === 'chelyabinsk' ? <Loader2 size={18} className="animate-spin" /> : <Database size={18} />}
                Синхронизировать Челябинск
              </button>
            </div>
          </div>
        </div>

        {/* Logs Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Clock className="text-indigo-600" />
                Логи синхронизации
              </h3>
              <button onClick={fetchLogs} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Обновить
              </button>
            </div>
            
            <div className="p-0 flex-1 overflow-y-auto max-h-[600px]">
              {logs.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  Нет записей о синхронизации
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 font-medium">Время</th>
                      <th className="px-6 py-3 font-medium">Город</th>
                      <th className="px-6 py-3 font-medium">Статус</th>
                      <th className="px-6 py-3 font-medium">Сообщение</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                          {new Date(log.created_at).toLocaleString('ru-RU')}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 uppercase">
                            {log.city}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {log.status === 'success' && <span className="inline-flex items-center gap-1 text-emerald-600 font-medium"><CheckCircle2 size={14}/> Успех</span>}
                          {log.status === 'error' && <span className="inline-flex items-center gap-1 text-red-600 font-medium"><XCircle size={14}/> Ошибка</span>}
                          {log.status === 'info' && <span className="inline-flex items-center gap-1 text-blue-600 font-medium"><Loader2 size={14}/> Инфо</span>}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {log.message}
                          {log.details && (
                            <div className="mt-1 text-xs text-slate-500 font-mono bg-slate-100 p-2 rounded">
                              {log.details}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
