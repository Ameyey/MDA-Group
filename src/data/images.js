// High Quality Royalty-Free Industrial Images (1920x1080 HD, Clean, Professional, No Watermarks)

export const HERO_BG_IMAGE = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80"; // Industrial High Power Fiber Laser Cutting Sparks

export const INDUSTRY_IMAGES = {
  automotive: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80", // Automotive Robot Welding
  aerospace: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80", // Aerospace Turbine / Rocket Metal
  sheetMetal: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80", // Sheet Metal Fabrication
  medical: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80", // Precision Medical Device Laser
  electronics: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Electronics Circuit Micro Laser
  manufacturing: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" // Heavy Engineering CNC Factory
};

const PRODUCT_IMAGES_STORAGE_KEY = 'product-image-metadata-catalog';
const CUSTOM_PRODUCT_CARDS_STORAGE_KEY = 'custom-product-cards';

const baseProductImages = {
  'prod-1': 'https://5.imimg.com/data5/SELLER/Default/2021/11/UO/LF/OL/92863266/nozzle-500x500.jpg',
  'prod-2': 'https://www.osprilaser.com/uploads/37372/intelligent-information-cutting-head-20eef1.jpg',
  'prod-3': 'https://m.media-amazon.com/images/I/51yR6wAdk1L.jpg',
  'prod-4': '',
  'prod-5': '',
  'prod-6': '',
  'prod-7': '',
  'prod-8': '',
  'prod-9': '',
  'prod-10': '',
  'prod-11': '',
  'prod-12': '',
  'prod-13': '',
  'prod-14': '',
  'prod-15': '',
  'prod-16': '',
  'prod-17': '',
  'prod-18': '',
  'prod-19': '',
  'prod-20': '',
   
    
};

const readStoredProductImageMetadata = () => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(PRODUCT_IMAGES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const persistedProductImageMetadata = readStoredProductImageMetadata();

export const PRODUCT_IMAGES = { ...baseProductImages };
export const PRODUCT_IMAGE_METADATA = { ...persistedProductImageMetadata };

Object.entries(PRODUCT_IMAGE_METADATA).forEach(([id, entry]) => {
  if (entry && typeof entry === 'object' && typeof entry.url === 'string' && entry.url) {
    PRODUCT_IMAGES[id] = entry.url;
  }
});

export const resolveImageCatalogTargetProductId = (preferredProductId) => {
  if (preferredProductId && PRODUCT_IMAGES[preferredProductId]) {
    return preferredProductId;
  }

  const fallbackId = Object.keys(PRODUCT_IMAGES).find((id) => !PRODUCT_IMAGES[id]);
  return preferredProductId || fallbackId || 'prod-1';
};

export const getCustomProductCards = () => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(CUSTOM_PRODUCT_CARDS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const removeCustomProductCard = (matcher) => {
  const nextCards = getCustomProductCards().filter((card) => {
    if (typeof matcher === 'function') {
      return !matcher(card);
    }

    if (typeof matcher === 'string') {
      return !(
        card.id === matcher ||
        card.name === matcher ||
        card.imageUrl === matcher ||
        card.shortDesc === matcher
      );
    }

    if (matcher && typeof matcher === 'object') {
      const matchesId = matcher.id && card.id === matcher.id;
      const matchesName = matcher.name && card.name === matcher.name;
      const matchesTitle = matcher.title && card.name === matcher.title;
      const matchesUrl = (matcher.imageUrl || matcher.url) && card.imageUrl === (matcher.imageUrl || matcher.url);
      return !(matchesId || matchesName || matchesTitle || matchesUrl);
    }

    return true;
  });

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CUSTOM_PRODUCT_CARDS_STORAGE_KEY, JSON.stringify(nextCards));
  }

  return nextCards;
};

export const upsertCustomProductCard = (cardData) => {
  if (!cardData?.name || !cardData?.imageUrl) {
    return [];
  }

  const nextCards = [...getCustomProductCards()];
  const existingIndex = nextCards.findIndex((card) => card.id === cardData.id);
  const entry = {
    id: cardData.id || `custom-prod-${Date.now()}`,
    name: cardData.name,
    category: cardData.category || 'Custom',
    compatibleBrands: Array.isArray(cardData.compatibleBrands) && cardData.compatibleBrands.length ? cardData.compatibleBrands : ['Custom'],
    shortDesc: cardData.shortDesc || cardData.description || 'Added from dashboard',
    fullDesc: cardData.fullDesc || cardData.description || 'Added from dashboard',
    badge: cardData.badge || 'New',
    pricePlaceholder: cardData.pricePlaceholder || 'Contact for Price',
    imageUrl: cardData.imageUrl,
    visualType: cardData.visualType || 'custom',
    customSource: cardData.customSource || 'dashboard',
    createdAt: cardData.createdAt || new Date().toISOString()
  };

  if (existingIndex >= 0) {
    nextCards[existingIndex] = entry;
  } else {
    nextCards.push(entry);
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CUSTOM_PRODUCT_CARDS_STORAGE_KEY, JSON.stringify(nextCards));
  }

  return nextCards;
};

export const upsertProductImageMetadata = (productId, imageData) => {
  if (!productId || !imageData?.url) {
    return PRODUCT_IMAGES;
  }

  const metadata = {
    id: productId,
    url: imageData.url,
    title: imageData.title || '',
    altText: imageData.altText || '',
    category: imageData.category || '',
    description: imageData.description || '',
    tags: Array.isArray(imageData.tags) ? imageData.tags : [],
    status: imageData.status || 'Active',
    uploadedAt: imageData.uploadedAt || '',
    fileName: imageData.fileName || '',
    mimeType: imageData.mimeType || '',
    fileSize: imageData.fileSize || 0,
    productId,
    pricePlaceholder: imageData.pricePlaceholder || ''
  };

  PRODUCT_IMAGES[productId] = imageData.url;
  PRODUCT_IMAGE_METADATA[productId] = metadata;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PRODUCT_IMAGES_STORAGE_KEY, JSON.stringify(PRODUCT_IMAGE_METADATA));
  }

  return PRODUCT_IMAGES;
};

export const GALLERY_12_IMAGES = [
  {
    id: 1,
    url: "https://5.imimg.com/data5/SELLER/Default/2026/2/580699014/MO/LV/DY/92863266/max-fiber-laser-source-mfsc-2000-w.png",
    title: "Max Fiber Laser Source",
    category: "Laser Processing",
    tag: "12KW CNC"
  },
  {
    id: 2,
    url: "https://5.imimg.com/data5/SELLER/Default/2026/2/580700302/QK/NJ/JC/92863266/max-fiber-laser-source-mfsc-6000x-max-6kw.png",
    title: "Max Fiber Laser Source MFSC-6000X",
    category: "Laser Heads",
    tag: "Warehouse Pune"
  },
  {
    id: 3,
    url: "https://ecdn6.globalso.com/upload/p/4172/image_other/2025-09/mfsc-6000.jpg",
    title: "MAX MFSC 1500W-6000W Single Module Fiber Laser Source",
    category: "Optics & Lenses",
    tag: "1064nm AR Coated"
  },
  //  Fiber Optice Continuous Laser 
  {
    id: 4,
    url: "",
    title: "Max Fiber Laser Source",
    category: "Fiber Optice Continuous Laser",
    tag: "12KW CNC"
  },
  {
    id: 5,
    url: "",
    title: "Max Fiber Laser Source",
    category: "Fiber Optice Continuous Laser",
    tag: "12KW CNC"
  },
  {
    id: 6,
    url: "",
    title: "Max Fiber Laser Source",
    category: "Fiber Optice Continuous Laser",
    tag: "12KW CNC"
  },
  // Fiber Optice Welding Laser
  // {
  //   id: 16,
  //   url: "",
  //   title: "Max Fiber Laser Source",
  //   category: "Fiber Optice Welding Laser",
  //   tag: "12KW CNC"
  // },
  // {
  //   id: 17,
  //   url: "",
  //   title: "Max Fiber Laser Source",
  //   category: "Fiber Optice Welding Laser",
  //   tag: "12KW CNC"
  // },
  // {
  //   id: 18,
  //   url: "",
  //   title: "Max Fiber Laser Source",
  //   category: "Fiber Optice Welding Laser",
  //   tag: "12KW CNC"
  // },


];

export const IMAGE_MANAGEMENT_CATALOG = [
  {
    id: 101,
    title: "Fiber Laser Source",
    altText: "Industrial laser source in production line",
    category: "Laser Processing",
    description: "High-power fiber laser source used in precision manufacturing.",
    tags: ["laser", "manufacturing", "industrial"],
    status: "Active",
    uploadedAt: "2026-07-20T09:30:00.000Z",
    fileSize: 1500000,
    fileName: "fiber-laser-source.webp",
    mimeType: "image/webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2026/2/580699014/MO/LV/DY/92863266/max-fiber-laser-source-mfsc-2000-w.png"
  },
  {
    id: 102,
    title: "Warehouse Lighting Setup",
    altText: "Modern lighting setup in warehouse",
    category: "Infrastructure",
    description: "Warehouse lighting installation with energy-efficient fixtures.",
    tags: ["warehouse", "lighting", "energy"],
    status: "Inactive",
    uploadedAt: "2026-07-22T14:10:00.000Z",
    fileSize: 1320000,
    fileName: "warehouse-lighting.webp",
    mimeType: "image/webp",
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 103,
    title: "Spare Parts Rack",
    altText: "Organized spare parts storage rack",
    category: "Storage",
    description: "Optimized rack for spare parts inventory management.",
    tags: ["storage", "rack", "inventory"],
    status: "Active",
    uploadedAt: "2026-07-24T08:45:00.000Z",
    fileSize: 1780000,
    fileName: "spare-parts-rack.webp",
    mimeType: "image/webp",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
  }
];

export const TESTIMONIAL_AVATARS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80", // Plant Manager
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80", // Maintenance Engineer
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80", // Manufacturing Director
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"  // Fabrication Shop Owner
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Mukesh D. Agarwal",
    role: "Founder & Managing Director",
    bio: "Over 18 years of technical expertise in industrial laser cutting machinery and optical systems.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Deepak S. Patil",
    role: "Head of Laser Optical Engineering",
    bio: "Specializes in high-power 1064nm quartz lens alignment, AR coatings, and laser head repair diagnostics.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Anjali M. Deshmukh",
    role: "Senior Sales & Quote Specialist",
    bio: "Manages fast-track OEM spares quotations, corporate contracts, and same-day Pune logistics.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Rohit K. Shinde",
    role: "Laser Head & CNC Technical Lead",
    bio: "Expert in FSCUT height controller calibration, BOCI/Precitec head maintenance, and field support.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Sanjay R. Joshi",
    role: "Warehouse Operations Manager",
    bio: "Oversees inventory quality control, cleanroom packaging, and instant air courier dispatch.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  }
];
