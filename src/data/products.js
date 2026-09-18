// Product content powers the listing, search suggestions, cart, and detail pages.
export const products = [
  {
    id: 1,
    name: "AMD Ryzen 7 7800X3D",
    category: "CPU",
    price: 3499,
    old: 3999,
    rating: 4.9,
    description:
      "A high-performance gaming processor built for smooth frame rates and demanding multitasking.",
    features: [
      "8 cores and 16 threads",
      "3D V-Cache for gaming",
      "AM5 socket platform",
    ],
    specs: [
      ["Cores", "8"],
      ["Threads", "16"],
      ["Base clock", "4.2 GHz"],
    ],
    image:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "NVIDIA GeForce RTX 4070 SUPER",
    category: "GPU",
    price: 6499,
    old: 6999,
    rating: 4.8,
    description:
      "A powerful graphics card for high-refresh 1440p gaming, ray tracing, and creative workloads.",
    features: [
      "DLSS 3 frame generation",
      "12 GB GDDR6X memory",
      "Ray tracing acceleration",
    ],
    specs: [
      ["Memory", "12 GB"],
      ["Interface", "PCIe 4.0"],
      ["Recommended PSU", "650 W"],
    ],
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Samsung 990 PRO 2TB NVMe",
    category: "Storage",
    price: 1599,
    old: 1899,
    rating: 4.8,
    description:
      "Fast, dependable NVMe storage for quick boot times, responsive applications, and large game libraries.",
    features: ["2 TB capacity", "PCIe 4.0 NVMe", "Samsung Magician support"],
    specs: [
      ["Capacity", "2 TB"],
      ["Form factor", "M.2 2280"],
      ["Interface", "PCIe 4.0 x4"],
    ],
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Corsair K70 RGB Pro",
    category: "Keyboard",
    price: 1299,
    old: 1499,
    rating: 4.7,
    description:
      "A premium mechanical keyboard with responsive switches, vivid RGB lighting, and a durable aluminum frame.",
    features: [
      "Mechanical RGB switches",
      "Detachable USB-C cable",
      "Aluminum construction",
    ],
    specs: [
      ["Layout", "Full size"],
      ["Switches", "Mechanical"],
      ["Connection", "USB-C"],
    ],
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Logitech G Pro X Superlight",
    category: "Mouse",
    price: 899,
    old: 999,
    rating: 4.8,
    description:
      "A lightweight wireless gaming mouse designed for precise aim, fast movement, and long sessions.",
    features: [
      "High-precision HERO sensor",
      "Lightspeed wireless",
      "Ultra-lightweight shell",
    ],
    specs: [
      ["Sensor", "HERO 25K"],
      ["Connection", "2.4 GHz wireless"],
      ["Weight", "63 g"],
    ],
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Intel Core i7-14700K",
    category: "CPU",
    price: 3299,
    old: 3699,
    rating: 4.7,
    description:
      "A flexible desktop processor for gaming, streaming, and content creation with plenty of headroom.",
    features: [
      "20 cores and 28 threads",
      "Hybrid performance architecture",
      "Unlocked multiplier",
    ],
    specs: [
      ["Cores", "20"],
      ["Threads", "28"],
      ["Base clock", "3.4 GHz"],
    ],
    image:
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=600&auto=format&fit=crop",
  },
];
export const brands = ["ASUS", "AMD", "NVIDIA", "Intel", "Corsair", "Logitech"];
export const categories = [
  ["fi-sr-microchip", "PC Components", "1,240 items"],
  ["fi-sr-gamepad", "Gaming", "860 items"],
  ["fi-sr-screen", "Monitors", "320 items"],
  ["fi-sr-headphones", "Accessories", "520 items"],
];
