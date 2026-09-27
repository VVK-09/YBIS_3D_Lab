import * as THREE from "three";

function canvas(size: number) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("canvas");
  return { c, ctx };
}

function toTex(
  c: HTMLCanvasElement,
  opts?: { repeat?: number; wrap?: boolean; anisotropy?: number },
) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = opts?.anisotropy ?? 8;
  if (opts?.wrap !== false) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    const r = opts?.repeat ?? 1;
    t.repeat.set(r, r);
  }
  t.needsUpdate = true;
  return t;
}

export function makeTileTexture() {
  const { c, ctx } = canvas(512);
  ctx.fillStyle = "#d8dde4";
  ctx.fillRect(0, 0, 512, 512);
  const grout = 8;
  const tile = (512 - grout * 2) / 2;
  const colors = ["#e7ebf0", "#e2e6ec", "#eceff3", "#dfe4ea"];
  let i = 0;
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 2; x++) {
      ctx.fillStyle = colors[i++ % colors.length];
      const px = grout / 2 + x * (tile + grout);
      const py = grout / 2 + y * (tile + grout);
      ctx.fillRect(px, py, tile, tile);
      const g = ctx.createLinearGradient(px, py, px + tile, py + tile);
      g.addColorStop(0, "rgba(255,255,255,0.18)");
      g.addColorStop(1, "rgba(0,0,0,0.04)");
      ctx.fillStyle = g;
      ctx.fillRect(px, py, tile, tile);
    }
  }
  ctx.fillStyle = "#c5cbd4";
  ctx.fillRect(0, 252, 512, 8);
  ctx.fillRect(252, 0, 8, 512);
  return toTex(c, { repeat: 1, anisotropy: 8 });
}

export function makeWoodTexture() {
  const { c, ctx } = canvas(512);
  ctx.fillStyle = "#c4a06a";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 28; i++) {
    const y = i * 18 + (i % 3) * 2;
    ctx.strokeStyle = `rgba(96,64,32,${0.08 + (i % 5) * 0.03})`;
    ctx.lineWidth = 2 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 16) {
      ctx.lineTo(x, y + Math.sin(x * 0.04 + i) * 3);
    }
    ctx.stroke();
  }
  return toTex(c, { repeat: 2 });
}

export function makePegboardTexture() {
  const { c, ctx } = canvas(512);
  ctx.fillStyle = "#cfd6de";
  ctx.fillRect(0, 0, 512, 512);
  ctx.fillStyle = "#5b6570";
  for (let y = 18; y < 512; y += 28) {
    for (let x = 18; x < 512; x += 28) {
      ctx.beginPath();
      ctx.arc(x, y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return toTex(c, { repeat: 2 });
}

export function makeNetTexture() {
  const { c, ctx } = canvas(256);
  ctx.clearRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(220,230,240,0.85)";
  ctx.lineWidth = 2;
  const step = 16;
  for (let i = 0; i <= 256; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 256);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(256, i);
    ctx.stroke();
  }
  const t = toTex(c, { repeat: 10, wrap: true });
  t.premultiplyAlpha = true;
  return t;
}

export function makeVrMural() {
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 768;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 2048, 768);
  g.addColorStop(0, "#071a33");
  g.addColorStop(0.5, "#0b3a66");
  g.addColorStop(1, "#0ea5e9");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 2048, 768);
  ctx.strokeStyle = "rgba(56,189,248,0.22)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 18; i++) {
    const x = 80 + i * 110;
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x + 80, 200);
    ctx.lineTo(x - 20, 420);
    ctx.stroke();
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(x, 80 + (i % 5) * 90, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 96px Outfit, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("EXPLORE  ·  IMAGINE  ·  CREATE", 1024, 384);
  ctx.font = "500 28px Plus Jakarta Sans, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText("AVP INNOVATION HUB  ·  AR / VR ZONE", 1024, 500);
  return toTex(c, { wrap: false });
}

export function makeCadScreen() {
  const c = document.createElement("canvas");
  c.width = 1280;
  c.height = 720;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#1a1f28";
  ctx.fillRect(0, 0, 1280, 720);
  ctx.fillStyle = "#12151b";
  ctx.fillRect(0, 0, 56, 720);
  ctx.fillRect(0, 0, 1280, 36);
  ctx.fillStyle = "#0ea5e9";
  ctx.fillRect(0, 0, 1280, 3);
  ctx.strokeStyle = "#2a3340";
  ctx.lineWidth = 1;
  for (let x = 200; x < 1100; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 80);
    ctx.lineTo(x, 620);
    ctx.stroke();
  }
  for (let y = 80; y < 620; y += 32) {
    ctx.beginPath();
    ctx.moveTo(200, y);
    ctx.lineTo(1100, y);
    ctx.stroke();
  }
  ctx.save();
  ctx.translate(640, 360);
  ctx.strokeStyle = "#7dd3fc";
  ctx.lineWidth = 3;
  ctx.strokeRect(-90, -40, 180, 90);
  ctx.strokeRect(-70, -70, 140, 40);
  ctx.beginPath();
  ctx.moveTo(-90, -40);
  ctx.lineTo(-70, -70);
  ctx.lineTo(70, -70);
  ctx.lineTo(90, -40);
  ctx.stroke();
  ctx.fillStyle = "rgba(14,165,233,0.25)";
  ctx.fillRect(-90, -40, 180, 90);
  ctx.restore();
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "600 18px sans-serif";
  ctx.fillText("chassis_v3.step  ·  AVP CAD", 72, 24);
  ctx.fillStyle = "#64748b";
  ctx.font = "12px monospace";
  ctx.fillText("X 120.0   Y 64.0   Z 28.0 mm", 72, 700);
  return toTex(c, { wrap: false });
}

export function makeInnovationWall() {
  const c = document.createElement("canvas");
  c.width = 1600;
  c.height = 900;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#8b6914";
  ctx.fillRect(0, 0, 1600, 900);
  ctx.fillStyle = "#092244";
  ctx.fillRect(0, 0, 1600, 110);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 42px Outfit, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("AVP INNOVATION WALL", 800, 70);
  const cards = [
    { t: "Line Follower", c: "#1e63d6" },
    { t: "Weather IoT", c: "#0ea5e9" },
    { t: "Bionic Hand", c: "#38bdf8" },
    { t: "Rover Mk II", c: "#2563eb" },
    { t: "Smart Light", c: "#0284c7" },
    { t: "3D Chassis", c: "#0369a1" },
  ];
  cards.forEach((card, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 80 + col * 500;
    const y = 160 + row * 350;
    ctx.fillStyle = "#f4f1ea";
    ctx.fillRect(x, y, 440, 300);
    ctx.fillStyle = card.c;
    ctx.fillRect(x + 24, y + 24, 392, 180);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.arc(x + 220, y + 110, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#092244";
    ctx.font = "700 22px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(card.t, x + 220, y + 250);
    ctx.font = "500 13px sans-serif";
    ctx.fillStyle = "#5b6578";
    ctx.fillText("Student project  ·  AVP Innovation Hub", x + 220, y + 276);
  });
  return toTex(c, { wrap: false });
}

export function makeLaptopScreen(seed = 0) {
  const c = document.createElement("canvas");
  c.width = 640;
  c.height = 400;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, 640, 400);
  const lines = [
    "from machine import Pin, PWM",
    "import network, time",
    "",
    "wifi = network.WLAN(network.STA_IF)",
    "wifi.active(True)",
    "",
    "def follow_line(sensors):",
    "    left, right = sensors",
    "    if left and not right: turn(-1)",
    "    elif right and not left: turn(1)",
    "    else: drive(0.6)",
    "",
    "# AVP Innovation Hub  ·  kit " + (seed + 1),
  ];
  ctx.font = "14px ui-monospace, monospace";
  lines.forEach((line, i) => {
    ctx.fillStyle = line.startsWith("#")
      ? "#64748b"
      : line.includes("def")
        ? "#38bdf8"
        : "#d6e4f5";
    ctx.fillText(line, 24, 36 + i * 22);
  });
  return toTex(c, { wrap: false });
}

export function makeHotspotTexture(n: number, active: boolean, color = "#1e63d6") {
  const { c, ctx } = canvas(256);
  ctx.clearRect(0, 0, 256, 256);
  ctx.beginPath();
  ctx.arc(128, 128, 118, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(128, 128, 104, 0, Math.PI * 2);
  ctx.fillStyle = active ? "#092244" : color;
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 118px Outfit, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(n), 128, 140);
  return toTex(c, { wrap: false });
}

export function makeExploreMural() {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 1280;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 1280);
  g.addColorStop(0, "#071a33");
  g.addColorStop(1, "#0ea5e9");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 768, 1280);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 92px Outfit, sans-serif";
  ctx.fillText("EXPLORE", 384, 420);
  ctx.fillText("IMAGINE", 384, 640);
  ctx.fillText("CREATE", 384, 860);
  return toTex(c, { wrap: false });
}

export function makeDroneMat() {
  const { c, ctx } = canvas(512);
  ctx.fillStyle = "#0b3a66";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 10;
  ctx.strokeRect(18, 18, 476, 476);
  ctx.strokeRect(64, 64, 384, 384);
  ctx.beginPath();
  ctx.moveTo(256, 140);
  ctx.lineTo(300, 256);
  ctx.lineTo(256, 230);
  ctx.lineTo(212, 256);
  ctx.closePath();
  ctx.fillStyle = "#7dd3fc";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(256, 268, 22, 0, Math.PI * 2);
  ctx.fill();
  return toTex(c, { wrap: false });
}
