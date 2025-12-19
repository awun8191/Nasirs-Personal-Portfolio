import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hi! I'm Dauda's AI Assistant. Ask me about his projects, skills, or availability.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const historyForApi = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await sendMessageToGemini(userMsg.text, historyForApi);
      const aiMsg: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      // handled internally
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-white dark:bg-gray-800 text-dark dark:text-white border border-gray-200 dark:border-gray-700' : 'bg-dark dark:bg-white text-white dark:text-dark'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 md:right-8 w-[90vw] md:w-[380px] h-[500px] bg-white dark:bg-gray-900 shadow-soft rounded-[2rem] z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 border border-gray-100 dark:border-gray-800">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-sage-100 dark:bg-sage-900 flex items-center justify-center text-dark dark:text-white">
               <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-dark dark:text-white font-bold text-sm">Assistant</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Online • Gemini 3 Flash</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sage-50 dark:bg-black/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 text-sm rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-dark dark:bg-white text-white dark:text-dark rounded-tr-none'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-sage-50 dark:bg-gray-800 border border-transparent focus:border-gray-200 dark:focus:border-gray-600 rounded-full py-3 px-5 pr-12 text-sm text-dark dark:text-white placeholder-gray-400 focus:outline-none transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-dark dark:bg-white rounded-full text-white dark:text-dark hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;