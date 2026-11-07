"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewForm } from "@/components/ui/ReviewForm";
import { Button } from "@/components/ui/Button";
import { AccountSidebarNav } from "@/components/auth/AccountSidebarNav";
import { useAuth } from "@/components/auth/AuthProvider";
import { readReviews } from "@/lib/reviews";
import { products } from "@/lib/data";
import type { Review } from "@/lib/types";

export function AccountReviews() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, ready } = useAuth();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState(
        () => searchParams.get("product") ?? "",
    );

    useEffect(() => {
        if (ready && !user) {
            router.replace("/login?next=/account/reviews");
        }
    }, [ready, user, router]);

    useEffect(() => {
        if (!user) return;
        setReviews(readReviews());
    }, [user]);

    // Pre-select product from query param
    useEffect(() => {
        const slug = searchParams.get("product");
        if (slug) {
            setSelectedSlug(slug);
            setShowForm(true);
        }
    }, [searchParams]);

    if (!ready) {
        return (
            <section className="oi-view oi-container" aria-live="polite">
                <div className="oi-account__loading">Loading…</div>
            </section>
        );
    }

    if (!user) {
        return (
            <section className="oi-view oi-container" aria-live="polite">
                <div className="oi-account__loading">Redirecting you to sign in…</div>
            </section>
        );
    }

    function refreshReviews() {
        setReviews(readReviews());
        setShowForm(false);
        setSelectedSlug("");
    }

    const selectedProduct = products.find((p) => p.slug === selectedSlug);

    return (
        <section className="oi-view oi-container" aria-labelledby="reviews-title">
            <div className="oi-dashboard">
                <AccountSidebarNav />

                <div className="oi-dashboard__content">
                    <div className="oi-card-head">
                        <h1 id="reviews-title" className="oi-page-title">
                            Your reviews
                        </h1>
                        {!showForm && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowForm(true)}
                            >
                                Write a review
                            </Button>
                        )}
                    </div>

                    {showForm && (
                        <div style={{ marginBottom: "var(--space-6)" }}>
                            <div className="oi-form-group">
                                <label htmlFor="review-product-select" className="oi-form-label">
                                    Select a product
                                </label>
                                <select
                                    id="review-product-select"
                                    className="oi-form-input"
                                    value={selectedSlug}
                                    onChange={(e) => setSelectedSlug(e.target.value)}
                                >
                                    <option value="">Choose a product…</option>
                                    {products.map((p) => (
                                        <option key={p.slug} value={p.slug}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedSlug && selectedProduct && (
                                <ReviewForm
                                    productSlug={selectedProduct.slug}
                                    productName={selectedProduct.name}
                                    authorName={user.name}
                                    onSubmit={refreshReviews}
                                />
                            )}

                            {!selectedSlug && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setShowForm(false);
                                        setSelectedSlug("");
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    )}

                    {reviews.length === 0 && !showForm ? (
                        <div className="oi-wishlist-empty">
                            <p className="oi-muted">
                                You haven&apos;t written any reviews yet.
                            </p>
                            <ButtonLink href="/marketplace" variant="outline" size="sm">
                                Browse products
                            </ButtonLink>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gap: "var(--space-3)" }}>
                            {reviews.map((review) => (
                                <article key={review.id} className="oi-review-card">
                                    <div className="oi-card-head">
                                        <Link
                                            href={`/products/${review.productSlug}`}
                                            className="oi-link"
                                        >
                                            {review.productName}
                                        </Link>
                                        <small className="oi-muted">
                                            {new Date(review.date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </small>
                                    </div>
                                    <StarRating rating={review.rating} />
                                    <p style={{ marginTop: "var(--space-2)" }}>{review.text}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
