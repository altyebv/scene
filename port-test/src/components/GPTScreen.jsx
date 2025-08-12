import { useState, useEffect, useRef } from "react";
import { FiMic, FiSend } from "react-icons/fi";
import gsap from "gsap";



// Thinking Animation Component
const ThinkingAnimation = () => {
    return (
        <div className="msg group w-full mb-6 flex justify-start">
            <div className="flex max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                    <style>
                        {`
                        @keyframes bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-4px); }
                        }
                        .dot-bounce {
                            animation: bounce 1s infinite;
                        }
                        `}
                    </style>
                    <div 
                        className="w-2 h-2 bg-gray-300 rounded-full dot-bounce" 
                        style={{ animationDelay: '0ms' }}
                    ></div>
                    <div 
                        className="w-2 h-2 bg-gray-300 rounded-full dot-bounce" 
                        style={{ animationDelay: '200ms' }}
                    ></div>
                    <div 
                        className="w-2 h-2 bg-gray-300 rounded-full dot-bounce" 
                        style={{ animationDelay: '400ms' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

// Sidebar Component
function Sidebar() {
    return (
        <div className="flex flex-col justify-between h-screen bg-[#101010] text-gray-400 w-[60px] relative">
            {/* Top Section */}
            <div className="flex flex-col items-center mt-6 gap-6">
                <div className="w-6 h-6 rounded bg-gray-700"></div>
                <div className="w-6 h-6 rounded bg-gray-700"></div>
                <div className="w-6 h-6 rounded bg-gray-700"></div>
            </div>

            {/* Bottom Profile */}
            <div className="flex justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#1A73E8] flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </div>
    );
}

function ChatScreen() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isThinking, setIsThinking] = useState(false);
    const [currentResponse, setCurrentResponse] = useState({ text: "", isComplete: true });
    const inputBarRef = useRef(null);
    const chatAreaRef = useRef(null);

    useEffect(() => {
        const simulateInitialMessage = async () => {
            const tl = gsap.timeline();

            // Initial delay before typing starts
            tl.to({}, { duration: 1.5 });

            // Typing simulation
            const fakeMsg = "Hey ChatGPT, can you help me Create an awesome portfolio ?";
            await new Promise((resolve) => {
                let i = 0;
                const typing = setInterval(() => {
                    setInput(fakeMsg.slice(0, i + 1));
                    i++;
                    if (i === fakeMsg.length) {
                        clearInterval(typing);
                        // After short delay, send message
                        setTimeout(() => {
                            sendMessage(fakeMsg);
                            resolve();
                        }, 500);
                    }
                }, 50);
            });
        };

        simulateInitialMessage();
    }, []);

    const typeResponse = (response, delay = 0) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setCurrentResponse({ text: "", isComplete: false });
                setMessages(prev => [...prev, { text: "", type: "bot" }]);
                
                let i = 0;
                const typing = setInterval(() => {
                    setCurrentResponse({
                        text: response.slice(0, i + 1),
                        isComplete: i === response.length - 1
                    });
                    i++;
                    if (i === response.length) {
                        clearInterval(typing);
                        setMessages(prev => [
                            ...prev.slice(0, -1),
                            { text: response, type: "bot" }
                        ]);
                        resolve();
                    }
                }, 30);
            }, delay);
        });
    };

    const sendMessage = async (msg) => {
        const tl = gsap.timeline();

        // Slide input bar to bottom
        tl.to(inputBarRef.current, {
            y: window.innerHeight / 2 - 60,
            duration: 0.6,
            ease: "power3.inOut",
        });

        // Add user message
        tl.call(() => {
            setMessages([{ text: msg, type: "user" }]);
            setInput("");
            setIsThinking(true);
        });

        // Show thinking animation and delay before first reply
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsThinking(false);
        
        // First response
        const response1 = "I'd be happy to help you create an awesome portfolio! Let's break this down step by step and create something that really showcases your skills and work.";
        await typeResponse(response1);

        // Second response with shorter delay
        const response2 = "First, let's consider what sections your portfolio should include: About Me, Projects, Skills, and Contact Information. Which aspect would you like to focus on first?";
        await typeResponse(response2, 1000);

        // Animate messages into view
        tl.fromTo(
            chatAreaRef.current.querySelectorAll(".msg"),
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.5,
                ease: "power2.out",
            }
        );
    };

    return (
        <div className="flex flex-col h-screen flex-1 bg-[#101010] text-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <span className="text-lg font-semibold">ChatGPT</span>
                <button className="bg-[#202020] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Upgrade
                </button>
            </div>

            {/* Chat Area */}
            <div
                ref={chatAreaRef}
                className="flex-1 px-4 md:px-6 lg:px-8 py-4 overflow-y-auto"
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`msg group w-full mb-6 last:mb-4 flex ${
                            m.type === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`flex max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                m.type === "user"
                                    ? "bg-[#2A2B32] text-gray-100"
                                    : "bg-[#444654] text-gray-200"
                            }`}
                        >
                            {i === messages.length - 1 && m.type === "bot" && !currentResponse.isComplete 
                                ? currentResponse.text 
                                : m.text}
                            {i === messages.length - 1 && m.type === "bot" && !currentResponse.isComplete && (
                                <span className="inline-block w-1 h-4 ml-1 bg-gray-400 animate-pulse"/>
                            )}
                        </div>
                    </div>
                ))}
                {isThinking && <ThinkingAnimation />}
            </div>

            {/* Input Box */}
            <div
                ref={inputBarRef}
                className="absolute left-1/2 -translate-x-1/2 bottom-1/2 transform-gpu flex items-center w-full max-w-xl bg-[#1E1E1E] rounded-full px-4 py-2 shadow-sm shadow-black/30"
            >
                <span className="text-gray-400 mr-2 text-lg">+</span>
                <input
                    type="text"
                    placeholder="Ask anything"
                    value={input}
                    readOnly
                    className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="text-gray-400 mx-2">
                    <FiMic size={20} />
                </button>
                <button className="text-gray-400">
                    <FiSend size={20} />
                </button>
            </div>
        </div>
    );
}

export default function ChatGPTClone() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Divider */}
            <div className="w-[1px] bg-gray-500" />

            {/* Chat Area */}
            <ChatScreen />
        </div>
    );
}
