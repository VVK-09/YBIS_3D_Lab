import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  Footprints,
  MapPinned,
  Maximize2,
  Phone,
  Play,
  LayoutGrid,
  RotateCcw,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_URL, ROOM, SCHOOL, TAGLINE, ZONES } from "./config";
import { useLab } from "./store";

export function Overlay() {
  const phase = useLab((s) => s.phase);
  const setPhase = useLab((s) => s.setPhase);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (useLab.getState().phase === "boot") setPhase("welcome");
    }, 900);
    return () => window.clearTimeout(t);
  }, [setPhase]);

  return (
    <>
      {phase !== "explore" && (
        <div
          className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center p-3.5 sm:p-6 md:p-8 overflow-hidden select-none transition-all duration-500"
          style={{
            backgroundColor: "rgba(241, 245, 249, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Ambient soft luminous glows behind the card - strictly clipped to avoid overflow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -left-32 size-96 rounded-full bg-sky-300/25 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-sky-200/30 blur-3xl" />

            {/* Architectural subtle blueprint grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(#092244 1px, transparent 1px), linear-gradient(90deg, #092244 1px, transparent 1px)`,
                backgroundSize: "36px 36px",
              }}
            />
          </div>

          {/* Centered Premium Frosted Glass Card */}
          <div className="relative my-auto flex w-full max-w-xl flex-col items-center rounded-3xl border border-white/80 bg-white/92 p-5 sm:p-8 md:p-9 text-center shadow-[0_25px_60px_-15px_rgba(9,34,68,0.14),0_10px_20px_-5px_rgba(9,34,68,0.06)] backdrop-blur-2xl transition-all max-h-[96dvh] sm:max-h-[92dvh] overflow-y-auto overflow-x-hidden scrollbar-none">
            {/* Co-Branded Dual Logo Header in an elegant recessed badge */}
            <div className="mb-4 sm:mb-6 flex items-center justify-center gap-3.5 sm:gap-6 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-2.5 sm:px-6 sm:py-3.5 shadow-inner">
              <img
                src="/brand/logo.png"
                alt="AVP FutureTech"
                className="h-8.5 w-auto sm:h-12 md:h-13 object-contain drop-shadow-xs transition-transform hover:scale-105"
              />
              <div className="h-7 w-px bg-slate-200 sm:h-10" />
              <img
                src="/brand/school-logo-dark.png"
                alt={SCHOOL.name}
                className="h-7.5 w-auto sm:h-11 md:h-12 object-contain drop-shadow-xs transition-transform hover:scale-105"
              />
            </div>

            {/* Academic Collaboration Badge */}
            <div className="mb-2.5 sm:mb-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-sky-200/80 bg-gradient-to-r from-sky-50 to-blue-50/80 px-3 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider text-sky-800 uppercase shadow-xs">
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-1.5 rounded-full bg-sky-500 animate-pulse" />
                Academic Partnership
              </span>
              <span className="text-sky-300">•</span>
              <span className="text-slate-600 font-medium">{SCHOOL.affiliation}</span>
            </div>

            <h1 className="font-display text-xl font-extrabold tracking-tight text-[#092244] sm:text-3xl md:text-[34px] leading-tight">
              {SCHOOL.name}
            </h1>
            <p className="mt-1 sm:mt-1.5 font-display text-xs sm:text-base font-bold text-sky-600 tracking-wide">
              FutureTech Innovation Hub & AI Robotics Lab
            </p>
            <p className="mt-2 sm:mt-2.5 max-w-md text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
              Hands-on Learning · Real-World Skills · Innovation & Creativity · Future Ready
            </p>

            {phase === "boot" ? (
              <div className="mt-6 sm:mt-7 flex flex-col items-center gap-2">
                <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200">
                  <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-sky-500 to-blue-600" />
                </div>
                <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">Preparing 3D Lab...</span>
              </div>
            ) : (
              <div className="mt-5 sm:mt-7 flex w-full max-w-md flex-col gap-3 sm:gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setPhase("explore")}
                  className="group flex h-14 sm:h-12 w-full flex-1 items-center justify-center gap-2.5 sm:gap-2 rounded-2xl sm:rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 px-6 sm:px-5 font-display text-base sm:text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-sky-500/40 hover:brightness-105 active:scale-[0.98]"
                >
                  <Compass className="size-5 sm:size-4 transition-transform duration-300 group-hover:rotate-45" />
                  <span>Enter 3D Lab</span>
                  <ArrowRight className="size-5 sm:size-4 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => useLab.getState().startTour()}
                  className="group flex h-14 sm:h-12 w-full flex-1 items-center justify-center gap-2.5 sm:gap-2 rounded-2xl sm:rounded-xl border border-slate-200/90 bg-white/90 px-5 sm:px-4 font-display text-base sm:text-sm font-bold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
                >
                  <div className="grid size-6 sm:size-5 place-items-center rounded-full bg-sky-50 text-sky-600 group-hover:bg-sky-100 transition-colors">
                    <Play className="size-3 sm:size-2.5 fill-sky-600 ml-0.5" />
                  </div>
                  <span>Guided Tour</span>
                </button>
              </div>
            )}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-500">
              <span className="rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 font-medium shadow-2xs">
                10 Specialized Zones
              </span>
              <span className="rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 font-medium shadow-2xs">
                30–40 Students
              </span>
              <span className="rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 font-medium shadow-2xs">
                500–700 sq. ft.
              </span>
              <span className="rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 font-medium shadow-2xs">
                {SCHOOL.estd}
              </span>
            </div>
          </div>
        </div>
      )}
      {phase === "explore" && <Hud />}
    </>
  );
}

function Hud() {
  const mode = useLab((s) => s.mode);
  const setMode = useLab((s) => s.setMode);
  const selected = useLab((s) => s.selected);
  const select = useLab((s) => s.select);
  const closeCard = useLab((s) => s.closeCard);
  const tourOn = useLab((s) => s.tourOn);
  const startTour = useLab((s) => s.startTour);
  const stopTour = useLab((s) => s.stopTour);
  const resetView = useLab((s) => s.resetView);
  const zone = ZONES.find((z) => z.id === selected) ?? null;
  const [navMinimized, setNavMinimized] = useState(false);

  useEffect(() => {
    if (!tourOn) return;
    const t = window.setInterval(() => useLab.getState().advanceTour(), 5200);
    return () => window.clearInterval(t);
  }, [tourOn]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") closeCard();
      if (e.key === "r" || e.key === "R") resetView();
      const n = Number(e.key);
      if (n >= 1 && n <= 9) select(n);
      if (e.key === "0") select(10);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCard, select, resetView]);

  return (
    <>
      {/* Top Left: Mode & Navigation Controls */}
      <div className="pointer-events-auto absolute top-3 left-3 z-20 flex flex-col gap-2 sm:top-4 sm:left-4">
        <Button variant={mode === "orbit" ? "primary" : "ghost"} size="sm" onClick={() => setMode("orbit")}>
          <Compass className="size-3.5" />
          Overview
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetView}
          title="Reset to ideal starting camera state (Key: R)"
          className="border border-border/40 hover:border-sky/50 hover:bg-sky/10"
        >
          <RotateCcw className="size-3.5 text-sky" />
          Reset View
        </Button>
        <Button variant={mode === "walk" ? "primary" : "ghost"} size="sm" onClick={() => setMode("walk")}>
          <Footprints className="size-3.5" />
          Walk
        </Button>
        <Button variant={tourOn ? "solid" : "ghost"} size="sm" onClick={() => (tourOn ? stopTour() : startTour())}>
          <Play className="size-3.5" />
          {tourOn ? "Stop tour" : "Tour"}
        </Button>
        <FloorPlanButton />
      </div>

      {/* Top Right: Floor Plan Minimap */}
      <Minimap topOffsetClass="top-3 sm:top-4" />

      {/* Bottom Center: Primary Navigation Bar */}
      <nav className="pointer-events-none absolute inset-x-0 bottom-2 z-30 p-2 sm:px-4 sm:bottom-3">
        {navMinimized ? (
          <div className="pointer-events-auto mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-navy/90 px-3.5 py-1.5 backdrop-blur-md shadow-2xl transition-all">
            <img src="/brand/white-logo.png" alt="AVP" className="h-4 w-auto" />
            <div className="h-3 w-px bg-white/20" />
            <img src="/brand/school-logo.png" alt="YBIS" className="h-3.5 w-auto" />
            <span className="font-display text-xs font-semibold text-fg">{SCHOOL.short} Innovation Hub</span>
            <button
              type="button"
              onClick={resetView}
              className="grid size-6 place-items-center rounded-full text-fg-muted hover:bg-white/10 hover:text-sky transition-colors"
              title="Reset View (R)"
              aria-label="Reset View"
            >
              <RotateCcw className="size-3" />
            </button>
            <button
              type="button"
              onClick={() => setNavMinimized(false)}
              className="grid size-6 place-items-center rounded-full text-fg-muted hover:bg-white/10 hover:text-fg transition-colors"
              title="Expand Navigation Bar"
              aria-label="Expand Navigation Bar"
            >
              <ChevronUp className="size-3.5" />
            </button>
          </div>
        ) : (
          <div className="pointer-events-auto mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-border bg-navy/90 px-3 py-1.5 backdrop-blur-md shadow-2xl sm:px-4 transition-all">
            <div className="hidden items-center gap-2 sm:flex shrink-0">
              <img src="/brand/white-logo.png" alt="AVP FutureTech" className="h-6 w-auto" />
              <div className="h-5 w-px bg-white/20" />
              <img src="/brand/school-logo.png" alt={SCHOOL.short} className="h-5 w-auto" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-sky uppercase truncate">
                  AVP FutureTech × {SCHOOL.short}
                </p>
                <span className="hidden text-[10px] text-fg-muted/70 lg:inline">· {SCHOOL.affiliation}</span>
              </div>
              <h1 className="truncate font-display text-xs font-semibold text-fg sm:text-sm">
                {SCHOOL.name} Innovation Hub
              </h1>
            </div>
            <div className="hidden items-center gap-1.5 md:flex">
              <Stat icon={<Users className="size-3.5" />} label="30–40 students" />
              <Stat icon={<Maximize2 className="size-3.5" />} label="500–700 sq. ft." />
            </div>
            <button
              type="button"
              onClick={resetView}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border/60 bg-white/5 px-2.5 font-display text-xs font-medium text-fg hover:border-sky/50 hover:bg-sky/10 transition-colors shrink-0"
              title="Reset View to initial 3D overview (Key: R)"
              aria-label="Reset View"
            >
              <RotateCcw className="size-3.5 text-sky" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-electric px-3 font-display text-xs font-semibold text-navy hover:bg-sky transition-colors shrink-0"
            >
              <Phone className="size-3.5" />
              <span className="hidden sm:inline">Book a Demo</span>
              <span className="sm:hidden">Demo</span>
            </a>
            <button
              type="button"
              onClick={() => setNavMinimized(true)}
              className="grid size-7 place-items-center rounded-md text-fg-muted hover:bg-white/10 hover:text-fg transition-colors shrink-0 ml-0.5"
              title="Minimize Navigation Bar"
              aria-label="Minimize Navigation Bar"
            >
              <ChevronDown className="size-3.5" />
            </button>
          </div>
        )}
      </nav>

      {/* Controls Guide (when zone card is closed) */}
      {!zone && (
        <div className="pointer-events-none absolute right-3 bottom-18 z-20 hidden w-48 rounded-md border border-border bg-navy/70 p-3 text-[11px] leading-relaxed text-fg-muted backdrop-blur-md sm:right-4 sm:bottom-20 sm:block">
          <p className="mb-1 font-display text-xs font-semibold text-fg">Controls</p>
          {mode === "orbit" ? "Drag to orbit · Scroll to zoom · Press R to reset view" : "WASD move · Drag to look · Press R to reset"}
          <p className="mt-1">Keys 1–0 jump to a zone.</p>
        </div>
      )}

      {mode === "walk" && <Joystick />}

      {/* Zone Detail Card */}
      {zone && <ZoneDetailCard zone={zone} onClose={closeCard} />}
    </>
  );
}

function ZoneDetailCard({ zone, onClose }: { zone: (typeof ZONES)[number]; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const select = useLab((s) => s.select);
  const pulseEquip = useLab((s) => s.pulseEquip);

  // Auto-collapse when switching zones so mobile 3D view stays clear and cinematic
  useEffect(() => {
    setExpanded(false);
  }, [zone.id]);

  const prevZone = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevId = zone.id === 1 ? ZONES.length : zone.id - 1;
    select(prevId);
  };

  const nextZone = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextId = (zone.id % ZONES.length) + 1;
    select(nextId);
  };

  return (
    <aside
      className="pointer-events-auto absolute inset-x-2.5 bottom-16 z-30 mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#092244]/90 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.12)_inset] backdrop-blur-2xl transition-all duration-300 select-none sm:inset-x-auto sm:right-4 sm:bottom-20 sm:w-[380px]"
    >
      {/* Top glowing accent line matching the zone's signature color */}
      <div
        className="absolute top-0 inset-x-4 h-[2px] rounded-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${zone.color}, transparent)`,
          boxShadow: `0 0 14px ${zone.color}`,
        }}
      />

      {/* Compact Interactive Header Bar (Never blocks view in mobile) */}
      <div className="p-2.5 sm:p-3.5">
        <div className="flex items-center justify-between gap-2">
          {/* Zone Badge + Title Info (Tap anywhere to expand/collapse) */}
          <div
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 active:opacity-85"
            onClick={() => setExpanded(!expanded)}
          >
            <span
              className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-xl font-display text-xs font-black text-white shadow-md transition-transform active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${zone.color}, #092244)`,
                boxShadow: `0 0 12px ${zone.color}60`,
              }}
            >
              {String(zone.id).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[10px] font-bold tracking-wider text-sky uppercase">
                  Zone {zone.id}
                </span>
                <span className="text-white/20 text-[9px]">•</span>
                <span className="text-[10px] font-medium text-slate-300">
                  {zone.equipment.length} Assets
                </span>
              </div>
              <h2 className="mt-0.5 truncate font-display text-xs sm:text-sm font-bold text-white">
                {zone.name}
              </h2>
            </div>
          </div>

          {/* Quick Zone Navigator Arrows (< and >) */}
          <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 p-0.5 shrink-0">
            <button
              type="button"
              onClick={prevZone}
              className="grid size-6 sm:size-7 place-items-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors active:scale-90"
              title="Previous Zone"
              aria-label="Previous Zone"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={nextZone}
              className="grid size-6 sm:size-7 place-items-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors active:scale-90"
              title="Next Zone"
              aria-label="Next Zone"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          {/* Expand/Collapse Toggle Button */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-all shrink-0 active:scale-95 ${
              expanded
                ? "border-sky-400/40 bg-sky-500/15 text-sky-300"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
            }`}
            title={expanded ? "Minimize card" : "View specifications"}
          >
            <span>{expanded ? "Less" : "Specs"}</span>
            {expanded ? (
              <ChevronDown className="size-3.5 text-sky-400" />
            ) : (
              <ChevronUp className="size-3.5" />
            )}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors shrink-0 active:scale-90"
            aria-label="Close Zone View"
            title="Close"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Collapsed State Single-Line Highlight (Mobile teaser) */}
        {!expanded && (
          <div
            className="mt-1.5 flex items-center justify-between gap-2 border-t border-white/8 pt-1.5 cursor-pointer sm:hidden"
            onClick={() => setExpanded(true)}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="size-1.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
              <p className="truncate text-[10px] text-slate-300 font-medium">
                {zone.equipment[0]}
              </p>
            </div>
            <span className="text-[10px] text-sky-400 font-semibold shrink-0 flex items-center gap-0.5">
              +{zone.equipment.length - 1} more
            </span>
          </div>
        )}
      </div>

      {/* Expanded Specifications & Equipment (Drawer reveal) */}
      {expanded && (
        <div className="border-t border-white/10 bg-black/25 p-3 sm:p-4 max-h-[46vh] sm:max-h-[360px] overflow-y-auto scrollbar-none transition-all">
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 font-normal">
            {zone.blurb}
          </p>

          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-sky-400 uppercase">
                Zone Hardware & Equipment ({zone.equipment.length})
              </span>
              <span className="text-[9px] text-slate-400">Tap to highlight in 3D</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {zone.equipment.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => pulseEquip(item)}
                  className="group flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-sm transition-all hover:border-sky-400/60 hover:bg-sky-500/15 hover:text-white active:scale-95 text-left"
                  title={`Highlight ${item}`}
                >
                  <MapPinned className="size-3 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-[240px] sm:max-w-[280px]">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

function Stat({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-[10px] bg-white/6 px-2.5 py-1.5 text-[11px] text-fg">
      <span className="text-sky">{icon}</span>
      {label}
    </div>
  );
}

function Minimap({ topOffsetClass = "top-16 sm:top-20" }: { topOffsetClass?: string }) {
  const selected = useLab((s) => s.selected);
  const select = useLab((s) => s.select);
  return (
    <div className={`pointer-events-auto absolute right-3 z-20 hidden rounded-md border border-border bg-navy/75 p-2 backdrop-blur-md transition-all ${topOffsetClass} sm:right-4 lg:block`}>
      <p className="mb-1.5 flex items-center gap-1 px-1 font-display text-[10px] tracking-wider text-sky uppercase">
        <RotateCcw className="size-3" /> Floor plan
      </p>
      <svg viewBox="0 0 208 148" className="h-32 w-44">
        <rect x="4" y="4" width="200" height="140" rx="6" fill="#0b1e3d" stroke="rgba(255,255,255,0.15)" />
        {ZONES.map((z) => {
          const x = ((z.pos[0] + ROOM.w / 2) / ROOM.w) * 190 + 9;
          const y = ((z.pos[2] + ROOM.d / 2) / ROOM.d) * 128 + 10;
          const on = selected === z.id;
          return (
            <g key={z.id} onClick={() => select(z.id)} className="cursor-pointer">
              <circle cx={x} cy={y} r={on ? 9 : 7.5} fill={z.color} stroke={on ? "#fff" : "none"} strokeWidth="2" />
              <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fill="#fff" fontFamily="Outfit, sans-serif">
                {z.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function FloorPlanButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <LayoutGrid className="size-3.5" />
        Plan
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4" onClick={() => setOpen(false)}>
          <div
            className="relative max-h-[90dvh] w-full max-w-5xl overflow-auto rounded-xl border border-border bg-navy p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-3 px-1">
              <p className="font-display text-sm font-semibold text-fg">AVP Innovation Hub · floor plan</p>
              <button type="button" className="grid size-9 place-items-center rounded-[10px] text-fg-muted hover:bg-white/8" onClick={() => setOpen(false)} aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
            <img src="/textures/floorplan.png" alt="AVP Innovation Hub lab floor plan with ten numbered zones" className="h-auto w-full rounded-md" />
          </div>
        </div>
      )}
    </>
  );
}

function Joystick() {
  const setStick = useLab((s) => s.setStick);
  const origin = useRef<{ x: number; y: number; id: number } | null>(null);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    origin.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, id: e.pointerId };
    move(e);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!origin.current) return;
    const dx = e.clientX - origin.current.x;
    const dy = e.clientY - origin.current.y;
    const m = Math.hypot(dx, dy);
    const r = 42;
    const k = m > r ? r / m : 1;
    setStick((dx * k) / r, (-dy * k) / r);
  };
  const up = () => {
    origin.current = null;
    setStick(0, 0);
  };

  return (
    <div
      className="pointer-events-auto absolute bottom-16 left-4 z-30 size-28 rounded-full border border-white/20 bg-navy/50 backdrop-blur-sm sm:hidden"
      onPointerDown={onDown}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      style={{ touchAction: "none" }}
    >
      <div className="absolute inset-8 rounded-full bg-white/20" />
    </div>
  );
}
