/**
 * lib/types.ts — re-export barrel for all shared types.
 *
 * All interfaces come from lib/data.ts so there is a single source of truth.
 * Import from here or from lib/data.ts — both work.
 */

export type {
    ProductArt,
    ProductCategory,
    Shop,
    Product,
    Category,
    TrustSignal,
    SellerNavItem,
    Metric,
    Order,
    ProductQuery,
} from "./data";

import type { Product } from "./data";

/** A single line-item in the shopping cart. */
export interface CartItem {
    product: Product;
    quantity: number;
}

/** A saved product in the customer's wishlist. */
export interface WishlistItem {
    product: Product;
}

/** Payment method options available at checkout. */
export type PaymentMethod = "card" | "bank-transfer" | "pay-on-delivery";

/** Delivery address and contact for an order. */
export interface DeliveryInfo {
    name: string;
    phone: string;
    address: string;
    state: string;
    notes: string;
}

/** A placed customer order. */
export interface CustomerOrder {
    id: string;
    date: string;
    items: CartItem[];
    subtotal: number;
    delivery: DeliveryInfo;
    payment: PaymentMethod;
    status: string;
}

/** A product review written by a customer. */
export interface Review {
    id: string;
    productSlug: string;
    productName: string;
    rating: number;
    text: string;
    date: string;
    authorName: string;
}
