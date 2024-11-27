'use client';
import React, { useState, useEffect } from 'react';
import AbstractBall from '@/components/vapi/AbstractBall';
import useVapi from '@/hooks/use-vapi';
import { Button } from '@/components/ui/button';
import { MicIcon, PhoneOff } from 'lucide-react';

export const Glob: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall } = useVapi();
  const [config, setConfig] = useState({
    perlinTime: 50.0,
    perlinDNoise: 2.5,
    chromaRGBr: 7.5,
    chromaRGBg: 5,
    chromaRGBb: 7,
    chromaRGBn: 0,
    chromaRGBm: 1.0,
    sphereWireframe: false,
    spherePoints: false,
    spherePsize: 1.0,
    cameraSpeedY: 0.0,
    cameraSpeedX: 0.0,
    cameraZoom: 175,
    cameraGuide: false,
    perlinMorph: 5.5,
  });

  useEffect(() => {
    if (isSessionActive && volumeLevel > 0) {
      setConfig((prevConfig) => ({
        ...prevConfig,
        perlinTime: 25.0,
        perlinMorph: 10.0,
      }));
    } else {
      if (isSessionActive) {
        setConfig((prevConfig) => ({
          ...prevConfig,
          perlinTime: 25.0,
          perlinMorph: 10.0,
        }));
      } else {
        setConfig((prevConfig) => ({
          ...prevConfig,
          perlinTime: 5.0,
          perlinMorph: 0,
        }));
      }
    }
  }, [isSessionActive, volumeLevel]);

  return (
    <div className="relative w-[600px] h-[600px]">
      <div className="absolute inset-0">
        <AbstractBall {...config} />
      </div>
      <div className="absolute top-[250px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Button
          onClick={toggleCall}
          size="lg"
          className="rounded-full p-6 bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-300"
        >
          {isSessionActive ? (
            <PhoneOff className="w-6 h-6" />
          ) : (
            <MicIcon className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
};
