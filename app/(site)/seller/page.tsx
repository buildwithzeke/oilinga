import type { Metadata } from "next";
import { SellerSetup } from "@/components/views/SellerSetup";

export const metadata: Metadata = {
    title: "Sell on Oilinga",
    description: "Learn how to open an Oilinga shop, list your products and publish your storefront.",
};

export default function SellerPage() {
    return <SellerSetup />;
}
