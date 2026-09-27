import React, { useState } from 'react';
import { ChevronLeft, Search, Check, Globe, Smartphone, Sparkles } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '../context/LanguageContext';

interface LanguageViewProps {
  onBack: () => void;
  onToast: (msg: string) => void;
}

export const LanguageView: React.FC<LanguageViewProps> = ({ onBack, onToast }) => {
  const {
    currentLang,
    setLanguageByCode,
    resetToSystemLanguage,
    isSystemAuto,
    systemDetectedLang,
    t,
  } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.nativeName.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q)
    );
  });

  const handleSelectLanguage = (lang: Language) => {
    setLanguageByCode(lang.code);
    onToast(`已手動切換語言為: ${lang.nativeName} (${lang.name})`);
    onBack();
  };

  const handleSelectSystemAuto = () => {
    resetToSystemLanguage();
    onToast(`✓ 已設為跟隨系統語言，自動適配: ${systemDetectedLang.nativeName}`);
    onBack();
  };

  return (
    <div className="absolute inset-0 z-40 bg-[#F8F9FA] flex flex-col animate-in slide-in-from-right duration-200 select-none">
      {/* Top Header Bar */}
      <div className="w-full px-4 pt-3 pb-3 flex items-center justify-between border-b border-neutral-100 bg-white shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-neutral-800 hover:text-black active:scale-95 transition cursor-pointer"
          title="返回"
        >
          <ChevronLeft size={24} className="stroke-[2.2]" />
        </button>

        <div className="flex items-center space-x-1.5">
          <Globe size={19} className="text-[#FF6B00]" />
          <h2 className="text-[17px] font-bold text-neutral-900 tracking-tight">
            {t('lang_title')}
          </h2>
        </div>

        <div className="w-7" />
      </div>

      {/* Search Input Bar */}
      <div className="px-4 py-3 bg-white border-b border-neutral-100 shrink-0">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋語言或地區 (如 English, 繁體, 日本語)..."
            className="w-full pl-9 pr-4 py-2.5 bg-neutral-100/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF6B00] transition-all"
          />
        </div>
      </div>

      {/* Language List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* System Language Auto Card */}
        {!searchQuery && (
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-400 px-1 uppercase tracking-wider">
              系統預設 (自動適配)
            </div>
            <button
              onClick={handleSelectSystemAuto}
              className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                isSystemAuto
                  ? 'bg-orange-50/70 border-orange-300 shadow-2xs'
                  : 'bg-white border-neutral-200/80 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSystemAuto ? 'bg-[#FF6B00] text-white shadow-xs' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <Smartphone size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-neutral-900">跟隨系統語言</span>
                    <span className="text-[10px] bg-orange-100 text-[#FF6B00] px-1.5 py-0.5 rounded-full font-bold">
                      自動
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">
                    已檢測到系統: {systemDetectedLang.nativeName} ({systemDetectedLang.region})
                  </span>
                </div>
              </div>

              {isSystemAuto && (
                <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs">
                  <Check size={12} className="stroke-[3]" />
                </div>
              )}
            </button>
          </div>
        )}

        <div className="text-[11px] font-bold text-neutral-400 px-1 pt-1 uppercase tracking-wider">
          所有支援語言 ({filteredLanguages.length})
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden shadow-2xs">
          {filteredLanguages.map((lang) => {
            const isSelected = !isSystemAuto && currentLang.code === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang)}
                className={`w-full px-4 py-3.5 flex items-center justify-between transition-colors text-left cursor-pointer ${
                  isSelected ? 'bg-orange-50/40' : 'hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs uppercase ${
                      isSelected
                        ? 'bg-[#FF6B00] text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {lang.code.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold ${isSelected ? 'text-[#FF6B00]' : 'text-neutral-900'}`}>
                        {lang.nativeName}
                      </span>
                      <span className="text-[11px] text-neutral-400">({lang.name})</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-medium">{lang.region}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
