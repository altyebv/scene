import React from "react";

export const ChromeContent = () => (
    <div className="w-full h-full bg-[#2b2f3a] flex flex-col">
        {/* Top address bar */}
        <div className="h-12 bg-[#202124] flex items-center px-3 gap-3">
            <div className="w-6 h-6 bg-gray-500 rounded-full" /> {/* Back button */}
            <div className="w-6 h-6 bg-gray-500 rounded-full" /> {/* Forward button */}
            <div className="w-6 h-6 bg-gray-500 rounded-full" /> {/* Reload */}
            <input
                type="text"
                value="Search Google or type a URL"
                readOnly
                className="flex-1 h-8 bg-[#3c4043] text-gray-300 text-sm px-3 rounded-full outline-none"
            />
            <div className="w-6 h-6 bg-gray-500 rounded-full" /> {/* Profile icon */}
        </div>

        {/* Main Google logo and search */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="text-[80px] font-sans font-light text-blue-300">Google</h1>

            <div className="mt-6 w-full flex justify-center">
                <div className="flex items-center bg-white rounded-full w-[500px] h-12 shadow px-4 gap-3">
                    <div className="w-5 h-5 bg-gray-400 rounded-full" /> {/* Search icon */}
                    <input
                        type="text"
                        placeholder="Search Google or type a URL"
                        className="flex-1 outline-none text-gray-700 text-sm"
                    />
                    <div className="w-5 h-5 bg-gray-400 rounded-full" /> {/* Mic icon */}
                    <div className="w-5 h-5 bg-gray-400 rounded-full" /> {/* Lens icon */}
                </div>
            </div>

            {/* Shortcuts */}
            <div className="mt-10 flex gap-10">
                {[1, 2, 3, 4].map((n) => (
                    <div
                        key={n}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                        <div className="w-14 h-14 bg-gray-600 rounded-full" />
                        <span className="text-sm text-gray-300">Shortcut {n}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const VsCode = () => (
    <div className="w-[800px] h-[500px] bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700 flex flex-col text-sm text-gray-300 font-mono">
        {/* Title bar */}
        <div className="h-8 flex items-center bg-[#333] text-gray-200 px-3 justify-center">
            <span className="text-xs">index.js — Visual Studio Code</span>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 bg-[#252526] p-2">
                <div className="text-gray-400 text-xs mb-2">EXPLORER</div>
                <ul className="space-y-1">
                    <li className="text-gray-300">📂 src</li>
                    <li className="ml-4 text-green-400">📄 App.jsx</li> {/* added */}
                    <li className="ml-4 text-yellow-400">📄 index.js</li> {/* modified */}
                    <li className="ml-4 text-red-400">📄 styles.css</li> {/* deleted/untracked */}
                    <li className="ml-4 text-gray-400">📄 utils.js</li>
                    <li className="ml-4 text-gray-400">📄 config.js</li>
                    <li className="text-gray-300">📂 public</li>
                    <li className="ml-4 text-gray-400">📄 index.html</li>
                    <li className="ml-4 text-gray-400">📄 favicon.ico</li>
                </ul>
            </div>

            {/* Main editor */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Open tabs */}
                <div className="flex bg-[#252526] text-gray-200">
                    <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500">
                        index.js
                    </div>
                    <div className="px-4 py-2 hover:bg-[#333] cursor-pointer">
                        App.jsx
                    </div>
                </div>

                {/* Code area */}
                <div className="flex-1 p-4 leading-6 overflow-auto">
                    <code>
                        <div><span className="text-green-400">import</span> React <span className="text-green-400">from</span> <span className="text-yellow-300">'react'</span>;</div>
                        <div><span className="text-green-400">function</span> App() {'{'}</div>
                        <div className="ml-4"><span className="text-green-400">return</span> &lt;<span className="text-blue-400">h1</span>&gt;Hello World!&lt;/<span className="text-blue-400">h1</span>&gt;;</div>
                        <div>{'}'}</div>
                        <div><span className="text-green-400">export default</span> App;</div>
                    </code>
                </div>

                {/* Terminal */}
                <div className="h-24 bg-[#1e1e1e] border-t border-gray-700 p-2 text-xs overflow-auto">
                    <div className="text-green-400">npm start</div>
                    <div>Starting development server...</div>
                    <div className="text-green-400">✔ Compiled successfully!</div>
                </div>
            </div>
        </div>
    </div>
);


export const TeamsApp = () => (
    <div className="w-[900px] h-[550px] bg-[#18191c] rounded-lg overflow-hidden border border-gray-700 flex font-sans text-sm text-gray-200">
        {/* Left sidebar */}
        <div className="w-14 bg-[#202225] flex flex-col items-center py-2 space-y-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">A</div>
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">💬</div>
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">👥</div>
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">📅</div>
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">📁</div>
        </div>

        {/* Teams list */}
        <div className="w-64 bg-[#2f3136] flex flex-col border-r border-gray-800">
            <div className="p-3 font-semibold text-lg border-b border-gray-700">Teams</div>
            <div className="flex-1 overflow-auto">
                <div className="px-3 py-2 hover:bg-[#40444b] cursor-pointer">🚀 Project Alpha</div>
                <div className="px-3 py-2 bg-[#40444b] cursor-pointer">💼 General</div>
                <div className="px-3 py-2 hover:bg-[#40444b] cursor-pointer">🛠 Dev Discussion</div>
            </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-[#36393f]">
            {/* Chat header */}
            <div className="h-12 px-4 flex items-center border-b border-gray-700">
                <span className="font-semibold">💼 General</span>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-auto space-y-4">
                <div>
                    <div className="font-semibold">Alice</div>
                    <div className="bg-[#4f545c] inline-block px-3 py-1 rounded-lg mt-1">
                        Hey team, how’s the project going?
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Bob</div>
                    <div className="bg-[#4f545c] inline-block px-3 py-1 rounded-lg mt-1">
                        Making good progress, just polishing the UI.
                    </div>
                </div>
                <div>
                    <div className="font-semibold">You</div>
                    <div className="bg-[#7289da] inline-block px-3 py-1 rounded-lg mt-1 text-white">
                        I want to be in your team
                    </div>
                </div>
            </div>

            {/* Message input */}
            <div className="h-14 px-4 flex items-center border-t border-gray-700">
                <input
                    className="flex-1 bg-[#40444b] text-white rounded-lg px-3 py-2 outline-none"
                    placeholder="Type a new message"
                />
            </div>
        </div>
    </div>
);


