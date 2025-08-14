import React, { useState, useRef, useEffect } from 'react';

const Window = ({ title, icon, isOpen, onClose, onMinimize, onMaximize, children, isActive, zIndex = 10, initialPosition = { x: 100, y: 100 } }) => {
    const windowRef = useRef(null);
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);
    const [previousPosition, setPreviousPosition] = useState(initialPosition);

    const handleClose = (e) => {
        e.stopPropagation();
        if (onClose) onClose();
    };

    const handleMinimize = (e) => {
        e.stopPropagation();
        if (onMinimize) onMinimize();
    };

    const handleMouseDown = (e) => {
        if (isMaximized) return;

        const windowElement = windowRef.current;
        const rect = windowElement.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
    };

    const toggleMaximize = () => {
        if (isMaximized) {
            setIsMaximized(false);
            setPosition(previousPosition);
        } else {
            setPreviousPosition(position);
            setIsMaximized(true);
        }
        if (onMaximize) onMaximize();
    };

    useEffect(() => {
        if (!isDragging) return;

        const mouseMoveHandler = (e) => {
            if (isMaximized) return;

            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            const maxX = window.innerWidth - (windowRef.current?.offsetWidth || 800);
            const maxY = window.innerHeight - (windowRef.current?.offsetHeight || 600) - 64;

            const updatedPosition = {
                x: Math.min(Math.max(0, newX), maxX),
                y: Math.min(Math.max(0, newY), maxY)
            };

            setPosition(updatedPosition);
            setPreviousPosition(updatedPosition);
        };

        const mouseUpHandler = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
    }, [isDragging, isMaximized, dragOffset]);

    if (!isOpen) return null;

    const windowStyle = isMaximized
        ? {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: '64px',
            width: '100%',
            height: 'calc(100vh - 64px)',
            zIndex: zIndex + 100
        }
        : {
            position: 'absolute',
            top: position.y,
            left: position.x,
            width: '900px',
            height: '650px',
            zIndex: zIndex
        };

    const handleWindowClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            ref={windowRef}
            className="bg-zinc-800 rounded-lg shadow-lg flex flex-col"
            style={windowStyle}
            onClick={handleWindowClick}
        >
            {/* Window Title Bar */}
            <div
                className={`h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-t-lg flex items-center justify-between px-4 select-none cursor-move ${isActive ? 'from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800' : ''
                    }`}
                onMouseDown={handleMouseDown}
                onDoubleClick={toggleMaximize}
            >
                <div className="flex items-center gap-2">
                    {icon && <img src={icon} alt="" className="w-4 h-4" />}
                    <span className="text-white text-sm">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleMinimize}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700"
                    >
                        <span className="text-white">−</span>
                    </button>
                    <button
                        onClick={toggleMaximize}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-amber-400/25"
                    >
                        <span className="text-white">□</span>
                    </button>
                    <button
                        onClick={handleClose}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-600"
                    >
                        <span className="text-white">×</span>
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-white dark:bg-zinc-800">
                {children}
            </div>
        </div>
    );
};

export default Window;
