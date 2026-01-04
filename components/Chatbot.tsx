import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import { Send, User, Bot, Loader2, Camera, Paperclip, X } from 'lucide-react';

interface ChatbotProps {
  context: any;
}

const Chatbot: React.FC<ChatbotProps> = ({ context }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your TechCompare Concierge. How can I help you with your hardware decisions today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: ChatMessage = { role: 'user', text: input, image: selectedImage || undefined };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    try {
      let imagePart = undefined;
      if (selectedImage) {
        imagePart = {
          data: selectedImage.split(',')[1],
          mimeType: 'image/jpeg'
        };
      }
      
      const response = await getGeminiResponse(newMessages, context, imagePart);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I hit a technical snag. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-5 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-blue-600 rounded-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Gemini Concierge</h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Real-time Hardware Analysis
            </span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'}`}>
                {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'}`}>
                {m.image && (
                  <img src={m.image} alt="Uploaded" className="max-w-xs rounded-lg mb-3 border border-white/20" />
                )}
                <p className="text-base whitespace-pre-wrap leading-relaxed">{m.text}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                   <Bot size={20} />
                </div>
                <div className="bg-slate-800 p-4 rounded-2xl flex items-center gap-3 text-slate-400 border border-slate-700">
                   <Loader2 size={18} className="animate-spin" />
                   <span className="text-base">Synthesizing response...</span>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-5 bg-slate-900 border-t border-slate-800">
        {selectedImage && (
          <div className="relative inline-block mb-4">
            <img src={selectedImage} alt="Preview" className="h-24 w-24 object-cover rounded-lg border border-slate-700" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2.5 -right-2.5 bg-red-500 rounded-full p-1.5 shadow-lg"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <div className="flex gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-4 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <Camera size={24} />
          </button>
          <div className="flex-1 relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query the hardware matrix..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 px-5 text-base focus:outline-none focus:border-blue-500 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="absolute right-2.5 top-2 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-all"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;