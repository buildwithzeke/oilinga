"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { writeReview } from "@/lib/reviews";
import { cn } from "@/lib/cn";

export interface ReviewFormProps {
    productSlug: string;
    productName: string;
    authorName: string;
    onSubmit?: () => void;
}

export function ReviewForm({ productSlug, productName, authorName, onSubmit }: ReviewFormProps) {
    const notify = useToast();
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (rating === 0) {
            setError("Please select a star rating.");
            return;
        }
        if (text.trim().length < 10) {
            setError("Review must be at least 10 characters.");
            return;
        }

        writeReview({
            id: crypto.randomUUID(),
            productSlug,
            productName,
            rating,
            text: text.trim(),
            date: new Date().toISOString(),
            authorName,
        });

        notify("Review submitted");
        setRating(0);
        setHovered(0);
        setText("");
        onSubmit?.();
    }

    const displayRating = hovered || rating;

    return (
        <form className="oi-review-form" onSubmit={handleSubmit} aria-label="Write a review">
            <div className="oi-form-group">
                <span className="oi-form-label">Your rating</span>
                <div className="oi-star-picker" role="group" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            type="button"
                            className={cn(
                                "oi-star-picker__star",
                                n <= displayRating && "is-active",
                            )}
                            aria-label={`${n} star${n !== 1 ? "s" : ""}`}
                            aria-pressed={n <= rating}
                            onClick={() => setRating(n)}
                            onMouseEnter={() => setHovered(n)}
                            onMouseLeave={() => setHovered(0)}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div className="oi-form-group">
                <label htmlFor="review-text" className="oi-form-label">
                    Your review
                </label>
                <textarea
                    id="review-text"
                    className="oi-form-input"
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Share your experience with this product…"
                />
            </div>

            {error && (
                <p className="oi-form-error" role="alert">
                    {error}
                </p>
            )}

            <Button type="submit" variant="primary" size="sm">
                Submit review
            </Button>
        </form>
    );
}
