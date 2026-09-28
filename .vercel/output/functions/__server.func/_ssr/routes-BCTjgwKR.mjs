import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, a as useProgress, o as create, w as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { a as Play, c as MapPinned, d as Compass, f as ChevronUp, g as ArrowRight, h as ChevronDown, i as RotateCcw, l as LayoutGrid, m as ChevronLeft, n as Users, o as Phone, p as ChevronRight, s as Maximize2, t as X, u as Footprints } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BCTjgwKR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var ROOM = {
	w: 12,
	d: 8.4,
	h: 3.18
};
var CTA_URL = "https://www.avpfuturetech.com/our-company#contact";
var SCHOOL = {
	name: "Yashwantrao Bhonsale International School",
	short: "YBIS",
	affiliation: "CBSE Affiliation No. 1130979",
	estd: "Estd. 2016",
	location: "Charathe, Sawantwadi",
	sub: "CBSE Curriculum STEM & AI Innovation Center"
};
var ZONES = [
	{
		id: 1,
		name: "Vision AI & Smart Wall",
		color: "#2f80ed",
		blurb: "The interactive master lecture and computer vision wall of AVP Innovation Hub. An 85-inch bezel-less 4K AI smart display with live YOLOv11 inference, stereo depth estimation, and developer compute station.",
		equipment: [
			"85\" 4K Interactive Vision AI Wall",
			"Intel RealSense D435i Depth Camera Bar",
			"NVIDIA Jetson Orin Edge Compute Rig",
			"Ergonomic Developer Desk & Task Chair"
		],
		pos: [
			-4.15,
			1.58,
			-3.05
		],
		view: [
			-2.2,
			1.75,
			-.55
		],
		target: [
			-4.1,
			1.15,
			-3.55
		]
	},
	{
		id: 2,
		name: "3D Printing & Additive Lab",
		color: "#00b4d8",
		blurb: "Rapid prototyping hub powered by high-speed CoreXY enclosed FDM chambers and precision SLA resin 3D printers, beside an ultrawide CAD slicing workstation and maker tool wall.",
		equipment: [
			"Bambu X1-Carbon CoreXY (AMS 4-Material Multi-Color)",
			"Photon Mono Precision SLA Resin Printer & Wash Station",
			"Ultrawide CAD Slicing Station with G-Code Toolpath Engine",
			"Laser-Cut Tool Pegboard, Heated Drybox & Print Gallery"
		],
		pos: [
			-1.85,
			1.5,
			-3.2
		],
		view: [
			-.4,
			1.7,
			-.7
		],
		target: [
			-1.85,
			.95,
			-3.55
		]
	},
	{
		id: 3,
		name: "Hardware & Electronics Bench",
		color: "#f77f00",
		blurb: "Professional electronics tinkering and rework bench equipped with Rigol 100MHz dual-channel digital storage oscilloscope, regulated DC bench power supply, digital soldering station, fume extractor, and labeled parts organizer.",
		equipment: [
			"Rigol 100MHz Digital Storage Oscilloscope",
			"Dual-Channel Regulated DC Power Supply",
			"Digital Soldering Station & Fume Extractor",
			"Tool Pegboard & Component Drawers"
		],
		pos: [
			.25,
			1.5,
			-3.2
		],
		view: [
			.3,
			1.7,
			-.65
		],
		target: [
			.25,
			.95,
			-3.55
		]
	},
	{
		id: 4,
		name: "Robotics & Kinematics Lab",
		color: "#9b5de5",
		blurb: "Advanced mechatronics display and programming suite featuring a 6-axis articulated industrial robotic arm, Unitree Go2 LiDAR quadruped robot dog, 5-finger cybernetic bionic hand, and teach pendant console.",
		equipment: [
			"Industrial 6-Axis Robotic Arm & Parallel Gripper",
			"Unitree Go2 LiDAR Autonomous Quadruped Dog",
			"5-Finger Cybernetic Bionic Hand with Tendons",
			"ROS2 Teach Pendant & Controller Console"
		],
		pos: [
			2.45,
			1.55,
			-2.85
		],
		view: [
			2.3,
			1.7,
			-.6
		],
		target: [
			2.45,
			1.25,
			-3.55
		]
	},
	{
		id: 5,
		name: "Autonomous Drone Arena",
		color: "#2dc653",
		blurb: "High-security netted UAV flight cage with high-visibility illuminated helipad, mid-air hovering FPV racing quadcopter, glowing LED acrobatic racing hoops, and a dual-gimbal ground telemetry pilot station with FPV goggles.",
		equipment: [
			"High-Tensile Protective Netting Cage",
			"Carbon-Fiber FPV Racer (4S Li-Po, Brushless Motors)",
			"Illuminated Helipad & Neon Racing Hoops",
			"Ground Telemetry Station & FPV Goggles"
		],
		pos: [
			4.85,
			1.55,
			-2.55
		],
		view: [
			2.6,
			1.85,
			-.4
		],
		target: [
			4.85,
			.9,
			-2.55
		]
	},
	{
		id: 6,
		name: "Component & IoT Showcase",
		color: "#06b6d4",
		blurb: "Illuminated showcase cabinets along the left wall featuring authentic IoT hardware — microcontrollers, smart vision & environmental sensors, wireless gateways, actuators, and organized prototyping inventory.",
		equipment: [
			"Microcontrollers (Arduino Uno, Raspberry Pi 5, ESP32)",
			"Smart Sensor Suite (Ultrasonic, PIR, Camera, Gas, DHT22)",
			"Wireless & Cloud IoT (Relays, LoRa, Active OLED HUD)",
			"Actuators & Prototyping (Servos, Stepper, Solderless Breadboard)"
		],
		pos: [
			-5.35,
			2.45,
			-.2
		],
		view: [
			-1.15,
			1.46,
			-.15
		],
		target: [
			-5.65,
			1.34,
			-.2
		]
	},
	{
		id: 7,
		name: "Collaborative Engineering Pods",
		color: "#7b2cbf",
		blurb: "Ten collaborative team workstations built with Scandinavian blonde birch and satin steel frames, integrated central USB-C power hubs, aluminum developer laptops running VS Code, and ergonomic breathable mesh chairs.",
		equipment: [
			"10 Scandinavian Blonde Birch Tech Pods",
			"Developer Laptops with Python / ROS2 IDEs",
			"Integrated USB-C & AC Power Rails",
			"Ergonomic Mesh Office Task Chairs"
		],
		pos: [
			0,
			1.58,
			.15
		],
		view: [
			.2,
			3.4,
			4.6
		],
		target: [
			0,
			.6,
			-.2
		]
	},
	{
		id: 8,
		name: "AI Server & Deep Learning Cluster",
		color: "#00a8e8",
		blurb: "High-density edge artificial intelligence computing hub featuring a 19-inch 12U glass-door server rack cabinet with active GPU compute nodes, dual ultrawide developer workstation displaying live PyTorch loss curves, and Jetson Orin boards.",
		equipment: [
			"19-inch 12U AI GPU Server Rack Cabinet",
			"Ultrawide Curved PyTorch Training Station",
			"NVIDIA Jetson AGX Orin & Raspberry Pi 5 AI Nodes",
			"Secondary Neural Graph Monitoring Display"
		],
		pos: [
			2.55,
			1.5,
			2.45
		],
		view: [
			.6,
			1.7,
			1.35
		],
		target: [
			2.55,
			.95,
			2.55
		]
	},
	{
		id: 9,
		name: "Spatial Computing & AR/VR Lab",
		color: "#f72585",
		blurb: "Next-generation immersive computing lounge with Scandinavian sectional sofa, blonde birch coffee table, Apple Vision Pro spatial visor on magnetic inductive charging stand, Meta Quest 3, and central holographic 3D projection plinth.",
		equipment: [
			"Apple Vision Pro 4K Spatial Headset",
			"Meta Quest 3 Mixed Reality Headset & Controllers",
			"Central Holographic 3D Volumetric Plinth",
			"Curved Scandinavian Lounge & Birch Table"
		],
		pos: [
			-4.25,
			1.48,
			2.45
		],
		view: [
			-1.7,
			1.7,
			1.5
		],
		target: [
			-4.3,
			.85,
			2.5
		]
	},
	{
		id: 10,
		name: "Project Display & Innovation Wall",
		color: "#e056a0",
		blurb: "The prestigious AVP Innovation Hall along the right wall. Three illuminated gallery bays showcasing student robotics, 3D-printed kinetic mechanisms, and smart IoT builds — beside golden STEM Olympiad trophies and verified student patent awards.",
		equipment: [
			"Advanced Robotics (Bionic Hand, Autonomous Rover, Bio-Bots)",
			"Awards & Trophies (Grand Championship Cup, Medals, Patents)",
			"3D Mechanisms & IoT (Planetary Gearbox, Greenhouse, FPV Racer)",
			"Student Innovation Wall & Project Engineering Gallery"
		],
		pos: [
			5.25,
			2.45,
			.55
		],
		view: [
			2.05,
			1.46,
			.55
		],
		target: [
			5.5,
			1.34,
			.55
		]
	}
];
var TABLE_LAYOUT = [];
for (const z of [-.95, 1.2]) for (const x of [
	-3.2,
	-1.6,
	0,
	1.6,
	3.2
]) TABLE_LAYOUT.push({
	x,
	z
});
var COLLIDERS = [
	{
		x: -4.2,
		z: -3.55,
		hx: 1.15,
		hz: .55
	},
	{
		x: -1.85,
		z: -3.55,
		hx: .85,
		hz: .5
	},
	{
		x: .25,
		z: -3.55,
		hx: .85,
		hz: .5
	},
	{
		x: 2.45,
		z: -3.55,
		hx: .95,
		hz: .45
	},
	{
		x: 4.85,
		z: -2.55,
		hx: 1.05,
		hz: 1.05
	},
	{
		x: -5.45,
		z: -.2,
		hx: .42,
		hz: 1.7
	},
	{
		x: 5.5,
		z: .55,
		hx: .4,
		hz: 1.6
	},
	{
		x: 2.55,
		z: 2.55,
		hx: .7,
		hz: .5
	},
	{
		x: -4.3,
		z: 2.5,
		hx: .85,
		hz: .7
	},
	{
		x: 0,
		z: 3.85,
		hx: .95,
		hz: .22
	},
	...TABLE_LAYOUT.map((t) => ({
		x: t.x,
		z: t.z,
		hx: .68,
		hz: .4
	}))
];
var useLab = create((set, get) => ({
	phase: "boot",
	setPhase: (phase) => set({ phase }),
	mode: "orbit",
	setMode: (mode) => set({
		mode,
		flyTo: null
	}),
	selected: null,
	hovered: null,
	setHovered: (hovered) => set({ hovered }),
	flyTo: null,
	clearFlyTo: () => set({ flyTo: null }),
	resetView: () => set({
		mode: "orbit",
		selected: null,
		tourOn: false,
		flyTo: {
			position: [
				.6,
				9.6,
				11.6
			],
			target: [
				0,
				.55,
				-.2
			]
		}
	}),
	select: (id) => {
		if (id == null) {
			set({
				selected: null,
				flyTo: null
			});
			return;
		}
		const zone = ZONES.find((z) => z.id === id);
		if (!zone) return;
		set({
			selected: id,
			mode: "orbit",
			flyTo: {
				position: zone.view,
				target: zone.target
			}
		});
	},
	closeCard: () => set({
		selected: null,
		tourOn: false
	}),
	tourOn: false,
	startTour: () => {
		const first = ZONES[0];
		set({
			tourOn: true,
			selected: first.id,
			mode: "orbit",
			phase: "explore",
			flyTo: {
				position: first.view,
				target: first.target
			}
		});
	},
	stopTour: () => set({ tourOn: false }),
	advanceTour: () => {
		const { selected, tourOn } = get();
		if (!tourOn) return;
		const next = ZONES[(ZONES.findIndex((z) => z.id === selected) + 1) % ZONES.length];
		set({
			selected: next.id,
			flyTo: {
				position: next.view,
				target: next.target
			}
		});
	},
	activeEquip: null,
	pulseEquip: (id) => set({ activeEquip: id }),
	stick: {
		x: 0,
		y: 0
	},
	setStick: (x, y) => set({ stick: {
		x,
		y
	} })
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:pointer-events-none disabled:opacity-50", {
	variants: {
		variant: {
			primary: "bg-electric text-navy hover:bg-sky",
			solid: "bg-blue text-fg hover:bg-electric",
			ghost: "bg-white/8 text-fg hover:bg-white/14 border border-border",
			quiet: "bg-transparent text-fg-muted hover:text-fg hover:bg-white/8"
		},
		size: {
			sm: "h-9 px-3 text-xs rounded-[10px]",
			md: "h-11 px-4 text-sm rounded-md",
			lg: "h-12 px-5 text-sm rounded-lg"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Overlay() {
	const phase = useLab((s) => s.phase);
	const setPhase = useLab((s) => s.setPhase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [phase === "welcome" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto fixed inset-0 z-40 flex items-center justify-center p-3.5 sm:p-6 md:p-8 overflow-hidden select-none transition-all duration-500",
		style: {
			backgroundColor: "rgba(241, 245, 249, 0.55)",
			backdropFilter: "blur(20px)",
			WebkitBackdropFilter: "blur(20px)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -left-32 size-96 rounded-full bg-sky-300/25 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-32 -right-32 size-96 rounded-full bg-blue-500/15 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-sky-200/30 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-[0.03]",
					style: {
						backgroundImage: `linear-gradient(#092244 1px, transparent 1px), linear-gradient(90deg, #092244 1px, transparent 1px)`,
						backgroundSize: "36px 36px"
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative my-auto flex w-full max-w-xl flex-col items-center rounded-3xl border border-white/80 bg-white/92 p-5 sm:p-8 md:p-9 text-center shadow-[0_25px_60px_-15px_rgba(9,34,68,0.14),0_10px_20px_-5px_rgba(9,34,68,0.06)] backdrop-blur-2xl transition-all max-h-[96dvh] sm:max-h-[92dvh] overflow-y-auto overflow-x-hidden scrollbar-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 sm:mb-6 flex items-center justify-center gap-3.5 sm:gap-6 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-2.5 sm:px-6 sm:py-3.5 shadow-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/logo.png",
							alt: "AVP FutureTech",
							className: "h-8.5 w-auto sm:h-12 md:h-13 object-contain drop-shadow-xs transition-transform hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-px bg-slate-200 sm:h-10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/school-logo-dark.png",
							alt: SCHOOL.name,
							className: "h-7.5 w-auto sm:h-11 md:h-12 object-contain drop-shadow-xs transition-transform hover:scale-105"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-extrabold tracking-tight text-[#092244] sm:text-3xl md:text-[34px] leading-tight",
					children: SCHOOL.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 sm:mt-1.5 font-display text-xs sm:text-base font-bold text-sky-600 tracking-wide",
					children: "FutureTech Innovation Hub & AI Robotics Lab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 sm:mt-2.5 max-w-md text-xs sm:text-sm leading-relaxed text-slate-500 font-normal",
					children: "Hands-on Learning · Real-World Skills · Innovation & Creativity · Future Ready"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 sm:mt-7 flex w-full max-w-md flex-col gap-4 sm:gap-2.5 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPhase("explore"),
						className: "group flex h-[68px] sm:h-12 w-full sm:flex-1 shrink-0 items-center justify-center gap-3.5 sm:gap-2 rounded-full sm:rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 px-7 sm:px-5 font-display text-lg sm:text-sm font-bold sm:font-semibold text-white shadow-xl shadow-sky-500/35 transition-all duration-200 hover:shadow-2xl hover:shadow-sky-500/45 hover:brightness-105 active:scale-[0.98]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-6 sm:size-4 transition-transform duration-300 group-hover:rotate-45" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tracking-wide",
								children: "Enter 3D Lab"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5 sm:size-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => useLab.getState().startTour(),
						className: "group flex h-[68px] sm:h-12 w-full sm:flex-1 shrink-0 items-center justify-center gap-3.5 sm:gap-2 rounded-full sm:rounded-xl border-2 sm:border border-slate-200/90 bg-white/95 px-7 sm:px-4 font-display text-lg sm:text-sm font-bold sm:font-semibold text-slate-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-8 sm:size-5 place-items-center rounded-full bg-sky-100/90 text-sky-600 group-hover:bg-sky-200/90 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 sm:size-2.5 fill-sky-600 ml-0.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tracking-wide",
							children: "Guided Tour"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 font-medium shadow-2xs",
							children: "10 Specialized Zones"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 font-medium shadow-2xs",
							children: "30–40 Students"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 font-medium shadow-2xs",
							children: "500–700 sq. ft."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 font-medium shadow-2xs",
							children: SCHOOL.estd
						})
					]
				})
			]
		})]
	}), phase === "explore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})] });
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
	const [navMinimized, setNavMinimized] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!tourOn) return;
		const t = window.setInterval(() => useLab.getState().advanceTour(), 5200);
		return () => window.clearInterval(t);
	}, [tourOn]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code === "Escape") closeCard();
			if (e.key === "r" || e.key === "R") resetView();
			const n = Number(e.key);
			if (n >= 1 && n <= 9) select(n);
			if (e.key === "0") select(10);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		closeCard,
		select,
		resetView
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto absolute top-3 left-3 z-20 flex flex-col gap-2 sm:top-4 sm:left-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: mode === "orbit" ? "primary" : "ghost",
					size: "sm",
					onClick: () => setMode("orbit"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-3.5" }), "Overview"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: resetView,
					title: "Reset to ideal starting camera state (Key: R)",
					className: "border border-border/40 hover:border-sky/50 hover:bg-sky/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 text-sky" }), "Reset View"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: mode === "walk" ? "primary" : "ghost",
					size: "sm",
					onClick: () => setMode("walk"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "size-3.5" }), "Walk"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: tourOn ? "solid" : "ghost",
					size: "sm",
					onClick: () => tourOn ? stopTour() : startTour(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), tourOn ? "Stop tour" : "Tour"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorPlanButton, {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimap, { topOffsetClass: "top-3 sm:top-4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "pointer-events-none absolute inset-x-0 bottom-2 z-30 p-2 sm:px-4 sm:bottom-3",
			children: navMinimized ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-navy/90 px-3.5 py-1.5 backdrop-blur-md shadow-2xl transition-all",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/white-logo.png",
						alt: "AVP",
						className: "h-4 w-auto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-px bg-white/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/school-logo.png",
						alt: "YBIS",
						className: "h-3.5 w-auto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-xs font-semibold text-fg",
						children: [SCHOOL.short, " Innovation Hub"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: resetView,
						className: "grid size-6 place-items-center rounded-full text-fg-muted hover:bg-white/10 hover:text-sky transition-colors",
						title: "Reset View (R)",
						"aria-label": "Reset View",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setNavMinimized(false),
						className: "grid size-6 place-items-center rounded-full text-fg-muted hover:bg-white/10 hover:text-fg transition-colors",
						title: "Expand Navigation Bar",
						"aria-label": "Expand Navigation Bar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" })
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-border bg-navy/90 px-3 py-1.5 backdrop-blur-md shadow-2xl sm:px-4 transition-all",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 sm:flex shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/white-logo.png",
								alt: "AVP FutureTech",
								className: "h-6 w-auto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-px bg-white/20" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/school-logo.png",
								alt: SCHOOL.short,
								className: "h-5 w-auto"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-[10px] font-semibold tracking-[0.2em] text-sky uppercase truncate",
								children: ["AVP FutureTech × ", SCHOOL.short]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden text-[10px] text-fg-muted/70 lg:inline",
								children: ["· ", SCHOOL.affiliation]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "truncate font-display text-xs font-semibold text-fg sm:text-sm",
							children: [SCHOOL.name, " Innovation Hub"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-1.5 md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
							label: "30–40 students"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3.5" }),
							label: "500–700 sq. ft."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: resetView,
						className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border/60 bg-white/5 px-2.5 font-display text-xs font-medium text-fg hover:border-sky/50 hover:bg-sky/10 transition-colors shrink-0",
						title: "Reset View to initial 3D overview (Key: R)",
						"aria-label": "Reset View",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 text-sky" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Reset"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: CTA_URL,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-8 items-center gap-1.5 rounded-md bg-electric px-3 font-display text-xs font-semibold text-navy hover:bg-sky transition-colors shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Book a Demo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sm:hidden",
								children: "Demo"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setNavMinimized(true),
						className: "grid size-7 place-items-center rounded-md text-fg-muted hover:bg-white/10 hover:text-fg transition-colors shrink-0 ml-0.5",
						title: "Minimize Navigation Bar",
						"aria-label": "Minimize Navigation Bar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })
					})
				]
			})
		}),
		!zone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute right-3 bottom-18 z-20 hidden w-48 rounded-md border border-border bg-navy/70 p-3 text-[11px] leading-relaxed text-fg-muted backdrop-blur-md sm:right-4 sm:bottom-20 sm:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 font-display text-xs font-semibold text-fg",
					children: "Controls"
				}),
				mode === "orbit" ? "Drag to orbit · Scroll to zoom · Press R to reset view" : "WASD move · Drag to look · Press R to reset",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: "Keys 1–0 jump to a zone."
				})
			]
		}),
		mode === "walk" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Joystick, {}),
		zone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneDetailCard, {
			zone,
			onClose: closeCard
		})
	] });
}
function ZoneDetailCard({ zone, onClose }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const select = useLab((s) => s.select);
	const pulseEquip = useLab((s) => s.pulseEquip);
	(0, import_react.useEffect)(() => {
		setExpanded(false);
	}, [zone.id]);
	const prevZone = (e) => {
		e.stopPropagation();
		const prevId = zone.id === 1 ? ZONES.length : zone.id - 1;
		select(prevId);
	};
	const nextZone = (e) => {
		e.stopPropagation();
		const nextId = zone.id % ZONES.length + 1;
		select(nextId);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto absolute inset-x-2.5 bottom-16 z-30 mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#092244]/90 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.12)_inset] backdrop-blur-2xl transition-all duration-300 select-none sm:inset-x-auto sm:right-4 sm:bottom-20 sm:w-[380px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 inset-x-4 h-[2px] rounded-full transition-all duration-500",
				style: {
					background: `linear-gradient(90deg, transparent, ${zone.color}, transparent)`,
					boxShadow: `0 0 14px ${zone.color}`
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-2.5 sm:p-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 active:opacity-85",
							onClick: () => setExpanded(!expanded),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 sm:size-9 shrink-0 place-items-center rounded-xl font-display text-xs font-black text-white shadow-md transition-transform active:scale-95",
								style: {
									background: `linear-gradient(135deg, ${zone.color}, #092244)`,
									boxShadow: `0 0 12px ${zone.color}60`
								},
								children: String(zone.id).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 leading-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-bold tracking-wider text-sky uppercase",
											children: ["Zone ", zone.id]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-white/20 text-[9px]",
											children: "•"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-medium text-slate-300",
											children: [zone.equipment.length, " Assets"]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-0.5 truncate font-display text-xs sm:text-sm font-bold text-white",
									children: zone.name
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 p-0.5 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: prevZone,
								className: "grid size-6 sm:size-7 place-items-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors active:scale-90",
								title: "Previous Zone",
								"aria-label": "Previous Zone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: nextZone,
								className: "grid size-6 sm:size-7 place-items-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors active:scale-90",
								title: "Next Zone",
								"aria-label": "Next Zone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setExpanded(!expanded),
							className: `flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-all shrink-0 active:scale-95 ${expanded ? "border-sky-400/40 bg-sky-500/15 text-sky-300" : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"}`,
							title: expanded ? "Minimize card" : "View specifications",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: expanded ? "Less" : "Specs" }), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 text-sky-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors shrink-0 active:scale-90",
							"aria-label": "Close Zone View",
							title: "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						})
					]
				}), !expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex items-center justify-between gap-2 border-t border-white/8 pt-1.5 cursor-pointer sm:hidden",
					onClick: () => setExpanded(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-sky-400 animate-pulse shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-[10px] text-slate-300 font-medium",
							children: zone.equipment[0]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] text-sky-400 font-semibold shrink-0 flex items-center gap-0.5",
						children: [
							"+",
							zone.equipment.length - 1,
							" more"
						]
					})]
				})]
			}),
			expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-white/10 bg-black/25 p-3 sm:p-4 max-h-[46vh] sm:max-h-[360px] overflow-y-auto scrollbar-none transition-all",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-[13px] leading-relaxed text-slate-300 font-normal",
					children: zone.blurb
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-bold tracking-wider text-sky-400 uppercase",
							children: [
								"Zone Hardware & Equipment (",
								zone.equipment.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] text-slate-400",
							children: "Tap to highlight in 3D"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 sm:gap-2",
						children: zone.equipment.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => pulseEquip(item),
							className: "group flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-sm transition-all hover:border-sky-400/60 hover:bg-sky-500/15 hover:text-white active:scale-95 text-left",
							title: `Highlight ${item}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinned, { className: "size-3 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate max-w-[240px] sm:max-w-[280px]",
								children: item
							})]
						}, item))
					})]
				})]
			})
		]
	});
}
function Stat({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 rounded-[10px] bg-white/6 px-2.5 py-1.5 text-[11px] text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sky",
			children: icon
		}), label]
	});
}
function Minimap({ topOffsetClass = "top-16 sm:top-20" }) {
	const selected = useLab((s) => s.selected);
	const select = useLab((s) => s.select);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `pointer-events-auto absolute right-3 z-20 hidden rounded-md border border-border bg-navy/75 p-2 backdrop-blur-md transition-all ${topOffsetClass} sm:right-4 lg:block`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-1.5 flex items-center gap-1 px-1 font-display text-[10px] tracking-wider text-sky uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }), " Floor plan"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 208 148",
			className: "h-32 w-44",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "4",
				width: "200",
				height: "140",
				rx: "6",
				fill: "#0b1e3d",
				stroke: "rgba(255,255,255,0.15)"
			}), ZONES.map((z) => {
				const x = (z.pos[0] + ROOM.w / 2) / ROOM.w * 190 + 9;
				const y = (z.pos[2] + ROOM.d / 2) / ROOM.d * 128 + 10;
				const on = selected === z.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					onClick: () => select(z.id),
					className: "cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: x,
						cy: y,
						r: on ? 9 : 7.5,
						fill: z.color,
						stroke: on ? "#fff" : "none",
						strokeWidth: "2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x,
						y: y + 3,
						textAnchor: "middle",
						fontSize: "8",
						fill: "#fff",
						fontFamily: "Outfit, sans-serif",
						children: z.id
					})]
				}, z.id);
			})]
		})]
	});
}
function FloorPlanButton() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "sm",
		onClick: () => setOpen(true),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-3.5" }), "Plan"]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative max-h-[90dvh] w-full max-w-5xl overflow-auto rounded-xl border border-border bg-navy p-3",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-3 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-semibold text-fg",
					children: "AVP Innovation Hub · floor plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-9 place-items-center rounded-[10px] text-fg-muted hover:bg-white/8",
					onClick: () => setOpen(false),
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/textures/floorplan.png",
				alt: "AVP Innovation Hub lab floor plan with ten numbered zones",
				className: "h-auto w-full rounded-md"
			})]
		})
	})] });
}
function Joystick() {
	const setStick = useLab((s) => s.setStick);
	const origin = (0, import_react.useRef)(null);
	const onDown = (e) => {
		e.target.setPointerCapture(e.pointerId);
		const rect = e.currentTarget.getBoundingClientRect();
		origin.current = {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
			id: e.pointerId
		};
		move(e);
	};
	const move = (e) => {
		if (!origin.current) return;
		const dx = e.clientX - origin.current.x;
		const dy = e.clientY - origin.current.y;
		const m = Math.hypot(dx, dy);
		const r = 42;
		const k = m > r ? r / m : 1;
		setStick(dx * k / r, -dy * k / r);
	};
	const up = () => {
		origin.current = null;
		setStick(0, 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute bottom-16 left-4 z-30 size-28 rounded-full border border-white/20 bg-navy/50 backdrop-blur-sm sm:hidden",
		onPointerDown: onDown,
		onPointerMove: move,
		onPointerUp: up,
		onPointerCancel: up,
		style: { touchAction: "none" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-8 rounded-full bg-white/20" })
	});
}
function CircularPreloader() {
	useLab((s) => s.phase);
	const setPhase = useLab((s) => s.setPhase);
	const { progress: rawProgress, active } = useProgress();
	const [displayProgress, setDisplayProgress] = (0, import_react.useState)(0);
	const [visible, setVisible] = (0, import_react.useState)(true);
	const [statusMsg, setStatusMsg] = (0, import_react.useState)("Initializing 3D Graphics Engine...");
	const animRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let startTimestamp = null;
		const duration = 1400;
		const tick = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const elapsed = timestamp - startTimestamp;
			const timeProgress = Math.min(100, elapsed / duration * 100);
			const target = Math.max(timeProgress, rawProgress || 0);
			setDisplayProgress((prev) => {
				const next = prev + (target - prev) * .15;
				if (next >= 99.5 && target >= 100) return 100;
				return Math.min(100, Math.max(prev, next));
			});
			if (elapsed < duration || active && (rawProgress || 0) < 100) animRef.current = requestAnimationFrame(tick);
			else setDisplayProgress(100);
		};
		animRef.current = requestAnimationFrame(tick);
		return () => {
			if (animRef.current) cancelAnimationFrame(animRef.current);
		};
	}, [rawProgress, active]);
	(0, import_react.useEffect)(() => {
		if (displayProgress < 28) setStatusMsg("Initializing 3D Environment & Shaders...");
		else if (displayProgress < 60) setStatusMsg("Loading High-Precision Robotics & Equipment...");
		else if (displayProgress < 88) setStatusMsg("Calibrating Workstations, Lighting & Sensors...");
		else if (displayProgress < 100) setStatusMsg("Finalizing Scene Optimization...");
		else setStatusMsg("3D Lab Ready!");
	}, [displayProgress]);
	const [isFading, setIsFading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (displayProgress >= 100) {
			const holdTimer = setTimeout(() => {
				setIsFading(true);
				if (useLab.getState().phase === "boot") setPhase("welcome");
				const hideTimer = setTimeout(() => {
					setVisible(false);
				}, 550);
				return () => clearTimeout(hideTimer);
			}, 200);
			return () => clearTimeout(holdTimer);
		}
	}, [displayProgress, setPhase]);
	if (!visible) return null;
	const radius = 80;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - circumference * displayProgress / 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050e1d] px-6 select-none transition-all duration-500 ease-out ${isFading ? "opacity-0 pointer-events-none scale-105" : "opacity-100 pointer-events-auto scale-100"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 overflow-hidden pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-sky-500/10 blur-[120px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[280px] rounded-full bg-blue-600/15 blur-[80px]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-8 sm:mb-12 flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-md shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/logo.png",
						alt: "AVP FutureTech",
						className: "h-7 sm:h-9 w-auto object-contain brightness-110 drop-shadow-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-white/20 sm:h-7" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/school-logo.png",
						alt: SCHOOL.name,
						className: "h-6.5 sm:h-8 w-auto object-contain brightness-110 drop-shadow-sm"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute rounded-full bg-sky-400/20 blur-xl transition-all duration-500",
						style: {
							width: `${160 + displayProgress / 100 * 40}px`,
							height: `${160 + displayProgress / 100 * 40}px`
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "size-52 sm:size-60 -rotate-90 transform drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]",
						viewBox: "0 0 200 200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "circleProgressGrad",
								x1: "0%",
								y1: "0%",
								x2: "100%",
								y2: "100%",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "#38bdf8"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "50%",
										stopColor: "#00b4d8"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "#2563eb"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
								id: "cyanGlow",
								x: "-20%",
								y: "-20%",
								width: "140%",
								height: "140%",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
									stdDeviation: "3",
									result: "blur"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "100",
								cy: "100",
								r: "94",
								fill: "none",
								stroke: "rgba(56, 189, 248, 0.08)",
								strokeWidth: "1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "100",
								cy: "100",
								r: "90",
								fill: "none",
								stroke: "rgba(56, 189, 248, 0.22)",
								strokeWidth: "1.5",
								strokeDasharray: "4 8",
								className: "animate-spin origin-center",
								style: { animationDuration: "14s" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "100",
								cy: "100",
								r: radius,
								fill: "none",
								stroke: "rgba(255, 255, 255, 0.06)",
								strokeWidth: "8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "100",
								cy: "100",
								r: radius,
								fill: "none",
								stroke: "url(#circleProgressGrad)",
								strokeWidth: "8",
								strokeLinecap: "round",
								strokeDasharray: circumference,
								strokeDashoffset,
								filter: "url(#cyanGlow)",
								className: "transition-all duration-150 ease-out"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "100",
								cy: "100",
								r: "66",
								fill: "none",
								stroke: "rgba(56, 189, 248, 0.15)",
								strokeWidth: "1",
								strokeDasharray: "2 6"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex size-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full size-2 bg-sky-500" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono font-semibold tracking-widest text-sky-300 uppercase",
									children: "3D LAB"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
									children: Math.round(displayProgress)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-0.5 text-base sm:text-lg font-bold text-sky-400 font-display",
									children: "%"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-[9px] font-mono tracking-widest text-slate-400 uppercase",
								children: displayProgress >= 100 ? "READY" : "LOADING"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 sm:mt-10 flex flex-col items-center text-center max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs sm:text-sm font-semibold tracking-wide text-sky-400 animate-pulse",
					children: statusMsg
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xs sm:text-sm font-bold text-slate-200 tracking-wide",
						children: SCHOOL.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] sm:text-[11px] font-medium text-slate-400 tracking-wider uppercase",
						children: ["CBSE STEM & AI Innovation Center · ", SCHOOL.location]
					})]
				})]
			})
		]
	});
}
var CanvasApp = (0, import_react.lazy)(() => import("./canvas-B_V8Q5mu.mjs"));
function Experience() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const phase = useLab((s) => s.phase);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const isBlurred = phase !== "explore";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-slate-900",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full w-full",
				style: {
					filter: isBlurred ? "blur(24px) brightness(1.03) saturate(1.15)" : "none",
					transform: isBlurred ? "scale(1.06)" : "none",
					transition: "filter 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
					willChange: isBlurred ? "filter, transform" : "auto"
				},
				children: mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasApp, {})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[#092244]" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularPreloader, {})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {});
}
//#endregion
export { TABLE_LAYOUT as a, ROOM as i, useLab as n, ZONES as o, COLLIDERS as r, routes_exports as t };
