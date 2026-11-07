import type { Metadata, Viewport } from "next";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const description =
    "A trusted marketplace connecting palm oil and groundnut oil sellers, retailers and consumers across Africa.";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Oilinga — Buy, Sell & Grow",
        template: "%s · Oilinga",
    },
    description,
    applicationName: "Oilinga",
    keywords: [
        "Oilinga",
        "palm oil",
        "groundnut oil",
        "palm kernel oil",
        "African marketplace",
        "buy oil",
        "sell oil",
    ],
    icons: {
        icon: [
            {
                url: "/assets/app-icons/oilinga-icon-64.png",
                sizes: "64x64",
                type: "image/png",
            },
            {
                url: "/assets/app-icons/oilinga-icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                url: "/assets/app-icons/oilinga-icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        apple: [
            {
                url: "/assets/app-icons/oilinga-icon-180.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
        shortcut: "/assets/app-icons/oilinga-icon-64.png",
    },
    openGraph: {
        title: "Oilinga — Buy, Sell & Grow",
        description,
        siteName: "Oilinga",
        locale: "en_NG",
        type: "website",
        images: [
            {
                url: "/assets/brand/oilinga-brand-visual-reference.png",
                width: 1536,
                height: 1024,
                alt: "Oilinga — Africa’s marketplace for quality oils",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Oilinga — Buy, Sell & Grow",
        description,
        images: ["/assets/brand/oilinga-brand-visual-reference.png"],
    },
};

export const viewport: Viewport = {
    themeColor: "#234B36",
    colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <ToastProvider>{children}</ToastProvider>
            </body>
        </html>
    );
}
