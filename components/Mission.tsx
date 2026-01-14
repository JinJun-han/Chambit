
import React from 'react';

const Mission: React.FC = () => {
  return (
    <section id="mission" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200" 
                alt="Shipyard Worker" 
                className="rounded-3xl shadow-2xl z-10 relative object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-100 rounded-3xl -z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-orange-500 rounded-full -z-0 opacity-20"></div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Our Heart & Mission</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              당신의 성장이<br />
              참빛의 기쁨입니다.
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              참빛힐링센터는 거제 한화오션의 심장부에서 땀 흘리는 해외 근로자들을 위해 설립되었습니다. 
              단순한 체류 지원을 넘어, 한국 사회의 당당한 일원으로 성장하고 꿈을 이룰 수 있도록 
              진심 어린 사랑으로 함께합니다.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start space-x-3">
                <div className="mt-1 bg-orange-100 p-1 rounded-full text-orange-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-slate-700 font-medium">따뜻한 정이 넘치는 제2의 고향</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 bg-orange-100 p-1 rounded-full text-orange-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-slate-700 font-medium">전문적인 교육을 통한 커리어 업그레이드</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 bg-orange-100 p-1 rounded-full text-orange-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-slate-700 font-medium">가족과 함께하는 안정적인 한국 생활</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
