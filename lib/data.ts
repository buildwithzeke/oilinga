import type { IconName } from "@/components/ui/Icon";

export type Page = "home" | "marketplace" | "seller" | "about";

export type ProductArt = "palm" | "refined" | "kernel" | "groundnut";

export interface Product {
    id: string;
    seller: string;
    name: string;
    detail: string;
    price: string;
    art: ProductArt;
    glyph: string;
    tag: string;
}

export interface Category {
    id: string;
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

export const products: Product[] = [
    {
        id: "premium-red-palm-oil",
        seller: "Palm Harvest Foods",
        name: "Premium Red Palm Oil",
        detail: "5 litres · Freshly pressed",
        price: "₦18,500",
        art: "palm",
        glyph: "▥",
        tag: "BESTSELLER",
    },
    {
        id: "cold-pressed-groundnut-oil",
        seller: "Adeola Farms",
        name: "Cold-Pressed Groundnut Oil",
        detail: "5 litres · Locally pressed",
        price: "₦12,000",
        art: "groundnut",
        glyph: "🥜",
        tag: "LOCAL FAVOURITE",
    },
    {
        id: "pure-palm-kernel-oil",
        seller: "Green Grove Co-op",
        name: "Pure Palm Kernel Oil",
        detail: "2 litres · Cold pressed",
        price: "₦9,800",
        art: "kernel",
        glyph: "♜",
        tag: "POPULAR",
    },
    {
        id: "golden-refined-oil",
        seller: "Mama Esi Oils",
        name: "Golden Refined Oil",
        detail: "3 litres · Kitchen ready",
        price: "₦14,200",
        art: "refined",
        glyph: "▥",
        tag: "TOP RATED",
    },
];

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

export const marketplaceFilters = [
    { id: "all", name: "All products", count: 128 },
    { id: "crude-palm", name: "Crude palm oil", count: 34 },
    { id: "refined-palm", name: "Refined palm oil", count: 28 },
    { id: "palm-kernel", name: "Palm kernel oil", count: 19 },
    { id: "groundnut", name: "Groundnut oil", count: 22 },
];

export const shopTypes = [
    { id: "producer", name: "Producer" },
    { id: "retailer", name: "Retailer" },
];

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
