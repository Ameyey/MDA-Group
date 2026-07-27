import { PRODUCT_IMAGES } from './images';



export const PRODUCTS = [
  {
    id: "prod-1",
    name: "Laser Nozzle",
    category: "Nozzles & Ceramics",
    compatibleBrands: ["Raytools", "BOCI", "Precitec", "WSX", "Han's Laser"],
    shortDesc: "High purity tellurium copper CNC laser cutting nozzle for precise gas flow dynamics.",
    fullDesc: "Engineered from premium grade oxygen-free copper with high thermal conductivity. Specially polished interior wall ensures laminar gas flow, reducing dross and extending nozzle longevity during continuous 24/7 cutting operations.",
    badge: "Best Seller",
    pricePlaceholder: "₹ 450 - ₹ 1,200 / Unit",
    imageUrl: PRODUCT_IMAGES["prod-1"],
    specs: {
      "Material": "Tellurium Copper / Chrome Plated",
      "Thread Size": "M11 / M14 / M15 / M16",
      "Caliber Range": "0.8mm - 5.0mm",
      "Wavelength": "1064 nm Fiber Laser",
      "Application": "Fiber Laser Metal Sheet & Pipe Cutting"
    },
    visualType: "nozzle"
  },
  {
    id: "prod-2",
    name: "Single Layer Nozzle",
    category: "Nozzles & Ceramics",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "WSX"],
    shortDesc: "Optimized single-layer nozzle design designed for high-pressure Nitrogen gas cutting.",
    fullDesc: "Single layer laser nozzles are engineered specifically for high-pressure nitrogen gas auxiliary cutting of stainless steel, aluminum alloys, and brass. Minimizes gas turbulence and prevents edge oxidation.",
    badge: "In Stock",
    pricePlaceholder: "₹ 450 - ₹ 950 / Unit",
    imageUrl: PRODUCT_IMAGES["prod-2"],
    specs: {
      "Layer Type": "Single Layer (N2 Gas)",
      "Caliber": "1.0mm, 1.2mm, 1.5mm, 2.0mm, 2.5mm, 3.0mm",
      "Thread": "M11 / M14",
      "Auxiliary Gas": "Nitrogen / High Pressure Air",
      "Surface Finish": "Chromium Plated anti-spatter"
    },
    visualType: "single_nozzle"
  },
  {
    id: "prod-3",
    name: "Double Layer Nozzle",
    category: "Nozzles & Ceramics",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "WSX", "Han's Laser"],
    shortDesc: "Dual-chamber oxygen cutting nozzle for heavy carbon steel sheet processing.",
    fullDesc: "Double layer nozzles contain an internal gas diffuser core that stabilizes low-pressure Oxygen gas flows required for cutting thick mild steel. Ensures clean pierce holes and smooth cut edges with minimal kerf width.",
    badge: "Popular",
    pricePlaceholder: "₹ 550 - ₹ 1,400 / Unit",
    imageUrl: PRODUCT_IMAGES["prod-3"],
    specs: {
      "Layer Type": "Double Layer (O2 Gas)",
      "Caliber": "1.2mm, 1.5mm, 2.0mm, 2.5mm, 3.0mm, 4.0mm",
      "Inner Diffuser": "Integrated Brass Core",
      "Auxiliary Gas": "Oxygen (O2)",
      "Compatibility": "Universal M11/M14 thread heads"
    },
    visualType: "double_nozzle"
  },
  {
    id: "prod-4",
    name: "Ceramic Ring",
    category: "Nozzles & Ceramics",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "WSX"],
    shortDesc: "High dielectric strength structural ceramic body for capacitance height sensing.",
    fullDesc: "Ultra-precision ceramic sensor holder built with high temperature resistant technical ceramics and gold-plated alloy contacts. Transmits sensitive capacitance signals to height controller with zero thermal drift.",
    badge: "Essential",
    pricePlaceholder: "₹ 1,800 - ₹ 3,500 / Piece",
    imageUrl: PRODUCT_IMAGES["prod-4"],
    specs: {
      "Diameter": "28mm, 32mm, 41mm, 48.5mm",
      "Body Material": "Zirconia / Alumina Technical Ceramic",
      "Contacts": "Gold-Plated Copper Pins",
      "Thermal Resistance": "Up to 1400°C",
      "Compatible Heads": "Raytools BM111, BOCI BLT420, Precitec ProCutter"
    },
    visualType: "ceramic"
  },
  {
    id: "prod-5",
    name: "Protective Lens",
    category: "",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "WSX", "SUP", "Han's Laser"],
    shortDesc: "Fused Silica AR-coated protective window (27.9x4.1, 37x7, 30x5) for fiber laser heads.",
    fullDesc: "High damage threshold JGS1 Synthetic Fused Silica optical window. Double-sided anti-reflective (AR) coating at 1064nm wavelength delivers >99.8% laser transmission and maximum protection against spatter and debris.",
    badge: "Best Seller",
    pricePlaceholder: "₹ 850 - ₹ 2,200 / Lens",
    imageUrl: PRODUCT_IMAGES["prod-5"],
    specs: {
      "Dimensions": "27.9x4.1mm, 37x7mm, 30x5mm, 24.9x1.5mm",
      "Substrate": "JGS1 Fused Silica (Quartz)",
      "Transmittance": ">99.8% @ 1064nm",
      "Power Rating": "1KW - 30KW",
      "Surface Quality": "40/20 Scratch-Dig"
    },
    visualType: "protective_lens"
  },
  {
    id: "prod-6",
    name: "Focus Lens",
    category: "Laser Source",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "WSX", "Han's Laser"],
    shortDesc: "Doublet/Singlet AR-coated focusing lens assembly for high intensity laser beam waist.",
    fullDesc: "Precision polished plano-convex and meniscus focus lens pairs. Engineered to minimize spherical aberration and thermal lensing at power levels up to 20KW.",
    badge: "High Precision",
    pricePlaceholder: "₹ 4,500 - ₹ 12,000 / Set",
    imageUrl: PRODUCT_IMAGES["prod-6"],
    specs: {
      "Diameter": "D30mm, D37mm, D38.1mm, D50mm",
      "Focal Length": "F100mm, F125mm, F150mm, F200mm",
      "Coating": "AR/AR @ 1064nm Absorption < 50ppm",
      "Wavelength": "1064 - 1080 nm Fiber Laser",
      "Mount Type": "Bare Optic or Mounted Module"
    },
    visualType: "focus_lens"
  },
  {
    id: "prod-7",
    name: "Collimating Lens",
    category: "Laser Source",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "WSX"],
    shortDesc: "Collimation lens unit to transform divergent fiber laser output into parallel beam.",
    fullDesc: "High accuracy optical collimator lens set designed for fiber delivery input. Ensures crisp beam shaping with minimal focal drift over long continuous cutting runs.",
    badge: "OEM Quality",
    pricePlaceholder: "₹ 5,200 - ₹ 14,500 / Set",
    imageUrl: PRODUCT_IMAGES["prod-7"],
    specs: {
      "Diameter": "D30mm, D37mm, D38.1mm",
      "Focal Length": "F75mm, F100mm",
      "Optic Material": "High Purity Quartz Fused Silica",
      "Laser Power": "Up to 15000W",
      "Transmittance": "99.9%"
    },
    visualType: "collimating_lens"
  },
  {
    id: "prod-8",
    name: "Laser Head",
    category: "Cutting Heads",
    compatibleBrands: ["OSPRI", "Raytools", "Precitec", "BOCI", "WSX"],
    shortDesc: "Automated auto-focus fiber laser cutting head assembly with water cooling circuit.",
    fullDesc: "Complete heavy-duty fiber laser processing head featuring motorized auto-focus mechanism, internal temperature monitoring, dual protective glass drawers, and high pressure sealing.",
    badge: "New Arrival",
    pricePlaceholder: "₹ 1,25,000 - ₹ 3,80,000",
    imageUrl: PRODUCT_IMAGES["prod-8"],
    specs: {
      "Power Capacity": "3KW - 12KW",
      "Focus Range": "-12mm to +10mm",
      "Cooling": "Dual Circuit Water Cooling",
      "Gas Pressure": "Max 25 Bar",
      "Weight": "approx 5.5 kg"
    },
    visualType: "laser_head"
  },
  {
    id: "prod-9",
    name: "Raytools Laser Head",
    category: "Cutting Heads",
    compatibleBrands: ["Raytools"],
    shortDesc: "Genuine Raytools BM111 / BM114S auto-focus laser cutting head for sheet metal.",
    fullDesc: "Original Raytools BM111 / BM114S series fiber laser cutting head with built-in motor drive unit. Allows programmable focus location changes automatically according to material thickness.",
    badge: "Best Seller",
    pricePlaceholder: "₹ 1,45,000 - ₹ 2,90,000",
    imageUrl: PRODUCT_IMAGES["prod-9"],
    specs: {
      "Model Series": "BM111 / BM114S / BT240S",
      "Laser Interface": "QBH / QD",
      "Clear Aperture": "28mm",
      "Focus Speed": "100 mm/s",
      "Max Power": "6000W / 12000W"
    },
    visualType: "raytools_head"
  },
  {
    id: "prod-10",
    name: "BOCI Laser Head",
    category: "Cutting Heads",
    compatibleBrands: ["BOCI"],
    shortDesc: "BOCI BLT420 / BLT641 intelligent high-power auto focus cutting head.",
    fullDesc: "Smart intelligent cutting head by BOCI equipped with real-time temperature, pressure and vibration monitoring sensors for ultra high speed cutting on 6KW to 30KW fiber lasers.",
    badge: "Smart Head",
    pricePlaceholder: "₹ 1,80,000 - ₹ 4,20,000",
    imageUrl: PRODUCT_IMAGES["prod-10"],
    specs: {
      "Model": "BLT420 (6KW) / BLT641 (12KW/30KW)",
      "Sensor Tech": "Bus Communication Realtime Monitoring",
      "Focus Range": "-30mm to +30mm",
      "Water Cooling": "Optics & Nozzle Dual Cooling",
      "Dust Proof": "Class 100 Cleanroom Assembled"
    },
    visualType: "boci_head"
  },
  {
    id: "prod-11",
    name: "Sensor Cable",
    category: "WSX Laser Cutting Head",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "Friendess", "WSX"],
    shortDesc: "Low-loss RF coaxial sensor cable for capacitance height tracking signals.",
    fullDesc: "Flexible high-frequency shielded coaxial sensor cable connecting ceramic ring to capacitance height sensor board. Resistant to spatter, oil, flex stress, and EMI interference.",
    badge: "In Stock",
    pricePlaceholder: "₹ 1,200 - ₹ 3,200 / Unit",
    imageUrl: PRODUCT_IMAGES["prod-11"],
    specs: {
      "Connector Type": "M12 5-Pin / SMA / BNC",
      "Cable Length": "1.5m, 2.0m, 3.0m, 5.0m",
      "Shielding": "Double Layer Braided Shield",
      "Jacket": "High Temperature TPU",
      "Impedance": "50 Ohm"
    },
    visualType: "sensor_cable"
  },
  {
    id: "prod-12",
    name: "Laser Chiller Parts",
    category: "Consumables & Maintenance",
    compatibleBrands: ["Raycus", "MAX Photonics", "IPG Photonics"],
    shortDesc: "Water circulation pumps, flow meters, deionizing filters & temp controllers for laser chillers.",
    fullDesc: "Replacement maintenance spares for industrial water chillers (Hanli, S&A, Tongfei). Includes DI resin filter cartridges, flow switches, pressure gauges, and digital thermostat modules.",
    badge: "Maintenance",
    pricePlaceholder: "₹ 2,500 - ₹ 18,000 / Component",
    imageUrl: PRODUCT_IMAGES["prod-12"],
    specs: {
      "Components": "DI Water Filter, Flow Switch, Water Pump, Solenoid Valve",
      "Resin Cartridge": "Deionizing Mixed Bed Resin",
      "Pump Pressure": "3.5 - 6.0 Bar",
      "Compatibility": "S&A CWFL-2000/3000/6000, Hanli Chillers"
    },
    visualType: "chiller_parts"
  },
  {
    id: "prod-13",
    name: "Laser Cutting Consumables",
    category: "Consumables & Maintenance",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "WSX", "Raycus", "MAX Photonics"],
    shortDesc: "Lens cleaning swabs, sealing O-rings, optic wipes, anti-spatter spray & seal kits.",
    fullDesc: "Professional grade cleaning and maintenance consumables kit for optical lenses and laser heads. Contains lint-free microfiber wipes, high purity IPA swabs, and precision fluoro-rubber seals.",
    badge: "Kit",
    pricePlaceholder: "₹ 950 - ₹ 3,800 / Kit",
    imageUrl: PRODUCT_IMAGES["prod-13"],
    specs: {
      "Included Items": "Cleanroom Swabs, Lens Cleaning Wipes, O-Ring Box, Silicone Grease",
      "Optic Cleanliness": "Grade 10 Cleanroom Safe",
      "O-Ring Material": "Viton (FKM) High Temp Rubber"
    },
    visualType: "consumables"
  },
  {
    id: "prod-14",
    name: "Servo Motor",
    category: "WSX Laser Cutting Head",
    compatibleBrands: ["Friendess", "Han's Laser", "Yaskawa", "Panasonic"],
    shortDesc: "High response AC servo motor & amplifier drive for CNC gantry X/Y/Z motion control.",
    fullDesc: "Industrial high precision AC servo motor with 24-bit absolute encoder. Delivers rapid acceleration, smooth torque output, and millisecond positioning accuracy for laser machine gantries.",
    badge: "High Performance",
    pricePlaceholder: "₹ 18,500 - ₹ 65,000 / Motor",
    imageUrl: PRODUCT_IMAGES["prod-14"],
    specs: {
      "Power Rating": "850W, 1.3KW, 1.8KW, 2.9KW",
      "Encoder": "24-bit Absolute Encoder",
      "Max Speed": "3000 - 6000 RPM",
      "Communication": "EtherCAT / Pulse Direction",
      "Protection": "IP67 Waterproof"
    },
    visualType: "servo_motor"
  },
  {
    id: "prod-15",
    name: "Laser Power Supply",
    category: "WSX Laser Cutting Head",
    compatibleBrands: ["Raycus", "MAX Photonics", "IPG Photonics"],
    shortDesc: "Regulated DC power supply unit for laser pump diode modules and fiber laser drivers.",
    fullDesc: "Heavy-duty industrial switching power supply engineered for high current pulse loads of fiber laser generator modules. Features over-voltage, short-circuit, and thermal protection.",
    badge: "Heavy Duty",
    pricePlaceholder: "₹ 24,000 - ₹ 85,000 / Unit",
    imageUrl: PRODUCT_IMAGES["prod-15"],
    specs: {
      "Output Voltage": "24V DC / 48V DC / 100V DC",
      "Current Output": "Up to 100A",
      "Efficiency": ">94%",
      "Input Voltage": "3-Phase 380V AC 50/60Hz"
    },
    visualType: "power_supply"
  },
  {
    id: "prod-16",
    name: "Height Controller",
    category: "WSX Laser Cutting Head",
    compatibleBrands: ["Friendess", "Raytools", "Precitec", "BOCI"],
    shortDesc: "BCS100 capacitance height controller system for automatic Z-axis tracking.",
    fullDesc: "Industry-standard FSCUT BCS100 capacitance height adjustment controller system. Includes controller unit, preamp box, and interconnecting cables for non-contact standoff height regulation.",
    badge: "Industry Standard",
    pricePlaceholder: "₹ 35,000 - ₹ 78,000 / System",
    imageUrl: PRODUCT_IMAGES["prod-16"],
    specs: {
      "Model": "BCS100 / CypOne Height Controller",
      "Sampling Speed": "1000 times/sec",
      "Static Accuracy": "0.001 mm",
      "Dynamic Accuracy": "0.02 mm",
      "Response Time": "< 0.5 ms"
    },
    visualType: "height_controller"
  },
  {
    id: "prod-17",
    name: "Linear Guide",
    category: "Consumables & Maintenance",
    compatibleBrands: ["Han's Laser", "HIWIN", "PMI"],
    shortDesc: "Heavy-load linear rail guide & ball slide block for CNC laser cutting bed.",
    fullDesc: "High rigidity precision linear guideways with self-aligning four-row steel ball circulation. Minimizes vibration at high cutting feeds up to 120 m/min.",
    badge: "Precision",
    pricePlaceholder: "₹ 4,200 - ₹ 16,000 / Meter",
    imageUrl: PRODUCT_IMAGES["prod-17"],
    specs: {
      "Rail Width": "20mm, 25mm, 30mm, 35mm",
      "Accuracy Class": "H / P Grade",
      "Load Rating": "Heavy Dynamic Load Rating",
      "Lubrication": "Self-lubricating block system"
    },
    visualType: "linear_guide"
  },
  {
    id: "prod-18",
    name: "Air Filter",
    category: "Consumables & Maintenance",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "WSX"],
    shortDesc: "3-Stage high pressure air purification filter for clean laser cutting gas lines.",
    fullDesc: "Precision compressed air filter unit removes oil vapor, water droplets, and particulates down to 0.01 micron to prevent contamination of expensive laser protective windows.",
    badge: "Protective",
    pricePlaceholder: "₹ 6,500 - ₹ 22,000 / Unit",
    imageUrl: PRODUCT_IMAGES["prod-18"],
    specs: {
      "Filter Efficiency": "99.999% @ 0.01 micron",
      "Max Pressure": "30 Bar (3.0 MPa)",
      "Flow Capacity": "3.5 m³/min",
      "Filter Element": "Activated Carbon + Micro-glass fiber"
    },
    visualType: "air_filter"
  },
  {
    id: "prod-19",
    name: "Gas Regulator",
    category: "Consumables & Maintenance",
    compatibleBrands: ["Raytools", "Precitec", "BOCI", "Raycus"],
    shortDesc: "High pressure dual-stage brass/stainless steel gas pressure regulator with dual gauges.",
    fullDesc: "Heavy-duty gas regulator designed for high-flow Oxygen and Nitrogen assist gas delivery. Maintains stable output pressure under fluctuating supply cylinder pressures.",
    badge: "Heavy Duty",
    pricePlaceholder: "₹ 8,200 - ₹ 26,000 / Regulator",
    imageUrl: PRODUCT_IMAGES["prod-19"],
    specs: {
      "Max Inlet Pressure": "300 Bar",
      "Outlet Pressure Range": "0 - 25 Bar",
      "Body Material": "Forged Brass / SS316",
      "Diaphragm": "Stainless Steel Metal-to-Metal Seal"
    },
    visualType: "gas_regulator"
  },
  {
    id: "prod-20",
    name: "Fiber Cable",
    category: "WSX Laser Cutting Head",
    compatibleBrands: ["Raycus", "MAX Photonics", "IPG Photonics"],
    shortDesc: "QBH / QCS fiber delivery armor cable assembly for continuous high power transmission.",
    fullDesc: "Flexible armored fiber optic beam delivery cable equipped with standardized QBH/QCS optical head termination. Designed for lossless transmission of multi-kilowatt fiber laser power.",
    badge: "High Power",
    pricePlaceholder: "₹ 45,000 - ₹ 1,60,000 / Cable",
    imageUrl: PRODUCT_IMAGES["prod-20"],
    specs: {
      "Fiber Core Diameter": "50um, 75um, 100um, 200um",
      "Armored Length": "10m, 15m, 20m",
      "Connector Standard": "QBH / QCS / QD",
      "Power Rating": "1000W - 30000W"
    },
    visualType: "fiber_cable"
  }
];

export const CATEGORIES = [
  "All",
  "Nozzles & Ceramics & Laser Nozzle",
  // "Laser Source",
  // "Cutting Heads",  
  // "Consumables & Maintenance",
  "OSPRI Laser Cutting Head",
  "PRECITEC Laser Cutting Head",
  "RAYTOOLS Laser Cutting Head",
  "WSX Laser Cutting Head",
  "BOCHU Laser Cutting Head",
  "Laser Source",
  "FSCUT Controller",



];
