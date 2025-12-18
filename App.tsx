
import React, { useState, useRef, useEffect } from 'react';
import { Message, Role, ChatState } from './types';
import { geminiService } from './services/geminiService';
import MessageItem from './components/MessageItem';
import IntegrationModal from './components/IntegrationModal';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: 'welcome',
        role: Role.ASSISTANT,
        content: 'Olá! Sou a Assistente Virtual do PREVTECH. Como posso te ajudar com cálculos, checklists ou dúvidas sobre a legislação previdenciária de Itapipoca hoje?',
        timestamp: new Date()
      }
    ],
    isLoading: false,
    error: null
  });
  const [inputValue, setInputValue] = useState('');
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [chatState.messages, chatState.isLoading, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || chatState.isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: inputValue,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));
    setInputValue('');

    try {
      const responseText = await geminiService.chat(chatState.messages, userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.ASSISTANT,
        content: responseText,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (err) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Conexão interrompida.'
      }));
    }
  };

  return (
    <div className="antialiased">
      <IntegrationModal 
        isOpen={isIntegrationModalOpen} 
        onClose={() => setIsIntegrationModalOpen(false)} 
      />

      {/* Botão Flutuante (Bubble) - Ajustado para ficar acima do seu WhatsApp original */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-[185px] right-6 h-14 w-14 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 z-[9999] group ${
          isOpen ? 'bg-[#0d47a1] rotate-90' : 'bg-[#0d47a1] hover:scale-110 active:scale-95'
        }`}
      >
        {isOpen ? (
          <i className="ri-close-line text-white text-2xl"></i>
        ) : (
          <div className="relative">
            <i className="ri-robot-2-fill text-white text-2xl"></i>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#0d47a1] rounded-full animate-pulse"></span>
            
            {/* Tag flutuante de ajuda */}
            <div className="absolute right-full mr-4 bg-slate-800 text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-widest shadow-xl">
               IA PREVTECH
            </div>
          </div>
        )}
      </button>

      {/* Janela do Chat */}
      <div className={`fixed bottom-[250px] right-6 w-[90vw] md:w-[380px] h-[75vh] max-h-[580px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-[9998] border border-slate-100 ${
        isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'
      }`}>
        
        {/* Header - Seguindo o azul escuro do seu sistema */}
        <header className="bg-[#0d47a1] p-5 flex items-center justify-between text-white shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl border border-white/5">
              <i className="ri-shield-flash-fill text-white text-lg"></i>
            </div>
            <div>
              <h1 className="font-bold text-xs tracking-[2px] uppercase">PREVTECH AI</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-[9px] font-bold opacity-70 uppercase tracking-tighter">Consultoria Técnica Ativa</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsIntegrationModalOpen(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <i className="ri-code-s-line text-sm"></i>
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <i className="ri-subtract-line text-sm"></i>
            </button>
          </div>
        </header>

        {/* Mensagens */}
        <main 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fcfdfe] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"
        >
          {chatState.messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
          
          {chatState.isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-slate-100 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#0d47a1] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#0d47a1] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#0d47a1] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}

          {chatState.error && (
            <div className="m-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] text-center font-bold">
              <i className="ri-error-warning-line mr-1.5"></i>
              {chatState.error}
            </div>
          )}
        </main>

        {/* Sugestões e Input */}
        <footer className="p-4 bg-white border-t border-slate-100">
          {!chatState.isLoading && chatState.messages.length < 3 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Regras EC 103/19", "Cálculo Média", "Checklist Pensão"].map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => setInputValue(s)}
                  className="text-[10px] bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#0d47a1] px-3 py-1.5 rounded-lg transition-all border border-slate-200 hover:border-blue-200 font-bold uppercase tracking-tight"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Descreva sua dúvida técnica..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-4 focus:ring-blue-500/5 focus:border-[#0d47a1] outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || chatState.isLoading}
              className="h-11 w-11 bg-[#0d47a1] text-white rounded-xl flex items-center justify-center disabled:opacity-30 disabled:grayscale transition-all hover:bg-[#0a3d8a] shadow-lg shadow-blue-900/10 active:scale-90"
            >
              <i className="ri-send-plane-2-fill text-lg"></i>
            </button>
          </form>
          <div className="flex justify-between items-center mt-4 px-1">
             <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">v4.2 PREVTECH</span>
             <span className="text-[9px] text-slate-300">© 2025 Suporte IA</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
