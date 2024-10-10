import { useEffect, useRef, useCallback } from 'react';

export function useSound(soundUrl: string) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const isLoadedRef = useRef<boolean>(false);

  const initAudioContext = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || 
        (window as any).webkitAudioContext)();
      try {
        const response = await fetch(soundUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;
        isLoadedRef.current = true;
        console.log('Sound loaded successfully');
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    }
  }, [soundUrl]);

  useEffect(() => {
    initAudioContext();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [initAudioContext]);

  const playSound = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (!audioContextRef.current || !audioBufferRef.current) {
        console.warn('Audio not ready yet');
        reject(new Error('Audio not ready'));
        return;
      }

      try {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start(0);
        console.log('Sound played');
        resolve();
      } catch (error) {
        console.error('Error playing sound:', error);
        reject(error);
      }
    });
  }, []);

  return playSound;
}