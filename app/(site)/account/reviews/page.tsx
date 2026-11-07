import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountReviews } from "@/components/views/AccountReviews";

export const metadata: Metadata = {
    title: "Your reviews",
    robots: { index: false, follow: false },
};

export default function AccountReviewsPage() {
    return (
        <Suspense>
            <AccountReviews />
        </Suspense>
    );
}
