import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { motion, AnimatePresence } from 'framer-motion';

// Define the Message type
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'Online' | 'Offline'>('Offline');
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || '/api';

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const checkBackendHealth = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${BACKEND_URL}/health`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      setBackendStatus(response.ok ? 'Online' : 'Offline');
    } catch {
      setBackendStatus('Offline');
    }
  };

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to get an answer from the AI.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error: any) {
      const errorMessage = error.message || 'Network error. Please make sure the backend is running.';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Sorry, I encountered an error: ${errorMessage}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-zinc-900 rounded-3xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-zinc-800 z-50 group hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-zinc-900 -mt-1 -mr-1 ${backendStatus === 'Online' ? 'bg-green-500' : 'bg-red-500'}`} />
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-100">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M8 10h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M16 10h.01"></path>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] md:w-[400px] z-50 flex flex-col"
          >
            <div className="bg-zinc-900/95 backdrop-blur-xl rounded-3xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden max-h-[80vh] min-h-[500px]">
              <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 shrink-0">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-zinc-100">Chatbot</h2>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${backendStatus === 'Online' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {backendStatus}
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-xl transition-colors text-zinc-400 hover:text-zinc-100 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 custom-scrollbar"
              >
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center mb-4 border border-zinc-700/50 shadow-inner">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <h3 className="text-zinc-100 font-semibold text-lg mb-2">Get to know me</h3>
                      <p className="text-zinc-500 text-sm max-w-[280px] leading-relaxed mx-auto">
                        Ask about my specific skills, professional experience, or previous projects.
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((m, i) => <ChatMessage key={i} role={m.role} content={m.content} />)
                )}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-zinc-800 rounded-2xl rounded-tl-none px-5 py-3.5 border border-zinc-700/50 shadow-sm">
                      <div className="flex gap-1.5 items-center h-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="shrink-0 bg-zinc-950/50 border-t border-zinc-800/50">
                <ChatInput onSend={handleSend} disabled={loading} isFirstTime={messages.length === 0} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
