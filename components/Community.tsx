
import React from 'react';

const Community: React.FC = () => {
  /**
   * [갤러리 사진 교체 안내]
   * 실제 현장 사진으로 교체하려면 아래 'src'의 URL을 변경하세요.
   */
  const images = [
    { 
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600",
      caption: "함께 배우는 한국어 교실"
    },
    { 
      src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", 
      caption: "기술 전수 멘토링 현장"
    },
    { 
      src: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=600",
      caption: "거제 지역 사회 봉사 활동"
    },
    { 
      src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600",
      caption: "동료들과 함께하는 소통 시간"
    }
  ];

  return (
    <section id="community" className="py-24 bg-white scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Heartwarming Moments</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              함께 웃고 함께 성장하는<br />우리들의 이야기
            </h3>
          </div>
          <button className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-orange-500 hover:border-orange-500 transition-colors">
            전체 갤러리 보기
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {images.map((item, i) => (
            <div key={i} className={`relative overflow-hidden rounded-3xl group ${i % 2 === 1 ? 'md:mt-12' : ''}`}>
              <img 
                src={item.src} 
                alt={`Community ${i}`} 
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <p className="text-white font-bold text-lg">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-slate-900 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-2xl">
                "
              </div>
              <h4 className="text-white text-3xl font-bold mb-4 italic">
                "이곳은 단순한 센터가 아닌, 나의 한국 고향입니다."
              </h4>
              <p className="text-slate-400 font-medium">- 이수루 (스리랑카, 2년차 근로자)</p>
            </div>
            <div className="md:w-2/3 border-l border-white/10 md:pl-12">
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                처음 거제에 왔을 때 모든 것이 낯설고 두려웠습니다. 하지만 참빛힐링센터를 통해 한국어를 배우고, 시장에서 함께 장도 보며 이제는 한국이 참 편해졌습니다. 올해 가족들을 초대할 꿈을 꾸고 있습니다. 저희의 삶을 밝혀준 참빛의 사랑에 진심으로 감사합니다.
              </p>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Community;
