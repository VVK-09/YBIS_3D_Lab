import { create } from "zustand";
import { ZONES, type Zone } from "./config";

export type CamMode = "orbit" | "walk";
export type Phase = "boot" | "welcome" | "explore";

export type FlyTo = {
  position: [number, number, number];
  target: [number, number, number];
};

export const INITIAL_VIEW: FlyTo = {
  position: [0.6, 9.4, 11.2],
  target: [0, 0.55, -0.2],
};

type LabState = {
  phase: Phase;
  setPhase: (phase: Phase) => void;
  mode: CamMode;
  setMode: (mode: CamMode) => void;
  selected: number | null;
  hovered: number | null;
  setHovered: (id: number | null) => void;
  flyTo: FlyTo | null;
  clearFlyTo: () => void;
  resetView: () => void;
  select: (id: number | null) => void;
  closeCard: () => void;
  tourOn: boolean;
  startTour: () => void;
  stopTour: () => void;
  advanceTour: () => void;
  activeEquip: string | null;
  pulseEquip: (id: string) => void;
  stick: { x: number; y: number };
  setStick: (x: number, y: number) => void;
};

export const useLab = create<LabState>((set, get) => ({
  phase: "boot",
  setPhase: (phase) => set({ phase }),
  mode: "orbit",
  setMode: (mode) => set({ mode, flyTo: null }),
  selected: null,
  hovered: null,
  setHovered: (hovered) => set({ hovered }),
  flyTo: null,
  clearFlyTo: () => set({ flyTo: null }),
  resetView: () =>
    set({
      mode: "orbit",
      selected: null,
      tourOn: false,
      flyTo: { position: [0.6, 9.4, 11.2], target: [0, 0.55, -0.2] },
    }),
  select: (id) => {
    if (id == null) {
      set({ selected: null, flyTo: null });
      return;
    }
    const zone: Zone | undefined = ZONES.find((z) => z.id === id);
    if (!zone) return;
    set({
      selected: id,
      mode: "orbit",
      flyTo: { position: zone.view, target: zone.target },
    });
  },
  closeCard: () => set({ selected: null, tourOn: false }),
  tourOn: false,
  startTour: () => {
    const first = ZONES[0];
    set({
      tourOn: true,
      selected: first.id,
      mode: "orbit",
      phase: "explore",
      flyTo: { position: first.view, target: first.target },
    });
  },
  stopTour: () => set({ tourOn: false }),
  advanceTour: () => {
    const { selected, tourOn } = get();
    if (!tourOn) return;
    const idx = ZONES.findIndex((z) => z.id === selected);
    const next = ZONES[(idx + 1) % ZONES.length];
    set({
      selected: next.id,
      flyTo: { position: next.view, target: next.target },
    });
  },
  activeEquip: null,
  pulseEquip: (id) => set({ activeEquip: id }),
  stick: { x: 0, y: 0 },
  setStick: (x, y) => set({ stick: { x, y } }),
}));
