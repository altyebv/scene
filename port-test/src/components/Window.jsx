import React, { useState, useRef, useEffect } from 'react';

const Window = ({ 
    title, 
    icon, 
    isOpen, 
    onClose, 
    onMinimize, 
    onMaximize, 
    onBringToFront,
    children, 
    isActive, 
    zIndex = 10, 
    initialPosition = { x: 100, y: 100 },
    isMaximized = false,
    width,
    height 
}) => {
    const windowRef = useRef(null);
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [localIsMaximized, setLocalIsMaximized] = useState(isMaximized);
    const [previousPosition, setPreviousPosition] = useState(initialPosition);
    const [windowSize, setWindowSize] = useState({ width: 900, height: 650 });

    // Calculate responsive dimensions
    const containerWidth = width || 800;
    const containerHeight = height || 600;
    const isCompact = containerWidth < 600 || containerHeight < 400;
    const taskbarHeight = isCompact ? 40 : 48;

    // Update local state when prop changes
    useEffect(() => {
        setLocalIsMaximized(isMaximized);
    }, [isMaximized]);

    // Adjust window size based on container dimensions
    useEffect(() => {
        const newWidth = Math.min(900, containerWidth * 0.85);
        const newHeight = Math.min(650, (containerHeight - taskbarHeight) * 0.85);
        setWindowSize({ width: newWidth, height: newHeight });
    }, [containerWidth, containerHeight, taskbarHeight]);

    // Handle window focus when clicked
    useEffect(() => {
        const handleWindowClick = () => {
            if (onBringToFront && !isActive) {
                onBringToFront();
            }
        };

        const windowElement = windowRef.current;
        if (windowElement) {
            windowElement.addEventListener('mousedown', handleWindowClick);
            return () => windowElement.removeEventListener('mousedown', handleWindowClick);
        }
    }, [onBringToFront, isActive]);

    const handleClose = (e) => {
        e.stopPropagation();
        if (onClose) onClose();
    };

    const handleMinimize = (e) => {
        e.stopPropagation();
        if (onMinimize) onMinimize();
    };

    const handleMouseDown = (e) => {
        // Don't allow dragging if maximized
        if (localIsMaximized) return;

        const windowElement = windowRef.current;
        if (!windowElement) return;

        const rect = windowElement.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
        
        // Bring to front immediately when starting to drag
        if (onBringToFront) {
            onBringToFront();
        }
        
        // Prevent text selection during drag
        e.preventDefault();
    };

    const toggleMaximize = (e) => {
        e.stopPropagation();
        
        if (localIsMaximized) {
            // Restore to previous position and size
            setLocalIsMaximized(false);
            setPosition(previousPosition);
        } else {
            // Save current position before maximizing
            setPreviousPosition(position);
            setLocalIsMaximized(true);
        }
        
        // Call parent handler if provided
        if (onMaximize) onMaximize();
    };

    useEffect(() => {
        if (!isDragging) return;

        const mouseMoveHandler = (e) => {
            // Don't allow dragging if maximized
            if (localIsMaximized) return;

            const windowElement = windowRef.current;
            if (!windowElement) return;

            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            // Get window dimensions for boundary checking
            const windowWidth = windowSize.width;
            const windowHeight = windowSize.height;

            // Calculate boundaries (accounting for taskbar height)
            const maxX = containerWidth - windowWidth;
            const maxY = containerHeight - windowHeight - taskbarHeight;

            const updatedPosition = {
                x: Math.min(Math.max(0, newX), maxX),
                y: Math.min(Math.max(0, newY), maxY)
            };

            setPosition(updatedPosition);
            
            // Update previous position for restore functionality
            if (!localIsMaximized) {
                setPreviousPosition(updatedPosition);
            }
        };

        const mouseUpHandler = () => {
            setIsDragging(false);
        };

        // Add event listeners to document to handle mouse movement outside window
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
    }, [isDragging, localIsMaximized, dragOffset, containerWidth, containerHeight, taskbarHeight, windowSize]);

    // Handle double-click on title bar to toggle maximize
    const handleTitleBarDoubleClick = (e) => {
        e.preventDefault();
        toggleMaximize(e);
    };

    if (!isOpen) return null;

    // Calculate window styles based on maximize state
    const windowStyle = localIsMaximized
        ? {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: `${taskbarHeight}px`,
            width: '100%',
            height: `calc(100% - ${taskbarHeight}px)`,
            zIndex: zIndex + 100
        }
        : {
            position: 'absolute',
            top: position.y,
            left: position.x,
            width: `${windowSize.width}px`,
            height: `${windowSize.height}px`,
            zIndex: zIndex
        };

    const handleWindowClick = (e) => {
        e.stopPropagation();
        // Bring to front when any part of window is clicked
        if (onBringToFront && !isActive) {
            onBringToFront();
        }
    };

    // Determine title bar styling based on active state
    const titleBarClasses = `
        ${isCompact ? 'h-8' : 'h-10'} rounded-t-lg flex items-center justify-between px-4 select-none 
        ${!localIsMaximized ? 'cursor-move' : 'cursor-default'}
        ${isActive 
            ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
            : 'bg-gradient-to-r from-gray-600 to-gray-500'
        }
    `.trim();

    // Add glow effect for active window
    const windowClasses = `
        bg-white dark:bg-zinc-800 rounded-lg shadow-2xl flex flex-col border overflow-hidden
        ${isActive 
            ? 'border-blue-500/50 shadow-blue-500/20' 
            : 'border-gray-600/50'
        }
    `.trim();

    const buttonSize = isCompact ? 'w-6 h-6' : 'w-7 h-7';
    const iconSize = isCompact ? 'w-4 h-4' : 'w-5 h-5';
    const textSize = isCompact ? 'text-xs' : 'text-sm';

    return (
        <div
            ref={windowRef}
            className={windowClasses}
            style={windowStyle}
            onClick={handleWindowClick}
        >
            {/* Window Title Bar */}
            <div
                className={titleBarClasses}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleTitleBarDoubleClick}
            >
                <div className="flex items-center gap-2">
                    {icon && <img src={icon} alt="" className={iconSize} />}
                    <span className={`text-white ${textSize} font-medium truncate`}>{title}</span>
                </div>
                
                <div className="flex items-center gap-1">
                    {/* Minimize Button */}
                    <button
                        onClick={handleMinimize}
                        className={`${buttonSize} flex items-center justify-center rounded hover:bg-yellow-500/80 transition-colors duration-150 group`}
                        title="Minimize"
                    >
                        <span className="text-white text-lg leading-none group-hover:text-black">−</span>
                    </button>
                    
                    {/* Maximize/Restore Button */}
                    <button
                        onClick={toggleMaximize}
                        className={`${buttonSize} flex items-center justify-center rounded hover:bg-green-500/80 transition-colors duration-150 group`}
                        title={localIsMaximized ? "Restore" : "Maximize"}
                    >
                        <span className="text-white text-sm leading-none group-hover:text-black">
                            {localIsMaximized ? "❐" : "□"}
                        </span>
                    </button>
                    
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className={`${buttonSize} flex items-center justify-center rounded hover:bg-red-500 transition-colors duration-150 group`}
                        title="Close"
                    >
                        <span className="text-white text-lg leading-none group-hover:text-white">×</span>
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-white dark:bg-zinc-800">
                {children}
            </div>

            {/* Window resize handle (bottom-right corner) */}
            {!localIsMaximized && (
                <div 
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                        background: 'linear-gradient(-45deg, transparent 40%, rgba(156, 163, 175, 0.5) 50%, transparent 60%)'
                    }}
                />
            )}
        </div>
    );
};

export default Window;