import type { Metadata } from "next";
import { OrdersView } from "@/components/views/OrdersView";

export const metadata: Metadata = {
    title: "Your orders",
};

export default function OrdersPage() {
    return <OrdersView />;
}
