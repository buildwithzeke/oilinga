import type { Metadata } from "next";
import { WishlistView } from "@/components/views/WishlistView";

export const metadata: Metadata = {
    title: "Your wishlist",
};

export default function WishlistPage() {
    return <WishlistView />;
}
