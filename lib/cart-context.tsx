"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { Product } from "./data";

/** A single line-item in the shopping cart. */
export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    totalCount: number;
    addItem: (product: Product) => void;
    removeItem: (slug: string) => void;
    clearCart: () => void;
}

const CART_KEY = "oilinga.cart";

export const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
    try {
        const raw = window.localStorage.getItem(CART_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
    } catch {
        return [];
    }
}

function writeCart(items: CartItem[]) {
    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
        // Storage may be unavailable in private browsing; in-memory state still works.
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Hydrate from localStorage on mount.
    useEffect(() => {
        setItems(readCart());
    }, []);

    // Persist on every change.
    useEffect(() => {
        writeCart(items);
    }, [items]);

    const addItem = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.slug === product.slug);
            if (existing) {
                return prev.map((item) =>
                    item.product.slug === product.slug
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((slug: string) => {
        setItems((prev) => prev.filter((item) => item.product.slug !== slug));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items],
    );

    const value = useMemo(
        () => ({ items, totalCount, addItem, removeItem, clearCart }),
        [items, totalCount, addItem, removeItem, clearCart],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside a CartProvider");
    }
    return context;
}
