import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [started, setStarted] = useState(false);
    const [typingMessageId, setTypingMessageId] = useState(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
                behavior: "smooth",
                block: "end"
            });
        }
    };

    // Fixed typing effect hook - prevent multiple instances
    const useTypewriter = (text, speed = 30) => {
        const [displayText, setDisplayText] = useState("");
        const [isTyping, setIsTyping] = useState(false);

        useEffect(() => {
            if (!text) return;
            
            setIsTyping(true);
            setDisplayText("");
            let i = 0;
            
            const timer = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(text.slice(0, i + 1));
                    i++;
                } else {
                    setIsTyping(false);
                    clearInterval(timer);
                }
            }, speed);

            return () => clearInterval(timer);
        }, [text, speed]);

        return { displayText, isTyping };
    };

    // Typing Message Component
    const TypingMessage = ({ message }) => {
        const { displayText, isTyping } = useTypewriter(message.text, 25);
        
        useEffect(() => {
            if (!isTyping && message.id === typingMessageId) {
                setTypingMessageId(null);
            }
        }, [isTyping, message.id, typingMessageId]);

        return (
            <div className="flex items-start space-x-3 animate-slide-up">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                </div>
                <div className="max-w-[75%] flex flex-col items-start">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md text-sm leading-relaxed shadow-lg bg-slate-800/80 backdrop-blur-sm text-slate-100 border border-slate-700/30 relative">
                        {displayText}
                        {isTyping && (
                            <span className="inline-block w-0.5 h-4 bg-blue-400 ml-1 animate-pulse" />
                        )}
                        {isTyping && (
                            <div className="absolute -top-8 left-0 flex items-center space-x-1 px-2 py-1 bg-slate-700/80 rounded-md text-xs text-slate-300">
                                <Sparkles size={10} className="animate-spin" />
                                <span>AI is typing...</span>
                            </div>
                        )}
                    </div>
                    <span className="text-xs text-slate-500 mt-1 px-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        })}
                    </span>
                </div>
            </div>
        );
    };

    const sendMessage = async () => {
        if (!input.trim() || isThinking) return;

        if (!started) setStarted(true);

        const userMsg = { 
            text: input.trim(), 
            sender: "user", 
            timestamp: Date.now(),
            id: Date.now()
        };
        
        setMessages((prev) => [...prev, userMsg]);
        const currentInput = input.trim();
        setInput(""); // Clear input immediately after capturing the value
        setIsThinking(true);

        try {
            console.log("🚀 Sending to API:", currentInput);
            
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ 
                    message: currentInput
                })
            });

            console.log("📡 Response status:", res.status);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            console.log("✅ API Response:", data);

            // Check if this is a fallback response (API issues)
            if (data.fallback || data.error) {
                console.warn("⚠️ Received fallback/error response:", data);
            }

            const botMsg = {
                text: data.reply || "Hmm, seems like I'm having a quiet moment here in my virtual space. Could you try asking me something about Altyeb? I'd love to chat!",
                sender: "bot",
                timestamp: Date.now(),
                id: Date.now() + 1,
                isTyping: true
            };
            
            setMessages((prev) => [...prev, botMsg]);
            setTypingMessageId(botMsg.id);
            
        } catch (error) {
            console.error("💥 Error:", error);
            const errorMsg = {
                text: "Oops! Something went a bit haywire in my digital brain 🤖 *taps virtual screen* Could you try asking me again? I promise I'm usually much more helpful when discussing Altyeb's impressive work!",
                sender: "bot",
                timestamp: Date.now(),
                id: Date.now() + 1,
                isTyping: true
            };
            setMessages((prev) => [...prev, errorMsg]);
            setTypingMessageId(errorMsg.id);
        } finally {
            setIsThinking(false);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    // FIXED: Only trigger sendMessage on Enter key, not on every keystroke
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey && !isThinking) {
            e.preventDefault();
            sendMessage();
        }
    };

    // FIXED: Separate function for input changes to prevent triggering send
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const suggestedQuestions = [
        "Should I hire Altyeb?",
        "What are his strengths?", 
        "Tell me about his projects",
        "What's his experience with AI?",
        "How did he create this portfolio?",
        "What does he do in his free time?"
    ];

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        // Don't auto-send, let user click send button
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            {/* Enhanced background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            
            {/* Enhanced Header */}
            <div className="relative z-10 px-4 py-3 border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <Bot size={16} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium text-sm">Altyeb's AI Assistant</h3>
                        <p className="text-xs text-slate-400">Living in this virtual laptop on the 3D desk 💻</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-400">Online</span>
                    </div>
                </div>
            </div>

            {/* Enhanced Welcome screen */}
            {!started && (
                <div className="flex flex-col items-center justify-center flex-1 p-8 relative z-10">
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/25">
                            <Bot size={32} className="text-white" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Hey there! Welcome to my digital home 👋
                        </h2>
                        <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                            I'm the AI assistant trapped inside this virtual laptop (yes, really!). I'm here to tell you all about 
                            <span className="text-blue-400 font-medium"> Altyeb's skills, projects, and experience</span>. 
                            Ask me anything - I promise to be both helpful and entertaining! 🎭
                        </p>
                    </div>
                    
                    {/* Enhanced suggested questions */}
                    <div className="w-full max-w-md mb-6">
                        <p className="text-xs text-slate-500 mb-3 text-center flex items-center justify-center space-x-1">
                            <Sparkles size={12} />
                            <span>Popular questions to get started:</span>
                        </p>
                        <div className="grid gap-2">
                            {suggestedQuestions.slice(0, 3).map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-left p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-xs text-slate-300 transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50 hover:shadow-lg hover:shadow-blue-500/10"
                                >
                                    <span className="text-blue-400">💬</span> {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced input area */}
                    <div className="flex items-center space-x-3 w-full max-w-md">
                        <div className="flex-1 relative">
                            <input
                                className="w-full bg-slate-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 pr-12 outline-none text-sm border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-slate-500"
                                placeholder="Ask me about Altyeb... 🤔"
                                value={input}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isThinking}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
                                    input.trim() && !isThinking
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:scale-105"
                                        : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                                }`}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages area */}
            {started && (
                <>
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {messages.map((msg) => (
                            msg.sender === "bot" && msg.isTyping ? (
                                <TypingMessage key={msg.id} message={msg} />
                            ) : (
                                <div
                                    key={msg.id}
                                    className={`flex items-start space-x-3 animate-slide-up ${
                                        msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                                    }`}
                                >
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                                        msg.sender === "user" 
                                            ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/25" 
                                            : "bg-gradient-to-r from-blue-500 to-purple-600 shadow-blue-500/25"
                                    }`}>
                                        {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                                    </div>

                                    {/* Message bubble */}
                                    <div className={`max-w-[75%] ${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col`}>
                                        <div
                                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                                                msg.sender === "user"
                                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md shadow-blue-500/25"
                                                    : "bg-slate-800/80 backdrop-blur-sm text-slate-100 rounded-bl-md border border-slate-700/30"
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                        <span className="text-xs text-slate-500 mt-1 px-1">
                                            {new Date(msg.timestamp).toLocaleTimeString([], { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </span>
                                    </div>
                                </div>
                            )
                        ))}

                        {/* Enhanced thinking indicator */}
                        {isThinking && (
                            <div className="flex items-start space-x-3 animate-slide-up">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-slate-800/80 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md max-w-[75%] border border-slate-700/30 relative">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <div className="absolute -top-8 left-0 flex items-center space-x-1 px-2 py-1 bg-slate-700/80 rounded-md text-xs text-slate-300">
                                        <Sparkles size={10} className="animate-spin" />
                                        <span>Thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Enhanced input area */}
                    <div className="p-4 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm relative z-10">
                        <div className="flex items-end space-x-3">
                            <div className="flex-1 relative">
                                <input
                                    className="w-full bg-slate-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 pr-12 outline-none text-sm border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none placeholder-slate-500"
                                    placeholder="Continue the conversation... 💭"
                                    value={input}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    disabled={isThinking}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isThinking}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
                                        input.trim() && !isThinking
                                            ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:scale-105"
                                            : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                                    }`}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }

                /* Custom scrollbar */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 4px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: rgba(51, 65, 85, 0.3);
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.5);
                    border-radius: 2px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.7);
                }
            `}</style>
        </div>
    );
}