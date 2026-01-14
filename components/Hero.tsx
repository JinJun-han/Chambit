
import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 마우스 위치를 -1에서 1 사이의 값으로 정규화
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 패럴랙스 계산: 마우스 반대 방향으로 미세하게 이동
  const bgTransform = `scale(1.1) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`;
  const contentTransform = `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000" 
          alt="Diverse community of happy workers" 
          className="w-full h-full object-cover transition-transform duration-1000 ease-out"
          style={{ transform: bgTransform }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-900/80"></div>
      </div>

      {/* Floating Light Particles (동적인 빛의 입자들) */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/10 rounded-full blur-[80px] animate-float"></div>
      </div>

      <div 
        className="container mx-auto px-6 relative z-10 transition-transform duration-700 ease-out"
        style={{ transform: contentTransform }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* 1. 상단 라벨 - 순차 등장 */}
          <div className="inline-block px-5 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm animate-reveal-top">
            <p className="text-orange-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">
              True Light Healing Center
            </p>
          </div>
          
          {/* 2. 메인 타이틀 - 순차 등장 */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] animate-reveal-mid">
            참빛힐링센터
          </h1>
          
          {/* 3. 슬로건 - 순차 등장 */}
          <div className="max-w-2xl mx-auto mb-12 animate-reveal-bottom">
            <p className="text-lg md:text-2xl text-white/95 font-light leading-snug drop-shadow-md">
              거제 한화오션 근로자들의 
              <span className="block mt-3 md:inline md:ml-2">
                <span className="relative inline-block font-semibold group">
                  <span className="relative z-10 text-orange-400">따뜻한 고향</span>
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-orange-500/30 -rotate-1 group-hover:h-3 transition-all"></span>
                </span>
                이자 <span className="text-orange-400 font-semibold">빛</span>이 되는 곳
              </span>
            </p>
          </div>
          
          {/* 4. 버튼 그룹 - 순차 등장 */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 animate-reveal-buttons">
            <a 
              href="#services" 
              className="group w-full sm:w-auto px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg transition-all hover:bg-orange-600 shadow-lg hover:shadow-orange-500/40 hover:-translate-y-1 flex items-center justify-center"
            >
              시작하기
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="#mission" 
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg transition-all hover:bg-white hover:text-slate-900 shadow-md"
            >
              센터 소개
            </a>
          </div>
        </div>
      </div>

      {/* 하단 스크롤 인디케이터 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-40">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white via-white/50 to-transparent relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, 40px); }
        }
        .animate-float { animation: float 10s infinite ease-in-out; }
        .animate-float-slow { animation: float-slow 15s infinite ease-in-out; }
        .animate-float-delayed { animation: float 12s infinite ease-in-out 2s; }

        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-reveal-top { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-reveal-mid { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .animate-reveal-bottom { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
        .animate-reveal-buttons { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards; opacity: 0; }

        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }
      `}} />
    </section>
  );
};

export default Hero;
