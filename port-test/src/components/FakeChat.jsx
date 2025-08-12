import React, { useState, useEffect } from 'react';
import '../Fakechat.css'

export default function FakeChat({
    onComplete,           // callback after last message
    userMessage,          // string
    botMessage,           // string
    typingSpeed = 40,     // ms per character
    thinkingDelay = 1500, // ms before bot starts typing
}) {
    const [phase, setPhase] = useState('user'); // 'user' | 'thinking' | 'bot'
    const [displayedBotText, setDisplayedBotText] = useState('');
    const [thinkingDots, setThinkingDots] = useState('');

    // Start thinking after showing user message
    useEffect(() => {
        if (phase === 'user') {
            const timer = setTimeout(() => setPhase('thinking'), 800);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Animate thinking dots
    useEffect(() => {
        if (phase === 'thinking') {
            let dotCount = 0;
            const dotInterval = setInterval(() => {
                dotCount = (dotCount + 1) % 4;
                setThinkingDots('.'.repeat(dotCount));
            }, 400);

            const timer = setTimeout(() => {
                clearInterval(dotInterval);
                setPhase('bot');
            }, thinkingDelay);

            return () => {
                clearInterval(dotInterval);
                clearTimeout(timer);
            };
        }
    }, [phase, thinkingDelay]);

    // Type out bot message
    useEffect(() => {
        if (phase === 'bot') {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedBotText(botMessage.slice(0, i + 1));
                i++;
                if (i === botMessage.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 1000);
                }
            }, typingSpeed);
            return () => clearInterval(interval);
        }
    }, [phase, botMessage, typingSpeed, onComplete]);

    return (
        <div className="chat-container">
            {/* HEADER AREA - ADD YOUR ICONS/LOGO HERE */}
            <div className="chat-header">
                <div className="chat-logo">
                    {/* Insert fake ChatGPT icon here */}
                </div>
                <span>ChatGPT</span>
            </div>

            {/* MESSAGES AREA */}
            <div className="chat-messages">
                {/* USER MESSAGE */}
                <div className="chat-bubble user">
                    {/* Add user avatar here */}
                    <span>{userMessage}</span>
                </div>

                {/* BOT MESSAGE */}
                <div className="chat-bubble bot">
                    {/* Add bot avatar here */}
                    {phase === 'thinking' && <span>{thinkingDots}&nbsp;</span>}
                    {phase === 'bot' && <span>{displayedBotText}</span>}
                </div>
            </div>
        </div>
    );
}
