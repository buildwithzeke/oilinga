import type { Metadata } from "next";
import { SellerDashboard } from "@/components/views/SellerDashboard";

export const metadata: Metadata = {
    title: "Seller portal",
    description:
        "Preview the Oilinga seller portal: sales, orders, inventory and storefront tools in one place.",
};

export default function SellerPage() {
    return <SellerDashboard />;
}
