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
