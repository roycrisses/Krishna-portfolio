import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioManager, setGlobalAudioManager } from '../hooks/useAudioManager';

const AudioControl: React.FC = () => {
    const audioManager = useAudioManager();
    const { isMuted, toggleMute, startBGM, playSound } = audioManager;
    const [isInitialized, setIsInitialized] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Set global manager for access from other components
    useEffect(() => {
        setGlobalAudioManager(audioManager);
    }, [audioManager]);

    const handleClick = () => {
        if (!isInitialized) {
            setIsInitialized(true);
            if (!isMuted) {
                startBGM();
            }
        }
        playSound('click');
        toggleMute();
        if (isMuted) {
            startBGM();
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        playSound('hover');
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            className="group hover-trigger"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            title={isMuted ? 'Turn on sound' : 'Turn off sound'}
        >
            <div
                className={`
          relative w-10 h-10 flex items-center justify-center rounded-full
          border transition-all duration-300
          ${isMuted
                        ? 'border-gray-600 bg-dark-surface/50'
                        : 'border-neon/50 bg-neon/10'
                    }
          ${isHovered ? 'scale-110' : 'scale-100'}
        `}
            >
                {/* Animated rings when playing */}
                {!isMuted && (
                    <>
                        <div className="absolute inset-0 rounded-full border border-neon/30 animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="absolute inset-[-4px] rounded-full border border-neon/20 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                    </>
                )}

                {isMuted ? (
                    <VolumeX
                        size={18}
                        className="text-gray-500 group-hover:text-white transition-colors duration-300"
                    />
                ) : (
                    <Volume2
                        size={18}
                        className="text-neon transition-colors duration-300"
                    />
                )}
            </div>

            {/* Tooltip */}
            <span
                className={`
          absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1
          text-[10px] uppercase tracking-wider whitespace-nowrap
          bg-dark-surface/90 border border-gray-700 rounded
          transition-all duration-300
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
        `}
            >
                {isMuted ? 'Sound Off' : 'Sound On'}
            </span>
        </button>
    );
};

export default AudioControl;
