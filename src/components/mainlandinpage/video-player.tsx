'use client';

import  { useRef, useState } from "react";
import { Button } from "./button";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTION_CONTENT_DASHBOARD } from "./data";


// Helper function to format timestamp seconds into MM:SS
const formatTime = (timeInSeconds: number): string => {
  if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// CustomSlider component fallback matching styling needs
const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => (
  <input
    type="range"
    min={0}
    max={100}
    value={isNaN(value) ? 0 : value}
    onChange={(e) => onChange(Number(e.target.value))}
    className={cn(
      "h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/30 accent-white",
      className
    )}
  />
);

export const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number) => {
    if (!videoRef.current) return;

    const newVolume = value / 100;

    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;

    setProgress(isFinite(progress) ? progress : 0);
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (value: number) => {
    if (!videoRef.current || !videoRef.current.duration) return;

    const time = (value / 100) * videoRef.current.duration;

    if (isFinite(time)) {
      videoRef.current.currentTime = time;
      setProgress(value);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);

    if (!isMuted) {
      setVolume(0);
    } else {
      setVolume(1);
      videoRef.current.volume = 1;
    }
  };

  const setSpeed = (speed: number) => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  return (
    <>
      <div className="my-16 mt-3 flex flex-col items-center justify-center space-y-3 text-center tracking-tight md:my-24">
        <div className="w-fit gap-2 rounded-3xl border-[1.3px] border-[#D6D6D6] px-4 py-1 text-sm font-medium shadow-[0px_1px_2px_0px_#0000001A,0px_4px_4px_0px_#00000017,0px_9px_5px_0px_#0000000D,0px_16px_6px_0px_#00000003,0px_25px_7px_0px_#00000000] md:text-base">
          {SECTION_CONTENT_DASHBOARD.badge}
        </div>
        <h2 className="mb-2 max-w-3xl text-center text-3xl font-semibold text-black md:text-4xl lg:text-5xl">
          {SECTION_CONTENT_DASHBOARD.headline}
        </h2>
        <p className="w-72 px-1 text-center text-sm text-[#737373] md:w-[670px] md:text-base lg:text-lg">
          {SECTION_CONTENT_DASHBOARD.description}
        </p>
      </div>

      <div
        className="relative mx-auto w-full overflow-hidden rounded-xl bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full"
          src={src}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
        />

        {showControls && (
          <div className="absolute bottom-0 right-0 left-0 m-2 mx-auto max-w-xl rounded-2xl bg-[#11111198] p-4 backdrop-blur-md">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-white">
                {formatTime(currentTime)}
              </span>

              <CustomSlider
                value={progress}
                onChange={handleSeek}
                className="flex-1"
              />

              <span className="text-sm text-white">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="icon"
                  className="text-white transition hover:scale-105 hover:bg-[#111111d1] hover:text-white active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="icon"
                    className="text-white transition hover:scale-105 hover:bg-[#111111d1] hover:text-white active:scale-95"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : volume > 0.5 ? (
                      <Volume2 className="h-5 w-5" />
                    ) : (
                      <Volume1 className="h-5 w-5" />
                    )}
                  </Button>

                  <div className="w-24">
                    <CustomSlider
                      value={volume * 100}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {SECTION_CONTENT_DASHBOARD.playbackSpeeds.map((speed) => (
                  <Button
                    key={speed}
                    onClick={() => setSpeed(speed)}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-white transition hover:scale-105 hover:bg-[#111111d1] hover:text-white active:scale-95",
                      playbackSpeed === speed && "bg-[#111111d1]"
                    )}
                  >
                    {speed}{SECTION_CONTENT_DASHBOARD.speedSuffix}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};