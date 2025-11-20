import React, { useEffect, useRef, useState } from 'react';
import { Icons } from './Icons';

interface LiveModeProps {
  isActive: boolean;
  onClose: () => void;
  audioBuffer: AudioBuffer | null; // Received from service
}

export const LiveMode: React.FC<LiveModeProps> = ({ isActive, onClose, audioBuffer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!isActive || !canvasRef.current || !audioBuffer) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple visualizer based on buffer data
    const data = audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / canvas.width);
    const amp = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    
    for (let i = 0; i < canvas.width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[i * step + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
    }
    
  }, [audioBuffer, isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center">
      <div className="absolute top-8 right-8">
        <button onClick={onClose} className="bg-surfaceHighlight p-3 rounded-full hover:bg-red-900/50 transition-colors text-red-500">
           <Icons.ZapOff className="w-6 h-6" />
        </button>
      </div>

      <div className="w-64 h-64 rounded-full bg-blue-500/10 animate-pulse-slow flex items-center justify-center relative">
         <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping opacity-20"></div>
         <div className="w-48 h-48 rounded-full bg-blue-500/20 blur-2xl"></div>
         <Icons.Mic className="w-16 h-16 text-blue-400 z-10" />
      </div>

      <div className="mt-12 h-24 w-full max-w-2xl px-8">
        <canvas ref={canvasRef} width={600} height={96} className="w-full h-full opacity-80" />
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-light text-white mb-2">Gemini Live</h2>
        <p className="text-gray-400">Listening & Speaking...</p>
      </div>
    </div>
  );
};