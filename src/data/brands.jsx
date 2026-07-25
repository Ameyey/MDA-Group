import React from 'react';

export const BRANDS = [
  {
    id: "raytools",
    name: "Raytools",
    country: "Switzerland / China",
    specialty: "Cutting Heads, Optics, Ceramic Rings & Nozzles",
    tagline: "World Class Laser Cutting Optics & Heads",
    description: "Leading manufacturer of laser process heads and optical components for high-power fiber laser machines.",
    popularProducts: ["BM111 Auto-Focus Head", "BM114S 6KW Head", "Ceramic Ring 28mm", "Protective Windows 27.9x4.1"],
    svgLogo: (
      <svg viewBox="0 0 200 60" className="w-32 h-10">
        <text x="10" y="38" fill="currentColor" fontSize="28" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">
          RAY<tspan fill="currentColor">TOOLS</tspan>
        </text>
        <path d="M165 15 L185 30 L165 45 Z" fill="currentColor" />
      </svg>     
    )
  },
  {
    id: "max-photonics",
    name: "MAX Photonics",
    country: "China",
    specialty: "Fiber Laser Sources & Power Units",
    tagline: "Pioneer in High Power Fiber Laser Sources",
    description: "Global innovator of industrial fiber laser generators ranging from 1KW to 50KW continuous wave power output.",
    popularProducts: ["MFSC-1000W Source", "MFSC-6000W Source", "MFMC-30000W High Power", "Laser Power Modules"],
    svgLogo: (
      <svg viewBox="0 0 220 60" className="w-36 h-10">
        <text x="5" y="38" fill="currentColor" fontSize="30" fontWeight="900" fontFamily="sans-serif">
          MAX <tspan fill="currentColor" fontSize="22" fontWeight="700">PHOTONICS</tspan>
        </text>
        <circle cx="198" cy="25" r="8" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "raycus",
    name: "Raycus",
    country: "China",
    specialty: "Fiber Laser Sources & QBH Delivery Cables",
    tagline: "Leading Fiber Laser Source Manufacturer",
    description: "RFL series continuous and pulsed fiber laser generators trusted by laser machine builders worldwide.",
    popularProducts: ["RFL-C4000 4KW", "RFL-C12000 12KW", "RFL-1500 Welding Source", "QBH Fiber Cable"],
    svgLogo: (
      <svg viewBox="0 0 200 60" className="w-32 h-10">
        <path d="M10 18 L25 18 L35 32 L45 18 L60 18 L42 42 L28 42 Z" fill="currentColor" />
        <text x="65" y="38" fill="currentColor" fontSize="28" fontWeight="800" fontFamily="sans-serif">
          Raycus
        </text>
      </svg>
    )
  },
  {
    id: "boci",
    name: "BOCI",
    country: "China",
    specialty: "Intelligent Laser Heads & Consumables",
    tagline: "Smart Auto-focus Laser Cutting Heads",
    description: "High precision intelligent cutting head technology designed for extreme accuracy and high gas flow rate.",
    popularProducts: ["BLT420 4KW Head", "BLT641 12KW Head", "BOCI Nozzles", "BOCI Ceramic Holders"],
    svgLogo: (
      <svg viewBox="0 0 180 60" className="w-28 h-10">
        <rect x="10" y="15" width="30" height="30" rx="6" fill="currentColor" />
        <text x="18" y="38" fill="var(--bg-primary, #0b0f19)" fontSize="20" fontWeight="900">B</text>
        <text x="50" y="38" fill="currentColor" fontSize="28" fontWeight="800" fontFamily="sans-serif">
          BOCI
        </text>
      </svg>
    )
  },
  {
    id: "wsx",
    name: "WSX",
    country: "China",
    specialty: "Manual & Auto Focus Laser Heads",
    tagline: "Precision Laser Cutting Solutions",
    description: "Compact and durable laser cutting heads engineered for sheet metal cutting and pipe tube lasers.",
    popularProducts: ["NC30 Auto Focus Head", "KC15 Manual Head", "WSX Ceramic Part", "Focusing Assembly"],
    svgLogo: (
      <svg viewBox="0 0 180 60" className="w-28 h-10">
        <text x="10" y="40" fill="currentColor" fontSize="32" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">
          WS<tspan fill="currentColor">X</tspan>
        </text>
      </svg>
    )
  },
  {
    id: "precitec",
    name: "Precitec",
    country: "Germany",
    specialty: "Ultra High Power Laser Heads & Capacitance Sensors",
    tagline: "German Engineering for Laser Material Processing",
    description: "Premium benchmark in laser processing heads including ProCutter, FineCutter and LightCutter series.",
    popularProducts: ["ProCutter 2.0 15KW", "ProCutter Zoom", "FineCutter", "Precitec Distance Sensor"],
    svgLogo: (
      <svg viewBox="0 0 210 60" className="w-34 h-10">
        <text x="10" y="38" fill="currentColor" fontSize="26" fontWeight="800" fontFamily="sans-serif">
          precitec
        </text>
        <circle cx="165" cy="22" r="6" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "ipg-photonics",
    name: "IPG Photonics",
    country: "USA / Germany",
    specialty: "High-Efficiency Industrial Fiber Lasers",
    tagline: "The World Leader in Fiber Lasers",
    description: "Industry-standard YLS and YLR high power fiber laser sources for heavy industrial manufacturing.",
    popularProducts: ["YLS-4000 Source", "YLR Continuous Laser", "IPG QBH Cable", "IPG Optical Modules"],
    svgLogo: (
      <svg viewBox="0 0 220 60" className="w-36 h-10">
        <rect x="10" y="14" width="45" height="28" rx="4" fill="currentColor" />
        <text x="16" y="35" fill="var(--bg-primary, #0b0f19)" fontSize="18" fontWeight="900">IPG</text>
        <text x="62" y="35" fill="currentColor" fontSize="20" fontWeight="700">PHOTONICS</text>
      </svg>
    )
  },
  {
    id: "sup",
    name: "SUP",
    country: "China",
    specialty: "Handheld Laser Welding Heads & Controllers",
    tagline: "Ergonomic Handheld Laser Welding Solutions",
    description: "Super handheld laser welding and cleaning torch heads with dual-wobble beam technology.",
    popularProducts: ["SUP20T Welding Head", "SUP Control Board", "Wire Feeder Nozzle", "Protective Lens 18x2"],
    svgLogo: (
      <svg viewBox="0 0 160 60" className="w-26 h-10">
        <text x="10" y="38" fill="currentColor" fontSize="30" fontWeight="900" letterSpacing="3">
          S<tspan fill="currentColor">U</tspan>P
        </text>
      </svg>
    )
  },
  {
    id: "hans-laser",
    name: "Han's Laser",
    country: "China",
    specialty: "Laser Systems, Spare Optics & CNC Components",
    tagline: "Global Laser Equipment Powerhouse",
    description: "Complete range of genuine replacement components for Han's Laser cutting and engraving systems.",
    popularProducts: ["Han's Cutting Nozzles", "Han's Lens Assembly", "Servo Driver Board", "High-Speed Galvo"],
    svgLogo: (
      <svg viewBox="0 0 220 60" className="w-36 h-10">
        <text x="10" y="38" fill="currentColor" fontSize="24" fontWeight="800" fontFamily="sans-serif">
          Han's <tspan fill="currentColor">LASER</tspan>
        </text>
      </svg>
    )
  },
  {
    id: "friendess",
    name: "Friendess (FSCUT)",
    country: "China",
    specialty: "CNC Controller Cards & Height Controllers",
    tagline: "Industry Standard Fiber Laser Control Systems",
    description: "FSCUT series CNC controllers (FSCUT2000C, FSCUT8000) and BCS100 capacitance height adjustment units.",
    popularProducts: ["FSCUT2000C CNC Card", "BCS100 Height Controller", "BMC1604 Expansion Card", "Handwheel Controller"],
    svgLogo: (
      <svg viewBox="0 0 230 60" className="w-40 h-10">
        <text x="5" y="38" fill="currentColor" fontSize="24" fontWeight="800">
          FSCUT <tspan fill="currentColor" fontSize="16" fontWeight="600">(Friendess)</tspan>
        </text>
      </svg>
    )
  },
  {
    id: "ospri",
    name: "OSPRI",
    country: "China",
    specialty: "Smart Laser Cutting Heads (H20B, S03C, LCR03)",
    tagline: "Precision Engineered Laser Cutting Heads",
    description: "High quality laser head options featuring LC80MF, LCM08, LC218 and S03C models for 1KW-20KW lasers.",
    popularProducts: ["OSPRI H20B", "OSPRI S03C Head", "OSPRI LCR03", "OSPRI LDC80"],
    svgLogo: (
      <svg viewBox="0 0 180 60" className="w-28 h-10">
        <text x="10" y="38" fill="currentColor" fontSize="28" fontWeight="900" letterSpacing="1">
          OSPRI
        </text>
      </svg>
    )
  }
];
