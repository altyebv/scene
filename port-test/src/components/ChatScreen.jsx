import { useState, useEffect, useRef } from "react";
import { FiMic, FiSend } from "react-icons/fi";
import gsap from "gsap";

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
    const inputBarRef = useRef(null);
    const chatAreaRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial delay before typing starts
        tl.to({}, { duration: 1.5 });

        // Typing simulation
        const fakeMsg = "Hey ChatGPT, can you help me with something?";
        tl.call(() => {
            let i = 0;
            const typing = setInterval(() => {
                setInput(fakeMsg.slice(0, i + 1));
                i++;
                if (i === fakeMsg.length) {
                    clearInterval(typing);
                    // After short delay, send message
                    setTimeout(() => sendMessage(fakeMsg), 500);
                }
            }, 50);
        });
    }, []);

    const sendMessage = (msg) => {
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
        });

        // Delay then add bot reply
        tl.to({}, { duration: 1.2 });
        tl.call(() => {
            setMessages((prev) => [
                ...prev,
                { text: "Sure! What do you need help with?", type: "bot" },
            ]);
        });

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
                className="flex-1 px-6 py-4 space-y-4 overflow-y-auto"
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`msg max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${m.type === "user"
                                ? "bg-[#2F2F2F] ml-auto text-gray-100"
                                : "bg-[#1E1E1E] text-gray-200"
                            }`}
                    >
                        {m.text}
                    </div>
                ))}
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
            <div className="w-[1px] bg-gray-700" />

            {/* Chat Area */}
            <ChatScreen />
        </div>
    );
}
