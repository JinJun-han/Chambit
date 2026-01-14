
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

interface LearningApp {
  lang: string;
  url: string;
  flag: string;
  nativePhrase: string;
}

interface ServiceDetail {
  title: string;
  description: string;
  icon: string;
  color: string;
  fullDetails: string;
  schedule: string;
  benefit: string;
  buttonLabel?: string;
  learningApps?: LearningApp[];
}

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const services: ServiceDetail[] = [
    {
      title: "한국어 교육",
      description: "기초 생활 한국어부터 비즈니스 한국어까지, 소통의 장벽을 허뭅니다.",
      icon: "🗣️",
      color: "bg-blue-50",
      fullDetails: "참빛힐링센터의 한국어 교육은 현장에서 바로 사용할 수 있는 실용 회화 위주로 구성되어 있습니다. 특히 국가별 맞춤형 온라인 학습 앱을 통해 언제 어디서나 복습할 수 있는 환경을 제공합니다.",
      schedule: "매주 토/일 오후 2시 - 4시",
      benefit: "교재 무상 제공 및 우수 수강생 장학금 지급",
      buttonLabel: "수업 신청하기",
      learningApps: [
        { lang: "스리랑카어", flag: "🇱🇰", url: "https://glocalbridge-lk.netlify.app/", nativePhrase: "සිංහලෙන් කොරියානු භාෂාව ඉගෙන ගනිමු!" },
        { lang: "베트남어", flag: "🇻🇳", url: "https://glocalbridge-vn.netlify.app/", nativePhrase: "Hãy cùng học tiếng Hàn bằng tiếng Việt!" },
        { lang: "네팔어", flag: "🇳🇵", url: "https://glocalbridge-np.netlify.app/", nativePhrase: "नेपाली마 कोरियन भाषा सिकौं!" },
        { lang: "태국어", flag: "🇹🇭", url: "https://glocalbridge-thai01.netlify.app/", nativePhrase: "มาเรียนภาษาเกาหลีเป็นภาษาไทยกันเถอะ!" },
      ]
    },
    {
      title: "기술 전문성 강화",
      description: "용접, 도장 등 조선업 핵심 기술 교육을 통해 숙련된 전문가로 육성합니다.",
      icon: "🏗️",
      color: "bg-orange-50",
      fullDetails: "한화오션 현장 전문가들이 직접 전수하는 기술 교육입니다. 단순 노동을 넘어 고숙련 기능공(E-7 비자 전환 대상)으로 성장할 수 있도록 용접(CO2, TIG), 도장, 의장 기술 실습을 지원하며, 현장 실무 위주의 멘토링을 제공합니다.",
      schedule: "평일 퇴근 후 및 주말 집중 교육",
      benefit: "기술 자격증 취득 지원 및 진급 가점 상담",
      buttonLabel: "기술 상담 예약"
    },
    {
      title: "진로 및 심리 상담",
      description: "불안한 마음을 어루만지고 미래를 함께 설계하는 1:1 맞춤 상담입니다.",
      icon: "❤️",
      color: "bg-rose-50",
      fullDetails: "타국 생활에서 오는 외로움과 직무 스트레스를 전문 상담사가 함께 나눕니다. 모국어 통역 지원을 통해 마음의 짐을 덜어드리고, 비자 변경 및 정착을 위한 장기적인 커리어 로드맵을 함께 설계합니다.",
      schedule: "상시 예약제 운영",
      benefit: "무료 심리 검사 및 명상 프로그램 연계",
      buttonLabel: "1:1 상담 예약"
    },
    {
      title: "비자 및 행정 지원",
      description: "가족 초청 비자, 영주권 준비 등 복잡한 행정 절차를 완벽히 지원합니다.",
      icon: "📄",
      color: "bg-emerald-50",
      fullDetails: "출입국 관리법 전문가와 연계하여 비자 연장, 체류 자격 변경(E-9에서 E-7), 가족 초청 서류 준비를 꼼꼼하게 도와드립니다. 개별 상황에 맞는 최적의 행정 솔루션을 제공하여 법적 안정을 돕습니다.",
      schedule: "매주 수요일 행정 집중 상담일",
      benefit: "비자 신청 로드맵 설계 및 서류 검토",
      buttonLabel: "비자 행정 예약"
    },
    {
      title: "문화 적응 프로그램",
      description: "한국 문화 체험과 공동체 활동을 통해 소속감을 높입니다.",
      icon: "🎨",
      color: "bg-purple-50",
      fullDetails: "거제도 명소 탐방, 한국 전통 요리 교실, 명절 행사 등을 통해 한국 사회를 더 깊이 이해하고 즐거운 추억을 만듭니다. 다양한 국적의 동료들과 어울리며 문화적 차이를 좁히고 소속감을 강화합니다.",
      schedule: "월 1회 정기 행사",
      benefit: "가족 동반 참여 가능 및 기념품 증정",
      buttonLabel: "행사 일정 보기"
    },
    {
      title: "생활 밀착형 동행",
      description: "장보기, 시장 투어, 영화 관람 등 실제 한국 생활을 함께 경험합니다.",
      icon: "🤝",
      color: "bg-amber-50",
      fullDetails: "단순한 지식 전달이 아닌 현장에 함께합니다. 고현 시장 장보기, 은행 및 병원 이용법 배우기, 주말 영화 관람 등 실제 삶에 필요한 모든 과정을 센터 스태프가 친구처럼 함께하며 한국 생활 노하우를 공유합니다.",
      schedule: "매주 주말 테마별 운영",
      benefit: "현지 적응 헬퍼 지정 및 생활 바우처 제공",
      buttonLabel: "동행 프로그램 신청"
    }
  ];

  const playNativeTTS = async (app: LearningApp) => {
    if (isAudioLoading) return;
    setIsAudioLoading(app.lang);

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const voiceName = app.lang.includes("한국어") ? 'Kore' : 'Zephyr';

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: app.nativePhrase }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } } },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsAudioLoading(null);
        source.start();
      } else { setIsAudioLoading(null); }
    } catch { setIsAudioLoading(null); }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Premium Support</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            삶의 질을 높이는<br />차별화된 지원
          </h3>
          <p className="text-slate-600 text-lg">
            단순한 도움이 아닌, 여러분의 인생이 '업그레이드' 될 수 있도록<br />
            분야별 전문가들이 밀착 케어 서비스를 제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group hover:-translate-y-3 cursor-pointer duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setSelectedService(service)}
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                {service.icon}
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex items-center text-orange-500 font-bold group-hover:translate-x-2 transition-transform">
                상세 정보 보기
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto" onClick={() => setSelectedService(null)}>
          <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 my-8" onClick={(e) => e.stopPropagation()}>
            <div className={`p-10 ${selectedService.color} flex justify-between items-center`}>
              <div className="flex items-center space-x-5">
                <div className="text-5xl drop-shadow-lg">{selectedService.icon}</div>
                <div>
                  <h4 className="text-3xl font-bold text-slate-900">{selectedService.title}</h4>
                  <p className="text-slate-600 font-medium">참빛 맞춤 프로그램</p>
                </div>
              </div>
              <button onClick={() => setSelectedService(null)} className="bg-white/50 hover:bg-white p-2.5 rounded-full transition-all">
                <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div>
                <h5 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-3">상세 소개</h5>
                <p className="text-slate-700 text-xl leading-relaxed font-medium">{selectedService.fullDetails}</p>
              </div>
              
              {selectedService.learningApps && (
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h5 className="text-slate-900 font-bold mb-4 flex items-center"><span className="mr-2 text-xl">📱</span> 국가별 전용 학습 채널</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedService.learningApps.map((app, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex-grow flex items-center space-x-3 bg-white p-3.5 rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all group">
                          <span className="text-2xl">{app.flag}</span>
                          <span className="text-sm font-bold text-slate-700">{app.lang}</span>
                        </a>
                        <button onClick={() => playNativeTTS(app)} className={`p-3.5 rounded-xl border transition-all ${isAudioLoading === app.lang ? 'bg-orange-500 text-white animate-pulse' : 'bg-white text-orange-500 hover:border-orange-500'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h6 className="text-slate-900 font-bold mb-2">📅 운영 정보</h6>
                  <p className="text-slate-600">{selectedService.schedule}</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <h6 className="text-slate-900 font-bold mb-2">🎁 참여 혜택</h6>
                  <p className="text-slate-600">{selectedService.benefit}</p>
                </div>
              </div>
              
              <button 
                onClick={() => { setSelectedService(null); window.dispatchEvent(new CustomEvent('toggle-assistant')); }}
                className="w-full bg-slate-900 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center shadow-xl shadow-slate-900/20 active:scale-95"
              >
                {selectedService.buttonLabel || "상담 및 신청하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
