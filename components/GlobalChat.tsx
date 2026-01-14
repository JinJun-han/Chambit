
import React from 'react';

const GlobalChat: React.FC = () => {
  const chatRooms = [
    {
      country: "스리랑카 (Sri Lanka)",
      url: "https://open.kakao.com/o/gKqGvs9h",
      flag: "🇱🇰",
      color: "from-yellow-500 to-orange-600"
    },
    {
      country: "캄보디아 (Cambodia)",
      url: "https://open.kakao.com/o/gMYp0t9h",
      flag: "🇰🇭",
      color: "from-blue-600 to-red-600"
    },
    {
      country: "미얀마 (Myanmar)",
      url: "https://open.kakao.com/o/gDWQ8F9h",
      flag: "🇲🇲",
      color: "from-yellow-400 to-green-600"
    },
    {
      country: "네팔 (Nepal)",
      url: "https://open.kakao.com/o/gOyLtG9h",
      flag: "🇳🇵",
      color: "from-red-500 to-blue-700"
    }
  ];

  return (
    <section id="global-chat" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Connect Together</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            국가별 소통의 장,<br />오픈채팅방에 참여하세요
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            고국 동료들과 정보를 나누고 서로를 응원하는 참빛의 작은 마을입니다.<br />
            아래 버튼을 클릭하여 카카오톡 커뮤니티에 합류하세요.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chatRooms.map((room, index) => (
            <a 
              key={index}
              href={room.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${room.color} flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {room.flag}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{room.country}</h4>
              <p className="text-slate-500 text-sm mb-6">오픈채팅방 바로가기</p>
              
              <div className="mt-auto w-full py-3 bg-yellow-400 text-slate-900 font-bold rounded-2xl flex items-center justify-center space-x-2 group-hover:bg-yellow-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.553 1.706 4.8 4.315 6.094l-.821 3.01c-.053.193.175.36.335.251l3.54-2.394c.52.072 1.054.11 1.631.11 4.97 0 9-3.186 9-7.116S16.97 3 12 3z"/>
                </svg>
                <span>참여하기</span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm italic">
            * 카카오톡 오픈채팅방은 24시간 열려 있습니다. 매너 있는 소통 부탁드립니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GlobalChat;
