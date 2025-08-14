import { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";

// const mockBotResponses = [
//     "Thanks for asking! I'm a full-stack developer passionate about creating amazing user experiences.",
//     "I'd love to tell you more about my projects! I've worked with React, Node.js, Python, and many other technologies.",
//     "That's a great question! I have experience in web development, mobile apps, and cloud architecture.",
//     "I'm always excited to discuss new opportunities and collaborations!",
//     "Feel free to check out my GitHub or connect with me on LinkedIn for more details.",
//     "I specialize in building scalable applications with modern frameworks and best practices."
// ];

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [started, setStarted] = useState(false);
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
    setInput("");
    setIsThinking(true);

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMsg.text })
        });

        const data = await res.json();

        const botMsg = {
            text: data.reply || "(No response from AI)",
            sender: "bot",
            timestamp: Date.now(),
            id: Date.now() + 1
        };
        setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
        console.error("Error talking to API:", error);
        setMessages((prev) => [...prev, {
            text: "Sorry, I had trouble responding. Please try again.",
            sender: "bot",
            timestamp: Date.now(),
            id: Date.now() + 1
        }]);
    } finally {
        setIsThinking(false);
    }
};


    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            {/* Header */}
            <div className="relative z-10 px-4 py-3 border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <Bot size={16} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium text-sm">Portfolio Assistant</h3>
                        <p className="text-xs text-slate-400">Ask me about Zee's work and experience</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-400">Online</span>
                    </div>
                </div>
            </div>

            {/* Welcome screen */}
            {!started && (
                <div className="flex flex-col items-center justify-center flex-1 p-8 relative z-10">
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <Bot size={32} className="text-white" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Welcome to my Portfolio Chat
                        </h2>
                        <p className="text-slate-400 text-sm max-w-md">
                            I'm here to answer questions about my skills, projects, and experience. Feel free to ask me anything!
                        </p>
                    </div>
                    
                    {/* Suggested questions */}
                    <div className="w-full max-w-md mb-6">
                        <p className="text-xs text-slate-500 mb-3 text-center">Try asking:</p>
                        <div className="grid gap-2">
                            {[
                                "What technologies do you work with?",
                                "Tell me about your projects",
                                "What's your experience with React?"
                            ].map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(suggestion)}
                                    className="text-left p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-xs text-slate-300 transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input area */}
                    <div className="flex items-center space-x-3 w-full max-w-md">
                        <div className="flex-1 relative">
                            <input
                                className="w-full bg-slate-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 pr-12 outline-none text-sm border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                placeholder="Type your question..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isThinking}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
                                    input.trim() && !isThinking
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25"
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
                            <div
                                key={msg.id}
                                className={`flex items-start space-x-3 animate-slide-up ${
                                    msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                                }`}
                            >
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    msg.sender === "user" 
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                                        : "bg-gradient-to-r from-blue-500 to-purple-600"
                                }`}>
                                    {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                                </div>

                                {/* Message bubble */}
                                <div className={`max-w-[75%] ${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col`}>
                                    <div
                                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                                            msg.sender === "user"
                                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
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
                        ))}

                        {/* Thinking indicator */}
                        {isThinking && (
                            <div className="flex items-start space-x-3 animate-slide-up">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-slate-800/80 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md max-w-[75%] border border-slate-700/30">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="p-4 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm relative z-10">
                        <div className="flex items-end space-x-3">
                            <div className="flex-1 relative">
                                <input
                                    className="w-full bg-slate-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 pr-12 outline-none text-sm border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
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
            `}</style>
        </div>
    );
}