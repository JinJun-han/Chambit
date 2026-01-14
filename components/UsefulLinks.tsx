
import React from 'react';

const UsefulLinks: React.FC = () => {
  const linkCategories = [
    {
      title: "한국어 & 교육",
      icon: "📚",
      links: [
        { name: "세종학당 재단", url: "https://www.iksi.or.kr/" },
        { name: "사회통합정보망 (KIIP)", url: "https://www.socinet.go.kr/" },
        { name: "에듀넷 (자녀 교육 정보)", url: "https://www.edunet.net/" }
      ]
    },
    {
      title: "비자 & 법률",
      icon: "⚖️",
      links: [
        { name: "하이코리아 (비자/체류)", url: "https://www.hikorea.go.kr/" },
        { name: "대한법률구조공단", url: "https://www.klac.or.kr/" },
        { name: "외국인종합안내센터 (1345)", url: "https://www.hikorea.go.kr/info/InfoCounselListR.pt" }
      ]
    },
    {
      title: "행정 & 생활",
      icon: "🏠",
      links: [
        { name: "정부24 (민원 서류)", url: "https://www.gov.kr/" },
        { name: "다누리 (다문화지원)", url: "https://www.liveinkorea.kr/" },
        { name: "중앙다문화교육센터", url: "https://www.nime.or.kr/" }
      ]
    },
    {
      title: "의료 & 긴급",
      icon: "🚑",
      links: [
        { name: "건강보험공단 (외국인)", url: "https://www.nhis.or.kr/" },
        { name: "긴급전화 119/112", url: "#" },
        { name: "거제시 보건소", url: "https://www.geoje.go.kr/health/index.geoje" }
      ]
    }
  ];

  const handleOpenAssistant = () => {
    // Assistant 컴포넌트에게 열림 신호를 보내는 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('toggle-assistant'));
  };

  return (
    <section id="useful-links" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Smart Resources</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            한국 생활의 힘이 되는<br />유용한 사이트
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            비자, 법률, 교육 등 궁금한 정보를 한곳에서 확인하세요.<br />
            아래 링크들은 공신력 있는 기관에서 제공하는 서비스입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {linkCategories.map((cat, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 origin-left">{cat.icon}</div>
              <h4 className="text-xl font-bold text-slate-900 mb-6">{cat.title}</h4>
              <ul className="space-y-4">
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-orange-500 font-medium flex items-center group/item"
                    >
                      <span className="w-1.5 h-1.5 bg-orange-300 rounded-full mr-3 group-hover/item:scale-150 transition-transform"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-orange-600 p-1 md:p-1.5 rounded-[3rem] shadow-2xl shadow-orange-500/30">
          <div className="bg-white p-8 md:p-12 rounded-[2.8rem] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-4xl shadow-inner">🤖</div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">원하는 정보를 찾기 어려우신가요?</h4>
                <p className="text-slate-600">참빛 AI 헬퍼가 24시간 여러분의 질문에 답변해 드립니다.</p>
              </div>
            </div>
            <button 
              onClick={handleOpenAssistant}
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              AI 헬퍼 열기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsefulLinks;
