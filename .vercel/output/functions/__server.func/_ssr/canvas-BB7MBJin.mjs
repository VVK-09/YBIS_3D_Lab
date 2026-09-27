import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react, a as useCursor, c as useThree, d as MeshStandardMaterial, f as RepeatWrapping, g as require_jsx_runtime, i as Billboard, m as Vector3, n as OrbitControls, o as Canvas, p as SRGBColorSpace, r as useTexture, s as useFrame, t as ContactShadows, u as CanvasTexture } from "../_libs/@react-three/drei+[...].mjs";
import { a as TABLE_LAYOUT, i as ROOM, n as useLab, o as ZONES, r as COLLIDERS } from "./routes-DOFSAObJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/canvas-BB7MBJin.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAVY = "#092244";
function Plant({ scale = 1 }) {
	const leaves = (0, import_react.useMemo)(() => [
		[
			.12,
			.42,
			.05,
			.7
		],
		[
			-.1,
			.38,
			-.08,
			.85
		],
		[
			.02,
			.5,
			-.1,
			1
		],
		[
			.08,
			.34,
			.12,
			.6
		],
		[
			-.12,
			.46,
			.06,
			.75
		]
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.08,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.09,
					.07,
					.16,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c07a4a",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.16,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.078,
					.078,
					.04,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#5a3a22" })]
			}),
			leaves.map(([x, y, z, s], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					y,
					z
				],
				scale: s,
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.11,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: i % 2 ? "#3f7a45" : "#2f6a3a",
					roughness: .8
				})]
			}, i))
		]
	});
}
function LogoPlate({ map, width = 1.7, aspect = 1.4 }) {
	const h = width / aspect;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [width, h] }), map ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		map,
		transparent: true,
		roughness: .3,
		metalness: .05,
		polygonOffset: true,
		polygonOffsetFactor: -1,
		polygonOffsetUnits: -1
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: NAVY })] });
}
function canvas(size) {
	const c = document.createElement("canvas");
	c.width = size;
	c.height = size;
	const ctx = c.getContext("2d");
	if (!ctx) throw new Error("canvas");
	return {
		c,
		ctx
	};
}
function toTex(c, opts) {
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = opts?.anisotropy ?? 8;
	if (opts?.wrap !== false) {
		t.wrapS = t.wrapT = RepeatWrapping;
		const r = opts?.repeat ?? 1;
		t.repeat.set(r, r);
	}
	t.needsUpdate = true;
	return t;
}
function makeTileTexture() {
	const { c, ctx } = canvas(512);
	ctx.fillStyle = "#d8dde4";
	ctx.fillRect(0, 0, 512, 512);
	const grout = 8;
	const tile = 248;
	const colors = [
		"#e7ebf0",
		"#e2e6ec",
		"#eceff3",
		"#dfe4ea"
	];
	let i = 0;
	for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
		ctx.fillStyle = colors[i++ % colors.length];
		const px = grout / 2 + x * 256;
		const py = grout / 2 + y * 256;
		ctx.fillRect(px, py, tile, tile);
		const g = ctx.createLinearGradient(px, py, px + tile, py + tile);
		g.addColorStop(0, "rgba(255,255,255,0.18)");
		g.addColorStop(1, "rgba(0,0,0,0.04)");
		ctx.fillStyle = g;
		ctx.fillRect(px, py, tile, tile);
	}
	ctx.fillStyle = "#c5cbd4";
	ctx.fillRect(0, 252, 512, 8);
	ctx.fillRect(252, 0, 8, 512);
	return toTex(c, {
		repeat: 1,
		anisotropy: 8
	});
}
function makePegboardTexture() {
	const { c, ctx } = canvas(512);
	ctx.fillStyle = "#cfd6de";
	ctx.fillRect(0, 0, 512, 512);
	ctx.fillStyle = "#5b6570";
	for (let y = 18; y < 512; y += 28) for (let x = 18; x < 512; x += 28) {
		ctx.beginPath();
		ctx.arc(x, y, 3.2, 0, Math.PI * 2);
		ctx.fill();
	}
	return toTex(c, { repeat: 2 });
}
function makeNetTexture() {
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
	const t = toTex(c, {
		repeat: 10,
		wrap: true
	});
	t.premultiplyAlpha = true;
	return t;
}
function makeCadScreen() {
	const c = document.createElement("canvas");
	c.width = 1280;
	c.height = 720;
	const ctx = c.getContext("2d");
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
function makeInnovationWall() {
	const c = document.createElement("canvas");
	c.width = 1600;
	c.height = 900;
	const ctx = c.getContext("2d");
	ctx.fillStyle = "#8b6914";
	ctx.fillRect(0, 0, 1600, 900);
	ctx.fillStyle = "#092244";
	ctx.fillRect(0, 0, 1600, 110);
	ctx.fillStyle = "#ffffff";
	ctx.font = "700 42px Outfit, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("AVP INNOVATION WALL", 800, 70);
	[
		{
			t: "Line Follower",
			c: "#1e63d6"
		},
		{
			t: "Weather IoT",
			c: "#0ea5e9"
		},
		{
			t: "Bionic Hand",
			c: "#38bdf8"
		},
		{
			t: "Rover Mk II",
			c: "#2563eb"
		},
		{
			t: "Smart Light",
			c: "#0284c7"
		},
		{
			t: "3D Chassis",
			c: "#0369a1"
		}
	].forEach((card, i) => {
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
function makeLaptopScreen(seed = 0) {
	const c = document.createElement("canvas");
	c.width = 640;
	c.height = 400;
	const ctx = c.getContext("2d");
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
		"# AVP Innovation Hub  ·  kit " + (seed + 1)
	];
	ctx.font = "14px ui-monospace, monospace";
	lines.forEach((line, i) => {
		ctx.fillStyle = line.startsWith("#") ? "#64748b" : line.includes("def") ? "#38bdf8" : "#d6e4f5";
		ctx.fillText(line, 24, 36 + i * 22);
	});
	return toTex(c, { wrap: false });
}
function makeHotspotTexture(n, active, color = "#1e63d6") {
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
function makeExploreMural() {
	const c = document.createElement("canvas");
	c.width = 768;
	c.height = 1280;
	const ctx = c.getContext("2d");
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
function makeDroneMat() {
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
var { w, d, h } = ROOM;
var wall = "#eef2f6";
function Room({ floorMap, logo, whiteLogo, schoolLogo, schoolLogoDark, coBrandedEntrance }) {
	const tile = (0, import_react.useMemo)(() => {
		const t = floorMap ?? makeTileTexture();
		t.wrapS = t.wrapT = RepeatWrapping;
		t.repeat.set(w / .62, d / .62);
		t.anisotropy = 8;
		return t;
	}, [floorMap]);
	const sign = (0, import_react.useMemo)(() => makeTitleSign(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w, d] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: tile,
				color: "#e8edf2",
				roughness: .28,
				metalness: .08
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				h / 2,
				-d / 2
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w, h] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: wall,
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-w / 2,
				h / 2,
				0
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [d, h] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: wall,
				roughness: .88
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				w / 2,
				h / 2,
				0
			],
			rotation: [
				0,
				-Math.PI / 2,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [d, h] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: wall,
				roughness: .88
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntranceWall, {
			whiteLogo,
			schoolLogo,
			coBrandedEntrance
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				2.76,
				-d / 2 + .03
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [5.2, .56] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: sign,
						transparent: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.015
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.76,
						.76,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f8fafc",
						roughness: .3,
						metalness: .1
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.008
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.8,
						.8,
						.01
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#38bdf8",
						emissive: "#38bdf8",
						emissiveIntensity: .85
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						0,
						0,
						.03
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoPlate, {
						map: schoolLogoDark,
						width: 1.55,
						aspect: 3.767
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				-5.5,
				0,
				3.55
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, { scale: 1.1 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				5.5,
				0,
				3.55
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, { scale: 1.05 })
		})
	] });
}
function EntranceWall({ whiteLogo, schoolLogo, coBrandedEntrance }) {
	const z = d / 2 - .12;
	const hh = 1.12;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-4.15,
				hh / 2,
				z
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				3.5,
				hh,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#dfe5ec",
				roughness: .7
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				4.15,
				hh / 2,
				z
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				3.5,
				hh,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#dfe5ec",
				roughness: .7
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				hh / 2,
				z
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.85,
				hh,
				.16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#092244",
				roughness: .45
			})]
		}),
		coBrandedEntrance ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				hh / 2,
				z + .085
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.72, 1.05] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: coBrandedEntrance,
				roughness: .25,
				metalness: .08,
				polygonOffset: true,
				polygonOffsetFactor: -1,
				polygonOffsetUnits: -1
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				0,
				.62,
				z + .09
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoPlate, {
				map: whiteLogo,
				width: 1.45,
				aspect: 1.4
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.135,
				z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w - .4,
				.03,
				.06
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7dd3fc",
				emissive: "#38bdf8",
				emissiveIntensity: 1.1,
				toneMapped: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				-1.65,
				0,
				z - .35
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, { scale: .85 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				1.65,
				0,
				z - .35
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, { scale: .8 })
		})
	] });
}
function makeTitleSign() {
	const c = document.createElement("canvas");
	c.width = 3072;
	c.height = 256;
	const ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 3072, 256);
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "#092244";
	ctx.font = "800 60px 'Outfit', sans-serif, system-ui";
	ctx.fillText("AVP INNOVATION HUB", 620, 95);
	ctx.fillStyle = "#0284c7";
	ctx.font = "600 26px 'Plus Jakarta Sans', sans-serif, system-ui";
	ctx.fillText("CENTER FOR ADVANCED RESEARCH", 620, 175);
	ctx.textAlign = "center";
	ctx.fillStyle = "#092244";
	ctx.font = "800 58px 'Outfit', sans-serif, system-ui";
	ctx.fillText("FUTURE READY STEM LAB", 2452, 95);
	ctx.fillStyle = "#0284c7";
	ctx.font = "600 28px 'Plus Jakarta Sans', sans-serif, system-ui";
	ctx.fillText("LEARN · BUILD · EXPERIMENT · INNOVATE", 2452, 175);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 8;
	tex.needsUpdate = true;
	return tex;
}
function Lights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#b7c4d4"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#b7c4d4",
				18,
				38
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#fff4e6",
			"#8aa0b8",
			.55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .34 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				2.5,
				8.2,
				6.2
			],
			intensity: 1.25,
			castShadow: true,
			"shadow-mapSize": [1024, 1024],
			"shadow-bias": -2e-4,
			"shadow-camera-near": 1,
			"shadow-camera-far": 28,
			"shadow-camera-left": -10,
			"shadow-camera-right": 10,
			"shadow-camera-top": 10,
			"shadow-camera-bottom": -10
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-4.2,
				2.3,
				-3.4
			],
			color: "#ffe7b8",
			intensity: .5,
			distance: 5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				2.4,
				2.2,
				-3.4
			],
			color: "#38bdf8",
			intensity: .75,
			distance: 4.5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				4.8,
				2.2,
				-2.4
			],
			color: "#7dd3fc",
			intensity: .4,
			distance: 4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-4.3,
				2,
				2.5
			],
			color: "#f9a8d4",
			intensity: .35,
			distance: 3.5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				2.9,
				2.2
			],
			color: "#fff7ed",
			intensity: .4,
			distance: 7
		})
	] });
}
function createTextCanvas$9(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makeVisionAiScreenTexture() {
	return createTextCanvas$9(1280, 720, (ctx, w, h) => {
		ctx.fillStyle = "#060a14";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "rgba(14, 165, 233, 0.12)";
		ctx.lineWidth = 1;
		for (let x = 0; x < w; x += 40) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
		}
		for (let y = 0; y < h; y += 40) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(0, 0, w, 56);
		ctx.strokeStyle = "#0284c7";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, 56);
		ctx.lineTo(w, 56);
		ctx.stroke();
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 20px 'Outfit', sans-serif, system-ui";
		ctx.fillText("AVP VISION AI · YASHWANTRAO BHONSALE INTL SCHOOL", 28, 36);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 13px monospace";
		ctx.fillText("● YBIS NODE-01", 600, 36);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "13px monospace";
		ctx.fillText("60 FPS · CBSE 1130979 · GPU 38%", 750, 36);
		const vpX = 28;
		const vpY = 80;
		const vpW = 800;
		const vpH = 520;
		ctx.fillStyle = "#0a101f";
		ctx.fillRect(vpX, vpY, vpW, vpH);
		ctx.strokeStyle = "#1e293b";
		ctx.lineWidth = 2;
		ctx.strokeRect(vpX, vpY, vpW, vpH);
		ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
		ctx.lineWidth = 1.5;
		ctx.strokeRect(68, 120, 720, 440);
		const b1X = 108;
		const b1Y = 150;
		const b1W = 220;
		const b1H = 400;
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 3;
		ctx.strokeRect(b1X, b1Y, b1W, b1H);
		ctx.lineWidth = 5;
		[
			[
				b1X,
				b1Y,
				20,
				0,
				0,
				20
			],
			[
				328,
				b1Y,
				-20,
				0,
				0,
				20
			],
			[
				b1X,
				550,
				20,
				0,
				0,
				-20
			],
			[
				328,
				550,
				-20,
				0,
				0,
				-20
			]
		].forEach(([x, y, dx1, dy1, dx2, dy2]) => {
			ctx.beginPath();
			ctx.moveTo(x + dx1, y + dy1);
			ctx.lineTo(x, y);
			ctx.lineTo(x + dx2, y + dy2);
			ctx.stroke();
		});
		ctx.fillStyle = "#0284c7";
		ctx.fillRect(b1X, 124, 150, 26);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 13px monospace";
		ctx.fillText("PERSON: 98.4%", 116, 142);
		ctx.fillStyle = "#22c55e";
		const keypoints = [
			[218, 190],
			[218, 240],
			[168, 260],
			[268, 260],
			[148, 340],
			[288, 340],
			[138, 410],
			[298, 400],
			[188, 380],
			[248, 380]
		];
		keypoints.forEach(([kx, ky]) => {
			ctx.beginPath();
			ctx.arc(kx, ky, 5, 0, Math.PI * 2);
			ctx.fill();
		});
		ctx.strokeStyle = "rgba(34, 197, 94, 0.7)";
		ctx.lineWidth = 2.5;
		ctx.beginPath();
		ctx.moveTo(keypoints[0][0], keypoints[0][1]);
		ctx.lineTo(keypoints[1][0], keypoints[1][1]);
		ctx.lineTo(keypoints[2][0], keypoints[2][1]);
		ctx.lineTo(keypoints[4][0], keypoints[4][1]);
		ctx.lineTo(keypoints[6][0], keypoints[6][1]);
		ctx.moveTo(keypoints[1][0], keypoints[1][1]);
		ctx.lineTo(keypoints[3][0], keypoints[3][1]);
		ctx.lineTo(keypoints[5][0], keypoints[5][1]);
		ctx.lineTo(keypoints[7][0], keypoints[7][1]);
		ctx.stroke();
		const b2X = 468;
		const b2Y = 260;
		const b2W = 280;
		const b2H = 260;
		ctx.strokeStyle = "#f97316";
		ctx.lineWidth = 3;
		ctx.strokeRect(b2X, b2Y, b2W, b2H);
		ctx.fillStyle = "#ea580c";
		ctx.fillRect(b2X, 234, 185, 26);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 13px monospace";
		ctx.fillText("BIONIC_ARM: 96.1%", 476, 252);
		ctx.strokeStyle = "rgba(249, 115, 22, 0.6)";
		ctx.lineWidth = 2;
		for (let f = 0; f < 5; f++) {
			ctx.beginPath();
			ctx.moveTo(608, 440);
			ctx.lineTo(528 + f * 40, 320);
			ctx.stroke();
		}
		const sbX = 850;
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(sbX, vpY, 400, vpH);
		ctx.strokeStyle = "#1e293b";
		ctx.strokeRect(sbX, vpY, 400, vpH);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
		ctx.fillText("DETECTION TELEMETRY", 870, 116);
		[
			[
				"STUDENT_RESEARCHER",
				"98.4%",
				"#38bdf8"
			],
			[
				"BIONIC_PROSTHETIC",
				"96.1%",
				"#f97316"
			],
			[
				"GESTURE_PINCH_ZOOM",
				"94.8%",
				"#22c55e"
			],
			[
				"FPV_DRONE_CHASSIS",
				"92.3%",
				"#a855f7"
			],
			[
				"SAFETY_EYEWEAR_OK",
				"99.1%",
				"#38bdf8"
			]
		].forEach(([label, conf, col], i) => {
			const dy = 150 + i * 52;
			ctx.fillStyle = "#1e293b";
			ctx.fillRect(870, dy, 360, 42);
			ctx.fillStyle = "#f8fafc";
			ctx.font = "bold 14px monospace";
			ctx.fillText(label, 882, dy + 26);
			ctx.fillStyle = col;
			ctx.font = "bold 15px monospace";
			ctx.fillText(conf, 1160, dy + 26);
		});
		ctx.fillStyle = "#1e293b";
		ctx.fillRect(870, 430, 360, 140);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
		ctx.fillText("STEREO DEPTH ESTIMATION MAP", 882, 455);
		const grad = ctx.createLinearGradient(882, 0, 1210, 0);
		grad.addColorStop(0, "#3b82f6");
		grad.addColorStop(.5, "#a855f7");
		grad.addColorStop(1, "#f43f5e");
		ctx.fillStyle = grad;
		ctx.fillRect(882, 470, 336, 85);
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(0, h - 50, w, 50);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "14px 'Outfit', sans-serif, system-ui";
		ctx.fillText("NEURAL BACKBONE: YOLOv11-LARGE · MEDIAPIPE MULTI-MODAL PIPELINE · STEREO RGB-D CAMERA", 28, h - 20);
	});
}
function makeZone1BannerTexture() {
	return createTextCanvas$9(1024, 256, (ctx, w, h) => {
		ctx.fillStyle = "#070d1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#00b4d8";
		ctx.lineWidth = 5;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#00b4d8";
		ctx.fillRect(8, 8, 14, h - 16);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 20px monospace";
		ctx.fillText("ZONE 01 // YBIS STEM & AI RESEARCH LAB", 38, 48);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 42px 'Outfit', sans-serif, system-ui";
		ctx.fillText("VISION AI & INTERACTIVE SMART WALL", 38, 104);
		ctx.fillStyle = "#93c5fd";
		ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
		ctx.fillText("YASHWANTRAO BHONSALE INTERNATIONAL SCHOOL · CBSE CURRICULUM", 38, 148);
		[
			{
				text: "● 60 FPS LIVE INFERENCE",
				color: "#4ade80",
				border: "#22c55e",
				x: 38,
				w: 275
			},
			{
				text: "● INTEL REALSENSE DEPTH",
				color: "#38bdf8",
				border: "#0284c7",
				x: 328,
				w: 295
			},
			{
				text: "● JETSON ORIN CLUSTER",
				color: "#fbbf24",
				border: "#f59e0b",
				x: 638,
				w: 260
			}
		].forEach((c) => {
			ctx.fillStyle = "#0c1930";
			ctx.fillRect(c.x, 172, c.w, 48);
			ctx.strokeStyle = c.border;
			ctx.lineWidth = 1.5;
			ctx.strokeRect(c.x, 172, c.w, 48);
			ctx.fillStyle = c.color;
			ctx.font = "bold 14px monospace";
			ctx.fillText(c.text, c.x + 16, 202);
		});
	});
}
function Zone1VisionAiShowcase({ map }) {
	const wallScreenTex = (0, import_react.useMemo)(() => makeVisionAiScreenTexture(), []);
	const bannerTex = (0, import_react.useMemo)(() => makeZone1BannerTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-4.15,
			0,
			-3.55
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.95,
					-.58
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.55,
						.95,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						roughness: .5
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.18,
						.015
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.3, .44] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: bannerTex,
						emissive: "#ffffff",
						emissiveMap: bannerTex,
						emissiveIntensity: .28,
						roughness: .45,
						polygonOffset: true,
						polygonOffsetFactor: -1,
						polygonOffsetUnits: -1
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.15,
					-.54
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							-.015
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.14,
							1.29,
							.01
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#00b4d8",
							emissive: "#00b4d8",
							emissiveIntensity: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						position: [
							0,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.1,
							1.25,
							.04
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0b1329",
							metalness: .85,
							roughness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.605,
							.021
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.06,
							.012,
							.004
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.605,
							.021
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.06,
							.012,
							.004
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-1.025,
							0,
							.021
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.012,
							1.22,
							.004
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							1.025,
							0,
							.021
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.012,
							1.22,
							.004
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							.022
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.02, 1.18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: map || wallScreenTex,
							emissive: "#ffffff",
							emissiveMap: map || wallScreenTex,
							emissiveIntensity: .4,
							roughness: .2,
							polygonOffset: true,
							polygonOffsetFactor: -2,
							polygonOffsetUnits: -2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.65,
							.04
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.26,
								.035,
								.04
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#1e293b",
								metalness: .8,
								roughness: .2
							})]
						}), [
							-.08,
							0,
							.08
						].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								x,
								0,
								.022
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.009,
								.009,
								.006,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#00b4d8",
								emissive: "#00b4d8",
								emissiveIntensity: .8
							})]
						}, i))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.05,
					0,
					.55
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.74,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.35,
							.045,
							.64
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .35,
							metalness: .04
						})]
					}),
					[
						[-.58, -.24],
						[.58, -.24],
						[-.58, .24],
						[.58, .24]
					].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							.36,
							z
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.045,
							.72,
							.045
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							roughness: .25
						})]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.15,
							.765,
							.04
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.3,
								.012,
								.22
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#cbd5e1",
								metalness: .85,
								roughness: .2
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								0,
								.01,
								-.1
							],
							rotation: [
								-.3,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.3,
									.19,
									.01
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1e293b" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									.006
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.28, .17] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0284c7",
									emissive: "#0284c7",
									emissiveIntensity: .6
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.42,
							.765,
							.04
						],
						castShadow: true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.03,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.16,
									.06,
									.16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									metalness: .7,
									roughness: .3
								})]
							}),
							Array.from({ length: 8 }).map((_, f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									-.05 + f * .014,
									.068,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.005,
									.018,
									.14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									metalness: .9
								})]
							}, f)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.04,
									.082
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.004,
									.004,
									.004,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#22c55e",
									emissive: "#22c55e",
									emissiveIntensity: 1
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.05,
					0,
					1.15
				],
				rotation: [
					0,
					Math.PI,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.46,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.42,
							.05,
							.42
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#334155",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.72,
							-.18
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.4,
							.45,
							.04
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#475569",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.23,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.03,
							.04,
							.44,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .8
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					1.15,
					0,
					.15
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.16,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.1,
						.08,
						.26,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f8fafc",
						roughness: .25
					})]
				}), [
					-.4,
					.2,
					.9,
					1.8,
					2.7
				].map((rot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.05 * Math.cos(rot),
						.35 + i * .04,
						.05 * Math.sin(rot)
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.065,
						8,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#16a34a",
						roughness: .5
					})]
				}, i))]
			})
		]
	});
}
function createTextCanvas$8(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makePrinterScreenTexture(printerName, modelName, progress, nozzleTemp, bedTemp, speedMode) {
	return createTextCanvas$8(512, 320, (ctx, w, h) => {
		ctx.fillStyle = "#070c18";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(0, 0, w, 44);
		ctx.fillStyle = "#00b4d8";
		ctx.font = "bold 15px monospace";
		ctx.fillText(`● ${printerName}`, 16, 28);
		ctx.fillStyle = "#64748b";
		ctx.font = "12px sans-serif";
		ctx.fillText("CHAMBER 36°C · 192.168.1.104 · Wi-Fi 5G", 220, 28);
		ctx.strokeStyle = "rgba(0, 180, 216, 0.35)";
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(14, 44);
		ctx.lineTo(w - 14, 44);
		ctx.stroke();
		ctx.fillStyle = "#0b1222";
		ctx.fillRect(16, 56, 170, 160);
		ctx.strokeStyle = "#1e293b";
		ctx.lineWidth = 2;
		ctx.strokeRect(16, 56, 170, 160);
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 2.5;
		ctx.beginPath();
		ctx.moveTo(40, 170);
		ctx.lineTo(145, 170);
		ctx.lineTo(165, 140);
		ctx.lineTo(70, 140);
		ctx.closePath();
		ctx.stroke();
		ctx.strokeRect(70, 105, 50, 35);
		ctx.fillStyle = "#f97316";
		ctx.fillRect(100, 85, 14, 20);
		ctx.strokeStyle = "#00b4d8";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(20, 130);
		ctx.lineTo(180, 130);
		ctx.stroke();
		ctx.fillStyle = "#e2e8f0";
		ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
		ctx.fillText(modelName, 16, 235);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "11px monospace";
		ctx.fillText("PLA-CF · 0.16mm HIGH QUALITY", 16, 252);
		const centerX = 330;
		const centerY = 135;
		const radius = 54;
		ctx.lineWidth = 9;
		ctx.strokeStyle = "#1e293b";
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
		ctx.stroke();
		ctx.strokeStyle = "#00b4d8";
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress / 100);
		ctx.stroke();
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 28px 'Outfit', sans-serif, system-ui";
		ctx.textAlign = "center";
		ctx.fillText(`${progress}%`, centerX, 141);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 11px monospace";
		ctx.fillText("PRINTING", centerX, 157);
		ctx.textAlign = "left";
		ctx.fillStyle = "#f1f5f9";
		ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
		ctx.fillText("ETA: 38m remaining", 250, 218);
		ctx.fillStyle = "#64748b";
		ctx.font = "11px monospace";
		ctx.fillText("Layer 184 / 248 · Z: 29.4mm", 250, 236);
		const yCards = 270;
		ctx.fillStyle = "#111c34";
		ctx.fillRect(16, yCards, 150, 40);
		ctx.fillStyle = "#f97316";
		ctx.font = "bold 13px monospace";
		ctx.fillText(`🔥 ${nozzleTemp}°C / 220°C`, 26, 295);
		ctx.fillStyle = "#111c34";
		ctx.fillRect(180, yCards, 150, 40);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 13px monospace";
		ctx.fillText(`♨️ ${bedTemp}°C / 60°C`, 190, 295);
		ctx.fillStyle = "#111c34";
		ctx.fillRect(344, yCards, 152, 40);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 13px monospace";
		ctx.fillText(`⚡ ${speedMode}`, 354, 295);
	});
}
function makeResinScreenTexture() {
	return createTextCanvas$8(400, 240, (ctx, w, h) => {
		ctx.fillStyle = "#09090b";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#18181b";
		ctx.fillRect(0, 0, w, 36);
		ctx.fillStyle = "#ea580c";
		ctx.font = "bold 14px monospace";
		ctx.fillText("● PHOTON MONO M5s · SLA RESIN", 14, 23);
		ctx.fillStyle = "#f4f4f5";
		ctx.font = "bold 32px 'Outfit', sans-serif, system-ui";
		ctx.fillText("64%", 24, 82);
		ctx.fillStyle = "#a1a1aa";
		ctx.font = "12px monospace";
		ctx.fillText("LAYER 780 / 1,220 · 50μm", 24, 104);
		ctx.fillText("RESIN: BIO-CLEAR EMERALD", 24, 124);
		ctx.fillStyle = "#27272a";
		ctx.fillRect(24, 140, w - 48, 8);
		ctx.fillStyle = "#ea580c";
		ctx.fillRect(24, 140, (w - 48) * .64, 8);
		ctx.fillStyle = "#e4e4e7";
		ctx.font = "13px monospace";
		ctx.fillText("EXPOSURE: 2.3s · LIFT: 8mm", 24, 175);
		ctx.fillText("ESTIMATED FINISH: 42 MIN", 24, 198);
		ctx.fillStyle = "#a855f7";
		ctx.fillText("UV 405nm LED ARRAY: 100% OK", 24, 222);
	});
}
function makeSlicerScreenTexture() {
	return createTextCanvas$8(1024, 512, (ctx, w, h) => {
		ctx.fillStyle = "#0c1017";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#161b22";
		ctx.fillRect(0, 0, w, 36);
		ctx.fillStyle = "#00b4d8";
		ctx.font = "bold 15px 'Outfit', sans-serif, system-ui";
		ctx.fillText("AVP SLICER STUDIO v2.4", 16, 24);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "13px sans-serif";
		ctx.fillText("File   Edit   Prepare   Preview   Device   Calibration", 220, 24);
		ctx.fillStyle = "#0284c7";
		ctx.fillRect(w - 130, 6, 115, 24);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 12px sans-serif";
		ctx.fillText("▶ SLICE & PRINT", w - 120, 22);
		ctx.fillStyle = "#111827";
		ctx.fillRect(0, 36, 230, h - 36);
		ctx.strokeStyle = "#1f2937";
		ctx.lineWidth = 1;
		ctx.strokeRect(0, 36, 230, h - 36);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
		ctx.fillText("PRINT SETTINGS", 16, 62);
		[
			["Printer:", "Bambu X1-Carbon 0.4 Nozzle"],
			["Plate Type:", "Textured PEI Spring Sheet"],
			["Filament:", "AVP PLA-CF (Matte Black)"],
			["Layer Height:", "0.16mm (Optimal)"],
			["Wall Loops:", "4 Perimeters"],
			["Infill Density:", "20% Gyroid"],
			["Print Speed:", "250 mm/s"],
			["Nozzle Temp:", "220°C"],
			["Bed Temp:", "60°C"]
		].forEach(([k, v], i) => {
			ctx.fillStyle = "#94a3b8";
			ctx.font = "11px sans-serif";
			ctx.fillText(k, 16, 88 + i * 22);
			ctx.fillStyle = "#f1f5f9";
			ctx.font = "bold 11px monospace";
			ctx.fillText(v, 16, 100 + i * 22);
		});
		ctx.fillStyle = "#0b1220";
		ctx.fillRect(12, 310, 206, 185);
		ctx.strokeStyle = "#0284c7";
		ctx.strokeRect(12, 310, 206, 185);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
		ctx.fillText("SLICING SUMMARY", 22, 332);
		ctx.fillStyle = "#e2e8f0";
		ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
		ctx.fillText("1h 38m", 22, 362);
		ctx.fillStyle = "#64748b";
		ctx.font = "11px sans-serif";
		ctx.fillText("Estimated Total Print Time", 22, 378);
		ctx.fillStyle = "#f1f5f9";
		ctx.font = "12px monospace";
		ctx.fillText("Filament: 48.2g · 16.1m", 22, 404);
		ctx.fillText("Material Cost: $1.45", 22, 424);
		ctx.fillText("Total Layers: 210", 22, 444);
		ctx.fillText("Toolpath: 1,842 segments", 22, 464);
		const vpX = 240;
		const vpY = 46;
		const vpW = w - 250;
		const vpH = h - 60;
		ctx.strokeStyle = "#1e293b";
		ctx.lineWidth = 1;
		for (let x = 260; x < vpX + vpW - 20; x += 35) {
			ctx.beginPath();
			ctx.moveTo(x, 86);
			ctx.lineTo(x, vpY + vpH - 40);
			ctx.stroke();
		}
		for (let y = 86; y < vpY + vpH - 40; y += 35) {
			ctx.beginPath();
			ctx.moveTo(260, y);
			ctx.lineTo(vpX + vpW - 20, y);
			ctx.stroke();
		}
		ctx.save();
		ctx.translate(vpX + vpW / 2 - 20, vpY + vpH / 2 + 10);
		ctx.strokeStyle = "#f97316";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.ellipse(0, 0, 160, 95, 0, 0, Math.PI * 2);
		ctx.stroke();
		ctx.strokeStyle = "#22c55e";
		ctx.lineWidth = 2.5;
		ctx.beginPath();
		ctx.ellipse(0, 0, 150, 86, 0, 0, Math.PI * 2);
		ctx.stroke();
		ctx.beginPath();
		ctx.ellipse(0, 0, 142, 79, 0, 0, Math.PI * 2);
		ctx.stroke();
		ctx.strokeStyle = "rgba(6, 182, 212, 0.75)";
		ctx.lineWidth = 1.8;
		for (let i = -110; i <= 110; i += 22) {
			ctx.beginPath();
			ctx.moveTo(i, -55);
			ctx.bezierCurveTo(i + 15, -20, i - 15, 20, i, 55);
			ctx.stroke();
		}
		ctx.fillStyle = "#ef4444";
		ctx.beginPath();
		ctx.arc(80, -30, 6, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#3b82f6";
		ctx.lineWidth = 1.5;
		ctx.setLineDash([4, 4]);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(80, -30);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
		const sliderX = w - 24;
		ctx.fillStyle = "#1e293b";
		ctx.fillRect(sliderX, 66, 10, vpH - 50);
		ctx.fillStyle = "#00b4d8";
		ctx.fillRect(sliderX - 2, 166, 14, 18);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 11px monospace";
		ctx.fillText("Z: 18.2mm", w - 85, 180);
		ctx.fillText("Layer 114", w - 85, 194);
		[
			["#f97316", "Outer Wall"],
			["#22c55e", "Inner Wall"],
			["#06b6d4", "Gyroid Infill"],
			["#eab308", "Support"],
			["#3b82f6", "Travel Move"]
		].forEach(([col, label], i) => {
			ctx.fillStyle = col;
			ctx.fillRect(260 + i * 115, 58, 12, 12);
			ctx.fillStyle = "#cbd5e1";
			ctx.font = "11px sans-serif";
			ctx.fillText(label, 278 + i * 115, 68);
		});
	});
}
function makeZone2BannerTexture() {
	return createTextCanvas$8(1024, 256, (ctx, w, h) => {
		ctx.fillStyle = "#070d1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#00b4d8";
		ctx.lineWidth = 5;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#00b4d8";
		ctx.fillRect(8, 8, 14, h - 16);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 20px monospace";
		ctx.fillText("ZONE 02 // RAPID PROTOTYPING & ADDITIVE LAB", 38, 48);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 42px 'Outfit', sans-serif, system-ui";
		ctx.fillText("3D PRINTING & DIGITAL FABRICATION", 38, 104);
		ctx.fillStyle = "#93c5fd";
		ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
		ctx.fillText("HIGH-SPEED CORE-XY FDM · SLA RESIN STATION · CAD & SLICING BENCH", 38, 148);
		[
			{
				text: "● 2 NODES PRINTING (74%)",
				color: "#4ade80",
				border: "#22c55e",
				x: 38,
				w: 275
			},
			{
				text: "● FILAMENT DRYBOX: 18% RH",
				color: "#38bdf8",
				border: "#0284c7",
				x: 328,
				w: 295
			},
			{
				text: "● BED CALIBRATION: OK",
				color: "#fbbf24",
				border: "#f59e0b",
				x: 638,
				w: 260
			}
		].forEach((c) => {
			ctx.fillStyle = "#0c1930";
			ctx.fillRect(c.x, 172, c.w, 48);
			ctx.strokeStyle = c.border;
			ctx.lineWidth = 1.5;
			ctx.strokeRect(c.x, 172, c.w, 48);
			ctx.fillStyle = c.color;
			ctx.font = "bold 14px monospace";
			ctx.fillText(c.text, c.x + 16, 202);
		});
	});
}
function makeDryboxOledTexture() {
	return createTextCanvas$8(256, 128, (ctx, w, h) => {
		ctx.fillStyle = "#020617";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#00b4d8";
		ctx.font = "bold 15px monospace";
		ctx.fillText("HEAT DRYBOX ACTIVE", 12, 26);
		ctx.strokeStyle = "rgba(0, 180, 216, 0.4)";
		ctx.lineWidth = 1;
		ctx.strokeRect(2, 2, w - 4, h - 4);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 28px monospace";
		ctx.fillText("18% RH", 12, 68);
		ctx.fillStyle = "#f97316";
		ctx.font = "bold 20px monospace";
		ctx.fillText("48.5 °C", 140, 68);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "12px monospace";
		ctx.fillText("DUAL SPOOL FEED · PT-FE LINKED", 12, 102);
	});
}
function BenchyBoatModel({ position, color = "#00b4d8", scale = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.015,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.075,
					.02,
					.045
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .4,
					metalness: .1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.045,
					.022,
					0
				],
				rotation: [
					0,
					0,
					-.4
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.035,
					.025,
					.042
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .4,
					metalness: .1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.01,
					.042,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.038,
					.035,
					.032
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.01,
					.062,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.044,
					.006,
					.036
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.005,
					.075,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.006,
					.006,
					.024,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.035,
					.03,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.012,
					.016,
					.038
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .4
				})]
			})
		]
	});
}
function FlagshipCoreXyPrinter({ position, phase = 0 }) {
	const toolheadRef = (0, import_react.useRef)(null);
	const [turbo, setTurbo] = (0, import_react.useState)(false);
	useFrame(({ clock }) => {
		if (!toolheadRef.current) return;
		const speed = turbo ? 3.5 : 1.6;
		const t = clock.elapsedTime * speed + phase;
		toolheadRef.current.position.x = Math.sin(t * 1.8) * .085;
		toolheadRef.current.position.z = Math.cos(t * 1.1) * .08;
		toolheadRef.current.position.y = .16 + Math.sin(t * .2) * .01;
	});
	const screenTex = (0, import_react.useMemo)(() => makePrinterScreenTexture("BAMBU X1-CARBON", "3D_BENCHY_SPEED.GCODE", turbo ? 92 : 74, 220, 60, turbo ? "LUDICROUS 166%" : "STANDARD 100%"), [turbo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		onClick: (e) => {
			e.stopPropagation();
			setTurbo((v) => !v);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.025,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.38,
					.05,
					.38
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					metalness: .65,
					roughness: .25
				})]
			}),
			[
				[-.175, -.175],
				[.175, -.175],
				[-.175, .175],
				[.175, .175]
			].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.23,
					z
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.028,
					.41,
					.028
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .8,
					roughness: .2
				})]
			}, i)),
			[-.18, .18].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					.23,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.008,
						.39,
						.33
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f8fafc",
						metalness: .1,
						roughness: .3
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x > 0 ? .003 : -.003,
						.04,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.006,
						.08,
						.14
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						roughness: .4,
						metalness: .5
					})]
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.23,
					-.18
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.33,
					.39,
					.008
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					metalness: .6,
					roughness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.3,
					-.185
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.045,
					.045,
					.008,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					metalness: .8,
					roughness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.44,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.38,
					.025,
					.38
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f1f5f9",
					metalness: .6,
					roughness: .25
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.455,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.33,
					.006,
					.33
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e0f2fe",
					transparent: true,
					opacity: .35,
					roughness: .05,
					metalness: .1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.23,
					.18
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.32,
					.38,
					.006
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e0f2fe",
					transparent: true,
					opacity: .16,
					roughness: .05,
					metalness: .1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.13,
					.23,
					.192
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.012,
					.16,
					.014
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0284c7",
					metalness: .9,
					roughness: .15
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.11,
					.485,
					.165
				],
				rotation: [
					-Math.PI / 6,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.14,
						.09,
						.014
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .4
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.008
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.132, .082] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: screenTex,
						emissive: "#ffffff",
						emissiveMap: screenTex,
						emissiveIntensity: .65,
						roughness: .15
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					.49,
					-.02
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.02,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.34,
							.04,
							.28
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							metalness: .6,
							roughness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.08,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.33,
							.09,
							.27
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e0f2fe",
							transparent: true,
							opacity: .25,
							roughness: .1
						})]
					}),
					[
						-.11,
						-.035,
						.035,
						.11
					].map((x, i) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								x,
								.07,
								0
							],
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.048,
									.048,
									.022,
									16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: [
										"#0f172a",
										"#00b4d8",
										"#f97316",
										"#f8fafc"
									][i],
									roughness: .4
								})]
							}), [-.012, .012].map((sy, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									sy,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.052,
									.052,
									.003,
									16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#e2e8f0",
									transparent: true,
									opacity: .6
								})]
							}, j))]
						}, i);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.005,
							.08
						],
						rotation: [
							.4,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.003,
							.003,
							.06,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f1f5f9",
							roughness: .2
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.42,
					.13
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.008,
					.015
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ffffff",
					emissive: "#ffffff",
					emissiveIntensity: 1.2,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					.38,
					0
				],
				color: "#e0f2fe",
				intensity: .9,
				distance: .6
			}),
			[-.13, .13].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					.23,
					-.12
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.005,
					.005,
					.38,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					metalness: .9,
					roughness: .15
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-.09,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.01,
						.01,
						.014,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f59e0b",
						metalness: .8,
						roughness: .2
					})]
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					.12,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.008,
							0
						],
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.26,
							.012,
							.26
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1e293b",
							metalness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.015,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.252,
							.002,
							.252
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#d97706",
							roughness: .7,
							metalness: .4
						})]
					}),
					[-.08, .08].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							.015,
							.13
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.02,
							.002,
							.01
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f59e0b" })]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchyBoatModel, {
						position: [
							0,
							.016,
							0
						],
						color: "#00b4d8",
						scale: 1.1
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: toolheadRef,
				position: [
					0,
					.24,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.04,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.32,
							.015,
							.015
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							metalness: .5,
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.015,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.055,
							.05,
							.055
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1e293b",
							metalness: .7,
							roughness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.015,
							.029
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.016,
							.016,
							.006,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#00b4d8",
							metalness: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.038,
							.028
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.035,
							.006,
							.004
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: turbo ? "#f97316" : "#22c55e",
							emissive: turbo ? "#f97316" : "#22c55e",
							emissiveIntensity: 1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.015,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.018,
							.012,
							.018
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .85
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.024,
							0
						],
						rotation: [
							Math.PI,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
							.006,
							.01,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f59e0b",
							metalness: .85,
							roughness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
						position: [
							0,
							-.025,
							0
						],
						color: "#f97316",
						intensity: .65,
						distance: .15
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.065,
							-.01
						],
						rotation: [
							.3,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.003,
							.003,
							.07,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f8fafc" })]
					})
				]
			})
		]
	});
}
function PrecisionResinPrinter({ position }) {
	const resinLcdTex = (0, import_react.useMemo)(() => makeResinScreenTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.07,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.26,
					.14,
					.26
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f8fafc",
					metalness: .45,
					roughness: .25
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					0,
					.07,
					.131
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.13, .075] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: resinLcdTex,
					emissive: "#ffffff",
					emissiveMap: resinLcdTex,
					emissiveIntensity: .65,
					roughness: .2
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.155,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.22,
					.028,
					.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .85,
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.165,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.2,
					.008,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#10b981",
					emissive: "#10b981",
					emissiveIntensity: .25,
					roughness: .1,
					metalness: .1,
					transparent: true,
					opacity: .8
				})]
			}),
			[-.105, .105].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.175,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.008,
					.008,
					.018,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0284c7",
					metalness: .9
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.32,
					-.09
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.065,
					.32,
					.045
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					metalness: .8,
					roughness: .2
				})]
			}),
			[-.018, .018].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.32,
					-.065
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.004,
					.004,
					.3,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f8fafc",
					metalness: .95,
					roughness: .1
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					.31,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.02,
							-.045
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.04,
							.025,
							.09
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .85
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.042,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.016,
							.016,
							.02,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#94a3b8",
							metalness: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.005,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.16,
							.01,
							.12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .9,
							roughness: .15
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							-.04,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
								.035,
								.012,
								12,
								24
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#10b981",
								emissive: "#10b981",
								emissiveIntensity: .4,
								transparent: true,
								opacity: .85,
								roughness: .1
							})]
						}), [-.025, .025].flatMap((x) => [-.02, .02].map((z, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								x,
								.025,
								z
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.0015,
								.0015,
								.035,
								6
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#34d399",
								transparent: true,
								opacity: .7
							})]
						}, `${x}-${z}`)))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.33,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.25,
					.36,
					.25
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#fb923c",
					transparent: true,
					opacity: .3,
					roughness: .06,
					metalness: .1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.52,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.06,
					.016,
					.025
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .7
				})]
			})
		]
	});
}
function SlicerWorkstation({ position }) {
	const slicerTex = (0, import_react.useMemo)(() => makeSlicerScreenTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.08,
					-.18
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.025,
					.03,
					.16,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .8,
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.22,
					-.14
				],
				rotation: [
					.4,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.025,
					.16,
					.025
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .85,
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					.3,
					-.06
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.54,
							.28,
							.02
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							roughness: .25,
							metalness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							.011
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.528, .268] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: slicerTex,
							emissive: "#ffffff",
							emissiveMap: slicerTex,
							emissiveIntensity: .65,
							roughness: .1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							-.012
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.48,
							.01,
							.006
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#00b4d8",
							emissive: "#00b4d8",
							emissiveIntensity: .8
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.005,
					.04
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.52,
					.006,
					.28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.05,
					.012,
					.05
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.26,
						.014,
						.1
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f8fafc",
						roughness: .3,
						metalness: .1
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.008,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.245,
						.004,
						.088
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#00b4d8",
						emissive: "#00b4d8",
						emissiveIntensity: .6
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.15,
					.016,
					.06
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.045,
					.02,
					.075
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f1f5f9",
					roughness: .3,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.26,
					.14,
					-.1
				],
				castShadow: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.11,
						.28,
						.22
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f8fafc",
						metalness: .4,
						roughness: .25
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.056,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.2, .25] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e0f2fe",
							transparent: true,
							opacity: .35
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.03,
							-.02
						],
						rotation: [
							0,
							Math.PI / 2,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.038,
							.005,
							8,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#00b4d8",
							emissive: "#00b4d8",
							emissiveIntensity: .9
						})]
					})
				]
			})
		]
	});
}
function MakerspaceToolPegboard({ position }) {
	const dryboxTex = (0, import_react.useMemo)(() => makeDryboxOledTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.7,
					.85,
					.015
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f1f5f9",
					roughness: .4,
					metalness: .15
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					.008
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.72,
					.87,
					.008
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .7,
					roughness: .2
				})]
			}),
			Array.from({ length: 14 }).map((_, col) => Array.from({ length: 6 }).map((_, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.75 + col * .115,
					-.32 + row * .13,
					.012
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.004,
					.004,
					.006,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					roughness: .4,
					metalness: .2
				})]
			}, `${col}-${row}`))),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.55,
					.14,
					.025
				],
				children: [[-.016, .016].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						.02,
						0
					],
					rotation: [
						0,
						0,
						i === 0 ? .25 : -.25
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.014,
						.09,
						.012
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0284c7",
						roughness: .4
					})]
				}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-.045,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.025,
						.035,
						.008
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .95,
						roughness: .15
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.32,
					.1,
					.025
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.024,
							.22,
							.006
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							metalness: .95,
							roughness: .15
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.02,
							.1,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.04,
							.016,
							.006
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							metalness: .95,
							roughness: .15
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.04,
							.006
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.045,
							.05,
							.012
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							roughness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.04,
							.013
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.035, .02] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: .6
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.12,
					.12,
					.025
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.06,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.018,
						.08,
						.014
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#854d0e",
						roughness: .6
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-.04,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.035,
						.11,
						.003
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .95,
						roughness: .1
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.1,
					.12,
					.025
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.07,
						.08,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#dc2626",
						roughness: .4
					})]
				}), [
					-.024,
					-.012,
					0,
					.012,
					.024
				].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						.03 + i * .008,
						.008
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.0025,
						.0025,
						.08 + i * .015,
						6
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0f172a",
						metalness: .8
					})]
				}, i))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.28,
					.13,
					.025
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.04,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.014,
						.09,
						.01
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-.03,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.02,
						.05,
						.012
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f59e0b",
						metalness: .7,
						roughness: .3
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.55,
					.08,
					.06
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							0
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.01,
							.01,
							.36,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#94a3b8",
							metalness: .9
						})]
					}),
					[-.17, .17].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							0,
							-.035
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.014,
							.04,
							.07
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#334155",
							metalness: .8
						})]
					}, i)),
					[
						-.1,
						0,
						.1
					].map((x, i) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								x,
								0,
								0
							],
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.065,
									.065,
									.042,
									18
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: [
										"#0f172a",
										"#f97316",
										"#84cc16"
									][i],
									roughness: .4
								})]
							}), [-.022, .022].map((sy, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									sy,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.072,
									.072,
									.004,
									18
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#cbd5e1",
									transparent: true,
									opacity: .65
								})]
							}, j))]
						}, i);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.55,
					-.22,
					.025
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.13,
					.08,
					.016
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#020617",
					roughness: .5
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.009
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.12, .07] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: dryboxTex,
						emissive: "#ffffff",
						emissiveMap: dryboxTex,
						emissiveIntensity: .5
					})]
				})]
			})
		]
	});
}
function PrintArtifactGalleryTower({ position }) {
	const planetaryRef = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		if (planetaryRef.current) planetaryRef.current.rotation.y += delta * 1.2;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			[
				[-.2, -.16],
				[.2, -.16],
				[-.2, .16],
				[.2, .16]
			].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.65,
					z
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.02,
					1.3,
					.02
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					metalness: .6,
					roughness: .25
				})]
			}, i)),
			[
				.12,
				.45,
				.8,
				1.15
			].map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					y,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					receiveShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.42,
						.015,
						.34
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#e0f2fe",
						transparent: true,
						opacity: .6,
						roughness: .15,
						metalness: .2
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-.01,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.4,
						.004,
						.32
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#00b4d8",
						emissive: "#00b4d8",
						emissiveIntensity: .7
					})]
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					-.09,
					1.17,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchyBoatModel, {
					position: [
						0,
						0,
						0
					],
					color: "#f97316",
					scale: 1.2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: planetaryRef,
				position: [
					.09,
					1.21,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
						.045,
						.01,
						10,
						20
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#38bdf8",
						roughness: .35
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.016,
					.016,
					.018,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0284c7" })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					-.08,
					.81,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.038,
						.022,
						.16,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#10b981",
						emissive: "#10b981",
						emissiveIntensity: .25,
						transparent: true,
						opacity: .8,
						roughness: .15
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					.08,
					.82,
					0
				],
				children: [
					-.04,
					-.02,
					0,
					.02,
					.04
				].map((z, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						Math.sin(k * .9) * .015,
						0,
						z
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.012 - k * .0015,
						.02,
						4,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#fbbf24",
						metalness: .85,
						roughness: .2
					})]
				}, k))
			}),
			[
				-.1,
				0,
				.1
			].map((x, idx) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						x,
						.47,
						0
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.045,
							.045,
							.045
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: [
								"#ef4444",
								"#3b82f6",
								"#22c55e"
							][idx],
							roughness: .4
						})]
					})
				}, idx);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					.14,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.015,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.26,
						.03,
						.18
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .5
					})]
				}), [
					-.08,
					-.03,
					.03,
					.08
				].map((x, idx) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							.035,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.018,
							.03,
							.12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: [
								"#f43f5e",
								"#0ea5e9",
								"#eab308",
								"#10b981"
							][idx],
							roughness: .3
						})]
					}, idx);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					0,
					.38
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.14,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.09,
							.075,
							.22,
							18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							roughness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.23,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.085,
							.085,
							.02,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#3f2e18",
							roughness: .9
						})]
					}),
					[
						-.6,
						0,
						.6,
						1.8,
						3.2
					].map((rot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						rotation: [
							.3,
							rot,
							-.2
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.06,
								.32 + i * .03,
								0
							],
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.055,
								6,
								6
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#15803d",
								roughness: .4
							})]
						})
					}, i))
				]
			})
		]
	});
}
function Zone2PrintShowcase() {
	const bannerTex = (0, import_react.useMemo)(() => makeZone2BannerTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-1.85,
			0,
			-3.55
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.85,
					-.58
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.55, 1.15] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f1f5f9",
							roughness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							.005
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.57, 1.17] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: .4,
							transparent: true,
							opacity: .35
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.28,
							.012
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.3, .44] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: bannerTex,
							emissive: "#ffffff",
							emissiveMap: bannerTex,
							emissiveIntensity: .28,
							roughness: .45
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MakerspaceToolPegboard, { position: [
				.05,
				1.15,
				-.57
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					0,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.05,
							.74,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.95,
							.045,
							.72
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .35,
							metalness: .04
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.05,
							.738,
							.36
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.94,
							.01,
							.008
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .8,
							roughness: .2
						})]
					}),
					[
						[-.85, -.3],
						[.95, -.3],
						[-.85, .3],
						[.95, .3]
					].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							x,
							.36,
							z
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.05,
								.72,
								.05
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#f8fafc",
								metalness: .25,
								roughness: .3
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-.36,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.035,
								.035,
								.015,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#cbd5e1",
								metalness: .9,
								roughness: .15
							})]
						})]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.05,
							.15,
							-.3
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.8,
							.03,
							.03
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .7,
							roughness: .3
						})]
					}),
					[-.85, .95].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							.15,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.03,
							.03,
							.58
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .7,
							roughness: .3
						})]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.05,
							.75,
							-.35
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.85,
							.01,
							.015
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: 1.4,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
						position: [
							.05,
							.85,
							-.32
						],
						color: "#38bdf8",
						intensity: .9,
						distance: 1.2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagshipCoreXyPrinter, {
						position: [
							-.42,
							.765,
							.02
						],
						phase: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrecisionResinPrinter, { position: [
						.16,
						.765,
						.02
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlicerWorkstation, { position: [
						.68,
						.765,
						.04
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.08,
							.765,
							.18
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.06,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.022,
									.025,
									.12,
									14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f8fafc",
									roughness: .3,
									transparent: true,
									opacity: .85
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.125,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.02,
									.025,
									.035
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0284c7" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.13,
									.02
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.004,
									.004,
									.025,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0284c7" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.05,
									.008,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.065,
									.016,
									.065
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#eab308",
									roughness: .9
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrintArtifactGalleryTower, { position: [
				-1.18,
				0,
				.02
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					-.42,
					2.1,
					.1
				],
				color: "#ffffff",
				intensity: 1.6,
				distance: 2.6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					.16,
					2.1,
					.1
				],
				color: "#fef9c3",
				intensity: 1.6,
				distance: 2.6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					.68,
					2.1,
					.1
				],
				color: "#ffffff",
				intensity: 1.7,
				distance: 2.6
			})
		]
	});
}
function createTextCanvas$7(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makeOscilloscopeTexture() {
	return createTextCanvas$7(512, 320, (ctx, w, h) => {
		ctx.fillStyle = "#030d08";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "rgba(34, 197, 94, 0.25)";
		ctx.lineWidth = 1;
		for (let x = 0; x < w; x += 32) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
		}
		for (let y = 0; y < h; y += 32) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}
		ctx.strokeStyle = "#22c55e";
		ctx.lineWidth = 3;
		ctx.beginPath();
		for (let x = 0; x < w; x++) {
			const y = h / 2 - 20 + Math.sin(x / w * Math.PI * 8) * 65;
			if (x === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 2.5;
		ctx.beginPath();
		for (let x = 0; x < w; x++) {
			const cycle = x % 90 > 45 ? 1 : -1;
			const y = h / 2 + 70 + cycle * 35;
			if (x === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 16px monospace";
		ctx.fillText("CH1: 1.00V/div  10.00 kHz SINE", 16, 26);
		ctx.fillStyle = "#38bdf8";
		ctx.fillText("CH2: 2.50V/div  PWM 50.0%", 280, 26);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 13px monospace";
		ctx.fillText("Vpp: 3.31V · Vrms: 1.17V · Freq: 10.024 kHz · Trigger: Auto", 16, h - 14);
	});
}
function makeZone3BannerTexture() {
	return createTextCanvas$7(1024, 256, (ctx, w, h) => {
		ctx.fillStyle = "#070d1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#00b4d8";
		ctx.lineWidth = 5;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#00b4d8";
		ctx.fillRect(8, 8, 14, h - 16);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 20px monospace";
		ctx.fillText("ZONE 03 // HARDWARE ASSEMBLY & SOLDERING LAB", 38, 48);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 42px 'Outfit', sans-serif, system-ui";
		ctx.fillText("BREAK & BUILD SECTION · HARDWARE LAB", 38, 104);
		ctx.fillStyle = "#93c5fd";
		ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
		ctx.fillText("ELECTRONICS WORKBENCH · SOLDERING STATIONS · OSCILLOSCOPES · PCB TESTING", 38, 148);
		[
			{
				text: "● RIGOL 100MHz DUAL SCOPE",
				color: "#4ade80",
				border: "#22c55e",
				x: 38,
				w: 275
			},
			{
				text: "● DIGITAL SOLDER: 350°C",
				color: "#f97316",
				border: "#ea580c",
				x: 328,
				w: 295
			},
			{
				text: "● ESD WORKBENCH: GROUNDED",
				color: "#38bdf8",
				border: "#0284c7",
				x: 638,
				w: 260
			}
		].forEach((c) => {
			ctx.fillStyle = "#0c1930";
			ctx.fillRect(c.x, 172, c.w, 48);
			ctx.strokeStyle = c.border;
			ctx.lineWidth = 1.5;
			ctx.strokeRect(c.x, 172, c.w, 48);
			ctx.fillStyle = c.color;
			ctx.font = "bold 14px monospace";
			ctx.fillText(c.text, c.x + 16, 202);
		});
	});
}
function Zone3BreakBuildShowcase() {
	const scopeTex = (0, import_react.useMemo)(() => makeOscilloscopeTexture(), []);
	const bannerTex = (0, import_react.useMemo)(() => makeZone3BannerTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			.25,
			0,
			-3.55
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.95,
					-.58
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.55,
						.95,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						roughness: .5
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.18,
						.015
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.3, .44] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: bannerTex,
						emissive: "#ffffff",
						emissiveMap: bannerTex,
						emissiveIntensity: .28,
						roughness: .45,
						polygonOffset: true,
						polygonOffsetFactor: -1,
						polygonOffsetUnits: -1
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.15,
					-.57
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.7,
							.85,
							.015
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f1f5f9",
							roughness: .4,
							metalness: .15
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							.008
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.72,
							.87,
							.008
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .7,
							roughness: .2
						})]
					}),
					Array.from({ length: 14 }).map((_, col) => Array.from({ length: 6 }).map((_, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.75 + col * .115,
							-.32 + row * .13,
							.012
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.004,
							.004,
							.006,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#94a3b8",
							roughness: .4,
							metalness: .2
						})]
					}, `${col}-${row}`))),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.5,
							.12,
							.025
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									-.015,
									.02,
									0
								],
								rotation: [
									0,
									0,
									.3
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.015,
									.09,
									.012
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#eab308" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.015,
									.02,
									0
								],
								rotation: [
									0,
									0,
									-.3
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.015,
									.09,
									.012
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#eab308" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.045,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.025,
									.04,
									.008
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#cbd5e1",
									metalness: .9
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.2,
							.1,
							.04
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.045,
								.045,
								.05,
								16
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#64748b",
								metalness: .8
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-.05,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.002,
								.002,
								.06,
								6
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#cbd5e1",
								metalness: .9
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.15,
							.12,
							.035
						],
						rotation: [
							0,
							0,
							-.2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.045,
							.12,
							.04
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0284c7" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.08,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.014,
								.018,
								.05,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#94a3b8",
								metalness: .9
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.55,
							-.1,
							.06
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.34,
								.24,
								.1
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#1e293b",
								metalness: .4
							})]
						}), [
							-.1,
							0,
							.1
						].flatMap((x) => [
							-.07,
							0,
							.07
						].map((y, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								x,
								y,
								.04
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.085,
								.055,
								.03
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#38bdf8",
								transparent: true,
								opacity: .4
							})]
						}, `${x}-${j}`)))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					0,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.74,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.95,
							.045,
							.72
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .35,
							metalness: .04
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.738,
							.36
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.94,
							.01,
							.008
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .8,
							roughness: .2
						})]
					}),
					[
						[-.88, -.3],
						[.88, -.3],
						[-.88, .3],
						[.88, .3]
					].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							x,
							.36,
							z
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.05,
								.72,
								.05
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#f8fafc",
								roughness: .25
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-.36,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.035,
								.035,
								.015,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#cbd5e1",
								metalness: .9
							})]
						})]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.55,
							.765,
							-.06
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.11,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.3,
									.2,
									.18
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#e2e8f0",
									metalness: .3,
									roughness: .4
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									-.05,
									.11,
									.091
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.17, .14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									map: scopeTex,
									emissive: "#ffffff",
									emissiveMap: scopeTex,
									emissiveIntensity: .65,
									roughness: .1
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
								position: [
									.09,
									.11,
									.092
								],
								children: [
									-.04,
									0,
									.04
								].map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										y,
										0
									],
									rotation: [
										Math.PI / 2,
										0,
										0
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
										.01,
										.01,
										.012,
										12
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#0284c7",
										metalness: .8
									})]
								}, i))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.2,
							.765,
							-.06
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.1,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.2,
									.18,
									.22
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									metalness: .6,
									roughness: .3
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.13,
									.111
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.15, .045] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#ef4444",
									emissive: "#ef4444",
									emissiveIntensity: .9
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.07,
									.111
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.15, .045] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#22c55e",
									emissive: "#22c55e",
									emissiveIntensity: .9
								})]
							}),
							[
								-.05,
								0,
								.05
							].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									x,
									.02,
									.112
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.008,
									.008,
									.015,
									10
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: [
									"#ef4444",
									"#090d16",
									"#22c55e"
								][i] })]
							}, i))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.18,
							.765,
							.04
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.06,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.14,
									.1,
									.14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0284c7",
									roughness: .4
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.07,
									.071
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.09, .04] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f97316",
									emissive: "#f97316",
									emissiveIntensity: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.11,
									.05,
									0
								],
								rotation: [
									.4,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.025,
									.03,
									.08,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									metalness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.11,
									.08,
									.02
								],
								rotation: [
									.4,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.007,
									.007,
									.14,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0284c7" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.11,
									.14,
									.04
								],
								rotation: [
									.4,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
									.003,
									.02,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f59e0b",
									metalness: .9
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.5,
							.765,
							-.08
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.15,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.18,
									.18,
									.07
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									roughness: .4
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.15,
									.036
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.075,
									.075,
									.005,
									16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#090d16",
									roughness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.04,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.015,
									.02,
									.08,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#64748b",
									metalness: .8
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.1,
							.765,
							.18
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.006,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.19,
									.012,
									.09
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f8fafc",
									roughness: .6
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.016,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.055,
									.006,
									.03
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e3a8a",
									roughness: .4
								})]
							}),
							[-.05, .05].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									x,
									.02,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.006,
									8,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: i === 0 ? "#22c55e" : "#ef4444",
									emissive: i === 0 ? "#22c55e" : "#ef4444",
									emissiveIntensity: 1
								})]
							}, i)),
							[-.04, .04].map((z, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.02,
									.02,
									z
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.08,
									.004,
									.004
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: j === 0 ? "#eab308" : "#3b82f6" })]
							}, j))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.7,
							.765,
							.16
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.015,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.08,
									.025,
									.15
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f59e0b",
									roughness: .4
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.028,
									-.03
								],
								rotation: [
									-Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.06, .03] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#38bdf8",
									emissive: "#38bdf8",
									emissiveIntensity: .6
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.028,
									.02
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.015,
									.015,
									.004,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })]
							})
						]
					})
				]
			}),
			[
				-.55,
				0,
				.55
			].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					0,
					.55
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.48,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.16,
							.16,
							.05,
							18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0284c7",
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.24,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.02,
							.025,
							.44,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .9,
							roughness: .15
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.02,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.18,
							.18,
							.02,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#94a3b8",
							metalness: .9
						})]
					})
				]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					-.45,
					2.1,
					.1
				],
				color: "#ffffff",
				intensity: 1.6,
				distance: 2.5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					.45,
					2.1,
					.1
				],
				color: "#ffffff",
				intensity: 1.6,
				distance: 2.5
			})
		]
	});
}
function createTextCanvas$6(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makeTeachPendantTexture() {
	return createTextCanvas$6(512, 384, (ctx, w, h) => {
		ctx.fillStyle = "#090d16";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(0, 0, w, 44);
		ctx.strokeStyle = "#0284c7";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, 44);
		ctx.lineTo(w, 44);
		ctx.stroke();
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 15px 'Outfit', sans-serif, system-ui";
		ctx.fillText("AVP KINEMATICS CONTROL SUITE", 16, 28);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 12px monospace";
		ctx.fillText("● ROS2 JAZZY · REALTIME 1kHz", 310, 28);
		const jx = 16;
		const jy = 56;
		ctx.fillStyle = "#1e293b";
		ctx.fillRect(jx, jy, 230, 240);
		ctx.strokeStyle = "#334155";
		ctx.strokeRect(jx, jy, 230, 240);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "bold 12px monospace";
		ctx.fillText("JOINT ANGLES (DH MODEL)", 28, 78);
		[
			[
				"J1 (WAIST)",
				"+45.2°",
				"#38bdf8"
			],
			[
				"J2 (SHOULDER)",
				"-30.1°",
				"#38bdf8"
			],
			[
				"J3 (ELBOW)",
				"+82.4°",
				"#38bdf8"
			],
			[
				"J4 (PITCH)",
				"0.0°",
				"#94a3b8"
			],
			[
				"J5 (ROLL)",
				"-45.0°",
				"#38bdf8"
			],
			[
				"J6 (GRIPPER)",
				"CLOSED",
				"#22c55e"
			]
		].forEach(([jName, jVal, col], idx) => {
			const rowY = 102 + idx * 30;
			ctx.fillStyle = "#0f172a";
			ctx.fillRect(26, rowY, 210, 24);
			ctx.fillStyle = "#f8fafc";
			ctx.font = "11px monospace";
			ctx.fillText(jName, 32, rowY + 16);
			ctx.fillStyle = col;
			ctx.font = "bold 11px monospace";
			ctx.fillText(jVal, 166, rowY + 16);
		});
		const rx = 260;
		ctx.fillStyle = "#1e293b";
		ctx.fillRect(rx, jy, 236, 240);
		ctx.strokeStyle = "#334155";
		ctx.strokeRect(rx, jy, 236, 240);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "bold 12px monospace";
		ctx.fillText("TCP CARTESIAN COORDINATES", 272, 78);
		[
			["TCP X", "342.50 mm"],
			["TCP Y", "-128.40 mm"],
			["TCP Z", "415.80 mm"],
			["ROLL", "12.5°"],
			["PITCH", "-88.2°"],
			["YAW", "0.0°"]
		].forEach(([cName, cVal], idx) => {
			const rowY = 102 + idx * 30;
			ctx.fillStyle = "#0f172a";
			ctx.fillRect(270, rowY, 216, 24);
			ctx.fillStyle = "#cbd5e1";
			ctx.font = "11px monospace";
			ctx.fillText(cName, 276, rowY + 16);
			ctx.fillStyle = "#38bdf8";
			ctx.font = "bold 11px monospace";
			ctx.fillText(cVal, 390, rowY + 16);
		});
		ctx.fillStyle = "#0284c7";
		ctx.fillRect(16, 310, 110, 36);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 12px 'Outfit', sans-serif, system-ui";
		ctx.fillText("TEACH MODE", 30, 333);
		ctx.fillStyle = "#1e293b";
		ctx.fillRect(136, 310, 110, 36);
		ctx.fillStyle = "#94a3b8";
		ctx.fillText("AUTO RUN", 160, 333);
		ctx.fillStyle = "#dc2626";
		ctx.fillRect(256, 310, 240, 36);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
		ctx.fillText("EMERGENCY STOP (READY)", 285, 333);
		ctx.fillStyle = "#64748b";
		ctx.font = "10px monospace";
		ctx.fillText("SAFETY INTERLOCK: CLOSED · SERVO CAN BUS: HEALTHY · E-STOP: CLEAR", 16, 368);
	});
}
function makeZone4BannerTexture() {
	return createTextCanvas$6(1024, 256, (ctx, w, h) => {
		ctx.fillStyle = "#070d1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#00b4d8";
		ctx.lineWidth = 5;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#00b4d8";
		ctx.fillRect(8, 8, 14, h - 16);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 20px monospace";
		ctx.fillText("ZONE 04 // ADVANCED ROBOTICS & MECHATRONICS LAB", 38, 48);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 38px 'Outfit', sans-serif, system-ui";
		ctx.fillText("AUTONOMOUS SYSTEMS & KINEMATICS", 38, 98);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "16px 'Outfit', sans-serif, system-ui";
		ctx.fillText("Industrial 6-Axis Manipulators · Quadruped Bio-Robots · Bionic Hands · Humanoid Kinematics", 38, 134);
		[
			{
				label: "6-AXIS ARM",
				text: "REPEATABILITY ±0.02mm",
				color: "#38bdf8",
				x: 38,
				w: 220
			},
			{
				label: "QUADRUPED DOG",
				text: "360° LIDAR SLAM",
				color: "#f59e0b",
				x: 274,
				w: 210
			},
			{
				label: "HUMANOID BOT",
				text: "22-DOF KINEMATICS",
				color: "#a855f7",
				x: 500,
				w: 220
			},
			{
				label: "BUS PROTOCOL",
				text: "CAN-FD REALTIME",
				color: "#22c55e",
				x: 736,
				w: 248
			}
		].forEach((c) => {
			ctx.fillStyle = "#0c1930";
			ctx.fillRect(c.x, 154, c.w, 82);
			ctx.fillStyle = "#38bdf8";
			ctx.font = "bold 11px monospace";
			ctx.fillText(c.label, c.x + 16, 178);
			ctx.fillStyle = "#1e293b";
			ctx.fillRect(c.x + 10, 186, c.w - 20, 40);
			ctx.strokeStyle = c.color;
			ctx.lineWidth = 1.5;
			ctx.strokeRect(c.x + 10, 186, c.w - 20, 40);
			ctx.fillStyle = c.color;
			ctx.font = "bold 13px monospace";
			ctx.fillText(c.text, c.x + 18, 211);
		});
	});
}
function Zone4RoboticsShowcase() {
	const pendantTex = (0, import_react.useMemo)(() => makeTeachPendantTexture(), []);
	const bannerTex = (0, import_react.useMemo)(() => makeZone4BannerTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			2.45,
			0,
			-3.62
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.95,
					-.58
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.55,
						.95,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						roughness: .5
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.18,
						.015
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.3, .44] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: bannerTex,
						emissive: "#ffffff",
						emissiveMap: bannerTex,
						emissiveIntensity: .28,
						roughness: .45,
						polygonOffset: true,
						polygonOffsetFactor: -1,
						polygonOffsetUnits: -1
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					0,
					-.05
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.74,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.4,
							.045,
							.85
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.725,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.42,
							.02,
							.87
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#dfc49f",
							roughness: .5
						})]
					}),
					[-1.12, 1.12].flatMap((x) => [-.36, .36].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							.36,
							z
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.025,
							.025,
							.72,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							metalness: .7,
							roughness: .3
						})]
					}, `${x}-${z}`))),
					[-.36, .36].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.15,
							z
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.24,
							.03,
							.03
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .8
						})]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.71,
							.4
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.3,
							.01,
							.01
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: 1
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.25,
					-.45
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.35,
						.025,
						.32
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f8fafc",
						roughness: .3
					})]
				}), [
					-.9,
					0,
					.9
				].map((bx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						bx,
						-.08,
						-.06
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.02,
						.14,
						.2
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#94a3b8",
						metalness: .8
					})]
				}, i))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.45,
					.765,
					-.05
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.02,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.13,
							.14,
							.04,
							24
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							metalness: .9,
							roughness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.041,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.11,
							.11,
							.005,
							24
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: 1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.09,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.09,
							.1,
							.1,
							20
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f97316",
							roughness: .35
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.16,
							0
						],
						rotation: [
							.4,
							0,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.075,
									16,
									16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									metalness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.15,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.08,
									.3,
									.08
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f8fafc",
									roughness: .3
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.042,
									.15,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.005,
									.26,
									.06
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f97316" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
								position: [
									0,
									.3,
									0
								],
								rotation: [
									-.8,
									0,
									0
								],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										castShadow: true,
										rotation: [
											0,
											0,
											Math.PI / 2
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
											.06,
											.06,
											.09,
											16
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#0f172a",
											metalness: .8
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											0,
											.14,
											0
										],
										castShadow: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
											.045,
											.055,
											.28,
											16
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#f8fafc",
											roughness: .3
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
										position: [
											0,
											.28,
											0
										],
										rotation: [
											.3,
											0,
											0
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
											castShadow: true,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
												.045,
												14,
												14
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f97316" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
											position: [
												0,
												.06,
												0
											],
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
													castShadow: true,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
														.04,
														.04,
														.02,
														16
													] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
														color: "#0f172a",
														metalness: .9
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
													position: [
														0,
														.025,
														0
													],
													castShadow: true,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
														.09,
														.03,
														.04
													] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
														color: "#334155",
														metalness: .7
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
													position: [
														-.03,
														.06,
														0
													],
													castShadow: true,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
														.012,
														.05,
														.025
													] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
														color: "#94a3b8",
														metalness: .9
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
													position: [
														.03,
														.06,
														0
													],
													castShadow: true,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
														.012,
														.05,
														.025
													] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
														color: "#94a3b8",
														metalness: .9
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
													position: [
														0,
														.06,
														0
													],
													rotation: [
														Math.PI / 2,
														0,
														0
													],
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
														.022,
														.022,
														.015,
														12
													] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
														color: "#38bdf8",
														metalness: .9,
														roughness: .1
													})]
												})
											]
										})]
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.55,
					.765,
					.02
				],
				rotation: [
					0,
					-.4,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.22,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.22,
							.12,
							.44
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#eab308",
							roughness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.22,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.225,
							.06,
							.42
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.3,
							.08
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.02,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.045,
								.05,
								.03,
								16
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#1e293b",
								metalness: .8
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.045,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.038,
								.038,
								.025,
								16
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#0284c7",
								emissive: "#0284c7",
								emissiveIntensity: .6
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.23,
							.23
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.16,
							.08,
							.06
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })] }), [-.045, .045].map((cx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								cx,
								.01,
								.031
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.014,
								.014,
								.005,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#38bdf8",
								emissive: "#38bdf8",
								emissiveIntensity: 1
							})]
						}, i))]
					}),
					[
						{
							lx: -.12,
							lz: .15,
							ang: .2
						},
						{
							lx: .12,
							lz: .15,
							ang: .2
						},
						{
							lx: -.12,
							lz: -.15,
							ang: -.2
						},
						{
							lx: .12,
							lz: -.15,
							ang: -.2
						}
					].map((leg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							leg.lx,
							.2,
							leg.lz
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.035,
								.035,
								.04,
								14
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#0f172a",
								metalness: .8
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							rotation: [
								leg.ang,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.06,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.025,
									.12,
									.035
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#eab308" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
								position: [
									0,
									-.12,
									0
								],
								rotation: [
									-leg.ang * 1.8,
									0,
									0
								],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										rotation: [
											0,
											0,
											Math.PI / 2
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
											.025,
											.025,
											.03,
											12
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#334155",
											metalness: .7
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											0,
											-.06,
											0
										],
										castShadow: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
											.018,
											.12,
											.022
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#0f172a",
											metalness: .6
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											0,
											-.12,
											0
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.022,
											10,
											10
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#1e293b",
											roughness: .9
										})]
									})
								]
							})]
						})]
					}, i))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.05,
					.765,
					.18
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.01,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.09,
							.09,
							.02,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .5,
							transparent: true,
							opacity: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.08,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.018,
							.022,
							.14,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							metalness: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.18,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.09,
							.08,
							.03
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							roughness: .3
						})]
					}),
					[
						-.032,
						-.016,
						0,
						.016,
						.032
					].map((fx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							fx,
							.22,
							0
						],
						rotation: [
							(i - 2) * .05,
							0,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.02,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.01,
									.035,
									.012
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0284c7",
									metalness: .5
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.045,
									.008
								],
								rotation: [
									.4,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.009,
									.028,
									.01
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f8fafc" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.06,
									.018
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.006,
									8,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f59e0b",
									emissive: "#f59e0b",
									emissiveIntensity: .8
								})]
							})
						]
					}, i))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.85,
					.765,
					.15
				],
				rotation: [
					.25,
					.2,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.05,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.26,
							.04,
							.2
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#334155",
							roughness: .6
						})]
					}),
					[-.13, .13].flatMap((bx) => [-.1, .1].map((bz) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							bx,
							.05,
							bz
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.03,
							.045,
							.03
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f97316" })]
					}, `${bx}-${bz}`))),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.071,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.22, .16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: pendantTex,
							emissive: "#ffffff",
							emissiveMap: pendantTex,
							emissiveIntensity: .6,
							roughness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.1,
							.08,
							-.07
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.016,
							.02,
							.018,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ef4444",
							emissive: "#ef4444",
							emissiveIntensity: .6
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.012,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.022,
								.022,
								.008,
								14
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#dc2626" })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.7,
					1.28,
					-.45
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.18,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.16,
							.22,
							.1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							roughness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.21,
							.052
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.025,
							.025,
							.004,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: 1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.33,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.1,
								.09,
								.09
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#0f172a",
								metalness: .8
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.01,
								.047
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.08, .025] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#00b4d8",
								emissive: "#00b4d8",
								emissiveIntensity: 1
							})]
						})]
					}),
					[-.05, .05].map((lx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							lx,
							.07,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.022,
								.025,
								.14,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#475569",
								metalness: .7
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-.07,
								.02
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.038,
								.015,
								.07
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })]
						})]
					}, i))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.65,
					1.28,
					-.45
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.04,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.08,
							.09,
							.04,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							metalness: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							.05,
							.085
						],
						children: [-.02, .02].map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								ex,
								0,
								0
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.012,
								.012,
								.01,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#38bdf8",
								emissive: "#38bdf8",
								emissiveIntensity: .8
							})]
						}, i))
					}),
					[
						0,
						1,
						2,
						3,
						4,
						5
					].map((idx) => {
						const angle = idx * Math.PI / 3;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								.08 * Math.cos(angle),
								.04,
								.08 * Math.sin(angle)
							],
							rotation: [
								0,
								-angle,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.04,
									.02,
									0
								],
								rotation: [
									0,
									0,
									-.3
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.07,
									.012,
									.015
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#38bdf8" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.08,
									-.03,
									0
								],
								rotation: [
									0,
									0,
									.5
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.08,
									.01,
									.012
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#475569" })]
							})]
						}, idx);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					1.6,
					.1
				],
				color: "#e0f2fe",
				intensity: 1.2,
				distance: 3.2
			})
		]
	});
}
function createTextCanvas$5(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makeDroneTelemetryTexture() {
	return createTextCanvas$5(640, 480, (ctx, w, h) => {
		ctx.fillStyle = "#030a16";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
		ctx.lineWidth = 1;
		for (let x = 0; x < w; x += 32) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
		}
		for (let y = 0; y < h; y += 32) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}
		const cx = w / 2;
		const cy = h / 2;
		ctx.strokeStyle = "#22c55e";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(cx - 100, cy);
		ctx.lineTo(cx - 30, cy);
		ctx.moveTo(cx + 30, cy);
		ctx.lineTo(cx + 100, cy);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(cx, cy, 14, 0, Math.PI * 2);
		ctx.moveTo(cx, cy - 20);
		ctx.lineTo(cx, cy - 8);
		ctx.moveTo(cx, cy + 8);
		ctx.lineTo(cx, cy + 20);
		ctx.stroke();
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(0, 0, w, 40);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 15px monospace";
		ctx.fillText("● LIVE FPV 5.8GHz · CH: R8 · LATENCY: 9.4ms", 20, 26);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 15px monospace";
		ctx.fillText("PX4 STABILIZED · INDOOR POS-HOLD", 340, 26);
		ctx.fillStyle = "#1e293b";
		ctx.fillRect(16, 60, 110, 160);
		ctx.strokeStyle = "#38bdf8";
		ctx.strokeRect(16, 60, 110, 160);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 11px monospace";
		ctx.fillText("ALT (LiDAR)", 24, 82);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 20px monospace";
		ctx.fillText("1.25 m", 24, 110);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 11px monospace";
		ctx.fillText("SPEED (OPTIC)", 24, 145);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 20px monospace";
		ctx.fillText("0.18 m/s", 24, 175);
		ctx.fillStyle = "#1e293b";
		ctx.fillRect(w - 130, 60, 114, 160);
		ctx.strokeStyle = "#22c55e";
		ctx.strokeRect(w - 130, 60, 114, 160);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 11px monospace";
		ctx.fillText("4S LI-PO VOLTS", w - 122, 82);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 20px monospace";
		ctx.fillText("15.6 V", w - 122, 110);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 11px monospace";
		ctx.fillText("LINK RSSI", w - 122, 145);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 20px monospace";
		ctx.fillText("-54 dBm", w - 122, 175);
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(0, h - 45, w, 45);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "bold 13px monospace";
		ctx.fillText("FLIGHT TIME: 04:18 | DRAW: 14.8A | CAPACITY: 1300mAh (78%) | FAILSAFE: AUTO-LAND", 20, h - 18);
	});
}
function makeHelipadTexture() {
	return createTextCanvas$5(512, 512, (ctx, w, h) => {
		ctx.fillStyle = "#0c1524";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#eab308";
		ctx.lineWidth = 12;
		ctx.strokeRect(10, 10, w - 20, h - 20);
		ctx.strokeStyle = "#22c55e";
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.arc(w / 2, h / 2, 210, 0, Math.PI * 2);
		ctx.stroke();
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 4;
		ctx.setLineDash([14, 10]);
		ctx.beginPath();
		ctx.arc(w / 2, h / 2, 160, 0, Math.PI * 2);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(w / 2, 50);
		ctx.lineTo(w / 2, h - 50);
		ctx.moveTo(50, h / 2);
		ctx.lineTo(w - 50, h / 2);
		ctx.stroke();
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 130px 'Outfit', sans-serif, system-ui";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("H", w / 2, h / 2);
		ctx.font = "bold 18px monospace";
		ctx.fillStyle = "#eab308";
		ctx.fillText("N (000°)", w / 2, 36);
		ctx.fillText("AVP DRONE ARENA // PAD-01", w / 2, h - 30);
	});
}
function makeZone5BannerTexture() {
	return createTextCanvas$5(1024, 256, (ctx, w, h) => {
		ctx.fillStyle = "#070d1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#00b4d8";
		ctx.lineWidth = 5;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#00b4d8";
		ctx.fillRect(8, 8, 14, h - 16);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 20px monospace";
		ctx.fillText("ZONE 05 // AUTONOMOUS DRONE ARENA & AVIONICS LAB", 38, 48);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 38px 'Outfit', sans-serif, system-ui";
		ctx.fillText("UAV FLIGHT CAGE & AUTOPILOT ARENA", 38, 98);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "16px 'Outfit', sans-serif, system-ui";
		ctx.fillText("Acrobatic FPV Quadcopters · Indoor Optic Flow Positioning · PX4 Autopilot · Telemetry Ground Station", 38, 134);
		[
			{
				label: "FLIGHT ENCLOSURE",
				text: "HIGH-TENSILE CAGE",
				color: "#38bdf8",
				x: 38,
				w: 220
			},
			{
				label: "HOVERING FPV",
				text: "CARBON X-FRAME",
				color: "#22c55e",
				x: 274,
				w: 210
			},
			{
				label: "AUTOPILOT STACK",
				text: "PX4 + OPTIC FLOW",
				color: "#f59e0b",
				x: 500,
				w: 220
			},
			{
				label: "TELEMETRY LINK",
				text: "5.8GHz LOW-LATENCY",
				color: "#a855f7",
				x: 736,
				w: 248
			}
		].forEach((c) => {
			ctx.fillStyle = "#0c1930";
			ctx.fillRect(c.x, 154, c.w, 82);
			ctx.fillStyle = "#38bdf8";
			ctx.font = "bold 11px monospace";
			ctx.fillText(c.label, c.x + 16, 178);
			ctx.fillStyle = "#1e293b";
			ctx.fillRect(c.x + 10, 186, c.w - 20, 40);
			ctx.strokeStyle = c.color;
			ctx.lineWidth = 1.5;
			ctx.strokeRect(c.x + 10, 186, c.w - 20, 40);
			ctx.fillStyle = c.color;
			ctx.font = "bold 13px monospace";
			ctx.fillText(c.text, c.x + 18, 211);
		});
	});
}
function Zone5DroneArenaShowcase({ drone, net, mat }) {
	const telemetryTex = (0, import_react.useMemo)(() => makeDroneTelemetryTexture(), []);
	const helipadTex = (0, import_react.useMemo)(() => makeHelipadTexture(), []);
	const bannerTex = (0, import_react.useMemo)(() => makeZone5BannerTexture(), []);
	const s = 2.1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			4.85,
			0,
			-2.55
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					2.1,
					-1.08
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.4,
						.9,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						roughness: .5
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.15,
						.015
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.25, .44] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: bannerTex,
						emissive: "#ffffff",
						emissiveMap: bannerTex,
						emissiveIntensity: .28,
						roughness: .45,
						polygonOffset: true,
						polygonOffsetFactor: -1,
						polygonOffsetUnits: -1
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.015,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [s, s] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: helipadTex,
					roughness: .6
				})]
			}),
			[-.98, .98].flatMap((x) => [-.98, .98].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					s / 2,
					z
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.024,
							.024,
							s,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							metalness: .8,
							roughness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-1.04,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.05,
							.05,
							.02,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							metalness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.07,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.02,
							10,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f59e0b",
							emissive: "#f59e0b",
							emissiveIntensity: 1
						})]
					})
				]
			}, `${x}-${z}`))),
			[-.98, .98].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					s,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.03,
					.03,
					s
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#334155",
					metalness: .8
				})]
			}, `x-${x}`)),
			[-.98, .98].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					s,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					s,
					.03,
					.03
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#334155",
					metalness: .8
				})]
			}, `z-${z}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					s / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.08,
					s,
					2.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#38bdf8",
					wireframe: true,
					transparent: true,
					opacity: .16
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.35,
					-.2
				],
				rotation: [
					0,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.32,
					.02,
					16,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#00b4d8",
					emissive: "#00b4d8",
					emissiveIntensity: 1,
					toneMapped: false
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.3,
					.008,
					12,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ffffff",
					emissive: "#ffffff",
					emissiveIntensity: 1
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.08,
					1.35,
					.35
				],
				rotation: [
					.08,
					.15,
					-.05
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.1,
							.03,
							.14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							roughness: .3,
							metalness: .5
						})]
					}),
					[
						{
							ax: .12,
							az: .12,
							ang: Math.PI / 4
						},
						{
							ax: -.12,
							az: .12,
							ang: -Math.PI / 4
						},
						{
							ax: .12,
							az: -.12,
							ang: -Math.PI / 4
						},
						{
							ax: -.12,
							az: -.12,
							ang: Math.PI / 4
						}
					].map((arm, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							arm.ax * .5,
							0,
							arm.az * .5
						],
						rotation: [
							0,
							arm.ang,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.025,
							.01,
							.16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1e293b",
							metalness: .7
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							arm.ax,
							.015,
							arm.az
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.022,
									.022,
									.025,
									16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0284c7",
									metalness: .9,
									roughness: .2
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.005,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.018,
									.018,
									.015,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#b45309",
									metalness: .9
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.022,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.075,
									.075,
									.003,
									16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#38bdf8",
									emissive: "#38bdf8",
									emissiveIntensity: .6,
									transparent: true,
									opacity: .35
								})]
							})
						]
					})] }, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.035,
							-.01
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.065,
							.038,
							.11
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#334155",
							roughness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.036,
							-.01
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.068,
							.04,
							.03
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#ef4444" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.01,
							.08
						],
						rotation: [
							-.4,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.035,
								.035,
								.035
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f97316" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								.02
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.012,
								.014,
								.01,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#0284c7",
								metalness: .9
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.01,
							-.075
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.06,
							.012,
							.005
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#c084fc",
							emissive: "#a855f7",
							emissiveIntensity: 1,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.06,
							-.06
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.003,
							.003,
							.06,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.035,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.014,
								10,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#ef4444" })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					1.2,
					0,
					.15
				],
				rotation: [
					0,
					-Math.PI / 2,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.74,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.3,
							.04,
							.65
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .4
						})]
					}),
					[-.58, .58].flatMap((x) => [-.26, .26].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							.36,
							z
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.02,
							.02,
							.72,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							metalness: .6
						})]
					}, `${x}-${z}`))),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.25,
							.76,
							-.05
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.08,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.018,
									.022,
									.16,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#94a3b8",
									metalness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.005,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.09,
									.09,
									.01,
									16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#334155" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.24,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.54,
									.34,
									.03
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									metalness: .7
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.24,
									.016
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.5, .3] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									map: telemetryTex,
									emissive: "#ffffff",
									emissiveMap: telemetryTex,
									emissiveIntensity: .6,
									roughness: .2
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.2,
							.78,
							.12
						],
						rotation: [
							0,
							.35,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.16,
									.07,
									.09
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									roughness: .4
								})]
							}),
							[-.05, .05].map((ax, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									ax,
									.03,
									.045
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.006,
									.008,
									.04,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0284c7" })]
							}, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									-.048
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.15,
									.065,
									.015
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#475569",
									roughness: .9
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.42,
							.77,
							-.04
						],
						rotation: [
							.1,
							-.2,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.16,
									.03,
									.18
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									roughness: .5
								})]
							}),
							[-.045, .045].map((gx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									gx,
									.025,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.018,
									.022,
									.02,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#38bdf8",
									metalness: .8
								})]
							}, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.015,
									-.1
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.004,
									.004,
									.08,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#334155" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.2,
							.77,
							.16
						],
						rotation: [
							0,
							.6,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.01,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.07,
								.07,
								.015,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#0f172a",
								metalness: .8
							})]
						}), [
							Math.PI / 4,
							3 * Math.PI / 4,
							5 * Math.PI / 4,
							7 * Math.PI / 4
						].map((ang, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.09 * Math.cos(ang),
								.01,
								.09 * Math.sin(ang)
							],
							rotation: [
								0,
								-ang,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.1,
								.012,
								.02
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: i < 2 ? "#ef4444" : "#f8fafc" })]
						}, i))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
				position: [
					0,
					2.5,
					0
				],
				"target-position": [
					0,
					0,
					0
				],
				color: "#38bdf8",
				intensity: 2.2,
				distance: 4.5,
				angle: .65,
				penumbra: .4
			})
		]
	});
}
function createTextCanvas$4(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makeOledTexture() {
	return createTextCanvas$4(256, 128, (ctx, w, h) => {
		ctx.fillStyle = "#030712";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#06b6d4";
		ctx.font = "bold 18px monospace";
		ctx.fillText("IOT NODE 06 // ACTIVE", 14, 26);
		ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(14, 34);
		ctx.lineTo(w - 14, 34);
		ctx.stroke();
		ctx.fillStyle = "#38bdf8";
		ctx.font = "16px monospace";
		ctx.fillText("TEMP: 24.6 °C", 14, 60);
		ctx.fillText("HUM : 58.2 %RH", 14, 82);
		ctx.strokeStyle = "#22d3ee";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(140, 75);
		ctx.lineTo(160, 68);
		ctx.lineTo(180, 80);
		ctx.lineTo(200, 62);
		ctx.lineTo(220, 74);
		ctx.lineTo(240, 66);
		ctx.stroke();
		ctx.fillStyle = "#0284c7";
		ctx.font = "12px monospace";
		ctx.fillText("WIFI: CONNECTED  [88%]", 14, 110);
		ctx.fillStyle = "#10b981";
		ctx.beginPath();
		ctx.arc(w - 22, 106, 5, 0, Math.PI * 2);
		ctx.fill();
	});
}
function makeCategoryTexture(title, subtitle) {
	return createTextCanvas$4(512, 96, (ctx, w, h) => {
		ctx.fillStyle = "#040812";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 4;
		ctx.strokeRect(2, 2, w - 4, h - 4);
		ctx.fillStyle = "#0ea5e9";
		ctx.fillRect(4, 4, 14, h - 8);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 32px 'Outfit', sans-serif, system-ui";
		ctx.fillText(title, 28, 44);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 17px 'Outfit', sans-serif, system-ui";
		ctx.fillText(subtitle, 28, 74);
	});
}
function makeWallSignTexture() {
	return createTextCanvas$4(1024, 180, (ctx, w, h) => {
		ctx.fillStyle = "#070c18";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
		ctx.lineWidth = 4;
		ctx.strokeRect(4, 4, w - 8, h - 8);
		ctx.fillStyle = "#0284c7";
		ctx.fillRect(36, 22, 160, 26);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 13px 'Outfit', sans-serif";
		ctx.fillText("AVP INNOVATION HUB", 48, 40);
		ctx.fillStyle = "#f8fafc";
		ctx.font = "bold 44px 'Outfit', sans-serif";
		ctx.fillText("ZONE 06 · IOT & EMBEDDED SYSTEMS LAB", 36, 104);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "18px 'Outfit', sans-serif";
		ctx.fillText("ORGANIZED COMPONENT KITS · SENSORS · MICROCONTROLLERS · ACTUATORS", 36, 144);
	});
}
function makeBoxLabelTexture(title, category, color = "#38bdf8") {
	return createTextCanvas$4(512, 160, (ctx, w, h) => {
		ctx.fillStyle = "#080e1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = color;
		ctx.lineWidth = 4;
		ctx.strokeRect(3, 3, w - 6, h - 6);
		ctx.fillStyle = color;
		ctx.fillRect(4, 4, 14, h - 8);
		ctx.fillStyle = color;
		ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
		ctx.fillText(category.toUpperCase(), 30, 36);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 40px 'Outfit', sans-serif, system-ui";
		ctx.fillText(title, 30, 88);
		ctx.fillStyle = "rgba(226, 232, 240, 0.65)";
		ctx.font = "bold 14px monospace";
		ctx.fillText("AVP LAB KIT · VERIFIED INVENTORY", 30, 128);
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(w - 28, 38, 7, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
		for (let x = 0; x < 40; x += 4) ctx.fillRect(w - 65 + x, 75, x % 8 === 0 ? 3 : 1.5, 45);
	});
}
function ComponentKitBox({ position, title, category, accentColor = "#38bdf8", children }) {
	const labelTex = (0, import_react.useMemo)(() => makeBoxLabelTexture(title, category, accentColor), [
		title,
		category,
		accentColor
	]);
	const bw = .32;
	const bd = .26;
	const bh = .09;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					bh / 2,
					0
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					bd,
					bh,
					bw
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0f172a",
					roughness: .4,
					metalness: .25
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.008,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.266,
					.016,
					.326
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#090d16",
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.131,
					bh / 2,
					0
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.3, .074] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: labelTex,
					emissive: accentColor,
					emissiveMap: labelTex,
					emissiveIntensity: .65,
					roughness: .15
				})]
			}),
			[-.1, .1].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.134,
					bh / 2,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.006,
					.03,
					.018
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .9,
					roughness: .2
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.095,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.245,
					.01,
					.305
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e0f2fe",
					transparent: true,
					opacity: .35,
					roughness: .15,
					metalness: .1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.096,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					bd,
					.004,
					bw
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: accentColor,
					metalness: .6,
					roughness: .3
				})]
			}),
			children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					0,
					.09999999999999999,
					0
				],
				children
			})
		]
	});
}
function IrSensorModule({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.006,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.075,
					.004,
					.034
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1d4ed8",
					roughness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.04,
					.009,
					-.008
				],
				rotation: [
					0,
					0,
					-Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.0035,
					.0035,
					.008,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c084fc",
					transparent: true,
					opacity: .85
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.044,
					.009,
					-.008
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.0035,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e9d5ff",
					transparent: true,
					opacity: .9,
					emissive: "#c084fc",
					emissiveIntensity: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.04,
					.009,
					.008
				],
				rotation: [
					0,
					0,
					-Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.0035,
					.0035,
					.008,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#020617",
					roughness: .1,
					metalness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.044,
					.009,
					.008
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.0035,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#020617",
					roughness: .1,
					metalness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.002,
					.009,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.014,
					.004,
					.018
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.02,
					.011,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.012,
					.008,
					.012
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2563eb" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.02,
					.015,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.0025,
					.0025,
					.002,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ca8a04",
					metalness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.01,
					.009,
					-.008
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.003,
					.003,
					.003
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#22c55e",
					emissive: "#22c55e",
					emissiveIntensity: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.01,
					.009,
					.008
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.003,
					.003,
					.003
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ef4444",
					emissive: "#ef4444",
					emissiveIntensity: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.04,
					.006,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.008,
					.002,
					.016
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ca8a04",
					metalness: .9
				})]
			})
		]
	});
}
function ArduinoUno({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.02,
				.035,
				0
			],
			rotation: [
				0,
				0,
				-.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.07,
				.08,
				.1
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0f2fe",
				transparent: true,
				opacity: .3,
				roughness: .1
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				.045,
				0
			],
			rotation: [
				0,
				0,
				-.42
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.075,
						.005,
						.11
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#008184",
						roughness: .35,
						metalness: .1
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.005,
						.006,
						.015
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.018,
						.006,
						.055
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .4
					})]
				}),
				[-.012, .012].map((x, side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						.003,
						.015
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.004,
						.002,
						.052
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .8,
						roughness: .2
					})]
				}, side)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.026,
						.009,
						-.045
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.02,
						.014,
						.022
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#e2e8f0",
						metalness: .85,
						roughness: .2
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.022,
						.009,
						-.045
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.022,
						.014,
						.026
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0f172a",
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.033,
						.008,
						.005
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.006,
						.01,
						.08
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0f172a",
						roughness: .3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.033,
						.008,
						.01
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.006,
						.01,
						.075
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0f172a",
						roughness: .3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.008,
						.006,
						-.02
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.0025,
						.009,
						4,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						metalness: .9,
						roughness: .15
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.026,
						.009,
						-.02
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.0025,
						.0025,
						.003,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#ef4444",
						roughness: .3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.015,
						.005,
						-.01
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.003,
						.003,
						.003
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#22c55e",
						emissive: "#22c55e",
						emissiveIntensity: .9
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.015,
						.005,
						.002
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.003,
						.003,
						.003
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f97316",
						emissive: "#f97316",
						emissiveIntensity: .7
					})]
				})
			]
		})]
	});
}
function RaspberryPiModel({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.02,
				.035,
				0
			],
			rotation: [
				0,
				0,
				-.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.07,
				.08,
				.1
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0f2fe",
				transparent: true,
				opacity: .3,
				roughness: .1
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				.045,
				0
			],
			rotation: [
				0,
				0,
				-.42
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.076,
						.005,
						.11
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#15803d",
						roughness: .4,
						metalness: .1
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.005,
						.008,
						-.01
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.024,
						.008,
						.024
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#94a3b8",
						metalness: .85,
						roughness: .2
					})]
				}),
				[
					-.008,
					-.003,
					.002,
					.007
				].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.005,
						.014,
						-.01 + z
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.022,
						.005,
						.0018
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .9,
						roughness: .2
					})]
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.02,
						.013,
						.046
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.024,
						.018,
						.022
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .8,
						roughness: .2
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.02,
						.013,
						.058
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.02,
						.012,
						.002
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0284c7" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.018,
						.013,
						.046
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.024,
						.018,
						.022
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .8,
						roughness: .2
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.025,
						.012,
						-.045
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.022,
						.016,
						.026
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#e2e8f0",
						metalness: .75,
						roughness: .25
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.032,
						.008,
						-.005
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.008,
						.008,
						.08
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.03,
						.005,
						-.048
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.002,
						.002,
						.002
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#ef4444",
						emissive: "#ef4444",
						emissiveIntensity: .8
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.03,
						.005,
						-.042
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.002,
						.002,
						.002
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#22c55e",
						emissive: "#22c55e",
						emissiveIntensity: .8
					})]
				})
			]
		})]
	});
}
function Esp32Module({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.015,
				.03,
				0
			],
			rotation: [
				0,
				0,
				-.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.055,
				.065,
				.075
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0f2fe",
				transparent: true,
				opacity: .3,
				roughness: .1
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				.04,
				0
			],
			rotation: [
				0,
				0,
				-.42
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.042,
						.004,
						.075
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#18181b",
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.005,
						.008
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.026,
						.005,
						.03
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .85,
						roughness: .25
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.003,
						-.024
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.028,
						.001,
						.012
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#ca8a04",
						metalness: .8,
						roughness: .3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.005,
						.036
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.012,
						.006,
						.008
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .9
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.018,
						.007,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.004,
						.008,
						.065
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.018,
						.007,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.004,
						.008,
						.065
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.008,
						.004,
						.028
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.002,
						.002,
						.002
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#38bdf8",
						emissive: "#38bdf8",
						emissiveIntensity: .9
					})]
				})
			]
		})]
	});
}
function UltrasonicSensor({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.015,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.03,
				.03,
				.06
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0f2fe",
				transparent: true,
				opacity: .35,
				roughness: .1
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				.015,
				.035,
				0
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.065,
						.03,
						.004
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1d4ed8",
						roughness: .35
					})]
				}),
				[-.018, .018].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						x,
						0,
						.012
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.01,
							.01,
							.018,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .85,
							roughness: .2
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.0095,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.009,
							.009,
							.001,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#475569",
							metalness: .5,
							roughness: .6
						})]
					})]
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-.008,
						.004
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.008,
						.004,
						.003
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						metalness: .9
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-.018,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.016,
						.008,
						.002
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#ca8a04",
						metalness: .9
					})]
				})
			]
		})]
	});
}
function PirSensor({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.01,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.045,
					.004,
					.045
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#15803d",
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.024,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.016,
					16,
					12,
					0,
					Math.PI * 2,
					0,
					Math.PI / 2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f8fafc",
					roughness: .3,
					transparent: true,
					opacity: .88
				})]
			}),
			[-.012, .012].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.015,
					.016,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.008,
					.008,
					.008
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#eab308",
					roughness: .4
				})]
			}, i))
		]
	});
}
function Esp32Cam({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.02,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.03,
				.04,
				.04
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0f2fe",
				transparent: true,
				opacity: .3,
				roughness: .1
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				.015,
				.038,
				0
			],
			rotation: [
				0,
				0,
				-.25
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.004,
						.05,
						.035
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0f172a",
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.006,
						.008,
						0
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.006,
						.007,
						.008,
						14
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						metalness: .7,
						roughness: .3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.011,
						.008,
						0
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.003,
						.003,
						.002,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0284c7",
						emissive: "#0284c7",
						emissiveIntensity: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.003,
						-.014,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.002,
						.014,
						.016
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .8
					})]
				})
			]
		})]
	});
}
function Dht22Sensor({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.024,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.016,
					.034,
					.024
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f8fafc",
					roughness: .5
				})]
			}),
			[
				-.008,
				-.002,
				.004,
				.01
			].map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.0082,
					.024 + y,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.001,
					.002,
					.016
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#64748b" })]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.004,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.018,
					.004,
					.026
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#dc2626" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.003,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.008,
					.008,
					.002
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ca8a04",
					metalness: .9
				})]
			})
		]
	});
}
function MqGasSensor({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.005,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.038,
					.004,
					.038
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1d4ed8",
					roughness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.02,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.012,
					.012,
					.024,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .8,
					roughness: .25
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.02,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.0122,
					.0122,
					.014,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#475569",
					metalness: .6,
					roughness: .5
				})]
			})
		]
	});
}
function DualRelayModule({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.005,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.065,
					.004,
					.09
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e3a8a",
					roughness: .35
				})]
			}),
			[-.018, .018].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					-.005,
					.018,
					z
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.028,
						.022,
						.026
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#2563eb",
						roughness: .3
					})]
				})
			}, i)),
			[-.022, .022].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.026,
					.013,
					z
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.014,
					.014,
					.022
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#16a34a",
					roughness: .4
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.02,
					.008,
					-.018
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.003,
					.003,
					.003
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#22c55e",
					emissive: "#22c55e",
					emissiveIntensity: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.02,
					.008,
					.018
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.003,
					.003,
					.003
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#22c55e",
					emissive: "#22c55e",
					emissiveIntensity: .8
				})]
			})
		]
	});
}
function OledDisplay({ position = [
	0,
	0,
	0
], scale = 1.45 }) {
	const oledTex = (0, import_react.useMemo)(() => makeOledTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.01,
				.025,
				0
			],
			rotation: [
				0,
				0,
				-.3
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.04,
				.05,
				.06
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0f2fe",
				transparent: true,
				opacity: .35,
				roughness: .1
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				.035,
				0
			],
			rotation: [
				0,
				0,
				-.3
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.004,
					.045,
					.06
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e40af",
					roughness: .35
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.003,
					0,
					0
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.052, .034] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: oledTex,
					emissive: "#38bdf8",
					emissiveMap: oledTex,
					emissiveIntensity: .85,
					roughness: .1
				})]
			})]
		})]
	});
}
function LoraModule({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.006,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.055,
					.004,
					.075
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0f172a",
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.012,
					.008
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.028,
					.008,
					.028
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					metalness: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.022,
					.012,
					-.03
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.005,
					.005,
					.008,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ca8a04",
					metalness: .9,
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					-.026,
					.012,
					-.03
				],
				rotation: [
					.4,
					0,
					-.4
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.045,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.004,
						.006,
						.09,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .5
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.018,
					.009,
					.02
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.003,
					.003,
					.003
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#22c55e",
					emissive: "#22c55e",
					emissiveIntensity: .9
				})]
			})
		]
	});
}
function ServoMotorModel({ position = [
	0,
	0,
	0
], rotation = 0, scale = 1.35 }) {
	const horn = (0, import_react.useRef)(null);
	useFrame(({ clock }) => {
		if (horn.current) horn.current.rotation.y = Math.sin(clock.elapsedTime * 2.5 + rotation) * .9;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation: [
			0,
			rotation,
			0
		],
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.022,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.024,
					.028,
					.014
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0284c7",
					transparent: true,
					opacity: .85,
					roughness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.006,
					.038,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.004,
					.004,
					.006,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f8fafc",
					roughness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				ref: horn,
				position: [
					.006,
					.042,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.024,
						.002,
						.006
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#ffffff",
						roughness: .3
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.016,
					.015,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.012,
					.003,
					.008
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f97316" })]
			})
		]
	});
}
function StepperMotorKit({ position = [
	0,
	0,
	0
], scale = 1.35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-.02,
				.018,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.016,
						.016,
						.022,
						18
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						metalness: .8,
						roughness: .2
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-.004,
						.014
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.014,
						.014,
						.008
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2563eb" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.015,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.003,
						.003,
						.01,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#ca8a04",
						metalness: .85
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				.025,
				.006,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.04,
					.004,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#15803d",
					roughness: .4
				})]
			}), [
				-.01,
				-.003,
				.004,
				.011
			].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.012,
					.006,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.003,
					.003,
					.003
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ef4444",
					emissive: "#ef4444",
					emissiveIntensity: .7
				})]
			}, i))]
		})]
	});
}
function PrototypingBreadboard({ position = [
	0,
	0,
	0
], scale = 1.25 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.006,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.07,
					.008,
					.16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f8fafc",
					roughness: .35
				})]
			}),
			[-.03, .03].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x - .002,
					.0105,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.0015,
					.001,
					.14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#ef4444" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x + .002,
					.0105,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.0015,
					.001,
					.14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2563eb" })]
			})] }, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.015,
					.018,
					-.03
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.0035,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ef4444",
					emissive: "#ef4444",
					emissiveIntensity: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.015,
					.018,
					.01
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.0035,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#22c55e",
					emissive: "#22c55e",
					emissiveIntensity: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.015,
					.018,
					.035
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.0035,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#38bdf8",
					emissive: "#38bdf8",
					emissiveIntensity: .8
				})]
			})
		]
	});
}
function IoTShowcaseCabinet({ position, categoryTitle, categorySubtitle, children }) {
	const W = .82;
	const D = .44;
	const H = 2.15;
	const frameColor = "#0f172a";
	const trimColor = "#334155";
	const glassColor = "#e0f2fe";
	const headerTex = (0, import_react.useMemo)(() => makeCategoryTexture(categoryTitle, categorySubtitle), [categoryTitle, categorySubtitle]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.21,
					H / 2,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.02,
					H,
					W
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .8
				})]
			}),
			Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.198,
					H / 2,
					-.82 / 2 + .08 + i * .082
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.008,
					2.05,
					.024
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#090d16",
					roughness: .7
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					H / 2,
					-.82 / 2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					D,
					H,
					.024
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: frameColor,
					roughness: .4,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					H / 2,
					W / 2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					D,
					H,
					.024
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: frameColor,
					roughness: .4,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.04,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.45,
					.08,
					.83
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#070a12",
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					D / 2 - .005,
					.37,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.018,
					.56,
					.7799999999999999
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#182234",
					roughness: .45,
					metalness: .15
				})]
			}),
			[-.04, .04].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.23,
					.42,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.012,
					.12,
					.008
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .9,
					roughness: .2
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.66,
					0
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.455,
					.024,
					.8099999999999999
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .3,
					metalness: .3
				})]
			}),
			[
				1.06,
				1.46,
				1.86
			].map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					y,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.4,
							.016,
							.7799999999999999
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: glassColor,
							transparent: true,
							opacity: .55,
							roughness: .15,
							metalness: .1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							D / 2 - .06,
							-.012,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.02,
							.006,
							.74
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: .95,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.19,
							.01,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.008,
							.008,
							.74
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#60a5fa",
							emissive: "#60a5fa",
							emissiveIntensity: .6,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							D / 2 - .02,
							.008,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.008,
							.018,
							.7799999999999999
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: trimColor,
							metalness: .8,
							roughness: .2
						})]
					})
				]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					2.1,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.46,
					.1,
					.84
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: frameColor,
					roughness: .4,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					2.045,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.33999999999999997,
					.008,
					.7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f0f9ff",
					emissive: "#bae6fd",
					emissiveIntensity: .9,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					.06,
					1.97,
					0
				],
				intensity: 2.6,
				distance: 3.4,
				color: "#e0f2fe",
				decay: 1.8
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					.1,
					1.25,
					0
				],
				intensity: 1.6,
				distance: 2.4,
				color: "#bae6fd",
				decay: 1.8
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.232,
					2.105,
					0
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.76, .08] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: headerTex,
					emissive: "#38bdf8",
					emissiveMap: headerTex,
					emissiveIntensity: .55,
					roughness: .2
				})]
			}),
			[-.82 / 2 + .008, W / 2 - .008].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					D / 2 - .01,
					1.405,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.006,
					1.43,
					.006
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0ea5e9",
					emissive: "#0ea5e9",
					emissiveIntensity: .6,
					toneMapped: false
				})]
			}, i)),
			children
		]
	});
}
function Zone6IoTShowcase() {
	const wallSignTex = (0, import_react.useMemo)(() => makeWallSignTexture(), []);
	const cabinets = [
		{
			id: 0,
			z: -1.52,
			title: "01 · MICROCONTROLLERS & SOCs",
			subtitle: "ARDUINO · RASPBERRY PI · ESP32 · STM32"
		},
		{
			id: 1,
			z: -.64,
			title: "02 · SMART SENSORS & VISION",
			subtitle: "IR SENSORS · ULTRASONIC · PIR · CAM · GAS"
		},
		{
			id: 2,
			z: .24,
			title: "03 · WIRELESS & AUTOMATION",
			subtitle: "RELAYS · OLED HUD · LORA · IOT GATEWAYS"
		},
		{
			id: 3,
			z: 1.12,
			title: "04 · ACTUATORS & PROTOTYPING",
			subtitle: "SERVOS · STEPPERS · BREADBOARD · INVENTORY"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-5.98,
				1.45,
				-.2
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.8, 2.7] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0b1120",
						roughness: .85
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.01,
						0,
						0
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.84, 2.74] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0284c7",
						emissive: "#0284c7",
						emissiveIntensity: .3,
						transparent: true,
						opacity: .4
					})]
				}),
				Array.from({ length: 32 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.015,
						0,
						-1.8 + i * .116
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.035,
						2.65,
						.014
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .6
					})]
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.04,
						.96,
						0
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.2, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: wallSignTex,
						emissive: "#38bdf8",
						emissiveMap: wallSignTex,
						emissiveIntensity: .35,
						roughness: .2
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-5.05,
				.005,
				-.2
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.03, 3.8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#38bdf8",
				emissive: "#38bdf8",
				emissiveIntensity: .8,
				toneMapped: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IoTShowcaseCabinet, {
			position: [
				-5.65,
				0,
				cabinets[0].z
			],
			categoryTitle: cabinets[0].title,
			categorySubtitle: cabinets[0].subtitle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						.68,
						-.19
					],
					title: "ARDUINO UNO",
					category: "MICROCONTROLLER",
					accentColor: "#008184",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArduinoUno, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						.68,
						.19
					],
					title: "ARDUINO MEGA",
					category: "DEVELOPMENT KIT",
					accentColor: "#0284c7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArduinoUno, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.07,
						-.19
					],
					title: "RASPBERRY PI",
					category: "SINGLE BOARD PC",
					accentColor: "#16a34a",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaspberryPiModel, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.07,
						.19
					],
					title: "RPI PICO W",
					category: "EMBEDDED SOC",
					accentColor: "#22c55e",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaspberryPiModel, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.47,
						-.19
					],
					title: "ESP 32",
					category: "IOT WIFI+BLE",
					accentColor: "#38bdf8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Esp32Module, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.47,
						.19
					],
					title: "NODE MCU",
					category: "WIFI CONTROLLER",
					accentColor: "#60a5fa",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Esp32Module, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.87,
						-.19
					],
					title: "STM32 ARM",
					category: "32-BIT CORTEX",
					accentColor: "#1d4ed8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.87,
						.19
					],
					title: "MCU CHIPS",
					category: "IC INVENTORY",
					accentColor: "#0f172a"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IoTShowcaseCabinet, {
			position: [
				-5.65,
				0,
				cabinets[1].z
			],
			categoryTitle: cabinets[1].title,
			categorySubtitle: cabinets[1].subtitle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						.68,
						-.19
					],
					title: "IR SENSORS",
					category: "OBSTACLE & TRACK",
					accentColor: "#e11d48",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrSensorModule, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						.68,
						.19
					],
					title: "ULTRASONIC",
					category: "DISTANCE SENSORS",
					accentColor: "#2563eb",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UltrasonicSensor, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.07,
						-.19
					],
					title: "PIR SENSORS",
					category: "MOTION DETECTORS",
					accentColor: "#16a34a",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PirSensor, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.07,
						.19
					],
					title: "ESP32-CAM",
					category: "AI VISION MODULE",
					accentColor: "#0284c7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Esp32Cam, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.47,
						-.19
					],
					title: "DHT22 SENSORS",
					category: "TEMP & HUMIDITY",
					accentColor: "#06b6d4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dht22Sensor, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.47,
						.19
					],
					title: "MQ SENSORS",
					category: "GAS & AIR QUALITY",
					accentColor: "#eab308",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MqGasSensor, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.87,
						-.19
					],
					title: "SOIL PROBES",
					category: "MOISTURE SENSORS",
					accentColor: "#ca8a04"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.87,
						.19
					],
					title: "OPTICAL LDR",
					category: "LIGHT DETECTORS",
					accentColor: "#10b981"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IoTShowcaseCabinet, {
			position: [
				-5.65,
				0,
				cabinets[2].z
			],
			categoryTitle: cabinets[2].title,
			categorySubtitle: cabinets[2].subtitle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						.68,
						-.19
					],
					title: "RELAYS",
					category: "AC AUTOMATION",
					accentColor: "#2563eb",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DualRelayModule, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						.68,
						.19
					],
					title: "OLED DISPLAYS",
					category: "I2C HUD GRAPHICS",
					accentColor: "#06b6d4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OledDisplay, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.07,
						-.19
					],
					title: "LORA NODES",
					category: "LONG RANGE WIRELESS",
					accentColor: "#7c3aed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoraModule, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.07,
						.19
					],
					title: "LCD 1602",
					category: "CHARACTER MODULES",
					accentColor: "#0284c7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OledDisplay, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.47,
						-.19
					],
					title: "4-CH RELAYS",
					category: "POWER AUTOMATION",
					accentColor: "#3b82f6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DualRelayModule, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.47,
						.19
					],
					title: "ZIGBEE / BLE",
					category: "MESH PROTOCOLS",
					accentColor: "#8b5cf6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoraModule, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.87,
						-.19
					],
					title: "DC-DC POWER",
					category: "BUCK CONVERTERS",
					accentColor: "#f59e0b"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.87,
						.19
					],
					title: "BMS BOARDS",
					category: "BATTERY SHIELDS",
					accentColor: "#ef4444"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IoTShowcaseCabinet, {
			position: [
				-5.65,
				0,
				cabinets[3].z
			],
			categoryTitle: cabinets[3].title,
			categorySubtitle: cabinets[3].subtitle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						.68,
						-.19
					],
					title: "BREADBOARD",
					category: "PROTOTYPING CIRCUIT",
					accentColor: "#38bdf8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypingBreadboard, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						.68,
						.19
					],
					title: "JUMPERS",
					category: "CONNECTING WIRES",
					accentColor: "#f97316"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.07,
						-.19
					],
					title: "SG90 SERVOS",
					category: "MICRO ACTUATORS",
					accentColor: "#0284c7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServoMotorModel, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.07,
						.19
					],
					title: "MG996R",
					category: "HIGH TORQUE MOTORS",
					accentColor: "#2563eb",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServoMotorModel, {
						position: [
							0,
							0,
							0
						],
						rotation: 1.5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.47,
						-.19
					],
					title: "STEPPERS",
					category: "28BYJ-48 MOTORS",
					accentColor: "#16a34a",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepperMotorKit, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.47,
						.19
					],
					title: "DRIVERS",
					category: "ULN2003 / L298N",
					accentColor: "#eab308",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepperMotorKit, { position: [
						0,
						0,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.87,
						-.19
					],
					title: "RESISTORS",
					category: "PASSIVE COMPONENTS",
					accentColor: "#ca8a04"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentKitBox, {
					position: [
						0,
						1.87,
						.19
					],
					title: "CAPACITORS",
					category: "ELECTROLYTIC KITS",
					accentColor: "#64748b"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-5.25,
				0,
				-2.15
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.22,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.16,
					.12,
					.44,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .4
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.52,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.22,
					12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#15803d",
					roughness: .6
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-5.25,
				0,
				1.75
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.22,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.16,
					.12,
					.44,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .4
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.52,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.22,
					12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#166534",
					roughness: .6
				})]
			})]
		})
	] });
}
function createTextCanvas$3(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makeIdeScreenTexture() {
	return createTextCanvas$3(512, 320, (ctx, w, h) => {
		ctx.fillStyle = "#1e1e1e";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#333333";
		ctx.fillRect(0, 0, 36, h);
		ctx.fillStyle = "#007acc";
		ctx.fillRect(0, 20, 3, 24);
		ctx.fillStyle = "#252526";
		ctx.fillRect(36, 0, 95, h);
		ctx.fillStyle = "#cccccc";
		ctx.font = "bold 9px monospace";
		ctx.fillText("EXPLORER", 44, 18);
		[
			"main.py",
			"robot_arm.py",
			"vision_ai.cpp",
			"kinematics.h",
			"config.json"
		].forEach((f, i) => {
			ctx.fillStyle = i === 1 ? "#38bdf8" : "#9cdcfe";
			ctx.font = "8px monospace";
			ctx.fillText(f, 44, 38 + i * 16);
		});
		ctx.fillStyle = "#2d2d2d";
		ctx.fillRect(131, 0, w - 131, 22);
		ctx.fillStyle = "#1e1e1e";
		ctx.fillRect(131, 0, 110, 22);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 9px monospace";
		ctx.fillText("robot_arm.py", 145, 14);
		[
			{
				text: "import rospy",
				col: "#c586c0"
			},
			{
				text: "from sensor_msgs.msg import JointState",
				col: "#4ec9b0"
			},
			{
				text: "from avp_kinematics import DHModel, InverseKinematics",
				col: "#dcdcaa"
			},
			{
				text: "",
				col: "#d4d4d4"
			},
			{
				text: "class RoboticArmController:",
				col: "#4ec9b0"
			},
			{
				text: "    def __init__(self, dof=6):",
				col: "#dcdcaa"
			},
			{
				text: "        self.kinematics = DHModel.load_urdf('avp_arm.urdf')",
				col: "#9cdcfe"
			},
			{
				text: "        self.target_tcp = [342.5, -128.4, 415.8]",
				col: "#b5cea8"
			},
			{
				text: "        rospy.loginfo('● 6-DOF KINEMATICS SOLVER READY')",
				col: "#6a9955"
			},
			{
				text: "    def solve_ik(self, x, y, z):",
				col: "#dcdcaa"
			},
			{
				text: "        joints = self.kinematics.inverse(x, y, z)",
				col: "#9cdcfe"
			},
			{
				text: "        return [round(j, 2) for j in joints]",
				col: "#c586c0"
			}
		].forEach((line, i) => {
			ctx.fillStyle = "#858585";
			ctx.font = "8px monospace";
			ctx.fillText(String(i + 1), 138, 38 + i * 14);
			ctx.fillStyle = line.col;
			ctx.fillText(line.text, 160, 38 + i * 14);
		});
		ctx.fillStyle = "#181818";
		ctx.fillRect(131, h - 65, w - 131, 65);
		ctx.fillStyle = "#007acc";
		ctx.fillRect(131, h - 65, w - 131, 2);
		ctx.fillStyle = "#4ec9b0";
		ctx.font = "bold 9px monospace";
		ctx.fillText("TERMINAL: bash · python3 main.py", 142, h - 48);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 8px monospace";
		ctx.fillText("[SUCCESS] Trajectory planned in 1.4ms. Joint limits verified.", 142, h - 30);
		ctx.fillStyle = "#38bdf8";
		ctx.fillText("avp-student@innovation-hub:~/robotics$ _", 142, h - 14);
	});
}
function Zone7WorkstationsShowcase({ laptop }) {
	const ideTex = (0, import_react.useMemo)(() => makeIdeScreenTexture(), []);
	const materials = (0, import_react.useMemo)(() => ({
		tableTop: new MeshStandardMaterial({
			color: "#ebd5b3",
			roughness: .45
		}),
		tableTrim: new MeshStandardMaterial({
			color: "#dfc49f",
			roughness: .55
		}),
		steelLegs: new MeshStandardMaterial({
			color: "#f8fafc",
			metalness: .65,
			roughness: .3
		}),
		powerRail: new MeshStandardMaterial({
			color: "#e2e8f0",
			metalness: .8,
			roughness: .3
		}),
		ledStrip: new MeshStandardMaterial({
			color: "#38bdf8",
			emissive: "#38bdf8",
			emissiveIntensity: 1
		}),
		laptopChassis: new MeshStandardMaterial({
			color: "#cbd5e1",
			metalness: .85,
			roughness: .25
		}),
		laptopScreenMat: new MeshStandardMaterial({
			map: ideTex,
			emissive: "#ffffff",
			emissiveMap: ideTex,
			emissiveIntensity: .65,
			roughness: .2
		}),
		chairMesh: new MeshStandardMaterial({
			color: "#334155",
			roughness: .75
		}),
		chairSeat: new MeshStandardMaterial({
			color: "#1e293b",
			roughness: .85
		}),
		chairChrome: new MeshStandardMaterial({
			color: "#cbd5e1",
			metalness: .9,
			roughness: .15
		}),
		breadboardMat: new MeshStandardMaterial({
			color: "#f8fafc",
			roughness: .4
		}),
		trayMat: new MeshStandardMaterial({
			color: "#0284c7",
			roughness: .3
		})
	}), [ideTex]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: TABLE_LAYOUT.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			t.x,
			0,
			t.z
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.74,
					0
				],
				material: materials.tableTop,
				castShadow: true,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.36,
					.04,
					.72
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.725,
					0
				],
				material: materials.tableTrim,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.38,
					.015,
					.74
				] })
			}),
			[-.62, .62].flatMap((x) => [-.3, .3].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					x,
					.36,
					z
				],
				material: materials.steelLegs,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.02,
					.02,
					.72,
					12
				] })
			}, `${x}-${z}`))),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.68,
					0
				],
				material: materials.powerRail,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.24,
					.03,
					.06
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.77,
					0
				],
				material: materials.powerRail,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.9,
					.025,
					.08
				] })
			}),
			[
				-.25,
				0,
				.25
			].map((px, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					px,
					.785,
					0
				],
				material: materials.ledStrip,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.04,
					.005,
					.012
				] })
			}, i)),
			[
				-.38,
				0,
				.38
			].map((x, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					.76,
					.12
				],
				rotation: [
					0,
					(j - 1) * .08,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.006,
							0
						],
						material: materials.laptopChassis,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.26,
							.01,
							.18
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.011,
							.04
						],
						material: materials.chairSeat,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.08, .05] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.01,
							-.09
						],
						rotation: [
							-.35,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.08,
								0
							],
							material: materials.laptopChassis,
							castShadow: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.26,
								.16,
								.008
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.08,
								.005
							],
							material: materials.laptopScreenMat,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.24, .14] })
						})]
					})
				]
			}, `lap-${j}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.42,
					.765,
					-.18
				],
				rotation: [
					0,
					-.2,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						material: materials.breadboardMat,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.16,
							.01,
							.06
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.02,
							.01,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.05,
							.006,
							.028
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.03,
							.012,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.004,
							6,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#22c55e",
							emissive: "#22c55e",
							emissiveIntensity: 1
						})]
					})
				]
			}),
			[
				-.38,
				0,
				.38
			].map((x, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					0,
					.54
				],
				rotation: [
					0,
					Math.PI,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.46,
							0
						],
						material: materials.chairSeat,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.38,
							.05,
							.38
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.74,
							-.17
						],
						material: materials.chairMesh,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.36,
							.42,
							.03
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.23,
							0
						],
						material: materials.chairChrome,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.022,
							.025,
							.44,
							10
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.03,
							0
						],
						material: materials.chairSeat,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.18,
							.18,
							.02,
							10
						] })
					})
				]
			}, `chair-f-${j}`)),
			[-.38, .38].map((x, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					0,
					-.54
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.46,
							0
						],
						material: materials.chairSeat,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.38,
							.05,
							.38
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.74,
							-.17
						],
						material: materials.chairMesh,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.36,
							.42,
							.03
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.23,
							0
						],
						material: materials.chairChrome,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.022,
							.025,
							.44,
							10
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.03,
							0
						],
						material: materials.chairSeat,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.18,
							.18,
							.02,
							10
						] })
					})
				]
			}, `chair-b-${j}`))
		]
	}, idx)) });
}
function createTextCanvas$2(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makePyTorchDashboardTexture() {
	return createTextCanvas$2(640, 400, (ctx, w, h) => {
		ctx.fillStyle = "#070b14";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(0, 0, w, 44);
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, 44);
		ctx.lineTo(w, 44);
		ctx.stroke();
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 15px 'Outfit', sans-serif, system-ui";
		ctx.fillText("AVP NEURAL TRAINING BENCHMARK // PYTORCH 2.5", 18, 28);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 12px monospace";
		ctx.fillText("● TRAINING IN PROGRESS · EPOCH 184/200", 350, 28);
		[
			{
				label: "TRAIN LOSS",
				val: "0.0421",
				col: "#22c55e",
				x: 18,
				w: 140
			},
			{
				label: "VAL ACCURACY",
				val: "98.74%",
				col: "#38bdf8",
				x: 170,
				w: 140
			},
			{
				label: "GPU VRAM",
				val: "18.4 / 24 GB",
				col: "#f59e0b",
				x: 322,
				w: 145
			},
			{
				label: "GPU TEMP",
				val: "62°C (315W)",
				col: "#a855f7",
				x: 479,
				w: 143
			}
		].forEach((k) => {
			ctx.fillStyle = "#1e293b";
			ctx.fillRect(k.x, 56, k.w, 54);
			ctx.strokeStyle = "#334155";
			ctx.strokeRect(k.x, 56, k.w, 54);
			ctx.fillStyle = "#94a3b8";
			ctx.font = "bold 10px monospace";
			ctx.fillText(k.label, k.x + 12, 74);
			ctx.fillStyle = k.col;
			ctx.font = "bold 16px monospace";
			ctx.fillText(k.val, k.x + 12, 98);
		});
		const gx = 18;
		const gy = 124;
		const gw = 380;
		const gh = 220;
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(gx, gy, gw, gh);
		ctx.strokeStyle = "#1e293b";
		ctx.strokeRect(gx, gy, gw, gh);
		ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
		ctx.lineWidth = 1;
		for (let y = 154; y < 344; y += 40) {
			ctx.beginPath();
			ctx.moveTo(gx, y);
			ctx.lineTo(398, y);
			ctx.stroke();
		}
		ctx.fillStyle = "#94a3b8";
		ctx.font = "bold 11px monospace";
		ctx.fillText("LOSS CURVE (CROSS-ENTROPY)", 32, 146);
		ctx.strokeStyle = "#22c55e";
		ctx.lineWidth = 3;
		ctx.beginPath();
		for (let x = 0; x < 340; x++) {
			const prog = x / 340;
			const py = 324 - (1.8 * Math.exp(-prog * 4.2) + .08 + Math.sin(prog * 30) * .02) * 160;
			if (x === 0) ctx.moveTo(38 + x, py);
			else ctx.lineTo(38 + x, py);
		}
		ctx.stroke();
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 2;
		ctx.setLineDash([4, 4]);
		ctx.beginPath();
		for (let x = 0; x < 340; x++) {
			const prog = x / 340;
			const py = 324 - (1.9 * Math.exp(-prog * 3.8) + .12 + Math.cos(prog * 25) * .03) * 160;
			if (x === 0) ctx.moveTo(38 + x, py);
			else ctx.lineTo(38 + x, py);
		}
		ctx.stroke();
		ctx.setLineDash([]);
		const rx = 414;
		const rw = 208;
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(rx, gy, rw, gh);
		ctx.strokeStyle = "#1e293b";
		ctx.strokeRect(rx, gy, rw, gh);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 11px monospace";
		ctx.fillText("LAYER PROFILE", 428, 146);
		[
			[
				"Input (RGB-D)",
				"224x224x4",
				"#38bdf8"
			],
			[
				"Conv2D + BatchNorm",
				"64 filters",
				"#93c5fd"
			],
			[
				"ResBlock x4",
				"Residual Add",
				"#c084fc"
			],
			[
				"Self-Attention",
				"8 Heads",
				"#f43f5e"
			],
			[
				"Dense Linear",
				"1000 Classes",
				"#22c55e"
			]
		].forEach(([lName, lDim, col], i) => {
			const ly = 162 + i * 34;
			ctx.fillStyle = "#1e293b";
			ctx.fillRect(424, ly, 188, 28);
			ctx.fillStyle = "#f8fafc";
			ctx.font = "10px monospace";
			ctx.fillText(lName, 430, ly + 18);
			ctx.fillStyle = col;
			ctx.font = "bold 10px monospace";
			ctx.fillText(lDim, 534, ly + 18);
		});
		ctx.fillStyle = "#64748b";
		ctx.font = "10px monospace";
		ctx.fillText("LEARNING RATE: 1e-4 · OPTIMIZER: AdamW (weight_decay=0.01) · AMP: FP16 MIXED PRECISION", 18, h - 14);
	});
}
function makeZone8BannerTexture() {
	return createTextCanvas$2(1024, 256, (ctx, w, h) => {
		ctx.fillStyle = "#070d1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#00b4d8";
		ctx.lineWidth = 5;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#00b4d8";
		ctx.fillRect(8, 8, 14, h - 16);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 20px monospace";
		ctx.fillText("ZONE 08 // EDGE AI & DEEP LEARNING COMPUTE CLUSTER", 38, 48);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 38px 'Outfit', sans-serif, system-ui";
		ctx.fillText("ARTIFICIAL INTELLIGENCE & NEURAL LAB", 38, 98);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "16px 'Outfit', sans-serif, system-ui";
		ctx.fillText("PyTorch & TensorRT Accelerators · High-Density GPU Rack · Edge AI Jetson Orin Nodes", 38, 134);
		[
			{
				label: "GPU ACCEL",
				text: "4x TENSOR CORES",
				color: "#38bdf8",
				x: 38,
				w: 220
			},
			{
				label: "PYTORCH STACK",
				text: "CUDA 12.6 MIXED-FP16",
				color: "#22c55e",
				x: 274,
				w: 210
			},
			{
				label: "EDGE INFERENCE",
				text: "JETSON 275 TOPS",
				color: "#f59e0b",
				x: 500,
				w: 220
			},
			{
				label: "LATENCY TARGET",
				text: "3.2ms REALTIME",
				color: "#a855f7",
				x: 736,
				w: 248
			}
		].forEach((c) => {
			ctx.fillStyle = "#0c1930";
			ctx.fillRect(c.x, 154, c.w, 82);
			ctx.fillStyle = "#38bdf8";
			ctx.font = "bold 11px monospace";
			ctx.fillText(c.label, c.x + 16, 178);
			ctx.fillStyle = "#1e293b";
			ctx.fillRect(c.x + 10, 186, c.w - 20, 40);
			ctx.strokeStyle = c.color;
			ctx.lineWidth = 1.5;
			ctx.strokeRect(c.x + 10, 186, c.w - 20, 40);
			ctx.fillStyle = c.color;
			ctx.font = "bold 13px monospace";
			ctx.fillText(c.text, c.x + 18, 211);
		});
	});
}
function Zone8AIServerShowcase({ vision }) {
	const pytorchTex = (0, import_react.useMemo)(() => makePyTorchDashboardTexture(), []);
	const bannerTex = (0, import_react.useMemo)(() => makeZone8BannerTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			2.55,
			0,
			2.55
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					1.95,
					-.58
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.55,
						.95,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						roughness: .5
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.18,
						.015
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.3, .44] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: bannerTex,
						emissive: "#ffffff",
						emissiveMap: bannerTex,
						emissiveIntensity: .28,
						roughness: .45,
						polygonOffset: true,
						polygonOffsetFactor: -1,
						polygonOffsetUnits: -1
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.88,
					0,
					-.05
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.65,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.55,
							1.3,
							.65
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							metalness: .8,
							roughness: .25
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.65,
							.33
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.5, 1.2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0284c7",
							transparent: true,
							opacity: .35,
							metalness: .9,
							roughness: .1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.65,
							.325
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.48,
							1.18,
							.01
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							color: "#38bdf8",
							wireframe: true,
							transparent: true,
							opacity: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.85,
							.1
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.46,
									.18,
									.4
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									metalness: .6
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									.201
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.44, .16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#090d16",
									metalness: .8
								})]
							}),
							[
								-.15,
								-.05,
								.05,
								.15
							].map((lx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									lx,
									.04,
									.203
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.006,
									8,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: i % 2 === 0 ? "#22c55e" : "#38bdf8",
									emissive: i % 2 === 0 ? "#22c55e" : "#38bdf8",
									emissiveIntensity: 1
								})]
							}, i))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.6,
							.1
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.46,
								.08,
								.4
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#334155",
								metalness: .7
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								.201
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.4, .03] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#22c55e",
								emissive: "#22c55e",
								emissiveIntensity: .8
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.4,
							.1
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.46,
								.08,
								.4
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#1e293b",
								metalness: .7
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.1,
								0,
								.201
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.08, .03] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#ef4444",
								emissive: "#ef4444",
								emissiveIntensity: 1
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.4,
					0,
					-.05
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.74,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.5,
							.045,
							.8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.725,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.52,
							.02,
							.82
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#dfc49f",
							roughness: .5
						})]
					}),
					[-.68, .68].flatMap((x) => [-.34, .34].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							.36,
							z
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.022,
							.022,
							.72,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							metalness: .7
						})]
					}, `${x}-${z}`))),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.15,
							.765,
							-.06
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.12,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.02,
									.025,
									.24,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#94a3b8",
									metalness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.005,
									.04
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.2,
									.01,
									.14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#334155",
									metalness: .7
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.3,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.68,
									.38,
									.03
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									metalness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.3,
									.016
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.65, .35] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									map: pytorchTex,
									emissive: "#ffffff",
									emissiveMap: pytorchTex,
									emissiveIntensity: .65,
									roughness: .2,
									polygonOffset: true,
									polygonOffsetFactor: -1,
									polygonOffsetUnits: -1
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.45,
							.765,
							-.04
						],
						rotation: [
							0,
							-.25,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.14,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.018,
									.02,
									.28,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#94a3b8",
									metalness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.32,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.3,
									.46,
									.025
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									metalness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.32,
									.014
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.27, .43] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#091326",
									emissive: "#00b4d8",
									emissiveIntensity: .4,
									roughness: .2
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.55,
							.77,
							.18
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.02,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.26,
									.01,
									.16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#ffffff",
									transparent: true,
									opacity: .6,
									metalness: .3
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
								position: [
									-.05,
									.04,
									0
								],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										castShadow: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
											.1,
											.035,
											.1
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#1e293b",
											metalness: .9,
											roughness: .2
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											0,
											.02,
											0
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
											.035,
											.035,
											.005,
											16
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#0284c7",
											metalness: .8
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											.045,
											.01,
											.045
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.004,
											6,
											6
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#22c55e",
											emissive: "#22c55e",
											emissiveIntensity: 1
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
								position: [
									.07,
									.03,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.07,
										.012,
										.05
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#15803d",
										roughness: .4
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										.01,
										0
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.02,
										.008,
										.02
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#cbd5e1",
										metalness: .9
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							0,
							.6
						],
						rotation: [
							0,
							Math.PI,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.46,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.42,
									.05,
									.42
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									roughness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.74,
									-.18
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.4,
									.44,
									.03
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#334155",
									roughness: .7
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.23,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.025,
									.025,
									.44,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#cbd5e1",
									metalness: .9
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
				position: [
					0,
					2.4,
					.5
				],
				"target-position": [
					0,
					.7,
					0
				],
				color: "#38bdf8",
				intensity: 1.8,
				distance: 4.2,
				angle: .6,
				penumbra: .35
			})
		]
	});
}
function createTextCanvas$1(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makeZone9BannerTexture() {
	return createTextCanvas$1(1024, 256, (ctx, w, h) => {
		ctx.fillStyle = "#070d1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#00b4d8";
		ctx.lineWidth = 5;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#00b4d8";
		ctx.fillRect(8, 8, 14, h - 16);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "bold 20px monospace";
		ctx.fillText("ZONE 09 // SPATIAL COMPUTING & AR/VR IMMERSIVE LAB", 38, 48);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 38px 'Outfit', sans-serif, system-ui";
		ctx.fillText("IMMERSIVE SPATIAL PROTOTYPING & XR", 38, 98);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "16px 'Outfit', sans-serif, system-ui";
		ctx.fillText("VisionOS Spatial Experiences · Room-Scale LiDAR Meshing · 6-DOF Mixed Reality · Holographic Displays", 38, 134);
		[
			{
				label: "SPATIAL VISOR",
				text: "APPLE VISION PRO 4K",
				color: "#38bdf8",
				x: 38,
				w: 220
			},
			{
				label: "MIXED REALITY",
				text: "QUEST 3 PASSTHROUGH",
				color: "#22c55e",
				x: 274,
				w: 210
			},
			{
				label: "TRACKING STACK",
				text: "ROOM-SCALE LIDAR MESH",
				color: "#f59e0b",
				x: 500,
				w: 220
			},
			{
				label: "HOLOGRAPHY",
				text: "VOLUMETRIC PROJECTION",
				color: "#a855f7",
				x: 736,
				w: 248
			}
		].forEach((c) => {
			ctx.fillStyle = "#0c1930";
			ctx.fillRect(c.x, 154, c.w, 82);
			ctx.fillStyle = "#38bdf8";
			ctx.font = "bold 11px monospace";
			ctx.fillText(c.label, c.x + 16, 178);
			ctx.fillStyle = "#1e293b";
			ctx.fillRect(c.x + 10, 186, c.w - 20, 40);
			ctx.strokeStyle = c.color;
			ctx.lineWidth = 1.5;
			ctx.strokeRect(c.x + 10, 186, c.w - 20, 40);
			ctx.fillStyle = c.color;
			ctx.font = "bold 13px monospace";
			ctx.fillText(c.text, c.x + 18, 211);
		});
	});
}
function FloatingHologram() {
	const meshRef = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += delta * .8;
			meshRef.current.rotation.x += delta * .4;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			.9,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: meshRef,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.16, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#38bdf8",
					wireframe: true,
					transparent: true,
					opacity: .85
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.07, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#00b4d8",
				emissive: "#00b4d8",
				emissiveIntensity: 1.2,
				toneMapped: false
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.22,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.08,
					.18,
					.45,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#38bdf8",
					transparent: true,
					opacity: .12,
					side: 2
				})]
			})
		]
	});
}
function Zone9SpatialVRShowcase({ mural }) {
	const bannerTex = (0, import_react.useMemo)(() => makeZone9BannerTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-4.35,
			0,
			2.55
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-1.15,
					1.95,
					.1
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.55,
						.95,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						roughness: .5
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.18,
						.015
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.3, .44] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: bannerTex,
						emissive: "#ffffff",
						emissiveMap: bannerTex,
						emissiveIntensity: .28,
						roughness: .45,
						polygonOffset: true,
						polygonOffsetFactor: -1,
						polygonOffsetUnits: -1
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.1,
					0,
					-.1
				],
				rotation: [
					0,
					.35,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.08,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.75,
							.12,
							.75
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.26,
							.04
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.7,
							.24,
							.65
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f1f5f9",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.54,
							-.28
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.7,
							.42,
							.18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.8,
							.42,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.15,
							.3,
							.72
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.8,
							.42,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.15,
							.3,
							.72
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.45,
							.42,
							-.18
						],
						rotation: [
							.15,
							.1,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.28,
							.28,
							.1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0284c7",
							roughness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.45,
							.42,
							-.18
						],
						rotation: [
							.15,
							-.15,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.28,
							.28,
							.1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0ea5e9",
							roughness: .6
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.2,
					0,
					.75
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.32,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.42,
							.44,
							.04,
							32
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .4
						})]
					}),
					[
						0,
						2 * Math.PI / 3,
						4 * Math.PI / 3
					].map((ang, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.28 * Math.cos(ang),
							.15,
							.28 * Math.sin(ang)
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.025,
							.03,
							.3,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ebd5b3",
							roughness: .4
						})]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.14,
							.34,
							-.06
						],
						rotation: [
							0,
							.4,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.01,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.065,
									.07,
									.015,
									20
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									metalness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.018,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.055,
									.055,
									.003,
									20
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#38bdf8",
									emissive: "#38bdf8",
									emissiveIntensity: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
								position: [
									0,
									.045,
									0
								],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										castShadow: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.075,
											24,
											16
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#050811",
											roughness: .1,
											metalness: .9
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											0,
											0,
											.04
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.065,
											16,
											12
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#00b4d8",
											emissive: "#00b4d8",
											emissiveIntensity: .5,
											transparent: true,
											opacity: .6
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											0,
											0,
											-.01
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
											.072,
											.008,
											12,
											32
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#cbd5e1",
											metalness: .9,
											roughness: .2
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											0,
											0,
											-.075
										],
										rotation: [
											0,
											0,
											0
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
											.078,
											.014,
											12,
											28,
											Math.PI
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
											color: "#f97316",
											roughness: .8
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.15,
							.34,
							.08
						],
						rotation: [
							0,
							-.35,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								0,
								.04,
								0
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.14,
										.065,
										.08
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#f8fafc",
										roughness: .3
									})]
								}),
								[
									-.035,
									0,
									.035
								].map((cx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										cx,
										0,
										.041
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.014,
										.038,
										.004
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#0f172a",
										metalness: .8
									})]
								}, i)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										0,
										-.042
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.13,
										.06,
										.015
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#334155",
										roughness: .9
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								.12,
								.02,
								0
							],
							rotation: [
								0,
								0,
								.5
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.03,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.014,
									.012,
									.09,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f8fafc" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.07,
									.01
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.025,
									.025,
									.015,
									14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0f172a" })]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.55,
					0,
					.88
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.32,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.24,
							.28,
							.64,
							28
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							metalness: .8,
							roughness: .25
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.64,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.245,
							.245,
							.02,
							28
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							metalness: .9
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.655,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.18,
							.18,
							.01,
							28
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#00b4d8",
							emissive: "#00b4d8",
							emissiveIntensity: 1,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingHologram, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.95,
					0,
					.1
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.22,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.14,
							.1,
							.44,
							20
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f8fafc",
							roughness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.42,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.13,
							.13,
							.02,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#3e2723",
							roughness: .9
						})]
					}),
					[
						-.5,
						.3,
						1.2,
						2.1,
						3,
						3.8
					].map((rot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							.44 + i * .08,
							0
						],
						rotation: [
							.2,
							rot,
							.2
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.12,
								.04,
								0
							],
							rotation: [
								0,
								0,
								-.4
							],
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.1,
								8,
								8
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#15803d",
								roughness: .4
							})]
						})
					}, i))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					2.2,
					.8
				],
				color: "#7dd3fc",
				intensity: 1.4,
				distance: 3.8
			})
		]
	});
}
function createTextCanvas(width, height, draw) {
	const c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, width, height);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	tex.needsUpdate = true;
	return tex;
}
function makeProjectWallSignTexture() {
	return createTextCanvas(1024, 180, (ctx, w, h) => {
		ctx.fillStyle = "#070b14";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "rgba(224, 86, 160, 0.55)";
		ctx.lineWidth = 4;
		ctx.strokeRect(4, 4, w - 8, h - 8);
		ctx.fillStyle = "#e056a0";
		ctx.fillRect(36, 22, 175, 26);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
		ctx.fillText("AVP INNOVATION HUB", 48, 40);
		ctx.fillStyle = "#f8fafc";
		ctx.font = "bold 42px 'Outfit', sans-serif, system-ui";
		ctx.fillText("ZONE 10 · PROJECT DISPLAY & INNOVATION WALL", 36, 102);
		ctx.fillStyle = "#f472b6";
		ctx.font = "17px 'Outfit', sans-serif, system-ui";
		ctx.fillText("STUDENT ROBOTICS · 3D MECHANISMS · SMART IOT BUILDS · COMPETITION AWARDS", 36, 144);
	});
}
function makeBayMarqueeTexture(title, subtitle, accentColor) {
	return createTextCanvas(512, 110, (ctx, w, h) => {
		ctx.fillStyle = "#090d16";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = accentColor;
		ctx.lineWidth = 4;
		ctx.strokeRect(2, 2, w - 4, h - 4);
		ctx.fillStyle = accentColor;
		ctx.fillRect(4, 4, 14, h - 8);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 30px 'Outfit', sans-serif, system-ui";
		ctx.fillText(title, 28, 44);
		ctx.fillStyle = accentColor;
		ctx.font = "bold 16px 'Outfit', sans-serif, system-ui";
		ctx.fillText(subtitle, 28, 76);
	});
}
function makeExhibitPlacardTexture(code, title, subtitle, color = "#f43f5e") {
	return createTextCanvas(512, 140, (ctx, w, h) => {
		ctx.fillStyle = "#080e1a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = color;
		ctx.lineWidth = 3;
		ctx.strokeRect(2, 2, w - 4, h - 4);
		ctx.fillStyle = color;
		ctx.fillRect(4, 4, 10, h - 8);
		ctx.fillStyle = color;
		ctx.font = "bold 16px monospace";
		ctx.fillText(code, 26, 32);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 32px 'Outfit', sans-serif, system-ui";
		ctx.fillText(title, 26, 76);
		ctx.fillStyle = "rgba(226, 232, 240, 0.75)";
		ctx.font = "bold 14px 'Outfit', sans-serif, system-ui";
		ctx.fillText(subtitle, 26, 114);
	});
}
function makeAwardCertificateTexture(title, sub, org) {
	return createTextCanvas(512, 360, (ctx, w, h) => {
		ctx.fillStyle = "#fcfaf4";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#b45309";
		ctx.lineWidth = 6;
		ctx.strokeRect(8, 8, w - 16, h - 16);
		ctx.strokeStyle = "#f59e0b";
		ctx.lineWidth = 2;
		ctx.strokeRect(16, 16, w - 32, h - 32);
		ctx.fillStyle = "#1e293b";
		ctx.font = "bold 16px 'Outfit', sans-serif, system-ui";
		ctx.textAlign = "center";
		ctx.fillText("CERTIFICATE OF EXCELLENCE", w / 2, 56);
		ctx.fillStyle = "#b45309";
		ctx.font = "bold 28px 'Outfit', sans-serif, system-ui";
		ctx.fillText(title, w / 2, 116);
		ctx.fillStyle = "#334155";
		ctx.font = "17px serif";
		ctx.fillText(sub, w / 2, 166);
		ctx.fillStyle = "#f59e0b";
		ctx.beginPath();
		ctx.arc(w / 2, 230, 28, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 11px sans-serif";
		ctx.fillText("★ 1ST ★", w / 2, 234);
		ctx.fillStyle = "#64748b";
		ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
		ctx.fillText(org, w / 2, 310);
	});
}
function ExhibitPlacard({ position, texture }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation: [
			0,
			-Math.PI / 2,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.005,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.28,
				.01,
				.06
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#090d16",
				roughness: .6
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.038,
				0
			],
			rotation: [
				-Math.PI / 7,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.26,
				.075,
				.012
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: texture,
				roughness: .25,
				metalness: .2,
				emissive: "#ffffff",
				emissiveMap: texture,
				emissiveIntensity: .32
			})]
		})]
	});
}
function ExhibitionBay({ position, title, subtitle, accentColor, children }) {
	const W = .88;
	const D = .44;
	const H = 2.15;
	const frameColor = "#0f172a";
	const marqueeTex = (0, import_react.useMemo)(() => makeBayMarqueeTexture(title, subtitle, accentColor), [
		title,
		subtitle,
		accentColor
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					D / 2 - .01,
					H / 2,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.015,
					H,
					W
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0b1120",
					roughness: .7,
					metalness: .3
				})]
			}),
			[-.38, W / 2 - .06].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					D / 2 - .02,
					H / 2,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.006,
					.006,
					2.05,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: accentColor,
					emissive: accentColor,
					emissiveIntensity: .8,
					toneMapped: false
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					H / 2,
					-.88 / 2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					D,
					H,
					.024
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: frameColor,
					roughness: .35,
					metalness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					H / 2,
					W / 2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					D,
					H,
					.024
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: frameColor,
					roughness: .35,
					metalness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.44 / 2,
					H / 2,
					-.435
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.012,
					2.07,
					.008
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: accentColor,
					emissive: accentColor,
					emissiveIntensity: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.44 / 2,
					H / 2,
					W / 2 - .005
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.012,
					2.07,
					.008
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: accentColor,
					emissive: accentColor,
					emissiveIntensity: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.04,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.45,
					.08,
					.89
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#070a12",
					roughness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.34,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					.52,
					.85
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#111827",
					roughness: .5,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.215,
					.34,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.008,
					.48,
					.84
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .4
				})]
			}),
			[-.08, .08].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.44 / 2 - .005,
					.38,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.015,
					.12,
					.015
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					metalness: .8,
					roughness: .2
				})]
			}, i)),
			[
				.62,
				1.12,
				1.62
			].map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					y,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.42,
							.018,
							.85
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e0f2fe",
							transparent: true,
							opacity: .65,
							roughness: .1,
							metalness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.21,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.02,
							.022,
							.86
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#334155",
							metalness: .7,
							roughness: .25
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.014,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.36,
							.008,
							.8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: accentColor,
							emissive: accentColor,
							emissiveIntensity: .85,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
						position: [
							0,
							-.1,
							0
						],
						color: accentColor,
						intensity: .6,
						distance: 1.1,
						decay: 2
					})
				]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					2.05,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.46,
					.2,
					.9
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#090d16",
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.44 / 2 - .011,
					2.05,
					0
				],
				rotation: [
					0,
					-Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.84, .17] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: marqueeTex,
					emissive: "#ffffff",
					emissiveMap: marqueeTex,
					emissiveIntensity: .35,
					roughness: .25
				})]
			}),
			children
		]
	});
}
function ChampionshipTrophy({ position }) {
	const goldMat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#f59e0b",
		metalness: .88,
		roughness: .18
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.03,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.18,
					.06,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#090d16",
					roughness: .2,
					metalness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.091,
					.03,
					0
				],
				rotation: [
					0,
					-Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.14, .035] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#fbbf24",
					metalness: .8,
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.08,
					0
				],
				castShadow: true,
				material: goldMat,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.07,
					.09,
					.04,
					16
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.13,
					0
				],
				castShadow: true,
				material: goldMat,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.035,
					.045,
					.08,
					16
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.22,
					0
				],
				castShadow: true,
				material: goldMat,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.1,
					.04,
					.14,
					16
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.285,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.095,
					.095,
					.01,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#92400e",
					roughness: .6
				})]
			}),
			[-1, 1].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.22,
					s * .11
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				material: goldMat,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.04,
					.012,
					10,
					16,
					Math.PI
				] })
			}, s)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.32,
					0
				],
				castShadow: true,
				material: goldMat,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.03] })
			})
		]
	});
}
function CrystalAward({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.015,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.07,
				.08,
				.03,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1e293b",
				metalness: .7,
				roughness: .3
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.14,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.02,
				.05,
				.22,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#38bdf8",
				emissive: "#38bdf8",
				emissiveIntensity: .3,
				transparent: true,
				opacity: .7,
				roughness: .05,
				metalness: .2
			})]
		})]
	});
}
function MedalsDisplay({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.025,
				0
			],
			rotation: [
				0,
				0,
				Math.PI / 8
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.18,
				.03,
				.32
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0f172a",
				roughness: .8
			})]
		}), [
			{
				c: "#f59e0b",
				ribbon: "#ef4444",
				z: -.09,
				label: "Gold"
			},
			{
				c: "#e2e8f0",
				ribbon: "#3b82f6",
				z: 0,
				label: "Silver"
			},
			{
				c: "#b45309",
				ribbon: "#10b981",
				z: .09,
				label: "Bronze"
			}
		].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				.02,
				.045 + (i === 1 ? .008 : 0),
				m.z
			],
			rotation: [
				0,
				0,
				Math.PI / 8
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.04,
					.005,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08,
					.004,
					.035
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: m.ribbon })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.01,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.032,
					.032,
					.006,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: m.c,
					metalness: .85,
					roughness: .25
				})]
			})]
		}, i))]
	});
}
function AutonomousRoverModel({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.01,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.34,
					.02,
					.34
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#38bdf8",
					transparent: true,
					opacity: .3,
					roughness: .1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.08,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.2,
					.045,
					.16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					metalness: .5,
					roughness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.106,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.16,
					.008,
					.14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e3a8a",
					roughness: .2,
					metalness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.111,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.14,
					.002,
					.12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0284c7",
					emissive: "#0284c7",
					emissiveIntensity: .25
				})]
			}),
			[
				[-.12, .12],
				[.12, .12],
				[-.12, -.12],
				[.12, -.12]
			].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					.05,
					z
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-x * .2,
							.01,
							0
						],
						rotation: [
							0,
							0,
							x > 0 ? .3 : -.3
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.04,
							.015,
							.015
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#475569" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.038,
							.038,
							.03,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.02,
							.02,
							.032,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#06b6d4" })]
					})
				]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.08,
					.14,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.006,
					.006,
					.08,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#334155",
					metalness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.08,
					.18,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.02,
					.02,
					.06
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1e293b" })]
			}),
			[-.016, .016].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.092,
					.18,
					z
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.009,
					.009,
					.01,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					metalness: .8
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.08,
					.18,
					.06
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.002,
					.002,
					.15,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					metalness: .9
				})]
			})
		]
	});
}
function PlanetaryGearMechanism({ position }) {
	const gearsRef = (0, import_react.useRef)(null);
	const planet1 = (0, import_react.useRef)(null);
	const planet2 = (0, import_react.useRef)(null);
	const planet3 = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		if (gearsRef.current) gearsRef.current.rotation.x += d * .9;
		if (planet1.current) planet1.current.rotation.x -= d * 1.8;
		if (planet2.current) planet2.current.rotation.x -= d * 1.8;
		if (planet3.current) planet3.current.rotation.x -= d * 1.8;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.02,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.24,
					.04,
					.24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0f172a",
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.12,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.03,
					.18,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#334155",
					metalness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.02,
					.16,
					0
				],
				rotation: [
					0,
					-Math.PI / 2,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.11,
							.016,
							12,
							28
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.036,
							.036,
							.025,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f97316",
							roughness: .35
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: gearsRef,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
								ref: planet1,
								position: [
									0,
									.072,
									0
								],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
										.034,
										.034,
										.022,
										14
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#06b6d4",
										roughness: .35
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
								ref: planet2,
								position: [
									-.062,
									-.036,
									0
								],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
										.034,
										.034,
										.022,
										14
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#06b6d4",
										roughness: .35
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
								ref: planet3,
								position: [
									.062,
									-.036,
									0
								],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
										.034,
										.034,
										.022,
										14
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#06b6d4",
										roughness: .35
									})]
								})
							})
						]
					})
				]
			})
		]
	});
}
function SmartGreenhouseModel({ position }) {
	const oledTex = (0, import_react.useMemo)(() => createTextCanvas(256, 128, (ctx, w, h) => {
		ctx.fillStyle = "#020617";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#22c55e";
		ctx.font = "bold 16px monospace";
		ctx.fillText("TERRARIUM IOT v2", 12, 26);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "14px monospace";
		ctx.fillText("HUMIDITY: 68% OK", 12, 54);
		ctx.fillText("TEMP: 24.2°C OPT", 12, 78);
		ctx.fillStyle = "#a855f7";
		ctx.fillText("PUMP: AUTO-STANDBY", 12, 104);
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.015,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.26,
					.03,
					.22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.032,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.24,
					.015,
					.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#451a03",
					roughness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.12,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.24,
					.18,
					.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e0f2fe",
					transparent: true,
					opacity: .35,
					roughness: .08,
					metalness: .1
				})]
			}),
			[-.05, .05].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					.06,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.02,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.025,
						8,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#22c55e",
						roughness: .6
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.02,
						.04,
						.01
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.02,
						8,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#16a34a",
						roughness: .6
					})]
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.215,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.24,
					.012,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f43f5e",
					emissive: "#f43f5e",
					emissiveIntensity: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.125,
					.1,
					.03
				],
				rotation: [
					0,
					-Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.09, .05] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: oledTex,
					emissive: "#38bdf8",
					emissiveMap: oledTex,
					emissiveIntensity: .4
				})]
			})
		]
	});
}
function FpvRacingDroneExhibit({ position }) {
	const rotors = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		if (rotors.current) rotors.current.children.forEach((c) => {
			c.rotation.y += delta * 18;
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.025,
					0
				],
				rotation: [
					0,
					0,
					.15
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.26,
					.02,
					.26
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.036,
					0
				],
				rotation: [
					0,
					0,
					.15
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.22,
					.004,
					.22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e056a0",
					emissive: "#e056a0",
					emissiveIntensity: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.01,
					.065,
					0
				],
				rotation: [
					0,
					0,
					.15
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							0,
							Math.PI / 4,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.18,
							.012,
							.02
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							roughness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							0,
							-Math.PI / 4,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.18,
							.012,
							.02
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							roughness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.022,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.022,
							.045,
							6,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e056a0",
							roughness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.032,
							.025,
							0
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.008,
							.008,
							.01,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#38bdf8",
							emissiveIntensity: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						ref: rotors,
						children: [
							[-.065, .065],
							[.065, .065],
							[-.065, -.065],
							[.065, -.065]
						].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								x,
								.02,
								z
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.035,
								.035,
								.002,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#38bdf8",
								transparent: true,
								opacity: .65
							})]
						}, i))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.06,
					.03,
					.1
				],
				rotation: [
					0,
					0,
					-Math.PI / 7
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.06,
						.035,
						.09
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1e293b" })]
				}), [-.025, .025].map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.005,
						.025,
						z
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.006,
						.006,
						.015,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#e056a0" })]
				}, i))]
			})
		]
	});
}
function Zone10ProjectShowcase() {
	const wallSignTex = (0, import_react.useMemo)(() => makeProjectWallSignTexture(), []);
	const placardBionic = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("PRJ-01", "BIONIC HAND", "5-AXIS TENDON DRIVE · EMG", "#f43f5e"), []);
	const placardRover = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("PRJ-02", "AI SURVEY ROVER", "AUTONOMOUS NAVIGATION · LIDAR", "#38bdf8"), []);
	const placardRobotics = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("PRJ-03", "LEGGED BIO-ROBOTS", "HEXAPOD & QUADRUPED KINEMATICS", "#eab308"), []);
	const placardTrophy = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("AWD-01", "NATIONAL CHAMPIONS", "STEM ROBOTICS OLYMPIAD 2025", "#f59e0b"), []);
	const placardPatents = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("AWD-02", "VERIFIED PATENTS", "STUDENT HARDWARE INVENTIONS", "#38bdf8"), []);
	const placardMedals = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("AWD-03", "OLYMPIC MEDALS", "GOLD · SILVER · BRONZE HONORS", "#f59e0b"), []);
	const placardGears = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("PRJ-04", "PLANETARY GEARBOX", "HIGH-TORQUE 3D EPICYCLIC DRIVE", "#f97316"), []);
	const placardTerrarium = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("PRJ-05", "SMART GREENHOUSE", "IOT CLOSED-LOOP CLIMATE NODE", "#10b981"), []);
	const placardDrone = (0, import_react.useMemo)(() => makeExhibitPlacardTexture("PRJ-06", "MICRO FPV RACER", "3D PRINTED AERO CANOPY", "#e056a0"), []);
	const certTex1 = (0, import_react.useMemo)(() => makeAwardCertificateTexture("NATIONAL STEM OLYMPIAD", "Awarded for First Place in Autonomous Robotics", "MINISTRY OF EDUCATION & TECH BOARD"), []);
	const certTex2 = (0, import_react.useMemo)(() => makeAwardCertificateTexture("YOUNG INNOVATOR PATENT", "Patent Grant: Low-Cost Bionic Prosthetic Joint", "GLOBAL PATENT & INNOVATION COUNCIL"), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				5.96,
				1.45,
				.55
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					rotation: [
						0,
						-Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.2, 2.7] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#090e1a",
						roughness: .85
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.01,
						0,
						0
					],
					rotation: [
						0,
						-Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.24, 2.74] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#e056a0",
						emissive: "#e056a0",
						emissiveIntensity: .3,
						transparent: true,
						opacity: .35
					})]
				}),
				Array.from({ length: 36 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.015,
						0,
						-2 + i * .114
					],
					rotation: [
						0,
						-Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.035,
						2.65,
						.014
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .6
					})]
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.04,
						.98,
						0
					],
					rotation: [
						0,
						-Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.4, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: wallSignTex,
						emissive: "#e056a0",
						emissiveMap: wallSignTex,
						emissiveIntensity: .35,
						roughness: .25
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ExhibitionBay, {
			position: [
				5.5,
				0,
				-.45
			],
			title: "01 · ADVANCED ROBOTICS",
			subtitle: "BIONICS · AUTONOMOUS AI · BIO-BOTS",
			accentColor: "#f43f5e",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						1.63,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.03,
								.01,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.07,
								.08,
								.02,
								16
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#0284c7",
								transparent: true,
								opacity: .4
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								.03,
								.02,
								0
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										.12,
										0
									],
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
										.028,
										.038,
										.22,
										12
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#94a3b8",
										metalness: .7,
										roughness: .25
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										.24,
										0
									],
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.025,
										.05,
										.08
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#e2e8f0",
										metalness: .5,
										roughness: .3
									})]
								}),
								[
									-.027,
									-.009,
									.009,
									.027
								].map((z, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										-.005,
										.29,
										z
									],
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.012,
										.085,
										.014
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#38bdf8",
										metalness: .6,
										roughness: .3
									})]
								}, idx)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										-.005,
										.25,
										-.046
									],
									rotation: [
										0,
										0,
										.35
									],
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.012,
										.06,
										.014
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#38bdf8",
										metalness: .6,
										roughness: .3
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
							position: [
								-.15,
								.01,
								0
							],
							texture: placardBionic
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						1.13,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutonomousRoverModel, { position: [
						.04,
						0,
						0
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
						position: [
							-.15,
							.01,
							0
						],
						texture: placardRover
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						.63,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								.04,
								0,
								-.16
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										.01,
										0
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.16,
										.02,
										.2
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#eab308",
										transparent: true,
										opacity: .3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										.12,
										0
									],
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.16,
										.07,
										.09
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#eab308",
										roughness: .4
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										-.09,
										.13,
										0
									],
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.06,
										.05,
										.06
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#111827" })]
								}),
								[-.05, .05].flatMap((x) => [-.04, .04].map((z, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										x,
										.05,
										z
									],
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.02,
										.1,
										.02
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1f2937" })]
								}, `${x}-${z}`)))
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								.04,
								0,
								.16
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										.04,
										0
									],
									castShadow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.045,
										10,
										8
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#0f172a",
										metalness: .4
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										-.045,
										.04,
										0
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.012,
										8,
										8
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#38bdf8",
										emissive: "#38bdf8",
										emissiveIntensity: .8
									})]
								}),
								[
									0,
									60,
									120,
									180,
									240,
									300
								].map((deg, k) => {
									const rad = deg * Math.PI / 180;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
										position: [
											Math.cos(rad) * .05,
											.03,
											Math.sin(rad) * .05
										],
										rotation: [
											0,
											-rad,
											.4
										],
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
											.09,
											.012,
											.012
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#334155" })]
									}, k);
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
							position: [
								-.15,
								.01,
								0
							],
							texture: placardRobotics
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ExhibitionBay, {
			position: [
				5.5,
				0,
				.55
			],
			title: "02 · AWARDS & HONORS",
			subtitle: "STEM OLYMPIAD · PATENTS · TROPHIES",
			accentColor: "#f59e0b",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						1.63,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChampionshipTrophy, { position: [
							.02,
							0,
							-.06
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalAward, { position: [
							.02,
							0,
							.16
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
							position: [
								-.15,
								.01,
								0
							],
							texture: placardTrophy
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						1.13,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								.19,
								.22,
								0
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										0,
										-.16
									],
									rotation: [
										0,
										-Math.PI / 2,
										0
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.24, .17] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										map: certTex1,
										roughness: .3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										-.005,
										0,
										-.16
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.01,
										.19,
										.26
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#f59e0b",
										metalness: .8,
										roughness: .2
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										0,
										0,
										.16
									],
									rotation: [
										0,
										-Math.PI / 2,
										0
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.24, .17] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										map: certTex2,
										roughness: .3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										-.005,
										0,
										.16
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.01,
										.19,
										.26
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#f59e0b",
										metalness: .8,
										roughness: .2
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								.04,
								.08,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								rotation: [
									0,
									-Math.PI / 2,
									.2
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.07,
									.05,
									.012,
									5
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#cbd5e1",
									metalness: .85,
									roughness: .2
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									-.01,
									0,
									0
								],
								rotation: [
									0,
									-Math.PI / 2,
									.2
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.025,
									.025,
									.016,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0284c7",
									emissive: "#0284c7",
									emissiveIntensity: .6
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
							position: [
								-.15,
								.01,
								0
							],
							texture: placardPatents
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						.63,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedalsDisplay, { position: [
						.02,
						0,
						0
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
						position: [
							-.15,
							.01,
							0
						],
						texture: placardMedals
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ExhibitionBay, {
			position: [
				5.5,
				0,
				1.55
			],
			title: "03 · 3D MECHANISMS & IOT",
			subtitle: "KINETIC GEARS · GREENHOUSE · FPV",
			accentColor: "#06b6d4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						1.63,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetaryGearMechanism, { position: [
						.02,
						0,
						0
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
						position: [
							-.15,
							.01,
							0
						],
						texture: placardGears
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						1.13,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartGreenhouseModel, { position: [
						.02,
						0,
						0
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
						position: [
							-.15,
							.01,
							0
						],
						texture: placardTerrarium
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						.63,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FpvRacingDroneExhibit, { position: [
						.02,
						0,
						0
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExhibitPlacard, {
						position: [
							-.15,
							.01,
							0
						],
						texture: placardDrone
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				4.95,
				.005,
				.55
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.03, 3.8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e056a0",
				emissive: "#e056a0",
				emissiveIntensity: .8,
				toneMapped: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				4.2,
				2.4,
				-.45
			],
			color: "#fff1f2",
			intensity: 1.1,
			distance: 3.8
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				4.2,
				2.4,
				.55
			],
			color: "#fef08a",
			intensity: 1.2,
			distance: 3.8
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				4.2,
				2.4,
				1.55
			],
			color: "#e0f2fe",
			intensity: 1.1,
			distance: 3.8
		})
	] });
}
function Zones({ maps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone1VisionAiShowcase, { map: maps.panel }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone2PrintShowcase, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone3BreakBuildShowcase, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone4RoboticsShowcase, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone5DroneArenaShowcase, {
			drone: maps.drone,
			net: maps.net,
			mat: maps.droneMat
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone6IoTShowcase, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone7WorkstationsShowcase, { laptop: maps.laptop }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone8AIServerShowcase, { vision: maps.vision }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone9SpatialVRShowcase, { mural: maps.mural }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zone10ProjectShowcase, {})
	] });
}
var SPEED = 2.55;
var EYE = 1.52;
var RADIUS = .28;
var HALF_W = ROOM.w / 2 - .38;
var HALF_D = ROOM.d / 2 - .38;
var held = /* @__PURE__ */ new Set();
var injected = [];
var pawn = {
	x: 0,
	z: 2.55,
	yaw: 0,
	pitch: -.08,
	speed: 0
};
function colliding(x, z) {
	for (const c of COLLIDERS) if (Math.abs(x - c.x) < c.hx + RADIUS && Math.abs(z - c.z) < c.hz + RADIUS) return true;
	return false;
}
function codesHas(code) {
	return held.has(code) || injected.includes(code);
}
function CameraRig() {
	const mode = useLab((s) => s.mode);
	const flyTo = useLab((s) => s.flyTo);
	const stick = useLab((s) => s.stick);
	const controls = (0, import_react.useRef)(null);
	const { camera, gl } = useThree();
	const dragging = (0, import_react.useRef)(false);
	const last = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	(0, import_react.useEffect)(() => {
		const onDown = (e) => {
			held.add(e.code);
			if ([
				"KeyW",
				"KeyA",
				"KeyS",
				"KeyD",
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
				"Space"
			].includes(e.code)) e.preventDefault();
		};
		const onUp = (e) => held.delete(e.code);
		const clear = () => held.clear();
		window.addEventListener("keydown", onDown);
		window.addEventListener("keyup", onUp);
		window.addEventListener("blur", clear);
		document.addEventListener("visibilitychange", clear);
		window.__controlsTest = {
			getYaw: () => pawn.yaw,
			getSpeed: () => pawn.speed,
			getPosition: () => ({
				x: pawn.x,
				z: pawn.z
			}),
			setKeys: (codes) => {
				injected = codes.slice();
			}
		};
		return () => {
			window.removeEventListener("keydown", onDown);
			window.removeEventListener("keyup", onUp);
			window.removeEventListener("blur", clear);
			document.removeEventListener("visibilitychange", clear);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const el = gl.domElement;
		const down = (e) => {
			if (mode !== "walk") return;
			dragging.current = true;
			last.current = {
				x: e.clientX,
				y: e.clientY
			};
		};
		const move = (e) => {
			if (mode !== "walk" || !dragging.current) return;
			const dx = e.clientX - last.current.x;
			const dy = e.clientY - last.current.y;
			last.current = {
				x: e.clientX,
				y: e.clientY
			};
			pawn.yaw -= dx * .005;
			pawn.pitch = Math.max(-1.15, Math.min(.85, pawn.pitch - dy * .004));
		};
		const up = () => {
			dragging.current = false;
		};
		el.addEventListener("pointerdown", down);
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
		return () => {
			el.removeEventListener("pointerdown", down);
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};
	}, [gl, mode]);
	(0, import_react.useEffect)(() => {
		return useLab.subscribe((state) => {
			if (state.flyTo && state.flyTo.position[0] === .6 && state.flyTo.position[1] === 9.4 && state.flyTo.position[2] === 11.2) {
				pawn.x = 0;
				pawn.z = 2.55;
				pawn.yaw = 0;
				pawn.pitch = -.08;
				pawn.speed = 0;
			}
		});
	}, []);
	useFrame((_, delta) => {
		const dt = Math.min(delta, .1);
		if (mode === "orbit" && flyTo && controls.current) {
			const dest = new Vector3(...flyTo.position);
			const tgt = new Vector3(...flyTo.target);
			camera.position.lerp(dest, 1 - Math.exp(-dt * 4.2));
			controls.current.target.lerp(tgt, 1 - Math.exp(-dt * 4.2));
			controls.current.update();
			if (camera.position.distanceTo(dest) < .04 && controls.current.target.distanceTo(tgt) < .04) {
				camera.position.copy(dest);
				controls.current.target.copy(tgt);
				controls.current.update();
				useLab.getState().clearFlyTo();
			}
		}
		const sprint = codesHas("ShiftLeft") || codesHas("ShiftRight") ? 1.65 : 1;
		let ax = 0;
		let az = 0;
		if (codesHas("KeyW") || codesHas("ArrowUp")) az += 1;
		if (codesHas("KeyS") || codesHas("ArrowDown")) az -= 1;
		if (codesHas("KeyD") || codesHas("ArrowRight")) ax += 1;
		if (codesHas("KeyA") || codesHas("ArrowLeft")) ax -= 1;
		ax += stick.x;
		az += stick.y;
		const mag = Math.hypot(ax, az);
		if (mag > 1) {
			ax /= mag;
			az /= mag;
		}
		const forward = new Vector3(-Math.sin(pawn.yaw), 0, -Math.cos(pawn.yaw));
		const right = new Vector3(Math.cos(pawn.yaw), 0, -Math.sin(pawn.yaw));
		const move = forward.multiplyScalar(az).add(right.multiplyScalar(ax));
		const sp = SPEED * sprint;
		const nx = pawn.x + move.x * sp * dt;
		const nz = pawn.z + move.z * sp * dt;
		if (Math.abs(nx) < HALF_W && !colliding(nx, pawn.z)) pawn.x = nx;
		if (Math.abs(nz) < HALF_D && !colliding(pawn.x, nz)) pawn.z = nz;
		pawn.speed = mag * sp;
		if (mode === "walk") {
			camera.position.set(pawn.x, EYE, pawn.z);
			const look = new Vector3(pawn.x - Math.sin(pawn.yaw) * Math.cos(pawn.pitch), EYE + Math.sin(pawn.pitch), pawn.z - Math.cos(pawn.yaw) * Math.cos(pawn.pitch));
			camera.lookAt(look);
		}
	});
	if (mode !== "orbit") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		ref: controls,
		makeDefault: true,
		enableDamping: true,
		dampingFactor: .07,
		rotateSpeed: .88,
		panSpeed: .85,
		zoomSpeed: 1.2,
		screenSpacePanning: true,
		minDistance: .6,
		maxDistance: 25,
		maxPolarAngle: Math.PI / 2.05,
		minPolarAngle: .12,
		target: [
			0,
			.55,
			-.2
		],
		enablePan: true,
		onStart: () => {
			useLab.getState().clearFlyTo();
		}
	});
}
function Hotspots() {
	const selected = useLab((s) => s.selected);
	const hovered = useLab((s) => s.hovered);
	const select = useLab((s) => s.select);
	const setHovered = useLab((s) => s.setHovered);
	const phase = useLab((s) => s.phase);
	const textures = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const z of ZONES) {
			map.set(`${z.id}-0`, makeHotspotTexture(z.id, false, z.color));
			map.set(`${z.id}-1`, makeHotspotTexture(z.id, true, z.color));
		}
		return map;
	}, []);
	if (phase !== "explore") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: ZONES.map((z) => {
		if (selected === z.id) return null;
		const on = hovered === z.id;
		const tex = textures.get(`${z.id}-${on ? 1 : 0}`);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: z.id,
			position: z.pos,
			map: tex,
			on,
			onHover: setHovered,
			onSelect: select
		}, z.id);
	}) });
}
function Hotspot({ id, position, map, on, onHover, onSelect }) {
	const [over, setOver] = (0, import_react.useState)(false);
	useCursor(over);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Billboard, {
		position,
		follow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			scale: on ? 1.12 : 1,
			onPointerOver: (e) => {
				e.stopPropagation();
				setOver(true);
				onHover(id);
			},
			onPointerOut: (e) => {
				e.stopPropagation();
				setOver(false);
				onHover(null);
			},
			onClick: (e) => {
				e.stopPropagation();
				onSelect(id);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.2, 32] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map,
				transparent: true,
				depthTest: false
			})]
		})
	});
}
function TexturedWorld() {
	const [panel, vision, drone, logo, whiteLogo, schoolLogo, schoolLogoDark, coBrandedEntrance] = useTexture([
		"/textures/panel-ui.jpg",
		"/textures/vision-ui.jpg",
		"/textures/drone-sim.jpg",
		"/brand/logo.png",
		"/brand/white-logo.png",
		"/brand/school-logo.png",
		"/brand/school-logo-dark.png",
		"/brand/co-branded-entrance.png"
	]);
	const generated = (0, import_react.useMemo)(() => {
		[
			panel,
			vision,
			drone,
			logo,
			whiteLogo,
			schoolLogo,
			schoolLogoDark,
			coBrandedEntrance
		].forEach((t) => {
			t.colorSpace = SRGBColorSpace;
			t.anisotropy = 8;
		});
		return {
			floor: makeTileTexture(),
			cad: makeCadScreen(),
			mural: makeExploreMural(),
			wall: makeInnovationWall(),
			peg: makePegboardTexture(),
			net: makeNetTexture(),
			laptop: makeLaptopScreen(2),
			droneMat: makeDroneMat()
		};
	}, [
		panel,
		vision,
		drone,
		logo,
		whiteLogo,
		schoolLogo,
		schoolLogoDark,
		coBrandedEntrance
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Room, {
			floorMap: generated.floor,
			logo,
			whiteLogo,
			schoolLogo,
			schoolLogoDark,
			coBrandedEntrance
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zones, { maps: {
			panel,
			vision,
			drone,
			cad: generated.cad,
			mural: generated.mural,
			wall: generated.wall,
			peg: generated.peg,
			net: generated.net,
			laptop: generated.laptop,
			droneMat: generated.droneMat
		} }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				.01,
				0
			],
			opacity: .38,
			scale: 16,
			blur: 2.2,
			far: 3.5
		})
	] });
}
function LabScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lights, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
			fallback: null,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TexturedWorld, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspots, {})]
		})
	] });
}
function CanvasApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "absolute inset-0 touch-none cursor-grab active:cursor-grabbing",
		shadows: true,
		dpr: [1, 1.6],
		gl: {
			antialias: true,
			powerPreference: "high-performance",
			logarithmicDepthBuffer: true
		},
		camera: {
			fov: 42,
			position: [
				.6,
				9.4,
				11.2
			],
			near: .1,
			far: 80
		},
		onCreated: ({ gl }) => {
			gl.setClearColor("#b7c4d4");
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabScene, {})
	});
}
//#endregion
export { CanvasApp as default };
