
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-10 md:p-20">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Contact Us</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">
              언제든지 당신의 이야기를 들려주세요.
            </h3>
            
            <div className="space-y-8">
              <ContactItem 
                icon="📍" 
                title="위치" 
                content="경상남도 거제시 거제대로 (한화오션 인근 참빛힐링센터)" 
              />
              <ContactItem 
                icon="📞" 
                title="전화문의" 
                content="010-8006-6786" 
                subContent="상담 가능 시간: 09:00 - 20:00"
              />
              <ContactItem 
                icon="✉️" 
                title="이메일" 
                content="contact@chambit-healing.org" 
              />
            </div>

            <div className="mt-12 flex space-x-4">
              <SocialIcon color="bg-blue-600" label="Facebook" />
              <SocialIcon color="bg-pink-600" label="Instagram" />
              <SocialIcon color="bg-yellow-400" label="Kakao" />
            </div>
          </div>

          <div className="lg:w-1/2 relative min-h-[400px]">
            {/* Placeholder for map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.435422452414!2d128.706173!3d34.872589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568e6459341490b%3A0xc4870f9011116c22!2z7ZWc7ZmU7Jik7IWYIOqxsOygnumaqOyEoOqyvA!5e0!3m2!1sko!2skr!4v1716000000000!5m2!1sko!2skr" 
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem: React.FC<{ icon: string; title: string; content: string; subContent?: string }> = ({ icon, title, content, subContent }) => (
  <div className="flex items-start space-x-4">
    <div className="text-2xl mt-1">{icon}</div>
    <div>
      <div className="text-slate-400 text-sm font-bold uppercase tracking-wide mb-1">{title}</div>
      <div className="text-xl font-bold text-slate-900">{content}</div>
      {subContent && <div className="text-slate-500 text-sm mt-1">{subContent}</div>}
    </div>
  </div>
);

const SocialIcon: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className={`${color} w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity shadow-md`}>
    <span className="text-[10px] font-bold">{label}</span>
  </div>
);

export default Contact;
