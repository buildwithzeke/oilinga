import type { Review } from "./types";

export const REVIEWS_KEY = "oilinga_reviews";

export function readReviews(): Review[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(REVIEWS_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as Review[]) : [];
    } catch {
        return [];
    }
}

export function writeReview(r: Review): void {
    const current = readReviews();
    const updated = [...current, r];
    try {
        window.localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
    } catch {
        // Storage may be unavailable in private browsing.
    }
}

export function reviewsForProduct(slug: string): Review[] {
    return readReviews().filter((r) => r.productSlug === slug);
}

export function averageRating(slug: string): number | null {
    const reviews = reviewsForProduct(slug);
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
}
