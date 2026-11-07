import type { Metadata } from "next";
import { OrderDetailView } from "@/components/views/OrderDetailView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Order details",
};

interface Props {
    params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
    const { id } = await params;
    return <OrderDetailView orderId={id} />;
}
