import React, { useState } from 'react';
import {
  ChevronLeft,
  ShieldCheck,
  Search,
  Award,
  ChevronRight,
  CheckCircle2,
  Lock,
  Headphones,
  Check,
} from 'lucide-react';

interface SecurityCourseViewProps {
  onBack: () => void;
  onToast: (msg: string) => void;
  onOpenCustomerService?: () => void;
}

export const SecurityCourseView: React.FC<SecurityCourseViewProps> = ({
  onBack,
  onToast,
  onOpenCustomerService,
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'quiz' | 'verify'>('courses');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(1);

  // Security Verification Tool state
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyResult, setVerifyResult] = useState<{
    status: 'official' | 'fake' | 'none';
    message: string;
  }>({ status: 'none', message: '' });

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const courses = [
    {
      id: 1,
      title: '防釣魚與虛假網站識別',
      duration: '2 分鐘',
      level: '入門必修',
      badge: '熱門',
      icon: '🎣',
      summary: '認準官方唯一主域名與防釣魚防偽安全碼。',
      content: [
        '防釣魚碼 (Anti-Phishing Code)：在官方網站設置專屬防偽安全碼，所有來自 BYBIT 的官方通知郵件頂部均會附帶該字串。',
        '謹慎點擊搜尋引擎廣告：搜尋「Bybit」時，請認準主域名 https://www.bybit.com，切勿點擊假冒推廣網址。',
        '官方客服絕不主動私信：任何在 Telegram、微信、Discord 主動私聊並索取密碼、簡訊驗證碼、私鑰的均為詐騙分子！',
      ],
    },
    {
      id: 2,
      title: '預付卡與信用卡防盜刷安全指南',
      duration: '3 分鐘',
      level: '持卡人必讀',
      badge: '核心',
      icon: '💳',
      summary: '日常刷卡消費保護、CVV 安全防護與爭議款項一鍵申訴。',
      content: [
        '保護卡號與安全碼：切勿向任何人透露卡面上的 16 位卡號、有效期及背面 3 位 CVV 安全碼。',
        '一鍵凍結即時止損：若發現異常刷卡扣款通知，可立即在「卡片管理」介面點擊「凍結卡片」，系統將瞬間拒付所有後續授權。',
        '3D Secure 雙重授權機制：在線商戶消費均支援 3DS 動態簡訊/郵箱驗證碼二次核驗，未授權交易無法完成。',
        '全球爭議退款通道：若因商戶重複扣款或未履約發貨，可在 60 天內向客服提交爭議扣款（Chargeback）調查申請。',
      ],
    },
    {
      id: 3,
      title: '雙重驗證 (2FA) 與設備安全鎖定',
      duration: '2 分鐘',
      level: '賬戶防禦',
      badge: '重要',
      icon: '🔐',
      summary: '全面啟用 Google Authenticator 與生物識別免受黑客威脅。',
      content: [
        '啟用 Google Authenticator：每 30 秒自動更新動態 6 位數碼，即使密碼洩漏，黑客亦無法跨越 2FA 屏障。',
        '開啟提幣安全地址白名單：設置常用提現目標錢包，新增未知地址需要等待 24 小時冷卻期方可生效。',
        '敏感操作二次確認：修改密碼、更換郵箱、劃轉大額資金時，需多端聯合授權，全天候保障資產。',
      ],
    },
    {
      id: 4,
      title: '100% 準備金證明與冷錢包架構',
      duration: '2 分鐘',
      level: '進階科普',
      badge: '透明',
      icon: '🏦',
      summary: '基於默克爾樹（Merkle Tree）透明驗證，每位用戶的資產均有 1:1 充足準備金。',
      content: [
        '默克爾樹鏈上可驗證：用戶可隨時在官方驗證工具自查個人在線資產是否被完整記錄於儲備證明快照中。',
        '多簽名冷熱錢包分離：98% 以上的用戶數字資產均存儲於物理隔離的離線冷錢包，免受網絡攻擊威脅。',
        '設立千萬級專屬投資者保護基金：應對突發極端行情與安全事件，為全球數千萬用戶提供兜底防護。',
      ],
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: '有人在 Telegram 自稱「Bybit 官方高級客服」私信您，稱賬戶有風險要求提供郵箱驗證碼，您應當：',
      options: [
        '立即提供驗證碼以配合客服檢查',
        '絕不提供！官方人員永遠不會向用戶索取驗證碼或密碼，此為假冒詐騙',
        '把驗證碼發給他但自己保留密碼',
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: '若您突然收到預付卡在異地商戶的未知消費扣款簡訊，第一時間應該做什麼？',
      options: [
        '等幾天看看會不會自動退回',
        '立即在卡片詳情點擊「凍結卡片」，阻斷後續盜刷並聯絡官方客服',
        '直接註銷整個 Bybit 賬戶',
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      question: '關於 Bybit 防釣魚碼（Anti-Phishing Code），下列說法正確的是？',
      options: [
        '設置後，所有官方發給您的真郵件頂部均會出現該防偽碼',
        '不需要設置，點擊任何郵件鏈接都很安全',
        '它是用來當作登入密碼使用的',
      ],
      correctIndex: 0,
    },
  ];

  const handleVerifyCheck = () => {
    const query = verifyInput.trim().toLowerCase();
    if (!query) {
      onToast('請輸入要查詢的網址、Telegram 賬號或郵箱');
      return;
    }

    if (
      query.includes('bybit.com') ||
      query === '@bybit_official' ||
      query === 'support@bybit.com' ||
      query === 'noreply@bybit.com'
    ) {
      setVerifyResult({
        status: 'official',
        message: '驗證通過！該渠道為 BYBIT 官方認證的安全渠道，請放心使用。',
      });
    } else {
      setVerifyResult({
        status: 'fake',
        message: '⚠️ 警告：該渠道非 BYBIT 官方認證渠道！極可能為詐騙或釣魚仿冒，切勿向其轉賬或提供任何隱私資訊！',
      });
    }
  };

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < quizQuestions.length) {
      onToast('請完成所有題目後再提交！');
      return;
    }
    setQuizSubmitted(true);
    const correctCount = quizQuestions.filter(
      (q) => quizAnswers[q.id] === q.correctIndex
    ).length;

    if (correctCount === quizQuestions.length) {
      onToast('🎉 恭喜滿分通過！獲得 5 USDT 安全激勵金！');
    } else {
      onToast(`完成測試，正確率 ${correctCount}/${quizQuestions.length}，請查看解析`);
    }
  };

  return (
    <div className="absolute inset-0 z-40 bg-[#F8F9FA] flex flex-col animate-in slide-in-from-right duration-200 select-none">
      {/* Top Header Bar */}
      <div className="w-full px-4 pt-3 pb-3 flex items-center justify-between border-b border-neutral-100 bg-white/95 backdrop-blur-xs shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-neutral-800 hover:text-black active:scale-95 transition cursor-pointer"
          title="返回"
        >
          <ChevronLeft size={24} className="stroke-[2.2]" />
        </button>

        <div className="flex items-center space-x-1.5">
          <ShieldCheck size={20} className="text-[#FF6B00]" />
          <h2 className="text-[17px] font-bold text-neutral-900 tracking-tight">
            BYBIT 安全課
          </h2>
        </div>

        <button
          onClick={onOpenCustomerService || (() => onToast('正在為您接通安全專員在線客服...'))}
          className="p-1 -mr-1 text-neutral-700 hover:text-[#FF6B00] active:scale-95 transition cursor-pointer"
          title="在線客服"
        >
          <Headphones size={21} className="stroke-[2]" />
        </button>
      </div>

      {/* Segmented Tab Control */}
      <div className="shrink-0 px-4 pt-2.5 pb-2 bg-white border-b border-neutral-100 flex space-x-2">
        <button
          type="button"
          onClick={() => setActiveTab('courses')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          精選課程
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'quiz'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          答題領 5U
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF6B00] rounded-full animate-ping" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('verify')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'verify'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          官方防偽驗證
        </button>
      </div>

      {/* Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* TAB 1: COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-3.5">
            {/* Dark Brand Banner */}
            <div className="bg-gradient-to-br from-[#1C1F26] via-[#242933] to-[#2B303C] text-white p-4 rounded-2xl shadow-sm border border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-orange-400 font-extrabold tracking-wider uppercase">
                    BYBIT SECURITY SHIELD
                  </span>
                  <h4 className="text-base font-extrabold leading-snug">
                    資產守護白皮書 · 2026 版
                  </h4>
                  <p className="text-xs text-neutral-300">
                    一分鐘學安全，一輩子守資產
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  🛡️
                </div>
              </div>
            </div>

            {/* Course Cards List */}
            <div className="space-y-3">
              {courses.map((course) => {
                const isExpanded = selectedCourseId === course.id;
                return (
                  <div
                    key={course.id}
                    className="border border-neutral-200/90 rounded-2xl p-4 bg-white shadow-2xs hover:border-orange-200 transition-all"
                  >
                    <div
                      onClick={() => setSelectedCourseId(isExpanded ? null : course.id)}
                      className="flex items-start justify-between cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl mt-0.5">{course.icon}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h5 className="text-sm font-bold text-neutral-900">
                              {course.title}
                            </h5>
                            <span className="text-[10px] bg-orange-50 text-[#FF6B00] font-bold px-1.5 py-0.2 rounded">
                              {course.badge}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">{course.summary}</p>
                          <div className="flex items-center space-x-3 text-[10px] text-neutral-400 mt-2 font-medium">
                            <span>⏱️ {course.duration}</span>
                            <span>🏷️ {course.level}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-neutral-400 mt-1">
                        <ChevronRight
                          size={18}
                          className={`transition-transform duration-200 ${
                            isExpanded ? 'rotate-90 text-[#FF6B00]' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Detailed Points */}
                    {isExpanded && (
                      <div className="mt-3.5 pt-3.5 border-t border-neutral-100 text-xs text-neutral-700 space-y-2.5 animate-in fade-in duration-150">
                        {course.content.map((point, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-[#FF6B00] font-bold mt-0.5">•</span>
                            <span className="leading-relaxed text-neutral-600">{point}</span>
                          </div>
                        ))}
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => {
                              onToast(`已完成學習：《${course.title}》，安全積分 +10`);
                              setSelectedCourseId(null);
                            }}
                            className="px-3.5 py-1.5 bg-[#FF6B00] text-white rounded-lg text-xs font-semibold hover:bg-[#E05E00] cursor-pointer"
                          >
                            標記已掌握 ✓
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: QUIZ & REWARDS */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            <div className="bg-[#FFF4EC] border border-orange-100 p-4 rounded-2xl flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-white text-2xl flex items-center justify-center shadow-2xs shrink-0">
                🎁
              </div>
              <div className="text-xs">
                <span className="font-bold text-neutral-900 block text-sm">安全達人考核激勵</span>
                <span className="text-neutral-600 mt-0.5 block">
                  答對全部 3 道防護考題，即可領取 <strong>5 USDT</strong> 開卡與手續費抵扣券！
                </span>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="border border-neutral-200/90 rounded-2xl p-4 bg-white shadow-2xs">
                  <div className="flex items-start space-x-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B00] font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-bold text-neutral-900 leading-snug">{q.question}</p>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      const showFeedback = quizSubmitted;

                      let style = 'border-neutral-200 hover:bg-neutral-50 text-neutral-700';
                      if (isSelected) {
                        style = 'border-[#FF6B00] bg-orange-50/50 text-[#FF6B00] font-medium';
                      }
                      if (showFeedback) {
                        if (isCorrect) {
                          style = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          style = 'border-rose-400 bg-rose-50 text-rose-800';
                        }
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => {
                            if (!quizSubmitted) {
                              setQuizAnswers({ ...quizAnswers, [q.id]: optIdx });
                            }
                          }}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${style}`}
                        >
                          <span>{opt}</span>
                          {showFeedback && isCorrect && (
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit / Reward Button */}
            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                className="w-full py-3.5 bg-[#FF6B00] text-white rounded-xl font-bold text-sm hover:bg-[#E05E00] shadow-md shadow-orange-500/20 cursor-pointer"
              >
                提交答卷並領取獎勵
              </button>
            ) : (
              <div className="space-y-2">
                {!rewardClaimed ? (
                  <button
                    onClick={() => {
                      setRewardClaimed(true);
                      onToast('🎉 5 USDT 安全福利金已存入您的錢包資產！');
                    }}
                    className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Award size={18} />
                    <span>領取 5 USDT 抵扣券</span>
                  </button>
                ) : (
                  <div className="w-full py-3 bg-neutral-100 text-neutral-500 rounded-xl text-center text-xs font-bold">
                    ✓ 已成功領取獎勵
                  </div>
                )}
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="w-full py-2.5 text-neutral-500 text-xs font-semibold hover:underline"
                >
                  重新挑戰測試
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OFFICIAL VERIFICATION TOOL */}
        {activeTab === 'verify' && (
          <div className="space-y-4">
            <div className="border border-neutral-200/90 rounded-2xl p-4 bg-white shadow-2xs">
              <div className="flex items-center space-x-2 mb-2">
                <Search size={18} className="text-[#FF6B00]" />
                <h4 className="text-sm font-bold text-neutral-900">官方通道一鍵驗證</h4>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                遇到自稱 BYBIT 官方的工作人員或外部網址？請在此輸入 Telegram 賬號、郵箱或網址進行防偽核實。
              </p>

              <div className="space-y-3">
                <input
                  type="text"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  placeholder="輸入網址 / TG用戶名 / 郵箱 (如 bybit.com)"
                  className="w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B00] text-neutral-800"
                />
                <button
                  onClick={handleVerifyCheck}
                  className="w-full py-3 bg-[#FF6B00] text-white rounded-xl font-bold text-xs hover:bg-[#E05E00] cursor-pointer"
                >
                  立即核驗
                </button>
              </div>

              {verifyResult.status !== 'none' && (
                <div
                  className={`mt-4 p-3.5 rounded-xl text-xs leading-relaxed ${
                    verifyResult.status === 'official'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {verifyResult.message}
                </div>
              )}
            </div>

            {/* Official Channels Reference */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs text-xs space-y-2.5">
              <span className="font-bold text-neutral-800 block text-sm">認準以下官方主通道：</span>
              <div className="space-y-2 text-neutral-600 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>官方網址：</span>
                  <span className="font-mono font-bold text-neutral-900">https://www.bybit.com</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>官方郵箱：</span>
                  <span className="font-mono text-neutral-900">support@bybit.com</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>官方 TG 頻道：</span>
                  <span className="font-mono text-neutral-900">@Bybit_Official</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
