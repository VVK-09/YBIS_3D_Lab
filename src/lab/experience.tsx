import { lazy, Suspense, useEffect, useState } from "react";
import { Overlay } from "./overlay";
import { useLab } from "./store";
import { CircularPreloader } from "./preloader";

const CanvasApp = lazy(() => import("./canvas"));

export function Experience() {
  const [mounted, setMounted] = useState(false);
  const phase = useLab((s) => s.phase);
  useEffect(() => setMounted(true), []);

  const isBlurred = phase !== "explore";

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-slate-900">
      <div
        className="h-full w-full"
        style={{
          filter: isBlurred ? "blur(24px) brightness(1.03) saturate(1.15)" : "none",
          transform: isBlurred ? "scale(1.06)" : "none",
          transition: "filter 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: isBlurred ? "filter, transform" : "auto",
        }}
      >
        {mounted ? (
          <Suspense fallback={null}>
            <CanvasApp />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-[#092244]" />
        )}
      </div>
      <Overlay />
      <CircularPreloader />
    </main>
  );
}
