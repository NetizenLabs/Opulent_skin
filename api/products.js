// In-memory persistent state for the deployment instance with baseline seed catalog
let catalog = [
  {
    id: "ops-001",
    title: "15% Vitamin C Glow Concentrate",
    category: "skin",
    price: 2450,
    oldPrice: 2950,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
    badge: "Skin Care",
    volume: "30ml Dropper",
    description: "Pure Ethyl Ascorbic Acid with Ferulic Acid formulated for targeted dark spot clarity."
  },
  {
    id: "ops-002",
    title: "Multi-Ceramide Barrier Defense Gel",
    category: "skin",
    price: 2150,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1608248597359-281b37b67035?w=600&auto=format&fit=crop&q=80",
    badge: "Skin Care",
    volume: "50g Jar",
    description: "5 Essential Ceramides with Centella Asiatica to restore dehydrated skin barriers."
  },
  {
    id: "ops-003",
    title: "Invisible Dew SPF 50+ Sun Veil",
    category: "skin",
    price: 1950,
    oldPrice: 2200,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    badge: "Skin Care",
    volume: "60ml Tube",
    description: "Ultra-matte broad-spectrum UVA/UVB defense engineered with zero white cast."
  },
  {
    id: "ops-004",
    title: "Rosemary & Biotin Scalp Elixir",
    category: "hair",
    price: 1850,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80",
    badge: "Hair Care",
    volume: "50ml Dropper",
    description: "Organic cold-pressed rosemary oil supporting root stimulation and strand thickness."
  },
  {
    id: "ops-005",
    title: "Velvet Weightless Matte Lipstick",
    category: "makeup",
    price: 1350,
    oldPrice: 1600,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80",
    badge: "Makeup",
    volume: "3.8g Bullet",
    description: "Non-drying, transfer-resistant formulation in rich, flattering terracotta shades."
  }
];

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Fetch all products
  if (req.method === "GET") {
    return res.status(200).json(catalog);
  }

  // POST: Add new product
  if (req.method === "POST") {
    const newProduct = req.body;
    if (!newProduct || !newProduct.title || !newProduct.price) {
      return res.status(400).json({ error: "Title and price are required." });
    }
    catalog.unshift(newProduct);
    return res.status(201).json({ message: "Product published successfully", product: newProduct });
  }

  // DELETE: Remove product by ID
  if (req.method === "DELETE") {
    const { id } = req.query;
    catalog = catalog.filter(p => p.id !== id);
    return res.status(200).json({ message: "Product removed", id });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
