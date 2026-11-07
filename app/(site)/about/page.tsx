import type { Metadata } from "next";
import { AboutView } from "@/components/views/AboutView";

export const metadata: Metadata = {
    title: "About",
    description:
        "Oilinga is a trusted marketplace connecting palm oil and groundnut oil producers, retailers and consumers across Africa.",
};

export default function AboutPage() {
    return <AboutView />;
}
