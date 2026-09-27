import React, { useState } from 'react';
import { X, Volume2, VolumeX, Check, Globe, Play, Sparkles } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

interface VoiceOption {
  id: string;
  name: string;
  langCode: string;
  sampleText: string;
  description: string;
}

const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: 'zh-mandarin-female',
    name: '國語普通話（女聲）',
    langCode: 'zh-CN',
    sampleText: 'Bybit 錢包語音播報已開啟，BTC 最新報價 91,240 美元。',
    description: '標準甜美・行情播報推薦',
  },
  {
    id: 'zh-mandarin-male',
    name: '國語普通話（男聲）',
    langCode: 'zh-CN',
    sampleText: 'Bybit 錢包語音播報已開啟，賬戶充值提現即時提醒。',
    description: '沈穩清晰・專業交易播報',
  },
  {
    id: 'zh-cantonese',
    name: '粵語廣東話',
    langCode: 'zh-HK',
    sampleText: 'Bybit 錢包語音播報已開啟，歡迎使用！',
    description: '港澳專屬・粵語地道發音',
  },
  {
    id: 'en-us',
    name: 'English (US Voice)',
    langCode: 'en-US',
    sampleText: 'Bybit Wallet voice broadcast enabled. Ready for trades.',
    description: 'International Standard English',
  },
];

const LANGUAGE_OPTIONS = [
  { id: 'zh-Hant', label: '繁體中文 (香港 / 台灣)', region: '繁體' },
  { id: 'zh-Hans', label: '简体中文', region: '简体' },
  { id: 'en', label: 'English (US)', region: 'EN' },
  { id: 'ja', label: '日本語', region: '日本語' },
];

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose, onToast }) => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedVoiceId, setSelectedVoiceId] = useState('zh-mandarin-female');
  const [selectedLang, setSelectedLang] = useState('zh-Hant');
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const handleSpeak = (text: string, langCode: string) => {
    if (!('speechSynthesis' in window)) {
      onToast('您的瀏覽器暫不支援語音合成播報');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSelectVoice = (opt: VoiceOption) => {
    setSelectedVoiceId(opt.id);
    onToast(`已切換至：${opt.name}`);
    if (voiceEnabled) {
      handleSpeak(opt.sampleText, opt.langCode);
    }
  };

  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    if (next) {
      onToast('已開啟語音播報');
      const cur = VOICE_OPTIONS.find((v) => v.id === selectedVoiceId) || VOICE_OPTIONS[0];
      handleSpeak('語音播報功能已開啟', cur.langCode);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      onToast('已關閉語音播報（靜音）');
    }
  };

  const handleSelectLang = (id: string, label: string) => {
    setSelectedLang(id);
    onToast(`系統語言已切換為：${label}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center">
              <Volume2 size={18} />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">語音與語言切換</h3>
              <p className="text-[11px] text-neutral-400">行情播報、交易提示與界面語言</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Section 1: 語音切換 / 語音播報 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1.5">
                <Volume2 size={16} className="text-[#FF6B00]" />
                <span className="text-xs font-bold text-neutral-900">行情與交易語音播報</span>
              </div>
              <button
                onClick={handleToggleVoice}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  voiceEnabled ? 'bg-[#FF6B00]' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 mb-3">
              開啟後，閃兌到賬、充值提現、開卡成功及重要行情異動將自動發出語音提醒。
            </p>

            {/* Voice Options List */}
            <div className="space-y-2">
              {VOICE_OPTIONS.map((opt) => {
                const isSelected = selectedVoiceId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectVoice(opt)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#FF6B00] bg-orange-50/60 shadow-xs'
                        : 'border-neutral-200/80 bg-white hover:border-orange-200'
                    } ${!voiceEnabled ? 'opacity-60' : ''}`}
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center space-x-1.5">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#FF6B00]' : 'text-neutral-800'}`}>
                          {opt.name}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-[#FF6B00] text-white rounded-full font-semibold">
                            當前語音
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{opt.description}</div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(opt.sampleText, opt.langCode);
                        }}
                        className="px-2 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-700 text-[10px] font-semibold flex items-center space-x-1 hover:border-orange-300 hover:text-[#FF6B00] transition active:scale-95 shadow-2xs"
                        title="試聽語音"
                      >
                        <Play size={10} className="fill-current" />
                        <span>試聽</span>
                      </button>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-[#FF6B00] text-white' : 'border border-neutral-300 text-transparent'
                        }`}
                      >
                        <Check size={12} className="stroke-[3]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: 系統語言切換 */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="flex items-center space-x-1.5 mb-2.5">
              <Globe size={16} className="text-[#FF6B00]" />
              <span className="text-xs font-bold text-neutral-900">系統介面語言（Language）</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {LANGUAGE_OPTIONS.map((lang) => {
                const isSelected = selectedLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => handleSelectLang(lang.id, lang.label)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FF6B00] bg-orange-50/70 text-[#FF6B00] shadow-xs'
                        : 'border-neutral-200/80 bg-white text-neutral-700 hover:border-orange-200'
                    }`}
                  >
                    <span className="truncate">{lang.label}</span>
                    {isSelected && <Check size={14} className="stroke-[2.5] text-[#FF6B00] shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/60 flex items-center justify-between">
          <div className="text-[11px] text-neutral-500 flex items-center space-x-1">
            <Sparkles size={13} className="text-[#FF6B00]" />
            <span>設置將自動保存在您的設備中</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#FF6B00] text-white text-xs font-bold rounded-full hover:bg-[#E05E00] active:scale-98 transition cursor-pointer shadow-xs"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
