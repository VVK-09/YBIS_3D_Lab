import { useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { useLab } from "./store";
import { SCHOOL } from "./config";

export function CircularPreloader() {
  const phase = useLab((s) => s.phase);
  const setPhase = useLab((s) => s.setPhase);
  const { progress: rawProgress, active } = useProgress();

  const [displayProgress, setDisplayProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [statusMsg, setStatusMsg] = useState("Initializing 3D Graphics Engine...");
  const animRef = useRef<number | null>(null);

  // Smoothly interpolate progress from 0 to 100%
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1400; // minimum 1.4s smooth intro loading curve

    const tick = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const timeProgress = Math.min(100, (elapsed / duration) * 100);

      // Take the max of natural asset loading progress and timed curve
      const target = Math.max(timeProgress, rawProgress || 0);

      setDisplayProgress((prev) => {
        const next = prev + (target - prev) * 0.15;
        if (next >= 99.5 && target >= 100) {
          return 100;
        }
        return Math.min(100, Math.max(prev, next));
      });

      if (elapsed < duration || (active && (rawProgress || 0) < 100)) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayProgress(100);
      }
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [rawProgress, active]);

  // Update status messages as progress advances
  useEffect(() => {
    if (displayProgress < 28) {
      setStatusMsg("Initializing 3D Environment & Shaders...");
    } else if (displayProgress < 60) {
      setStatusMsg("Loading High-Precision Robotics & Equipment...");
    } else if (displayProgress < 88) {
      setStatusMsg("Calibrating Workstations, Lighting & Sensors...");
    } else if (displayProgress < 100) {
      setStatusMsg("Finalizing Scene Optimization...");
    } else {
      setStatusMsg("3D Lab Ready!");
    }
  }, [displayProgress]);

  const [isFading, setIsFading] = useState(false);

  // When 100% reached, transition phase to 'welcome' and fade out
  useEffect(() => {
    if (displayProgress >= 100) {
      const holdTimer = setTimeout(() => {
        setIsFading(true);
        if (useLab.getState().phase === "boot") {
          setPhase("welcome");
        }
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, 550);
        return () => clearTimeout(hideTimer);
      }, 200);
      return () => clearTimeout(holdTimer);
    }
  }, [displayProgress, setPhase]);

  // Don't render once completely hidden
  if (!visible) return null;

  const radius = 80;
  const circumference = 2 * Math.PI * radius; // ~502.65
  const strokeDashoffset = circumference - (circumference * displayProgress) / 100;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050e1d] px-6 select-none transition-all duration-500 ease-out ${
        isFading
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* Background ambient lighting halos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[280px] rounded-full bg-blue-600/15 blur-[80px]" />
      </div>

      {/* Top Co-Branded Dual Logo Watermark */}
      <div className="relative mb-8 sm:mb-12 flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-md shadow-2xl">
        <img
          src="/brand/logo.png"
          alt="AVP FutureTech"
          className="h-7 sm:h-9 w-auto object-contain brightness-110 drop-shadow-sm"
        />
        <div className="h-6 w-px bg-white/20 sm:h-7" />
        <img
          src="/brand/school-logo.png"
          alt={SCHOOL.name}
          className="h-6.5 sm:h-8 w-auto object-contain brightness-110 drop-shadow-sm"
        />
      </div>

      {/* Main High-Tech Circular SVG Preloader */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing ambient glow ring behind the circle */}
        <div
          className="absolute rounded-full bg-sky-400/20 blur-xl transition-all duration-500"
          style={{
            width: `${160 + (displayProgress / 100) * 40}px`,
            height: `${160 + (displayProgress / 100) * 40}px`,
          }}
        />

        <svg
          className="size-52 sm:size-60 -rotate-90 transform drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]"
          viewBox="0 0 200 200"
        >
          <defs>
            {/* Vibrant Cyan-to-Sky Tech Gradient */}
            <linearGradient id="circleProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#00b4d8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Glowing Drop Filter */}
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Outermost Ambient Guide Track */}
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="rgba(56, 189, 248, 0.08)"
            strokeWidth="1.5"
          />

          {/* 2. Counter-Rotating Dashed Tech Ring */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(56, 189, 248, 0.22)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="animate-spin origin-center"
            style={{ animationDuration: "14s" }}
          />

          {/* 3. Main Background Circular Track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="8"
          />

          {/* 4. Active Progress Arc with Neon Gradient */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#circleProgressGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#cyanGlow)"
            className="transition-all duration-150 ease-out"
          />

          {/* 5. Inner Concentric Radar Ring */}
          <circle
            cx="100"
            cy="100"
            r="66"
            fill="none"
            stroke="rgba(56, 189, 248, 0.15)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        </svg>

        {/* Center Display: Percentage, Status & Core Pulse */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-sky-500" />
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-sky-300 uppercase">
              3D LAB
            </span>
          </div>

          <div className="flex items-baseline justify-center">
            <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {Math.round(displayProgress)}
            </span>
            <span className="ml-0.5 text-base sm:text-lg font-bold text-sky-400 font-display">
              %
            </span>
          </div>

          <span className="mt-1 text-[9px] font-mono tracking-widest text-slate-400 uppercase">
            {displayProgress >= 100 ? "READY" : "LOADING"}
          </span>
        </div>
      </div>

      {/* Dynamic Subtitle / Status Notification */}
      <div className="relative mt-8 sm:mt-10 flex flex-col items-center text-center max-w-sm">
        <p className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-sky-400 animate-pulse">
          {statusMsg}
        </p>

        {/* School Name & Location */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <h2 className="font-display text-xs sm:text-sm font-bold text-slate-200 tracking-wide">
            {SCHOOL.name}
          </h2>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 tracking-wider uppercase">
            CBSE STEM & AI Innovation Center · {SCHOOL.location}
          </span>
        </div>
      </div>
    </div>
  );
}
