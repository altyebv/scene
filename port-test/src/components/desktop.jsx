import React, { useState } from 'react';
import Wheather from '../assets/desktop_ic/weather.svg';
import Windows from '../assets/desktop_ic/windows.svg';
import Tasks from '../assets/desktop_ic/tasks.svg';
import Folder from '../assets/desktop_ic/folder.svg';
import Code from '../assets/desktop_ic/vscode.svg';
import Chrome from '../assets/desktop_ic/chrome.svg';
import Teams from '../assets/desktop_ic/microsoft-teams.svg';
import Window from './Window';
import arrow from '../assets/desktop_ic/arrowUp.svg';
import Cloud from '../assets/desktop_ic/cloud-off.svg';
import wifi from '../assets/desktop_ic/wifi.svg';
import sound from '../assets/desktop_ic/sound-mute.svg';
import battery from '../assets/desktop_ic/charging.svg';
import RecycleBin from '../assets/desktop_ic/recycle-bin.svg';
import Github from '../assets/desktop_ic/github.svg';
import Pdf from '../assets/desktop_ic/pdf.svg';
import Wallpaper from '../assets/desktop_ic/desktop_wallpaper.jpg';
import Pycharm from '../assets/desktop_ic/pycharm.svg';
import Chat from '../assets/desktop_ic/Assistant.svg';
import { ChromeContent, VsCode, TeamsApp } from './AppsContent';
import ChatBot from './Chatbot';




function Screen({ windows, activeWindow, onOpenWindow, onCloseWindow, onMinimizeWindow, onMaximizeWindow, onBringToFront }) {

    // the apps within the desktop 
    const apps = [
        { id: 'chrome', name: 'Chrome', icon: Chrome, content: <ChromeContent /> },
        { id: 'code', name: 'VS Code', icon: Code, content: <VsCode/> },
        { id: 'teams', name: 'MS Teams', icon: Teams, content: <TeamsApp/> },
        { id: 'Assistant', name: 'Assistant', icon: Chat, content: <ChatBot /> },
        // { id: 'github', name: 'GitHub', icon: Github, content: <div className="p-4 text-white">GitHub Window Content</div> },
        { id: 'pdf', name: 'PDF Files', icon: Pdf, content: <div className="p-4 text-white">PDF Files Window Content</div> },
        { id: 'recycle', name: 'Recycle Bin', icon: RecycleBin, content: <div className="p-4 text-white">Recycle Bin Content</div> }
    ];

    return (
        <div className="w-full h-full relative overflow-hidden"
        style={{ backgroundImage: `url(${Wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Windows Container - Place it first to ensure proper stacking */}
            <div className="absolute inset-0">
                {windows
                    .filter(window => !window.isMinimized)
                    .map((window) => (
                        <Window
                            key={window.id}
                            title={window.title}
                            icon={window.icon}
                            isOpen={true}
                            onClose={() => onCloseWindow(window.id)}
                            onMinimize={() => onMinimizeWindow(window.id)}
                            onMaximize={() => onMaximizeWindow(window.id)}
                            initialPosition={{ 
                                x: window.position?.x ?? 100 + (windows.indexOf(window) * 30), 
                                y: window.position?.y ?? 100 + (windows.indexOf(window) * 30)
                            }}
                        >
                            {window.content}
                        </Window>
                    ))}
            </div>

            {/* Desktop Icons Container */}
            <div id="desktop-icons" className="relative z-0 p-6">
                <div id="frequent-apps" className="flex flex-col items-start flex-wrap gap-6">
                    {apps.map((app) => (
                        <div
                            key={app.id}
                            className="desktop-icon flex flex-col items-center cursor-pointer ml-2 hover:bg-white/10 p-1.5 rounded-lg"
                            style={{minWidth: '76px'}}
                            onDoubleClick={() => onOpenWindow(app)}
                        >
                            <img src={app.icon} alt={app.name} className="w-12 h-12" />
                            <span className="text-white text-xs mt-1 drop-shadow-lg text-center">{app.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function Taskbar({ windows, onWindowClick, onPinnedAppClick }) {
    const pinnedApps = [
        { id: 'folder', icon: Folder, title: 'File Explorer' },
        { id: 'code', icon: Code, title: 'VS Code' },
        { id: 'chrome', icon: Chrome, title: 'Chrome' },
        { id: 'teams', icon: Teams, title: 'Microsoft Teams' },
        { id: 'pycharm', icon: Pycharm, title: 'Pycharm' },
    ];

    return (
        <div className="h-16 bg-gray-900/95 backdrop-blur-lg w-full border-t border-gray-700/50 shadow-lg">
            <div className="flex items-center h-full justify-between px-4">
                <div id="left-taskbar">
                    <div className='w-9 h-9 flex '>
                        <img src={Wheather} alt="weather icon" />
                        <div className='flex flex-col justify-center'>
                            <span className='text-sm mx-2 text-gray-200'>22°C</span>
                            <span className='text-sm font-bold text-gray-200 mx-2'>Cloudy</span>
                        </div>
                    </div>
                </div>

                <div id="mid-taskbar" >
                    <div className='flex items-center gap-x-2'>
                        <div className='hover:bg-gray-700/50 p-1.5 rounded-lg '>
                            <img className='w-8 h-8' src={Windows} alt="" />
                        </div>
                        <input
                            type="text"
                            placeholder="Ask anything"
                            value={''}
                            className="flex-1 bg-white/20 text-white placeholder-white px-3 py-1 rounded-2xl border-[0.5px] focus:border-gray-400 focus:outline-none"
                        />
                        <div className='hover:bg-white/30 p-1.5 rounded-lg '>
                            <img className='w-9 h-9' src={Tasks} alt="" />
                        </div>
                        {/* Pinned and Running Applications */}
                        {pinnedApps.map((app) => {
                            const runningWindow = windows.find(w => w.appId === app.id);
                            return (
                                <div
                                    key={app.id}
                                    onClick={() => runningWindow ? onWindowClick(runningWindow.id) : onPinnedAppClick(app)}
                                    className={`relative flex items-center justify-center hover:bg-white/20 p-1.5 rounded-lg cursor-pointer ${
                                        runningWindow && !runningWindow.isMinimized ? 'bg-white/10' : ''
                                    }`}
                                >
                                    <img className='w-9 h-9' src={app.icon} alt={app.title} />
                                    {runningWindow && !runningWindow.isMinimized && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                                    )}
                                </div>
                            );
                        })}

                        {/* Show any running windows that aren't pinned */}
                        {windows
                            .filter(window => !pinnedApps.some(app => app.id === window.appId))
                            .map((window) => (
                                <div
                                    key={window.id}
                                    onClick={() => onWindowClick(window.id)}
                                    className={`relative flex items-center justify-center hover:bg-white/20 p-1.5 rounded-lg cursor-pointer ${
                                        !window.isMinimized ? 'bg-white/10' : ''
                                    }`}
                                >
                                    <img className='w-9 h-9' src={window.icon} alt={window.title} />
                                    {!window.isMinimized && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                                    )}
                                </div>
                            ))}
                    </div>
                </div>

                <div id="right-taskbar" >
                    <div className='flex justify-between items-center h-full'>
                        <img className='w-5 h-5 mx-2' src={arrow} alt="Arrow icon" />
                        <img className='w-6 h-6 mx-2' src={Cloud} alt="cloud icon" />
                        <span className='text-sm font-bold mx-2 text-gray-200'>ENG</span>
                        <div id='status' className='flex hover:bg-zinc-600 p-2 rounded-lg '>
                            <img className='w-5 h-5 mx-2' src={wifi} alt="cloud icon" />
                            <img className='w-5 h-5 mx-2' src={sound} alt="cloud icon" />
                            <img className='w-5 h-5 mx-2' src={battery} alt="cloud icon" />
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='text-sm font-bold text-gray-200 mx-2'>12:45 PM</span>
                            <span className='text-sm font-bold text-gray-200 mx-2'>31/5/2025</span>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Desktop() {
    const [windows, setWindows] = useState([]);
    const [activeWindow, setActiveWindow] = useState(null);
    const [nextZIndex, setNextZIndex] = useState(1);

    const handleOpenWindow = (app) => {
        const existingWindow = windows.find(w => w.appId === app.id);
        
        if (existingWindow) {
            // If window exists but is minimized, restore it
            if (existingWindow.isMinimized) {
                setWindows(windows.map(w => 
                    w.id === existingWindow.id ? { ...w, isMinimized: false } : w
                ));
                setActiveWindow(existingWindow.id);
            }
            return;
        }

        const newWindow = {
            id: Date.now(),
            appId: app.id,
            title: app.name,
            icon: app.icon,
            content: app.content,
            isOpen: true,
            isMinimized: false,
            zIndex: windows.length + 1
        };
        setWindows([...windows, newWindow]);
        setActiveWindow(newWindow.id);
    };

    const handleCloseWindow = (id) => {
        setWindows(prevWindows => {
            const remainingWindows = prevWindows.filter(w => w.id !== id);
            if (activeWindow === id) {
                // Find the next window to activate
                const nextActive = remainingWindows
                    .filter(w => !w.isMinimized)
                    .sort((a, b) => b.zIndex - a.zIndex)[0];
                setActiveWindow(nextActive?.id || null);
            }
            return remainingWindows;
        });
    };

    const handleMinimizeWindow = (id) => {
        setWindows(prevWindows => {
            const updatedWindows = prevWindows.map(w => 
                w.id === id ? { ...w, isMinimized: true } : w
            );
            
            if (activeWindow === id) {
                // Find the next window to activate
                const nextActive = updatedWindows
                    .filter(w => !w.isMinimized)
                    .sort((a, b) => b.zIndex - a.zIndex)[0];
                setActiveWindow(nextActive?.id || null);
            }
            
            return updatedWindows;
        });
    };

    const handleMaximizeWindow = (id) => {
        setWindows(windows.map(w => 
            w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        ));
    };

    const handleBringToFront = (id) => {
        setActiveWindow(id);
        setNextZIndex(prev => prev + 1);
        setWindows(prevWindows => 
            prevWindows.map(w => ({
                ...w,
                zIndex: w.id === id ? nextZIndex : w.zIndex
            }))
        );
    };

    const handleWindowClick = (id) => {
        const window = windows.find(w => w.id === id);
        if (!window) return;

        if (window.isMinimized) {
            // Restore window if minimized
            setWindows(windows.map(w => 
                w.id === id ? { ...w, isMinimized: false } : w
            ));
            setActiveWindow(id);
        } else {
            // Minimize window if it's already open
            handleMinimizeWindow(id);
        }
    };

    const handlePinnedAppClick = (app) => {
        const existingWindow = windows.find(w => w.appId === app.id);
        
        if (existingWindow) {
            handleWindowClick(existingWindow.id);
        } else {
            // Create new window
            const newWindow = {
                id: Date.now(),
                appId: app.id,
                title: app.title,
                icon: app.icon,
                content: <div className="p-4 text-white">{app.title} Window Content</div>,
                isOpen: true,
                isMinimized: false,
                zIndex: windows.length + 1
            };
            setWindows([...windows, newWindow]);
            setActiveWindow(newWindow.id);
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="relative flex-1">
                <Screen 
                    windows={windows}
                    activeWindow={activeWindow}
                    onOpenWindow={handleOpenWindow}
                    onCloseWindow={handleCloseWindow}
                    onMinimizeWindow={handleMinimizeWindow}
                    onMaximizeWindow={handleMaximizeWindow}
                    onBringToFront={handleBringToFront}
                />
            </div>
            <Taskbar 
                windows={windows} 
                onWindowClick={handleWindowClick} 
                onPinnedAppClick={handlePinnedAppClick}
            />
        </div>
    );
}

export default Desktop;