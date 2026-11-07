import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface StarRatingProps {
    rating: number;
    reviews?: number;
    className?: string;
}

export function StarRating({ rating, reviews, className }: StarRatingProps) {
    const label = reviews
        ? `Rated ${rating} out of 5 from ${reviews} reviews`
        : `Rated ${rating} out of 5`;

    return (
        <span className={cn("oi-rating", className)} aria-label={label}>
            <Icon name="star" size={13} />
            <b>{rating.toFixed(1)}</b>
            {reviews !== undefined && <small>({reviews})</small>}
        </span>
    );
}
