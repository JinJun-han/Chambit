
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">참</span>
              </div>
              <span className="text-2xl font-bold text-white">참빛힐링센터</span>
            </div>
            <p className="max-w-md leading-relaxed">
              거제 한화오션 해외근로자들의 든든한 동반자가 되어,<br /> 
              보다 나은 미래와 건강한 공동체를 만들어갑니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h5 className="text-white font-bold mb-6">메뉴</h5>
              <ul className="space-y-4">
                <li><a href="#mission" className="hover:text-orange-500 transition-colors">센터소개</a></li>
                <li><a href="#services" className="hover:text-orange-500 transition-colors">지원프로그램</a></li>
                <li><a href="#community" className="hover:text-orange-500 transition-colors">커뮤니티</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">지원</h5>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-orange-500 transition-colors">심리상담예약</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">기술교육신청</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">비자상담</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>© 2024 참빛힐링센터. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
