import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oilinga — Buy, Sell & Grow",
  description: "A trusted marketplace connecting palm oil producers, retailers and consumers across Africa.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
