export const ROOM = {
  w: 12.0,
  d: 8.4,
  h: 3.18,
} as const;

export const CTA_URL = "https://www.avpfuturetech.com/our-company#contact";
export const BRAND_URL = "https://www.avpfuturetech.com/";

export const TAGLINE = "Learn • Build • Experiment • Innovate";
export const FOOTER =
  "Hands-on Learning · Real-World Skills · Innovation & Creativity · Future Ready · Small Space, Big Ideas, Endless Possibilities";

export const SCHOOL = {
  name: "Yashwantrao Bhonsale International School",
  short: "YBIS",
  affiliation: "CBSE Affiliation No. 1130979",
  estd: "Estd. 2016",
  location: "Charathe, Sawantwadi",
  sub: "CBSE Curriculum STEM & AI Innovation Center",
} as const;

export type Zone = {
  id: number;
  name: string;
  blurb: string;
  equipment: string[];
  color: string;
  pos: [number, number, number];
  view: [number, number, number];
  target: [number, number, number];
};

export const ZONES: Zone[] = [
  {
    id: 1,
    name: "Vision AI & Smart Wall",
    color: "#2f80ed",
    blurb:
      "The interactive master lecture and computer vision wall of AVP Innovation Hub. An 85-inch bezel-less 4K AI smart display with live YOLOv11 inference, stereo depth estimation, and developer compute station.",
    equipment: [
      '85" 4K Interactive Vision AI Wall',
      "Intel RealSense D435i Depth Camera Bar",
      "NVIDIA Jetson Orin Edge Compute Rig",
      "Ergonomic Developer Desk & Task Chair",
    ],
    pos: [-4.15, 1.58, -3.05],
    view: [-2.2, 1.75, -0.55],
    target: [-4.1, 1.15, -3.55],
  },
  {
    id: 2,
    name: "3D Printing & Additive Lab",
    color: "#00b4d8",
    blurb:
      "Rapid prototyping hub powered by high-speed CoreXY enclosed FDM chambers and precision SLA resin 3D printers, beside an ultrawide CAD slicing workstation and maker tool wall.",
    equipment: [
      "Bambu X1-Carbon CoreXY (AMS 4-Material Multi-Color)",
      "Photon Mono Precision SLA Resin Printer & Wash Station",
      "Ultrawide CAD Slicing Station with G-Code Toolpath Engine",
      "Laser-Cut Tool Pegboard, Heated Drybox & Print Gallery",
    ],
    pos: [-1.85, 1.5, -3.2],
    view: [-0.4, 1.7, -0.7],
    target: [-1.85, 0.95, -3.55],
  },
  {
    id: 3,
    name: "Hardware & Electronics Bench",
    color: "#f77f00",
    blurb:
      "Professional electronics tinkering and rework bench equipped with Rigol 100MHz dual-channel digital storage oscilloscope, regulated DC bench power supply, digital soldering station, fume extractor, and labeled parts organizer.",
    equipment: [
      "Rigol 100MHz Digital Storage Oscilloscope",
      "Dual-Channel Regulated DC Power Supply",
      "Digital Soldering Station & Fume Extractor",
      "Tool Pegboard & Component Drawers",
    ],
    pos: [0.25, 1.5, -3.2],
    view: [0.3, 1.7, -0.65],
    target: [0.25, 0.95, -3.55],
  },
  {
    id: 4,
    name: "Robotics & Kinematics Lab",
    color: "#9b5de5",
    blurb:
      "Advanced mechatronics display and programming suite featuring a 6-axis articulated industrial robotic arm, Unitree Go2 LiDAR quadruped robot dog, 5-finger cybernetic bionic hand, and teach pendant console.",
    equipment: [
      "Industrial 6-Axis Robotic Arm & Parallel Gripper",
      "Unitree Go2 LiDAR Autonomous Quadruped Dog",
      "5-Finger Cybernetic Bionic Hand with Tendons",
      "ROS2 Teach Pendant & Controller Console",
    ],
    pos: [2.45, 1.52, -3.2],
    view: [2.3, 1.7, -0.6],
    target: [2.45, 0.95, -3.55],
  },
  {
    id: 5,
    name: "Autonomous Drone Arena",
    color: "#2dc653",
    blurb:
      "High-security netted UAV flight cage with high-visibility illuminated helipad, mid-air hovering FPV racing quadcopter, glowing LED acrobatic racing hoops, and a dual-gimbal ground telemetry pilot station with FPV goggles.",
    equipment: [
      "High-Tensile Protective Netting Cage",
      "Carbon-Fiber FPV Racer (4S Li-Po, Brushless Motors)",
      "Illuminated Helipad & Neon Racing Hoops",
      "Ground Telemetry Station & FPV Goggles",
    ],
    pos: [4.85, 1.55, -2.55],
    view: [2.6, 1.85, -0.4],
    target: [4.85, 0.9, -2.55],
  },
  {
    id: 6,
    name: "Component & IoT Showcase",
    color: "#06b6d4",
    blurb:
      "Illuminated showcase cabinets along the left wall featuring authentic IoT hardware — microcontrollers, smart vision & environmental sensors, wireless gateways, actuators, and organized prototyping inventory.",
    equipment: [
      "Microcontrollers (Arduino Uno, Raspberry Pi 5, ESP32)",
      "Smart Sensor Suite (Ultrasonic, PIR, Camera, Gas, DHT22)",
      "Wireless & Cloud IoT (Relays, LoRa, Active OLED HUD)",
      "Actuators & Prototyping (Servos, Stepper, Solderless Breadboard)",
    ],
    pos: [-5.35, 2.45, -0.2],
    view: [-1.15, 1.46, -0.15],
    target: [-5.65, 1.34, -0.2],
  },
  {
    id: 7,
    name: "Collaborative Engineering Pods",
    color: "#7b2cbf",
    blurb:
      "Ten collaborative team workstations built with Scandinavian blonde birch and satin steel frames, integrated central USB-C power hubs, aluminum developer laptops running VS Code, and ergonomic breathable mesh chairs.",
    equipment: [
      "10 Scandinavian Blonde Birch Tech Pods",
      "Developer Laptops with Python / ROS2 IDEs",
      "Integrated USB-C & AC Power Rails",
      "Ergonomic Mesh Office Task Chairs",
    ],
    pos: [0.0, 1.58, 0.15],
    view: [0.2, 3.4, 4.6],
    target: [0.0, 0.6, -0.2],
  },
  {
    id: 8,
    name: "AI Server & Deep Learning Cluster",
    color: "#00a8e8",
    blurb:
      "High-density edge artificial intelligence computing hub featuring a 19-inch 12U glass-door server rack cabinet with active GPU compute nodes, dual ultrawide developer workstation displaying live PyTorch loss curves, and Jetson Orin boards.",
    equipment: [
      "19-inch 12U AI GPU Server Rack Cabinet",
      "Ultrawide Curved PyTorch Training Station",
      "NVIDIA Jetson AGX Orin & Raspberry Pi 5 AI Nodes",
      "Secondary Neural Graph Monitoring Display",
    ],
    pos: [2.55, 1.5, 2.45],
    view: [0.6, 1.7, 1.35],
    target: [2.55, 0.95, 2.55],
  },
  {
    id: 9,
    name: "Spatial Computing & AR/VR Lab",
    color: "#f72585",
    blurb:
      "Next-generation immersive computing lounge with Scandinavian sectional sofa, blonde birch coffee table, Apple Vision Pro spatial visor on magnetic inductive charging stand, Meta Quest 3, and central holographic 3D projection plinth.",
    equipment: [
      "Apple Vision Pro 4K Spatial Headset",
      "Meta Quest 3 Mixed Reality Headset & Controllers",
      "Central Holographic 3D Volumetric Plinth",
      "Curved Scandinavian Lounge & Birch Table",
    ],
    pos: [-4.25, 1.48, 2.45],
    view: [-1.7, 1.7, 1.5],
    target: [-4.3, 0.85, 2.5],
  },
  {
    id: 10,
    name: "Project Display & Innovation Wall",
    color: "#e056a0",
    blurb:
      "The prestigious AVP Innovation Hall along the right wall. Three illuminated gallery bays showcasing student robotics, 3D-printed kinetic mechanisms, and smart IoT builds — beside golden STEM Olympiad trophies and verified student patent awards.",
    equipment: [
      "Advanced Robotics (Bionic Hand, Autonomous Rover, Bio-Bots)",
      "Awards & Trophies (Grand Championship Cup, Medals, Patents)",
      "3D Mechanisms & IoT (Planetary Gearbox, Greenhouse, FPV Racer)",
      "Student Innovation Wall & Project Engineering Gallery",
    ],
    pos: [5.25, 2.45, 0.55],
    view: [2.05, 1.46, 0.55],
    target: [5.5, 1.34, 0.55],
  },
];

export const TABLE_LAYOUT: { x: number; z: number }[] = [];
for (const z of [-0.95, 1.2]) {
  for (const x of [-3.2, -1.6, 0, 1.6, 3.2]) {
    TABLE_LAYOUT.push({ x, z });
  }
}

export const COLLIDERS: { x: number; z: number; hx: number; hz: number }[] = [
  { x: -4.2, z: -3.55, hx: 1.15, hz: 0.55 },
  { x: -1.85, z: -3.55, hx: 0.85, hz: 0.5 },
  { x: 0.25, z: -3.55, hx: 0.85, hz: 0.5 },
  { x: 2.45, z: -3.55, hx: 0.95, hz: 0.45 },
  { x: 4.85, z: -2.55, hx: 1.05, hz: 1.05 },
  { x: -5.45, z: -0.2, hx: 0.42, hz: 1.7 },
  { x: 5.5, z: 0.55, hx: 0.4, hz: 1.6 },
  { x: 2.55, z: 2.55, hx: 0.7, hz: 0.5 },
  { x: -4.3, z: 2.5, hx: 0.85, hz: 0.7 },
  { x: 0, z: 3.85, hx: 0.95, hz: 0.22 },
  ...TABLE_LAYOUT.map((t) => ({ x: t.x, z: t.z, hx: 0.68, hz: 0.4 })),
];
