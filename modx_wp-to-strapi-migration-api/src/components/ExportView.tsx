import React, { useState } from 'react';
import { Download, Loader2, FileJson, CheckCircle2, AlertCircle, ArrowLeft, Copy, Eye, ExternalLink, Bot } from 'lucide-react';

export const ExportView: React.FC<{ handleTabChange: (tab: string) => void, city: 'spb' | 'chelyabinsk' }> = ({ handleTabChange, city }) => {
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState<string>('all');
  const [result, setResult] = useState<{ success: boolean; files?: string[]; message?: string; error?: string; output?: string } | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [viewingFile, setViewingFile] = useState<string | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setResult(null);
    setFileContents({});
    setViewingFile(null);
    try {
      const limitVal = limit.trim().toLowerCase();
      const limitParam = limitVal === 'all' || limitVal === '' ? '' : `&limit=${limitVal}`;
      const res = await fetch(`/api/export/run?city=${city}${limitParam}`, { method: 'POST' });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleQAExport = async () => {
    setLoading(true);
    setResult(null);
    setFileContents({});
    setViewingFile(null);
    try {
      const res = await fetch(`/api/export/qa`, { method: 'POST' });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleClaudeExport = async () => {
    setLoading(true);
    setResult(null);
    setFileContents({});
    setViewingFile(null);
    try {
      const res = await fetch(`/api/export/claude`, { method: 'POST' });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const loadFileContent = async (fileUrl: string) => {
    try {
      const res = await fetch(fileUrl);
      const text = await res.text();
      setFileContents(prev => ({ ...prev, [fileUrl]: text }));
      setViewingFile(fileUrl);
    } catch (e) {
      console.error("Failed to load file content", e);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Скопировано в буфер обмена!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleTabChange("overview")}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
            <Download className="text-indigo-600" />
            Экспорт данных (JSON Dump) - {city === 'spb' ? 'Санкт-Петербург' : 'Челябинск'}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <p className="text-slate-600 mb-6">
          {city === 'spb' 
            ? 'Этот инструмент генерирует полные JSON-дампы всех сущностей сайта, а также строит графы связей, дерево сайта и манифест ассетов. Данные извлекаются из базы данных MODX, включая сложные поля MIGX (FAQ, галереи, блоки статей), прайс-листы из кастомных таблиц и медиафайлы. Эти файлы предназначены для передачи AI-агенту для проектирования новой платформы и настройки синхронизации.'
            : 'Этот инструмент генерирует JSON-дампы для Челябинского филиала (WordPress), используя REST API для получения данных о врачах и других сущностях. Эти файлы предназначены для передачи AI-агенту для проектирования новой платформы.'}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-8">
          <div className="w-full sm:w-64">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Количество записей (число или 'all')
            </label>
            <input 
              type="text"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="Например: 10, 50, или all"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <button
            onClick={handleExport}
            disabled={loading}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
            {loading ? 'Генерация файлов...' : 'Сгенерировать JSON файлы'}
          </button>

          <button
            onClick={handleQAExport}
            disabled={loading}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <FileJson size={20} />}
            {loading ? 'Генерация...' : 'Ответы на вопросы (Q&A)'}
          </button>
        </div>

        <div className="mb-8 p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-indigo-900 flex items-center gap-2">
            <Bot className="text-indigo-600" size={24} />
            Режим авто-исследования для AI (OpenAPI)
          </h3>
          <p className="text-sm text-indigo-800 mb-4">
            Это профессиональный подход (9/10). Передайте эту ссылку следующему AI-агенту. Он сам прочитает спецификацию, поймет какие эндпоинты существуют, и сможет динамически запрашивать данные (с пагинацией), чтобы спроектировать идеальную архитектуру.
          </p>
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-indigo-200">
            <code className="text-sm text-indigo-700 flex-1 break-all">
              {window.location.origin}/api/explore/openapi.json
            </code>
            <button 
              onClick={() => copyToClipboard(`${window.location.origin}/api/explore/openapi.json`)}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
              title="Скопировать ссылку"
            >
              <Copy size={18} />
            </button>
            <a 
              href="/api/explore/openapi.json" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
              title="Открыть в новой вкладке"
            >
              <ExternalLink size={18} />
            </a>
          </div>
          <div className="mt-4 text-xs text-indigo-600/80">
            <strong>Как поставить задачу агенту:</strong> "Вот ссылка на OpenAPI спецификацию старой базы данных. Изучи структуру, сделай тестовые запросы с limit=5, и спроектируй архитектуру Strapi."
          </div>
          <div className="mt-6 pt-6 border-t border-indigo-200">
             <h4 className="font-semibold text-indigo-900 mb-2">Используете Claude.ai (веб-версию)?</h4>
             <p className="text-sm text-indigo-800 mb-4">
               Обычный чат Claude не умеет ходить по API. Для него лучше сгенерировать готовый Markdown-файл со всеми структурами и прикрепить его в чат.
             </p>
             <button
              onClick={handleClaudeExport}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Bot size={16} />}
              Сгенерировать файл для Claude.ai
            </button>
          </div>
        </div>

        <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
            <ExternalLink className="text-indigo-600" size={20} />
            Живые API Эндпоинты (Live Endpoints)
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Вы можете открыть эти ссылки в новой вкладке, чтобы увидеть сырые JSON-ответы на вопросы по архитектуре, или передать эти URL агенту.
          </p>
          <div className="space-y-3">
            <a href="/api/qa/spb/services?limit=10" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group">
              <div>
                <div className="font-medium text-slate-800">Запрос 1: СПб, услуги с taxonomies</div>
                <div className="text-xs text-slate-500 font-mono mt-1">GET /api/qa/spb/services?limit=10</div>
              </div>
              <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-500" />
            </a>
            <a href="/api/qa/chel/services/891" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group">
              <div>
                <div className="font-medium text-slate-800">Запрос 2: ЧЛБ, услуга с полным контентом (ID 891)</div>
                <div className="text-xs text-slate-500 font-mono mt-1">GET /api/qa/chel/services/891</div>
              </div>
              <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-500" />
            </a>
            <a href="/api/qa/chel/directions" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group">
              <div>
                <div className="font-medium text-slate-800">Запрос 3: ЧЛБ, directions первого уровня</div>
                <div className="text-xs text-slate-500 font-mono mt-1">GET /api/qa/chel/directions</div>
              </div>
              <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-500" />
            </a>
            <a href="/api/qa/spb/doctors/78" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group">
              <div>
                <div className="font-medium text-slate-800">Запрос 4: СПб, врач с directions и services (Тупиков, ID 78)</div>
                <div className="text-xs text-slate-500 font-mono mt-1">GET /api/qa/spb/doctors/78</div>
              </div>
              <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-500" />
            </a>
            <a href="/api/qa/spb/price_items" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group">
              <div>
                <div className="font-medium text-slate-800">Запрос 5: СПб, PriceItems с примерами tab</div>
                <div className="text-xs text-slate-500 font-mono mt-1">GET /api/qa/spb/price_items</div>
              </div>
              <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-500" />
            </a>
          </div>
        </div>

        {result && result.success && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 flex items-start gap-3">
              <CheckCircle2 className="shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold">Экспорт успешно завершен</h4>
                <p className="text-sm mt-1">{result.message}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800">Сгенерированные файлы:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.files?.map((file, idx) => {
                  const fileName = file.split('/').pop() || '';
                  const isMd = fileName.endsWith('.md');
                  return (
                    <div 
                      key={idx} 
                      className={`flex flex-col gap-3 p-4 border rounded-lg transition-colors ${
                        isMd 
                          ? 'border-amber-200 bg-amber-50' 
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FileJson className={isMd ? 'text-amber-500' : 'text-indigo-500'} size={24} />
                        <span className={`font-medium truncate ${isMd ? 'text-amber-800' : 'text-slate-700'}`}>
                          {fileName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => loadFileContent(file)}
                          className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye size={16} />
                          Просмотр
                        </button>
                        <a
                          href={file}
                          target="_blank"
                          rel="noreferrer"
                          download={fileName}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Download size={16} />
                          Скачать
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {viewingFile && fileContents[viewingFile] && (
              <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                  <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                    <FileJson size={18} className="text-indigo-500" />
                    {viewingFile.split('/').pop()}
                  </h4>
                  <button
                    onClick={() => copyToClipboard(fileContents[viewingFile])}
                    className="text-slate-600 hover:text-indigo-600 bg-white border border-slate-300 hover:border-indigo-300 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Copy size={16} />
                    Скопировать всё
                  </button>
                </div>
                <div className="bg-slate-900 p-4 max-h-[600px] overflow-y-auto">
                  <pre className="text-emerald-400 text-xs font-mono whitespace-pre-wrap break-words">
                    {fileContents[viewingFile].length > 500000 
                      ? fileContents[viewingFile].substring(0, 500000) + '\n\n... (Файл слишком большой для полного отображения. Пожалуйста, скачайте или скопируйте его целиком)' 
                      : fileContents[viewingFile]}
                  </pre>
                </div>
              </div>
            )}

            {result.output && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Лог выполнения</h4>
                <pre className="bg-slate-900 text-emerald-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                  {result.output}
                </pre>
              </div>
            )}
          </div>
        )}

        {result && !result.success && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold">Ошибка экспорта</h4>
              <p className="text-sm mt-1">{result.error}</p>
              {result.output && (
                <pre className="mt-4 bg-red-900/10 p-3 rounded text-xs font-mono overflow-x-auto">
                  {result.output}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
