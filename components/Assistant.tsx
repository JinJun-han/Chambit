
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

type Language = 'KO' | 'EN';

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

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('KO');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; id: string }[]>([
    { 
      id: 'init',
      role: 'ai', 
      text: '안녕하세요! 참빛힐링센터 AI 가이드입니다. 무엇을 도와드릴까요?\n\nHello! I am your Chambit Healing Center AI Guide. How can I help you today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen(true);
    window.addEventListener('toggle-assistant', handleToggle);
    return () => window.removeEventListener('toggle-assistant', handleToggle);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { role: 'user', text: textToSend, id: userMsgId }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: textToSend,
        config: {
          systemInstruction: `당신은 한화오션 참빛힐링센터 AI 상담사입니다. ${lang === 'KO' ? '한국어' : '영어'}로 친절하게 답변하세요.`,
        },
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "...", id: (Date.now() + 1).toString() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to service.", id: "err" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const playTTS = async (text: string, messageId: string) => {
    if (isPlaying === messageId) return;
    setIsPlaying(messageId);
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsPlaying(null);
        source.start();
      } else { setIsPlaying(null); }
    } catch { setIsPlaying(null); }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <div className={`bg-white w-[350px] md:w-[450px] h-[650px] shadow-2xl rounded-[2.5rem] border border-orange-100 flex flex-col overflow-hidden transition-all duration-500 transform origin-bottom-right mb-4 ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-20 pointer-events-none'}`}>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white flex justify-between items-center shadow-lg relative shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">✨</div>
            <h4 className="font-bold">참빛 AI 헬퍼</h4>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
        <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/50">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`group relative max-w-[85%] p-4 rounded-3xl shadow-sm text-sm ${m.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-orange-50 rounded-tl-none'}`}>
                {m.text}
                {m.role === 'ai' && (
                  <button onClick={() => playTTS(m.text, m.id)} className={`absolute -right-10 bottom-0 p-2 bg-white border border-orange-100 rounded-full shadow-sm text-orange-500 ${isPlaying === m.id ? 'animate-pulse' : 'opacity-0 group-hover:opacity-100'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-6 bg-white border-t shrink-0">
          <div className="relative flex items-center">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="메시지를 입력하세요..." className="w-full bg-slate-50 border rounded-2xl px-5 py-4 focus:outline-none" />
            <button onClick={() => handleSend()} className="absolute right-2 bg-orange-500 text-white p-2.5 rounded-xl hover:bg-orange-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="bg-orange-500 w-20 h-20 rounded-[2rem] shadow-2xl flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-all relative z-10 border-4 border-white">
        {isOpen ? <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg> : <span>💬</span>}
      </button>
    </div>
  );
};

export default Assistant;
