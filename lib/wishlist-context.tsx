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
import type { WishlistItem } from "./types";

const WISHLIST_KEY = "oilinga_wishlist";

interface WishlistContextValue {
    items: WishlistItem[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (slug: string) => void;
    isInWishlist: (slug: string) => boolean;
    toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readWishlist(): WishlistItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(WISHLIST_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as WishlistItem[]) : [];
    } catch {
        return [];
    }
}

function writeWishlist(items: WishlistItem[]): void {
    try {
        window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    } catch {
        // Storage may be unavailable in private browsing; in-memory state still works.
    }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);

    // Hydrate from localStorage on mount.
    useEffect(() => {
        setItems(readWishlist());
    }, []);

    // Persist on every change.
    useEffect(() => {
        writeWishlist(items);
    }, [items]);

    const addToWishlist = useCallback((product: Product) => {
        setItems((prev) => {
            const exists = prev.some((item) => item.product.slug === product.slug);
            if (exists) return prev;
            return [...prev, { product }];
        });
    }, []);

    const removeFromWishlist = useCallback((slug: string) => {
        setItems((prev) => prev.filter((item) => item.product.slug !== slug));
    }, []);

    const isInWishlist = useCallback(
        (slug: string) => items.some((item) => item.product.slug === slug),
        [items],
    );

    const toggleWishlist = useCallback(
        (product: Product) => {
            setItems((prev) => {
                const exists = prev.some((item) => item.product.slug === product.slug);
                if (exists) {
                    return prev.filter((item) => item.product.slug !== product.slug);
                }
                return [...prev, { product }];
            });
        },
        [],
    );

    const value = useMemo(
        () => ({ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }),
        [items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist],
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used inside a WishlistProvider");
    }
    return context;
}
