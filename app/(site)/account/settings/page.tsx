import type { Metadata } from "next";
import { AccountSettings } from "@/components/auth/AccountSettings";

export const metadata: Metadata = {
    title: "Account settings",
    robots: { index: false, follow: false },
};

export default function AccountSettingsPage() {
    return <AccountSettings />;
}
