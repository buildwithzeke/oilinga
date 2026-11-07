"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { useAuth } from "./AuthProvider";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    exact?: boolean;
}

const navItems: NavItem[] = [
    {
        label: "Overview",
        href: "/account",
        icon: <Icon name="grid" size={16} />,
        exact: true,
    },
    {
        label: "Orders",
        href: "/orders",
        icon: <Icon name="receipt" size={16} />,
    },
    {
        label: "Wishlist",
        href: "/wishlist",
        icon: <Icon name="heart" size={16} />,
    },
    {
        label: "Reviews",
        href: "/account/reviews",
        icon: <Icon name="star" size={16} />,
    },
    {
        label: "Settings",
        href: "/account/settings",
        icon: <Icon name="settings" size={16} />,
    },
];

export function AccountSidebarNav() {
    const { user, signOut } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const signingOut = useRef(false);

    function handleSignOut() {
        signingOut.current = true;
        signOut();
        router.push("/");
    }

    return (
        <aside className="oi-sidebar">
            <div className="oi-sidebar__brand">
                <Logo size="sm" alt="Oilinga" />
            </div>
            <small className="oi-sidebar__label">MY ACCOUNT</small>
            <nav className="oi-sidebar__nav" aria-label="Account navigation">
                {navItems.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn("oi-sidebar__link", isActive && "is-active")}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            {user && (
                <div className="oi-sidebar__profile">
                    <span className="oi-avatar">{user.initials}</span>
                    <div className="oi-sidebar__profile-text">
                        <b className="oi-sidebar__profile-name">{user.name}</b>
                        <small className="oi-sidebar__profile-meta">{user.email}</small>
                    </div>
                    <button
                        type="button"
                        className="oi-icon-btn"
                        aria-label="Sign out"
                        title="Sign out"
                        onClick={handleSignOut}
                    >
                        <Icon name="logout" size={16} />
                    </button>
                </div>
            )}
        </aside>
    );
}
