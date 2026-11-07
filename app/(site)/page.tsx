import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";

export const metadata: Metadata = {
    description:
        "Buy fresh palm oil, groundnut oil and palm kernel oil from verified sellers across Africa, or open your own Oilinga storefront.",
};

export default function HomePage() {
    return <HomeView />;
}
