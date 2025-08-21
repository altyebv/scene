import React, { useState, useEffect } from 'react';
import { icons } from '../assets/icons';
import { ChromeContent, VsCode, TeamsApp, CVApp, PyCharmApp, FileExplorerApp, RecycleBinApp, SpotifyApp } from '../components/AppsContent';
import ChatBot from '../components/Chatbot';
import Window from '../temp/Window';

function QuickSettings({ isOpen, onClose, width, height }) {
    const [volume, setVolume] = useState(75);
    const [brightness, setBrightness] = useState(80);
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
    const [airplaneMode, setAirplaneMode] = useState(false);

    if (!isOpen) return null;

    const containerWidth = width || 800;
    const isCompact = containerWidth < 600;
    const panelWidth = isCompact ? 300 : 360;
    const taskbarHeight = isCompact ? 40 : 48;

    return (
        <div className="absolute z-50" style={{
            bottom: taskbarHeight,
            right: 8,
            maxHeight: (height || 600) - taskbarHeight
        }}>
            <div
                className="bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/30 shadow-2xl overflow-hidden"
                style={{ width: panelWidth }}
            >
                {/* Quick Actions Grid */}
                <div className="p-4">
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <button 
                            onClick={() => setWifiEnabled(!wifiEnabled)}
                            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                                wifiEnabled 
                                    ? 'bg-blue-600/90 text-white' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                            }`}
                        >
                            <span className="text-xl mb-2">📶</span>
                            <span className="text-xs font-medium">Wi-Fi</span>
                        </button>
                        
                        <button 
                            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                                bluetoothEnabled 
                                    ? 'bg-blue-600/90 text-white' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                            }`}
                        >
                            <span className="text-xl mb-2">🔵</span>
                            <span className="text-xs font-medium">Bluetooth</span>
                        </button>
                        
                        <button 
                            onClick={() => setAirplaneMode(!airplaneMode)}
                            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                                airplaneMode 
                                    ? 'bg-orange-600/90 text-white' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                            }`}
                        >
                            <span className="text-xl mb-2">✈️</span>
                            <span className="text-xs font-medium">Airplane mode</span>
                        </button>
                        
                        <button className="flex flex-col items-center p-4 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 transition-all">
                            <span className="text-xl mb-2">🔒</span>
                            <span className="text-xs font-medium">Rotation lock</span>
                        </button>
                        
                        <button className="flex flex-col items-center p-4 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 transition-all">
                            <span className="text-xl mb-2">🔋</span>
                            <span className="text-xs font-medium">Battery saver</span>
                        </button>
                        
                        <button className="flex flex-col items-center p-4 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 transition-all">
                            <span className="text-xl mb-2">👁️</span>
                            <span className="text-xs font-medium">Accessibility</span>
                        </button>
                    </div>

                    {/* Brightness Slider */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white text-sm flex items-center gap-2">
                                <span>☀️</span>
                                Brightness
                            </span>
                            <span className="text-gray-400 text-sm">{brightness}%</span>
                        </div>
                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={brightness}
                                onChange={(e) => setBrightness(e.target.value)}
                                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>
                    </div>

                    {/* Volume Slider */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white text-sm flex items-center gap-2">
                                <span>🔊</span>
                                Volume
                            </span>
                            <span className="text-gray-400 text-sm">{volume}%</span>
                        </div>
                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>
                    </div>
                </div>

                {/* Network & Device Info */}
                <div className="px-4 pb-4 border-t border-gray-700/30 pt-4">
                    <div className="text-xs text-gray-400 space-y-2">
                        <div className="flex justify-between items-center">
                            <span>Connected to:</span>
                            <span className="text-blue-400 font-medium">Home Network</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Battery:</span>
                            <span className="text-green-400 font-medium">85% • Charging</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    background: #3b82f6;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                }
                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    background: #3b82f6;
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                }
                .slider::-webkit-slider-track {
                    background: #374151;
                    height: 4px;
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
}


function StartMenu({ isOpen, onClose, onShutdown }) {
    const pinnedApps = [
        { id: 'chrome', name: 'Chrome', icon: icons.chrome },
        { id: 'code', name: 'VS Code', icon: icons.code },
        { id: 'teams', name: 'MS Teams', icon: icons.teams },
        { id: 'Assistant', name: 'Assistant', icon: icons.chat },
        { id: 'folder', name: 'File Explorer', icon: icons.folder },
        { id: 'pycharm', name: 'PyCharm', icon: icons.pycharm },
        { id: 'spotify', name: 'Spotify', icon: icons.spotify },
    ];

    const recentApps = [
        { id: 'pdf', name: 'Adobe PDF', icon: icons.pdf },
        { id: 'recycle', name: 'Recycle Bin', icon: icons.recycle }
    ];

    if (!isOpen) return null;

    return (
        <div className="absolute bottom-16 z-50 mb-8" style={{
            bottom: 48,
            left: '50%',
            transform: 'translateX(-50%)',
            }}>
            <div className="w-2xl bg-gray-900/95 backdrop-blur-lg rounded-t-lg border border-gray-700/50 shadow-2xl">
                   {/* Search Bar */}
                <div className="p-4 border-b border-gray-700/50">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Type here to search"
                            className="w-full bg-gray-800/50 text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600/50 focus:border-blue-500 focus:outline-none text-sm"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <img className='w-6 h-6' src={icons.search} alt="" />
                        </div>
                    </div>
                </div>
                {/* User Profile Section */}
                <div className="p-4 border-b border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            AA
                        </div>
                        <div>
                            <div className="text-white font-medium">Altyeb Abdaljalil</div>
                            <div className="text-gray-400 text-sm">Developer</div>
                        </div>
                    </div>
                </div>

                {/* Pinned Apps */}
                <div className="p-4">
                    <div className="text-gray-300 text-sm font-medium mb-3">Pinned</div>
                    <div className="grid grid-cols-3 gap-2">
                        {pinnedApps.map((app) => (
                            <div
                                key={app.id}
                                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                            >
                                <img src={app.icon} alt={app.name} className="w-8 h-8 mb-1" />
                                <span className="text-white text-xs text-center">{app.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Apps */}
                <div className="p-4 border-t border-gray-700/50">
                    <div className="text-gray-300 text-sm font-medium mb-3">Recent</div>
                    <div className="space-y-1">
                        {recentApps.map((app) => (
                            <div
                                key={app.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                            >
                                <img src={app.icon} alt={app.name} className="w-6 h-6" />
                                <span className="text-white text-sm">{app.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Power Options */}
                <div className="p-4 border-t border-gray-700/50">
                    <button
                        onClick={onShutdown}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
                    >
                        <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-lg">⏻</span>
                        </div>
                        <span className="text-sm">Shut down</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function ShutdownScreen({ isVisible, onComplete }) {
    const [stage, setStage] = useState('shutting-down');

    useEffect(() => {
        if (!isVisible) return;

        const timer = setTimeout(() => {
            setStage('error');
            setTimeout(() => {
                onComplete();
                setStage('shutting-down');
            }, 3000);
        }, 2000);

        return () => clearTimeout(timer);
    }, [isVisible, onComplete]);

    if (!isVisible) return null;

    return (
        <div className="absolute inset-0 bg-blue-900 flex flex-col items-center justify-center z-50">
            {stage === 'shutting-down' ? (
                <>
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h1 className="text-white text-2xl font-light mb-2">Shutting down...</h1>
                    <p className="text-blue-200">Please wait while we close your applications</p>
                </>
            ) : (
                <>
                    <div className="text-6xl mb-6">😅</div>
                    <h1 className="text-white text-3xl font-light mb-4">Oops!</h1>
                    <p className="text-blue-200 text-lg mb-2">We can't shut down this portfolio</p>
                    <p className="text-blue-300 text-sm">It's too awesome to close! Returning to desktop...</p>
                </>
            )}
        </div>
    );
}

function Screen({
    windows,
    activeWindow,
    onOpenWindow,
    onCloseWindow,
    onMinimizeWindow,
    onMaximizeWindow,
    onBringToFront,
    selectedIcon,
    onIconClick,
    width,
    height
}) {
    const apps = [
        { id: 'chrome', name: 'Chrome', icon: icons.chrome, content: <ChromeContent /> },
        { id: 'code', name: 'VS Code', icon: icons.code, content: <VsCode /> },
        { id: 'teams', name: 'MS Teams', icon: icons.teams, content: <TeamsApp /> },
        { id: 'Assistant', name: 'Assistant', icon: icons.chat, content: <ChatBot /> },
        { id: 'pdf', name: 'CV', icon: icons.pdf, content: <CVApp /> },
        { id: 'recycle', name: 'Recycle Bin', icon: icons.recycle, content: <RecycleBinApp /> },
        { id: 'folder', name: 'File Explorer', icon: icons.folder, content: <FileExplorerApp /> },
        { id: 'pycharm', name: 'PyCharm', icon: icons.pycharm, content: <PyCharmApp /> },
        { id: 'spotify', name: 'Spotify', icon: icons.spotify, content: <SpotifyApp /> }
    ];

    const containerWidth = width || 800;
    const containerHeight = height || 600;
    const isCompact = containerWidth < 600 || containerHeight < 400;
    const taskbarHeight = isCompact ? 40 : 48;

    const iconSize = isCompact ? 'w-6 h-6' : containerWidth < 800 ? 'w-8 h-8' : 'w-10 h-10';
    const textSize = isCompact ? 'text-xs' : 'text-sm';
    const iconSpacing = isCompact ? 'gap-2' : 'gap-4';
    const containerPadding = isCompact ? 'p-2' : 'p-4';

    return (
        <div
            className="w-full h-full relative overflow-hidden desktop-container"
            style={{
                backgroundImage: `url(${icons.wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: containerWidth,
                height: containerHeight
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onIconClick(null);
                }
            }}
        >
            {/* Windows Container */}
            <div className="absolute inset-0" style={{ bottom: `${taskbarHeight}px` }}>
                {windows
                    .filter(window => !window.isMinimized)
                    .sort((a, b) => a.zIndex - b.zIndex)
                    .map((window) => (
                        <Window
                            key={window.id}
                            title={window.title}
                            icon={window.icon}
                            isOpen={true}
                            isActive={activeWindow === window.id}
                            onClose={() => onCloseWindow(window.id)}
                            onMinimize={() => onMinimizeWindow(window.id)}
                            onMaximize={() => onMaximizeWindow(window.id)}
                            onBringToFront={() => onBringToFront(window.id)}
                            initialPosition={{
                                x: window.position?.x ?? 50 + (windows.indexOf(window) * 30),
                                y: window.position?.y ?? 50 + (windows.indexOf(window) * 30)
                            }}
                            isMaximized={window.isMaximized}
                            width={containerWidth}
                            height={containerHeight}
                            zIndex={window.zIndex}
                        >
                            {window.content}
                        </Window>
                    ))}
            </div>

            {/* Desktop Icons Container */}
            <div className={`absolute top-0 left-0 z-0 ${containerPadding}`} style={{
                maxHeight: containerHeight - taskbarHeight
            }}>
                <div className={`flex flex-col items-start ${iconSpacing}`}>
                    {apps
                        .filter(app => ['chrome', 'code', 'teams', 'Assistant', 'pdf', 'recycle'].includes(app.id))
                        .map((app) => (
                            <div
                                key={app.id}
                                className={`desktop-icon flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all duration-300 ease-in-out ${
                                    selectedIcon === app.id
                                        ? 'bg-blue-500/30 border border-blue-400/50 shadow-lg scale-105'
                                        : 'hover:bg-white/10 hover:scale-102'
                                }`}
                                style={{ minWidth: isCompact ? '48px' : '64px', maxWidth: '80px' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onIconClick(app.id);
                                }}
                                onDoubleClick={() => onOpenWindow(app)}
                            >
                                <img src={app.icon} alt={app.name} className={iconSize} />
                                <span className={`${textSize} mt-1 drop-shadow-lg text-center transition-all duration-300 text-white ${
                                    selectedIcon === app.id ? 'font-medium' : ''
                                } truncate w-full`}>
                                    {app.name}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

function Taskbar({
    windows,
    onWindowClick,
    onPinnedAppClick,
    onStartMenuToggle,
    isStartMenuOpen,
    width,
    height
}) {
    const [search, setSearch] = useState('');
    const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);

    const pinnedApps = [
        { id: 'folder', icon: icons.folder, title: 'File Explorer' },
        { id: 'code', icon: icons.code, title: 'VS Code' },
        { id: 'chrome', icon: icons.chrome, title: 'Chrome' },
        { id: 'teams', icon: icons.teams, title: 'Microsoft Teams' },
        { id: 'pycharm', icon: icons.pycharm, title: 'PyCharm' },
        { id: 'spotify', icon: icons.spotify, title: 'Spotify' },
    ];

    const containerWidth = width || 800;
    const containerHeight = height || 600;
    const isCompact = containerWidth < 600 || containerHeight < 400;
    const isVeryCompact = containerWidth < 500;

    const taskbarHeight = isCompact ? '40px' : '48px';
    const iconSize = isCompact ? 'w-5 h-5' : 'w-6 h-6';
    const windowsIconSize = isCompact ? 'w-5 h-5' : 'w-7 h-7';
    const textSize = isCompact ? 'text-xs' : 'text-sm';
    const spacing = isCompact ? 'gap-1' : 'gap-2';

    // Close quick settings when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isQuickSettingsOpen && !e.target.closest('.quick-settings-area')) {
                setIsQuickSettingsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isQuickSettingsOpen]);

    return (
        <>
            <div
                className="bg-gray-900/95 backdrop-blur-lg w-full border-t border-gray-700/50 shadow-lg absolute bottom-0 left-0"
                style={{ height: taskbarHeight }}
            >
                <div className="flex items-center h-full justify-between px-2">
                    {/* Left Taskbar - Weather (hide on very compact) */}
                    <div className="flex-shrink-0">
                        {!isVeryCompact && (
                            <div className="flex items-center px-2 py-1 rounded-lg hover:bg-gray-800/30 cursor-pointer transition-colors">
                                <img src={icons.weather} alt="weather icon" className={iconSize} />
                                <div className="flex flex-col justify-center ml-2">
                                    <span className={`${textSize} text-gray-200 font-medium`}>22°C</span>
                                    <span className={`text-xs text-gray-300`}>Cloudy</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mid Taskbar - Start Menu and Apps */}
                    <div className="flex-1 flex justify-center max-w-full">
                        <div className={`flex items-center ${spacing} max-w-full overflow-hidden`}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onStartMenuToggle();
                                }}
                                data-start-button="true"
                                className={`${isCompact ? 'p-1' : 'p-1.5'} rounded-lg transition-colors flex-shrink-0 ${
                                    isStartMenuOpen
                                        ? 'bg-blue-600/50'
                                        : 'hover:bg-gray-700/50'
                                }`}
                                title="Start"
                            >
                                <img className={windowsIconSize} src={icons.windows} alt="Start" />
                            </button>

                            {!isCompact && (
                                <input
                                    type="text"
                                    placeholder="Type here to search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-gray-800/60 text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-600/50 focus:border-blue-500 focus:outline-none text-sm flex-shrink max-w-40 transition-colors"
                                />
                            )}

                            {!isVeryCompact && (
                                <button className="hover:bg-gray-700/50 p-1.5 rounded-lg flex-shrink-0 transition-colors" title="Task View">
                                    <img className={iconSize} src={icons.tasks} alt="Tasks" />
                                </button>
                            )}

                            {/* Pinned and Running Applications */}
                            <div className={`flex items-center ${spacing} overflow-hidden`}>
                                {pinnedApps.map((app) => {
                                    const runningWindow = windows.find(w => w.appId === app.id);
                                    const isMinimized = runningWindow?.isMinimized;
                                    const isRunning = runningWindow && !runningWindow.isMinimized;

                                    return (
                                        <div
                                            key={app.id}
                                            onClick={() => runningWindow ? onWindowClick(runningWindow.id) : onPinnedAppClick(app)}
                                            className={`relative flex items-center justify-center ${isCompact ? 'p-1' : 'p-2'} rounded-lg cursor-pointer transition-all flex-shrink-0 ${
                                                isRunning
                                                    ? 'bg-white/20 border border-white/20'
                                                    : isMinimized
                                                        ? 'bg-white/10 border border-white/10'
                                                        : 'hover:bg-white/20'
                                            }`}
                                            title={app.title}
                                        >
                                            <img className={iconSize} src={app.icon} alt={app.title} />
                                            {runningWindow && (
                                                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-0.5 rounded-full ${
                                                    isRunning ? 'bg-blue-400' : 'bg-gray-400'
                                                }`} />
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
                                            className={`relative flex items-center justify-center ${isCompact ? 'p-1' : 'p-2'} rounded-lg cursor-pointer transition-all flex-shrink-0 ${
                                                !window.isMinimized
                                                    ? 'bg-white/20 border border-white/20'
                                                    : 'bg-white/10 border border-white/10 hover:bg-white/20'
                                            }`}
                                            title={window.title}
                                        >
                                            <img className={iconSize} src={window.icon} alt={window.title} />
                                            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-0.5 rounded-full ${
                                                !window.isMinimized ? 'bg-blue-400' : 'bg-gray-400'
                                            }`} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Taskbar - System Icons and Time */}
                    <div className="flex-shrink-0">
                        <div className={`flex justify-between items-center h-full ${isCompact ? 'gap-1' : 'gap-2'}`}>
                            {!isVeryCompact && (
                                <button className="p-1 hover:bg-gray-700/50 rounded transition-colors" title="Show hidden icons">
                                    <img className="w-3 h-3" src={icons.arrow} alt="Arrow" />
                                </button>
                            )}
                            
                            {!isVeryCompact && (
                                <button className="p-1 hover:bg-gray-700/50 rounded transition-colors" title="OneDrive">
                                    <img className="w-4 h-4" src={icons.cloud} alt="Cloud" />
                                </button>
                            )}
                            
                            {!isCompact && (
                                <button className="px-2 py-1 hover:bg-gray-700/50 rounded transition-colors" title="Input Method">
                                    <span className="text-xs font-medium text-gray-200">ENG</span>
                                </button>
                            )}

                            <div className="quick-settings-area">
                                <div
                                    className={`flex hover:bg-gray-700/50 ${isCompact ? 'p-1' : 'p-2'} rounded-lg cursor-pointer transition-colors ${
                                        isQuickSettingsOpen ? 'bg-gray-700/50' : ''
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsQuickSettingsOpen(!isQuickSettingsOpen);
                                    }}
                                    title="Network, sound, and battery"
                                >
                                    <img className={`w-4 h-4 ${isCompact ? 'mx-0.5' : 'mx-1'}`} src={icons.wifi} alt="WiFi" />
                                    <img className={`w-4 h-4 ${isCompact ? 'mx-0.5' : 'mx-1'}`} src={icons.sound} alt="Sound" />
                                    <img className={`w-4 h-4 ${isCompact ? 'mx-0.5' : 'mx-1'}`} src={icons.battery} alt="Battery" />
                                </div>
                            </div>

                            <button 
                                className="flex flex-col items-center px-2 py-1 hover:bg-gray-700/50 rounded-lg transition-colors"
                                title="Date and time settings"
                            >
                                <span className={`${textSize} font-medium text-gray-200`}>12:45</span>
                                {!isCompact && <span className="text-xs text-gray-300">8/19/2025</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Settings Panel */}
            <div className="quick-settings-area">
                <QuickSettings
                    isOpen={isQuickSettingsOpen}
                    onClose={() => setIsQuickSettingsOpen(false)}
                    width={width}
                    height={height}
                />
            </div>
        </>
    );
}

function Desktop({ width, height }) {
    const [windows, setWindows] = useState([]);
    const [activeWindow, setActiveWindow] = useState(null);
    const [nextZIndex, setNextZIndex] = useState(1);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [isShuttingDown, setIsShuttingDown] = useState(false);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if ((e.key === 'Meta' && !e.ctrlKey) || (e.ctrlKey && e.key === 'Escape')) {
                e.preventDefault();
                setIsStartMenuOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isStartMenuOpen) {
                setIsStartMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isStartMenuOpen]);

    // Handle clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isStartMenuOpen && 
                !e.target.closest('.start-menu-area') && 
                !e.target.closest('[data-start-button="true"]')) {
                setIsStartMenuOpen(false);
            }

            if (selectedIcon && 
                (e.target.closest('.window') || e.target.closest('.taskbar-area'))) {
                setSelectedIcon(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isStartMenuOpen, selectedIcon]);

    const apps = [
        { id: 'chrome', name: 'Chrome', icon: icons.chrome, content: <ChromeContent /> },
        { id: 'code', name: 'VS Code', icon: icons.code, content: <VsCode /> },
        { id: 'teams', name: 'MS Teams', icon: icons.teams, content: <TeamsApp /> },
        { id: 'Assistant', name: 'Assistant', icon: icons.chat, content: <ChatBot /> },
        { id: 'pdf', name: 'CV', icon: icons.pdf, content: <CVApp /> },
        { id: 'recycle', name: 'Recycle Bin', icon: icons.recycle, content: <RecycleBinApp /> },
        { id: 'folder', name: 'File Explorer', icon: icons.folder, content: <FileExplorerApp /> },
        { id: 'pycharm', name: 'PyCharm', icon: icons.pycharm, content: <PyCharmApp /> },
        { id: 'spotify', name: 'Spotify', icon: icons.spotify, content: <SpotifyApp /> }
    ];

    const getAppById = (appId) => {
        return apps.find(app => app.id === appId);
    };

    const handleOpenWindow = (app) => {
        const existingWindow = windows.find(w => w.appId === app.id);

        if (existingWindow) {
            if (existingWindow.isMinimized) {
                setWindows(windows.map(w =>
                    w.id === existingWindow.id ? { ...w, isMinimized: false } : w
                ));
                handleBringToFront(existingWindow.id);
            } else {
                handleBringToFront(existingWindow.id);
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
            isMaximized: false,
            zIndex: nextZIndex,
            position: {
                x: 50 + (windows.length * 30),
                y: 50 + (windows.length * 30)
            }
        };
        setWindows([...windows, newWindow]);
        setActiveWindow(newWindow.id);
        setNextZIndex(prev => prev + 1);
    };

    const handleCloseWindow = (id) => {
        setWindows(prevWindows => {
            const remainingWindows = prevWindows.filter(w => w.id !== id);
            if (activeWindow === id) {
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
        const newZIndex = nextZIndex;
        setNextZIndex(prev => prev + 1);
        setWindows(prevWindows =>
            prevWindows.map(w => ({
                ...w,
                zIndex: w.id === id ? newZIndex : w.zIndex
            }))
        );
    };

    const handleWindowClick = (id) => {
        const window = windows.find(w => w.id === id);
        if (!window) return;

        if (window.isMinimized) {
            setWindows(windows.map(w =>
                w.id === id ? { ...w, isMinimized: false } : w
            ));
        }
        if (activeWindow === id) {
            window.isMinimized = !window.isMinimized;
            console.log('Window activated:', window);
        }
        handleBringToFront(id);
    };

    const handlePinnedAppClick = (pinnedApp) => {
        const existingWindow = windows.find(w => w.appId === pinnedApp.id);

        if (existingWindow) {
            handleWindowClick(existingWindow.id);
        } else {
            const fullAppConfig = getAppById(pinnedApp.id);

            if (fullAppConfig) {
                handleOpenWindow(fullAppConfig);
            }
        }
    };

    const handleIconClick = (iconId) => {
        setSelectedIcon(iconId);
    };

    const handleStartMenuToggle = () => {
        setIsStartMenuOpen(prev => !prev);
    };

    const handleShutdown = () => {
        setIsStartMenuOpen(false);
        setIsShuttingDown(true);
    };

    const handleShutdownComplete = () => {
        setIsShuttingDown(false);
    };

    return (
        <div
            className="relative overflow-hidden"
            style={{
                width: width ? `${width}px` : '100%',
                height: height ? `${height}px` : '100vh',
            }}
        >
            <Screen
                windows={windows}
                activeWindow={activeWindow}
                selectedIcon={selectedIcon}
                onIconClick={handleIconClick}
                onOpenWindow={handleOpenWindow}
                onCloseWindow={handleCloseWindow}
                onMinimizeWindow={handleMinimizeWindow}
                onMaximizeWindow={handleMaximizeWindow}
                onBringToFront={handleBringToFront}
                width={width}
                height={height}
            />

            <div className="start-menu-area">
                <StartMenu
                    isOpen={isStartMenuOpen}
                    onClose={() => setIsStartMenuOpen(false)}
                    onShutdown={handleShutdown}
                    width={width}
                    height={height}
                />
            </div>

            <div className="taskbar-area">
                <Taskbar
                    windows={windows}
                    isStartMenuOpen={isStartMenuOpen}
                    onWindowClick={handleWindowClick}
                    onPinnedAppClick={handlePinnedAppClick}
                    onStartMenuToggle={handleStartMenuToggle}
                    width={width}
                    height={height}
                />
            </div>

            <ShutdownScreen
                isVisible={isShuttingDown}
                onComplete={handleShutdownComplete}
            />
        </div>
    );
}

export default Desktop;