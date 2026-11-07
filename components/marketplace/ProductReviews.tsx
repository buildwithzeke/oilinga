"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewForm } from "@/components/ui/ReviewForm";
import { useAuth } from "@/components/auth/AuthProvider";
import { reviewsForProduct, averageRating } from "@/lib/reviews";
import type { Review } from "@/lib/types";

export interface ProductReviewsProps {
    productSlug: string;
    productName: string;
}

export function ProductReviews({ productSlug, productName }: ProductReviewsProps) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [avgRating, setAvgRating] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setReviews(reviewsForProduct(productSlug));
        setAvgRating(averageRating(productSlug));
    }, [productSlug]);

    function refreshReviews() {
        setReviews(reviewsForProduct(productSlug));
        setAvgRating(averageRating(productSlug));
        setShowForm(false);
    }

    return (
        <div className="oi-reviews-section">
            <div className="oi-card-head">
                <h2 className="oi-section-title">
                    Customer reviews
                    {avgRating !== null && (
                        <span style={{ marginLeft: "var(--space-3)" }}>
                            <StarRating rating={avgRating} reviews={reviews.length} />
                        </span>
                    )}
                </h2>
            </div>

            {reviews.length === 0 && (
                <p className="oi-muted" style={{ marginBottom: "var(--space-4)" }}>
                    No reviews yet. Be the first to review this product.
                </p>
            )}

            {reviews.length > 0 && (
                <div
                    style={{
                        display: "grid",
                        gap: "var(--space-3)",
                        marginBottom: "var(--space-6)",
                    }}
                >
                    {reviews.map((review) => (
                        <article key={review.id} className="oi-review-card">
                            <div className="oi-card-head">
                                <b>{review.authorName}</b>
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

            {/* Write a review */}
            {!showForm && (
                <div>
                    {user ? (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowForm(true)}
                        >
                            Write a review
                        </Button>
                    ) : (
                        <p className="oi-muted">
                            <Link href={`/login?next=/products/${productSlug}`} className="oi-link">
                                Sign in
                            </Link>{" "}
                            to write a review.
                        </p>
                    )}
                </div>
            )}

            {showForm && user && (
                <div>
                    <ReviewForm
                        productSlug={productSlug}
                        productName={productName}
                        authorName={user.name}
                        onSubmit={refreshReviews}
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowForm(false)}
                        style={{ marginTop: "var(--space-2)" }}
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
}
