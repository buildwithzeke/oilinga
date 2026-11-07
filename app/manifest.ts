import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Oilinga — Buy, Sell & Grow",
        short_name: "Oilinga",
        description:
            "A trusted marketplace connecting palm oil and groundnut oil sellers, retailers and consumers across Africa.",
        start_url: "/",
        display: "standalone",
        background_color: "#FFF4E7",
        theme_color: "#234B36",
        icons: [
            {
                src: "/assets/app-icons/oilinga-icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/assets/app-icons/oilinga-icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
