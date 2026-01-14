
import React, { useState } from 'react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: '센터소개', href: '#mission' },
    { name: '지원프로그램', href: '#services' },
    { name: '커뮤니티', href: '#community' },
    { name: '유용한정보', href: '#useful-links' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-3 group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isScrolled ? 'bg-orange-500' : 'bg-white'}`}>
            <span className={`font-bold text-sm ${isScrolled ? 'text-white' : 'text-orange-500'}`}>참</span>
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            참빛힐링센터
          </span>
        </a>
        
        <div className="hidden md:flex space-x-10 items-center">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className={`text-sm font-semibold tracking-wide transition-all hover:text-orange-500 ${isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'}`}
            >
              {item.name}
            </a>
          ))}
          <a href="#contact" className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
            isScrolled 
              ? 'bg-slate-900 text-white hover:bg-orange-500' 
              : 'bg-white/20 text-white border border-white/30 backdrop-blur-md hover:bg-white hover:text-slate-900'
          }`}>
            문의하기
          </a>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'}`}>
        <div className="flex flex-col p-8 space-y-6">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-slate-800 font-bold text-xl hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-orange-500 text-white text-center py-4 rounded-2xl font-bold text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            문의하기
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
