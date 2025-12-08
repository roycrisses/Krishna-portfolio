import { useRef, useCallback, useEffect, useState } from 'react';

// Audio context singleton
let audioContext: AudioContext | null = null;

// Cached audio buffers
const audioBuffers: Map<string, AudioBuffer> = new Map();

// Sound effect definitions using Web Audio API synthesis
const createHoverSound = (ctx: AudioContext): AudioBuffer => {
    const sampleRate = ctx.sampleRate;
    const duration = 0.05;
    const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        // Soft high-frequency tick with quick decay
        data[i] = Math.sin(2 * Math.PI * 2000 * t) * Math.exp(-t * 80) * 0.15;
    }
    return buffer;
};

const createClickSound = (ctx: AudioContext): AudioBuffer => {
    const sampleRate = ctx.sampleRate;
    const duration = 0.1;
    const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        // Deeper click with resonance
        data[i] = (
            Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 40) * 0.2 +
            Math.sin(2 * Math.PI * 400 * t) * Math.exp(-t * 30) * 0.1
        );
    }
    return buffer;
};

const createTransitionSound = (ctx: AudioContext): AudioBuffer => {
    const sampleRate = ctx.sampleRate;
    const duration = 0.25;
    const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        // Swoosh sound - noise with filter sweep
        const noise = Math.random() * 2 - 1;
        const envelope = Math.sin(Math.PI * t / duration);
        const freq = 200 + t * 800;
        data[i] = (noise * 0.05 + Math.sin(2 * Math.PI * freq * t) * 0.1) * envelope * 0.15;
    }
    return buffer;
};

export type SoundName = 'hover' | 'click' | 'transition';

interface AudioManagerReturn {
    isMuted: boolean;
    isPlaying: boolean;
    toggleMute: () => void;
    playSound: (name: SoundName) => void;
    startBGM: () => void;
    stopBGM: () => void;
}

export const useAudioManager = (): AudioManagerReturn => {
    const [isMuted, setIsMuted] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('audio-muted') === 'true';
        }
        return true;
    });
    const [isPlaying, setIsPlaying] = useState(false);

    const bgmRef = useRef<HTMLAudioElement | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    // Initialize audio context on first user interaction
    const initAudioContext = useCallback(() => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

            // Create synthesized sounds
            audioBuffers.set('hover', createHoverSound(audioContext));
            audioBuffers.set('click', createClickSound(audioContext));
            audioBuffers.set('transition', createTransitionSound(audioContext));

            // Create gain node for volume control
            gainNodeRef.current = audioContext.createGain();
            gainNodeRef.current.connect(audioContext.destination);
            gainNodeRef.current.gain.value = 0.3;
        }
        return audioContext;
    }, []);

    // Play synthesized sound effect
    const playSound = useCallback((name: SoundName) => {
        if (isMuted) return;

        const ctx = initAudioContext();
        const buffer = audioBuffers.get(name);

        if (buffer && gainNodeRef.current) {
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(gainNodeRef.current);
            source.start(0);
        }
    }, [isMuted, initAudioContext]);

    // Background music controls
    const startBGM = useCallback(() => {
        initAudioContext();

        if (!bgmRef.current) {
            bgmRef.current = new Audio();
            // Using a royalty-free ambient track URL
            // This is a placeholder - in production, use a local file
            bgmRef.current.src = `${import.meta.env.BASE_URL}audio/bgm.mp3`;
            bgmRef.current.loop = true;
            bgmRef.current.volume = 0.08; // Very subtle
        }

        if (!isMuted) {
            bgmRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(console.log);
        }
    }, [isMuted, initAudioContext]);

    const stopBGM = useCallback(() => {
        if (bgmRef.current) {
            bgmRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const toggleMute = useCallback(() => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        localStorage.setItem('audio-muted', String(newMuted));

        if (bgmRef.current) {
            if (newMuted) {
                bgmRef.current.pause();
                setIsPlaying(false);
            } else {
                bgmRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(console.log);
            }
        }
    }, [isMuted]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (bgmRef.current) {
                bgmRef.current.pause();
                bgmRef.current = null;
            }
        };
    }, []);

    return {
        isMuted,
        isPlaying,
        toggleMute,
        playSound,
        startBGM,
        stopBGM,
    };
};

// Global audio manager instance for use outside React components
let globalAudioManager: AudioManagerReturn | null = null;

export const setGlobalAudioManager = (manager: AudioManagerReturn) => {
    globalAudioManager = manager;
};

export const getGlobalAudioManager = () => globalAudioManager;
