import type { IconName } from "@/components/ui/Icon";

export type ProductArt = "palm" | "refined" | "kernel" | "groundnut";

export type ProductCategory =
    | "crude-palm"
    | "refined-palm"
    | "palm-kernel"
    | "groundnut"
    | "wholesale";

export interface Shop {
    slug: string;
    name: string;
    initials: string;
    tagline: string;
    description: string;
    location: string;
    since: number;
    rating: number;
    reviews: number;
    verified: boolean;
    categories: ProductCategory[];
    specialties: string[];
    accent: ProductArt;
}

export interface Product {
    slug: string;
    shopSlug: string;
    seller: string;
    name: string;
    detail: string;
    price: string;
    priceValue: number;
    category: ProductCategory;
    art: ProductArt;
    glyph: string;
    tag: string;
    rating: number;
    reviews: number;
    stock: number;
    size: string;
    origin: string;
    description: string;
}

export interface Category {
    id: ProductCategory;
    name: string;
    caption: string;
    glyph: string;
}

export interface TrustSignal {
    title: string;
    caption: string;
    icon: IconName;
}

export interface SellerNavItem {
    label: string;
    icon: IconName;
}

export interface Metric {
    label: string;
    value: string;
    trend: string;
    up?: boolean;
}

export interface Order {
    id: string;
    customer: string;
    date: string;
    amount: string;
    status: "Processing" | "Shipped" | "Delivered";
}

/* --------------------------------------------------------------------------
   Shops
   -------------------------------------------------------------------------- */

export const shops: Shop[] = [
    {
        slug: "palm-harvest-foods",
        name: "Palm Harvest Foods",
        initials: "PH",
        tagline: "Fresh palm oil from the heart of Lagos.",
        description:
            "A family-run producer pressing red palm oil in small batches for kitchens and retailers across Lagos. Every drum is pressed, filtered and bottled on the same farm.",
        location: "Lagos, Nigeria",
        since: 2019,
        rating: 4.9,
        reviews: 128,
        verified: true,
        categories: ["crude-palm", "refined-palm"],
        specialties: ["Crude Palm Oil", "Refined Palm Oil"],
        accent: "palm",
    },
    {
        slug: "adeola-farms",
        name: "Adeola Farms",
        initials: "AF",
        tagline: "Cold-pressed groundnut oil, pressed in small batches.",
        description:
            "Adeola Farms grows, roasts and presses groundnuts on a co-operative farm in Ogun State. The oil is unrefined, aromatic and bottled within days of pressing.",
        location: "Abeokuta, Ogun State",
        since: 2020,
        rating: 4.8,
        reviews: 96,
        verified: true,
        categories: ["groundnut", "wholesale"],
        specialties: ["Groundnut Oil", "Wholesale Oils"],
        accent: "groundnut",
    },
    {
        slug: "green-grove-coop",
        name: "Green Grove Co-op",
        initials: "GG",
        tagline: "A co-operative of palm kernel producers.",
        description:
            "Green Grove brings together forty smallholder families who press palm kernel oil using traditional methods. Profits go directly back to the growers.",
        location: "Calabar, Cross River",
        since: 2018,
        rating: 4.7,
        reviews: 74,
        verified: true,
        categories: ["palm-kernel", "wholesale"],
        specialties: ["Palm Kernel Oil", "Wholesale Oils"],
        accent: "kernel",
    },
    {
        slug: "mama-esi-oils",
        name: "Mama Esi Oils",
        initials: "ME",
        tagline: "Kitchen-ready refined oils with a Ghanaian touch.",
        description:
            "Mama Esi Oils refines and bottles cooking oil for homes, restaurants and food vendors in Accra. Consistent quality, clean packaging and reliable delivery.",
        location: "Accra, Ghana",
        since: 2021,
        rating: 4.8,
        reviews: 63,
        verified: true,
        categories: ["refined-palm"],
        specialties: ["Refined Palm Oil"],
        accent: "refined",
    },
    {
        slug: "delta-fresh-produce",
        name: "Delta Fresh Produce",
        initials: "DF",
        tagline: "Village-pressed crude palm oil, delivered fresh.",
        description:
            "A Delta State producer working with village presses to bring fresh, unfiltered red palm oil to families and food vendors. Harvested and delivered weekly.",
        location: "Warri, Delta State",
        since: 2022,
        rating: 4.6,
        reviews: 51,
        verified: true,
        categories: ["crude-palm"],
        specialties: ["Crude Palm Oil"],
        accent: "palm",
    },
    {
        slug: "sahel-gold-press",
        name: "Sahel Gold Press",
        initials: "SG",
        tagline: "Groundnut oil for families and bulk buyers.",
        description:
            "Sahel Gold Press serves Kano and beyond with roasted groundnut oil in everyday and wholesale sizes. A newer shop with a focus on fair prices and fast delivery.",
        location: "Kano, Nigeria",
        since: 2024,
        rating: 4.7,
        reviews: 44,
        verified: false,
        categories: ["groundnut", "wholesale"],
        specialties: ["Groundnut Oil", "Wholesale Oils"],
        accent: "groundnut",
    },
];

/* --------------------------------------------------------------------------
   Products
   -------------------------------------------------------------------------- */

export const products: Product[] = [
    {
        slug: "premium-red-palm-oil",
        shopSlug: "palm-harvest-foods",
        seller: "Palm Harvest Foods",
        name: "Premium Red Palm Oil",
        detail: "5 litres · Freshly pressed",
        price: "₦18,500",
        priceValue: 18500,
        category: "crude-palm",
        art: "palm",
        glyph: "▥",
        tag: "BESTSELLER",
        rating: 4.9,
        reviews: 128,
        stock: 24,
        size: "5 litres",
        origin: "Lagos, Nigeria",
        description:
            "Deep red, unrefined palm oil pressed from ripe fruit and bottled on the farm. Rich in colour and aroma, it is ideal for stews, soups and traditional cooking.",
    },
    {
        slug: "cold-pressed-groundnut-oil",
        shopSlug: "adeola-farms",
        seller: "Adeola Farms",
        name: "Cold-Pressed Groundnut Oil",
        detail: "5 litres · Locally pressed",
        price: "₦12,000",
        priceValue: 12000,
        category: "groundnut",
        art: "groundnut",
        glyph: "🥜",
        tag: "LOCAL FAVOURITE",
        rating: 4.8,
        reviews: 96,
        stock: 18,
        size: "5 litres",
        origin: "Ogun State, Nigeria",
        description:
            "Unrefined groundnut oil pressed in small batches from locally grown nuts. Light, nutty and perfect for frying, baking and everyday cooking.",
    },
    {
        slug: "pure-palm-kernel-oil",
        shopSlug: "green-grove-coop",
        seller: "Green Grove Co-op",
        name: "Pure Palm Kernel Oil",
        detail: "2 litres · Cold pressed",
        price: "₦9,800",
        priceValue: 9800,
        category: "palm-kernel",
        art: "kernel",
        glyph: "♜",
        tag: "POPULAR",
        rating: 4.7,
        reviews: 74,
        stock: 4,
        size: "2 litres",
        origin: "Cross River, Nigeria",
        description:
            "Clear palm kernel oil pressed by a grower-owned co-operative. A versatile oil for cooking, cosmetics and traditional remedies.",
    },
    {
        slug: "golden-refined-oil",
        shopSlug: "mama-esi-oils",
        seller: "Mama Esi Oils",
        name: "Golden Refined Oil",
        detail: "3 litres · Kitchen ready",
        price: "₦14,200",
        priceValue: 14200,
        category: "refined-palm",
        art: "refined",
        glyph: "▥",
        tag: "TOP RATED",
        rating: 4.8,
        reviews: 63,
        stock: 12,
        size: "3 litres",
        origin: "Accra, Ghana",
        description:
            "A light, neutral refined palm oil for everyday cooking. Clean-tasting and heat-stable, with a sealed bottle that keeps it fresh for longer.",
    },
    {
        slug: "village-crude-palm-oil",
        shopSlug: "delta-fresh-produce",
        seller: "Delta Fresh Produce",
        name: "Village Crude Palm Oil",
        detail: "5 litres · Harvested weekly",
        price: "₦16,900",
        priceValue: 16900,
        category: "crude-palm",
        art: "palm",
        glyph: "🫙",
        tag: "FRESH PRESS",
        rating: 4.6,
        reviews: 51,
        stock: 8,
        size: "5 litres",
        origin: "Delta State, Nigeria",
        description:
            "Fresh, unfiltered red palm oil from a village press. Delivered within days of harvest for a deeper colour and fuller flavour.",
    },
    {
        slug: "groundnut-oil-1l",
        shopSlug: "sahel-gold-press",
        seller: "Sahel Gold Press",
        name: "Everyday Groundnut Oil",
        detail: "1 litre · Roasted & pressed",
        price: "₦3,200",
        priceValue: 3200,
        category: "groundnut",
        art: "groundnut",
        glyph: "🥜",
        tag: "EVERYDAY VALUE",
        rating: 4.7,
        reviews: 44,
        stock: 40,
        size: "1 litre",
        origin: "Kano, Nigeria",
        description:
            "A convenient one-litre bottle of roasted groundnut oil. Nutty, golden and ready for frying, sauces and baking.",
    },
    {
        slug: "organic-red-palm-oil",
        shopSlug: "palm-harvest-foods",
        seller: "Palm Harvest Foods",
        name: "Family Size Red Palm Oil",
        detail: "10 litres · Farm pressed",
        price: "₦22,000",
        priceValue: 22000,
        category: "crude-palm",
        art: "palm",
        glyph: "▥",
        tag: "FAMILY SIZE",
        rating: 4.9,
        reviews: 128,
        stock: 6,
        size: "10 litres",
        origin: "Lagos, Nigeria",
        description:
            "The same fresh red palm oil in a larger drum for families, caterers and food vendors. Better value per litre with no compromise on quality.",
    },
    {
        slug: "light-refined-palm-oil",
        shopSlug: "mama-esi-oils",
        seller: "Mama Esi Oils",
        name: "Light Refined Palm Oil",
        detail: "5 litres · Smooth finish",
        price: "₦11,500",
        priceValue: 11500,
        category: "refined-palm",
        art: "refined",
        glyph: "▥",
        tag: "SMOOTH FINISH",
        rating: 4.8,
        reviews: 63,
        stock: 21,
        size: "5 litres",
        origin: "Accra, Ghana",
        description:
            "A larger bottle of Mama Esi's light refined oil. Neutral in flavour and colour, it lets the ingredients in your cooking speak for themselves.",
    },
    {
        slug: "roasted-groundnut-oil",
        shopSlug: "adeola-farms",
        seller: "Adeola Farms",
        name: "Rich Roast Groundnut Oil",
        detail: "5 litres · Deep roast",
        price: "₦13,800",
        priceValue: 13800,
        category: "groundnut",
        art: "groundnut",
        glyph: "🥜",
        tag: "RICH ROAST",
        rating: 4.8,
        reviews: 96,
        stock: 14,
        size: "5 litres",
        origin: "Ogun State, Nigeria",
        description:
            "A deeper roast gives this groundnut oil a bolder aroma. Excellent for stir-fries, sauces and dishes that benefit from a nutty finish.",
    },
    {
        slug: "bulk-palm-kernel-oil",
        shopSlug: "green-grove-coop",
        seller: "Green Grove Co-op",
        name: "Bulk Palm Kernel Oil",
        detail: "25 litres · Co-op pressed",
        price: "₦48,000",
        priceValue: 48000,
        category: "wholesale",
        art: "kernel",
        glyph: "♜",
        tag: "BULK BUY",
        rating: 4.7,
        reviews: 74,
        stock: 5,
        size: "25 litres",
        origin: "Cross River, Nigeria",
        description:
            "A wholesale drum of palm kernel oil for processors, soap makers and retailers. Pressed by the co-operative and supplied in a sealed container.",
    },
    {
        slug: "wholesale-groundnut-oil",
        shopSlug: "sahel-gold-press",
        seller: "Sahel Gold Press",
        name: "Wholesale Groundnut Oil",
        detail: "25 litres · Bulk supply",
        price: "₦56,000",
        priceValue: 56000,
        category: "wholesale",
        art: "groundnut",
        glyph: "🥜",
        tag: "WHOLESALE",
        rating: 4.7,
        reviews: 44,
        stock: 9,
        size: "25 litres",
        origin: "Kano, Nigeria",
        description:
            "A bulk container of roasted groundnut oil for restaurants, food vendors and retailers. Consistent quality with a lower price per litre.",
    },
    {
        slug: "cold-pressed-palm-kernel",
        shopSlug: "green-grove-coop",
        seller: "Green Grove Co-op",
        name: "Small Batch Palm Kernel Oil",
        detail: "1 litre · Cold pressed",
        price: "₦7,500",
        priceValue: 7500,
        category: "palm-kernel",
        art: "kernel",
        glyph: "♜",
        tag: "SMALL BATCH",
        rating: 4.7,
        reviews: 74,
        stock: 30,
        size: "1 litre",
        origin: "Cross River, Nigeria",
        description:
            "A one-litre bottle for trying palm kernel oil at home. Cold pressed in small batches with no additives.",
    },
];

/* --------------------------------------------------------------------------
   Categories & trust
   -------------------------------------------------------------------------- */

export const categories: Category[] = [
    { id: "crude-palm", name: "Crude Palm Oil", caption: "Fresh from producers", glyph: "🫙" },
    { id: "refined-palm", name: "Refined Palm Oil", caption: "Ready for every kitchen", glyph: "🧴" },
    { id: "palm-kernel", name: "Palm Kernel Oil", caption: "Quality you can trust", glyph: "🫒" },
    { id: "groundnut", name: "Groundnut Oil", caption: "Locally pressed", glyph: "🥜" },
    { id: "wholesale", name: "Wholesale Oils", caption: "For retailers and bulk buyers", glyph: "📦" },
];

export const trustSignals: TrustSignal[] = [
    { icon: "shield", title: "Secure transactions", caption: "Protected checkout" },
    { icon: "truck", title: "Fast & reliable delivery", caption: "From trusted sellers" },
    { icon: "leaf", title: "Trusted community", caption: "Verified businesses" },
    { icon: "headset", title: "Dedicated support", caption: "Here when you need us" },
];

export const popularSearches = [
    "Red palm oil",
    "Groundnut oil",
    "Palm kernel oil",
    "Wholesale",
];

/* --------------------------------------------------------------------------
   Lookups & discovery helpers
   -------------------------------------------------------------------------- */

export function getShop(slug: string) {
    return shops.find((shop) => shop.slug === slug);
}

export function getProduct(slug: string) {
    return products.find((product) => product.slug === slug);
}

export function getCategory(id: string) {
    return categories.find((category) => category.id === id);
}

export function getCategoryName(id: string) {
    return getCategory(id)?.name ?? "Oils";
}

export function productsForShop(shopSlug: string) {
    return products.filter((product) => product.shopSlug === shopSlug);
}

export function getShopForProduct(product: Product) {
    return getShop(product.shopSlug);
}

export function categoryCounts() {
    return categories.reduce<Record<string, number>>((counts, category) => {
        counts[category.id] = products.filter(
            (product) => product.category === category.id,
        ).length;
        return counts;
    }, {});
}

export interface ProductQuery {
    q?: string;
    category?: string;
    min?: number;
    max?: number;
    sort?: string;
    verified?: boolean;
    shop?: string;
}

export function filterProducts({
    q,
    category,
    min,
    max,
    sort = "recommended",
    verified,
    shop,
}: ProductQuery = {}) {
    const query = q?.trim().toLowerCase();
    let list = products.filter((product) => {
        if (category && category !== "all" && product.category !== category) return false;
        if (shop && product.shopSlug !== shop) return false;
        if (min !== undefined && product.priceValue < min) return false;
        if (max !== undefined && product.priceValue > max) return false;
        if (verified && !getShop(product.shopSlug)?.verified) return false;
        if (query) {
            const haystack = [
                product.name,
                product.seller,
                product.detail,
                product.origin,
                getCategoryName(product.category),
            ]
                .join(" ")
                .toLowerCase();
            if (!haystack.includes(query)) return false;
        }
        return true;
    });

    if (sort === "price-asc") {
        list = [...list].sort((a, b) => a.priceValue - b.priceValue);
    } else if (sort === "price-desc") {
        list = [...list].sort((a, b) => b.priceValue - a.priceValue);
    } else if (sort === "rating") {
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    }

    return list;
}

export function filterShops({
    q,
    category,
}: {
    q?: string;
    category?: string;
} = {}) {
    const query = q?.trim().toLowerCase();

    return shops.filter((shop) => {
        if (category && category !== "all" && !shop.categories.includes(category as ProductCategory)) {
            return false;
        }
        if (query) {
            const haystack = [
                shop.name,
                shop.tagline,
                shop.location,
                shop.description,
                ...shop.specialties,
            ]
                .join(" ")
                .toLowerCase();
            if (!haystack.includes(query)) return false;
        }
        return true;
    });
}

export function relatedProducts(product: Product, limit = 4) {
    const pool = products.filter((candidate) => candidate.slug !== product.slug);
    const preferred = [
        ...pool.filter((candidate) => candidate.category === product.category),
        ...pool.filter(
            (candidate) =>
                candidate.shopSlug === product.shopSlug &&
                candidate.category !== product.category,
        ),
        ...pool,
    ];

    return preferred
        .filter(
            (candidate, index, list) =>
                list.findIndex((entry) => entry.slug === candidate.slug) === index,
        )
        .slice(0, limit);
}

export function otherShops(shopSlug: string, limit = 3) {
    return shops.filter((shop) => shop.slug !== shopSlug).slice(0, limit);
}

export const featuredProducts = products.slice(0, 4);
export const featuredShops = shops.slice(0, 4);

/* --------------------------------------------------------------------------
   Seller dashboard data
   -------------------------------------------------------------------------- */

export const sellerNav: SellerNavItem[] = [
    { label: "Overview", icon: "grid" },
    { label: "My shop", icon: "store" },
    { label: "Products", icon: "box" },
    { label: "Orders", icon: "receipt" },
    { label: "Inventory", icon: "archive" },
    { label: "Earnings", icon: "wallet" },
    { label: "Subscription", icon: "sparkle" },
    { label: "Settings", icon: "settings" },
];

export const sellerMetrics: Metric[] = [
    { label: "Total sales", value: "₦842,500", trend: "↗ 12.8% this month", up: true },
    { label: "Total orders", value: "64", trend: "↗ 8 new this week", up: true },
    { label: "Pending orders", value: "3", trend: "Need your attention" },
    { label: "Available balance", value: "₦126,400", trend: "After 2% commission" },
];

export const recentOrders: Order[] = [
    { id: "#OL-2084", customer: "Chinwe Okafor", date: "Today, 9:42", amount: "₦46,500", status: "Processing" },
    { id: "#OL-2081", customer: "David Mensah", date: "Today, 8:16", amount: "₦18,500", status: "Shipped" },
    { id: "#OL-2075", customer: "Fatima Bello", date: "Yesterday", amount: "₦37,000", status: "Delivered" },
];

export const topProducts = products.slice(0, 3).map((product, index) => ({
    ...product,
    sold: [42, 28, 16][index],
    revenue: ["₦315k", "₦196k", "₦124k"][index],
}));
