/**
 * AVGC Center of Excellence - 25,000 m² Campus Masterplan
 * 3D Architectural Model & Procedural Engine
 * Built with Three.js
 */

const AVGC = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  clock: null,
  
  // Groups for layer control & exploded view
  groups: {
    site: new THREE.Group(),
    landscape: new THREE.Group(),
    infrastructure: new THREE.Group(),
    sports: new THREE.Group(),
    academicGround: new THREE.Group(),
    academicFirst: new THREE.Group(),
    academicRoof: new THREE.Group(),
    auditorium: new THREE.Group(),
    cafeteria: new THREE.Group(),
    gallery: new THREE.Group(),
    hostels: new THREE.Group(),
    housing: new THREE.Group(),
    amenities: new THREE.Group()
  },
  
  // Interactive objects for raycasting
  interactiveObjects: [],
  selectedObject: null,
  hoveredObject: null,
  
  // Materials library
  materials: {},
  textures: {},
  
  // Space metadata database (matching user drawings & brief)
  spaces: [
    {
      id: "mocap-studio",
      name: "Motion Capture Studio",
      department: "vfx",
      deptName: "Animation & VFX / Tech",
      area: 216,
      dimensions: "18.0m × 12.0m",
      height: "8.4m (Double Height)",
      capacity: "25 Crew / Actors",
      features: "24-Camera Vicon Optical Tracking Rig, Full Green-Screen Cyclorama Wall, Wire-Rigging Ceiling Truss, Isolated Sound Floor, Dedicated Control & Calibration Booth",
      level: "First Floor (Double Volume)",
      building: "Production & Tech Wing",
      pos: { x: 12, y: 4.2, z: -18 },
      cameraTarget: { x: 12, y: 6, z: -18 },
      cameraPos: { x: 28, y: 16, z: -5 }
    },
    {
      id: "render-farm",
      name: "Render Farm / Data Centre",
      department: "vfx",
      deptName: "Infrastructure & Tech",
      area: 72,
      dimensions: "12.0m × 6.0m",
      height: "4.2m",
      capacity: "High-Density Compute Clustered Servers",
      features: "Tier-3 Server Racks, Dual-Redundant Precision In-Row Liquid Cooling, Raised Anti-Static Flooring, Halon Gas Fire Suppression, Blue LED Diagnostics Wall",
      level: "First Floor",
      building: "Production & Tech Wing",
      pos: { x: 3, y: 6.3, z: -20 },
      cameraTarget: { x: 3, y: 6.3, z: -20 },
      cameraPos: { x: 15, y: 15, z: -10 }
    },
    {
      id: "vr-ar-lab",
      name: "VR / AR Innovation Lab",
      department: "game",
      deptName: "Game Design & Tech",
      area: 108,
      dimensions: "12.0m × 9.0m",
      height: "4.2m",
      capacity: "35 Researchers & Students",
      features: "6 HTC Vive/Oculus Tracking Pods, Omnidirectional Treadmill, Haptic Feedback Testing Stations, High-FPS Workstations, Spatial Audio Acoustic Walls",
      level: "First Floor",
      building: "Production & Tech Wing",
      pos: { x: 14, y: 6.3, z: -30 },
      cameraTarget: { x: 14, y: 6.3, z: -30 },
      cameraPos: { x: 26, y: 16, z: -20 }
    },
    {
      id: "auditorium",
      name: "Screening / Preview Auditorium",
      department: "public",
      deptName: "Campus Public / Film",
      area: 500,
      dimensions: "25.0m × 20.0m",
      height: "8.5m Raked Tiered Volume",
      capacity: "450 - 500 Seats",
      features: "4K Laser DCI-Compliant Cinema Projection, Dolby Atmos 3D Surround System, Sculptural Acoustic Baffle Ceiling, Tiered Ergonomic Seating, Stage & Green Rooms",
      level: "Ground & Mezzanine",
      building: "Auditorium Wing",
      pos: { x: -8, y: 4.25, z: -10 },
      cameraTarget: { x: -8, y: 4.25, z: -10 },
      cameraPos: { x: 8, y: 20, z: 12 }
    },
    {
      id: "library",
      name: "Central Library & Digital Commons",
      department: "public",
      deptName: "Learning Resource",
      area: 300,
      dimensions: "20.0m × 15.0m",
      height: "8.4m (Double Height Atrium)",
      capacity: "120 Readers & Digital Workstations",
      features: "Double-Height Glass Curtain Wall facing Central Courtyard, Digital Media Stacks, Private Study Carrels, High-Speed Research Terminals, Mezzanine Deck",
      level: "Ground Floor & Mezzanine",
      building: "Academic Central Core",
      pos: { x: -30, y: 4.2, z: -40 },
      cameraTarget: { x: -30, y: 4.2, z: -40 },
      cameraPos: { x: -16, y: 14, z: -28 }
    },
    {
      id: "atrium",
      name: "Grand Skylit Central Atrium",
      department: "public",
      deptName: "Circulation & Community",
      area: 420,
      dimensions: "28.0m × 15.0m",
      height: "13.5m Skylit Void",
      capacity: "350 Students Gathering",
      features: "Twin Scenic Cylindrical Glass Elevators, Monumental Double Open-Tread Staircases, Cantilevered Glass Skybridges connecting Wings, Overhead Space-Frame Skylight",
      level: "Triple Volume (Ground to Roof)",
      building: "Academic Central Core",
      pos: { x: -10, y: 6.5, z: -40 },
      cameraTarget: { x: -10, y: 6.5, z: -40 },
      cameraPos: { x: 4, y: 16, z: -25 }
    },
    {
      id: "incubation-cells",
      name: "Incubation + Co-working Cells",
      department: "admin",
      deptName: "Industry & Innovation",
      area: 300,
      dimensions: "30.0m × 10.0m",
      height: "4.2m",
      capacity: "60 Entrepreneurs / Startups",
      features: "Flexible Modular Team Pods, Glass Sound-Isolated Meeting Rooms, Pitch Deck Presentation Arena, High-Speed Fibre, Direct Garden Terrace Access",
      level: "Ground Floor",
      building: "Academic West Wing",
      pos: { x: -62, y: 2.1, z: -40 },
      cameraTarget: { x: -62, y: 2.1, z: -40 },
      cameraPos: { x: -50, y: 14, z: -24 }
    },
    {
      id: "cafeteria",
      name: "Cafeteria + Student Lounge Pavilion",
      department: "public",
      deptName: "Campus Dining & Social",
      area: 540,
      dimensions: "30.0m × 18.0m",
      height: "5.5m Glass Pavilion",
      capacity: "280 Indoor / 120 Outdoor Seats",
      features: "Floor-to-Ceiling Panoramic Glass Glazing, Warm Timber Slatted Lamella Ceiling, Multi-Cuisine Food Stations, Spill-Out Pergola Dining Deck overlooking Lawn",
      level: "Ground Pavilion",
      building: "Dining Pavilion",
      pos: { x: -45, y: 2.75, z: 5 },
      cameraTarget: { x: -45, y: 2.75, z: 5 },
      cameraPos: { x: -28, y: 15, z: 25 }
    },
    {
      id: "exhibition-gallery",
      name: "Exhibition / Showcase Gallery",
      department: "public",
      deptName: "Exhibition & Arts",
      area: 300,
      dimensions: "20.0m × 15.0m",
      height: "6.0m",
      capacity: "180 Visitors",
      features: "Museum-Grade Track Lighting System, Moveable Display Partitions, High-Lumen Projection Screens for Student Portfolios, Sculptural Model Plinths",
      level: "Ground Pavilion",
      building: "Exhibition Pavilion",
      pos: { x: 22, y: 3.0, z: 12 },
      cameraTarget: { x: 22, y: 3.0, z: 12 },
      cameraPos: { x: 38, y: 14, z: 28 }
    },
    {
      id: "bdes-vfx-wing",
      name: "B.Des Animation & VFX Studios (8 Studios)",
      department: "vfx",
      deptName: "Animation & VFX",
      area: 1440,
      dimensions: "8 Studios × (15m × 12m)",
      height: "4.2m each",
      capacity: "240 Students (30/Studio)",
      features: "Integrated Dual-Screen Cintiq Digital Workstations, Color-Calibrated Displays, Shadowless Ergonomic Studio Lighting, Integrated Rendering Nodes",
      level: "Ground & Upper North/South Wings",
      building: "Academic North & South Wings",
      pos: { x: -30, y: 2.1, z: -55 },
      cameraTarget: { x: -30, y: 2.1, z: -55 },
      cameraPos: { x: -15, y: 18, z: -75 }
    },
    {
      id: "mdes-vfx-wing",
      name: "M.Des Animation & VFX Studios (2 Studios)",
      department: "vfx",
      deptName: "Animation & VFX",
      area: 270,
      dimensions: "2 Studios × (15m × 9m)",
      height: "4.2m each",
      capacity: "60 Students (30/Studio)",
      features: "Post-Production Grading Suites, Dual-Monitor 4K HDR Reference Monitors, Dolby 5.1 Studio Monitoring, Dedicated Cloud Rendering Uplinks",
      level: "First Floor",
      building: "Production & Tech Wing",
      pos: { x: 12, y: 6.3, z: -7 },
      cameraTarget: { x: 12, y: 6.3, z: -7 },
      cameraPos: { x: 25, y: 15, z: 6 }
    },
    {
      id: "game-design-wing",
      name: "Game Design Department Studios (7 Studios)",
      department: "game",
      deptName: "Game Design",
      area: 960,
      dimensions: "B.Des (3), M.Des (2), Diploma (2)",
      height: "4.2m",
      capacity: "240 Students",
      features: "Unreal Engine 5 & Unity Production Rigs, RT-Cores GPU Workstations, Console Dev-Kits (PS5/Xbox/Switch), Game Testing Arena & Stream Studio",
      level: "Ground & First Floor South Wing",
      building: "Academic South Wing",
      pos: { x: -30, y: 6.3, z: -25 },
      cameraTarget: { x: -30, y: 6.3, z: -25 },
      cameraPos: { x: -15, y: 18, z: -10 }
    },
    {
      id: "comic-design-wing",
      name: "Comic Design & Animation Studios (6 Studios)",
      department: "comic",
      deptName: "Comic Design & Literature",
      area: 820,
      dimensions: "BFA (4), MA (1), Crash (1)",
      height: "4.2m",
      capacity: "220 Students",
      features: "Large-Format Wacom Drafting Desks, Traditional Light Tables, 2D Animation Pencil-Test Kiosks, Print & Publishing Prototyping Workshop",
      level: "Ground & First Floor North Wing",
      building: "Academic North Wing",
      pos: { x: -30, y: 6.3, z: -55 },
      cameraTarget: { x: -30, y: 6.3, z: -55 },
      cameraPos: { x: -20, y: 18, z: -70 }
    },
    {
      id: "faculty-admin",
      name: "Faculty Room & Administrative Suites",
      department: "admin",
      deptName: "Administration & Faculty",
      area: 347,
      dimensions: "Faculty (120m²), Deans (2×24m²), Admin (80m²), Director (30m²), Boardroom (35m²)",
      height: "4.2m",
      capacity: "46 Faculty + 20 Staff",
      features: "Ergonomic Faculty Cubicles, HOD Cabins for 3 Departments, Executive Dean Suites, Director Cabin, 20-Seat Smart Boardroom with Video Wall",
      level: "First Floor East Wing",
      building: "Administration Wing",
      pos: { x: 3, y: 6.3, z: -40 },
      cameraTarget: { x: 3, y: 6.3, z: -40 },
      cameraPos: { x: 18, y: 15, z: -35 }
    },
    {
      id: "student-hostel-a",
      name: "Student Residential Hostel (Block A)",
      department: "residential",
      deptName: "Student Housing",
      area: 1920,
      dimensions: "24.0m × 20.0m × 4 Floors",
      height: "14.0m (G+3)",
      capacity: "160 Residents",
      features: "Central Light-Well Courtyard for Natural Ventilation, Double & Single Occupancy Rooms with Private Balconies, Floor Study Lounges, High-Speed WiFi",
      level: "4 Floors (G+3)",
      building: "Residential Village",
      pos: { x: -55, y: 7.0, z: 32 },
      cameraTarget: { x: -55, y: 7.0, z: 32 },
      cameraPos: { x: -35, y: 22, z: 45 }
    },
    {
      id: "student-hostel-b",
      name: "Student Residential Hostel (Block B)",
      department: "residential",
      deptName: "Student Housing",
      area: 1920,
      dimensions: "24.0m × 20.0m × 4 Floors",
      height: "14.0m (G+3)",
      capacity: "160 Residents",
      features: "Courtyard Living, Common Recreation Lounge, Laundromat, Student Kitchenette, Solar Hot Water Rooftop Array, Accessible Elevators",
      level: "4 Floors (G+3)",
      building: "Residential Village",
      pos: { x: -55, y: 7.0, z: 58 },
      cameraTarget: { x: -55, y: 7.0, z: 58 },
      cameraPos: { x: -35, y: 22, z: 70 }
    },
    {
      id: "faculty-housing",
      name: "Faculty & Staff Residential Villas (3 Blocks)",
      department: "residential",
      deptName: "Faculty Residence",
      area: 2400,
      dimensions: "3 Blocks × (20m × 16m × 3 Floors)",
      height: "10.5m (G+2)",
      capacity: "24 Family Apartments",
      features: "Contemporary Modular 2BHK/3BHK Apartments, Deep Shaded Terraces, Vertical Timber Privacy Screens, Landscaped Garden Courtyard, Private Parking",
      level: "3 Floors (G+2)",
      building: "Residential Village",
      pos: { x: -10, y: 5.25, z: 70 },
      cameraTarget: { x: -10, y: 5.25, z: 70 },
      cameraPos: { x: 10, y: 20, z: 85 }
    },
    {
      id: "sports-complex",
      name: "Outdoor Sports & Recreation Arena",
      department: "public",
      deptName: "Athletics & Wellness",
      area: 1850,
      dimensions: "Basketball (28×15m) + 2 Tennis Courts (24×11m) + Half Court",
      height: "Outdoor with Floodlights",
      capacity: "200 Active / Spectators",
      features: "FIBA Standard Acrylic Surfacing, Dual Multi-Sport Tennis/Badminton Courts with Mesh Fencing, 12m LED Floodlight Towers, Shaded Bleacher Seating",
      level: "Ground Complex",
      building: "Sports Complex",
      pos: { x: 35, y: 0.5, z: 50 },
      cameraTarget: { x: 35, y: 0.5, z: 50 },
      cameraPos: { x: 55, y: 18, z: 65 }
    },
    {
      id: "central-plaza",
      name: "Grand Arrival Plaza & Reflecting Water Basin",
      department: "public",
      deptName: "Landscape Architecture",
      area: 850,
      dimensions: "24m Diameter Circular Plaza",
      height: "Landscape Feature",
      capacity: "300 Gathering",
      features: "Concentric Granite Paved Rings, Tiered Illuminated Fountain & Water Basin, Shaded Stone Benches, Mature Flowering Cassia & Date Palms",
      level: "Ground Plaza",
      building: "Landscape Realm",
      pos: { x: 25, y: 0.5, z: -35 },
      cameraTarget: { x: 25, y: 0.5, z: -35 },
      cameraPos: { x: 42, y: 15, z: -20 }
    },
    {
      id: "amphitheater",
      name: "Stepped Outdoor Amphitheatre",
      department: "public",
      deptName: "Performing Arts / Student Events",
      area: 650,
      dimensions: "Tiered Crescent (Radius 16m)",
      height: "4-Tiered Grass Seating",
      capacity: "350 Audience",
      features: "Natural Grass Tiered Retaining Steps, Semicircular Performance Stage, Acoustic Earth Berming, Landscape Event Lighting for Night Screenings",
      level: "Landscape Berm",
      building: "Landscape Realm",
      pos: { x: 48, y: 1.2, z: -8 },
      cameraTarget: { x: 48, y: 1.2, z: -8 },
      cameraPos: { x: 62, y: 16, z: 5 }
    }
  ],

  // Camera presets
  viewpoints: {
    master: { pos: { x: 80, y: 95, z: 125 }, target: { x: -5, y: 0, z: 5 } },
    entrance: { pos: { x: 55, y: 15, z: -60 }, target: { x: 15, y: 2, z: -30 } },
    atrium: { pos: { x: -5, y: 10, z: -25 }, target: { x: -15, y: 5, z: -40 } },
    mocap: { pos: { x: 28, y: 16, z: -5 }, target: { x: 12, y: 6, z: -18 } },
    auditorium: { pos: { x: 12, y: 18, z: 12 }, target: { x: -8, y: 4, z: -10 } },
    cafeteria: { pos: { x: -28, y: 15, z: 25 }, target: { x: -45, y: 3, z: 5 } },
    residential: { pos: { x: -20, y: 35, z: 95 }, target: { x: -40, y: 8, z: 50 } },
    sports: { pos: { x: 60, y: 22, z: 65 }, target: { x: 35, y: 1, z: 50 } }
  },

  // State variables
  state: {
    walkMode: false,
    explodedVal: 0,
    timeOfDay: 14.0, // 2:00 PM
    shadingMode: "realistic", // "realistic", "clay", "night"
    currentFloor: "all",
    walkKeys: { forward: false, backward: false, left: false, right: false },
    walkPos: new THREE.Vector3(25, 1.7, -50),
    walkYaw: 0,
    walkPitch: 0
  },

  // Initialize Three.js Engine
  init: function(containerId) {
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.clock = new THREE.Clock();

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f172a);
    this.scene.fog = new THREE.FogExp2(0x0f172a, 0.0035);

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1200);
    this.camera.position.set(80, 95, 125);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    container.appendChild(this.renderer.domElement);

    // Orbit Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.03; // Prevent going underground
    this.controls.minDistance = 5;
    this.controls.maxDistance = 350;
    this.controls.target.set(-5, 0, 5);

    // Generate Procedural Textures & Materials
    this.initProceduralTextures();
    this.initMaterials();

    // Lighting System
    this.initLighting();

    // Add Layer Groups to Scene
    Object.values(this.groups).forEach(g => this.scene.add(g));

    // Build the Entire 25,000 m² Campus
    this.buildSiteMasterplan();
    this.buildMainAcademicComplex();
    this.buildAuditoriumWing();
    this.buildCafeteriaPavilion();
    this.buildExhibitionGallery();
    this.buildResidentialZone();
    this.buildSportsComplex();
    this.buildLandscapeFeatures();

    // Setup Raycasting & Interactivity
    this.initInteractivity();

    // Window Resize Handler
    window.addEventListener("resize", () => this.onWindowResize());

    // Start Animation Loop
    this.animate();

    console.log("AVGC Campus 3D Model loaded successfully!");
  },

  // -------------------------------------------------------------
  // PROCEDURAL TEXTURE GENERATOR
  // -------------------------------------------------------------
  initProceduralTextures: function() {
    // 1. Fair-faced Architectural Concrete
    const concreteCanvas = document.createElement("canvas");
    concreteCanvas.width = 512;
    concreteCanvas.height = 512;
    const ctxC = concreteCanvas.getContext("2d");
    ctxC.fillStyle = "#cbd5e1";
    ctxC.fillRect(0, 0, 512, 512);
    // Add subtle architectural formwork panel joints and tie-holes
    ctxC.strokeStyle = "rgba(100, 116, 139, 0.4)";
    ctxC.lineWidth = 2;
    ctxC.strokeRect(4, 4, 504, 504);
    ctxC.beginPath();
    ctxC.moveTo(0, 256); ctxC.lineTo(512, 256);
    ctxC.moveTo(256, 0); ctxC.lineTo(256, 512);
    ctxC.stroke();
    // Tie-holes
    ctxC.fillStyle = "rgba(71, 85, 105, 0.6)";
    const holes = [[32, 32], [480, 32], [32, 480], [480, 480], [288, 32], [288, 480], [32, 288], [480, 288]];
    holes.forEach(([x, y]) => {
      ctxC.beginPath(); ctxC.arc(x, y, 5, 0, Math.PI * 2); ctxC.fill();
    });
    // Noise
    const imgData = ctxC.getImageData(0, 0, 512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 16;
      imgData.data[i] += noise;
      imgData.data[i+1] += noise;
      imgData.data[i+2] += noise;
    }
    ctxC.putImageData(imgData, 0, 0);
    this.textures.concrete = new THREE.CanvasTexture(concreteCanvas);
    this.textures.concrete.wrapS = THREE.RepeatWrapping;
    this.textures.concrete.wrapT = THREE.RepeatWrapping;

    // 2. Solar Brise-Soleil / Architectural Louvers
    const louverCanvas = document.createElement("canvas");
    louverCanvas.width = 128;
    louverCanvas.height = 128;
    const ctxL = louverCanvas.getContext("2d");
    ctxL.fillStyle = "#1e293b";
    ctxL.fillRect(0, 0, 128, 128);
    ctxL.fillStyle = "#b45309"; // Warm bronze/terracotta timber louver
    for (let x = 4; x < 128; x += 16) {
      ctxL.fillRect(x, 0, 8, 128);
    }
    this.textures.louvers = new THREE.CanvasTexture(louverCanvas);
    this.textures.louvers.wrapS = THREE.RepeatWrapping;
    this.textures.louvers.wrapT = THREE.RepeatWrapping;
    this.textures.louvers.repeat.set(4, 1);

    // 3. Manicured Campus Grass / Lawn
    const grassCanvas = document.createElement("canvas");
    grassCanvas.width = 256;
    grassCanvas.height = 256;
    const ctxG = grassCanvas.getContext("2d");
    ctxG.fillStyle = "#22543d";
    ctxG.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 4000; i++) {
      ctxG.fillStyle = Math.random() > 0.5 ? "#276749" : "#2f855a";
      ctxG.fillRect(Math.random() * 256, Math.random() * 256, 2, 3);
    }
    this.textures.grass = new THREE.CanvasTexture(grassCanvas);
    this.textures.grass.wrapS = THREE.RepeatWrapping;
    this.textures.grass.wrapT = THREE.RepeatWrapping;
    this.textures.grass.repeat.set(20, 20);

    // 4. Asphalt Campus Roadway with Striping
    const roadCanvas = document.createElement("canvas");
    roadCanvas.width = 256;
    roadCanvas.height = 256;
    const ctxR = roadCanvas.getContext("2d");
    ctxR.fillStyle = "#1e232a";
    ctxR.fillRect(0, 0, 256, 256);
    // White dashed center line
    ctxR.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctxR.fillRect(124, 20, 8, 50);
    ctxR.fillRect(124, 110, 8, 50);
    ctxR.fillRect(124, 200, 8, 50);
    // Road border lines
    ctxR.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctxR.fillRect(10, 0, 4, 256);
    ctxR.fillRect(242, 0, 4, 256);
    this.textures.road = new THREE.CanvasTexture(roadCanvas);
    this.textures.road.wrapS = THREE.RepeatWrapping;
    this.textures.road.wrapT = THREE.RepeatWrapping;

    // 5. Granite Paving Tiles
    const paverCanvas = document.createElement("canvas");
    paverCanvas.width = 256;
    paverCanvas.height = 256;
    const ctxP = paverCanvas.getContext("2d");
    ctxP.fillStyle = "#e2e8f0";
    ctxP.fillRect(0, 0, 256, 256);
    ctxP.strokeStyle = "rgba(148, 163, 184, 0.5)";
    ctxP.lineWidth = 3;
    for (let i = 0; i <= 256; i += 32) {
      ctxP.beginPath(); ctxP.moveTo(i, 0); ctxP.lineTo(i, 256); ctxP.stroke();
      ctxP.beginPath(); ctxP.moveTo(0, i); ctxP.lineTo(256, i); ctxP.stroke();
    }
    this.textures.paver = new THREE.CanvasTexture(paverCanvas);
    this.textures.paver.wrapS = THREE.RepeatWrapping;
    this.textures.paver.wrapT = THREE.RepeatWrapping;
    this.textures.paver.repeat.set(12, 12);

    // 6. Basketball Court Painting
    const bbCanvas = document.createElement("canvas");
    bbCanvas.width = 512;
    bbCanvas.height = 280;
    const ctxB = bbCanvas.getContext("2d");
    ctxB.fillStyle = "#1e3a8a"; // Marine blue acrylic court
    ctxB.fillRect(0, 0, 512, 280);
    ctxB.fillStyle = "#0284c7"; // Key & inner zones
    ctxB.fillRect(30, 20, 452, 240);
    ctxB.strokeStyle = "#ffffff";
    ctxB.lineWidth = 4;
    ctxB.strokeRect(30, 20, 452, 240); // Outer line
    // Center circle & line
    ctxB.beginPath(); ctxB.moveTo(256, 20); ctxB.lineTo(256, 260); ctxB.stroke();
    ctxB.beginPath(); ctxB.arc(256, 140, 45, 0, Math.PI * 2); ctxB.stroke();
    // 3-point lines & keys
    ctxB.strokeRect(30, 95, 90, 90);
    ctxB.beginPath(); ctxB.arc(120, 140, 45, -Math.PI/2, Math.PI/2); ctxB.stroke();
    ctxB.strokeRect(392, 95, 90, 90);
    ctxB.beginPath(); ctxB.arc(392, 140, 45, Math.PI/2, -Math.PI/2); ctxB.stroke();
    this.textures.basketball = new THREE.CanvasTexture(bbCanvas);

    // 7. Tennis Court Painting
    const tennisCanvas = document.createElement("canvas");
    tennisCanvas.width = 512;
    tennisCanvas.height = 256;
    const ctxT = tennisCanvas.getContext("2d");
    ctxT.fillStyle = "#047857"; // Deep court green
    ctxT.fillRect(0, 0, 512, 256);
    ctxT.fillStyle = "#0d9488"; // Inner play zone
    ctxT.fillRect(35, 25, 442, 206);
    ctxT.strokeStyle = "#ffffff";
    ctxT.lineWidth = 4;
    ctxT.strokeRect(35, 25, 442, 206);
    ctxT.beginPath(); ctxT.moveTo(256, 25); ctxT.lineTo(256, 231); ctxT.stroke(); // Net line
    ctxT.strokeRect(95, 45, 322, 166);
    ctxT.beginPath(); ctxT.moveTo(95, 128); ctxT.lineTo(417, 128); ctxT.stroke();
    this.textures.tennis = new THREE.CanvasTexture(tennisCanvas);

    // 8. Render Farm Server Glow
    const serverCanvas = document.createElement("canvas");
    serverCanvas.width = 256;
    serverCanvas.height = 256;
    const ctxS = serverCanvas.getContext("2d");
    ctxS.fillStyle = "#090d16";
    ctxS.fillRect(0, 0, 256, 256);
    for (let y = 10; y < 250; y += 18) {
      ctxS.fillStyle = "#1e293b";
      ctxS.fillRect(8, y, 240, 12);
      // Blinking LEDs
      for (let x = 18; x < 230; x += 14) {
        ctxS.fillStyle = Math.random() > 0.4 ? "#38bdf8" : (Math.random() > 0.5 ? "#22c55e" : "#0284c7");
        ctxS.fillRect(x, y + 4, 4, 4);
      }
    }
    this.textures.servers = new THREE.CanvasTexture(serverCanvas);
    this.textures.servers.wrapS = THREE.RepeatWrapping;
    this.textures.servers.wrapT = THREE.RepeatWrapping;
    this.textures.servers.repeat.set(2, 1);
  },

  // -------------------------------------------------------------
  // MATERIALS SYSTEM
  // -------------------------------------------------------------
  initMaterials: function() {
    this.materials.concrete = new THREE.MeshStandardMaterial({
      map: this.textures.concrete,
      roughness: 0.75,
      metalness: 0.1,
      color: 0xe2e8f0
    });

    this.materials.darkConcrete = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.8,
      metalness: 0.2
    });

    this.materials.glass = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transmission: 0.85,
      opacity: 0.7,
      transparent: true,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.52,
      thickness: 0.3
    });

    this.materials.atriumGlass = new THREE.MeshPhysicalMaterial({
      color: 0xbfdbfe,
      transmission: 0.9,
      opacity: 0.6,
      transparent: true,
      roughness: 0.02,
      metalness: 0.05
    });

    this.materials.bronzeLouver = new THREE.MeshStandardMaterial({
      map: this.textures.louvers,
      roughness: 0.4,
      metalness: 0.6,
      color: 0xd97706
    });

    this.materials.steelFrame = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.8
    });

    this.materials.woodDeck = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.7,
      metalness: 0.1
    });

    this.materials.terrazzoFloor = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.25,
      metalness: 0.15
    });

    this.materials.grass = new THREE.MeshStandardMaterial({
      map: this.textures.grass,
      roughness: 0.9,
      metalness: 0.05
    });

    this.materials.paver = new THREE.MeshStandardMaterial({
      map: this.textures.paver,
      roughness: 0.7,
      metalness: 0.1
    });

    this.materials.road = new THREE.MeshStandardMaterial({
      map: this.textures.road,
      roughness: 0.85,
      metalness: 0.1
    });

    this.materials.water = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.82
    });

    this.materials.acousticPanels = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.95,
      metalness: 0.05
    });

    this.materials.servers = new THREE.MeshStandardMaterial({
      map: this.textures.servers,
      roughness: 0.5,
      metalness: 0.5,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3
    });

    this.materials.solarRoof = new THREE.MeshStandardMaterial({
      color: 0x172554,
      roughness: 0.2,
      metalness: 0.85
    });

    this.materials.highlight = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.75,
      roughness: 0.2
    });

    // Clay Mode Material
    this.materials.clay = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.9,
      metalness: 0.0
    });
  },

  // -------------------------------------------------------------
  // LIGHTING & ENVIRONMENT
  // -------------------------------------------------------------
  initLighting: function() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(this.ambientLight);

    // Primary Sun Light (Shadow Casting)
    this.sunLight = new THREE.DirectionalLight(0xfffbeb, 1.3);
    this.sunLight.position.set(110, 160, 90);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 400;
    const d = 140;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    // Secondary Soft Sky Bounce Fill
    this.skyFill = new THREE.DirectionalLight(0xbae6fd, 0.35);
    this.skyFill.position.set(-80, 80, -90);
    this.scene.add(this.skyFill);

    // Warm Interior Ambient for Night/Golden Hour
    this.interiorLight = new THREE.PointLight(0xfef08a, 0, 50);
    this.interiorLight.position.set(-10, 8, -40);
    this.scene.add(this.interiorLight);
  },

  // -------------------------------------------------------------
  // 1. SITE & MASTERPLAN (25,000 m²)
  // -------------------------------------------------------------
  buildSiteMasterplan: function() {
    // 25,000 m² Site Boundary: 150m (width) x 166.7m (depth)
    const siteW = 150;
    const siteD = 166.7;

    // Base Green Landscape Ground Plane
    const groundGeo = new THREE.PlaneGeometry(siteW, siteD, 32, 32);
    const groundMesh = new THREE.Mesh(groundGeo, this.materials.grass);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    groundMesh.position.set(0, 0, 0);
    this.groups.site.add(groundMesh);

    // Site Perimeter Boundary Curb & Wall
    const curbMat = this.materials.darkConcrete;
    const curbThickness = 0.8;
    const curbHeight = 0.5;

    // Boundary walls (with north entrance gate opening)
    const wallEast = new THREE.Mesh(new THREE.BoxGeometry(curbThickness, curbHeight, siteD), curbMat);
    wallEast.position.set(siteW / 2, curbHeight / 2, 0);
    wallEast.receiveShadow = true;
    this.groups.site.add(wallEast);

    const wallWest = new THREE.Mesh(new THREE.BoxGeometry(curbThickness, curbHeight, siteD), curbMat);
    wallWest.position.set(-siteW / 2, curbHeight / 2, 0);
    wallWest.receiveShadow = true;
    this.groups.site.add(wallWest);

    const wallSouth = new THREE.Mesh(new THREE.BoxGeometry(siteW, curbHeight, curbThickness), curbMat);
    wallSouth.position.set(0, curbHeight / 2, siteD / 2);
    wallSouth.receiveShadow = true;
    this.groups.site.add(wallSouth);

    // North Entrance & Security Gatehouse
    const gateW = 20;
    const wallNorthL = new THREE.Mesh(new THREE.BoxGeometry((siteW - gateW) / 2, curbHeight, curbThickness), curbMat);
    wallNorthL.position.set(- (siteW / 4 + gateW / 4), curbHeight / 2, -siteD / 2);
    const wallNorthR = new THREE.Mesh(new THREE.BoxGeometry((siteW - gateW) / 2, curbHeight, curbThickness), curbMat);
    wallNorthR.position.set((siteW / 4 + gateW / 4), curbHeight / 2, -siteD / 2);
    this.groups.site.add(wallNorthL, wallNorthR);

    // Security Gatehouse Pavilion
    const gateHouse = new THREE.Mesh(new THREE.BoxGeometry(6, 3.2, 5), this.materials.concrete);
    gateHouse.position.set(18, 1.6, -siteD / 2 + 6);
    gateHouse.castShadow = true;
    gateHouse.receiveShadow = true;
    this.groups.site.add(gateHouse);

    // Perimeter Internal Vehicular Loop Road
    // Main North Entry Road
    const entryRoad = new THREE.Mesh(new THREE.PlaneGeometry(12, 45), this.materials.road);
    entryRoad.rotation.x = -Math.PI / 2;
    entryRoad.position.set(25, 0.02, -60);
    entryRoad.receiveShadow = true;
    this.groups.infrastructure.add(entryRoad);

    // Curved loop road encircling plaza down toward sports & residential
    const loopCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(25, 0.02, -40),
      new THREE.Vector3(45, 0.02, -25),
      new THREE.Vector3(48, 0.02, 10),
      new THREE.Vector3(20, 0.02, 28),
      new THREE.Vector3(-15, 0.02, 38),
      new THREE.Vector3(-35, 0.02, 60),
      new THREE.Vector3(-10, 0.02, 75)
    ]);
    const loopGeo = new THREE.TubeGeometry(loopCurve, 64, 4.5, 2, false);
    const loopMesh = new THREE.Mesh(loopGeo, this.materials.road);
    loopMesh.scale.set(1, 0.01, 1); // Flatten into road strip
    loopMesh.receiveShadow = true;
    this.groups.infrastructure.add(loopMesh);

    // Main Pedestrian Granite Plazas & Spines
    // Central Spine linking Academic Wing, Cafeteria, and Courtyards
    const mainPavedSpine = new THREE.Mesh(new THREE.PlaneGeometry(16, 110), this.materials.paver);
    mainPavedSpine.rotation.x = -Math.PI / 2;
    mainPavedSpine.position.set(-18, 0.03, -10);
    mainPavedSpine.receiveShadow = true;
    this.groups.infrastructure.add(mainPavedSpine);

    // Transverse East-West Promenade connecting Plaza to Academic Atrium
    const eastWestPromenade = new THREE.Mesh(new THREE.PlaneGeometry(65, 12), this.materials.paver);
    eastWestPromenade.rotation.x = -Math.PI / 2;
    eastWestPromenade.position.set(5, 0.03, -38);
    eastWestPromenade.receiveShadow = true;
    this.groups.infrastructure.add(eastWestPromenade);
  },

  // -------------------------------------------------------------
  // 2. MAIN ACADEMIC COMPLEX (Quadrangle + Atrium + Wings)
  // -------------------------------------------------------------
  buildMainAcademicComplex: function() {
    const floorH = 4.2;
    const academicCenterX = -25;
    const academicCenterZ = -40;

    // Floor Slabs
    // Ground Floor Slab
    const groundSlabGeo = new THREE.BoxGeometry(68, 0.4, 48);
    const groundSlab = new THREE.Mesh(groundSlabGeo, this.materials.concrete);
    groundSlab.position.set(academicCenterX, 0.2, academicCenterZ);
    groundSlab.receiveShadow = true;
    this.groups.academicGround.add(groundSlab);

    // First Floor Intermediate Slab
    const firstSlabGeo = new THREE.BoxGeometry(68, 0.4, 48);
    const firstSlab = new THREE.Mesh(firstSlabGeo, this.materials.concrete);
    firstSlab.position.set(academicCenterX, floorH, academicCenterZ);
    firstSlab.castShadow = true;
    firstSlab.receiveShadow = true;
    this.groups.academicFirst.add(firstSlab);

    // Roof Slab & Parapet Screen
    const roofSlabGeo = new THREE.BoxGeometry(70, 0.5, 50);
    const roofSlab = new THREE.Mesh(roofSlabGeo, this.materials.concrete);
    roofSlab.position.set(academicCenterX, floorH * 2 + 0.25, academicCenterZ);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    this.groups.academicRoof.add(roofSlab);

    // Photovoltaic Solar Arrays on Academic Roof
    for (let rz = -18; rz <= 18; rz += 8) {
      for (let rx = -28; rx <= 28; rx += 14) {
        if (Math.abs(rx) < 12 && Math.abs(rz) < 12) continue; // Leave central skylight clear
        const pvPanel = new THREE.Mesh(new THREE.BoxGeometry(10, 0.2, 5), this.materials.solarRoof);
        pvPanel.rotation.x = -0.15; // Tilted toward optimal solar azimuth
        pvPanel.position.set(academicCenterX + rx, floorH * 2 + 0.8, academicCenterZ + rz);
        pvPanel.castShadow = true;
        this.groups.academicRoof.add(pvPanel);
      }
    }

    // ---------------------------------------------------------
    // CENTRAL ATRIUM (Double-Height Skylit Core)
    // ---------------------------------------------------------
    const atriumW = 28;
    const atriumD = 18;
    const atriumH = 13.5;

    // Atrium Terrazzo Ground Floor
    const atriumFloor = new THREE.Mesh(new THREE.PlaneGeometry(atriumW, atriumD), this.materials.terrazzoFloor);
    atriumFloor.rotation.x = -Math.PI / 2;
    atriumFloor.position.set(academicCenterX + 10, 0.41, academicCenterZ);
    atriumFloor.receiveShadow = true;
    this.groups.academicGround.add(atriumFloor);

    // Overhead Skylight Steel Space-Frame & Glass Pyramid/Barrel
    const skylightFrame = new THREE.Mesh(new THREE.BoxGeometry(atriumW + 2, 0.3, atriumD + 2), this.materials.steelFrame);
    skylightFrame.position.set(academicCenterX + 10, atriumH, academicCenterZ);
    this.groups.academicRoof.add(skylightFrame);

    const skylightGlass = new THREE.Mesh(new THREE.ConeGeometry(14, 3.5, 4), this.materials.atriumGlass);
    skylightGlass.rotation.y = Math.PI / 4;
    skylightGlass.position.set(academicCenterX + 10, atriumH + 1.8, academicCenterZ);
    this.groups.academicRoof.add(skylightGlass);

    // Twin Scenic Glass Cylindrical Elevators
    const liftShaftMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transmission: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.5
    });
    for (let lx of [-2.5, 2.5]) {
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, atriumH - 1, 16), liftShaftMat);
      shaft.position.set(academicCenterX + 10 + lx, atriumH / 2, academicCenterZ - 4);
      this.groups.academicGround.add(shaft);

      // Glass elevator car
      const car = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 2.8, 16), this.materials.steelFrame);
      car.position.set(academicCenterX + 10 + lx, 3.5, academicCenterZ - 4);
      car.castShadow = true;
      this.groups.academicGround.add(car);
    }

    // Monumental Open-Tread Staircases
    const stairGeo = new THREE.BoxGeometry(3.5, 0.2, 10);
    const stairMesh1 = new THREE.Mesh(stairGeo, this.materials.steelFrame);
    stairMesh1.rotation.x = 0.42;
    stairMesh1.position.set(academicCenterX + 18, 2.1, academicCenterZ + 3);
    stairMesh1.castShadow = true;
    this.groups.academicGround.add(stairMesh1);

    const stairMesh2 = new THREE.Mesh(stairGeo, this.materials.steelFrame);
    stairMesh2.rotation.x = -0.42;
    stairMesh2.position.set(academicCenterX + 2, 2.1, academicCenterZ + 3);
    stairMesh2.castShadow = true;
    this.groups.academicGround.add(stairMesh2);

    // Upper Atrium Skybridges
    const bridge1 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, atriumD), this.materials.steelFrame);
    bridge1.position.set(academicCenterX + 5, floorH + 0.2, academicCenterZ);
    bridge1.castShadow = true;
    this.groups.academicFirst.add(bridge1);

    // Glass Balustrades
    const railMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, transparent: true, opacity: 0.4 });
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.1, atriumD), railMat);
    rail.position.set(academicCenterX + 7, floorH + 0.9, academicCenterZ);
    this.groups.academicFirst.add(rail);

    // ---------------------------------------------------------
    // CENTRAL LIBRARY (20m x 15m = 300 m²)
    // ---------------------------------------------------------
    this.createZoneVolume({
      id: "library",
      group: this.groups.academicGround,
      w: 20, h: floorH * 1.8, d: 15,
      x: academicCenterX - 10, y: (floorH * 1.8) / 2 + 0.4, z: academicCenterZ,
      facadeMat: this.materials.glass,
      accentMat: this.materials.woodDeck,
      title: "Library"
    });

    // ---------------------------------------------------------
    // INCUBATION & CO-WORKING CELLS (30m x 10m = 300 m²)
    // ---------------------------------------------------------
    this.createZoneVolume({
      id: "incubation-cells",
      group: this.groups.academicGround,
      w: 12, h: floorH, d: 28,
      x: academicCenterX - 30, y: floorH / 2 + 0.4, z: academicCenterZ,
      facadeMat: this.materials.glass,
      accentMat: this.materials.bronzeLouver,
      title: "Incubation + Co-working"
    });

    // ---------------------------------------------------------
    // NORTH WING STUDIOS (VFX & Comic Design)
    // ---------------------------------------------------------
    // Ground Floor: Diploma AVFX, B.Des CDA, Diploma CDA 1 & 2
    for (let i = 0; i < 4; i++) {
      const sx = academicCenterX - 24 + i * 16;
      this.createZoneVolume({
        id: "bdes-vfx-wing",
        group: this.groups.academicGround,
        w: 15, h: floorH, d: 13,
        x: sx, y: floorH / 2 + 0.4, z: academicCenterZ - 17,
        facadeMat: this.materials.concrete,
        accentMat: this.materials.glass,
        title: `North Studio G-${i+1}`
      });
    }

    // First Floor: B.Des CDA 1, 2, 3 & M.Des GD
    for (let i = 0; i < 4; i++) {
      const sx = academicCenterX - 24 + i * 16;
      this.createZoneVolume({
        id: "comic-design-wing",
        group: this.groups.academicFirst,
        w: 15, h: floorH, d: 13,
        x: sx, y: floorH * 1.5 + 0.4, z: academicCenterZ - 17,
        facadeMat: this.materials.concrete,
        accentMat: this.materials.bronzeLouver,
        title: `North Studio 1-${i+1}`
      });
    }

    // ---------------------------------------------------------
    // SOUTH WING STUDIOS (Game Design & AVFX)
    // ---------------------------------------------------------
    // Ground Floor: Diploma GD 1 & 2, Crash GD 1 & 2
    for (let i = 0; i < 4; i++) {
      const sx = academicCenterX - 24 + i * 16;
      this.createZoneVolume({
        id: "game-design-wing",
        group: this.groups.academicGround,
        w: 15, h: floorH, d: 13,
        x: sx, y: floorH / 2 + 0.4, z: academicCenterZ + 17,
        facadeMat: this.materials.concrete,
        accentMat: this.materials.glass,
        title: `South Studio G-${i+1}`
      });
    }

    // First Floor: B.Des GD 1, 2, 3 & M.Des GD 2
    for (let i = 0; i < 4; i++) {
      const sx = academicCenterX - 24 + i * 16;
      this.createZoneVolume({
        id: "game-design-wing",
        group: this.groups.academicFirst,
        w: 15, h: floorH, d: 13,
        x: sx, y: floorH * 1.5 + 0.4, z: academicCenterZ + 17,
        facadeMat: this.materials.concrete,
        accentMat: this.materials.bronzeLouver,
        title: `South Studio 1-${i+1}`
      });
    }

    // ---------------------------------------------------------
    // EAST WING: ADMINISTRATION & ADVANCED TECH PRODUCTION WING
    // ---------------------------------------------------------
    // Admin Suites (Level 1 East)
    this.createZoneVolume({
      id: "faculty-admin",
      group: this.groups.academicFirst,
      w: 18, h: floorH, d: 24,
      x: academicCenterX + 28, y: floorH * 1.5 + 0.4, z: academicCenterZ - 8,
      facadeMat: this.materials.concrete,
      accentMat: this.materials.glass,
      title: "Administration & Dean"
    });

    // Motion Capture Studio (Double-Height Volume 18m x 12m x 8.4m)
    this.createZoneVolume({
      id: "mocap-studio",
      group: this.groups.academicFirst,
      w: 18, h: floorH * 2, d: 14,
      x: 12, y: floorH + 0.4, z: -18,
      facadeMat: this.materials.acousticPanels,
      accentMat: this.materials.darkConcrete,
      title: "Motion Capture Studio"
    });

    // Render Farm / Data Centre (12m x 6m)
    this.createZoneVolume({
      id: "render-farm",
      group: this.groups.academicFirst,
      w: 12, h: floorH, d: 8,
      x: 3, y: floorH * 1.5 + 0.4, z: -20,
      facadeMat: this.materials.servers,
      accentMat: this.materials.glass,
      title: "Render Farm / Data Centre"
    });

    // VR / AR Lab (12m x 9m)
    this.createZoneVolume({
      id: "vr-ar-lab",
      group: this.groups.academicFirst,
      w: 14, h: floorH, d: 10,
      x: 14, y: floorH * 1.5 + 0.4, z: -30,
      facadeMat: this.materials.concrete,
      accentMat: this.materials.glass,
      title: "VR/AR Lab"
    });

    // M.Des AVFX Studios 1 & 2 (Level 1 Production Wing)
    this.createZoneVolume({
      id: "mdes-vfx-wing",
      group: this.groups.academicFirst,
      w: 18, h: floorH, d: 12,
      x: 12, y: floorH * 1.5 + 0.4, z: -5,
      facadeMat: this.materials.concrete,
      accentMat: this.materials.bronzeLouver,
      title: "M.Des AVFX Studios"
    });
  },

  // -------------------------------------------------------------
  // 3. SCREENING / PREVIEW AUDITORIUM (25m x 20m = 500 m²)
  // -------------------------------------------------------------
  buildAuditoriumWing: function() {
    const w = 25;
    const d = 20;
    const h = 8.5;
    const posX = -8;
    const posZ = -10;

    // Sculptural Faceted Massing for the Auditorium
    const audiMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.materials.concrete);
    audiMesh.position.set(posX, h / 2 + 0.2, posZ);
    audiMesh.castShadow = true;
    audiMesh.receiveShadow = true;
    this.groups.auditorium.add(audiMesh);

    // Acoustic Dark Metal Facade Cladding Band
    const bandMesh = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 3.5, d + 0.4), this.materials.acousticPanels);
    bandMesh.position.set(posX, h - 2, posZ);
    bandMesh.castShadow = true;
    this.groups.auditorium.add(bandMesh);

    // Grand Entrance Glass Foyer
    const foyerMesh = new THREE.Mesh(new THREE.BoxGeometry(10, 4.5, 4), this.materials.glass);
    foyerMesh.position.set(posX - 4, 2.25 + 0.2, posZ + d / 2 + 2);
    foyerMesh.castShadow = true;
    this.groups.auditorium.add(foyerMesh);

    // Register interactive volume
    audiMesh.userData = { spaceId: "auditorium" };
    this.interactiveObjects.push(audiMesh);
  },

  // -------------------------------------------------------------
  // 4. CAFETERIA + STUDENT LOUNGE (30m x 18m = 540 m²)
  // -------------------------------------------------------------
  buildCafeteriaPavilion: function() {
    const w = 30;
    const d = 18;
    const h = 5.5;
    const posX = -45;
    const posZ = 5;

    // Timber & Glass Pavilion
    const cafeGlass = new THREE.Mesh(new THREE.BoxGeometry(w, h - 0.8, d), this.materials.glass);
    cafeGlass.position.set(posX, (h - 0.8) / 2 + 0.4, posZ);
    cafeGlass.castShadow = true;
    this.groups.cafeteria.add(cafeGlass);

    // Overhanging Floating Roof with Timber Lamella Underbelly
    const roofMesh = new THREE.Mesh(new THREE.BoxGeometry(w + 4, 0.6, d + 4), this.materials.woodDeck);
    roofMesh.position.set(posX, h + 0.3, posZ);
    roofMesh.castShadow = true;
    roofMesh.receiveShadow = true;
    this.groups.cafeteria.add(roofMesh);

    // Outdoor Spill-Out Dining Deck with Pergola Shade
    const deckMesh = new THREE.Mesh(new THREE.BoxGeometry(w, 0.3, 8), this.materials.woodDeck);
    deckMesh.position.set(posX, 0.15, posZ + d / 2 + 4);
    deckMesh.receiveShadow = true;
    this.groups.cafeteria.add(deckMesh);

    // Pergola slats
    for (let px = -w / 2 + 1; px <= w / 2 - 1; px += 2.5) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 8), this.materials.steelFrame);
      slat.position.set(posX + px, 3.8, posZ + d / 2 + 4);
      slat.castShadow = true;
      this.groups.cafeteria.add(slat);
    }

    cafeGlass.userData = { spaceId: "cafeteria" };
    this.interactiveObjects.push(cafeGlass);
  },

  // -------------------------------------------------------------
  // 5. EXHIBITION / SHOWCASE GALLERY (20m x 15m = 300 m²)
  // -------------------------------------------------------------
  buildExhibitionGallery: function() {
    const w = 20;
    const d = 15;
    const h = 6.0;
    const posX = 22;
    const posZ = 12;

    const galleryMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.materials.concrete);
    galleryMesh.position.set(posX, h / 2 + 0.2, posZ);
    galleryMesh.castShadow = true;
    galleryMesh.receiveShadow = true;
    this.groups.gallery.add(galleryMesh);

    // Clerestory Ribbon Glass Band
    const glassRibbon = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 1.4, d + 0.2), this.materials.glass);
    glassRibbon.position.set(posX, h - 0.9, posZ);
    this.groups.gallery.add(glassRibbon);

    galleryMesh.userData = { spaceId: "exhibition-gallery" };
    this.interactiveObjects.push(galleryMesh);
  },

  // -------------------------------------------------------------
  // 6. RESIDENTIAL ZONE (Student Hostels & Faculty Housing)
  // -------------------------------------------------------------
  buildResidentialZone: function() {
    // 2 Student Hostel Courtyard Blocks (Blocks A & B)
    const hostelW = 24;
    const hostelD = 20;
    const hostelH = 14; // G+3 Floors

    // Block A
    this.buildHostelBlock(-55, 32, hostelW, hostelD, hostelH, "student-hostel-a", "Hostel Block A");
    // Block B
    this.buildHostelBlock(-55, 58, hostelW, hostelD, hostelH, "student-hostel-b", "Hostel Block B");

    // 3 Faculty & Staff Housing Apartment Pavilions (Blocks C, D, E)
    const houseW = 20;
    const houseD = 16;
    const houseH = 10.5; // G+2 Floors
    const houseXPositions = [-30, -5, 20];

    houseXPositions.forEach((hx, idx) => {
      this.buildHousingBlock(hx, 70, houseW, houseD, houseH, "faculty-housing", `Faculty Villa ${idx + 1}`);
    });
  },

  buildHostelBlock: function(x, z, w, d, h, spaceId, label) {
    const group = this.groups.hostels;

    // Main Perimeter Massing
    const hostelMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.materials.concrete);
    hostelMesh.position.set(x, h / 2 + 0.2, z);
    hostelMesh.castShadow = true;
    hostelMesh.receiveShadow = true;
    group.add(hostelMesh);

    // Central Open-Air Courtyard Shaft (Subtract/Inner Void effect)
    const courtMesh = new THREE.Mesh(new THREE.BoxGeometry(w - 12, h + 0.4, d - 10), this.materials.darkConcrete);
    courtMesh.position.set(x, h / 2 + 0.2, z);
    group.add(courtMesh);

    // Modular Student Room Balconies
    for (let floor = 1; floor <= 3; floor++) {
      const fy = floor * 3.5;
      // Front Balconies
      const balGeo = new THREE.BoxGeometry(w - 4, 1.0, 1.2);
      const balFront = new THREE.Mesh(balGeo, this.materials.darkConcrete);
      balFront.position.set(x, fy, z + d / 2 + 0.6);
      balFront.castShadow = true;
      group.add(balFront);

      // Vertical Solar Timber Screen Finishes
      const finMesh = new THREE.Mesh(new THREE.BoxGeometry(w - 4, 2.2, 0.1), this.materials.bronzeLouver);
      finMesh.position.set(x, fy + 1.2, z + d / 2 + 0.6);
      group.add(finMesh);
    }

    hostelMesh.userData = { spaceId: spaceId };
    this.interactiveObjects.push(hostelMesh);
  },

  buildHousingBlock: function(x, z, w, d, h, spaceId, label) {
    const group = this.groups.housing;

    const villaMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.materials.concrete);
    villaMesh.position.set(x, h / 2 + 0.2, z);
    villaMesh.castShadow = true;
    villaMesh.receiveShadow = true;
    group.add(villaMesh);

    // Articulated Corner Glass Balconies
    for (let floor = 1; floor <= 2; floor++) {
      const fy = floor * 3.5;
      const balMesh = new THREE.Mesh(new THREE.BoxGeometry(6, 1.0, 4), this.materials.darkConcrete);
      balMesh.position.set(x + w / 2 - 2, fy, z + d / 2 - 1);
      balMesh.castShadow = true;
      group.add(balMesh);

      const balGlass = new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.1, 3.8), this.materials.glass);
      balGlass.position.set(x + w / 2 - 2, fy + 0.9, z + d / 2 - 1);
      group.add(balGlass);
    }

    villaMesh.userData = { spaceId: spaceId };
    this.interactiveObjects.push(villaMesh);
  },

  // -------------------------------------------------------------
  // 7. SPORTS & ATHLETICS COMPLEX
  // -------------------------------------------------------------
  buildSportsComplex: function() {
    const group = this.groups.sports;

    // Sports Zone Asphalt/Paved Base
    const basePave = new THREE.Mesh(new THREE.BoxGeometry(45, 0.2, 40), this.materials.darkConcrete);
    basePave.position.set(38, 0.1, 50);
    basePave.receiveShadow = true;
    group.add(basePave);

    // Basketball Court 1 (28m x 15m)
    const bbMat = new THREE.MeshStandardMaterial({
      map: this.textures.basketball,
      roughness: 0.6,
      metalness: 0.1
    });
    const bbCourt = new THREE.Mesh(new THREE.PlaneGeometry(28, 15), bbMat);
    bbCourt.rotation.x = -Math.PI / 2;
    bbCourt.position.set(26, 0.22, 42);
    bbCourt.receiveShadow = true;
    group.add(bbCourt);

    // Basketball Hoops & Stanchions
    this.buildBasketballHoop(12, 0.22, 42, Math.PI / 2);
    this.buildBasketballHoop(40, 0.22, 42, -Math.PI / 2);

    // Twin Tennis / Badminton Courts (24m x 11m each)
    const tennisMat = new THREE.MeshStandardMaterial({
      map: this.textures.tennis,
      roughness: 0.6,
      metalness: 0.1
    });
    const tennisCourt1 = new THREE.Mesh(new THREE.PlaneGeometry(24, 11), tennisMat);
    tennisCourt1.rotation.x = -Math.PI / 2;
    tennisCourt1.position.set(38, 0.22, 60);
    tennisCourt1.receiveShadow = true;
    group.add(tennisCourt1);

    // Tennis Net
    const netMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0, 11), this.materials.steelFrame);
    netMesh.position.set(38, 0.72, 60);
    netMesh.castShadow = true;
    group.add(netMesh);

    // Floodlight Towers (12m height)
    for (let fx of [14, 52]) {
      for (let fz of [32, 68]) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 12, 8), this.materials.steelFrame);
        pole.position.set(fx, 6, fz);
        pole.castShadow = true;
        group.add(pole);

        const luminaire = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.8), this.materials.darkConcrete);
        luminaire.position.set(fx, 12, fz);
        group.add(luminaire);
      }
    }

    basePave.userData = { spaceId: "sports-complex" };
    this.interactiveObjects.push(basePave);
  },

  buildBasketballHoop: function(x, y, z, rotY) {
    const group = this.groups.sports;
    const stanchion = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 3.8, 8), this.materials.steelFrame);
    stanchion.position.set(x, y + 1.9, z);
    stanchion.castShadow = true;
    group.add(stanchion);

    const backboard = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.05, 0.08), this.materials.concrete);
    backboard.rotation.y = rotY;
    backboard.position.set(x, y + 3.2, z);
    group.add(backboard);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.03, 8, 16), this.materials.bronzeLouver);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(x, y + 3.05, z + (rotY > 0 ? 0.35 : -0.35));
    group.add(rim);
  },

  // -------------------------------------------------------------
  // 8. LANDSCAPE, CENTRAL PLAZA & AMPHITHEATRE
  // -------------------------------------------------------------
  buildLandscapeFeatures: function() {
    const group = this.groups.landscape;

    // 1. Circular Plaza & Tiered Reflecting Water Feature (Radius 12m = 24m Diameter)
    const plazaRadius = 12;
    const plazaX = 25;
    const plazaZ = -35;

    // Paved circular court
    const plazaGeo = new THREE.CircleGeometry(plazaRadius, 32);
    const plazaMesh = new THREE.Mesh(plazaGeo, this.materials.paver);
    plazaMesh.rotation.x = -Math.PI / 2;
    plazaMesh.position.set(plazaX, 0.04, plazaZ);
    plazaMesh.receiveShadow = true;
    group.add(plazaMesh);

    // Raised Circular Reflecting Basin
    const basinWall = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.4, 0.8, 32, 1, true), this.materials.darkConcrete);
    basinWall.position.set(plazaX, 0.4, plazaZ);
    basinWall.castShadow = true;
    group.add(basinWall);

    const waterMesh = new THREE.Mesh(new THREE.CircleGeometry(5.0, 32), this.materials.water);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(plazaX, 0.7, plazaZ);
    group.add(waterMesh);

    // Central Fountain Jet / Kinetic Sculpture
    const fountainSculpture = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.8, 3.5, 8), this.materials.steelFrame);
    fountainSculpture.position.set(plazaX, 2.0, plazaZ);
    fountainSculpture.castShadow = true;
    group.add(fountainSculpture);

    plazaMesh.userData = { spaceId: "central-plaza" };
    this.interactiveObjects.push(plazaMesh);

    // 2. Stepped Outdoor Amphitheater
    const amphiX = 48;
    const amphiZ = -8;
    for (let tier = 1; tier <= 4; tier++) {
      const tierRadius = 6 + tier * 2.8;
      const tierGeo = new THREE.CylinderGeometry(tierRadius, tierRadius, 0.5, 32, 1, false, 0, Math.PI);
      const tierMesh = new THREE.Mesh(tierGeo, this.materials.concrete);
      tierMesh.rotation.y = -Math.PI / 2;
      tierMesh.position.set(amphiX, tier * 0.45, amphiZ);
      tierMesh.receiveShadow = true;
      group.add(tierMesh);

      // Grass seating top
      const grassSeat = new THREE.Mesh(new THREE.CylinderGeometry(tierRadius - 0.2, tierRadius - 0.2, 0.05, 32, 1, false, 0, Math.PI), this.materials.grass);
      grassSeat.rotation.y = -Math.PI / 2;
      grassSeat.position.set(amphiX, tier * 0.45 + 0.26, amphiZ);
      group.add(grassSeat);
    }

    // Circular stage
    const stageMesh = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 0.6, 24), this.materials.woodDeck);
    stageMesh.position.set(amphiX, 0.3, amphiZ);
    stageMesh.receiveShadow = true;
    group.add(stageMesh);

    stageMesh.userData = { spaceId: "amphitheater" };
    this.interactiveObjects.push(stageMesh);

    // 3. Planting Campus Trees & Greenery (Over 100 Trees)
    this.populateTrees();
  },

  populateTrees: function() {
    const group = this.groups.landscape;

    // Palette of architectural tree styles
    const treeTypes = [
      { trunkH: 2.2, crownR: 2.5, crownH: 4.0, crownColor: 0x166534 }, // Mature Shade Oak
      { trunkH: 2.8, crownR: 2.0, crownH: 4.8, crownColor: 0x15803d }, // Slender Poplar
      { trunkH: 1.8, crownR: 2.2, crownH: 3.2, crownColor: 0x7c3aed }, // Flowering Jacaranda (Violet accent)
      { trunkH: 3.5, crownR: 1.8, crownH: 2.5, crownColor: 0x047857 }  // Palm / Date Palm
    ];

    // Tree placement coordinates (perimeter buffer, arrival circle, courtyard gardens, sports fringe)
    const treeCoords = [
      // Northern Boundary Buffer
      [-65, -75], [-50, -75], [-35, -75], [-20, -75], [-5, -75], [10, -75], [40, -75], [55, -75], [68, -75],
      // Eastern Boundary Green Belt
      [70, -60], [70, -45], [70, -30], [70, -15], [70, 0], [70, 15], [70, 30], [70, 45], [70, 60], [70, 75],
      // Western Boundary Buffer
      [-70, -60], [-70, -40], [-70, -20], [-70, 0], [-70, 20], [-70, 40], [-70, 60], [-70, 75],
      // Southern Residential Garden
      [-45, 78], [-30, 78], [-15, 78], [0, 78], [15, 78], [30, 78], [45, 78], [60, 78],
      // Circular Plaza Accent Grove
      [14, -26], [14, -44], [36, -44], [36, -26], [25, -20], [25, -50],
      // Amphitheater Surroundings
      [60, -20], [62, -10], [60, 0], [62, 10], [55, 18],
      // Cafeteria Lawn & Pergola Fringe
      [-28, 5], [-28, 16], [-62, 5], [-62, 16],
      // Internal Hostels Garden Courts
      [-38, 32], [-38, 45], [-38, 58], [-18, 55], [2, 55]
    ];

    treeCoords.forEach(([tx, tz], i) => {
      const type = treeTypes[i % treeTypes.length];

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, type.trunkH, 6);
      const trunkMesh = new THREE.Mesh(trunkGeo, this.materials.steelFrame);
      trunkMesh.position.set(tx, type.trunkH / 2, tz);
      trunkMesh.castShadow = true;
      group.add(trunkMesh);

      // Foliage Crown
      const crownMat = new THREE.MeshStandardMaterial({
        color: type.crownColor,
        roughness: 0.8,
        metalness: 0.05
      });
      const crownGeo = new THREE.ConeGeometry(type.crownR, type.crownH, 7);
      const crownMesh = new THREE.Mesh(crownGeo, crownMat);
      crownMesh.position.set(tx, type.trunkH + type.crownH / 2 - 0.2, tz);
      crownMesh.castShadow = true;
      group.add(crownMesh);
    });
  },

  // -------------------------------------------------------------
  // HELPER: CREATE INTERACTIVE ZONE VOLUME
  // -------------------------------------------------------------
  createZoneVolume: function(cfg) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d), cfg.facadeMat);
    mesh.position.set(cfg.x, cfg.y, cfg.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Accent facade trim / louvers
    if (cfg.accentMat) {
      const accent = new THREE.Mesh(new THREE.BoxGeometry(cfg.w + 0.1, cfg.h * 0.8, 0.2), cfg.accentMat);
      accent.position.set(0, 0, cfg.d / 2 + 0.1);
      mesh.add(accent);
    }

    cfg.group.add(mesh);

    // Register metadata
    mesh.userData = { spaceId: cfg.id, defaultMat: cfg.facadeMat };
    this.interactiveObjects.push(mesh);
    return mesh;
  },

  // -------------------------------------------------------------
  // INTERACTIVITY & RAYCASTING
  // -------------------------------------------------------------
  initInteractivity: function() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("pointermove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.interactiveObjects, true);

      if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit.parent && !hit.userData.spaceId && hit.parent !== this.scene) {
          hit = hit.parent;
        }
        if (hit.userData && hit.userData.spaceId) {
          document.body.style.cursor = "pointer";
          this.hoveredObject = hit;
          return;
        }
      }
      document.body.style.cursor = "default";
      this.hoveredObject = null;
    });

    window.addEventListener("click", (e) => {
      // Ignore if clicking on UI
      if (e.target.closest(".interactive")) return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.interactiveObjects, true);

      if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit.parent && !hit.userData.spaceId && hit.parent !== this.scene) {
          hit = hit.parent;
        }
        if (hit.userData && hit.userData.spaceId) {
          this.selectSpace(hit.userData.spaceId);
        }
      }
    });

    // Walkthrough Keyboard Controls
    window.addEventListener("keydown", (e) => {
      if (!this.state.walkMode) return;
      if (e.code === "KeyW" || e.code === "ArrowUp") this.state.walkKeys.forward = true;
      if (e.code === "KeyS" || e.code === "ArrowDown") this.state.walkKeys.backward = true;
      if (e.code === "KeyA" || e.code === "ArrowLeft") this.state.walkKeys.left = true;
      if (e.code === "KeyD" || e.code === "ArrowRight") this.state.walkKeys.right = true;
    });

    window.addEventListener("keyup", (e) => {
      if (!this.state.walkMode) return;
      if (e.code === "KeyW" || e.code === "ArrowUp") this.state.walkKeys.forward = false;
      if (e.code === "KeyS" || e.code === "ArrowDown") this.state.walkKeys.backward = false;
      if (e.code === "KeyA" || e.code === "ArrowLeft") this.state.walkKeys.left = false;
      if (e.code === "KeyD" || e.code === "ArrowRight") this.state.walkKeys.right = false;
    });
  },

  // -------------------------------------------------------------
  // SELECT SPACE & FLY CAMERA
  // -------------------------------------------------------------
  selectSpace: function(spaceId) {
    const space = this.spaces.find(s => s.id === spaceId);
    if (!space) return;

    // Reset previous selection material
    if (this.selectedMesh) {
      if (this.selectedMesh.material) {
        this.selectedMesh.material = this.selectedMesh.userData.defaultMat || this.materials.concrete;
      }
    }

    // Highlight target object
    const targetMesh = this.interactiveObjects.find(o => o.userData.spaceId === spaceId);
    if (targetMesh && targetMesh.material) {
      targetMesh.material = this.materials.highlight;
      this.selectedMesh = targetMesh;
    }

    // Smooth Camera Tween
    this.tweenCamera(space.cameraPos, space.cameraTarget, 1200);

    // Update UI Inspector Card
    if (window.AVGC_UI) {
      window.AVGC_UI.updateInspector(space);
    }
  },

  tweenCamera: function(targetPos, targetLookAt, duration) {
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const startTime = performance.now();

    const animateTween = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      this.camera.position.lerpVectors(startPos, targetPos, ease);
      this.controls.target.lerpVectors(startTarget, targetLookAt, ease);
      this.controls.update();

      if (progress < 1) {
        requestAnimationFrame(animateTween);
      }
    };
    requestAnimationFrame(animateTween);
  },

  // -------------------------------------------------------------
  // EXPLODED FLOOR-BY-FLOOR VIEW
  // -------------------------------------------------------------
  setExplodedView: function(val) {
    // val: 0.0 (assembled) to 1.0 (fully exploded)
    this.state.explodedVal = val;
    const liftScale = val * 22; // Lift upper floors up to 22m

    this.groups.academicFirst.position.y = liftScale * 0.45;
    this.groups.academicRoof.position.y = liftScale * 1.0;
  },

  // -------------------------------------------------------------
  // FILTER BY FLOOR LEVEL
  // -------------------------------------------------------------
  setFloorLevel: function(level) {
    this.state.currentFloor = level;
    if (level === "all") {
      this.groups.academicGround.visible = true;
      this.groups.academicFirst.visible = true;
      this.groups.academicRoof.visible = true;
      this.setExplodedView(0);
    } else if (level === "ground") {
      this.groups.academicGround.visible = true;
      this.groups.academicFirst.visible = false;
      this.groups.academicRoof.visible = false;
    } else if (level === "first") {
      this.groups.academicGround.visible = true;
      this.groups.academicFirst.visible = true;
      this.groups.academicRoof.visible = false;
    } else if (level === "roof") {
      this.groups.academicGround.visible = true;
      this.groups.academicFirst.visible = true;
      this.groups.academicRoof.visible = true;
    }
  },

  // -------------------------------------------------------------
  // TIME OF DAY & SHADING MODES
  // -------------------------------------------------------------
  setTimeOfDay: function(hour) {
    this.state.timeOfDay = hour;
    // Calculate sun angle: 6:00 = sunrise, 12:00 = zenith, 18:00 = sunset
    const angle = ((hour - 6) / 12) * Math.PI;
    const sunDist = 180;
    const sunX = Math.cos(angle) * sunDist;
    const sunY = Math.sin(angle) * sunDist;
    const sunZ = Math.sin(angle) * 70;

    this.sunLight.position.set(sunX, Math.max(sunY, -10), sunZ);

    if (hour < 6.5 || hour > 18.5) {
      // Night Mode
      this.scene.background.set(0x050814);
      this.scene.fog.color.set(0x050814);
      this.sunLight.intensity = 0.05;
      this.skyFill.intensity = 0.08;
      this.ambientLight.intensity = 0.15;
      this.interiorLight.intensity = 2.5; // Glowing atrium windows
    } else if (hour >= 16.5 && hour <= 18.5) {
      // Golden Hour Sunset
      this.scene.background.set(0x3b1d11);
      this.scene.fog.color.set(0x451a03);
      this.sunLight.color.set(0xfb923c);
      this.sunLight.intensity = 1.4;
      this.ambientLight.intensity = 0.35;
      this.interiorLight.intensity = 1.2;
    } else {
      // Clear Midday Sun
      this.scene.background.set(0x0f172a);
      this.scene.fog.color.set(0x0f172a);
      this.sunLight.color.set(0xfffbeb);
      this.sunLight.intensity = 1.3;
      this.skyFill.intensity = 0.35;
      this.ambientLight.intensity = 0.45;
      this.interiorLight.intensity = 0.2;
    }
  },

  setShadingMode: function(mode) {
    this.state.shadingMode = mode;
    if (mode === "clay") {
      this.scene.traverse((obj) => {
        if (obj.isMesh && obj !== this.selectedMesh) {
          obj.userData.tempMat = obj.material;
          obj.material = this.materials.clay;
        }
      });
      this.renderer.toneMappingExposure = 1.2;
    } else {
      this.scene.traverse((obj) => {
        if (obj.isMesh && obj.userData.tempMat) {
          obj.material = obj.userData.tempMat;
          delete obj.userData.tempMat;
        }
      });
      this.renderer.toneMappingExposure = 1.05;
    }
  },

  // -------------------------------------------------------------
  // WALKTHROUGH CONTROLLER
  // -------------------------------------------------------------
  toggleWalkMode: function(enable) {
    this.state.walkMode = enable;
    if (enable) {
      this.controls.enabled = false;
      this.camera.position.copy(this.state.walkPos);
      this.camera.lookAt(this.state.walkPos.x, 1.7, this.state.walkPos.z + 10);
    } else {
      this.controls.enabled = true;
      this.controls.target.set(-5, 0, 5);
      this.camera.position.set(80, 95, 125);
    }
  },

  updateWalkMode: function(delta) {
    if (!this.state.walkMode) return;
    const speed = 12 * delta; // 12 m/s sprint/walk
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();

    const side = new THREE.Vector3(-dir.z, 0, dir.x);

    if (this.state.walkKeys.forward) this.state.walkPos.addScaledVector(dir, speed);
    if (this.state.walkKeys.backward) this.state.walkPos.addScaledVector(dir, -speed);
    if (this.state.walkKeys.left) this.state.walkPos.addScaledVector(side, speed);
    if (this.state.walkKeys.right) this.state.walkPos.addScaledVector(side, -speed);

    // Keep eye level at 1.7m above ground
    this.state.walkPos.y = 1.7;
    this.camera.position.copy(this.state.walkPos);
  },

  // -------------------------------------------------------------
  // ANIMATION LOOP
  // -------------------------------------------------------------
  animate: function() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    if (this.state.walkMode) {
      this.updateWalkMode(delta);
    } else {
      this.controls.update();
    }

    this.renderer.render(this.scene, this.camera);
  },

  onWindowResize: function() {
    const container = this.renderer.domElement.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
};
