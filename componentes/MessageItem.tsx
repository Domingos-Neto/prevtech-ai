
import React from 'react';
import { Message, Role } from '../types';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isAssistant = message.role === Role.ASSISTANT;

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex max-w-[92%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center shadow-sm text-sm ${
          isAssistant ? 'bg-[#0d47a1] text-white mr-2' : 'bg-slate-200 text-slate-600 ml-2'
        }`}>
          <i className={`ri-${isAssistant ? 'robot-2-line' : 'user-3-line'}`}></i>
        </div>
        
        <div className={`p-3.5 rounded-2xl shadow-sm border ${
          isAssistant 
            ? 'bg-white text-slate-800 border-slate-100 rounded-tl-none' 
            : 'bg-[#0d47a1] text-white border-[#0d47a1] rounded-tr-none'
        }`}>
          <div className="text-[12px] whitespace-pre-wrap leading-relaxed font-medium">
            {message.content}
          </div>
          <div className={`text-[8px] mt-2 font-bold uppercase tracking-wider opacity-60 ${isAssistant ? 'text-slate-400' : 'text-white/70'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
