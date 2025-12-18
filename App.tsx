
import React, { useState, useRef, useEffect } from 'react';
import { Message, Role, ChatState } from './types';
import { geminiService } from './services/geminiService';
import MessageItem from './components/MessageItem';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: 'welcome',
        role: Role.ASSISTANT,
        content: 'Olá! Sou a Assistente Virtual do PREVTECH. Como posso te ajudar com as regras da EC 103/2019 ou com as ferramentas do sistema hoje?',
        timestamp: new Date()
      }
    ],
    isLoading: false,
    error: null
  });
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Notifica o sistema pai para redimensionar o iframe
  useEffect(() => {
    const message = isOpen ? 'prevtech-ai-open' : 'prevtech-ai-close';
    window.parent.postMessage(message, '*');
  }, [isOpen]);

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
    <div className="relative h-screen w-screen bg-transparent overflow-hidden flex flex-col items-end justify-end p-4">
      {/* Botão Flutuante (Bubble) - Ajustado para ficar ACIMA do WhatsApp (que costuma ser bottom-6) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-300 z-[9999] group mb-28 ${
          isOpen ? 'bg-[#0d47a1] rotate-90 scale-110' : 'bg-[#0d47a1] hover:scale-110 active:scale-95'
        }`}
      >
        {isOpen ? (
          <i className="ri-close-line text-white text-2xl"></i>
        ) : (
          <div className="relative">
            <i className="ri-robot-2-fill text-white text-2xl"></i>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#0d47a1] rounded-full animate-pulse"></span>
          </div>
        )}
        
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-slate-800 text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-widest">
             IA PREVTECH
          </div>
        )}
      </button>

      {/* Janela de Chat */}
      <div className={`absolute bottom-32 right-4 w-[90vw] md:w-[380px] h-[75vh] max-h-[580px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-[9998] border border-slate-100 ${
        isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'
      }`}>
        
        <header className="bg-[#0d47a1] p-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl">
              <i className="ri-shield-flash-fill text-white text-lg"></i>
            </div>
            <div>
              <h1 className="font-bold text-xs tracking-[2px] uppercase">PREVTECH AI</h1>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10">
            <i className="ri-subtract-line text-sm"></i>
          </button>
        </header>

        <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fcfdfe]">
          {chatState.messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
          {chatState.isLoading && (
            <div className="flex justify-start animate-pulse">
               <div className="bg-slate-100 w-12 h-8 rounded-xl"></div>
            </div>
          )}
        </main>

        <footer className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Sua dúvida aqui..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-[#0d47a1] outline-none"
            />
            <button type="submit" className="h-11 w-11 bg-[#0d47a1] text-white rounded-xl flex items-center justify-center">
              <i className="ri-send-plane-2-fill text-lg"></i>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default App;
