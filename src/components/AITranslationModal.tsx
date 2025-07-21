import React, { useState } from 'react';
import { Bot, Download, Eye, Key, Languages, Loader2, RefreshCw, X } from 'lucide-react';
import { useAITranslation } from '../hooks/useAITranslation';
import { useToast } from '../contexts/useToast';

// Import base English translations
import enTranslations from '../i18n/locales/en.json';

interface AITranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh-TW', name: '中文(繁體)', flag: '🇹🇼' },
];

const AITranslationModal: React.FC<AITranslationModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const { state, translateMultipleLanguages, reset } = useAITranslation();
  
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'google' | 'openai'>('openai');
  const [translationResults, setTranslationResults] = useState<Record<string, string>>({});
  const [previewLanguage, setPreviewLanguage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLanguageToggle = (languageCode: string) => {
    setSelectedLanguages(prev => 
      prev.includes(languageCode)
        ? prev.filter(code => code !== languageCode)
        : [...prev, languageCode]
    );
  };

  const handleTranslate = async () => {
    if (!apiKey.trim()) {
      showToast({
        message: 'Please enter an API key',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    if (selectedLanguages.length === 0) {
      showToast({
        message: 'Please select at least one language',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      const results = await translateMultipleLanguages(
        selectedLanguages,
        enTranslations,
        apiKey,
        provider
      );

      setTranslationResults(results);
      
      if (Object.keys(results).length > 0) {
        showToast({
          message: `Successfully translated ${Object.keys(results).length} languages`,
          type: 'success',
          duration: 3000,
        });
      }
    } catch {
      showToast({
        message: 'Translation failed. Please check your API key and try again.',
        type: 'error',
        duration: 5000,
      });
    }
  };

  const handleDownload = (languageCode: string) => {
    const translationData = translationResults[languageCode];
    if (!translationData) return;

    const blob = new Blob([translationData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${languageCode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast({
      message: `Downloaded ${languageCode}.json`,
      type: 'success',
      duration: 2000,
    });
  };

  const handleDownloadAll = () => {
    Object.entries(translationResults).forEach(([languageCode, data]) => {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${languageCode}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    showToast({
      message: `Downloaded ${Object.keys(translationResults).length} translation files`,
      type: 'success',
      duration: 3000,
    });
  };

  const handleReset = () => {
    reset();
    setSelectedLanguages([]);
    setTranslationResults({});
    setPreviewLanguage(null);
  };

  const previewData = previewLanguage && translationResults[previewLanguage] 
    ? JSON.parse(translationResults[previewLanguage]) 
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-[90%] max-w-6xl h-[80%] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">AI Translation Generator</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Configuration */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <div className="space-y-6">
              {/* API Configuration */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Translation Provider
                    </label>
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value as 'google' | 'openai')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="openai">OpenAI GPT</option>
                      <option value="google">Google Translate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={`Enter your ${provider === 'openai' ? 'OpenAI' : 'Google Translate'} API key`}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  Select Languages to Translate ({selectedLanguages.length})
                </h3>
                
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {AVAILABLE_LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageToggle(language.code)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        selectedLanguages.includes(language.code)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{language.flag}</span>
                        <span className="font-medium text-sm">{language.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleTranslate}
                  disabled={state.isTranslating || selectedLanguages.length === 0 || !apiKey.trim()}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    state.isTranslating || selectedLanguages.length === 0 || !apiKey.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {state.isTranslating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Translating... {state.progress}%
                    </>
                  ) : (
                    <>
                      <Bot className="w-5 h-5" />
                      Start Translation
                    </>
                  )}
                </button>

                {Object.keys(translationResults).length > 0 && (
                  <button
                    onClick={handleDownloadAll}
                    className="w-full py-3 px-4 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download All ({Object.keys(translationResults).length})
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 rounded-lg font-medium bg-gray-500 text-white hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </button>
              </div>

              {/* Progress and Status */}
              {state.isTranslating && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${state.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Completed: {state.completedLanguages.join(', ')}
                  </p>
                </div>
              )}

              {state.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{state.error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Translation Results</h3>
            
            {Object.keys(translationResults).length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <Languages className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No translations generated yet</p>
                <p className="text-sm">Select languages and start translation to see results</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(translationResults).map(([languageCode]) => {
                  const language = AVAILABLE_LANGUAGES.find(lang => lang.code === languageCode);
                  return (
                    <div key={languageCode} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{language?.flag}</span>
                          <span className="font-medium">{language?.name}</span>
                          <span className="text-sm text-gray-500">({languageCode})</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setPreviewLanguage(
                              previewLanguage === languageCode ? null : languageCode
                            )}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownload(languageCode)}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {previewLanguage === languageCode && previewData && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2">Preview:</h4>
                          <div className="text-sm space-y-1">
                            <p><strong>common.home:</strong> {previewData.common?.home}</p>
                            <p><strong>common.settings:</strong> {previewData.common?.settings}</p>
                            <p><strong>home.title:</strong> {previewData.home?.title}</p>
                            <p><strong>settings.title:</strong> {previewData.settings?.title}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITranslationModal;
